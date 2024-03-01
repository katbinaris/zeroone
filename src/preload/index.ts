import { contextBridge, createIpcRenderer, GetApiType } from 'electron-typescript-ipc'

export type API = GetApiType<
  {
    // Invoke
    list_devices: () => Promise<void>
    connect: (deviceid: string) => Promise<void>
    disconnect: (deviceid: string) => Promise<void>
    send: (deviceid: string, jsonstr: string) => Promise<void>
    platform: NodeJS.Platform
    isDevelopment: boolean
    minimizeWindow: void
    toggleMaximizeWindow: void
    closeWindow: void
    openExternal: (url: string) => void
    openDevTools: void
    reload: void
  },
  {
    // On
    on_event: (
      eventid_filter: string,
      callback: (eventid: string, deviceid: string, ...data: any[]) => void
    ) => void
    onMaximized: (callback: () => void) => void
    onUnmaximized: (callback: () => void) => void
    onMenu: (callback: (key: string) => void) => void
  }
>

const ipcRenderer = createIpcRenderer<API>()

const api: API = {
  invoke: {
    async list_devices() {
      return await ipcRenderer.invoke('nanodevices:list_devices')
    },
    async connect(deviceid) {
      return await ipcRenderer.invoke('nanodevices:connect', deviceid)
    },
    async disconnect(deviceid) {
      return await ipcRenderer.invoke('nanodevices:disconnect', deviceid)
    },
    async send(deviceid, jsonstr) {
      return await ipcRenderer.invoke('nanodevices:send', deviceid, jsonstr)
    },
    platform: process.platform,
    isDevelopment: process.env.NODE_ENV !== 'production',
    minimizeWindow: ipcRenderer.send('electron:minimizeWindow'),
    toggleMaximizeWindow: ipcRenderer.send('electron:toggleMaximizeWindow'),
    closeWindow: ipcRenderer.send('electron:closeWindow'),
    openExternal: (url) => ipcRenderer.send('electron:openExternal', url),
    openDevTools: ipcRenderer.send('electron:openDevTools'),
    reload: ipcRenderer.send('electron:reload')
  },
  on: {
    on_event: (listener) => ipcRenderer.on('nanodevices:event', listener),
    onMaximized: (listener) => ipcRenderer.on('electron:maximized', listener),
    onUnmaximized: (listener) => ipcRenderer.on('electron:unmaximized', listener),
    onMenu: (listener) => ipcRenderer.on('electron:menu', listener)
  }
}

contextBridge.exposeInMainWorld('electron', api)

declare global {
  interface Window {
    electron: API
  }
}
