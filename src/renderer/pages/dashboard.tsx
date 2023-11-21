import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react"
import { AuthLayout } from "@/layouts/auth-layout"
import { useEffect, useState } from "react"
import { getAverageCharges, getCollection } from "@/lib/reports"
import { useAuthStore } from "@/stores/auth"
import { toCurrency } from "@/lib/utils"
import moment from "moment"

export default function DashboardPage() {
  const startDate = moment().startOf('month').format('YYYY-MM-DD')
  const endDate = moment().endOf('month').format('YYYY-MM-DD')

  const user = useAuthStore((state) => state.user)
  const [charges, setCharges] = useState(0)
  const [collections, setCollections] = useState(0)

  const percentage = () => {
    return Math.round(collections/charges * 100)
  }

  useEffect(() => {
    const init = async () => {
      setCharges(
        await getAverageCharges(startDate, endDate, user?.type)
      )
      setCollections(
        await getCollection(startDate, endDate, user?.id)
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
