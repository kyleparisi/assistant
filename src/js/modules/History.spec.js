/**
 * Created by kyleparisi on 1/14/16.
 */

import assert from 'assert'
import {Map} from 'immutable'
import HistoryManager from './History'

let history = new HistoryManager()

describe('History', () => {

    describe('push', () => {
        it('should return false on undefined push call', () => {
            assert(!history.push())
        })

        it('should push a command object', () => {
            assert.equal(history.push(Map({command: 'test'})).index, 0)
            assert.equal(history.push(Map({command: 'ls'})).index, 1)
        })
    })

    describe('forward', () => {
        it('should return undefined at last index', () => {
            assert.equal(history.forward(), undefined)
        })
    })

    describe('backward', () => {
        it('should return ls', () => {
            assert.equal(history.backward().get('command'), 'ls')
        })
        it('should return test', () => {
            assert.equal(history.backward().get('command'), 'test')
        })
        it('should return test', () => {
            assert.equal(history.backward().get('command'), 'test')
        })
    })

    describe('forward', () => {
        it('should return ls', () => {
            assert.equal(history.forward().get('command'), 'ls')
        })
    })

    describe('clear', () => {
        it('should reset history', () => {
            assert.equal(history.clear().index, 0)
            assert.equal(history.forward(), null)
            assert.equal(history.backward(), null)
            assert.equal(history.clear().index, 0)
        })
    })

    describe('local storage', () => {
        it('should instantiate with local storage data', () => {
            let persistedHistory = new HistoryManager([{command: ''},{command: 'test'}])
            assert.equal(persistedHistory.state.get(1).get('command'), 'test')
            assert.equal(persistedHistory.forward(), null)
            assert.equal(persistedHistory.backward().get('command'), 'test')
            assert.equal(persistedHistory.backward().get('command'), '')
        })
    })

    describe('jump to', () => {
        it('should jump to an index', () => {
            history.push(Map({command: 'ls'}))
            history.push(Map({command: 'ls -la'}))
            assert.equal(history.jumpTo(0).get('command'), 'ls')
            assert.equal(history.jumpTo(1).get('command'), 'ls -la')
        })
    })
})
