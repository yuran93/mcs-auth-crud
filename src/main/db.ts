import { app, ipcMain } from 'electron'
import { Sequelize, DataTypes } from 'sequelize'
import sqlite3 from 'sqlite3'
import path from 'path'

const userDataPath = app.getPath('userData')
const databasePath = path.join(userDataPath, 'mcs_database.sqlite')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: databasePath
})

export const User = sequelize.define('User', {
  name: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  type: DataTypes.STRING,
})

export async function syncTables() {
  await User.sync()
}

type DBResponse = {
  response: any
  success: boolean
}

export function getModel(key: string) {
  if (key === 'User') {
    return User
  }

  throw new Error("Model not found.")
}

ipcMain.handle('db-find-all', async (event, model): Promise<DBResponse> => {
  try {
    return {
      response: await getModel(model).findAll(),
      success: true,
    }
  } catch (error) {
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-find-by-pk', async (event, model, id): Promise<DBResponse> => {
  try {
    return {
      response: await getModel(model).findByPk(id),
      success: true,
    }
  } catch (error) {
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-find-one', async (event, model, filters): Promise<DBResponse> => {
  try {
    return {
      response: await getModel(model).findOne(filters),
      success: true,
    }
  } catch (error) {
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-create', async (event, model, data): Promise<DBResponse> => {
  try {
    return {
      response: await getModel(model).create(data),
      success: true,
    }
  } catch (error) {
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-update', async (event, model, id, data): Promise<DBResponse> => {
  try {
    const m = await getModel(model).create(data)
    return {
      response: await m.update(data),
      success: true,
    }
  } catch (error) {
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-destroy', async (event, model, id): Promise<DBResponse> => {
  try {
    return {
      response: await getModel(model).destroy({
        where: { id }
      }),
      success: true,
    }
  } catch (error) {

    return {
      response: null,
      success: false,
    }
  }
})

