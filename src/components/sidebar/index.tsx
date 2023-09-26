import { PropsWithChildren, useState } from 'react'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'

type Props = PropsWithChildren

export function SidebarComponent({ children }: Props) {
  const [opened, setOpened] = useState(false)

  function onToggleModalClick() {
    setOpened((old) => !old)
  }

  return (
    <div
      className="fixed inset-0 h-full data-[opened=false]:pointer-events-none data-[opened=false]:bg-transparent bg-black/30 group z-20 transition-colors sm:bg-transparent sm:static sm:w-1/3"
      data-opened={opened}
    >
      <div className="fixed top-0 left-0 p-4 z-20 pointer-events-auto sm:hidden">
        <Button variant="outline" size="icon" onClick={onToggleModalClick}>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </div>
      <aside className="w-3/5 h-full flex flex-col p-2 border-r border-r-input pointer-events-auto group-data-[opened=false]:-translate-x-full bg-background transition-transform pt-[72px] sm:pt-6 sm:!translate-x-0 sm:w-full">
        <div className="w-full h-full flex flex-col overflow-y-auto">
          {children}
        </div>
      </aside>
    </div>
  )
}
