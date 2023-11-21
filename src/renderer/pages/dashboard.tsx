import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"
import { AuthLayout } from "@/layouts/auth-layout"
import { useEffect, useState } from "react"
import { getCharges, getCollection } from "@/lib/reports"
import { Owner, Renter } from "@/config/user-types"
import { useAuthStore } from "@/stores/auth"
import { toCurrency } from "@/lib/utils"

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user)
  const [charges, setCharges] = useState(0)
  const [collections, setCollections] = useState(0)

  const percentage = () => {
    return Math.round(collections/charges * 100)
  }

  useEffect(() => {
    const init = async () => {
      setCharges(
        await getCharges('2023-01-20', '2024-10-20', user?.type)
      )
      setCollections(
        await getCollection('2023-01-20', '2024-10-20', user?.id)
      )
    }

    init()
  }, [])

  return (
    <AuthLayout>
      <Card className="max-w-xs">
        <Text>Paid</Text>
        <Metric>{toCurrency(collections)}</Metric>
        <Flex className="mt-4">
          <Text>{percentage()}% of due payments</Text>
          <Text>{toCurrency(charges)}</Text>
        </Flex>
        <ProgressBar value={percentage()} className="mt-2" />
      </Card>

    </AuthLayout>
  )
}
