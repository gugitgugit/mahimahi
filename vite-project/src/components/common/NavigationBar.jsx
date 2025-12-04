import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

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
    { name: 'All', href: '/product/all' },
    { name: 'Outer', href: '/product/outer' },
    { name: 'Top', href: '/product/top' },
    { name: 'Bottom', href: '/product/bottom' },
    { name: 'Shoes', href: '/product/shoes' },
    { name: 'Accessory', href: '/product/accessory' },
  ]

  return (
    <header className="bg-white shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 text-2xl font-bold text-gray-800"
          >
            逍遥
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {mainNav.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm leading-6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-6">
          {isAuthenticated ? (
            <>
              {user && user.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="text-sm leading-6 font-semibold text-red-500"
                >
                  Admin
                </Link>
              )}
              <Link
                to="/member/mypage"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                <UserCircleIcon className="h-6 w-6" />
              </Link>
              <Link
                to="/member/cart"
                className="relative text-sm leading-6 font-semibold text-gray-900"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={handleSignOut}
                className="cursor-pointer text-sm leading-6 font-semibold text-gray-900"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/member/sign-in"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Sign In
              </Link>
              <Link
                to="/member/sign-up"
                className="text-sm leading-6 font-semibold text-gray-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 z-10" />
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="-m-1.5 p-1.5 text-2xl font-bold text-gray-800"
            >
              逍遥
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {mainNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isAuthenticated ? (
                  <>
                    {user && user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-red-500 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      to="/member/mypage"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Page
                    </Link>
                    <Link
                      to="/member/cart"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Cart {cartItemCount > 0 && `(${cartItemCount})`}
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="-mx-3 block w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/member/sign-in"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/member/sign-up"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 font-semibold text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar
