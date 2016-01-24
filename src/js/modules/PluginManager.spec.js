/**
 * Created by kyleparisi on 1/17/16.
 */

import assert from 'assert'
import plugins from './PluginManager'
import {Map} from 'immutable'

describe('Plugin Manager', () => {
    describe('add', () => {
        it('should ignore undefined plugin', () => {
            assert.equal(plugins.add().state.count(), 0)
        })

        it('should add a plugin', () => {
            assert.equal(plugins.add(require('./plugins/log')).state.count(), 1)
        })
    })

    describe('commands', () => {
        it('should execute command and return output and message', () => {
            assert.equal(plugins.commands('log hello world', 13).get(0).get('output'), 'hello world')
        })
    })
})
