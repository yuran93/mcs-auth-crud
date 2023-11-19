import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/auth"
import { useDatabase } from "@/hooks/database"

export function useAuth() {
  const navigate = useNavigate()
  const authLogout = useAuthStore((state) => state.logout)
  const authLogin = useAuthStore((state) => state.login)
  const { findOne } = useDatabase()

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
        id: record.dataValues.id,
        name: record.dataValues.name,
        email: record.dataValues.email,
        contact: record.dataValues.contact,
        password: record.dataValues.password,
        type: record.dataValues.type,
      })
      return navigate('/')
    }

    return toast.error("Invalid credentials.")
  }

  return {
    attemptLogin,
    logout,
  }
}
