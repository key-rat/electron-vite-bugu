import { ipcHandler } from '@renderer/commMethod/ipc'

import { WINDOW_OPERATIONS } from '@common/commMethod/ipc/windowIpc'
import { CreateWindowIpcPayload } from '@type/ipc/param/payload'
import { IpcTargetWindowType } from '@type/ipc/param/target'
// 窗口控制接口
export const windowIpc = {
  /**
   * 关闭指定窗口
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  close: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.CLOSE, target)
  },

  /**
   * 切换窗口置顶状态
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  togglePin: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.TOGGLE_PIN, target)
  },

  /**
   * 隐藏指定窗口
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  hide: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.HIDE, target)
  },

  /**
   * 显示指定窗口
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  show: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.SHOW, target)
  },

  /**
   * 最小化指定窗口
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  minimize: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.MINIMIZE, target)
  },

  /**
   * 切换窗口最大化状态
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  toggleMaximize: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.TOGGLE_MAXIMIZE, target)
  },

  /**
   * 切换窗口全屏状态
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  toggleFullscreen: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.TOGGLE_FULLSCREEN, target)
  },

  /**
   * 创建新窗口
   * @param payload - 必填参数 {
   *  optionsParam: 自定义窗口配置项
   *  managerParam: 窗口管理器配置项
   * }
   */
  create: (payload: CreateWindowIpcPayload) => {
    ipcHandler(WINDOW_OPERATIONS.CREATE, undefined, payload)
  },

  /**
   * 重新加载指定窗口
   * @param target - 可选参数 { id?: 窗口ID, name?: 窗口名称 }
   * 当不传参数时默认操作当前窗口
   */
  reload: (target?: IpcTargetWindowType) => {
    ipcHandler(WINDOW_OPERATIONS.RELOAD, target)
  },

  /**
   * 关闭所有窗口（无参数）
   */
  closeAll: () => {
    ipcHandler(WINDOW_OPERATIONS.CLOSE_ALL)
  }
}
