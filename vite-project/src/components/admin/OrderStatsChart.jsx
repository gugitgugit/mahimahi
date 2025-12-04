import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const OrderStatsChart = ({ stats, loading, error }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  return (
    <div className="mt-10 border-t border-gray-200 p-4">
      <h3 className="mb-4 text-lg leading-6 font-semibold text-gray-900">
        일자별 주문 통계
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={stats}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip
            formatter={(value, name) => [
              name === 'totalAmount' ? `${value.toLocaleString()}원` : value,
              name === 'totalAmount' ? '총 주문 금액' : '총 주문 수',
            ]}
          />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="totalOrders"
            fill="#8884d8"
            name="총 주문 수"
          />
          <Bar
            yAxisId="right"
            dataKey="totalAmount"
            fill="#82ca9d"
            name="총 주문 금액"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OrderStatsChart