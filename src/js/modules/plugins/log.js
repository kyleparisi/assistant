/**
 * Created by kyleparisi on 1/18/16.
 */

module.exports = {
    help: 'Console logs any input',
    dependencies: 'None',
    exp: /log (.*)/,
    key: 'enter',
    card: 'blank',
    fn: x => {
        console.log(x[1] + '\n')
        return x[1]
    }
}
