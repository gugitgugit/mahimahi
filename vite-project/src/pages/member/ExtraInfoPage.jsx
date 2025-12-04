import { useExtraInfo } from '@/hooks/member/useExtraInfo'
import ExtraInfoForm from '@/components/member/ExtraInfoForm'

/**
 * 소셜 로그인 후 추가 정보 입력을 위한 페이지 컴포넌트.
 * `useExtraInfo` 훅을 사용하여 로직을 처리하고,
 * `ExtraInfoForm` 컴포넌트를 렌더링하여 사용자 입력을 받습니다.
 * @returns {JSX.Element} 추가 정보 입력 페이지 엘리먼트
 */
const ExtraInfoPage = () => {
  const { loading, register, handleSubmit, errors, onSubmit } = useExtraInfo()

  return (
    <ExtraInfoForm
      loading={loading}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  )
}

export default ExtraInfoPage
