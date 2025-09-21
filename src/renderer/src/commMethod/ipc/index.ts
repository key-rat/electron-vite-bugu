import { IWindowOperationsItem } from '@common/commMethod/ipc/windowIpc'
import { IpcPayload } from '@type/ipc/param/payload'
import { BaseIpcRequest } from '@type/ipc/param/requset'
import { IpcTargetWindowType } from '@type/ipc/param/target'

// 发送窗口操作请求的辅助函数
export function ipcHandler(
  operation: IWindowOperationsItem,
  to?: IpcTargetWindowType,
  payload?: IpcPayload
): void {
  const channel = [
    operation.category,
    operation.commMethod[0].toUpperCase(),
    operation.commMethod.slice(1)
  ].join('')

  const { action, description, category, commMethod, payloadType, responseType } = operation
  const arg: BaseIpcRequest = {
    action,
    description,
    category,
    commMethod,
    channel,
    to,
    from: {},
    payload,
    payloadType,
    responseType
  }
  console.log(channel)

  window.ipc[channel](arg)
}
