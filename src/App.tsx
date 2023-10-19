import { ClearSavedDataButtonComponent } from './components/clearSavedDataButton'
import { DifficultChooserComponent } from './components/difficultChooser'
import { GameHistoryComponent } from './components/gameHistory'
import { RoundComponent } from './components/round'
import { ScoreboardComponent } from './components/scoreboard'
import { SidebarComponent } from './components/sidebar'
import { ThemeToggleComponent } from './components/themeToggle'
import { Button } from './components/ui/button'
import { useGame } from './hooks/useGame'
import { generateRandomColorHex } from './utils/generateRandomColorHex'

export function App() {
  const { isStarted, startGame } = useGame()

  function onStartGameClick() {
    startGame()
  }

  return (
    <main className="w-full h-full flex">
      <SidebarComponent>
        <GameHistoryComponent />
      </SidebarComponent>
      <div className="h-full flex flex-1 flex-col items-center justify-start pt-[72px]">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-10">
          Guess the Color
        </h1>
        <div className="flex flex-col max-w-xs space-y-4">
          <DifficultChooserComponent />
          <ScoreboardComponent />
          {isStarted ? (
            <RoundComponent />
          ) : (
            <div className="w-full">
              <div className="w-full h-2 bg-primary" />
              <div
                className="w-full flex justify-center items-center aspect-square"
                style={{
                  backgroundColor: generateRandomColorHex(),
                }}
              >
                <Button className="uppercase" onClick={onStartGameClick}>
                  Start
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-min flex items-center justify-end mt-auto">
          <ClearSavedDataButtonComponent />
          <ThemeToggleComponent />
        </div>
      </div>
    </main>
  )
}
