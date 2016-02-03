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

    up() {
        console.log('up')
        let state = this[CommandHistory].backward()
        let index = this[AppHistory].index - 1
        let appState = this[AppHistory].state.get(index)
        if (! state) return this
        this[Render].update(state.get('command'), appState.get('cards').toArray())
    }

    down() {
        console.log('down')
        let state = this[CommandHistory].forward()
        let index = this[AppHistory].index - 1
        let appState = this[AppHistory].state.get(index)
        if (! state) return this
        this[Render].update(state.get('command'), appState.get('cards').toArray())
    }

    undoAppState() {
        this[AppHistory].backward()
        let index = this[AppHistory].index
        let state = this[AppHistory].state.get(index)
        if (state === undefined) return this.render(index)
        this[Cards] = state.get('cards')
        this.render(index)
        return this
    }

    redoAppState() {
        this[AppHistory].forward()
        let index = this[AppHistory].index
        let state = this[AppHistory].state.get(index)
        if (! state) return this.render(index)
        this[Cards] = state.get('cards')
        this.render(index)
        return this
    }

    render(index) {
        let state = this[AppHistory].state.get(index)
        if (! state) return
        this[Render].update(state.get('input'), state.get('cards').toArray())
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
            this.render(this[AppHistory].index - 1)
        })
    }

    input(el, input) {
       this.hear(el.value, input.keyCode);
    }

}

module.exports = new Robot()
