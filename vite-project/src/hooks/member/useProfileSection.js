import { useState, useEffect, useCallback } from 'react'
import useAuth from '@/hooks/useAuth'
import { updateUserInfo } from '@/apis/member'

export function useProfileSection() {
  const { user, setUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '' })

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone })
    }
  }, [user])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSave = useCallback(async () => {
    if (!formData.name || !formData.phone) {
      alert('이름과 전화번호를 모두 입력해주세요.')
      return
    }
    try {
      const updatedUser = await updateUserInfo(formData)
      setUser(updatedUser.user)
      setIsEditing(false)
      alert('정보가 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('정보 수정 실패:', error)
      alert('정보 수정에 실패했습니다.')
    }
  }, [formData, setUser])

  const handleCancel = useCallback(() => {
    if (user) {
      setFormData({ name: user.name, phone: user.phone })
    }
    setIsEditing(false)
  }, [user])

  const handleSetIsEditing = (value) => {
    setIsEditing(value)
  }

  return {
    isEditing,
    formData,
    handleInputChange,
    handleSave,
    handleCancel,
    handleSetIsEditing,
  }
}
