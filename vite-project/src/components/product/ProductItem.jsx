import { Link } from 'react-router-dom'
import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

/**상품 카드 */
const ProductItem = ({ product }) => {
  const isSoldOut = product.stock === 0
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <Link
      to={`/product/detail/${product._id}`}
      className={`group relative ${isSoldOut ? 'opacity-50' : ''}`}
    >
      <div
        ref={ref}
        className="aspect-w-1 aspect-h-1 lg:aspect-none min-h-80 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80"
      >
        {isIntersecting && (
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full rounded-md object-cover object-center transition-opacity duration-500 lg:h-full lg:w-full ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
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
