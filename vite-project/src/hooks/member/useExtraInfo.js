import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { socialSignUp, getUserInfo } from '@/apis/member'
import useAuth from '@/hooks/useAuth'

export function useExtraInfo() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onSubmit' })

  const phone = watch('phone')

  useEffect(() => {
    if (phone) {
      const rawPhone = phone.replace(/[^0-9]/g, '')
      let formattedPhone = ''
      if (rawPhone.length < 4) {
        formattedPhone = rawPhone
      } else if (rawPhone.length < 8) {
        formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(3)}`
      } else {
        formattedPhone = `${rawPhone.slice(0, 3)}-${rawPhone.slice(
          3,
          7,
        )}-${rawPhone.slice(7, 11)}`
      }
      if (formattedPhone !== phone) {
        setValue('phone', formattedPhone, { shouldValidate: true })
      }
    }
  }, [phone, setValue])

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        await socialSignUp(data)
        const userInfo = await getUserInfo()
        setUser(userInfo.user)
        alert('회원가입이 완료되었습니다!')
        navigate('/')
      } catch (err) {
        console.error(err)
        alert(err.message)
      } finally {
        setLoading(false)
      }
    },
    [navigate, setUser],
  )

  return {
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit,
  }
}
