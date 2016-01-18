/**
 * Created by kyleparisi on 1/17/16.
 */

import {List} from 'immutable'

const Cards = Symbol()

/**
 * Card Manager is responsible for storage of card types
 */
class CardManager {
    constructor() {
        this[Cards] = List([])
    }

    get state() {
        return this[Cards]
    }

    /**
     * Add card to memory
     * @param card
     * @returns {CardManager}
     */
    add(card) {
        if (! card) return this
        this[Cards] = this[Cards].push(card)
        return this
    }

    /**
     * Get template for a type of card
     * @param type
     * @returns {*}
     */
    type(type) {
        return this[Cards].filter(map => map.get('type') === type).get(0).get('template')
    }
}

export default new CardManager()
