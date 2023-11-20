import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"
import { AuthLayout } from "@/layouts/auth-layout"
import { useEffect } from "react"
import { getCharges } from "@/lib/reports"
import { Owner, Renter } from "@/config/user-types"

export default function DashboardPage() {
  useEffect(() => {
    const init = async () => {
      const charges = await getCharges('2023-10-20', '2024-10-20', Renter)
      console.log(charges)
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
