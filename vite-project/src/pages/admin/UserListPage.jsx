import UserList from '@/components/admin/UserList'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { useUserList } from '@/hooks/admin/useUserList'

/**
 * 관리자용 사용자 목록 페이지 컴포넌트.
 * `useUserList` 훅을 사용하여 사용자 목록 데이터 및 관련 로직을 관리하고,
 * `UserList` 컴포넌트를 사용하여 사용자 목록을 화면에 렌더링합니다.
 * @returns {JSX.Element} 사용자 관리 페이지 엘리먼트
 */
const UserListPage = () => {
  const {
    users,
    loading,
    currentPage,
    totalPages,
    searchTerm,
    handlePageChange,
    handleSearchChange,
  } = useUserList()

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="mb-8 text-center">
          <div className="relative inline-flex items-center">
            <UserGroupIcon className="absolute right-full mr-3 h-8 w-8 text-gray-500" />
            <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900">
              사용자 관리
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            전체 사용자 목록을 확인하고 관리합니다.
          </p>
        </div>
        <UserList
          users={users}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          searchTerm={searchTerm}
          onPageChange={handlePageChange}
          onSearchChange={handleSearchChange}
        />
      </div>
    </div>
  )
}

export default UserListPage
