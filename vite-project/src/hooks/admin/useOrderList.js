import { useState, useEffect, useCallback } from 'react'
import { getOrders, updateOrderStatus } from '@/apis/admin/orders'

export function useOrderList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [expandedOrderId, setExpandedOrderId] = useState(null)

  const statusOptions = [
    { value: 'pending', label: '준비중' },
    { value: 'delivered', label: '배송완료' },
  ]

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getOrders(currentPage, 10)
      setOrders(response.orders)
      setTotalPages(response.totalPages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [currentPage])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  const handleToggle = useCallback((orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId))
  }, [])

  const handleStatusChange = useCallback(
    async (orderId, newStatus) => {
      try {
        await updateOrderStatus(orderId, newStatus)
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        )
      } catch (err) {
        console.error('Failed to update order status:', err)
        alert('상태 변경에 실패했습니다.')
      }
    },
    [],
  )

  return {
    orders,
    loading,
    currentPage,
    totalPages,
    expandedOrderId,
    statusOptions,
    handlePageChange,
    handleToggle,
    handleStatusChange,
  }
}
