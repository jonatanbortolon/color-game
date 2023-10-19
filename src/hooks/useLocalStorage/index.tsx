import { useEffect, useState, useCallback, Dispatch } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<React.SetStateAction<T>>] {
  function parseJSON(value: string) {
    try {
      return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
      console.log('parsing error on', { value })
      return undefined
    }
  }

  const getInitialValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)

      return item ? parseJSON(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(getInitialValue)

  const setValue = useCallback(
    (value: unknown) => {
      if (typeof window === 'undefined') {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`,
        )
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value

        window.localStorage.setItem(key, JSON.stringify(newValue))

        setStoredValue(newValue)
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error)
      }
    },
    [key, storedValue],
  )

  useEffect(() => {
    setStoredValue(getInitialValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [storedValue, setValue]
}
