import axios from 'axios'
import { toApiError } from '../utils/apiError'

/**
 * API 요청을 위한 기본 `axios` 인스턴스.
 * `baseURL`, 기본 헤더, 응답 인터셉터(에러 핸들링)가 설정되어 있습니다.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// API 인터셉터 설정, 자동 예외처리
api.interceptors.response.use(
  (res) => res.data, // 모든 성공 응답에서 .data만 추출하여 반환
  (err) => Promise.reject(toApiError(err)),
)

export default api
