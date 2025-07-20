import { IPC_CATEGORY } from '@type/ipc/param/category'
import { IPC_COMM_METHOD } from '@type/ipc/param/commMethod'
import { IpcPayloadType } from '@type/ipc/param/payload'
import { IpcResponseType } from '@type/ipc/param/response'
import { WINDOW_IPC_SEND_ACTION } from '@type/window/windowLogic'

export interface IWindowOperations {
  [key: string]: {
    category: IPC_CATEGORY
    commMethod: IPC_COMM_METHOD
    action: WINDOW_IPC_SEND_ACTION
    description: string
    payloadType?: IpcPayloadType
    channel?: string
  }
}

export interface IWindowOperationsItem {
  category: IPC_CATEGORY
  commMethod: IPC_COMM_METHOD
  action: WINDOW_IPC_SEND_ACTION
  description: string
  channel?: string
  payloadType?: IpcPayloadType
  responseType?: IpcResponseType
}

// 窗口操作常量集合
export const WINDOW_OPERATIONS: IWindowOperations = {
  CLOSE: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.CLOSE,
    description: '关闭窗口'
    // payloadType: undefined
  },
  TOGGLE_PIN: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.TOGGLE_PIN,
    description: '切换窗口置顶状态'
    // payloadType: undefined
  },
  HIDE: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.HIDE,
    description: '隐藏窗口'
    // payloadType: undefined
  },
  SHOW: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.SHOW,
    description: '显示窗口'
    // payloadType: undefined
  },
  MINIMIZE: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.MINIMIZE,
    description: '最小化窗口'
    // payloadType: undefined
  },
  TOGGLE_MAXIMIZE: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.TOGGLE_MAXIMIZE,
    description: '切换窗口最大化状态'
    // payloadType: undefined
  },
  TOGGLE_FULLSCREEN: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.TOGGLE_FULLSCREEN,
    description: '切换窗口全屏状态'
    // payloadType: undefined
  },
  CREATE: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.CREATE,
    description: '创建新窗口',
    payloadType: IpcPayloadType.CreateWindowIpcPayload
  },
  RELOAD: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.RELOAD,
    description: '重新加载窗口'
    // payloadType: undefined
  },
  CLOSE_ALL: {
    category: IPC_CATEGORY.WINDOW_IPC,
    commMethod: IPC_COMM_METHOD.SEND,
    action: WINDOW_IPC_SEND_ACTION.CLOSE_ALL,
    description: '关闭所有窗口'
    // payloadType: undefined
  }
} as const
