import { useCart } from '@/hooks/cart/useCart'
import Cart from '@/components/cart/Cart'

/**
 * 장바구니 페이지 컴포넌트.
 * `useCart` 훅을 사용하여 장바구니 관련 로직을 처리하고,
 * `Cart` 컴포넌트에 필요한 데이터와 함수를 전달하여 렌더링합니다.
 * @returns {JSX.Element} 장바구니 페이지 엘리먼트
 */
const CartPage = () => {
  const {
    cartItems,
    loading,
    handleQuantityChange,
    handleRemoveItem,
    calculateTotal,
    handleGoToCheckout,
  } = useCart()

  return (
    <Cart
      cartItems={cartItems}
      loading={loading}
      handleQuantityChange={handleQuantityChange}
      handleRemoveItem={handleRemoveItem}
      calculateTotal={calculateTotal}
      handleGoToCheckout={handleGoToCheckout}
    />
  )
}

export default CartPage
