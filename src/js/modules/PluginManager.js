/**
 * Created by kyleparisi on 1/17/16.
 */

import {List} from 'immutable'

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
        this[Plugins] = this[Plugins].push(plugin)
        return this
    }

    /**
     * Get a list of commands to be executed based on regex
     * @param command [Regex]
     * @param key [Int] Keyboard key
     * @returns {Array|Iterable<K, M>|*|{}}
     */
    commands(command, key) {
        return this[Plugins].map((plugin) => {
            let message = plugin.get('exp').exec(command)
            if (message !== null && plugin.get('key') === key) {
                return plugin.get('callback')
            }
        })
    }
}

export default new PluginManager()
