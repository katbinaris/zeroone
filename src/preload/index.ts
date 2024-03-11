import { contextBridge, ipcRenderer } from 'electron'

// expose an API to choose available devices
contextBridge.exposeInMainWorld('nanoSerialApi', {
  list_devices() {
    return ipcRenderer.invoke('nanoSerialApi:list_devices')
  },
  connect(deviceid) {
    return ipcRenderer.invoke('nanoSerialApi:connect', deviceid)
  },
  disconnect(deviceid) {
    return ipcRenderer.invoke('nanoSerialApi:disconnect', deviceid)
  },
  on_event(eventid_filter, callback) {
    //console.log('attaching filter for ', eventid_filter)
    ipcRenderer.on('nanoSerialApi:event', (_event, eventid, deviceid, ...data) => {
      //console.log('Event in ipcRenderer ', eventid, deviceid, data)
      if (eventid_filter == '*' || eventid_filter == eventid) {
        callback(eventid, deviceid, ...data)
      }
    })
  },
  send(deviceid, obj) {
    return ipcRenderer.invoke('nanoSerialApi:send', deviceid, JSON.stringify(obj))
  },
  save(deviceid) {
    return ipcRenderer.invoke('nanoSerialApi:send', deviceid, JSON.stringify({ save: true }))
  }
})

contextBridge.exposeInMainWorld('electronApi', {
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
