import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '@/apis/product'
import useDebounce from '@/hooks/common/useDebounce'

export function useProductList() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sort, setSort] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const sortOptions = [
    { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price-asc' },
    { name: 'Price: High to Low', value: 'price-desc' },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return
      setLoading(true)
      try {
        const response = await getProducts(
          1,
          8,
          category,
          sort,
          debouncedSearchTerm,
        )
        setProducts(response.products)
        setTotalPages(response.totalPages)
        setCurrentPage(1)
      } catch (error) {
        console.error('상품을 불러오는 데 실패했습니다:', error)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [category, sort, debouncedSearchTerm])

  useEffect(() => {
    const fetchMoreProducts = async () => {
      if (currentPage > 1) {
        setLoading(true)
        try {
          const response = await getProducts(
            currentPage,
            8,
            category,
            sort,
            debouncedSearchTerm,
          )
          setProducts((prev) => [...prev, ...response.products])
          setTotalPages(response.totalPages)
        } catch (error) {
          console.error('상품을 불러오는 데 실패했습니다:', error)
        }
        setLoading(false)
      }
    }
    fetchMoreProducts()
  }, [currentPage, category, sort, debouncedSearchTerm])

  const handleLoadMore = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }, [currentPage, totalPages])

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSortChange = (value) => {
    setSort(value)
  }

  return {
    category,
    products,
    loading,
    currentPage,
    totalPages,
    sort,
    sortOptions,
    searchTerm,
    handleLoadMore,
    handleSearchTermChange,
    handleSortChange,
  }
}
