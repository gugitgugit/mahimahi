import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

const OrderHistoryItem = ({ item }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <div ref={ref} className="flex items-start sm:items-center">
      <div className="h-16 w-16 flex-shrink-0 rounded-md bg-gray-200">
        {isIntersecting && (
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full rounded-md object-cover transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="ml-4 flex flex-grow flex-col justify-between sm:flex-row">
        <div>
          <p className="text-sm font-semibold text-gray-800 sm:text-base">
            {item.name}
          </p>
          <p className="text-xs text-gray-500 sm:text-sm">{item.brand}</p>
        </div>
        <div className="mt-1 text-left sm:mt-0 sm:text-right">
          <p className="text-sm text-gray-700 sm:text-base">
            {item.price.toLocaleString()}원 x {item.quantity}
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryItem
