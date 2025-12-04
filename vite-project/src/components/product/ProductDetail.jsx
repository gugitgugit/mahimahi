import { ArrowUpIcon } from '@heroicons/react/20/solid'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const ProductDetail = ({
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
}) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>
  }

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.thumbnailUrl}
                alt={product.name}
                className={`h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out ${
                  isThumbnailLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setIsThumbnailLoaded(true)}
              />
            </div>

            <div className="mt-10 flex flex-col justify-between lg:mt-0">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  {product.brand}
                </h3>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {product.sellingPrice.toLocaleString()}원
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div
                    className="space-y-6 text-base text-gray-900"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              </div>

              <form ref={buttonContainerRef} className="mt-6">
                <div className="mt-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    수량 (최대: {product.stock})
                  </label>
                  <div
                    className="relative mt-1 flex items-center rounded-md border border-gray-300"
                    style={{ width: 'fit-content' }}
                  >
                    <button
                      type="button"
                      onClick={decrementQuantity}
                      className="relative rounded-l-md border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      readOnly
                      className="w-12 border-r border-l border-gray-300 text-center focus:ring-0 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={incrementQuantity}
                      className="relative rounded-r-md border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-10 flex space-x-4">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium whitespace-nowrap text-white hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none sm:w-full"
                  >
                    장바구니에 담기
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-black bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none sm:w-full"
                  >
                    바로 구매
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              상세 정보
            </h3>
            <div
              className={`relative mt-8 ${
                !showAllImages ? 'max-h-[800px] overflow-hidden' : ''
              }`}
            >
              <div className="flex flex-col space-y-8">
                {product.imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg bg-gray-200"
                  >
                    <img
                      src={image}
                      alt={`${product.name} - image ${index + 1}`}
                      className={`h-full w-full object-cover object-center transition-opacity duration-500 ease-in-out ${
                        loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                ))}
              </div>
              {!showAllImages && product.imageUrls.length > 1 && (
                <div className="pointer-events-none absolute bottom-0 h-40 w-full bg-gradient-to-t from-white" />
              )}
            </div>
            {!showAllImages &&
              product.imageUrls.length > 1 &&
              loadedImages.has(0) && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="rounded-md border border-black bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
                  >
                    더 보기
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed right-10 bottom-28 z-50 rounded-full bg-black p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-800 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      )}

      {showStickyButtons && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white shadow-lg">
          <div className="flex">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-none border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 focus:outline-none"
            >
              장바구니에 담기
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex flex-1 cursor-pointer items-center justify-center rounded-none border-t border-black bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-100 focus:outline-none"
            >
              바로 구매
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
