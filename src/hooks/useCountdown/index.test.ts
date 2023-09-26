import { expect, describe, test, vi, afterAll, beforeAll } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { LocalStorageMock } from '../../mocks/localStorage'
import { useCountdown } from '.'
import { gameConfig } from '@/gameConfig'

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

describe('useCountdown hook', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  test('Initial state is in the returned state', () => {
    const { result } = renderHook(() => useCountdown(gameConfig.gameTime))

    expect(result.current.timer).toBe(gameConfig.gameTime)
  })

  test('Stop timer', async () => {
    const { result } = renderHook(() => useCountdown(gameConfig.gameTime))

    const stopTime = gameConfig.gameTime - 26 // Stop on 26 seconds

    act(() => {
      const start = result.current.start

      start()
    })

    await vi.advanceTimersByTimeAsync(stopTime * 1000)

    act(() => {
      const stop = result.current.stop

      stop()
    })

    expect(result.current.timer).toBe(gameConfig.gameTime - stopTime)
  })

  test('Increase timer', () => {
    const { result } = renderHook(() => useCountdown(gameConfig.gameTime))

    const timeToIncrease = 10

    act(() => {
      const increase = result.current.increase

      increase(timeToIncrease)
    })

    expect(result.current.timer).toBe(gameConfig.gameTime + timeToIncrease)
  })

  test('Decrease timer', () => {
    const { result } = renderHook(() => useCountdown(gameConfig.gameTime))

    const timeToDecrease = 10

    act(() => {
      const decrease = result.current.decrease

      decrease(timeToDecrease)
    })

    expect(result.current.timer).toBe(gameConfig.gameTime - timeToDecrease)
  })

  test('Restart timer', async () => {
    const { result } = renderHook(() => useCountdown(gameConfig.gameTime))

    const stopTime = gameConfig.gameTime - 28 // Stop on 28 seconds

    act(() => {
      const start = result.current.start

      start()
    })

    await vi.advanceTimersByTimeAsync(stopTime * 1000)

    act(() => {
      const reset = result.current.reset

      reset()
    })

    expect(result.current.timer).toBe(gameConfig.gameTime)
  })
})
