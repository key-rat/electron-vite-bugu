import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { windowService } from './Service/WindowService'
import { WindowType } from '@type/window/windowService'
import { listener } from './listener'

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  listener()

  // 初始化窗口管理器
  const optionsParam = {
    width: 1200,
    height: 800
  }

  const managerParam = {
    name: 'main',
    // 窗口名称
    isMultiWindow: false,
    type: WindowType.MAIN,
    route: '/'
    // 窗口路由
  }

  windowService.createWindow(optionsParam, managerParam)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0)
      windowService.createWindow(optionsParam, managerParam)
  })
})
