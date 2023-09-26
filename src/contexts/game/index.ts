import { Color } from '@/types/color'
import { Difficult } from '@/types/difficult'
import { History } from '@/types/history'
import { Option } from '@/types/options'
import { createContext } from 'react'

type GameContext = {
  isStarted: boolean
  highestScore: number
  currentScore: number
  currentOptions: Option
  gameTimeRemaning: number
  roundTimeRemaning: number
  lastHistory: Array<History>
  difficult: Difficult
  startGame: () => void
  restartGame: () => void
  answer: (color: Color) => void
  changeDifficult: (difficult: Difficult) => void
}

const initialState: GameContext = {
  isStarted: false,
  highestScore: 0,
  currentScore: 0,
  currentOptions: {
    correct: '#fff',
    options: [],
  },
  lastHistory: [],
  gameTimeRemaning: 0,
  roundTimeRemaning: 0,
  difficult: 'easy',
  startGame: () => {},
  restartGame: () => {},
  answer: () => {},
  changeDifficult: () => {},
}

export const gameContext = createContext<GameContext>(initialState)
