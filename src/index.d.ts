export {}
declare global {
  interface Window {
    ipc: {
      windowIpcSend: (arg: BaseIpcRequest) => void
      windowIpcInvoke: (arg: BaseIpcRequest) => Promise<IpcResponseBase>
    }
  }
}
