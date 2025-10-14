import { Home, BarChart3, Users, Settings, FileText, LayoutDashboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Dashboard", gradient: "from-primary to-info" },
  { icon: BarChart3, label: "Analytics", gradient: "from-purple to-pink" },
  { icon: Users, label: "Users", gradient: "from-info to-cyan" },
  { icon: FileText, label: "Reports", gradient: "from-orange to-warning" },
  { icon: Settings, label: "Settings", gradient: "from-muted-foreground to-muted-foreground" },
]

interface AppSidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

export function AppSidebar({ activeItem, onItemClick }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-border/30 bg-gradient-to-b from-card via-card/98 to-card/95 backdrop-blur-xl">
      <SidebarHeader className="border-b border-primary/10">
        <div className="flex h-16 items-center px-6 gap-3">
          <div className="p-2 bg-card dark:bg-muted rounded-lg shadow-md border border-border">
            <LayoutDashboard className="h-5 w-5 text-foreground" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-4 pt-4">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeItem === item.label

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      onClick={() => onItemClick(item.label)}
                      isActive={isActive}
                      className={
                        isActive
                          ? "bg-muted-foreground/20 text-foreground shadow-sm hover:bg-muted-foreground/20 transition-all"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-card-foreground transition-all"
                      }
                    >
                      <Icon className={isActive ? "scale-110 transition-transform" : ""} />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-primary/10 p-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/5 via-purple/5 to-info/5 p-4 border border-primary/10">
          <p className="text-xs font-semibold bg-gradient-to-r from-primary to-info bg-clip-text text-transparent mb-2">Need help?</p>
          <p className="text-xs text-muted-foreground">Check our documentation</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
