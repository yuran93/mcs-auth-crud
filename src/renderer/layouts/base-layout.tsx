import { ReactNode } from "react"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider"

type Props = {
  className?: string
  children: ReactNode
}

export function BaseLayout({ children, className }: Props) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className={cn("min-h-screen overflow-x-hidden bg-background", className)}>
        <Toaster richColors />
        {children}
      </div>
    </ThemeProvider>
  )
}
