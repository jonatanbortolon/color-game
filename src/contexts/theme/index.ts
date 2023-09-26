import { createContext } from 'react'
import { Theme } from '../../types/theme'

type ThemeContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContext = {
  theme: 'system',
  setTheme: () => {},
}

export const themeContext = createContext<ThemeContext>(initialState)
