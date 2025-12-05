import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import logoImg from '@/assets/logo.png'

const NavigationBar = () => {
  const { isAuthenticated, user, signOut, cartItemCount } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (err) {
      console.error(err)
    }
  }

  const mainNav = [
    { name: 'ALL', href: '/product/all' },
    { name: 'NEW IN', href: '/product/new-in' },
    { name: 'OUTER', href: '/product/outer' },
    { name: 'TOP', href: '/product/top' },
    { name: 'BOTTOM', href: '/product/bottom' },
    { name: 'ACC', href: '/product/acc' },
  ]

  return (
    <>
      {/* 데스크톱: 왼쪽 세로 사이드바 */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex h-full flex-col bg-white shadow-lg">
          {/* 로고 */}
          <div className="flex h-16 items-center px-6">
            <Link to="/" className="cursor-pointer">
              <img src={logoImg} alt="mahimahi" className="h-10 w-auto" />
            </Link>
          </div>

          {/* 사용자 메뉴 */}
          <div className="px-4 pb-4">
            <div className="space-y-1">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/member/sign-in"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/member/sign-up"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user && user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block rounded-lg px-4 py-2 text-sm font-semibold text-red-500 hover:bg-gray-100"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/member/mypage"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    My Page
                  </Link>
                  <Link
                    to="/member/cart"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Cart
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 메인 네비게이션 */}
          <nav className="flex-1 space-y-0.5 px-4 py-4" aria-label="Sidebar">
            {mainNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* 모바일/태블릿: 상단 헤더 */}
      <header className="fixed top-0 right-0 left-0 z-40 bg-white shadow-md lg:hidden">
        <nav
          className="mx-auto flex items-center justify-between px-4 py-3"
          aria-label="Global"
        >
          {/* 왼쪽: 사이드바 열기 버튼 */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* 가운데: 로고 */}
          <Link to="/" className="cursor-pointer">
            <img src={logoImg} alt="mahimahi" className="h-8 w-auto" />
          </Link>

          {/* 오른쪽: 사용자 및 카트 (로그인 시만) */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/member/mypage"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100"
                >
                  <UserCircleIcon className="h-6 w-6" />
                </Link>
                <Link
                  to="/member/cart"
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <div className="w-6" />
            )}
          </div>
        </nav>
      </header>

      {/* 모바일 사이드바 오버레이 */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 모바일 사이드바 (왼쪽에서 나오는 모달) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* 사이드바 헤더 */}
          <div className="flex h-16 items-center px-6">
            <Link
              to="/"
              className="cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src={logoImg} alt="mahimahi" className="h-8 w-auto" />
            </Link>
          </div>

          {/* 사용자 메뉴 */}
          <div className="px-4 py-4">
            <div className="space-y-1">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/member/sign-in"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/member/sign-up"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {user && user.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="block rounded-lg px-4 py-2 text-sm font-semibold text-red-500 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/member/mypage"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Page
                  </Link>
                  <Link
                    to="/member/cart"
                    className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>

          {/* 메인 네비게이션 */}
          <nav
            className="flex-1 space-y-0.5 overflow-y-auto px-4 py-4"
            aria-label="Sidebar"
          >
            {mainNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block rounded-lg px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default NavigationBar
