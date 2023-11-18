import { createMemoryRouter } from "react-router-dom"
import { AuthGuard } from "@/components/guards/auth"
import LoginPage from "@/pages/login"
import DashboardPage from "@/pages/dashboard"

export default createMemoryRouter([
  { path: "/",  element: <AuthGuard element={<DashboardPage />} /> },
  // { path: "/",  element: <LoginPage /> },
  { path: "/login",  element: <LoginPage /> },
])
