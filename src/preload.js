// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron')


// expose an API to choose available devices
contextBridge.exposeInMainWorld('nanodevices', {
    list() { ipcRenderer.invoke('nanodevices:list'); },
    connect(devicename) { ipcRenderer.invoke('nanodevices:connect', devicename); },
    disconnect() { ipcRenderer.invoke('nanodevices:disconnect'); },
    on_device_attached(listener) { ipcRenderer.on('nanodevice-attached', (_event, value) => listener(value)); },
    on_device_detached(listener) { ipcRenderer.on('nanodevice-detached', (_event, value) => listener(value)); },
});


// expose an API to communicate with the nano device
contextBridge.exposeInMainWorld('nanodevice', {
    get_value(pid, tid, vid){ ipcRenderer.invoke('nano:get', pid, tid, vid); },
    set_value(pid, tid, vid, value){ ipcRenderer.invoke('nano:set', pid, tid, vid, value); },
    on_value(listener){ ipcRenderer.on('nano-onvalue', (_event, value) => listener(value)); }
});