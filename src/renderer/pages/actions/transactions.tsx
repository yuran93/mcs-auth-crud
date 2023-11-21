import moment from "moment"
import { useEffect, useState } from "react"
import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AuthLayout } from "@/layouts/auth-layout"
import { useDatabase } from "@/hooks/database"
import { useAuthStore } from "@/stores/auth"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toCurrency, toDateString } from "@/lib/utils"

type ChargesTableProps = {
  startDate: string
  endDate: string
  type: string|undefined
}

function ChargesTable({ startDate, endDate, type }: ChargesTableProps) {
  const { query } = useDatabase()
  const [charges, setCharges] = useState([])

  const getCharges = async () => {
    const response = await query(
      `select * from Charges where type = "${type}" and date between "${startDate}" and "${endDate}"`
    )

    if (response) {
      setCharges(response)
    }
  }

  useEffect(() => {
    getCharges()
  }, [startDate, endDate, type])

  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground/50 uppercase">
        Charges Applied
      </h2>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {charges.map((charge) => (
            <TableRow key={charge.id}>
              <TableCell>{toDateString(charge.date)}</TableCell>
              <TableCell>{charge.name}</TableCell>
              <TableCell>{charge.type}</TableCell>
              <TableCell>{toCurrency(charge.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type CollectionsTableProps = {
  startDate: string
  endDate: string
  userId: number|undefined
}

function CollectionsTable({ startDate, endDate, userId }: CollectionsTableProps) {
  const { query } = useDatabase()
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    const response = await query(
      `select * from Collections where UserId = "${userId}" and date between "${startDate}" and "${endDate}"`
    )

    if (response) {
      setCollections(response)
    }
  }

  useEffect(() => {
    getCollections()
  }, [startDate, endDate, userId])

  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground/50 uppercase">
        Paid Payments
      </h2>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collections.map((collection) => (
            <TableRow key={collection.id}>
              <TableCell>{toDateString(collection.date)}</TableCell>
              <TableCell>{collection.name}</TableCell>
              <TableCell>{toCurrency(collection.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function ActionsTransactionsPage() {
  const user = useAuthStore((state) => state.user)
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'))
  const [type, setType] = useState("charges")

  return (
    <AuthLayout>
      <Card className="w-full mt-6">
        <Title className="mb-6">Transactions</Title>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col gap-3">
            <Label className="text-xs text-foreground/50">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="charges">Charges</SelectItem>
                  <SelectItem value="paid">Payments</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-xs text-foreground/50">Start Date</Label>
            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
          </div>
          <div className="flex flex-col gap-3">
            <Label className="text-xs text-foreground/50">End Date</Label>
            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
          </div>
        </div>
        <Divider />
        {type === 'charges' ? (
          <ChargesTable
            startDate={startDate}
            endDate={endDate}
            type={user?.type}
          />
        ) : (
        <CollectionsTable
          startDate={startDate}
          endDate={endDate}
          userId={user?.id}
        />
        )}
      </Card>
    </AuthLayout>
  )
}
