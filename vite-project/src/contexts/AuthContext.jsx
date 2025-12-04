import { useState, useEffect, useMemo, useCallback } from 'react'
import api from '../apis/api'
import { getUserInfo } from '@/apis/member'
import { getCartItems } from '@/apis/cart'
import { AuthContext } from './AuthContextObject'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const fetchCartItems = useCallback(async () => {
    try {
      const items = await getCartItems()
      setCartItemCount(items.length)
    } catch (error) {
      console.error(error)
      setCartItemCount(0)
    }
  }, [])

  const fetchUser = useCallback(async () => {
    try {
      const data = await getUserInfo()
      setUser(data.user)
      return data.user
    } catch (err) {
      console.error(err)
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      const fetchedUser = await fetchUser()
      if (fetchedUser) {
        await fetchCartItems()
      }
      setIsLoading(false)
    }
    fetchInitialData()
  }, [fetchUser, fetchCartItems])

  const signOut = useCallback(async () => {
    await api.post('/member/sign-out')
    setUser(null)
    setCartItemCount(0)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signOut,
      setUser,
      cartItemCount,
      fetchCartItems,
      fetchUser,
    }),
    [user, isLoading, signOut, cartItemCount, fetchCartItems, fetchUser],
  )

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  )
}
