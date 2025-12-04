import { useSignIn } from '@/hooks/member/useSignIn'
import SignInForm from '@/components/member/SignInForm'

/**
 * 로그인 페이지 컴포넌트.
 * `useSignIn` 훅을 사용하여 로그인 관련 로직을 처리하고,
 * `SignInForm` 컴포넌트를 렌더링하여 사용자 입력을 받습니다.
 * @returns {JSX.Element} 로그인 페이지 엘리먼트
 */
const SignInPage = () => {
  const { loading, register, handleSubmit, errors, onSubmit } = useSignIn()

  return (
    <SignInForm
      loading={loading}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  )
}

export default SignInPage
