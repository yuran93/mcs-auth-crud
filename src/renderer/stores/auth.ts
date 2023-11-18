import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthUser = {
  id: string
  name: string
  username: string
  password: string
  type: string
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
