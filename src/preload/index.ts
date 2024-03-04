import { contextBridge, ipcRenderer } from 'electron'

// expose an API to choose available devices
contextBridge.exposeInMainWorld('nanoDevicesAPI', {
  list_devices() {
    return ipcRenderer.invoke('nanodevices:list_devices')
  },
  connect(deviceid) {
    return ipcRenderer.invoke('nanodevices:connect', deviceid)
  },
  disconnect(deviceid) {
    return ipcRenderer.invoke('nanodevices:disconnect', deviceid)
  },
  on_event(eventid_filter, callback) {
    //console.log('attaching filter for ', eventid_filter)
    ipcRenderer.on('nanodevices:event', (_event, eventid, deviceid, ...data) => {
      //console.log('Event in ipcRenderer ', eventid, deviceid, data)
      if (eventid_filter == '*' || eventid_filter == eventid) {
        callback(eventid, deviceid, ...data)
      }
    })
  },
  send(deviceid, obj) {
    return ipcRenderer.invoke('nanodevices:send', deviceid, JSON.stringify(obj))
  }
})

contextBridge.exposeInMainWorld('electronAPI', {
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
