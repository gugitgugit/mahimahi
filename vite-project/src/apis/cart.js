import api from './api'

/**
 * 장바구니에 상품을 추가하는 API
 * @param {object} body - 장바구니에 추가할 상품 정보
 * @param {string} body.productId - 추가할 상품의 ID
 * @param {number} body.quantity - 추가할 수량
 * @returns {Promise<object>} 추가된 후의 장바구니 정보를 포함한 객체
 */
export const addToCart = (body) => api.post('/cart', body)

/**
 * 장바구니에서 특정 상품을 삭제하는 API
 * @param {string} productId - 삭제할 상품의 ID
 * @returns {Promise<object>} 삭제 성공 메시지를 포함한 객체
 */
export const deleteCartItem = (productId) => api.delete(`/cart/${productId}`)

/**
 * 현재 사용자의 장바구니에 담긴 상품 목록을 가져오는 API
 * @returns {Promise<object[]>} 장바구니 상품 목록 배열
 */
export const getCartItems = () => api.get('/cart')

/**
 * 장바구니에 담긴 특정 상품의 수량을 변경하는 API
 * @param {string} productId - 수량을 변경할 상품의 ID
 * @param {number} quantity - 새로운 수량
 * @returns {Promise<object>} 업데이트된 장바구니 정보를 포함한 객체
 */
export const updateCartItemQuantity = (productId, quantity) =>
  api.put(`/cart/${productId}`, { quantity })
