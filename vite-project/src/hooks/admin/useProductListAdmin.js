import { useState, useEffect, useCallback } from 'react'
import { getAllProducts, deleteProduct } from '@/apis/admin/products'
import useDebounce from '@/hooks/common/useDebounce'

export function useProductListAdmin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const categories = ['all', 'outer', 'top', 'bottom', 'shoes', 'accessory']

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getAllProducts(
        currentPage,
        12,
        selectedCategory,
        debouncedSearchTerm,
      )
      setProducts(response.products)
      setTotalPages(response.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [currentPage, selectedCategory, debouncedSearchTerm])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedCategory])

  const handleDelete = useCallback(
    async (productId) => {
      if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
        try {
          await deleteProduct(productId)
          fetchProducts()
          alert('상품이 삭제되었습니다.')
        } catch (err) {
          console.error(err)
          alert('상품 삭제에 실패했습니다.')
        }
      }
    },
    [fetchProducts],
  )

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return {
    products,
    loading,
    currentPage,
    totalPages,
    selectedCategory,
    searchTerm,
    categories,
    handleDelete,
    handlePageChange,
    handleCategoryChange,
    handleSearchChange,
  }
}
