import OrderList from '@/components/admin/OrderList'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import OrderStatsChart from '@/components/admin/OrderStatsChart'
import { useOrderList } from '@/hooks/admin/useOrderList'
import { useOrderStats } from '@/hooks/admin/useOrderStats'

/**
 * 관리자용 주문 목록 페이지 컴포넌트.
 * `useOrderList`와 `useOrderStats` 훅을 사용하여 주문 목록 및 통계 데이터를 관리하고,
 * `OrderList`와 `OrderStatsChart` 컴포넌트를 렌더링합니다.
 * @returns {JSX.Element} 주문 관리 페이지 엘리먼트
 */
const OrderListPage = () => {
  const orderListProps = useOrderList()
  const orderStatsProps = useOrderStats()

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <div className="mb-8 text-center">
          <div className="relative inline-flex items-center">
            <ShoppingCartIcon className="absolute right-full mr-3 h-8 w-8 text-gray-500" />
            <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900">
              주문 관리
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            들어온 주문 내역을 확인하고 처리합니다.
          </p>
        </div>
        <OrderList {...orderListProps} />
        <OrderStatsChart {...orderStatsProps} />
      </div>
    </div>
  )
}

export default OrderListPage