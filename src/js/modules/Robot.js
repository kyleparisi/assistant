/**
 * Created by kyleparisi on 1/18/16.
 */

import {Map, List} from 'immutable'
import fs from 'fs'
import plugins from './PluginManager'
import cards from './CardManager'
import {h, diff, patch} from 'virtual-dom'

const Cards = Symbol()
const ConfiguredPlugins = Symbol()


class Robot {
    constructor(cards, plugins) {
        this[ConfiguredPlugins] = List([])
        this[Cards] = List([])
        this[RootNode] = h('.list')
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
        let patches = diff(rootNode, list)
        this[RootNode] = patch(this[RootNode], patches)
    }

    hear(exp, key) {
        return plugins.commands(exp, key).map(plugin => {
            if (! plugin) return
            let card = cards.type(plugin.get('card'))(plugin.get('output'))
            this[Cards] = this[Cards].set(-1, card)
            // TODO: add card and message input to history
            this.render()
        })
    }
}

export default new Robot()
