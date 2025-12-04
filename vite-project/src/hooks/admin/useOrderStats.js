import { useState, useEffect } from 'react'
import { getOrderStats } from '@/apis/admin/orders'

export function useOrderStats() {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await getOrderStats()
        setStats(data)
      } catch (err) {
        setError('통계 데이터를 불러오는 데 실패했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return { stats, loading, error }
}
