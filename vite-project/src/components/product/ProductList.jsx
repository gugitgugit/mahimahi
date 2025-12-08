import { Fragment } from 'react'
import ProductItem from '@/components/product/ProductItem'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductList = ({
  category,
  products,
  loading,
  currentPage,
  totalPages,
  sort,
  sortOptions,
  searchTerm,
  subcategory,
  handleLoadMore,
  handleSearchTermChange,
  handleSortChange,
  handleSubcategoryChange,
}) => {
  const subcategoriesByCategory = {
    outer: [
      { value: 'jacket', label: 'JACKET' },
      { value: 'vest', label: 'VEST' },
      { value: 'coat', label: 'COAT' },
    ],
    top: [
      { value: 'half-shirt', label: '1/2 SHIRT' },
      { value: 'shirt', label: 'SHIRT' },
      { value: 'sweat-shirt', label: 'SWEAT SHIRT' },
      { value: 'knit-wear', label: 'KNIT WEAR' },
    ],
    bottom: [
      { value: 'denim', label: 'DENIM' },
      { value: 'shorts', label: 'SHORTS' },
      { value: 'pants', label: 'PANTS' },
    ],
    acc: [
      { value: 'hat', label: 'HAT' },
      { value: 'bag', label: 'BAG' },
      { value: 'shoes', label: 'SHOES' },
      { value: 'etc', label: 'ETC' },
    ],
  }

  const categoryLabels = {
    all: 'ALL',
    'new-in': 'NEW IN',
    outer: 'OUTER',
    top: 'TOP',
    bottom: 'BOTTOM',
    acc: 'ACC',
  }

  const hasSubcategories = ['outer', 'top', 'bottom', 'acc'].includes(category)
  const subcategories = subcategoriesByCategory[category] || []

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between pt-24 pb-6">
            <div className="flex flex-col gap-3">
              {hasSubcategories ? (
                <button
                  onClick={() => handleSubcategoryChange('')}
                  className={`cursor-pointer text-left text-2xl font-bold tracking-tight transition-colors ${
                    subcategory === ''
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ) : (
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {categoryLabels[category] || category.toUpperCase()}
                </h1>
              )}
              {hasSubcategories && (
                <div className="flex gap-2">
                  {subcategories.map((sub) => (
                    <button
                      key={sub.value}
                      onClick={() => handleSubcategoryChange(sub.value)}
                      className={`cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors ${
                        subcategory === sub.value
                          ? 'text-gray-900'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <MagnifyingGlassIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  className="block w-48 rounded-md border-gray-300 py-1.5 pr-2 pl-8 text-sm focus:border-black focus:ring-black"
                />
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {sortOptions.find((o) => o.value === sort)?.name}
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="ring-opacity-5 absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleSortChange(option.value)}
                              className={classNames(
                                option.value === sort
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block w-full px-4 py-2 text-left text-sm',
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <div className="lg:col-span-4">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
                  {products.map((product, index) => (
                    <ProductItem
                      key={product._id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {currentPage < totalPages && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="flex flex-col items-center gap-2 text-base font-medium text-gray-900 transition-colors hover:text-gray-600 disabled:text-gray-400"
                    >
                      <span>{loading ? 'Loading...' : 'Load More'}</span>
                      <ChevronDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ProductList
