import { useContext } from 'react'
import { usersContext } from '@/contexts/users'

export function useUsers() {
  const context = useContext(usersContext)

  return context
}
