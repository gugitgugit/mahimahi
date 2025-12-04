import api from '../api'

/**
 * (관리자) 새 상품을 추가하는 API
 * @param {object} productData - 추가할 상품의 데이터
 * @returns {Promise<object>} 생성된 상품의 정보를 반환
 */
export const createProduct = (productData) =>
  api.post(`admin/products`, productData)

/**
 * (관리자) 특정 상품을 삭제하는 API
 * @param {string} productId - 삭제할 상품의 ID
 * @returns {Promise<object>} 삭제 성공 관련 메시지를 포함한 객체
 */
export const deleteProduct = (productId) =>
  api.delete(`/admin/products/${productId}`)

/**
 * (관리자) 모든 상품 목록을 필터링 및 페이지네이션하여 가져오는 API
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [limit=10] - 한 페이지에 보여줄 상품 수
 * @param {string} [category='all'] - 필터링할 카테고리
 * @param {string} [searchTerm=''] - 검색어
 * @returns {Promise<object>} 상품 목록과 페이지네이션 정보를 포함한 객체
 */
export const getAllProducts = (
  page = 1,
  limit = 10,
  category = 'all',
  searchTerm = '',
) =>
  api.get('/admin/products/all', {
    params: { page, limit, category, searchTerm },
  })

/**
 * (관리자) ID로 특정 상품의 상세 정보를 가져오는 API
 * @param {string} productId - 조회할 상품의 ID
 * @returns {Promise<object>} 상품 상세 정보를 포함한 객체
 */
export const getProductByIdAdmin = (productId) =>
  api.get(`/admin/products/${productId}`)

/**
 * (관리자) 특정 상품의 정보를 수정하는 API
 * @param {string} productId - 수정할 상품의 ID
 * @param {object} productData - 수정할 상품의 데이터
 * @returns {Promise<object>} 업데이트된 상품 정보를 포함한 객체
 */
export const updateProduct = (productId, productData) =>
  api.put(`/admin/products/${productId}`, productData)

/**
 * (관리자) 상품 이미지를 서버에 업로드하는 API
 * @param {File[]} images - 업로드할 이미지 파일의 배열
 * @returns {Promise<object>} 업로드된 이미지의 URL 배열을 포함한 객체
 */
export const uploadImages = (images) => {
  const formData = new FormData()
  images.forEach((image) => {
    formData.append('images', image)
  })

  return api.post('admin/products/upload-images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
