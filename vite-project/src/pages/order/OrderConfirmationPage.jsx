import { useOrderConfirmation } from '@/hooks/order/useOrderConfirmation'
import OrderConfirmation from '@/components/order/OrderConfirmation'

/**
 * 주문 완료 페이지 컴포넌트.
 * `useOrderConfirmation` 훅을 사용하여 주문 완료 정보를 가져오고,
 * `OrderConfirmation` 컴포넌트를 렌더링하여 사용자에게 주문 내역을 보여줍니다.
 * @returns {JSX.Element} 주문 완료 페이지 엘리먼트
 */
const OrderConfirmationPage = () => {
  const { order, loading, error } = useOrderConfirmation()

  return <OrderConfirmation order={order} loading={loading} error={error} />
}

export default OrderConfirmationPage
