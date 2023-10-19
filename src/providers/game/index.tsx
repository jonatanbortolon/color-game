import { PropsWithChildren, useEffect, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { gameContext } from '../../contexts/game'
import { generateRandomColorHex } from '@/utils/generateRandomColorHex'
import { useCountdown } from '@/hooks/useCountdown'
import { Color } from '@/types/color'
import { History } from '@/types/history'
import { gameConfig } from '@/gameConfig'
import { Option } from '@/types/options'
import { Difficult } from '@/types/difficult'

type Props = PropsWithChildren

export function GameProvider({ children }: Props) {
  const [isStarted, setIsStarted] = useState(false)

  const [highestScore, setHighestScore] = useLocalStorage('highScore', 0)
  const [lastHistory, setLastHistory] = useLocalStorage<Array<History>>(
    'history',
    [],
  )

  const [currentDifficult, setCurrentDifficult] = useLocalStorage<Difficult>(
    'difficult',
    'easy',
  )
  const [currentScore, setCurrentScore] = useState(0)
  const [currentOptions, setCurrentOptions] = useState<Option>(() =>
    generateOptions(),
  )

  const {
    timer: gameTimer,
    start: startGameCountdown,
    reset: resetGameCountdown,
    increase: increaseGameCountdown,
    decrease: decreaseGameCountdown,
  } = useCountdown(gameConfig.gameTime)
  const {
    timer: roundTimer,
    start: startRoundCountdown,
    reset: resetRoundCountdown,
  } = useCountdown(gameConfig.roundTime)

  useEffect(() => {
    if (gameTimer > 0) return

    resetGameCountdown()

    endGame()
  }, [gameTimer])

  useEffect(() => {
    if (roundTimer > 0) return

    setLastHistory((old) => [
      ...old,
      {
        response: null,
        correct: currentOptions.correct,
        time: null,
      },
    ])

    setCurrentScore((old) =>
      old - gameConfig.pointOnTimeEnd < 0 ? 0 : old - gameConfig.pointOnTimeEnd,
    )

    decreaseGameCountdown(gameConfig.timeToDecreseOnWrong)

    nextRound()
  }, [roundTimer])

  function generateOptions(): Option {
    const correct = generateRandomColorHex()

    const optionsLength =
      currentDifficult === 'hard'
        ? gameConfig.hardOptionsLength
        : currentDifficult === 'medium'
        ? gameConfig.mediumOptionsLength
        : gameConfig.easyOptionsLength

    const options = Array.from({ length: optionsLength - 1 }).map(() =>
      generateRandomColorHex(),
    )

    return {
      correct,
      options,
    }
  }

  function nextRound() {
    setCurrentOptions(generateOptions())

    resetRoundCountdown()
    startRoundCountdown()
  }

  function startGame() {
    setIsStarted(true)

    startGameCountdown()

    setLastHistory([])

    nextRound()
  }

  function restartGame() {
    if (!isStarted) return

    setIsStarted(false)

    resetGameCountdown()
    resetRoundCountdown()

    setCurrentScore(0)
  }

  function endGame() {
    restartGame()

    if (currentScore > highestScore) {
      setHighestScore(currentScore)
    }

    setCurrentScore(0)
  }

  function answer(response: Color) {
    setLastHistory((old) => [
      ...old,
      {
        response,
        correct: currentOptions.correct,
        time: gameConfig.roundTime - roundTimer,
      },
    ])

    if (response === currentOptions.correct) {
      setCurrentScore((old) => old + gameConfig.pointsOnCorrect)
      increaseGameCountdown(gameConfig.timeToIncreaseOnCorrect)
    } else {
      setCurrentScore((old) =>
        old - gameConfig.pointOnWrong < 0 ? 0 : old - gameConfig.pointOnWrong,
      )
      decreaseGameCountdown(gameConfig.timeToDecreseOnWrong)
    }

    nextRound()
  }

  function changeDifficult(difficult: Difficult) {
    if (isStarted) return

    setCurrentDifficult(difficult)
  }

  return (
    <gameContext.Provider
      value={{
        isStarted,
        highestScore,
        currentScore,
        currentOptions,
        gameTimeRemaning: gameTimer,
        roundTimeRemaning: roundTimer,
        lastHistory,
        startGame,
        restartGame,
        answer,
        difficult: currentDifficult,
        changeDifficult,
      }}
    >
      {children}
    </gameContext.Provider>
  )
}
