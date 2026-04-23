import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  name: string
  email: string
  password: string
}

type AuthContextType = {
  user: User | null
  users: User[]
  loading: boolean
  signup: (data: Omit<User, 'id'>) => Promise<{ success: boolean; message?: string }>
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('users')
        const storedUser = await AsyncStorage.getItem('currentUser')

        if (storedUsers) setUsers(JSON.parse(storedUsers))
        if (storedUser) setUser(JSON.parse(storedUser))
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const signup = async (data: Omit<User, 'id'>) => {
    try {
      // check if email exists
      const exists = users.find(u => u.email === data.email)
      if (exists) {
        return { success: false, message: 'Email already exists' }
      }

      const newUser: User = {
        id: Date.now().toString(),
        ...data,
      }

      const updatedUsers = [...users, newUser]

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser))

      setUsers(updatedUsers)
      setUser(newUser)

      return { success: true }
    } catch (error) {
      console.log('error ',error)
      return { success: false, message: 'Signup failed' }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const foundUser = users.find(
        u => u.email === email && u.password === password
      )

      if (!foundUser) {
        return { success: false, message: 'Incorrect credentials.' }
      }

      await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser))
      setUser(foundUser)

      return { success: true }
    } catch (error) {
      return { success: false, message: 'Login failed' }
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, users, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside provider')
  return ctx
}