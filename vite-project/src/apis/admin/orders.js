import api from '../api'

/**
 * (관리자) 모든 주문 목록을 페이지네이션하여 가져오는 API
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [limit=10] - 한 페이지에 보여줄 주문 수
 * @returns {Promise<object>} 주문 목록과 페이지네이션 정보를 포함한 객체
 */
export const getOrders = (page = 1, limit = 10) =>
  api.get('/admin/orders', {
    params: {
      page,
      limit,
    },
  })

/**
 * (관리자) 일자별 주문 통계를 가져오는 API
 * @returns {Promise<object>} 날짜별 주문 수와 금액 정보를 포함한 통계 데이터
 */
export const getOrderStats = () => api.get('/admin/orders/stats')

/**
 * (관리자) 특정 주문의 상태를 변경하는 API
 * @param {string} orderId - 상태를 변경할 주문의 ID
 * @param {string} status - 새로운 주문 상태
 * @returns {Promise<object>} 업데이트된 주문 정보를 포함한 객체
 */
export const updateOrderStatus = (orderId, status) =>
  api.patch(`/admin/orders/${orderId}/status`, { status })
