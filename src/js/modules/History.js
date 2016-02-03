/**
 * Created by kyleparisi on 1/13/16.
 */

import {List, Map} from 'immutable'

const History = Symbol();
const HistoryIndex = Symbol();

/**
 * History manager is an immmutable list of immutable maps.
 * Each map is of the form { command: 'XXXX' }
 */
class HistoryManager {
    constructor(objects) {

        if (objects === undefined) {
            this[History] = List([])
            this[HistoryIndex] = this[History].count() - 1
        } else {
            if (typeof objects == "string") {
                objects = JSON.parse(objects)
            }

            this[History] = List(objects).map(obj => Map(obj))
            this[HistoryIndex] = this[History].count() - 1
        }

    }

    get model() {
        return this[History]
    }

    get state() {
        return this[History]
    }

    get index() {
        // edges
        if (this[HistoryIndex] === this[History].count()) {
            return Math.max(--this[HistoryIndex], 0)
        }
        // in between
        return this[HistoryIndex]
    }

    /**
     * Change the index to the provided id
     * @param id [Integer]
     */
    jumpTo(id) {
        var id = Math.min(this[History].count(), id)
        id = Math.max(0, id)
        this[HistoryIndex] = id
        return this[History].get(id)
    }

    /**
     * Push an item to the history
     * @param item [String]
     * @returns {*}
     */
    push(item) {
        if (item === undefined) return false

        if (!Map.isMap(item) && !List.isList(item)) item = Map(item)
        if (Map.isMap(item)) this[History] = this[History].push(item)
        if (List.isList(item)) this[History] = item

        this[HistoryIndex] = this[History].count()
        return this
    }

    /**
     * Move the index forward and return that index entry
     * @returns {*|any|Map<K, V>|Map<string, V>}
     */
    forward() {
        this[HistoryIndex] = Math.min(this[History].count(), ++this[HistoryIndex])
        let next = this[History].get(this[HistoryIndex])
        return next ? next : null
    }

    /**
     * Move the index backward and return that index entry
     * @returns {*|any|Map<K, V>|Map<string, V>}
     */
    backward() {
        this[HistoryIndex] = Math.max(0, --this[HistoryIndex])
        let history = this[History].get(this[HistoryIndex])
        return history ? history : null
    }

    /**
     * Reset the history to a blank list
     * @returns {HistoryManager}
     */
    clear() {
        this[History] = this[History].clear()
        this[HistoryIndex] = this[History].count()
        return this
    }
}

module.exports = HistoryManager
