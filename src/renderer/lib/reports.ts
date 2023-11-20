import { useDatabase } from "@/hooks/database"

export async function getCharges(start: string, end: string, type: string) {
  const { query } = useDatabase()

  const records = await query(`select sum(amount) as total from Charges where type = "${type}" and date between "${start}" and "${end}"`)

  if (records) {
    return records.length ? records[0].total : 0
  }

  return 0
}
