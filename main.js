const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

//Listen for app to be ready

app.on('ready', function() {
  //create new window
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  //load HTML into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);

});

//create menu tamplate

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item'
      },
      {
        label: 'Clear Items'
      },
      {
        label:'Quit',
        //shortcut for ctrl q. testing is its a mac or win/linux
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl + Q',
        click() {
          app.quit();
        }
      }

  ]
  }
]
