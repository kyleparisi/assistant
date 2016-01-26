/**
 * Created by kyleparisi on 1/20/16.
 */

module.exports = {
    help: 'Undo app state',
    dependencies: 'History',
    shortcuts: 'command+z',
    fn: () => history.backward()
}
