import { useContext } from 'react'
import { themeContext } from '../../contexts/theme'

export function useTheme() {
  const context = useContext(themeContext)

  return context
}
