import { createContext } from 'react'

type UsersContext = {
  currentUser: string | null
  users: { [user: string]: true }
  addUser: (user: string) => void
  removeUser: (user: string) => void
  setCurrentUser: (user: string | null) => void
}

const initialState: UsersContext = {
  currentUser: null,
  users: {},
  addUser: () => {},
  removeUser: () => {},
  setCurrentUser: () => {},
}

export const usersContext = createContext<UsersContext>(initialState)
