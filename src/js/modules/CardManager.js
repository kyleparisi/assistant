/**
 * Created by kyleparisi on 1/17/16.
 */

import {List, Map} from 'immutable'

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
        card = Map.isMap(card) ? card : Map(card)
        this[Cards] = this[Cards].push(Map(card))
        return this
    }

    /**
     * Get template for a type of card
     * @param type
     * @returns {*}
     */
    type(type) {
        if (this[Cards].count() === 0 || type === undefined) return
        return this[Cards].filter(map => map.get('type') === type).get(0).get('template')
    }
}

module.exports = new CardManager()
