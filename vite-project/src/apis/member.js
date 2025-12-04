import api from './api'

/**
 * 새 배송지를 추가하는 API
 * @param {object} addressData - 추가할 배송지 정보
 * @returns {Promise<object>} 추가된 배송지 정보를 포함한 객체
 */
export const addAddress = (addressData) =>
  api.post('/member/addresses', addressData)

/**
 * 사용자 비밀번호를 변경하는 API
 * @param {object} passwords - 현재 비밀번호와 새 비밀번호를 포함한 객체
 * @param {string} passwords.currentPassword - 현재 비밀번호
 * @param {string} passwords.newPassword - 새 비밀번호
 * @returns {Promise<object>} 성공 메시지를 포함한 객체
 */
export const changePassword = (passwords) =>
  api.post('/member/change-password', passwords)

/**
 * 회원가입 시 사용자 아이디 중복을 검사하는 API
 * @param {object} body - 중복 검사할 아이디를 포함한 객체
 * @param {string} body.username - 중복 검사할 사용자 아이디
 * @returns {Promise<object>} 중복 검사 결과 메시지를 포함한 객체
 */
export const checkId = (body) => api.post(`member/check-id`, body)

/**
 * 특정 배송지를 삭제하는 API
 * @param {string} id - 삭제할 배송지의 ID
 * @returns {Promise<object>} 삭제 성공 메시지를 포함한 객체
 */
export const deleteAddress = (id) => api.delete(`/member/addresses/${id}`)

/**
 * 현재 사용자의 모든 배송지 목록을 가져오는 API
 * @returns {Promise<object[]>} 배송지 목록 배열
 */
export const getAddresses = () => api.get('/member/addresses')

/**
 * 현재 로그인된 사용자의 정보를 가져오는 API
 * @returns {Promise<object>} 사용자 정보를 담은 객체
 */
export const getUserInfo = () => api.get(`member/me`)

/**
 * 특정 배송지를 기본 배송지로 설정하는 API
 * @param {string} id - 기본 배송지로 설정할 배송지의 ID
 * @returns {Promise<object>} 업데이트된 배송지 정보를 포함한 객체
 */
export const setDefaultAddress = (id) =>
  api.patch(`/member/addresses/${id}/default`)

/**
 * 사용자 로그인을 처리하는 API
 * @param {object} body - 사용자 로그인 정보(아이디, 비밀번호)
 * @param {string} body.username - 사용자 아이디
 * @param {string} body.password - 비밀번호
 * @returns {Promise<object>} 로그인 성공 시 사용자 정보 및 토큰을 포함한 객체
 */
export const signIn = (body) => api.post(`member/sign-in`, body)

/**
 * 신규 사용자 회원가입을 처리하는 API
 * @param {object} body - 회원가입에 필요한 사용자 정보
 * @returns {Promise<object>} 회원가입 성공 메시지를 포함한 객체
 */
export const signUp = (body) => api.post(`member/sign-up`, body)

/**
 * 소셜 로그인 사용자의 추가 정보 입력을 통한 회원가입을 완료하는 API
 * @param {object} body - 회원가입을 완료하기 위한 추가 정보
 * @returns {Promise<object>} 회원가입 성공 메시지를 포함한 객체
 */
export const socialSignUp = (body) => api.post(`member/complete-signup`, body)

/**
 * 특정 배송지 정보를 수정하는 API
 * @param {string} id - 수정할 배송지의 ID
 * @param {object} addressData - 수정할 배송지 정보
 * @returns {Promise<object>} 업데이트된 배송지 정보를 포함한 객체
 */
export const updateAddress = (id, addressData) =>
  api.put(`/member/addresses/${id}`, addressData)

/**
 * 사용자의 기본 주소 정보를 수정하는 API
 * @param {object} addressData - 수정할 주소 정보 (postcode, address, detailAddress)
 * @returns {Promise<object>} 업데이트된 사용자 정보를 포함한 객체
 */
export const updateUserAddress = (addressData) =>
  api.patch('/member/address', addressData)

/**
 * 사용자 정보(이름, 전화번호)를 수정하는 API
 * @param {{name: string, phone: string}} userInfo - 수정할 사용자 정보
 * @returns {Promise<object>} 업데이트된 사용자 정보를 포함한 객체
 */
export const updateUserInfo = (userInfo) => api.put('/member/me', userInfo)
