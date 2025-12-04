import { Link } from 'react-router-dom'

/**
 * 404 Not Found 페이지 컴포넌트.
 * 사용자가 존재하지 않는 경로로 접근했을 때 표시됩니다.
 * @returns {JSX.Element} 404 페이지 엘리먼트
 */
const NotFound = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
      <p className="mt-2 text-gray-500">
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <div className="mt-6">
        <Link to="/" className="font-semibold text-black hover:text-gray-700">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default NotFound
