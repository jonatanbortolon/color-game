import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from './index'
import { LocalStorageMock } from '../../mocks/localStorage'
import { expect, describe, test, afterEach, beforeEach, vi } from 'vitest'

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
})

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('Initial state is in the returned state', () => {
    const initialKey1 = 'testInitial'
    const initialKey2 = 'users'

    const initialValue1 = 'some-random-value'
    const initialValue2 = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]

    const { result: result1 } = renderHook(() =>
      useLocalStorage(initialKey1, initialValue1),
    )
    const { result: result2 } = renderHook(() =>
      useLocalStorage(initialKey2, initialValue2),
    )

    expect(result1.current[0]).toBe(initialValue1)
    expect(result2.current[0]).toBe(initialValue2)
  })

  test('Update the state', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    act(() => {
      const setState = result.current[1]

      setState('edited')
    })

    expect(result.current[0]).toBe('edited')
  })

  test('Update the state writes localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'value'))

    act(() => {
      const setState = result.current[1]

      setState('edited')
    })

    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('edited'))
  })

  test('Update the state with a callback function', () => {
    const { result } = renderHook(() => useLocalStorage('count', 2))

    act(() => {
      const setState = result.current[1]

      setState((prev) => prev + 1)
    })

    expect(result.current[0]).toBe(3)

    expect(window.localStorage.getItem('count')).toEqual('3')
  })
})
