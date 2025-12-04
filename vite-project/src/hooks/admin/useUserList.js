import { useState, useEffect, useCallback } from 'react'
import { getUsers } from '@/apis/admin/users'
import useDebounce from '@/hooks/common/useDebounce'

export function useUserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await getUsers(currentPage, 10, debouncedSearchTerm)
        setUsers(response.users)
        setTotalPages(response.totalPages)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage, debouncedSearchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return {
    users,
    loading,
    currentPage,
    totalPages,
    searchTerm,
    handlePageChange,
    handleSearchChange,
  }
}