import { app, ipcMain } from 'electron'
import { Sequelize, DataTypes } from 'sequelize'
import sqlite3 from 'sqlite3'
import path from 'path'

// const userDataPath = app.getPath('userData')
const userDataPath = '/Users/yuran/Desktop'
const databasePath = path.join(userDataPath, 'mcs_database.sqlite')

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: databasePath
})

export const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  contact: DataTypes.STRING,
  upiId: DataTypes.STRING,
  type: DataTypes.STRING,
})

export const Charge = sequelize.define('Charge', {
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  amount: DataTypes.NUMBER,
  date: DataTypes.DATE,
})

export const Collection = sequelize.define('Collection', {
  name: DataTypes.STRING,
  amount: DataTypes.NUMBER,
  date: DataTypes.DATE,
})

Collection.belongsTo(User)

async function createAdminUser() {
  const data = {
    name: 'Administrator',
    email: 'admin@admin.com',
    password: 'password',
    contact: '0000000',
    upiId: '',
    type: 'admin',
  }

  try {
    const result = await User.findOne({ where: {
      email: data.email,
    } })

    if (!result) {
      await User.create(data)
    }
  } catch (error) {
    console.log('Unable to create the admin user')
  }
}

export async function syncTables() {
  await User.sync()
  await Charge.sync()
  await Collection.sync()

  await createAdminUser()
}

type DBResponse = {
  response: any
  success: boolean
}

export function getModel(key: string) {
  if (key === 'User') {
    return User
  }
  if (key === 'Charge') {
    return Charge
  }
  if (key === 'Collection') {
    return Collection
  }

  throw new Error("Model not found.")
}

ipcMain.handle('db-query', async (event, sql): Promise<DBResponse> => {
  try {
    const [response] = await sequelize.query(sql)

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})


ipcMain.handle('db-find-all', async (event, model, options = {}, page = 1, perPage = 10): Promise<DBResponse> => {
  try {
    const response = await getModel(model).findAll({
      ...options,
      offset: ((page - 1) * perPage),
      limit: perPage,
    })

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-find-by-pk', async (event, model, id): Promise<DBResponse> => {
  try {
    const response = await getModel(model).findByPk(id)

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-find-one', async (event, model, filters): Promise<DBResponse> => {
  try {
    const response = await getModel(model).findOne(filters)

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-create', async (event, model, data): Promise<DBResponse> => {
  try {
    const response = await getModel(model).create(data)

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-update', async (event, model, id, data): Promise<DBResponse> => {
  try {
    const m = await getModel(model).findByPk(id)
    const response = await m?.update(data)

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

ipcMain.handle('db-destroy', async (event, model, id): Promise<DBResponse> => {
  try {
    const response = await getModel(model).destroy({
      where: { id }
    })

    return {
      response: JSON.stringify(response),
      success: true,
    }
  } catch (error) {
    console.log(error)
    return {
      response: null,
      success: false,
    }
  }
})

