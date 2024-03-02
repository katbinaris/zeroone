import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // expose an API to choose available devices
    contextBridge.exposeInMainWorld('nanodevices', {
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
        console.log('attaching filter for ', eventid_filter)
        ipcRenderer.on('nanodevices:event', (_event, eventid, deviceid, ...data) => {
          console.log('Event in ipcRenderer ', eventid, deviceid, data)
          if (eventid_filter == '*' || eventid_filter == eventid) {
            callback(eventid, deviceid, ...data)
          }
        })
      },
      send(deviceid, jsonstr) {
        return ipcRenderer.invoke('nanodevices:send', deviceid, jsonstr)
      }
    })

    contextBridge.exposeInMainWorld('electron', {
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
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
