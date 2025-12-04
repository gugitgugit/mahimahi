import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import LoadingSpinner from './LoadingSpinner'

/**어드민 권한 확인 */
const AdminRoute = () => {
  const { isAuthenticated, isLoading, user } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/member/sign-in" replace />
  }

  return <Outlet />
}

export default AdminRoute
