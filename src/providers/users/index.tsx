import { usersContext } from '@/contexts/users'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren

export function UsersProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useLocalStorage<string | null>(
    'current-user',
    null,
  )
  const [users, setUsers] = useLocalStorage<{ [user: string]: true }>(
    'users',
    {},
  )

  function addUser(user: string) {
    setUsers((old) => ({
      ...old,
      [user]: true,
    }))
  }

  function removeUser(user: string) {
    setUsers((old) => {
      const oldHandler = structuredClone(old)

      delete oldHandler[user]

      return oldHandler
    })
  }

  return (
    <usersContext.Provider
      value={{
        currentUser,
        users,
        addUser,
        removeUser,
        setCurrentUser,
      }}
    >
      {children}
    </usersContext.Provider>
  )
}
