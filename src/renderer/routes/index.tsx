import { createMemoryRouter } from "react-router-dom"
import { AuthGuard } from "@/components/guards/auth"
import LoginPage from "@/pages/login"
import DashboardPage from "@/pages/dashboard"
import UsersIndexPage from "@/pages/users"
import UsersCreatePage from "@/pages/users/create"
import UsersEditPage from "@/pages/users/edit"
import ChargesIndexPage from "@/pages/charges"
import ChargesCreatePage from "@/pages/charges/create"
import ChargesEditPage from "@/pages/charges/edit"

export default createMemoryRouter([
  { path: "/login",  element: <LoginPage /> },
  { path: "/",  element: <AuthGuard element={<DashboardPage />} /> },
  { path: "/users",  element: <AuthGuard element={<UsersIndexPage />} /> },
  { path: "/users/create",  element: <AuthGuard element={<UsersCreatePage />} /> },
  { path: "/users/:id/edit",  element: <AuthGuard element={<UsersEditPage />} /> },
  { path: "/charges",  element: <AuthGuard element={<ChargesIndexPage />} /> },
  { path: "/charges/create",  element: <AuthGuard element={<ChargesCreatePage />} /> },
  { path: "/charges/:id/edit",  element: <AuthGuard element={<ChargesEditPage />} /> },
])
