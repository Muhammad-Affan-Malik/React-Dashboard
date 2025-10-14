import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Get initial theme from localStorage, defaulting to 'light'
function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    // Always default to 'light' if no saved theme
    return savedTheme || 'light'
  }
  return 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    // Ensure the document class is correct on mount
    const currentTheme = getInitialTheme()
    
    // Remove dark class first to ensure clean state
    document.documentElement.classList.remove('dark')
    
    // Only add dark class if theme is explicitly dark
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      
      // Update localStorage
      localStorage.setItem('theme', newTheme)
      
      // Update document class
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      
      return newTheme
    })
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

