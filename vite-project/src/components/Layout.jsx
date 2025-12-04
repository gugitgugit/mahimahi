import { Outlet } from 'react-router-dom'
import NavigationBar from './common/NavigationBar'

/**레이아웃 */
const Layout = () => {
  return (
    <div className="flex h-full flex-col">
      <NavigationBar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
