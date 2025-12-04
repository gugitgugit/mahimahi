import { useSignUp } from '@/hooks/member/useSignUp'
import SignUpForm from '@/components/member/SignUpForm'

/**
 * 회원가입 페이지 컴포넌트.
 * `useSignUp` 훅을 사용하여 회원가입 관련 로직을 처리하고,
 * `SignUpForm` 컴포넌트를 렌더링하여 사용자 입력을 받습니다.
 * @returns {JSX.Element} 회원가입 페이지 엘리먼트
 */
const SignUpPage = () => {
  const {
    loading,
    idCheckMessage,
    passwordConditions,
    register,
    handleSubmit,
    watch,
    errors,
    handleCheckId,
    onSubmit,
  } = useSignUp()

  return (
    <SignUpForm
      loading={loading}
      idCheckMessage={idCheckMessage}
      passwordConditions={passwordConditions}
      register={register}
      handleSubmit={handleSubmit}
      watch={watch}
      errors={errors}
      handleCheckId={handleCheckId}
      onSubmit={onSubmit}
    />
  )
}

export default SignUpPage
