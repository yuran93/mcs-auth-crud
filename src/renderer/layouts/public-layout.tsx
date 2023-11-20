import { ReactNode } from "react"
import { BaseLayout } from "@/layouts/base-layout"
import { MainTransition } from "@/components/providers/transition-provider"
import { cn } from "@/lib/utils"

type Props = {
  className?: string
  children: ReactNode
}

export function PublicLayout({ children, className }: Props) {
  return (
    <BaseLayout>
      <MainTransition className={cn(
        "min-h-screen flex flex-col items-center justify-center p-6",
        className,
      )}>
        {children}
      </MainTransition>
    </BaseLayout>
  )
}
