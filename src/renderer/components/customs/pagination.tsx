import { cn } from "@/lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "@tremor/react"

type Props = {
  className?: string
  page: number
  onNext: () => void
  onPrev: () => void
}

export function Pagination({ page, onNext, onPrev, className }: Props) {
  return (
    <div className={cn("flex gap-3 mt-6", className)}>
      <Button
        className="w-28"
        onClick={onPrev}
        icon={ArrowLeftIcon}
        size="xs"
        disabled={(page === 1)}
      >
        Previous
      </Button>
      <Button
        className="w-28"
        onClick={onNext}
        icon={ArrowRightIcon}
        size="xs"
      >
        Next
      </Button>
    </div>
  )
}
