import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

const OrderConfirmationItem = ({ item }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <li ref={ref} className="flex items-center py-4">
      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200">
        {isIntersecting && (
          <img
            src={item.thumbnail1 || item.thumbnailUrl}
            alt={item.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full rounded-md object-cover transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="ml-4 flex-1">
        <p className="font-medium text-gray-900">{item.name}</p>
        <p className="text-sm text-gray-500">{item.brand}</p>
        <p className="text-sm text-gray-500">수량: {item.quantity}</p>
      </div>
      <p className="font-medium text-gray-900">
        {(item.price * item.quantity).toLocaleString()}원
      </p>
    </li>
  )
}

export default OrderConfirmationItem
