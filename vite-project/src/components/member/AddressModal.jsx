import { useState, useEffect } from 'react'

const AddressModal = ({ isOpen, onClose, onSave, address }) => {
  const [formData, setFormData] = useState({})

  useEffect(() => {
    setFormData(
      address || {
        alias: '',
        postcode: '',
        address: '',
        detailAddress: '',
        isDefault: false,
      },
    )
  }, [address, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSave = () => {
    onSave(formData)
  }

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData((prev) => ({
          ...prev,
          postcode: data.zonecode,
          address: data.roadAddress,
        }))
      },
    }).open()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-6">
          <h2 className="text-lg font-bold">
            {address ? '배송지 수정' : '새 배송지 추가'}
          </h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              placeholder="배송지 이름 (예: 집, 회사)"
              className="block w-full rounded-md border border-gray-300 p-2"
            />
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder="우편번호"
                className="block w-full rounded-md border border-gray-300 p-2"
              />
              <button
                onClick={handleAddressSearch}
                className="flex-shrink-0 rounded-md bg-gray-200 px-4 py-2"
              >
                검색
              </button>
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="주소"
              className="block w-full rounded-md border border-gray-300 p-2"
            />
            <input
              type="text"
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              placeholder="상세주소"
              className="block w-full rounded-md border border-gray-300 p-2"
            />
            <div className="flex items-center">
              <input
                id="isDefault"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-black accent-black focus:ring-black"
              />
              <label
                htmlFor="isDefault"
                className="ml-2 block text-sm text-gray-900"
              >
                기본 배송지로 설정
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="rounded-md bg-gray-200 px-4 py-2"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressModal
