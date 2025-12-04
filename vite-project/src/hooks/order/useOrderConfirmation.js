import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById } from '@/apis/order'

export function useOrderConfirmation() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      setError('주문 ID가 제공되지 않았습니다.')
      return
    }

    const fetchOrder = async () => {
      try {
        setLoading(true)
        const orderData = await getOrderById(orderId)
        setOrder(orderData)
      } catch (err) {
        setError('주문 정보를 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  return { order, loading, error }
}
