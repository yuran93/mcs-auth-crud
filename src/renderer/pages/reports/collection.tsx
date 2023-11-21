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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toCurrency } from "@/lib/utils"
import { Owner, Renter } from "@/config/user-types"
import { getAverageCharges, getCharges, getCollectionData } from "@/lib/reports"

export default function ReportsCollectionPage() {
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'))
  const [renterCharges, setRenterCharges] = useState(0)
  const [ownerCharges, setOwnerCharges] = useState(0)
  const [type, setType] = useState(Owner)

  const [collections, setCollections] = useState([])

  const getCharges = (type: string) => {
    return type === Owner ? ownerCharges : renterCharges
  }

  const populateData = async () => {
    setRenterCharges(
      await getAverageCharges(startDate, endDate, Renter)
    )
    setOwnerCharges(
      await getAverageCharges(startDate, endDate, Owner)
    )
    setCollections(
      await getCollectionData(startDate, endDate, type)
    )
  }

  useEffect(() => {
    populateData()
  }, [startDate, endDate, type])

  return (
    <AuthLayout>
      <Card className="w-full mt-6">
        <Title className="mb-6">Collection Report</Title>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col gap-3">
            <Label className="text-xs text-foreground/50">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={Owner}>Owner</SelectItem>
                  <SelectItem value={Renter}>Renter</SelectItem>
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
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Paid</TableHeaderCell>
              <TableHeaderCell>Charges</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.user_id}>
                <TableCell>{collection.user_name}</TableCell>
                <TableCell>{toCurrency(collection.amount)}</TableCell>
                <TableCell>{toCurrency(getCharges(collection.user_type))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </AuthLayout>
  )
}
