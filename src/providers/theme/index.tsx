import { PropsWithChildren, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { themeContext } from '../../contexts/theme'
import { Theme } from '@/types/theme'

type Props = PropsWithChildren<{
  defaultTheme?: Theme
  storageKey?: string
}>

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: Props) {
  const [theme, setTheme] = useLocalStorage(storageKey, defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  )
}
