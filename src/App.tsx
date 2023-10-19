import { ClearSavedDataButtonComponent } from './components/clearSavedDataButton'
import { DifficultChooserComponent } from './components/difficultChooser'
import { GameHistoryComponent } from './components/gameHistory'
import { RoundComponent } from './components/round'
import { ScoreboardComponent } from './components/scoreboard'
import { SelectUserFormComponent } from './components/selectUserForm'
import { SidebarComponent } from './components/sidebar'
import { ThemeToggleComponent } from './components/themeToggle'
import { Button } from './components/ui/button'
import { useGame } from './hooks/useGame'
import { useUsers } from './hooks/useUser'
import { generateRandomColorHex } from './utils/generateRandomColorHex'

export function App() {
  const { currentUser, setCurrentUser } = useUsers()
  const { isStarted, startGame } = useGame()

  function onStartGameClick() {
    startGame()
  }

  function onChangeUserClick() {
    setCurrentUser(null)
  }

  return (
    <main className="w-full h-full flex">
      {!currentUser ? (
        <SelectUserFormComponent />
      ) : (
        <>
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
            <div className="w-full h-min flex items-center justify-between mt-auto p-4">
              <div className="flex items-center">
                Current user:
                <Button
                  className="px-2"
                  variant="link"
                  onClick={onChangeUserClick}
                >
                  {currentUser}
                </Button>
              </div>
              <div className="flex items-center">
                <ClearSavedDataButtonComponent />
                <ThemeToggleComponent />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
