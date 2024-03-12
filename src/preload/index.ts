import { contextBridge, ipcRenderer } from 'electron'

// expose an API to choose available devices
contextBridge.exposeInMainWorld('nanoIpc', {
  listAttachedDevices() {
    return ipcRenderer.invoke('nanoSerialApi:list_devices')
  },
  connect(deviceid) {
    return ipcRenderer.invoke('nanoSerialApi:connect', deviceid)
  },
  disconnect(deviceid) {
    return ipcRenderer.invoke('nanoSerialApi:disconnect', deviceid)
  },
  on(callback) {
    ipcRenderer.on('nanoSerialApi:event', (_event, eventid, deviceid, ...data) => {
      callback(eventid, deviceid, ...data)
    })
  },
  send(deviceid, obj) {
    return ipcRenderer.invoke('nanoSerialApi:send', deviceid, JSON.stringify(obj))
  }
})

contextBridge.exposeInMainWorld('appIpc', {
  platform: process.platform,
  isDevelopment: process.env.NODE_ENV !== 'production',
  minimizeWindow: () => ipcRenderer.send('electron:minimizeWindow'),
  toggleMaximizeWindow: () => ipcRenderer.send('electron:toggleMaximizeWindow'),
  closeWindow: () => ipcRenderer.send('electron:closeWindow'),
  openExternal: (url) => ipcRenderer.send('electron:openExternal', url),
  onMaximized: (callback) => ipcRenderer.on('electron:maximized', callback),
  onUnmaximized: (callback) => ipcRenderer.on('electron:unmaximized', callback),
  onMenu: (callback) =>
    ipcRenderer.on('electron:menu', (event, key) => {
      callback(key)
    }),
  openDevTools: () => ipcRenderer.send('electron:openDevTools'),
  reload: () => ipcRenderer.send('electron:reload')
})
