import { ReactNode } from "react"
import { Toaster } from "sonner"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { MainTransition } from "@/components/providers/transition-provider"

type Props = {
  className?: string
  children: ReactNode
}

export function BaseLayout({ children, className }: Props) {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen overflow-x-hidden bg-background">
        <Toaster richColors />
        <MainTransition className={cn("min-h-screen", className)}>
          {children}
        </MainTransition>
      </div>
    </ThemeProvider>
  )
}
