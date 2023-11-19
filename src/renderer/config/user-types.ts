type UserType = string
type UserTypeObject = {
  label: string
  value: UserType
}

const Admin: UserType = 'admin'
const Owner: UserType = 'owner'
const Renter: UserType = 'renter'

const types: UserTypeObject[] = [
  {
    label: "Admin",
    value: Admin,
  },
  {
    label: "Owner",
    value: Owner,
  },
  {
    label: "Renter",
    value: Renter,
  },
]

export {
  Admin,
  Owner,
  Renter,
  types,
}
