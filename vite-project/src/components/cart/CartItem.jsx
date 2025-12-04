import { useState } from 'react'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'

const CartItem = ({ item, handleQuantityChange, handleRemoveItem }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <li ref={ref} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <div className="h-24 w-24 rounded-md bg-gray-200 sm:h-32 sm:w-32">
          {isIntersecting && (
            <img
              src={item.product.thumbnailUrl}
              alt={item.product.name}
              onLoad={() => setIsImageLoaded(true)}
              className={`h-full w-full rounded-md object-cover object-center transition-opacity duration-500 ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <p className="text-sm text-gray-500">{item.product.brand}</p>
            <div className="flex justify-between">
              <h3 className="text-base">
                <a
                  href={`/product/detail/${item.product._id}`}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {item.product.name}
                </a>
              </h3>
            </div>
            <p className="mt-1 text-base font-medium text-gray-900">
              {item.product.sellingPrice.toLocaleString()}원
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <div
              className="relative mt-1 flex items-center rounded-md border border-gray-300"
              style={{ width: 'fit-content' }}
            >
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity - 1)
                }
                className="relative rounded-l-md border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="text"
                value={item.quantity}
                readOnly
                className="w-12 border-r border-l border-gray-300 text-center focus:ring-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  handleQuantityChange(item.product._id, item.quantity + 1)
                }
                className="relative rounded-r-md border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
              >
                +
              </button>
            </div>

            <div className="absolute top-0 right-0">
              <button
                type="button"
                onClick={() => handleRemoveItem(item.product._id)}
                className="-m-2 inline-flex cursor-pointer p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Remove</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
