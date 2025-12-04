import api from '../api'

/**
 * (관리자) 전체 사용자 목록을 페이지네이션 및 검색하여 가져오는 API
 * @param {number} [page=1] - 조회할 페이지 번호
 * @param {number} [limit=10] - 한 페이지에 보여줄 사용자 수
 * @param {string} [searchTerm=''] - 검색어 (사용자 이름 또는 아이디)
 * @returns {Promise<object>} 사용자 목록과 페이지네이션 정보를 포함한 객체
 */
export const getUsers = (page = 1, limit = 10, searchTerm = '') =>
  api.get('admin/users', {
    params: { page, limit, searchTerm },
  })
