import { contextBridge, ipcRenderer } from 'electron'

const api = {
  env: process.env,
  minimize() {
    ipcRenderer.send('minimize')
  },
  maximize() {
    ipcRenderer.send('maximize')
  },
  close() {
    ipcRenderer.send('close')
  },
  chatWithAi(config) {
    return ipcRenderer.invoke('chatWithAi', config)
  }
}

contextBridge.exposeInMainWorld('api', api)
