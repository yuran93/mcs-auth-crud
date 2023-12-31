import { createMemoryRouter } from "react-router-dom"
import { AuthGuard } from "@/components/guards/auth"
import LoginPage from "@/pages/login"
import DashboardPage from "@/pages/dashboard"
import ActionsPayPage from "@/pages/actions/pay"
import UsersIndexPage from "@/pages/users"
import UsersCreatePage from "@/pages/users/create"
import UsersEditPage from "@/pages/users/edit"
import ChargesIndexPage from "@/pages/charges"
import ChargesCreatePage from "@/pages/charges/create"
import ChargesEditPage from "@/pages/charges/edit"
import CollectionsIndexPage from "@/pages/collections"
import CollectionsCreatePage from "@/pages/collections/create"
import CollectionsEditPage from "@/pages/collections/edit"
import ActionsProfilePage from "@/pages/actions/profile"
import RegisterPage from "@/pages/register"
import ActionsTransactionsPage from "@/pages/actions/transactions"
import ReportsCollectionPage from "@/pages/reports/collection"

export default createMemoryRouter([
  { path: "/login",  element: <LoginPage /> },
  { path: "/register",  element: <RegisterPage /> },
  { path: "/",  element: <AuthGuard element={<DashboardPage />} /> },

  { path: "/reports/collection",  element: <AuthGuard element={<ReportsCollectionPage />} /> },

  { path: "/actions/pay",  element: <AuthGuard element={<ActionsPayPage />} /> },
  { path: "/actions/profile",  element: <AuthGuard element={<ActionsProfilePage />} /> },
  { path: "/actions/transactions",  element: <AuthGuard element={<ActionsTransactionsPage />} /> },

  { path: "/users",  element: <AuthGuard element={<UsersIndexPage />} /> },
  { path: "/users/create",  element: <AuthGuard element={<UsersCreatePage />} /> },
  { path: "/users/:id/edit",  element: <AuthGuard element={<UsersEditPage />} /> },

  { path: "/charges",  element: <AuthGuard element={<ChargesIndexPage />} /> },
  { path: "/charges/create",  element: <AuthGuard element={<ChargesCreatePage />} /> },
  { path: "/charges/:id/edit",  element: <AuthGuard element={<ChargesEditPage />} /> },

  { path: "/collections",  element: <AuthGuard element={<CollectionsIndexPage />} /> },
  { path: "/collections/create",  element: <AuthGuard element={<CollectionsCreatePage />} /> },
  { path: "/collections/:id/edit",  element: <AuthGuard element={<CollectionsEditPage />} /> },
])
