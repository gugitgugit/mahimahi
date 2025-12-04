import api from './api'

/**
 * 새로운 주문을 생성하는 API
 * @param {object} orderData - 주문 생성을 위한 데이터 (장바구니 항목, 배송지 정보 등)
 * @returns {Promise<object>} 생성된 주문 정보를 포함한 객체
 */
export const createOrder = (orderData) => api.post('/orders', orderData)

/**
 * 현재 로그인된 사용자의 모든 주문 내역을 가져오는 API
 * @returns {Promise<object[]>} 주문 내역 목록 배열
 */
export const getMyOrders = () => api.get('/orders/my-orders')

/**
 * 특정 ID의 주문 상세 정보를 가져오는 API
 * @param {string} orderId - 조회할 주문의 ID
 * @returns {Promise<object>} 주문 상세 정보를 포함한 객체
 */
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`)
