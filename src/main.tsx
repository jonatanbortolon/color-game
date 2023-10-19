import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProvider } from './providers/theme'
import { UsersProvider } from './providers/users'
import { GameProvider } from './providers/game'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UsersProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </UsersProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
