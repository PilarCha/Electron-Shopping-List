const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;
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
  //Quit app when closed
  mainWindow.on('closed', () => {
    app.quit();
  })
  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);

});

//createAddWindow
createAddWindow = () => {
  //create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add Shopping List Item',

    webPreferences: {
      nodeIntegration: true
    }
  });
  //load HTML into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Garbage collection handle
  addWindow.on('close', () => {
    addWindow = null;
  })
}
//create menu tamplate

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddWindow();
        }
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
