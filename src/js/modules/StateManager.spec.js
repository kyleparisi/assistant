/**
 * Created by kyleparisi on 1/30/16.
 */


import {AppState, CommandHistory, swap, get} from './StateManager'

describe('State Manager', () => {
    describe('swap', () => {
        it('should swap state with new keyed objects', () => {
            //console.log(AppState.state)
            swap('CommandHistory', CommandHistory.push({'command': 'ls -la'}))
            console.log(get('CommandHistory').model.get('command'))
        })
    })
})