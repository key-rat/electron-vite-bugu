import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import {
  IBrowserWindowConstructorManager,
  WindowType,
  IBrowserWindowConstructorManagerParam
} from '@type/window/windowService'

// 固定配置 (禁止修改)
const FixedOptions: BrowserWindowConstructorOptions = {
  // 行为优化
  show: false, // 延迟显示

  // 安全关键配置 (必须!)
  webPreferences: {
    webSecurity: true, // 启用Web安全，同源策略
    preload: join(__dirname, '../preload/index.js'), // 预加载脚本路径
    nodeIntegration: false, // 禁用Node集成
    contextIsolation: true, // 启用上下文隔离
    sandbox: true // 启用沙箱
  }
}

/**
 * 窗口管理类
 */
export class WindowService {
  // 窗口列表
  private windowList: IBrowserWindowConstructorManager[] = []

  // 根据ID获取窗口
  public getWindowById(id: number): IBrowserWindowConstructorManager | undefined {
    const win = this.windowList.find((win) => win.id === id)
    if (!win) {
      return undefined
    }
    return win
  }

  // 根据名称获取窗口
  public getWindowByName(name: string): IBrowserWindowConstructorManager | undefined {
    const win = this.windowList.find((win) => win.name === name)
    if (!win) {
      return undefined
    }
    return win
  }

  // 根据ID获取窗口信息
  public getWindowInfoById(id: number): Omit<IBrowserWindowConstructorManager, 'win'> {
    const winInfo = this.getWindowById(id)
    if (!winInfo) {
      throw Error('窗口不存在')
    }
    return {
      id: winInfo.id,
      name: winInfo.name,
      isMultiWindow: winInfo.isMultiWindow,
      type: winInfo.type
    }
  }

  // 处理窗口操作请求
  public getTargetWindow(id, name): IBrowserWindowConstructorManager {
    let targetWindow: IBrowserWindowConstructorManager | undefined

    if (id) {
      targetWindow = windowService.getWindowById(id)
      if (!targetWindow) {
        throw new Error(`未找到ID为 ${id} 的窗口`)
      }
    } else if (name) {
      targetWindow = windowService.getWindowByName(name)
      if (!targetWindow) {
        throw new Error(`未找到名称为 "${name}" 的窗口`)
      }
    } else {
      throw new Error('未知的窗口：必须提供 id 或 name')
    }

    return targetWindow
  }

  // 关闭所有窗口
  public closeAllWindows(): void {
    // 创建副本避免迭代过程中修改数组
    ;[...this.windowList].forEach((manager) => {
      if (!manager.win.isDestroyed()) {
        manager.win.close()
      }
    })
    this.windowList = []
    console.log('所有窗口已关闭')
  }

  // 根据窗口类型获取默认配置
  public getWindowOptionsByType(type: WindowType): BrowserWindowConstructorOptions {
    const commonOptions = {
      center: true,
      autoHideMenuBar: true,
      backgroundColor: '#1a1a1a',
      icon: join(__dirname, 'assets/icon.png')
    }

    switch (type) {
      case WindowType.MAIN:
        return {
          ...commonOptions,
          frame: false,
          width: 1200,
          height: 800,
          minWidth: 800,
          minHeight: 600,
          title: '主窗口'
        }
      default:
        return {
          ...commonOptions,
          width: 800,
          height: 600,
          title: '新窗口'
        }
    }
  }

  /**
   * 创建新窗口
   * @param optionsParam 窗口配置参数
   * @param managerParam 窗口管理参数
   */
  public createWindow(
    optionsParam: BrowserWindowConstructorOptions,
    managerParam: IBrowserWindowConstructorManagerParam
  ): void {
    // 检查是否已存在同名窗口
    const existingWindow = this.getWindowByName(managerParam.name)

    // 如果窗口已存在且不允许多开，则显示并聚焦该窗口
    if (existingWindow && !existingWindow.isMultiWindow) {
      if (existingWindow.win.isMinimized()) existingWindow.win.restore()
      existingWindow.win.show()
      existingWindow.win.focus()
      console.log(`窗口已存在，ID: ${existingWindow.id}`)
      return
    }

    // 合并配置：默认配置 < 类型配置 < 自定义配置 < 固定配置
    const windowConfig: BrowserWindowConstructorOptions = {
      ...this.getWindowOptionsByType(managerParam.type),
      ...optionsParam,
      ...FixedOptions
    }

    const newWindow = new BrowserWindow(windowConfig)
    const id = newWindow.id

    // 管理参数
    const windowManager: IBrowserWindowConstructorManager = {
      id: id,
      win: newWindow,
      name: managerParam.name,
      isMultiWindow: managerParam.isMultiWindow,
      type: managerParam.type
    }

    // 添加到窗口列表
    this.windowList.push(windowManager)
    console.log(`新窗口已创建，ID: ${id}, 名称: ${managerParam.name}`)

    // 加载窗口内容
    this.loadWindowContent(newWindow, managerParam.route, id)

    // 窗口事件监听
    newWindow.once('ready-to-show', () => {
      newWindow.show()
      if (is.dev) newWindow.webContents.openDevTools()
    })

    // 窗口关闭时从管理列表中移除
    newWindow.on('closed', () => {
      this.removeWindowFromList(id)
    })
  }

  // 从管理列表中移除窗口
  public removeWindowFromList(id: number): void {
    this.windowList = this.windowList.filter((win) => win.id !== id)
    console.log(`窗口已移除，ID: ${id}`)
  }

  // 加载窗口内容
  private loadWindowContent(win: BrowserWindow, route: string, id: number): void {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      const baseUrl = process.env['ELECTRON_RENDERER_URL']
      const url = route ? `${baseUrl}/#${route}?id=${id}` : `${baseUrl}/#/?id=${id}`
      win.loadURL(url)
      console.log('开发模式窗口地址:', url)
    } else {
      win.loadFile(join(__dirname, '../renderer/index.html'), {
        hash: route,
        query: { id: id.toString() }
      })
    }
  }
}
export const windowService = new WindowService()
