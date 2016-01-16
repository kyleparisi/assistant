/**
 * Created by kyleparisi on 1/16/16.
 */

import Immutable from 'immutable'

var appState = Immutable.Map({ count: 0 })

let read = (state, key, params) => {
    return state.get(key, 'Not defined')
}

console.log(read(appState, 'test'))

let mutate = (state, key, params) => {
    if (key === 'incriment') {
        var value = state.get('count', false)
        appState = appState.set('count', value + 1)
        return appState.get('count')
    }
    return 'Mutation type not found'
}

console.log(mutate(appState, 'incriment'), appState)