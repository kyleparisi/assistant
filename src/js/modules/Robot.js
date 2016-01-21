/**
 * Created by kyleparisi on 1/18/16.
 */

import {Map, List} from 'immutable'
import fs from 'fs'
import plugins from './PluginManager'
import cards from './CardManager'
import {h, diff, patch, create} from 'virtual-dom'
import HistoryManager from './History'

const Cards = Symbol()
const ConfiguredPlugins = Symbol()
const RootNode = Symbol()
const AppHistory = Symbol()
const CommandHistory = Symbol()

class Robot {
    constructor() {
        this[ConfiguredPlugins] = List([])
        this[Cards] = List([])
        this[RootNode] = create(h('.list'))
        document.body.appendChild(this[RootNode])
        this[AppHistory] = new HistoryManager([{
            input: '',
            output: '',
            cards: this[Cards]
        }])
        this[CommandHistory] = new HistoryManager()
    }

    get rootNode() {
        return this[RootNode]
    }

    get appHistory() {
        return this[AppHistory]
    }

    get commandHistory() {
        return this[CommandHistory]
    }

    static get plugins() {
        return plugins
    }

    static get cards () {
        return cards
    }

    render() {
        let list = h('.list', this[Cards].toArray())
        let patches = diff(this[RootNode], list)
        this[RootNode] = patch(this[RootNode], patches)
    }

    hear(input, key) {
        return plugins.commands(input, key).map(plugin => {
            if (! plugin) return
            var card = cards.type(plugin.get('card'))
            if (! card) return
            card = card(plugin.get('output'))
            this[Cards] = this[Cards].set(-1, card)
            // TODO: add card and message input to history
            this[AppHistory].push(Map({
                input: input,
                output: plugin.get('output'),
                cards: this[Cards]
            }))
            this[CommandHistory].push({ command: input })
            this.render()
        })
    }

}

module.exports = new Robot()
