import { useGame } from '@/hooks/useGame'
import { displayTime } from '@/utils/displayTime'
import { Separator } from '../ui/separator'
import { cn } from '@/libs/utils'
import { getContrastTextColor } from '@/utils/getContrastTextColor'

export function GameHistoryComponent() {
  const { lastHistory } = useGame()

  return (
    <div className="w-full h-full flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="flex w-full justify-start items-center p-2">
          <span className="text-center">Guessed color</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex w-full justify-center items-center p-2">
          <span className="text-center">Correct color</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex justify-center items-center p-2">
          <span className="text-center">Time</span>
        </div>
      </div>
      {lastHistory.map((history, index) => (
        <div
          key={`history-${index}`}
          className="w-full h-12 flex gap-3 justify-end"
        >
          {history.response !== history.correct ? (
            history.response ? (
              <div
                className="w-full h-full rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: history.response,
                }}
              >
                <span
                  className={cn(
                    'text-xs font-bold',
                    getContrastTextColor(history.response),
                  )}
                >
                  {history.response}
                </span>
              </div>
            ) : (
              <div className="w-full h-full flex" />
            )
          ) : null}
          <div
            className="w-full h-full rounded-md flex items-center justify-center"
            style={{
              backgroundColor: history.correct,
            }}
          >
            <span
              className={cn(
                'text-xs font-bold',
                getContrastTextColor(history.correct),
              )}
            >
              {history.correct}
            </span>
          </div>
          <div className="h-full flex items-center justify-center px-4">
            <span className="whitespace-nowrap">
              {displayTime(history.time)}
              {history.response ? 's' : ' s'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
