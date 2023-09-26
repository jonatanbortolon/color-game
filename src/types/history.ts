import { Color } from './color'

type AnsweredHistory = {
  response: Color
  correct: Color
  time: number
}

type NonAnsweredHistory = {
  response: null
  correct: Color
  time: null
}

export type History = AnsweredHistory | NonAnsweredHistory
