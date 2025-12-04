import ProductListAdmin from '@/components/admin/ProductListAdmin'
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import { useProductListAdmin } from '@/hooks/admin/useProductListAdmin'

/**
 * 관리자용 상품 목록 페이지 컴포넌트.
 * `useProductListAdmin` 훅을 통해 상품 목록 데이터 및 관련 로직을 관리하며,
 * `ProductListAdmin` 컴포넌트를 사용하여 상품 목록을 화면에 렌더링합니다.
 * @returns {JSX.Element} 상품 관리 페이지 엘리먼트
 */
const ProductListPageAdmin = () => {
  const {
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
  } = useProductListAdmin()

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
        <div className="mb-8 text-center">
          <div className="relative inline-flex items-center">
            <BuildingStorefrontIcon className="absolute right-full mr-3 h-8 w-8 text-gray-500" />
            <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900">
              상품 관리
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            전체 상품 목록을 확인하고 재고를 관리합니다.
          </p>
        </div>
        <ProductListAdmin
          products={products}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          categories={categories}
          handleDelete={handleDelete}
          handlePageChange={handlePageChange}
          handleCategoryChange={handleCategoryChange}
          handleSearchChange={handleSearchChange}
        />
      </div>
    </div>
  )
}

export default ProductListPageAdmin