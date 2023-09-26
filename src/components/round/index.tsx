import { gameConfig } from '@/gameConfig'
import { useGame } from '@/hooks/useGame'
import { arrayShuffle } from '@/utils/arrayShuffle'
import { Separator } from '../ui/separator'
import { Color } from '@/types/color'
import { Fragment, useMemo } from 'react'

export function RoundComponent() {
  const { roundTimeRemaning, currentOptions, answer } = useGame()

  const fullShuffledOptionsArray = useMemo(
    () => arrayShuffle([currentOptions.correct, ...currentOptions.options]),
    [currentOptions],
  )

  function onOptionClick(color: Color) {
    return () => answer(color)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full h-2 bg-secondary">
        <div
          className="h-full bg-primary"
          style={{
            width: (roundTimeRemaning / gameConfig.roundTime) * 100 + '%',
          }}
        />
      </div>
      <div
        className="w-full flex justify-center items-center aspect-square"
        style={{
          backgroundColor: currentOptions.correct,
        }}
      />
      <div className="w-full flex mt-4 rounded-md border border-input">
        {fullShuffledOptionsArray.map((option, index, array) => (
          <Fragment key={`option-${index}`}>
            <button
              className="w-full rounded-none p-4"
              onClick={onOptionClick(option)}
            >
              {option}
            </button>
            {index < array.length - 1 ? (
              <Separator orientation="vertical" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
