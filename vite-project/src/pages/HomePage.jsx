import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo.png'

/**
 * 메인 홈: 로고를 크게 배치하고 클릭 시 ALL 상품으로 이동.
 */
const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <Link
        to="/product/all"
        className="block cursor-pointer text-center select-none"
      >
        <img
          src={logoImg}
          alt="Mahi Mahi"
          className="w-full max-w-5xl object-contain"
        />
      </Link>
    </div>
  )
}

export default Home
