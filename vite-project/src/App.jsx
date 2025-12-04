import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import { Suspense, lazy } from 'react'

import Layout from './components/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'
import AdminRoute from './components/common/AdminRoute'
import LoadingSpinner from './components/common/LoadingSpinner'

const HomePage = lazy(() => import('./pages/HomePage'))
const SignUpPage = lazy(() => import('./pages/member/SignUpPage'))
const SignInPage = lazy(() => import('./pages/member/SignInPage'))
const ExtraInfoPage = lazy(() => import('./pages/member/ExtraInfoPage'))
const ProductListPage = lazy(() => import('./pages/product/ProductListPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const MyPage = lazy(() => import('./pages/member/MyPage'))
const AdminDashboardPage = lazy(
  () => import('./pages/admin/AdminDashboardPage'),
)
const AddProductPage = lazy(() => import('./pages/admin/AddProductPage'))
const EditProductPage = lazy(() => import('./pages/admin/EditProductPage'))
const OrderListPage = lazy(() => import('./pages/admin/OrderListPage'))
const UserListPage = lazy(() => import('./pages/admin/UserListPage'))
const ProductListPageAdmin = lazy(
  () => import('./pages/admin/ProductListPageAdmin'),
)
const ProductDetailPage = lazy(
  () => import('./pages/product/ProductDetailPage'),
)
const CartPage = lazy(() => import('./pages/cart/CartPage'))
const CheckoutPage = lazy(() => import('./pages/cart/CheckoutPage'))
const OrderConfirmationPage = lazy(
  () => import('./pages/order/OrderConfirmationPage'),
)

/**
 * 애플리케이션의 최상위 루트 컴포넌트.
 * React Router를 사용하여 전체 애플리케이션의 라우팅 구조를 정의합니다.
 * `Suspense`와 `lazy`를 통해 페이지 컴포넌트를 코드 스플리팅하여 로딩 성능을 최적화합니다.
 * @returns {JSX.Element} 라우터가 적용된 애플리케이션 엘리먼트
 */
const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />

            {/* 사용자 관련 */}
            <Route path="member" element={<Outlet />}>
              <Route path="sign-in" element={<SignInPage />} />
              <Route path="sign-up" element={<SignUpPage />} />
              <Route path="extra-info" element={<ExtraInfoPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="mypage" element={<MyPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route
                  path="order-confirmation/:orderId"
                  element={<OrderConfirmationPage />}
                />
              </Route>
            </Route>

            {/* 결제 관련 */}
            <Route element={<ProtectedRoute />}>
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>

            {/* 상품 관련 */}
            <Route path="product" element={<Outlet />}>
              <Route path=":category" element={<ProductListPage />} />
              <Route path="detail/:productId" element={<ProductDetailPage />} />
            </Route>

            {/* 관리자 관련 */}
            <Route path="admin" element={<AdminRoute />}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route
                path="edit-product/:productId"
                element={<EditProductPage />}
              />
              <Route path="orders" element={<OrderListPage />} />
              <Route path="users" element={<UserListPage />} />
              <Route path="products" element={<ProductListPageAdmin />} />
            </Route>

            {/* 404 Not Found 라우트 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
