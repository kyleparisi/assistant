/**
 * Created by kyleparisi on 1/25/16.
 */

module.exports = {
    help: 'Console logs any input',
    dependencies: 'None',
    exp: /.*/,
    key: 'down',
    fn: () => robot.down()
}