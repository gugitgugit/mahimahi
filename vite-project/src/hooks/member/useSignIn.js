import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signIn, getUserInfo } from '@/apis/member'
import useAuth from '@/hooks/useAuth'

export function useSignIn() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit' })

  const onSubmit = useCallback(async (data) => {
    try {
      setLoading(true)
      await signIn(data)
      const userInfo = await getUserInfo()
      setUser(userInfo.user)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }, [navigate, setUser])

  return {
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  }
}
