import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

const CheckoutItem = ({ item }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <li ref={ref} className="flex items-center py-3">
      <div className="h-24 w-24 flex-shrink-0 rounded-md bg-gray-200">
        {isIntersecting && (
          <img
              src={item.product.thumbnail1}
            alt={item.product.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full rounded-md object-cover transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="ml-6 flex-1">
        <p className="text-sm font-medium text-gray-500">{item.product.brand}</p>
        <p className="font-medium text-gray-900">{item.product.name}</p>
        <p className="text-sm text-gray-500">{item.quantity}개</p>
      </div>
      <p className="font-medium text-gray-900">
        {(item.product.sellingPrice * item.quantity).toLocaleString()}원
      </p>
    </li>
  )
}

export default CheckoutItem
