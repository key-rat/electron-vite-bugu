// src/preload/index.ts
import { BaseIpcRequest } from '@type/ipc/param/requset'
import { IpcResponseBase } from '@type/ipc/param/response'
import { ipcRenderer, contextBridge } from 'electron'

const ipc = {
  windowIpcSend: (arg: BaseIpcRequest): void => ipcRenderer.send(arg.channel, arg),

  windowIpcInvoke: (arg: BaseIpcRequest): Promise<IpcResponseBase> =>
    ipcRenderer.invoke(arg.channel, arg)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('ipc', ipc)
  } catch (error) {
    console.error(error)
  }
} else {
  window.ipc = ipc
}
