import { app, BrowserWindow } from 'electron'
import path from 'path'
import ess from 'electron-squirrel-startup'
import { ipcMain } from 'electron'
import nanodevices from './backend/nanodevices.js'
import nano from './backend/nano.js'


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (ess) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    titleBarStyle: 'hidden',
    resizable: false,
    icon: path.join(__dirname, `/assets/favicon.png`),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('nanodevices:list', nanodevices.list)
  ipcMain.handle('nanodevices:connect', nanodevices.connect)
  ipcMain.handle('nanodevices:disconnect', nanodevices.disconnect)
  ipcMain.handle('nano:get', nano.get)
  ipcMain.handle('nano:set', nano.set)
  const mainWindow = createWindow()
  nanodevices.onAttach((device) => {
    console.log('Attached device', device)
    mainWindow.webContents.send('nanodevice-attached', device)
  })
  nanodevices.onDetach((device) => {
    console.log('Detached device', device)
    mainWindow.webContents.send('nanodevice-detached', device)
  })
  nano.onValueReceived((value) => {
    console.log('Value received', value)
    mainWindow.webContents.send('nano-onvalue', value)
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
