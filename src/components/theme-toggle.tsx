import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTheme } from "@/contexts/ThemeContext"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted/50 dark:hover:bg-muted/30 transition-all text-foreground hover:text-foreground"
        >
          {theme === 'light' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start text-sm text-foreground hover:text-foreground hover:bg-muted/70 dark:hover:bg-muted/50 transition-colors ${
              theme === 'light' ? 'bg-muted' : ''
            }`}
            onClick={() => setTheme('light')}
          >
            <Sun className="mr-2 h-4 w-4" />
            Light Mode
          </Button>
          <Button
            variant="ghost"
            className={`w-full justify-start text-sm text-foreground hover:text-foreground hover:bg-muted/70 dark:hover:bg-muted/50 transition-colors ${
              theme === 'dark' ? 'bg-muted' : ''
            }`}
            onClick={() => setTheme('dark')}
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark Mode
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

