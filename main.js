/**
 * Created by kyleparisi on 1/12/16.
 */

'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const menuTemplate = require('./src/js/modules/menu-items/menu');

const BrowserWindow = electron.BrowserWindow;

var mainWindow, webContents;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    webContents = mainWindow.webContents;

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    if (process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools({detach: false});
    }

    var menu = Menu.buildFromTemplate(menuTemplate(webContents, app.getName()));
    Menu.setApplicationMenu(menu);

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
