import * as React from "react"
import { Search, LayoutDashboard, BarChart3, Users, FileText } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      {/* Desktop Search Bar */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex relative w-full max-w-md h-10 rounded-xl border border-primary/20 bg-gradient-to-r from-card to-primary/5 pl-10 pr-4 text-sm text-left outline-none placeholder:text-muted-foreground transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/10 shadow-sm items-center"
      >
        <Search className="absolute left-3.5 h-4 w-4 text-primary transition-colors" />
        <span className="text-muted-foreground">Search anything...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-primary/30 bg-gradient-to-br from-primary/10 to-purple/10 px-1.5 font-mono text-xs font-medium text-primary opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile Search Icon */}
      {/* Dimensions for mobile seacrh button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-all"
      >
        <Search className="h-5 w-5 text-primary" />
      </button>
      <CommandDialog 
        open={open} 
        onOpenChange={setOpen}
        className="!top-4 !translate-y-0 md:!top-[50%] md:!translate-y-[-50%]"
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
              <span>Search Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <BarChart3 className="mr-2 h-4 w-4 text-purple" />
              <span>Search Analytics</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <Users className="mr-2 h-4 w-4 text-info" />
              <span>Search Users</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <FileText className="mr-2 h-4 w-4 text-orange" />
              <span>Search Reports</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

