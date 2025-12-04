const ProfileSection = ({ user, isEditing, formData, handleInputChange, handleSave, handleCancel, handleSetIsEditing, onOpenModal }) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold text-gray-800 sm:text-2xl">내 정보</h2>
        <div>
          {!isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => handleSetIsEditing(true)}
                className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                정보 수정
              </button>
              <button
                onClick={onOpenModal}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300"
              >
                비밀번호 변경
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-300"
              >
                취소
              </button>
            </div>
          )}
        </div>
      </div>
      <dl className="mt-6 divide-y divide-gray-200">
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">아이디</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {user?.username}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">이름</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
              />
            ) : (
              formData.name
            )}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">전화번호</dt>
          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full max-w-lg rounded-md border border-gray-300 px-3 py-2 focus:border-black focus:ring-black sm:text-sm"
              />
            ) : (
              formData.phone
            )}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default ProfileSection