/**
 * Created by kyleparisi on 1/18/16.
 */

import {Map, List} from 'immutable'
import fs from 'fs'
import plugins from './PluginManager'
import cards from './CardManager'
import {h, diff, patch, create} from 'virtual-dom'

const Cards = Symbol()
const ConfiguredPlugins = Symbol()
const RootNode = Symbol()

class Robot {
    constructor(cards, plugins) {
        this[ConfiguredPlugins] = List([])
        this[Cards] = List([])
        this[RootNode] = create(h('.list'))
        document.body.appendChild(this[RootNode])
    }

    get rootNode() {
        return this[RootNode]
    }

    get plugins() {
        return plugins
    }

    get cards () {
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
            this.render()
        })
    }
}

module.exports = new Robot()
