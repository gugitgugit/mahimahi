import api from './api'

/**
 * ID로 특정 상품의 상세 정보를 가져오는 API
 * @param {string} productId - 조회할 상품의 ID
 * @returns {Promise<object>} 상품 상세 정보를 포함한 객체
 */
export const getProductById = (productId) => api.get(`/products/${productId}`)

/**
 * 상품 목록을 필터링, 정렬, 페이지네이션하여 가져오는 API
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [limit=20] - 한 페이지에 보여줄 상품 수
 * @param {string} [category] - 필터링할 카테고리
 * @param {string} [sort] - 정렬 기준 (예: 'latest', 'price-asc', 'price-desc')
 * @param {string} [searchTerm] - 검색어
 * @param {string} [brand] - 필터링할 브랜드
 * @param {number} [minPrice] - 최소 가격
 * @param {number} [maxPrice] - 최대 가격
 * @param {string} [subcategory] - 세부 카테고리 (outer의 경우: jacket, vest, coat)
 * @returns {Promise<object>} 상품 목록과 페이지네이션 정보를 포함한 객체
 */
export const getProducts = (
  page = 1,
  limit = 20,
  category,
  sort,
  searchTerm,
  brand,
  minPrice,
  maxPrice,
  subcategory,
) =>
  api.get('/products', {
    params: {
      page,
      limit,
      category,
      sort,
      searchTerm,
      brand,
      minPrice,
      maxPrice,
      subcategory,
    },
  })
