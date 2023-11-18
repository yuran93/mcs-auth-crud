import { ReactNode } from "react"
import { useAuthStore } from "@/stores/auth"
import LoginPage from "@/pages/login"

type Props = {
  element: ReactNode
}

export function AuthGuard({ element }: Props) {
  const user = useAuthStore((state) => state.user)
  if (user) {
    return element
  }

  return <LoginPage />
}
