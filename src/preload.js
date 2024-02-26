// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')

// expose an API to choose available devices
contextBridge.exposeInMainWorld('nanodevices', {
  list_devices() {
    ipcRenderer.invoke('nanodevices:list_devices');
  },
  connect(deviceid) {
    ipcRenderer.invoke('nanodevices:connect', deviceid);
  },
  disconnect(deviceid) {
    ipcRenderer.invoke('nanodevices:disconnect', deviceid);
  },
  on(eventid_filter, callback) {
    ipcRenderer.on('nanodevices:event', (_event, eventid, deviceid, ...data) => {
      if (eventid_filter=="*" || eventid_filter==eventid) {
        callback(eventid, deviceid, ...data);
      }
    });
  }
});


contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  isDevelopment: process.env.NODE_ENV !== 'production',
  minimizeWindow: () => ipcRenderer.send('electron:minimizeWindow'),
  toggleMaximizeWindow: () => ipcRenderer.send('electron:toggleMaximizeWindow'),
  closeWindow: () => ipcRenderer.send('electron:closeWindow'),
  openExternal: (url) => ipcRenderer.send('electron:openExternal', url),
  onMaximized: (callback) => ipcRenderer.on('electron:maximized', callback),
  onUnmaximized: (callback) => ipcRenderer.on('electron:unmaximized', callback),
  onMenu: (callback) => ipcRenderer.on('electron:menu', (event, key) => {
    callback(key);
  }),
  openDevTools: () => ipcRenderer.send('electron:openDevTools'),
  reload: () => ipcRenderer.send('electron:reload'),
});