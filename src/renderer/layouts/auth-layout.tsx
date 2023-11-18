import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { HomeIcon, TextAlignCenterIcon } from "@radix-ui/react-icons"
import { useAuth } from "@/hooks/auth"
import { BaseLayout } from "@/layouts/base-layout"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import iconImage from "../../../assets/icon.png"

type Props = {
  className?: string
  children: ReactNode
}

type SidebarItemProps = {
  label: string
  icon: ReactNode
  url: string
}

function SidebarItem({ label, icon, url }: SidebarItemProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = url === location.pathname

  return (
    <button
      className={cn(
        "flex items-center gap-2 py-3 px-6 text-foreground/75 hover:bg-foreground/5 hover:text-foreground",
        isActive ? "font-semibold bg-foreground/10 text-primary hover:text-primary hover:bg-foreground/10" : "",
      )}
      onClick={() => navigate(url)}
    >
      {icon}
      <p className="text-sm">{label}</p>
    </button>
  )
}

export function AuthLayout({ children, className }: Props) {
  const { logout } = useAuth()

  return (
    <BaseLayout className="flex">
      <div className="w-[250px] bg-foreground/5 border-r border-foreground/10">
        <div className="p-6">
          <img className="mb-3" src={iconImage} width={50} />
        </div>
        <div className="flex flex-col">
          <SidebarItem label="Home" url="/" icon={<HomeIcon />} />
          <SidebarItem label="Login" url="/login" icon={<HomeIcon />} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-end p-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <TextAlignCenterIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0 mr-3">
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <div className={cn("p-6", className)}>
          {children}
        </div>
      </div>
    </BaseLayout>
  )
}
