import { useMyPage } from '@/hooks/member/useMyPage'
import { useProfileSection } from '@/hooks/member/useProfileSection'
import { useOrderHistory } from '@/hooks/member/useOrderHistory'
import { useAddressBook } from '@/hooks/member/useAddressBook'
import ProfileSection from '@/components/member/ProfileSection'
import OrderHistory from '@/components/member/OrderHistory'
import AddressBook from '@/components/member/AddressBook'
import {
  UserCircleIcon,
  ShoppingBagIcon,
  UserIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline'
import ChangePasswordModal from '@/components/member/ChangePasswordModal'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import useAuth from '@/hooks/useAuth'

/**
 * 사용자 마이페이지 컴포넌트.
 * 프로필, 주문 내역, 배송지 관리 탭을 포함하며, 각 탭에 맞는 컨텐츠를 렌더링합니다.
 * 여러 커스텀 훅을 조합하여 각 섹션의 데이터와 로직을 관리합니다.
 * @returns {JSX.Element} 마이페이지 엘리먼트
 */
const MyPage = () => {
  const { user, isLoading } = useAuth()
  const {
    activeTab,
    isModalOpen,
    handleTabClick,
    handleOpenModal,
    handleCloseModal,
  } = useMyPage()

  const profileSectionProps = useProfileSection()
  const orderHistoryProps = useOrderHistory()
  const addressBookProps = useAddressBook()

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ProfileSection
            user={user}
            {...profileSectionProps}
            onOpenModal={handleOpenModal}
          />
        )
      case 'orders':
        return <OrderHistory {...orderHistoryProps} />
      case 'addresses':
        return <AddressBook {...addressBookProps} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <LoadingSpinner />}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:flex lg:space-x-8">
          <aside className="lg:w-1/4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex flex-col items-center">
                <UserCircleIcon className="h-24 w-24 text-gray-300" />
                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500">{user?.username}</p>
              </div>
              <nav className="mt-8 space-y-2">
                <button
                  onClick={() => handleTabClick('profile')}
                  className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'profile'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <UserIcon className="mr-3 h-5 w-5" />
                  프로필
                </button>
                <button
                  onClick={() => handleTabClick('orders')}
                  className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'orders'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ShoppingBagIcon className="mr-3 h-5 w-5" />
                  주문 내역
                </button>
                <button
                  onClick={() => handleTabClick('addresses')}
                  className={`flex w-full cursor-pointer items-center rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'addresses'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BookOpenIcon className="mr-3 h-5 w-5" />
                  배송지 관리
                </button>
              </nav>
            </div>
          </aside>
          <main className="mt-8 lg:mt-0 lg:w-3/4">
            <div className="min-h-[400px] rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      <ChangePasswordModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}

export default MyPage
