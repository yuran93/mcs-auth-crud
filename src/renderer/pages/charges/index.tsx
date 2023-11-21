import { toast } from "sonner"
import { useEffect, useState } from "react"
import { FileIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { AuthLayout } from "@/layouts/auth-layout"
import { useDatabase } from "@/hooks/database"
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react"
import { ActionButton, DestroyButton, NavigationButton } from "@/components/customs/buttons"
import { ConfirmDestroy } from "@/components/customs/confirm-destroy"
import { Pagination } from "@/components/customs/pagination"
import { toDateString } from "@/lib/utils"
import { toCurrency } from '../../lib/utils';

export default function ChargesIndexPage() {
  const [page, setPage] = useState(1)
  const { findAll, destroy } = useDatabase()
  const [charges, setCharges] = useState([])
  const [openDestroy, setOpenDestroy] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const populateRecords = async () => {
    const data = await findAll('Charge', {}, page)

    if (data) {
      setCharges(data)
    }
  }

  const confirmDestroy = (id: any) => {
    setSelectedId(id)
    setOpenDestroy(true)
  }

  const cancelDestroy = () => {
    setSelectedId(null)
    setOpenDestroy(false)
  }

  const proceedDestroy = async () => {
    if (selectedId) {
      const response = await destroy('Charge', selectedId)
      if (response) {
        toast.success('Successfully deleted the record')
        await populateRecords()
      }
    }
  }

  useEffect(() => {
    populateRecords()
  }, [page])

  return (
    <AuthLayout>
      <div className="flex justify-end pb-6">
        <NavigationButton label="Create" url="/charges/create" icon={FileIcon} />
      </div>
      <ConfirmDestroy
        open={openDestroy}
        onCancel={cancelDestroy}
        onOpenChange={(v) => setOpenDestroy(v)}
        onConfirm={proceedDestroy}
      />
      <Card>
        <Title>Manage Charges</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell className="w-0"></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charges.map((charge) => (
              <TableRow key={charge.id}>
                <TableCell>{toDateString(charge.date)}</TableCell>
                <TableCell>{charge.name}</TableCell>
                <TableCell>{charge.type}</TableCell>
                <TableCell>{toCurrency(charge.amount)}</TableCell>
                <TableCell className="flex gap-3">
                  <ActionButton url={`/charges/${charge.id}/edit`} icon={Pencil1Icon} />
                  <DestroyButton onClick={() => confirmDestroy(charge.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          onPrev={() => setPage(page - 1)}
          onNext={() => setPage(page + 1)}
        />
      </Card>
    </AuthLayout>
  )
}
