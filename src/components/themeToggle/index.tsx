import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { SunIcon, MoonIcon, ComputerIcon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggleComponent() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed bottom-0 right-0 p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all data-[show=true]:rotate-0 data-[show=true]:scale-100"
              data-show={theme === 'light'}
            />
            <MoonIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all data-[show=true]:rotate-0 data-[show=true]:scale-100"
              data-show={theme === 'dark'}
            />
            <ComputerIcon
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all data-[show=true]:rotate-0 data-[show=true]:scale-100"
              data-show={theme === 'system'}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
