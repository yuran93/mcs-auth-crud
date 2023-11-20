import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth"
import { useDatabase } from "@/hooks/database"

export function useAuth() {
  const navigate = useNavigate()
  const authLogout = useAuthStore((state) => state.logout)
  const authLogin = useAuthStore((state) => state.login)
  const { create, findOne } = useDatabase()

  const logout = async () => {
    authLogout()
    navigate('/login')
  }

  const attemptLogin = async (email: string, password: string) => {
    const record = await findOne('User', {
      where: { email, password }
    })

    if (record) {
      authLogin({
        id: record.id,
        name: record.name,
        email: record.email,
        contact: record.contact,
        password: record.password,
        type: record.type,
        upiId: record.upiId,
      })
      return navigate('/')
    }

    return toast.error("Invalid credentials.")
  }

  const register = async (data: any) => {
    const record = await create('User', data)

    attemptLogin(record.email, record.password)
  }

  return {
    attemptLogin,
    register,
    logout,
  }
}
