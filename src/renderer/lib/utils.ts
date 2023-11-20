import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toDateString(input: any): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export async function openFile(type: string, folder: string, group: string, filename: string) {
  await window.electron.ipcRenderer.invoke('ipc-open-file', type, folder, group, filename)
}
