import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"
import { AuthLayout } from "@/layouts/auth-layout"
import { useDatabase } from "@/hooks/database"
import { useEffect } from "react"

export default function DashboardPage() {
  const { findAll } = useDatabase()
  useEffect(() => {
    const init = async () => {
      const data = await findAll('Collection')
      console.log(data)
    }

    init()
  }, [])

  return (
    <AuthLayout>
      <Card className="max-w-xs">
        <Text>Sales</Text>
        <Metric>$ 71,465</Metric>
        <Flex className="mt-4">
          <Text>32% of annual target</Text>
          <Text>$ 225,000</Text>
        </Flex>
        <ProgressBar value={32} className="mt-2" />
      </Card>

    </AuthLayout>
  )
}
