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

export default function UsersIndexPage() {
  const { findAll, destroy } = useDatabase()
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState([])
  const [openDestroy, setOpenDestroy] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const populateRecords = async () => {
    const data = await findAll('User', {}, page)

    if (data) {
      setUsers(data)
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
      const response = await destroy('User', selectedId)
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
        <NavigationButton label="Create" url="/users/create" icon={FileIcon} />
      </div>
      <ConfirmDestroy
        open={openDestroy}
        onCancel={cancelDestroy}
        onOpenChange={(v) => setOpenDestroy(v)}
        onConfirm={proceedDestroy}
      />
      <Card>
        <Title>Manage Users</Title>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Contact</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell className="w-0"></TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell className="flex gap-3">
                  <ActionButton url={`/users/${user.id}/edit`} icon={Pencil1Icon} />
                  <DestroyButton onClick={() => confirmDestroy(user.id)} />
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
