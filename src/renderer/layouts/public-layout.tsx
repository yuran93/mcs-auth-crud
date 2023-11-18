import { ReactNode } from "react"
import { BaseLayout } from "@/layouts/base-layout"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: ReactNode
}

export function PublicLayout({ children, className }: Props) {
  return (
    <BaseLayout className={cn("flex flex-col items-center justify-center", className)}>
      {children}
    </BaseLayout>
  )
}
