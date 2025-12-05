import { Outlet } from 'react-router-dom'
import NavigationBar from './common/NavigationBar'

/**레이아웃 */
const Layout = () => {
  return (
    <div className="flex h-full flex-col lg:flex-row">
      <NavigationBar />
      <main className="flex-grow pt-16 lg:ml-64 lg:pt-0 lg:p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
