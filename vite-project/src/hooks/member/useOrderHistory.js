import { useState, useEffect, useCallback } from 'react'
import { getMyOrders } from '@/apis/order'

export function useOrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [openOrderId, setOpenOrderId] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const myOrders = await getMyOrders()
        setOrders(myOrders)
      } catch (error) {
        console.error('주문 내역을 불러오는 데 실패했습니다:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const toggleOrderDetails = useCallback((orderId) => {
    setOpenOrderId((prevId) => (prevId === orderId ? null : orderId))
  }, [])

  return { orders, loading, openOrderId, toggleOrderDetails }
}
