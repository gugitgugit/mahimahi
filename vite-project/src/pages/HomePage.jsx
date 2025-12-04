import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '@/apis/product'
import ProductItem from '@/components/product/ProductItem'
import LoadingSpinner from '@/components/common/LoadingSpinner'

/**
 * 애플리케이션의 메인 홈 페이지 컴포넌트.
 * Hero 섹션, 추천 상품 목록, 브랜드 스토리 등을 포함하여 사이트의 첫인상을 제공합니다.
 * @returns {JSX.Element} 홈 페이지 엘리먼트
 */
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await getProducts(1, 4)
        setFeaturedProducts(response.products)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="bg-white">
      {loading && <LoadingSpinner />}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Vintage clothing"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            slowsoyo.vintage
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xl text-gray-300">
            잔잔히 떠도는 시간들, 느슨한 여백, 낡았지만 살아있는 것들
          </p>
          <div className="mt-10">
            <Link
              to="/product/all"
              className="inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/product/all"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {featuredProducts.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-6 sm:hidden">
          <Link
            to="/product/all"
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Our Story
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              저희는 단순히 옷을 판매하는 것이 아니라, 시간의 흐름 속에서
              자신만의 이야기를 간직한 빈티지 아이템들을 선보입니다. '느슨한
              여백'과 '낡았지만 살아있는 것들'이라는 가치를 통해, 여러분의
              일상에 특별한 순간을 더하고자 합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
