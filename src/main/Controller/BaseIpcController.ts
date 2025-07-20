import { BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron'
import { IPC_CATEGORY } from '@type/ipc/param/category'
import { IPC_COMM_METHOD } from '@type/ipc/param/commMethod'
import { BaseIpcRequest } from '@type/ipc/param/requset'
import { IpcResponseBase } from '@type/ipc/param/response'
import { generateChannel } from '@common/commMethod/ipc'
import { windowService } from '@main/Service/WindowService'

// IPC 控制器基类
export abstract class BaseIpcController<
  SendAction extends string,
  InvokeAction extends string,
  SendHandler,
  InvokeHandler
> {
  /** 子类指定 name 字符串 */
  protected abstract ipcCategory: IPC_CATEGORY

  protected abstract sendActionMap: Record<SendAction, SendHandler>
  protected abstract invokeActionMap: Record<InvokeAction, InvokeHandler>

  /** 启动所有监听 */
  public startListening(): void {
    this.startSendChannelListening()
    this.startInvokeChannelListening()
  }

  /** 获取 invoke 通道名（可重写） */
  protected getInvokeChannel(): string {
    return generateChannel(this.ipcCategory, IPC_COMM_METHOD.INVOKE)
  }

  /** 获取 send 通道名（可重写） */
  protected getSendChannel(): string {
    return generateChannel(this.ipcCategory, IPC_COMM_METHOD.SEND)
  }

  /** 启动 send 通道监听（可重写） */
  protected startSendChannelListening(): void {
    const sendChannel = this.getSendChannel()
    ipcMain.on(sendChannel, (event: IpcMainEvent, arg: BaseIpcRequest) => {
      try {
        arg = this.resetBaseIpcRequest(event, arg)
        const { to, action, payload } = arg
        const targetWindow = windowService.getTargetWindow(to?.id, to?.name)

        const handler = this.sendActionMap[action]
        const win = targetWindow.win

        if (!handler) {
          throw new Error(`未知窗口操作: ${action}`)
        }

        handler(win, payload)
      } catch (error) {
        console.error(`[${this.ipcCategory}] SendChannel Error:`, error)
      }
    })
  }

  /**
   * 启动 invoke 通道监听并处理 invoke 事件（异步，通常用于请求响应式交互）
   */
  protected startInvokeChannelListening(): void {
    const invokeChannel = this.getInvokeChannel()

    ipcMain.handle(
      invokeChannel,
      async (event: IpcMainInvokeEvent, arg: BaseIpcRequest): Promise<IpcResponseBase> => {
        // Reset the ipc request with event information
        arg = this.resetBaseIpcRequest(event, arg)
        const { to, action, payload } = arg
        const targetWindow = windowService.getTargetWindow(to?.id, to?.name)

        const res: IpcResponseBase = {
          success: undefined,
          data: undefined,
          error: undefined
        }

        try {
          const handler = this.invokeActionMap[action]
          if (!handler) throw new Error(`未知的窗口操作: ${action}`)

          res.data = await handler(targetWindow, payload)
          res.success = true
          return res
        } catch (err) {
          console.error(`[${this.ipcCategory}] InvokeChannel Error:`, err)

          res.success = false
          res.error = String(err)
          return res
        }
      }
    )
  }

  // 补足操作参数，检查操作来源，对象，方法
  protected resetBaseIpcRequest(
    event: IpcMainEvent | IpcMainInvokeEvent,
    arg: BaseIpcRequest
  ): BaseIpcRequest {
    const id = BrowserWindow.fromWebContents(event.sender)?.id
    if (!id) {
      throw new Error('来源窗口不明')
    }
    arg.from = windowService.getWindowInfoById(id)
    if (!arg.from) {
      throw new Error('来源窗口不明')
    }

    if (!arg.to || (!arg.to.id && !arg.to.name)) {
      // 目标窗口重定向为来源窗口
      arg.to = arg.from
    }

    if (!arg.to.id || !arg.to.name) {
      throw new Error('目标对象不明')
    }

    return arg
  }

  /**
   * 处理 invoke 事件（异步，通常用于请求响应式交互）
   */
  protected async executeInvokeAction(
    event: IpcMainInvokeEvent,
    arg: BaseIpcRequest
  ): Promise<IpcResponseBase> {
    arg = this.resetBaseIpcRequest(event, arg)
    const { to, action, payload } = arg
    const targetWindow = windowService.getTargetWindow(to?.id, to?.name)

    const res: IpcResponseBase = {
      success: undefined,
      data: undefined,
      error: undefined
    }

    try {
      const handler = this.invokeActionMap[action]

      if (!handler) throw new Error(`未知的窗口操作: ${action}`)

      res.data = await handler(targetWindow, payload)
      res.success = true
    } catch (err) {
      res.success = false
      res.error = String(err)
      return Promise.reject(res)
    }

    return Promise.resolve(res)
  }
}
