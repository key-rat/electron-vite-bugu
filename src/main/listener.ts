import { windowIpcController } from './Controller/WindowIpcController'

export function listener(): void {
  windowIpcController.startListening()
}
