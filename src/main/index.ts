import { app, shell, BrowserWindow, ipcMain, Menu, MenuItem } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import nanodevices from './backend/nanodevices'

const zoomFactor = 1
const windowWidth = 1111
const windowHeight = 666

const appMenu = {
  device: {
    label: 'Device',
    submenu: {
      connect: { label: 'Connect', shortcut: 'CmdOrCtrl+D' },
      nextDevice: { label: 'Next Device', shortcut: 'CmdOrCtrl+N' },
      orientation: { label: 'Orientation', shortcut: 'CmdOrCtrl+R' },
      skin: { label: 'Skin', shortcut: 'CmdOrCtrl+S' },
      export: { label: 'Export Settings', shortcut: 'CmdOrCtrl+E' },
      import: { label: 'Import Settings', shortcut: 'CmdOrCtrl+I' },
      quit: { label: 'Quit', shortcut: 'CmdOrCtrl+Q', action: () => app.quit() }
    }
  }
}

const createMainWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    width: windowWidth,
    height: windowHeight,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
    resizable: true,
    minWidth: windowWidth / 3,
    minHeight: windowHeight / 3,
    maximizable: true,
    fullscreenable: false,
    center: true,
    backgroundColor: 'black',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      devTools: is.dev,
      preload: join(__dirname, '../preload/index.js'),
      zoomFactor: zoomFactor,
      sandbox: false
    }
  })

  mainWindow.setAspectRatio(windowWidth / windowHeight)
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.setZoomFactor(zoomFactor)
  })
  mainWindow.on('resize', () => {
    mainWindow.webContents.setZoomFactor((zoomFactor * mainWindow.getSize()[0]) / windowWidth)
  })
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('electron:maximized')
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('electron:unmaximized')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('ZERO/ONE')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('nanodevices:list_devices', () => nanodevices.list_devices())
  ipcMain.handle('nanodevices:connect', (event, deviceid) => nanodevices.connect(deviceid))
  ipcMain.handle('nanodevices:disconnect', nanodevices.disconnect)
  ipcMain.handle('nanodevices:send', nanodevices.send)
  const mainWindow = createMainWindow()
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
  ipcMain.on('electron:openDevTools', () => mainWindow.webContents.toggleDevTools())
  ipcMain.on('electron:reload', () => mainWindow.webContents.reloadIgnoringCache())
  nanodevices.on('nanodevices:device-attached', (deviceid, ...data) => {
    console.log('Attached event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'device-attached', deviceid, ...data)
  })
  nanodevices.on('nanodevices:device-detached', (deviceid, ...data) => {
    console.log('Detached event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'device-detached', deviceid, ...data)
  })
  nanodevices.on('nanodevices:device-error', (deviceid, ...data) => {
    console.log('Error event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'device-error', deviceid, ...data)
  })
  nanodevices.on('nanodevices:connected', (deviceid, ...data) => {
    console.log('Connected event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'connected', deviceid, ...data)
  })
  nanodevices.on('nanodevices:disconnected', (deviceid, ...data) => {
    console.log('Disconnected event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'disconnected', deviceid, ...data)
  })
  nanodevices.on('nanodevices:update', (deviceid, ...data) => {
    console.log('Update event', deviceid, data)
    mainWindow.webContents.send('nanodevices:event', 'update', deviceid, ...data)
  })
  const menu = new Menu()
  for (const menuItem of Object.values(appMenu)) {
    menu.append(
      new MenuItem({
        label: menuItem.label,
        submenu: Object.entries(menuItem.submenu).map(([key, subMenuItem]) => {
          return {
            label: subMenuItem.label,
            accelerator: subMenuItem.shortcut,
            click:
              subMenuItem.action ||
              (() => {
                mainWindow.webContents.send('electron:menu', key)
              })
          }
        })
      })
    )
  }
  if (is.dev) {
    menu.append(
      new MenuItem({
        label: 'Debug',
        submenu: [
          {
            label: 'Developer Tools',
            accelerator: 'CmdOrCtrl+Shift+I',
            click: () => mainWindow.webContents.toggleDevTools()
          }
        ]
      })
    )
  }

  Menu.setApplicationMenu(menu)
  //mainWindow.webContents.openDevTools()
  setInterval(() => nanodevices._list(), 1000)

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      const mainWindow = createMainWindow()
      mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.show()
        mainWindow.focus()
      })
    }
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
