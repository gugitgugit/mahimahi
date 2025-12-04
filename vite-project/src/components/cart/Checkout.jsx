import CheckoutItem from '@/components/cart/CheckoutItem'

const Checkout = ({
  user,
  recipientName,
  setRecipientName,
  phone,
  setPhone,
  postcode,
  setPostcode,
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  deliveryMemo,
  setDeliveryMemo,
  memoOption,
  saveAddress,
  setSaveAddress,
  addresses,
  selectedAddressId,
  detailAddressRef,
  deliveryOptions,
  cartItems,
  totalPrice,
  handleAddressSelect,
  handleAddressSearch,
  handleMemoChange,
  handleOrder,
}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          결제하기
        </h1>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="flex items-center text-xl font-semibold text-gray-900">
              <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                1
              </span>
              주문 요약
            </h2>
            <div className="mt-6">
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <CheckoutItem key={item.product._id} item={item} />
                ))}
              </ul>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="flex items-center text-xl font-semibold text-gray-900">
              <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                2
              </span>
              배송지 정보
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  배송지 선택
                </label>
                <select
                  onChange={handleAddressSelect}
                  value={selectedAddressId}
                  className="mt-2 block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                >
                  <option value="new">새로운 배송지</option>
                  {addresses.map((addr) => (
                    <option key={addr._id} value={addr._id}>
                      {addr.alias} - {addr.address}{' '}
                      {addr.isDefault && '(기본 배송지)'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  받는 사람
                </label>
                <div className="mt-2 space-y-3">
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="이름"
                    className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="연락처"
                    className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                    readOnly={!!user?.phone}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  배송지
                </label>
                <div className="mt-2 space-y-3">
                  <div className="flex items-center gap-x-4">
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="우편번호"
                      className="block w-1/3 rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleAddressSearch}
                      className="rounded-md border border-transparent bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
                    >
                      주소 검색
                    </button>
                  </div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="주소"
                    className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                  />
                  <input
                    type="text"
                    ref={detailAddressRef}
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="상세주소 (선택)"
                    className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                  />
                </div>
              </div>

              {selectedAddressId === 'new' && (
                <div className="flex items-center">
                  <input
                    id="save-address"
                    name="save-address"
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-black accent-black focus:ring-black"
                  />
                  <label
                    htmlFor="save-address"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    이 배송지 저장
                  </label>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  배송 요청사항
                </label>
                <div className="mt-2">
                  <select
                    onChange={handleMemoChange}
                    value={memoOption}
                    className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                  >
                    <option value="">선택하세요</option>
                    {deliveryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                {memoOption === '직접 입력' && (
                  <div className="mt-2">
                    <textarea
                      value={deliveryMemo}
                      onChange={(e) => setDeliveryMemo(e.target.value)}
                      placeholder="배송 요청사항을 입력해주세요"
                      className="block w-full rounded-md border border-gray-300 p-3 focus:border-black focus:ring-black sm:text-sm"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          <div className="border-t border-gray-200"></div>

          <section>
            <h2 className="flex items-center text-xl font-semibold text-gray-900">
              <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white">
                3
              </span>
              결제 정보
            </h2>
            <div className="mt-6">
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">상품 금액</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {totalPrice.toLocaleString()}원
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
                    {totalPrice.toLocaleString()}원
                  </dd>
                </div>
              </dl>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full rounded-md border border-transparent bg-gray-900 px-4 py-3 text-base font-medium text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
                >
                  {totalPrice.toLocaleString()}원 결제하기
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Checkout
