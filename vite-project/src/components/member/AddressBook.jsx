import LoadingSpinner from '@/components/common/LoadingSpinner'
import AddressModal from './AddressModal'

const AddressBook = ({
  addresses,
  loading,
  isModalOpen,
  editingAddress,
  handleOpenModal,
  handleCloseModal,
  handleSaveAddress,
  handleDeleteAddress,
  handleSetDefault,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 sm:text-2xl">
          배송지 관리
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="rounded-md bg-black px-4 py-2 text-sm text-white sm:text-base"
        >
          새 배송지 추가
        </button>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : addresses.length === 0 ? (
        <div className="mt-30 text-center text-gray-500">
          <p>등록된 배송지가 없습니다.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="font-semibold">{address.alias}</p>
                  {address.isDefault && (
                    <span className="ml-2 rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
                      기본 배송지
                    </span>
                  )}
                </div>
                <div className="ml-4 flex flex-shrink-0 space-x-2">
                  <button
                    onClick={() => handleOpenModal(address)}
                    className="text-sm whitespace-nowrap text-gray-500 hover:text-gray-700"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="text-sm whitespace-nowrap text-gray-500 hover:text-gray-700"
                  >
                    삭제
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address._id)}
                      className="text-sm whitespace-nowrap text-gray-500 hover:text-gray-700"
                    >
                      기본으로 설정
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                ({address.postcode}) {address.address} {address.detailAddress}
              </p>
            </div>
          ))}
        </div>
      )}
      <AddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAddress}
        address={editingAddress}
      />
    </div>
  )
}

export default AddressBook