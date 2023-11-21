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

export default function CollectionsIndexPage() {
  const [page, setPage] = useState(1)
  const { findAll, destroy } = useDatabase()
  const [collections, setCollections] = useState([])
  const [openDestroy, setOpenDestroy] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const populateRecords = async () => {
    const data = await findAll('Collection', {
      include: 'User',
    }, page)

    if (data) {
      setCollections(data)
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
      const response = await destroy('Collection', selectedId)
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
        <NavigationButton label="Create" url="/collections/create" icon={FileIcon} />
      </div>
      <ConfirmDestroy
        open={openDestroy}
        onCancel={cancelDestroy}
        onOpenChange={(v) => setOpenDestroy(v)}
        onConfirm={proceedDestroy}
      />
      <Card>
        <Title>Manage Collections</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell className="w-0"></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.User.name}</TableCell>
                <TableCell>{toDateString(collection.date)}</TableCell>
                <TableCell>{collection.name}</TableCell>
                <TableCell>{toCurrency(collection.amount)}</TableCell>
                <TableCell className="flex gap-3">
                  <ActionButton url={`/collections/${collection.id}/edit`} icon={Pencil1Icon} />
                  <DestroyButton onClick={() => confirmDestroy(collection.id)} />
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
