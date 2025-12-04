import LoadingSpinner from '@/components/common/LoadingSpinner'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import OrderHistoryItem from './OrderHistoryItem'

const statusMap = {
  pending: '배송 준비중',
  shipped: '배송중',
  delivered: '배송 완료',
  cancelled: '주문 취소',
}

const OrderHistory = ({ orders, loading, openOrderId, toggleOrderDetails }) => {
  return (
    <div>
      {loading && <LoadingSpinner />}
      <h2 className="border-b border-gray-200 pb-4 text-lg font-bold text-gray-800 sm:text-2xl">
        주문 내역
      </h2>
      {orders.length === 0 && !loading ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">주문 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="rounded-lg border border-gray-200">
              <button
                onClick={() => toggleOrderDetails(order._id)}
                className="flex w-full cursor-pointer flex-col items-start p-4 text-left transition-colors duration-200 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center space-x-4">
                  <div className="text-sm text-gray-500">
                    <p className="font-semibold text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p>주문 번호: {order._id}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4 sm:w-auto sm:justify-start sm:space-x-4 sm:pt-0">
                  <p className="text-lg font-semibold text-gray-800">
                    {order.totalPrice.toLocaleString()}원
                  </p>
                  <ChevronDownIcon
                    className={`h-6 w-6 transform text-gray-400 transition-transform duration-200 ${
                      openOrderId === order._id ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {openOrderId === order._id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <OrderHistoryItem key={item.productId} item={item} />
                    ))}
                  </div>
                  <div className="mt-4 flex flex-col items-stretch gap-4 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs sm:text-sm">
                      <p className="text-gray-500">
                        <span className="font-semibold">받는사람:</span>{' '}
                        {order.recipient.name} / {order.recipient.phone}
                      </p>
                      <p className="text-gray-500">
                        <span className="font-semibold">배송지:</span> (
                        {order.shippingAddress.postcode}){' '}
                        {order.shippingAddress.address}{' '}
                        {order.shippingAddress.detailAddress}
                      </p>
                      {order.shippingAddress.deliveryMemo && (
                        <p className="text-gray-500">
                          <span className="font-semibold">요청사항:</span>{' '}
                          {order.shippingAddress.deliveryMemo}
                        </p>
                      )}
                      <p
                        className={`font-semibold ${
                          order.status === 'pending'
                            ? 'text-yellow-500'
                            : 'text-green-500'
                        }`}
                      >
                        {statusMap[order.status] || order.status}
                      </p>
                    </div>
                    <button className="cursor-pointer rounded-lg bg-black px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 sm:text-sm">
                      배송 조회
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderHistory
