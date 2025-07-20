import { IBrowserWindowConstructorManagerParam } from '@type/window/windowService'
import { BrowserWindowConstructorOptions } from 'electron'

// ipc请求参数类型
export type IpcPayload = CreateWindowIpcPayload | undefined

export enum IpcPayloadType {
  CreateWindowIpcPayload = 'CreateWindowIpcPayload'
}

// 创建窗口Payload类型
export interface CreateWindowIpcPayload {
  optionsParam: BrowserWindowConstructorOptions
  managerParam: IBrowserWindowConstructorManagerParam
}
