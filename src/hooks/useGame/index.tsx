import { useContext } from 'react'
import { gameContext } from '@/contexts/game'

export function useGame() {
  const context = useContext(gameContext)

  return context
}
