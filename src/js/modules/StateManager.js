/**
 * Created by kyleparisi on 1/29/16.
 */

import {List} from 'immutable'
import History from './History'

export var Plugins = List([])
export var Cards = List([])
export var CommandHistory = new History([{command: ''}])
export var IOs = new History([{
    input: '',
    output: '',
    cards: List([])
}])
export var AppState = new History([{Plugins: Plugins, Cards: Cards, CommandHistory: CommandHistory, IOs: IOs}])

export function swap(key, value) {

    if (!key || !value) return
    if (key.indexOf('History') > 0) {
        console.log(AppState.state.get(key).set(key, get(key).push(value)))
        //AppState = AppState.push(get(key).push(value))
    } else {
        AppState = AppState.push(AppState.state.mergeDeep(AppState.state, AppState.state.set(key, value)))
    }

}

export function get(key) {
    let state = AppState.state
    let index = AppState.index
    let child = state.get(index).get(key)
    return child
}