/**
 * Created by kyleparisi on 1/13/16.
 */

import Immutable from 'immutable'

const History = Symbol();
const HistoryIndex = Symbol();
const BlankCommand = Immutable.Map({ command: '' })

/**
 * History manager is an immmutable list of immutable maps.
 * Each map is of the form { command: 'XXXX' }
 */
class HistoryManager {
    constructor(json) {

        if (json === undefined) {
            this[History] = Immutable.List([])
            this[History] = this[History].push(BlankCommand)
            this[HistoryIndex] = this[History].count()
        } else {
            if (typeof json == "string") {
                json = JSON.parse(json)
            }

            this[History] = Immutable.List(json).map(obj => Immutable.Map(obj))
            this[HistoryIndex] = this[History].count()
        }

    }

    get state() {
        return this[History]
    }

    get index() {
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
        this[History] = this[History].push(Immutable.Map({ command: item }))
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
        return next ? next : BlankCommand
    }

    /**
     * Move the index backward and return that index entry
     * @returns {*|any|Map<K, V>|Map<string, V>}
     */
    backward() {
        this[HistoryIndex] = Math.max(0, --this[HistoryIndex])
        let history = this[History].get(this[HistoryIndex])
        return history ? history : BlankCommand
    }

    /**
     * Reset the history to a blank list
     * @returns {HistoryManager}
     */
    clear() {
        this[History] = this[History].clear().push(BlankCommand)
        this[HistoryIndex] = this[History].count()
        return this
    }
}

module.exports = HistoryManager
