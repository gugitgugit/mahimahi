import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} from '@/apis/cart'
import useAuth from '@/hooks/useAuth'

export function useCart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { fetchCartItems } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInitialCartItems = async () => {
      try {
        setLoading(true)
        const items = await getCartItems()
        setCartItems(items)
      } catch (error) {
        console.error('장바구니 정보를 불러오는 데 실패했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialCartItems()
  }, [])

  const handleQuantityChange = useCallback(
    async (productId, newQuantity) => {
      if (newQuantity < 1) return

      const item = cartItems.find((item) => item.product._id === productId)
      if (newQuantity > item.product.stock) {
        alert('재고가 부족합니다.')
        return
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      )

      try {
        await updateCartItemQuantity(productId, newQuantity)
      } catch (error) {
        console.error('수량 변경에 실패했습니다:', error)
      }
    },
    [cartItems],
  )

  const handleRemoveItem = useCallback(
    async (productId) => {
      if (!window.confirm('정말로 이 상품을 삭제하시겠습니까?')) return

      try {
        await deleteCartItem(productId)
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product._id !== productId),
        )
        await fetchCartItems()
      } catch (error) {
        console.error('상품 삭제에 실패했습니다:', error)
        alert('상품 삭제에 실패했습니다.')
      }
    },
    [fetchCartItems],
  )

  const calculateTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.product.sellingPrice * item.quantity,
      0,
    )
  }, [cartItems])

  const handleGoToCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      alert('장바구니에 상품이 없습니다.')
      return
    }
    navigate('/checkout', {
      state: { cartItems: cartItems, totalPrice: calculateTotal() },
    })
  }, [cartItems, navigate, calculateTotal])

  return {
    cartItems,
    loading,
    handleQuantityChange,
    handleRemoveItem,
    calculateTotal,
    handleGoToCheckout,
  }
}
