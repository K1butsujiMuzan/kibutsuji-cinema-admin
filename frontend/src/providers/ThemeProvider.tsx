import { useEffect } from 'react'
import { useIsDark } from '../stores/useThemeStore.ts'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDark = useIsDark()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return children
}

export default ThemeProvider
