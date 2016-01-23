/**
 * Created by kyleparisi on 1/22/16.
 */

import {h, diff, patch, create} from 'virtual-dom'

let AppTemplate = Symbol()
let RootNode = Symbol()
let State = Symbol()

/**
 * Responsible for rendering the entire app view based on commands and cards
 */
class ViewManager {
    constructor(robot) {
        this[AppTemplate] = (command, cards) => {
            return h('.container',
                [h('.input', [
                    h('.input__icon',
                        h('span.fa.fa-terminal', '>_')),
                    h('input#input', {
                        autofocus: true,
                        type: 'text',
                        placeholder: 'Type your commands here...',
                        onkeyup: function(e) {robot.hear(this.value, e.keyCode)},
                        value: command
                    })
                ]),
                    h('.output', cards)])
        }
        this[State] = this[AppTemplate]()
        this[RootNode] = create(this[State])
        document.body.appendChild(this[RootNode])
    }

    get state() {
        return this[State]
    }

    /**
     * Update the app's entire view
     * @param command
     * @param cards
     */
    update(command, cards) {
        var newTree = this[AppTemplate](command, cards)
        var patches = diff(this[State], newTree)
        this[RootNode] = patch(this[RootNode], patches)
        this[State] = newTree
    }
}

module.exports = ViewManager
