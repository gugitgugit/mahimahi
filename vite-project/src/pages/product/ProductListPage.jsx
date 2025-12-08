import { useProductList } from '@/hooks/product/useProductList'
import ProductList from '@/components/product/ProductList'

/**
 * 상품 목록 페이지 컴포넌트.
 * `useProductList` 훅을 사용하여 상품 목록 데이터 및 관련 로직을 처리하고,
 * `ProductList` 컴포넌트를 렌더링하여 사용자에게 상품 목록을 보여줍니다.
 * @returns {JSX.Element} 상품 목록 페이지 엘리먼트
 */
const ProductListPage = () => {
  const {
    category,
    products,
    loading,
    currentPage,
    totalPages,
    sort,
    sortOptions,
    searchTerm,
    subcategory,
    handleLoadMore,
    handleSearchTermChange,
    handleSortChange,
    handleSubcategoryChange,
  } = useProductList()

  return (
    <ProductList
      category={category}
      products={products}
      loading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
      sort={sort}
      sortOptions={sortOptions}
      searchTerm={searchTerm}
      subcategory={subcategory}
      handleLoadMore={handleLoadMore}
      handleSearchTermChange={handleSearchTermChange}
      handleSortChange={handleSortChange}
      handleSubcategoryChange={handleSubcategoryChange}
    />
  )
}

export default ProductListPage
