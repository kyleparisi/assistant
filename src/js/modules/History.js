/**
 * Created by kyleparisi on 1/13/16.
 */

import Immutable from 'immutable'

const History = Symbol();
const HistoryIndex = Symbol();
const BlankCommand = Immutable.Map({ command: '' })

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
            console.log(this[History])
        }

    }

    get state() {
        return this[History]
    }

    get index() {
        return this[HistoryIndex]
    }

    push(item) {
        if (item === undefined) return false
        this[History] = this[History].push(Immutable.Map({ command: item }))
        this[HistoryIndex] = this[History].count()
        return this
    }

    forward() {
        this[HistoryIndex] = Math.min(this[History].count(), ++this[HistoryIndex])
        let next = this[History].get(this[HistoryIndex])
        return next ? next : BlankCommand
    }

    backward() {
        this[HistoryIndex] = Math.max(0, --this[HistoryIndex])
        let history = this[History].get(this[HistoryIndex])
        return history ? history : BlankCommand
    }

    clear() {
        this[History] = this[History].clear().push(BlankCommand)
        this[HistoryIndex] = this[History].count()
        return this
    }
}

export default HistoryManager
