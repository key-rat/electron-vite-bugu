<template>
  <h2>窗口控制面板</h2>
  <div class="window-controls">
    <div class="control-group">
      <h3>当前窗口操作</h3>
      <div class="button-grid">
        <button @click="close">关闭</button>
        <button @click="togglePin">{{ isPinned ? '取消置顶' : '窗口置顶' }}</button>
        <button @click="toggleVisibility">{{ isVisible ? '隐藏窗口' : '显示窗口' }}</button>
        <button @click="minimize">最小化</button>
        <button @click="toggleMaximize">{{ isMaximized ? '还原窗口' : '最大化' }}</button>
        <button @click="toggleFullscreen">{{ isFullscreen ? '退出全屏' : '全屏' }}</button>
        <button @click="reload">刷新</button>
      </div>
    </div>

    <div class="control-group">
      <h3>创建新窗口</h3>
      <div class="form">
        <label>
          窗口名称:
          <input v-model="newWindow.name" type="text" placeholder="输入窗口名称" />
        </label>

        <label>
          窗口类型:
          <select v-model="newWindow.type">
            <option value="main">主窗口</option>
            <option value="settings">设置窗口</option>
            <option value="about">关于窗口</option>
          </select>
        </label>

        <label>
          <input v-model="newWindow.isMulti" type="checkbox" />
          允许多开
        </label>

        <button @click="createWindow">创建窗口</button>
      </div>
    </div>

    <div class="control-group">
      <h3>全局操作</h3>
      <button class="danger" @click="closeAllWindows">关闭所有窗口</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BrowserWindowConstructorOptions } from 'electron'
import { ref, reactive, onMounted } from 'vue'
import { WindowType, IBrowserWindowConstructorManagerParam } from '@type/window/windowService'
import { windowIpc } from '@renderer/commMethod/ipc/windowIpc'

// 当前窗口状态
const isPinned = ref(false)
const isVisible = ref(true)
const isMaximized = ref(false)
const isFullscreen = ref(false)

// 新窗口配置
const newWindow = reactive({
  name: '新窗口',
  type: WindowType.MAIN,
  isMulti: false,
  route: '/about' // 新窗口的路由
})

// 获取当前窗口状态 (示例函数，实际实现需通过主进程获取)
function updateWindowState(): void {
  // 实际项目中应从主进程获取这些状态
  isPinned.value = false
  isVisible.value = true
  isMaximized.value = false
  isFullscreen.value = false
}

// 当前窗口操作
const close = (): void => windowIpc.close()
const togglePin = (): void => windowIpc.togglePin()
const minimize = (): void => windowIpc.minimize()
const reload = (): void => windowIpc.reload()

const toggleVisibility = (): void => {
  if (isVisible.value) {
    windowIpc.hide()
  } else {
    windowIpc.show()
  }
  isVisible.value = !isVisible.value
}

const toggleMaximize = (): void => {
  windowIpc.toggleMaximize()
  isMaximized.value = !isMaximized.value
}

const toggleFullscreen = (): void => {
  windowIpc.toggleFullscreen()
  isFullscreen.value = !isFullscreen.value
}

// 创建新窗口
const createWindow = (): void => {
  // 基本窗口配置
  const options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    title: newWindow.name
  }

  // 窗口管理参数
  const managerParam: IBrowserWindowConstructorManagerParam = {
    name: newWindow.name,
    route: newWindow.route,
    isMultiWindow: newWindow.isMulti,
    type: newWindow.type
  }

  windowIpc.create({ optionsParam: options, managerParam })
}

// 关闭所有窗口
const closeAllWindows = (): void => windowIpc.closeAll()

// 初始化时获取窗口状态
onMounted(() => {
  updateWindowState()

  // 添加键盘快捷键示例
  window.addEventListener('keydown', (e) => {
    // Ctrl + N 创建新窗口
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault()
      createWindow()
    }

    // Ctrl + W 关闭当前窗口
    if (e.ctrlKey && e.key === 'w') {
      e.preventDefault()
      close()
    }
  })
})
</script>

<style scoped>
.window-controls {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.control-group {
  margin-bottom: 30px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

h3 {
  color: #444;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #4a6cf7;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3a5af5;
}

button.danger {
  background-color: #f44336;
}

button.danger:hover {
  background-color: #e53935;
}

.form {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

input,
select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type='checkbox'] {
  margin-right: 8px;
}
</style>
