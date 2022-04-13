import { CrossProcessExports } from 'electron'

declare global {
  interface Window {
    electron: CrossProcessExports
  }
}
