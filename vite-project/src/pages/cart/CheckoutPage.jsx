import { useCheckout } from '@/hooks/cart/useCheckout'
import Checkout from '@/components/cart/Checkout'

/**
 * 결제 페이지 컴포넌트.
 * `useCheckout` 훅을 사용하여 결제 관련 로직을 처리하고,
 * `Checkout` 컴포넌트에 필요한 데이터와 함수를 전달하여 렌더링합니다.
 * @returns {JSX.Element} 결제 페이지 엘리먼트
 */
const CheckoutPage = () => {
  const {
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
  } = useCheckout()

  return (
    <Checkout
      user={user}
      recipientName={recipientName}
      setRecipientName={setRecipientName}
      phone={phone}
      setPhone={setPhone}
      postcode={postcode}
      setPostcode={setPostcode}
      address={address}
      setAddress={setAddress}
      detailAddress={detailAddress}
      setDetailAddress={setDetailAddress}
      deliveryMemo={deliveryMemo}
      setDeliveryMemo={setDeliveryMemo}
      memoOption={memoOption}
      saveAddress={saveAddress}
      setSaveAddress={setSaveAddress}
      addresses={addresses}
      selectedAddressId={selectedAddressId}
      detailAddressRef={detailAddressRef}
      deliveryOptions={deliveryOptions}
      cartItems={cartItems}
      totalPrice={totalPrice}
      handleAddressSelect={handleAddressSelect}
      handleAddressSearch={handleAddressSearch}
      handleMemoChange={handleMemoChange}
      handleOrder={handleOrder}
    />
  )
}

export default CheckoutPage
