import { IPC_ACTION } from './action'
import { IPC_CATEGORY } from './category'
import { IPC_COMM_METHOD } from './commMethod'
import { IpcPayload, IpcPayloadType } from './payload'
import { IpcResponseType } from './response'
import { IpcTargetWindowType } from './target'

// ipc请求接口基础参数
export interface BaseIpcRequest {
  channel: string
  category: IPC_CATEGORY // 操作类别
  commMethod: IPC_COMM_METHOD // 通信方式
  action: IPC_ACTION // 具体操作函数
  description: string // 请求描述
  from: IpcTargetWindowType //操作来源窗口
  to: IpcTargetWindowType //操作目标窗口
  payload: IpcPayload //请求参数
  payloadType: IpcPayloadType | undefined //请求参数
  responseType: IpcResponseType | undefined //返回参数类型，字符串
}
