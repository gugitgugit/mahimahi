import { useState } from 'react'

export function useMyPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return {
    activeTab,
    isModalOpen,
    handleTabClick,
    handleOpenModal,
    handleCloseModal,
  }
}
