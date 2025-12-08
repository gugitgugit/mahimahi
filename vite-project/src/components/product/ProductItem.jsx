import { Link } from 'react-router-dom'
import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

/**상품 카드 */
const ProductItem = ({ product, index = 0 }) => {
  const isSoldOut = product.stock === 0
  const [isThumb1Loaded, setIsThumb1Loaded] = useState(false)
  const [isThumb2Loaded, setIsThumb2Loaded] = useState(false)
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  // 첫 6개 제품(첫 화면에 보이는 제품들)은 즉시 로드
  const shouldLoadImmediately = index < 6
  const shouldLoad = shouldLoadImmediately || isIntersecting

  return (
    <Link
      to={`/product/detail/${product._id}`}
      className={`group relative ${isSoldOut ? 'opacity-50' : ''}`}
    >
      <div
        ref={ref}
        className="relative aspect-square w-full overflow-hidden rounded-md lg:aspect-[3/4] lg:h-96"
      >
        {/* Placeholder - 항상 표시되어 공간 확보 */}
        <div className="absolute inset-0 bg-gray-200" />

        {shouldLoad && (
          <>
            <img
              src={product.thumbnail1}
              alt={product.name}
              onLoad={() => setIsThumb1Loaded(true)}
              loading={shouldLoadImmediately ? 'eager' : 'lazy'}
              fetchPriority={shouldLoadImmediately ? 'high' : 'auto'}
              className={`absolute inset-0 h-full w-full rounded-md object-cover object-center transition-opacity duration-300 ${
                isThumb1Loaded ? 'opacity-100' : 'opacity-0'
              } ${product.thumbnail2 ? 'group-hover:opacity-0' : ''}`}
            />
            {product.thumbnail2 && (
              <img
                src={product.thumbnail2}
                alt={`${product.name} alternate`}
                onLoad={() => setIsThumb2Loaded(true)}
                loading="lazy"
                className={`absolute inset-0 h-full w-full rounded-md object-cover object-center transition-opacity duration-500 ${
                  isThumb2Loaded
                    ? 'opacity-0 group-hover:opacity-100'
                    : 'opacity-0'
                }`}
              />
            )}
          </>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="flex justify-between">
          <h3 className="text-sm font-bold text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}{' '}
            {isSoldOut && <span className="text-red-500">(sold out)</span>}
          </h3>
          <p className="text-sm font-medium text-gray-900">
            {product.sellingPrice.toLocaleString()}원
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
