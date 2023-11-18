import { AuthLayout } from "@/layouts/auth-layout"
import { useDatabase } from "@/hooks/database"
import { useEffect } from "react"

export default function DashboardPage() {
  const { findAll } = useDatabase()
  useEffect(() => {
    const init = async () => {
      const data = await findAll('User')
      console.log(data)
    }

    init()
  }, [])

  return (
    <AuthLayout>
      <p>Hello World!</p>
    </AuthLayout>
  )
}
