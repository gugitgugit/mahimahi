import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { signUp, checkId } from '@/apis/member'

export function useSignUp() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [idCheckMessage, setIdCheckMessage] = useState('')
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    letter: false,
    number: false,
    specialChar: false,
  })

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange' })

  const username = watch('username')
  const password = watch('password')
  const phone = watch('phone')

  useEffect(() => {
    setIdCheckMessage('')
  }, [username])

  useEffect(() => {
    if (password) {
      setPasswordConditions({
        length: password.length >= 8 && password.length <= 20,
        letter: /[a-zA-Z]/.test(password),
        number: /\d/.test(password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      })
    } else {
      setPasswordConditions({
        length: false,
        letter: false,
        number: false,
        specialChar: false,
      })
    }
  }, [password])

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

  const handleCheckId = useCallback(async () => {
    const usernameValue = getValues('username')
    if (!usernameValue) {
      setIdCheckMessage('아이디를 입력해주세요.')
      return
    }
    try {
      const res = await checkId({ username: usernameValue })
      setIdCheckMessage(res.message)
    } catch (err) {
      setIdCheckMessage(err.message)
    }
  }, [getValues])

  const onSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const apiData = { ...data }
        delete apiData.password_check
        const res = await signUp(apiData)
        alert(res.message)
        navigate('/member/sign-in')
      } catch (err) {
        console.error(err)
        alert(err.message)
      } finally {
        setLoading(false)
      }
    },
    [navigate],
  )

  return {
    loading,
    idCheckMessage,
    passwordConditions,
    register,
    handleSubmit,
    watch,
    errors,
    handleCheckId,
    onSubmit,
  }
}
