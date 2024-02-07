import { app, BrowserWindow, globalShortcut, shell } from 'electron'
import path from 'path'
import ess from 'electron-squirrel-startup'
import { ipcMain } from 'electron'
import nanodevices from './backend/nanodevices.js'
import nano from './backend/nano.js'


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (ess) {
  app.quit()
}

const isDevelopment = process.env.NODE_ENV !== 'production'

// Minimum time to show the splash screen, in milliseconds
const splashTime = isDevelopment ? 500 : 3000

const zoomFactor = 1
const width = 1111
const height = 666

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: width,
    height: height,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    resizable: true,
    minWidth: width / 3,
    minHeight: height / 3,
    maximizable: true,
    fullscreenable: false,
    center: true,
    backgroundColor: 'black',
    icon: path.join(__dirname, `/assets/favicon.png`),
    webPreferences: {
      devTools: isDevelopment,
      preload: path.join(__dirname, 'preload.js'),
      zoomFactor: zoomFactor,
    },
  })

  mainWindow.setAspectRatio(width / height)
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.setZoomFactor(zoomFactor)
  })
  mainWindow.on('resize', () => {
    mainWindow.webContents.setZoomFactor(zoomFactor * mainWindow.getSize()[0] / width)
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('electron:maximized')
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('electron:unmaximized')
  })

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/index.html`)
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  return mainWindow
}

const createLoadingWindow = (mainWindow) => {
  const loadingWindow = new BrowserWindow({
    show: false,
    width: 400,
    height: 600,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    transparent: true,
    frame: false,
    center: true,
    backgroundColor: 'black',
    webPreferences: {
      devTools: isDevelopment,
    },
  })
  const startTime = Date.now()
  let loading = true
  let loadingTimeout
  loadingWindow.once('show', () => {
    mainWindow.webContents.once('did-finish-load', () => {
      loadingTimeout = setTimeout(() => {
        loading = false
        mainWindow.show()
        mainWindow.focus()
        loadingWindow.close()
      }, Math.max(0, splashTime - (Date.now() - startTime)))
    })
  })
  loadingWindow.once('closed', () => {
    if (loading) {
      clearTimeout(loadingTimeout)
      mainWindow.close()
    }
  })
  loadingWindow.webContents.once('did-finish-load', () => {
    loadingWindow.show()
    loadingWindow.focus()
  })
  if (LOADING_WINDOW_VITE_DEV_SERVER_URL) {
    loadingWindow.loadURL(`${LOADING_WINDOW_VITE_DEV_SERVER_URL}/loading.html`)
  } else {
    loadingWindow.loadFile(path.join(__dirname, `../renderer/${LOADING_WINDOW_VITE_NAME}/loading.html`))
  }
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
  const mainWindow = createMainWindow()
  createLoadingWindow(mainWindow)
  ipcMain.on('electron:minimizeWindow', () => mainWindow.minimize())
  ipcMain.on('electron:toggleMaximizeWindow', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  ipcMain.on('electron:closeWindow', () => mainWindow.close())
  ipcMain.on('electron:openExternal', (_event, url) => shell.openExternal(url))
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
    const mainWindow = createMainWindow()
    mainWindow.webContents.once('did-finish-load', () => {
      mainWindow.show()
    })
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Disable pinch zoom
app.commandLine.appendSwitch('disable-pinch')

// Disable zoom shortcuts
const ZOOM_IN_SHORTCUTS = ['CmdOrCtrl+numadd', 'CmdOrCtrl+Plus']
const ZOOM_OUT_SHORTCUTS = ['CmdOrCtrl+numsub', 'CmdOrCtrl+-']
const ZOOM_RESET_SHORTCUTS = ['CmdOrCtrl+num0', 'CmdOrCtrl+0']

app.on('browser-window-focus', () => {
  globalShortcut.registerAll([
    ...ZOOM_IN_SHORTCUTS,
    ...ZOOM_OUT_SHORTCUTS,
    ...ZOOM_RESET_SHORTCUTS,
  ], () => {
  })
})

app.on('browser-window-blur', () => {
  globalShortcut.unregisterAll()
})