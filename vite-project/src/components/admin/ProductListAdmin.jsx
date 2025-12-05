import { Link } from 'react-router-dom'
import Pagination from '@/components/common/Pagination'
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import useIntersectionObserver from '@/hooks/common/useIntersectionObserver'
import { useState } from 'react'

const StockBadge = ({ stock }) => {
  if (stock === 0) {
    return (
      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
        SOLD OUT
      </span>
    )
  }

  return (
    <span className="text-xs font-medium text-gray-900">{`${stock}EA`}</span>
  )
}

const ProductCardAdmin = ({ product, handleDelete }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 })

  const margin =
    product.sellingPrice && product.purchasePrice
      ? (
          ((product.sellingPrice - product.purchasePrice) /
            product.purchasePrice) *
          100
        ).toFixed(2) + '%'
      : 'N/A'

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow duration-300 hover:shadow-xl">
      <div ref={ref} className="h-64 w-full overflow-hidden bg-gray-200">
        {isIntersecting && (
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            onLoad={() => setIsImageLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs text-gray-500">{product.category}</p>
        <p className="text-sm font-medium text-gray-600">{product.brand}</p>
        <h3 className="text-md truncate font-semibold text-gray-800">
          {product.name}
        </h3>
        <div className="mt-2 space-y-1 text-sm">
          <p className="text-gray-600">
            매입가: {product.purchasePrice?.toLocaleString()}원
          </p>
          <p className="font-bold text-gray-900">
            판매가: {product.sellingPrice?.toLocaleString()}원
          </p>
          <p className="text-blue-600">마진율: {margin}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
        <StockBadge stock={product.stock} />
        <div className="flex space-x-2">
          <Link
            to={`/admin/edit-product/${product._id}`}
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <PencilIcon className="h-5 w-5" />
          </Link>
          <button
            onClick={() => handleDelete(product._id)}
            className="cursor-pointer rounded-full p-2 text-red-500 transition-colors hover:bg-red-100 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const ProductListAdmin = ({
  products,
  loading,
  currentPage,
  totalPages,
  selectedCategory,
  searchTerm,
  categories,
  handleDelete,
  handlePageChange,
  handleCategoryChange,
  handleSearchChange,
}) => {
  return (
    <div className="mt-10 sm:mx-auto sm:w-full">
      <div className="mb-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            placeholder="Search products.."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full rounded-md border-gray-300 py-3 pl-10 focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div className="flex w-full space-x-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => {
            const categoryLabels = {
              'all': 'ALL',
              'new-in': 'NEW IN',
              'outer': 'OUTER',
              'top': 'TOP',
              'bottom': 'BOTTOM',
              'acc': 'ACC',
            }
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex-shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {categoryLabels[category] || category}
              </button>
            )
          })}
        </div>
        <Link
          to="/admin/add-product"
          className="mt-4 flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 sm:mt-0 sm:w-auto"
        >
          <PlusIcon className="mr-2 -ml-1 h-5 w-5" />
          상품 추가
        </Link>
      </div>
      {products.length === 0 && !loading ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            {searchTerm ? '검색 결과가 없습니다.' : '등록된 상품이 없습니다.'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm
              ? '다른 검색어로 다시 시도해주세요.'
              : '선택한 카테고리에 상품이 없습니다.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCardAdmin
                key={product._id}
                product={product}
                handleDelete={handleDelete}
              />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductListAdmin