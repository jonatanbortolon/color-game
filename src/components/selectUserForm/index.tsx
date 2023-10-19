import { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useUsers } from '@/hooks/useUser'
import { Button } from '../ui/button'
import { XIcon } from 'lucide-react'

export function SelectUserFormComponent() {
  const { users, addUser, setCurrentUser, removeUser } = useUsers()
  const [username, setUsername] = useState('')

  function onUsernameInputChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value)
  }

  function onAddUserClick() {
    addUser(username)

    setCurrentUser(username)

    setUsername('')
  }

  function onUserRemoveClick(user: string) {
    return () => removeUser(user)
  }

  function onSelectUserClick(user: string) {
    return () => setCurrentUser(user)
  }

  return (
    <div className="w-full h-full flex flex-col max-w-xs mx-auto">
      <div className="w-full flex-1 flex flex-col items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight mb-10 pt-[72px]">
          Guess the Color
        </h1>
        <div className="w-full flex flex-col">
          <Label className="mb-2" htmlFor="username">
            Username
          </Label>
          <Input
            id="username"
            value={username}
            onChange={onUsernameInputChange}
          />
          <Button className="w-full mt-4" onClick={onAddUserClick}>
            Add user
          </Button>
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col mt-8 gap-2 mb-4 overflow-y-auto">
        {Object.keys(users).length ? (
          <>
            <span className="text-bold">Saved users</span>
            {Object.keys(users).map((user) => (
              <div
                key={`userlist-${user}`}
                className="w-full flex items-center justify-between rounded-md border border-input px-4 py-1"
              >
                <Button
                  className="hover:bg-transparent"
                  variant="ghost"
                  onClick={onSelectUserClick(user)}
                >
                  {user}
                </Button>
                <Button
                  className="text-destructive"
                  variant="ghost"
                  size="icon"
                  onClick={onUserRemoveClick(user)}
                >
                  <XIcon />
                </Button>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  )
}
