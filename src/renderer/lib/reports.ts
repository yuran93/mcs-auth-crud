import { useDatabase } from "@/hooks/database"

export async function getAverageCharges(start: any, end: any, type: string|undefined) {
  const userCount = await getUserCount(type)
  const totalCharges = await getCharges(start, end, type)

  return userCount ? Math.round(totalCharges/userCount) : 0
}

export async function getUserCount(type: string|undefined) {
  const { query } = useDatabase()

  const records = await query(
    `select count(*) as total from Users where type = "${type}"`
  )

  if (records) {
    return records.length ? records[0].total : 0
  }

  return 0
}

export async function getCharges(start: any, end: any, type: string|undefined) {
  const { query } = useDatabase()

  const records = await query(
    `select sum(amount) as total from Charges where type = "${type}" and date between "${start}" and "${end}"`
  )

  if (records) {
    return records.length ? records[0].total : 0
  }

  return 0
}

export async function getCollection(start: any, end: any, userId: number|undefined) {
  const { query } = useDatabase()

  const records = await query(
    `select sum(amount) as total from Collections where UserId = "${userId}" and date between "${start}" and "${end}"`
  )

  if (records) {
    return records.length ? records[0].total : 0
  }

  return 0
}
