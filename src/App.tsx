import { useState } from "react"
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/Header"
import { MainContent } from "@/components/MainContent"

function AppContent() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const { open, setOpen } = useSidebar()

  const handleContentClick = () => {
    if (open) {
      setOpen(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full">
      <AppSidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <SidebarInset className="flex-1" onClick={handleContentClick}>
        <Header activeItem={activeItem} sidebarOpen={open} />
        <MainContent />
      </SidebarInset>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={false}>
        <AppContent />
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App