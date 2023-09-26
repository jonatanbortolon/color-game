import { useEffect, useState } from 'react'

export function useCountdown(initialTime: number) {
  const [isStarted, setIsStarted] = useState(false)
  const [timer, setTimer] = useState(initialTime)

  function start() {
    setIsStarted(true)
  }

  function stop() {
    setIsStarted(false)
  }

  function reset() {
    setIsStarted(false)

    setTimer(initialTime)
  }

  function increase(time: number) {
    setTimer((old) => old + time)
  }

  function decrease(time: number) {
    setTimer((old) => (old - time < 0 ? 0 : old - time))
  }

  useEffect(() => {
    if (!isStarted) return

    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((old) => old - 1)
      }

      clearInterval(interval)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isStarted, timer])

  return {
    timer,
    start,
    stop,
    reset,
    increase,
    decrease,
  }
}
