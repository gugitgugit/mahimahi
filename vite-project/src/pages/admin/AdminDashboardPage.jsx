import { Link } from 'react-router-dom'
import {
  UserGroupIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'

/**
 * 관리자 대시보드 페이지 컴포넌트.
 * 사용자 관리, 상품 관리, 주문 관리 등 주요 관리 페이지로 이동할 수 있는 메뉴를 제공합니다.
 * @returns {JSX.Element} 관리자 대시보드 페이지 엘리먼트
 */
const AdminDashboard = () => {
  const menuItems = [
    {
      name: '사용자 관리',
      description: '전체 사용자 목록을 확인하고 관리합니다.',
      href: '/admin/users',
      icon: UserGroupIcon,
    },
    {
      name: '상품 관리',
      description: '전체 상품 목록을 확인하고 재고를 관리합니다.',
      href: '/admin/products',
      icon: BuildingStorefrontIcon,
    },
    {
      name: '주문 관리',
      description: '들어온 주문 내역을 확인하고 처리합니다.',
      href: '/admin/orders',
      icon: ShoppingCartIcon,
    },
  ]

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="mb-8 text-center">
          <div className="relative inline-flex items-center">
            <Squares2X2Icon className="absolute right-full mr-3 h-8 w-8 text-gray-500" />
            <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900">
              관리자 대시보드
            </h2>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            사이트의 주요 데이터를 확인하고 관리합니다.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center">
                <item.icon
                  className="h-8 w-8 text-gray-500 transition-all duration-200 group-hover:text-black"
                  aria-hidden="true"
                />
                <h3 className="ml-4 text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
