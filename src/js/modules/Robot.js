/**
 * Created by kyleparisi on 1/18/16.
 */

import {Map, List} from 'immutable'
import fs from 'fs'
import plugins from './PluginManager'
import cards from './CardManager'
import {h, diff, patch, create} from 'virtual-dom'
import HistoryManager from './History'
import ViewManager from './ViewManager'

const Cards = Symbol()
const ConfiguredPlugins = Symbol()
const AppHistory = Symbol()
const CommandHistory = Symbol()
const Render = Symbol()

class Robot {
    constructor() {
        this[ConfiguredPlugins] = List([])
        this[Cards] = List([])
        this[Render] = new ViewManager(this)

        this[AppHistory] = new HistoryManager([{
            input: '',
            output: '',
            cards: this[Cards]
        }])
        this[CommandHistory] = new HistoryManager()
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
        let index = this[AppHistory].index - 1
        this[Render].update(this[AppHistory].state.get(index).get('input'), this[AppHistory].state.get(index).get('cards').toArray())
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

    input(el, input) {
       this.hear(el.value, input.keyCode);
    }

}

module.exports = new Robot()
