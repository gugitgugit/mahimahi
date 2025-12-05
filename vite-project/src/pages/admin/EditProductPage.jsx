import { useEditProduct } from '@/hooks/admin/useEditProduct'
import ProductForm from '@/components/admin/ProductForm'

/**
 * 관리자가 기존 상품을 수정하는 페이지 컴포넌트.
 * `useEditProduct` 훅을 사용하여 상품 수정 관련 로직을 처리하고,
 * `ProductForm` 컴포넌트를 `isEdit` 모드로 렌더링합니다.
 * @returns {JSX.Element} 상품 수정 페이지 엘리먼트
 */
const EditProductPage = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    loading,
    imagePreviews,
    thumbnail1Preview,
    thumbnail2Preview,
    displayPurchasePrice,
    displaySellingPrice,
    margin,
    onSubmit,
    handleFileChange,
    handleThumbnail1Change,
    handleThumbnail2Change,
    handlePurchasePriceChange,
    handleSellingPriceChange,
  } = useEditProduct()

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl font-extrabold text-gray-900">
          상품 수정
        </h2>
        <ProductForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          control={control}
          errors={errors}
          loading={loading}
          handleFileChange={handleFileChange}
          imagePreviews={imagePreviews}
          handleThumbnail1Change={handleThumbnail1Change}
          handleThumbnail2Change={handleThumbnail2Change}
          thumbnail1Preview={thumbnail1Preview}
          thumbnail2Preview={thumbnail2Preview}
          displayPurchasePrice={displayPurchasePrice}
          handlePurchasePriceChange={handlePurchasePriceChange}
          displaySellingPrice={displaySellingPrice}
          handleSellingPriceChange={handleSellingPriceChange}
          margin={margin}
          isEdit={true}
        />
      </div>
    </div>
  )
}

export default EditProductPage