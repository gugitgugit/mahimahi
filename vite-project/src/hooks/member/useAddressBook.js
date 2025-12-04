import { useState, useEffect, useCallback } from 'react'
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/apis/member'

export function useAddressBook() {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getAddresses()
      const sortedAddresses = response.sort((a, b) => b.isDefault - a.isDefault)
      setAddresses(sortedAddresses)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAddresses()
  }, [fetchAddresses])

  const handleOpenModal = useCallback((address = null) => {
    setEditingAddress(address)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setEditingAddress(null)
  }, [])

  const handleSaveAddress = useCallback(
    async (addressData) => {
      try {
        if (editingAddress) {
          await updateAddress(editingAddress._id, addressData)
        } else {
          await addAddress(addressData)
        }
        fetchAddresses()
        handleCloseModal()
      } catch (err) {
        console.error(err)
      }
    },
    [editingAddress, fetchAddresses, handleCloseModal],
  )

  const handleDeleteAddress = useCallback(
    async (id) => {
      if (window.confirm('정말로 이 주소를 삭제하시겠습니까?')) {
        try {
          await deleteAddress(id)
          fetchAddresses()
        } catch (err) {
          console.error(err)
        }
      }
    },
    [fetchAddresses],
  )

  const handleSetDefault = useCallback(
    async (id) => {
      try {
        await setDefaultAddress(id)
        fetchAddresses()
      } catch (err) {
        console.error(err)
      }
    },
    [fetchAddresses],
  )

  return {
    addresses,
    loading,
    isModalOpen,
    editingAddress,
    handleOpenModal,
    handleCloseModal,
    handleSaveAddress,
    handleDeleteAddress,
    handleSetDefault,
  }
}
