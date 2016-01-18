/**
 * Created by kyleparisi on 1/17/16.
 */

import assert from 'assert'
import plugins from './PluginManager'
import {Map} from 'immutable'

let log = Map({
    exp: /log/,
    key: 'enter',
    callback: e => console.log(e)
})

describe('Plugin Manager', () => {
    describe('add', () => {
        it('should ignore undefined plugin', () => {
            assert.equal(plugins.add().state.count(), 0)
        })

        it('should add a plugin', () => {
            assert.equal(plugins.add(log).state.count(), 1)
        })
    })

    describe('commands', () => {
        it('should run the plugin callback', () => {
            assert.equal(
                plugins.commands('log', 'enter').forEach(fn => fn('hello')), 1)
        })
    })
})
