import { Fragment } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import Pagination from '@/components/common/Pagination'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  delivered: 'bg-green-100 text-green-800',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const OrderList = ({
  orders,
  loading,
  currentPage,
  totalPages,
  expandedOrderId,
  statusOptions,
  handlePageChange,
  handleToggle,
  handleStatusChange,
}) => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl">
      {loading && <LoadingSpinner />}
      {orders.length === 0 && !loading ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            주문 내역이 없습니다.
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            아직 생성된 주문이 없습니다.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`rounded-lg border border-gray-200 bg-white transition-all duration-300 ${
                  order.status === 'delivered' ? 'opacity-60' : ''
                }`}
              >
                <div
                  className="cursor-pointer p-4 md:p-6"
                  onClick={() => handleToggle(order._id)}
                >
                  <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm font-semibold text-gray-900">
                        주문번호: {order._id}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()} | 주문자:{' '}
                        {order.user.name}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-bold text-gray-800">
                        {order.totalPrice.toLocaleString()}원
                      </p>
                      <span
                        className={classNames(
                          'rounded-full px-3 py-1 text-xs font-medium',
                          statusStyles[order.status],
                        )}
                      >
                        {
                          statusOptions.find((o) => o.value === order.status)
                            ?.label
                        }
                      </span>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Menu.Button className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="ring-opacity-5 absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                            <div className="py-1">
                              {statusOptions.map((option) => (
                                <Menu.Item key={option.value}>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        handleStatusChange(
                                          order._id,
                                          option.value,
                                        )
                                      }
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900'
                                          : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm',
                                      )}
                                    >
                                      {option.label}
                                    </button>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>

                <Transition
                  show={expandedOrderId === order._id}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  <div className="border-t border-gray-200 bg-gray-50 p-4 md:p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-800">
                          주문 상품 상세
                        </h4>
                        <ul className="space-y-3">
                          {order.items.map((item) => (
                            <li key={item._id} className="flex items-center">
                              <img
                                src={item.thumbnail1 || item.thumbnailUrl}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover shadow-sm"
                              />
                              <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  수량: {item.quantity}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-gray-800">
                          배송 정보
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>수령인: {order.recipient.name}</p>
                          <p>연락처: {order.recipient.phone}</p>
                          <p>
                            주소: ({order.shippingAddress.postcode}){' '}
                            {order.shippingAddress.address}{' '}
                            {order.shippingAddress.detailAddress}
                          </p>
                          {order.shippingAddress.deliveryMemo && (
                            <p>
                              요청사항: {order.shippingAddress.deliveryMemo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  )
}

export default OrderList