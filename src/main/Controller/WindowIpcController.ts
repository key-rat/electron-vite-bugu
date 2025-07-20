import {
  WINDOW_IPC_INVOKE_ACTION,
  WINDOW_IPC_SEND_ACTION,
  WindowActionHandler,
  WindowInvokeHandler
} from '@type/window/windowLogic'
import { BaseIpcController } from './BaseIpcController'
import { windowService } from '@main/Service/WindowService'
import { IPC_CATEGORY } from '@type/ipc/param/category'

const windowSendActionMap: Record<WINDOW_IPC_SEND_ACTION, WindowActionHandler> = {
  [WINDOW_IPC_SEND_ACTION.CLOSE]: (win) => win.close(),
  [WINDOW_IPC_SEND_ACTION.TOGGLE_PIN]: (win) => win.setAlwaysOnTop(!win.isAlwaysOnTop()),
  [WINDOW_IPC_SEND_ACTION.HIDE]: (win) => win.hide(),
  [WINDOW_IPC_SEND_ACTION.SHOW]: (win) => {
    if (win.isMinimized()) win.restore()
    win.show()
  },
  [WINDOW_IPC_SEND_ACTION.MINIMIZE]: (win) => win.minimize(),
  [WINDOW_IPC_SEND_ACTION.TOGGLE_MAXIMIZE]: (win) => {
    win.isMaximized() ? win.unmaximize() : win.maximize()
  },
  [WINDOW_IPC_SEND_ACTION.TOGGLE_FULLSCREEN]: (win) => {
    win.setFullScreen(!win.isFullScreen())
  },
  [WINDOW_IPC_SEND_ACTION.RELOAD]: (win) => win.reload(),
  [WINDOW_IPC_SEND_ACTION.CLOSE_ALL]: (_win, _payload) => {
    windowService.closeAllWindows()
  },
  [WINDOW_IPC_SEND_ACTION.CREATE]: (_win, payload) => {
    if (payload) {
      windowService.createWindow(payload.optionsParam, payload.managerParam)
    }
  }
}

const windowInvokeActionMap: Record<WINDOW_IPC_INVOKE_ACTION, WindowInvokeHandler> = {
  [WINDOW_IPC_INVOKE_ACTION.GET_WINDOW_INFO]: (target, _payload) => {
    return windowService.getWindowInfoById(target.id)
  }
}

// 启动IPC监听
export class WindowIpcController extends BaseIpcController<
  WINDOW_IPC_SEND_ACTION,
  WINDOW_IPC_INVOKE_ACTION,
  WindowActionHandler,
  WindowInvokeHandler
> {
  protected ipcCategory: IPC_CATEGORY.WINDOW_IPC
  protected sendActionMap: Record<WINDOW_IPC_SEND_ACTION, WindowActionHandler>
  protected invokeActionMap: Record<WINDOW_IPC_INVOKE_ACTION, WindowInvokeHandler>
  constructor() {
    super()
    this.ipcCategory = IPC_CATEGORY.WINDOW_IPC
    this.sendActionMap = windowSendActionMap
    this.invokeActionMap = windowInvokeActionMap
  }
}

export const windowIpcController = new WindowIpcController()
