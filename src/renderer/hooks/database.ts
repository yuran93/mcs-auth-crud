import { toast } from "sonner"

export function useDatabase() {
  const findAll = async (modal: string) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-find-all', modal)

    if (success) {
      return response
    }

    toast.error('Unable to fetch the records.')

    return null
  }

  const findByPk = async (modal: string, id: any) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-find-by-pk', modal, id)

    if (success) {
      return response
    }

    toast.error('Unable to fetch the record.')

    return null
  }

  const findOne = async (modal: string, filters: any) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-find-one', modal, filters)

    if (success) {
      return response
    }

    toast.error('Unable to fetch the record.')

    return null
  }

  const create = async (modal: string, data: any) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-create', modal, data)

    if (success) {
      return response
    }

    toast.error('Unable to create the record.')

    return null
  }

  const update = async (modal: string, id: any, data: any) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-update', modal, id, data)

    if (success) {
      return response
    }

    toast.error('Unable to update the record.')

    return null
  }

  const destroy = async (modal: string, id: any) => {
    const { response, success } = await window.electron.ipcRenderer
      .invoke('db-destroy', modal, id)

    if (success) {
      return response
    }

    toast.error('Unable to destroy the record.')

    return null
  }

  return {
    findAll,
    findByPk,
    findOne,
    create,
    update,
    destroy,
  }
}