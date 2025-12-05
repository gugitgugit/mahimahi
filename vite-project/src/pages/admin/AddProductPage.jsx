import { useAddProduct } from '@/hooks/admin/useAddProduct'
import ProductForm from '@/components/admin/ProductForm'

/**
 * 관리자가 새로운 상품을 추가하는 페이지 컴포넌트.
 * `useAddProduct` 훅을 사용하여 상품 추가 로직을 처리하고,
 * `ProductForm` 컴포넌트를 렌더링하여 사용자 입력을 받습니다.
 * @returns {JSX.Element} 새 상품 추가 페이지 엘리먼트
 */
const AddProductPage = () => {
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
    handlePriceChange,
    setDisplayPurchasePrice,
    setDisplaySellingPrice,
  } = useAddProduct()

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-3xl font-extrabold text-gray-900">
          새 상품 추가
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
          handlePurchasePriceChange={(e, fieldOnChange) =>
            handlePriceChange(e, fieldOnChange, setDisplayPurchasePrice)
          }
          displaySellingPrice={displaySellingPrice}
          handleSellingPriceChange={(e, fieldOnChange) =>
            handlePriceChange(e, fieldOnChange, setDisplaySellingPrice)
          }
          margin={margin}
        />
      </div>
    </div>
  )
}

export default AddProductPage
