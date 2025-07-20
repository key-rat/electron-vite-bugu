import { IpcPayload } from '@type/ipc/param/payload'
import { IBrowserWindowConstructorManager } from '@type/window/windowService'
import { BrowserWindow } from 'electron'

export type WindowActionHandler = (win: BrowserWindow, payload?: IpcPayload) => void
export type WindowInvokeHandler = (
  target: IBrowserWindowConstructorManager,
  payload?: IpcPayload
) => object

// 主进程窗口ipc操作函数
export enum WINDOW_IPC_SEND_ACTION {
  CLOSE = 'close',
  TOGGLE_PIN = 'togglePin',
  HIDE = 'hide',
  SHOW = 'show',
  MINIMIZE = 'minimize',
  TOGGLE_MAXIMIZE = 'toggleMaximize',
  TOGGLE_FULLSCREEN = 'toggleFullscreen',
  CREATE = 'create',
  RELOAD = 'reload',
  CLOSE_ALL = 'closeAll'
}

// 主进程窗口ipc数据获取函数
export enum WINDOW_IPC_INVOKE_ACTION {
  GET_WINDOW_INFO = 'getWindowInfo'
}
