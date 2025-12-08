import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '@/apis/product'
import useDebounce from '@/hooks/common/useDebounce'
import useWindowSize from '@/hooks/common/useWindowSize'

export function useProductList() {
  const { category } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sort, setSort] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [subcategory, setSubcategory] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const { width } = useWindowSize()
  const isSmScreen = width >= 640
  const isXlScreen = width >= 1280
  const isAutoLoadingRef = useRef(false)

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
          20,
          category,
          sort,
          debouncedSearchTerm,
          undefined,
          undefined,
          undefined,
          ['outer', 'top', 'bottom', 'acc'].includes(category)
            ? subcategory
            : undefined,
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
  }, [category, sort, debouncedSearchTerm, subcategory])

  useEffect(() => {
    const fetchMoreProducts = async () => {
      if (currentPage > 1) {
        setLoading(true)
        try {
          const response = await getProducts(
            currentPage,
            20,
            category,
            sort,
            debouncedSearchTerm,
            undefined,
            undefined,
            undefined,
            ['outer', 'top', 'bottom', 'acc'].includes(category)
              ? subcategory
              : undefined,
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
  }, [currentPage, category, sort, debouncedSearchTerm, subcategory])

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

  const handleSubcategoryChange = (value) => {
    setSubcategory(value)
    setCurrentPage(1)
  }

  // category가 subcategory를 지원하지 않을 때 초기화
  useEffect(() => {
    if (!['outer', 'top', 'bottom', 'acc'].includes(category)) {
      setSubcategory('')
    }
  }, [category])

  // 화면 크기에 따라 마지막 줄을 채우기 위해 자동으로 추가 제품 로드
  useEffect(() => {
    if (
      !isSmScreen ||
      !products.length ||
      loading ||
      isAutoLoadingRef.current ||
      currentPage >= totalPages
    ) {
      return
    }

    let remainder, needed

    if (isXlScreen) {
      // xl 화면: 3열 그리드
      remainder = products.length % 3
      if (remainder === 1 || remainder === 2) {
        needed = remainder === 1 ? 2 : 1
      } else {
        return
      }
    } else {
      // sm, lg 화면: 2열 그리드
      remainder = products.length % 2
      if (remainder === 1) {
        needed = 1
      } else {
        return
      }
    }

    isAutoLoadingRef.current = true

    const fetchAdditionalProducts = async () => {
      try {
        const response = await getProducts(
          currentPage + 1,
          needed,
          category,
          sort,
          debouncedSearchTerm,
          undefined,
          undefined,
          undefined,
          ['outer', 'top', 'bottom', 'acc'].includes(category)
            ? subcategory
            : undefined,
        )
        setProducts((prev) => [...prev, ...response.products])
        setCurrentPage((prev) => prev + 1)
      } catch (error) {
        console.error('추가 상품을 불러오는 데 실패했습니다:', error)
      } finally {
        isAutoLoadingRef.current = false
      }
    }

    fetchAdditionalProducts()
  }, [
    products.length,
    isSmScreen,
    isXlScreen,
    loading,
    currentPage,
    totalPages,
    category,
    sort,
    debouncedSearchTerm,
    subcategory,
  ])

  return {
    category,
    products,
    loading,
    currentPage,
    totalPages,
    sort,
    sortOptions,
    searchTerm,
    subcategory,
    handleLoadMore,
    handleSearchTermChange,
    handleSortChange,
    handleSubcategoryChange,
  }
}
