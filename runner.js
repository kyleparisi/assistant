/**
 * Created by kyleparisi on 1/23/16.
 */

import {spawn} from 'child_process'

module.exports = (path, env={}) => {
    const electron = require('electron-prebuilt');
    const options = {
        env: env,
        stdio: 'inherit'
    };
    return spawn(electron, [path], options);
}