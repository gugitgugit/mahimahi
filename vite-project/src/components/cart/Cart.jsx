import LoadingSpinner from '@/components/common/LoadingSpinner'
import CartItem from '@/components/cart/CartItem'

const Cart = ({
  cartItems,
  loading,
  handleQuantityChange,
  handleRemoveItem,
  calculateTotal,
  handleGoToCheckout,
}) => {
  return (
    <div className="bg-white">
      {loading && <LoadingSpinner />}
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          장바구니
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item.product._id}
                    item={item}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveItem={handleRemoveItem}
                  />
                ))
              ) : (
                <p className="py-6 text-center text-gray-500">
                  장바구니에 담긴 상품이 없습니다.
                </p>
              )}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              주문 요약
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">상품 금액</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {calculateTotal().toLocaleString()}원
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">배송비</dt>
                <dd className="text-sm font-medium text-gray-900">무료</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  총 주문금액
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {calculateTotal().toLocaleString()}원
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoToCheckout}
                className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
              >
                결제하기
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Cart
