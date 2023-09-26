import { expect, describe, vi, test, beforeAll, afterAll } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useGame } from '../../hooks/useGame/index'
import { LocalStorageMock } from '../../mocks/localStorage'
import { gameConfig } from '@/gameConfig'
import { GameProvider } from '@/providers/game'

function CustomTestComponent() {
  const {
    difficult,
    highestScore,
    currentScore,
    gameTimeRemaning,
    roundTimeRemaning,
    lastHistory,
    isStarted,
    startGame,
    restartGame,
    answer,
    currentOptions,
  } = useGame()

  return (
    <div>
      <div data-testid="isStarted">{String(isStarted)}</div>
      <div data-testid="difficult">{difficult}</div>
      <div data-testid="highestScore">{highestScore}</div>
      <div data-testid="currentScore">{currentScore}</div>
      <div data-testid="gameTimeRemaning">{gameTimeRemaning}</div>
      <div data-testid="roundTimeRemaning">{roundTimeRemaning}</div>
      <div data-testid="lastHistory">{JSON.stringify(lastHistory)}</div>

      <button data-testid="start-button" onClick={startGame}>
        Start
      </button>
      <button data-testid="restart-button" onClick={restartGame}>
        Restart
      </button>

      {isStarted ? (
        <div>
          <button
            data-testid="correct-option-button"
            onClick={() => answer(currentOptions.correct)}
          >
            Correct
          </button>
          <button
            data-testid="wrong-option-button"
            onClick={() => answer(currentOptions.options[0])}
          >
            Wrong
          </button>
        </div>
      ) : null}
    </div>
  )
}

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

describe('useGame provider', () => {
  beforeAll(() => {
    window.localStorage.clear()
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.resetAllMocks()
    vi.useRealTimers()
  })

  render(
    <GameProvider>
      <CustomTestComponent />
    </GameProvider>,
  )

  test('Initial game state is in the returned state', () => {
    const isStartedElement = screen.getByTestId('isStarted')
    const difficultElement = screen.getByTestId('difficult')
    const highestScoreElement = screen.getByTestId('highestScore')
    const currentScoreElement = screen.getByTestId('currentScore')
    const gameTimeRemaningElement = screen.getByTestId('gameTimeRemaning')
    const roundTimeRemaningElement = screen.getByTestId('roundTimeRemaning')
    const lastHistoryElement = screen.getByTestId('lastHistory')

    expect(isStartedElement.textContent).toBe('false')
    expect(difficultElement.textContent).toBe('easy')
    expect(highestScoreElement.textContent).toBe('0')
    expect(currentScoreElement.textContent).toBe('0')
    expect(gameTimeRemaningElement.textContent).toBe(
      gameConfig.gameTime.toString(),
    )
    expect(roundTimeRemaningElement.textContent).toBe(
      gameConfig.roundTime.toString(),
    )
    expect(lastHistoryElement.textContent).toEqual(JSON.stringify([]))
  })

  test('Test play game', async () => {
    const startButtonElement = screen.getByTestId('start-button')
    const isStartedElement = screen.getByTestId('isStarted')

    fireEvent.click(startButtonElement)

    expect(isStartedElement.textContent).toBe('true')

    const correctOptionButtonElement = screen.getByTestId(
      'correct-option-button',
    )
    const wrongOptionButtonElement = screen.getByTestId('wrong-option-button')

    // Add (gameConfig.pointsOnCorrect * 2) point
    fireEvent.click(correctOptionButtonElement)
    fireEvent.click(correctOptionButtonElement)

    // Remove (gameConfig.pointOnWrong * 1) point
    fireEvent.click(wrongOptionButtonElement)

    // Wait gameConfig.gameTime seconds to finish game
    await vi.advanceTimersByTimeAsync(gameConfig.gameTime * 1000)

    expect(isStartedElement.textContent).toBe('false')
  })

  test('Check if game high score is correct', () => {
    const highestScoreElement = screen.getByTestId('highestScore')

    const points =
      gameConfig.pointsOnCorrect * 2 -
      gameConfig.pointOnWrong * 1 -
      gameConfig.pointOnTimeEnd *
        (Math.floor(gameConfig.gameTime / gameConfig.roundTime) - 1)

    expect(highestScoreElement.textContent).toBe(points.toString())
  })

  test('Check if history is correct', () => {
    const lastHistoryElement = screen.getByTestId('lastHistory')

    const extrasQuestionsAnswered =
      Math.floor(gameConfig.gameTime / gameConfig.roundTime) - 1

    const parsedHistory = JSON.parse(lastHistoryElement.textContent ?? '{}')

    expect(parsedHistory[0].response)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[0].correct)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[0].response).toBe(parsedHistory[0].correct)
    expect(parsedHistory[0].time).to.be.a('number')

    expect(parsedHistory[1].response)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[1].correct)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[1].response).toBe(parsedHistory[1].correct)
    expect(parsedHistory[1].time).to.be.a('number')

    expect(parsedHistory[2].response)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[2].correct)
      .to.be.a('string')
      .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    expect(parsedHistory[2].response).not.toBe(parsedHistory[2].correct)
    expect(parsedHistory[2].time).to.be.a('number')

    Array.from({ length: extrasQuestionsAnswered }).forEach((_, index) => {
      expect(parsedHistory[index + 3].response).toBe(null)
      expect(parsedHistory[index + 3].correct)
        .to.be.a('string')
        .and.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      expect(parsedHistory[index + 3].time).toBe(null)
    })
  })
})
