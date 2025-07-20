// ipc接口基础返回值枚举类
export enum IpcResponseType {
  IpcResponseBase = 'IpcResponseBase'
}

export type IpcResponse = IpcResponseBase | undefined

// ipc接口基础返回值
export interface IpcResponseBase {
  success: boolean | undefined
  data: object | undefined
  error: string | undefined
}
