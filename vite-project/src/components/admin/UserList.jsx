import Pagination from '@/components/common/Pagination'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

/** 사용자 목록 UI (Presentational 역할) */
const UserList = ({
  users,
  loading,
  currentPage,
  totalPages,
  searchTerm,
  onPageChange,
  onSearchChange,
}) => {
  return (
    <div className="mt-10">
      <div className="mb-4">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="search"
            placeholder="사용자 아이디, 이름으로 검색"
            value={searchTerm}
            onChange={onSearchChange}
            className="block w-full rounded-md border-gray-300 py-3 pl-10 focus:border-black focus:ring-black sm:text-sm"
          />
        </div>
      </div>
      {users.length === 0 && !loading ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Total Order Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Role
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap text-gray-500">
                      {(user.totalOrderAmount || 0).toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                          user.role === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {user.role || 'user'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserList