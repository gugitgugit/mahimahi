import { Link } from 'react-router-dom'

/**
 * 애플리케이션의 메인 홈 페이지 컴포넌트.
 * Hero 섹션을 포함하여 사이트의 첫인상을 제공합니다.
 * @returns {JSX.Element} 홈 페이지 엘리먼트
 */
const Home = () => {

  const categories = [
    { name: 'NEW IN', href: '/product/new-in', description: '신상품을 만나보세요' },
    { name: 'OUTER', href: '/product/outer', description: '아우터 컬렉션' },
    { name: 'TOP', href: '/product/top', description: '상의 컬렉션' },
    { name: 'BOTTOM', href: '/product/bottom', description: '하의 컬렉션' },
    { name: 'ACC', href: '/product/acc', description: '액세서리 컬렉션' },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Mahi Mahi
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              빈티지 리바이스를 기반으로 다양한 아메리칸 캐주얼 제품들을 소개합니다
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/product/all"
                className="rounded-md bg-black px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Shop Now
              </Link>
              <Link
                to="/product/new-in"
                className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-700"
              >
                New In <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Grid Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              다양한 카테고리에서 나만의 스타일을 찾아보세요
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group relative overflow-hidden rounded-lg bg-gray-50 p-8 transition-all hover:bg-gray-100 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                  Explore
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Values Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              빈티지 리바이스의 가치
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Mahi Mahi는 시간이 흘러도 변하지 않는 클래식한 스타일과 편안함을 추구합니다.
              각 제품은 세심하게 선별되어 여러분의 일상에 특별한 가치를 더합니다.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">세심한 선별</h3>
              <p className="mt-2 text-sm text-gray-600">
                각 제품은 품질과 스타일을 기준으로 엄선되었습니다
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">클래식한 스타일</h3>
              <p className="mt-2 text-sm text-gray-600">
                시간이 흘러도 변하지 않는 영원한 스타일을 제안합니다
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">일상의 가치</h3>
              <p className="mt-2 text-sm text-gray-600">
                특별한 순간을 만들어내는 일상의 가치를 추구합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
