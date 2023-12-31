import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ArchiveIcon,
  BackpackIcon,
  HomeIcon,
  PersonIcon,
  PieChartIcon,
  RocketIcon,
  TextAlignCenterIcon,
} from "@radix-ui/react-icons"
import { MainTransition } from "@/components/providers/transition-provider"
import { useAuth } from "@/hooks/auth"
import { BaseLayout } from "@/layouts/base-layout"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAuthStore } from "@/stores/auth"
import { cn } from "@/lib/utils"
import { Admin } from "@/config/user-types"
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

function SideBarHeading({ label }: { label: string }) {
  return (
    <h2
      className="py-3 px-6 text-xs text-foreground/30 font-semibold"
    >
      {label}
    </h2>
  )
}

export function AuthLayout({ children, className }: Props) {
  const { logout } = useAuth()
  const user = useAuthStore((state) => state.user)

  return (
    <BaseLayout className="flex">
      <div className="w-[250px] border-r border-foreground/10 bg-primary/10">
        <div className="p-6">
          <img className="mb-3" src={iconImage} width={50} />
        </div>
        <div className="flex flex-col">
          <SidebarItem label="Home" url="/" icon={<HomeIcon />} />
          {user?.type !== Admin && (<>
          <SideBarHeading label="Actions" />
          <SidebarItem label="Pay Dues" url="/actions/pay" icon={<RocketIcon />} />
          <SidebarItem label="Update Profile" url="/actions/profile" icon={<PersonIcon />} />
          <SidebarItem label="Transactions" url="/actions/transactions" icon={<ArchiveIcon />} />
          </>)}
          {user?.type === Admin && (<>
            <SideBarHeading label="Manage" />
            <SidebarItem label="Manage Users" url="/users" icon={<PersonIcon />} />
            <SidebarItem label="Manage Charges" url="/charges" icon={<BackpackIcon />} />
            <SidebarItem label="Manage Collections" url="/collections" icon={<PieChartIcon />} />
            <SideBarHeading label="Reporting" />
            <SidebarItem label="Collection Report" url="/reports/collection" icon={<HomeIcon />} />
          </>)}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-end py-3 px-6 gap-3 border-b">
          <div className="flex items-center">
            <p className="text-xs font-semibold text-foreground/50">
              {user?.name}
            </p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <TextAlignCenterIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0 mr-6">
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
        <MainTransition className={cn("p-6", className)}>
          {children}
        </MainTransition>
      </div>
    </BaseLayout>
  )
}
