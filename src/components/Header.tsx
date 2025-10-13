import { SidebarTrigger } from "./ui/sidebar"
import { SearchCommand } from "./search-command"
import { Notifications } from "./notifications"
import { UserNav } from "./user-nav"
import { Home, BarChart3, Users, Settings, FileText } from "lucide-react"

interface HeaderProps {
  activeItem: string
  sidebarOpen: boolean
}

const getIconForItem = (item: string) => {
  switch (item) {
    case "Dashboard":
      return Home
    case "Analytics":
      return BarChart3
    case "Users":
      return Users
    case "Reports":
      return FileText
    case "Settings":
      return Settings
    default:
      return Home
  }
}

export function Header({ activeItem, sidebarOpen }: HeaderProps) {
  const Icon = getIconForItem(activeItem)
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-gradient-to-r from-card/95 via-card/90 to-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 shadow-lg shadow-primary/5">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 flex items-center justify-center">
            {!sidebarOpen && (
              <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-all rounded-lg" />
            )}
          </div>

          <div className="flex items-center gap-2 min-w-[140px]">
            <div className="p-1.5 bg-white rounded-lg shadow-md border border-border">
              <Icon className="h-4 w-4 text-black" />
            </div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl text-black">
              {activeItem}
            </h1>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-2xl mx-auto">
          <SearchCommand />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* Mobile Search Icon */}
          <div className="md:hidden">
            <SearchCommand />
          </div>
          <Notifications />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
