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
        document.getElementById('output').appendChild(this[RootNode])
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

    get plugins() {
        return plugins
    }

    get cards () {
        return cards
    }

    undoAppState() {
        this[AppHistory].backward()
        let index = this[AppHistory].index
        this[Cards] = this[AppHistory].state.get(index).get('cards')
        this.render()
        return this
    }

    redoAppState() {
        this[AppHistory].forward()
        let index = this[AppHistory].index
        this[Cards] = this[AppHistory].state.get(index).get('cards')
        this.render()
        return this
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
            this[Cards] = this[Cards].unshift(card)
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
