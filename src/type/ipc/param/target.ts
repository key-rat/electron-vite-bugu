export type IpcTargetWindowType = IpcRequestTarget | undefined

// 获取目标窗口,当不传参数时默认操作当前窗口
export interface IpcRequestTarget {
  id?: number
  name?: string
}
