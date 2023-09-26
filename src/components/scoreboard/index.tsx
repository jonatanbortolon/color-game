import { useGame } from '@/hooks/useGame'
import { Button } from '../ui/button'
import { displayTime } from '@/utils/displayTime'

export function ScoreboardComponent() {
  const {
    isStarted,
    gameTimeRemaning,
    highestScore,
    currentScore,
    restartGame,
  } = useGame()

  function onRestartGameClick() {
    restartGame()
  }

  return (
    <div className="w-full flex rounded-md border border-input">
      <div className="h-full flex-1 grow-[2] uppercase flex flex-col justify-between p-3 text-center font-bold">
        <span className="text-xs">
          Remaning time (<span className="lowercase">s</span>)
        </span>
        <span>{displayTime(gameTimeRemaning)}s</span>
      </div>
      <Button
        className="h-full flex-1 grow uppercase rounded-none"
        disabled={!isStarted}
        variant="secondary"
        onClick={onRestartGameClick}
      >
        Restart
      </Button>
      <div className="h-full flex-1 grow-[2] uppercase flex flex-col font-bold p-3">
        <div className="w-full flex-1 flex justify-between items-center">
          <span className="text-xs mr-2">High score</span>
          <span>{highestScore}</span>
        </div>
        <div className="w-full flex-1 flex justify-between items-center">
          <span className="text-xs mr-2">Score</span>
          <span>{currentScore}</span>
        </div>
      </div>
    </div>
  )
}
