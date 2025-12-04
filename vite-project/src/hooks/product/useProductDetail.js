import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '@/apis/product'
import { addToCart } from '@/apis/cart'
import useAuth from '@/hooks/useAuth'

export function useProductDetail() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, fetchCartItems } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const [showAllImages, setShowAllImages] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [showStickyButtons, setShowStickyButtons] = useState(false)
  const buttonContainerRef = useRef(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(productId)
        setProduct(productData)
      } catch (error) {
        console.error('상품 정보를 불러오는 데 실패했습니다:', error)
      }
      setLoading(false)
    }

    fetchProduct()
  }, [productId])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }

      if (buttonContainerRef.current) {
        const { bottom } = buttonContainerRef.current.getBoundingClientRect()
        if (bottom < 80) {
          setShowStickyButtons(true)
        } else {
          setShowStickyButtons(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [])

  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault()
      if (!isAuthenticated) {
        alert('로그인이 필요합니다.')
        return
      }
      try {
        await addToCart({ productId, quantity })
        await fetchCartItems()
        alert('장바구니에 상품이 추가되었습니다.')
      } catch (error) {
        console.error('장바구니 추가 실패:', error)
        alert('장바구니에 상품을 추가하는 데 실패했습니다.')
      }
    },
    [isAuthenticated, productId, quantity, fetchCartItems],
  )

  const handleBuyNow = useCallback(
    async (e) => {
      e.preventDefault()
      if (!isAuthenticated) {
        alert('로그인이 필요합니다.')
        return
      }
      try {
        await addToCart({ productId, quantity })
        await fetchCartItems()
        navigate('/member/cart')
      } catch (error) {
        console.error('바로 구매 실패:', error)
        alert('바로 구매에 실패했습니다.')
      }
    },
    [isAuthenticated, productId, quantity, fetchCartItems, navigate],
  )

  const incrementQuantity = useCallback(() => {
    if (product && quantity >= product.stock) {
      alert('재고가 부족합니다.')
      return
    }
    setQuantity((prev) => prev + 1)
  }, [quantity, product])

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }, [])

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  return {
    product,
    loading,
    quantity,
    isThumbnailLoaded,
    loadedImages,
    showAllImages,
    showScrollToTop,
    showStickyButtons,
    buttonContainerRef,
    setIsThumbnailLoaded,
    setShowAllImages,
    scrollToTop,
    handleAddToCart,
    handleBuyNow,
    incrementQuantity,
    decrementQuantity,
    handleImageLoad,
  }
}
