import { ElementType } from "react"
import { useNavigate } from "react-router-dom"
import { Button as TremorButton } from "@tremor/react"
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"

type NavigationButtonProps = {
  label: string
  url: string
  icon: ElementType<any> | undefined
}

export function NavigationButton({ label, icon, url }: NavigationButtonProps) {
  const navigate = useNavigate()

  return (
    <TremorButton
      size="xs"
      className="px-6"
      variant="secondary"
      icon={icon}
      onClick={() => navigate(url)}
    >
      {label}
    </TremorButton>
  )
}

type ActionButtonType = {
  url: string
  icon: ElementType<any> | undefined
}

export function ActionButton({ icon, url }: ActionButtonType) {
  const navigate = useNavigate()

  return (
    <TremorButton
      size="xs"
      variant="secondary"
      icon={icon}
      onClick={() => navigate(url)}
    />
  )
}

type DestroyButtonProps = {
  onClick: () => void
}

export function DestroyButton({ onClick }: DestroyButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="destructive"
      size="sm"
    >
      <TrashIcon />
    </Button>
  )
}
