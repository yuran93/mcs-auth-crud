import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthUser = {
  id: any
  name: string
  email: string
  contact: string
  password: string
  type: string
  upiId: string
}

type AuthStore = {
  user: AuthUser|null
  login: (user: AuthUser) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user: AuthUser) => set(() => ({ user })),
      logout: () => set(() => ({ user: null })),
    }), {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  )
)

export {
  useAuthStore
}
