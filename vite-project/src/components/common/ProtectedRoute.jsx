import { Navigate, Outlet } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import useAuth from '@/hooks/useAuth'

/**로그인 여부 확인 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
