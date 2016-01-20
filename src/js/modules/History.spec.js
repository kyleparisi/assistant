/**
 * Created by kyleparisi on 1/14/16.
 */

import assert from 'assert'
import {Map} from 'immutable'
import HistoryManager from './History'

let history = new HistoryManager()

describe.skip('History', () => {

    describe('push', () => {
        it('should return false on undefined push call', () => {
            assert(!history.push())
        })

        it('should push a command object', () => {
            assert.equal(history.push(Map({command: 'test'})).index, 2)
            assert.equal(history.push(Map({command: 'ls'})).index, 3)
        })
    })

    describe('forward', () => {
        it('should return blank string at last index', () => {
            assert.equal(history.forward().get('command'), '')
        })
    })

    describe('backward', () => {
        it('should return ls', () => {
            assert.equal(history.backward().get('command'), 'ls')
        })
        it('should return test', () => {
            assert.equal(history.backward().get('command'), 'test')
        })
        it('should return blank string', () => {
            assert.equal(history.backward().get('command'), '')
        })
    })

    describe('forward', () => {
        it('should return test', () => {
            assert.equal(history.forward().get('command'), 'test')
        })
    })

    describe('clear', () => {
        it('should reset history', () => {
            assert.equal(history.clear().index, 1)
            assert.equal(history.forward().get('command'), '')
            assert.equal(history.backward().get('command'), '')
            assert.equal(history.clear().index, 1)
        })
    })

    describe('local storage', () => {
        it('should instantiate with local storage data', () => {
            let persistedHistory = new HistoryManager([{command: ''},{command: 'test'}])
            assert.equal(persistedHistory.state.get(1).get('command'), 'test')
            assert.equal(persistedHistory.forward().get('command'), '')
            assert.equal(persistedHistory.backward().get('command'), 'test')
            assert.equal(persistedHistory.backward().get('command'), '')
        })
    })

    describe('jump to', () => {
        it('should jump to an index', () => {
            history.push(Map({command: 'ls'}))
            history.push(Map({command: 'ls -la'}))
            assert.equal(history.jumpTo(1).get('command'), 'ls')
            assert.equal(history.jumpTo(2).get('command'), 'ls -la')
        })
    })
})
