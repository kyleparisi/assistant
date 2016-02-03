/**
 * Created by kyleparisi on 1/17/16.
 */

import assert from 'assert'
import cards from './CardManager'
import {h} from 'virtual-dom'
import {Map} from 'immutable'

let helloCard = Map({
    type: 'hello',
    template: h('div', 'Hello World!')
})

let dynamicCard = Map({
    type: 'dynamic',
    template: (content) => h('div', content)
})

describe('Card Manager', () => {
    describe('add', () => {
        it('should ignore undefined cards', () => {
            assert.equal(cards.add().state.count(), 0)
        })

        it('should add a card', () => {
            cards.add(helloCard)
            assert(cards.state.count(), 1)
            cards.add(dynamicCard)
            assert(cards.state.count(), 2)
        })
    })

    describe('type', () => {
        it('should return card of type', () => {
            assert.equal(cards.type('hello'), helloCard.get('template'))
            assert.deepEqual(cards.type('dynamic')('Hello Kyle!'), h('div', 'Hello Kyle!'))
        })
    })
})
