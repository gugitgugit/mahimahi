import { useProductDetail } from '@/hooks/product/useProductDetail'
import ProductDetail from '@/components/product/ProductDetail'

/**
 * 상품 상세 페이지 컴포넌트.
 * `useProductDetail` 훅을 사용하여 상품 상세 정보 및 관련 로직을 처리하고,
 * `ProductDetail` 컴포넌트를 렌더링하여 사용자에게 상품 정보를 보여줍니다.
 * @returns {JSX.Element} 상품 상세 페이지 엘리먼트
 */
const ProductDetailPage = () => {
  const {
    product,
    loading,
    quantity,
    isThumbnailLoaded,
    loadedImages,
    showAllImages,
    showScrollToTop,
    showStickyButtons,
    buttonContainerRef,
    setIsThumbnailLoaded,
    setShowAllImages,
    scrollToTop,
    handleAddToCart,
    handleBuyNow,
    incrementQuantity,
    decrementQuantity,
    handleImageLoad,
  } = useProductDetail()

  return (
    <ProductDetail
      product={product}
      loading={loading}
      quantity={quantity}
      isThumbnailLoaded={isThumbnailLoaded}
      loadedImages={loadedImages}
      showAllImages={showAllImages}
      showScrollToTop={showScrollToTop}
      showStickyButtons={showStickyButtons}
      buttonContainerRef={buttonContainerRef}
      setIsThumbnailLoaded={setIsThumbnailLoaded}
      setShowAllImages={setShowAllImages}
      scrollToTop={scrollToTop}
      handleAddToCart={handleAddToCart}
      handleBuyNow={handleBuyNow}
      incrementQuantity={incrementQuantity}
      decrementQuantity={decrementQuantity}
      handleImageLoad={handleImageLoad}
    />
  )
}

export default ProductDetailPage
