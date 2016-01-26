/**
 * Created by kyleparisi on 1/23/16.
 */

module.exports = function (robot) {

    setTimeout(() => robot.hear('log hello', 13), 1000)
    setTimeout(() => robot.hear('log test', 13), 2000)

    setTimeout(() => robot.up(), 3000)
    setTimeout(() => robot.up(), 4000)

    setTimeout(() => robot.down(), 5000)
    setTimeout(() => robot.down(), 6000)
    setTimeout(() => robot.down(), 7000)

}