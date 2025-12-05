import { Link } from 'react-router-dom'
import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

/**상품 카드 */
const ProductItem = ({ product }) => {
  const isSoldOut = product.stock === 0
  const [isThumb1Loaded, setIsThumb1Loaded] = useState(false)
  const [isThumb2Loaded, setIsThumb2Loaded] = useState(false)
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  return (
    <Link
      to={`/product/detail/${product._id}`}
      className={`group relative ${isSoldOut ? 'opacity-50' : ''}`}
    >
      <div
        ref={ref}
        className={`aspect-w-1 aspect-h-1 lg:aspect-none relative min-h-96 w-full overflow-hidden rounded-md lg:h-96 transition-opacity duration-300 ${
          isThumb1Loaded ? 'opacity-100 bg-transparent' : 'opacity-0 bg-gray-200'
        }`}
      >
        {isIntersecting && (
          <>
            <img
              src={product.thumbnail1}
              alt={product.name}
              onLoad={() => setIsThumb1Loaded(true)}
              className={`h-full w-full rounded-md object-cover object-center lg:h-full lg:w-full ${
                isThumb1Loaded ? 'opacity-100' : 'opacity-0'
              } ${product.thumbnail2 ? 'group-hover:opacity-0 transition-opacity duration-500' : ''}`}
            />
            {product.thumbnail2 && (
              <img
                src={product.thumbnail2}
                alt={`${product.name} alternate`}
                onLoad={() => setIsThumb2Loaded(true)}
                className={`absolute inset-0 h-full w-full rounded-md object-cover object-center transition-opacity duration-500 lg:h-full lg:w-full ${
                  isThumb2Loaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
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
