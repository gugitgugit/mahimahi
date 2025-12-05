import { Controller } from 'react-hook-form'

const ProductForm = ({
  handleSubmit,
  onSubmit,
  register,
  control,
  errors,
  loading,
  handleFileChange,
  imagePreviews,
  handleThumbnailChange,
  thumbnailPreview,
  displayPurchasePrice,
  handlePurchasePriceChange,
  displaySellingPrice,
  handleSellingPriceChange,
  margin,
  isEdit = false,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              기본 정보
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  상품 이름
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', {
                    required: '상품 이름을 입력해주세요.',
                  })}
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  상품 설명
                </label>
                <textarea
                  id="description"
                  {...register('description', {
                    required: '상품 설명을 입력해주세요.',
                  })}
                  rows="3"
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                ></textarea>
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              가격 및 재고
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="purchasePrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  매입가
                </label>
                <Controller
                  name="purchasePrice"
                  control={control}
                  rules={{ required: '매입가를 입력해주세요.' }}
                  render={({ field }) => (
                    <input
                      id="purchasePrice"
                      type="text"
                      value={displayPurchasePrice}
                      onChange={(e) =>
                        handlePurchasePriceChange(e, field.onChange)
                      }
                      className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                    />
                  )}
                />
                {errors.purchasePrice && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.purchasePrice.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="sellingPrice"
                  className="block text-sm font-medium text-gray-700"
                >
                  판매가
                </label>
                <Controller
                  name="sellingPrice"
                  control={control}
                  rules={{ required: '판매가를 입력해주세요.' }}
                  render={({ field }) => (
                    <input
                      id="sellingPrice"
                      type="text"
                      value={displaySellingPrice}
                      onChange={(e) =>
                        handleSellingPriceChange(e, field.onChange)
                      }
                      className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                    />
                  )}
                />
                {errors.sellingPrice && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.sellingPrice.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="margin"
                  className="block text-sm font-medium text-gray-700"
                >
                  마진율
                </label>
                <input
                  id="margin"
                  type="text"
                  value={margin}
                  readOnly
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border-gray-200 bg-gray-100 px-3 py-2 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700"
                >
                  재고
                </label>
                <input
                  id="stock"
                  type="number"
                  {...register('stock', {
                    required: '재고를 입력해주세요.',
                    valueAsNumber: true,
                  })}
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.stock && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              분류
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  카테고리
                </label>
                <select
                  id="category"
                  {...register('category', {
                    required: '카테고리를 선택해주세요.',
                  })}
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                >
                  <option value="">카테고리 선택</option>
                  <option value="new-in">NEW IN</option>
                  <option value="outer">OUTER</option>
                  <option value="top">TOP</option>
                  <option value="bottom">BOTTOM</option>
                  <option value="acc">ACC</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700"
                >
                  브랜드
                </label>
                <input
                  id="brand"
                  type="text"
                  {...register('brand', {
                    required: '브랜드를 입력해주세요.',
                  })}
                  className="focus:ring-opacity-50 mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
                />
                {errors.brand && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.brand.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6 lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              이미지
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700"
                >
                  썸네일 이미지 (1장)
                </label>
                <input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800"
                />
                {thumbnailPreview && (
                  <div className="mt-2">
                    <img
                      src={thumbnailPreview}
                      alt="썸네일 미리보기"
                      className="h-24 w-24 rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  상품 이미지 (여러 장 선택 가능)
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800"
                />
                {imagePreviews.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imagePreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`미리보기 ${index + 1}`}
                        className="h-24 w-24 rounded-md object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none disabled:opacity-50"
            >
              {loading
                ? isEdit
                  ? '상품 수정 중...'
                  : '상품 추가 중...'
                : isEdit
                  ? '상품 수정'
                  : '상품 추가'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProductForm
