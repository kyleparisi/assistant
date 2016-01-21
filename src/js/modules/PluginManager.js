/**
 * Created by kyleparisi on 1/17/16.
 */

import {List, Map} from 'immutable'
import cards from './CardManager'
import keycode from 'keycode'

const Plugins = Symbol()

/**
 * Manage plugin storage
 */
class PluginManager {
    constructor() {
        this[Plugins] = List([])
    }

    get state() {
        return this[Plugins]
    }

    /**
     * Add plugin to memory
     * @param plugin [Immutable.Map]
     * @returns {PluginManager}
     */
    add(plugin) {
        if (! plugin) return this
        plugin = Map.isMap(plugin) ? plugin : Map(plugin)
        this[Plugins] = this[Plugins].push(plugin)
        return this
    }

    /**
     * Run command against plugins regex, then execute the fn property, attach both the output and message
     * to the return plugin.
     * @param command
     * @param key
     * @returns {Array|Immutable.Iterable<K, M>|*|{}}
     */
    commands(command, key) {
        return this[Plugins].map(plugin => {
            let message = (plugin.get('exp')) ? plugin.get('exp').exec(command) : null
            if (message !== null && plugin.get('key') === keycode(key)) {
                plugin = plugin.set('output', plugin.get('fn')(message))
                plugin = plugin.set('message', message)
                return plugin
            }
        })
    }
}

module.exports = new PluginManager()
