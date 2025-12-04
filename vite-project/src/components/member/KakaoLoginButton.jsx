/**카카오 로그인 버튼 */
const KakaoLoginButton = () => {
  const kakaoSignInUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`

  return (
    <a
      href={kakaoSignInUrl}
      className="flex w-full justify-center rounded-md bg-[#FEE500] px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400"
    >
      카카오로 로그인
    </a>
  )
}

export default KakaoLoginButton
