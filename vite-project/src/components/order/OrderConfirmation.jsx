import { Link } from 'react-router-dom'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import OrderConfirmationItem from '@/components/cart/OrderConfirmationItem'

const OrderConfirmation = ({ order, loading, error }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="py-24 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <p>주문 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            주문이 완료되었습니다!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            주문해주셔서 감사합니다. 주문이 성공적으로 접수되었습니다.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Order details</h2>

          <div className="space-y-8 rounded-lg border border-gray-200 bg-white p-8">
            <div className="grid grid-cols-1 gap-y-8 text-sm sm:grid-cols-4 sm:gap-x-6">
              <div className="sm:col-span-2">
                <h3 className="font-medium text-gray-900">주문 번호</h3>
                <p className="mt-1 text-gray-500">{order._id}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">주문 날짜</h3>
                <p className="mt-1 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">주문자</h3>
                <p className="mt-1 text-gray-500">{order.user.name}</p>
                <p className="mt-1 text-gray-500">{order.user.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-medium text-gray-900">배송지 정보</h3>
              <div className="mt-1 text-gray-500">
                <p>{order.recipient.name}</p>
                <p>{order.recipient.phoneNumber}</p>
                <p>
                  ({order.shippingAddress.postcode}){' '}
                  {order.shippingAddress.address}
                </p>
                <p>{order.shippingAddress.detailAddress}</p>
                {order.shippingAddress.deliveryMemo && (
                  <p className="mt-1">{order.shippingAddress.deliveryMemo}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-medium text-gray-900">주문 상품</h3>
              <ul role="list" className="mt-4 divide-y divide-gray-200">
                {order.items.map((item) => (
                  <OrderConfirmationItem key={item.productId} item={item} />
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 pt-8 text-right">
              <dl className="space-y-4">
                <div className="flex justify-end">
                  <dt className="text-base font-medium text-gray-900">
                    총 결제금액
                  </dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    {order.totalPrice.toLocaleString()}원
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/"
              className="rounded-md bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
