import { BrowserWindow } from 'electron/main'

// 窗口类型枚举,用于获取窗口初始化默认值
export enum WindowType {
  MAIN = 'main' // 主窗口
}

// 窗口管理接口
export interface IBrowserWindowConstructorManager {
  name: string // 窗口名称
  id: number
  isMultiWindow: boolean // 是否多窗口
  type: WindowType // 窗口类型
  win: BrowserWindow // 窗口实例
}

// 窗口管理接口参数
export interface IBrowserWindowConstructorManagerParam {
  name: string // 窗口名称
  route: string // 窗口路由
  isMultiWindow: boolean // 是否多窗口
  type: WindowType // 窗口类型
}
