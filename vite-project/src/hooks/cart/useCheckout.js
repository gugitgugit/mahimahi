import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import { createOrder } from '@/apis/order'
import { getAddresses, addAddress } from '@/apis/member'

export function useCheckout() {
  const { user, fetchCartItems, fetchUser } = useAuth()
  const [recipientName, setRecipientName] = useState('')
  const [phone, setPhone] = useState('')
  const [postcode, setPostcode] = useState('')
  const [address, setAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [deliveryMemo, setDeliveryMemo] = useState('')
  const [memoOption, setMemoOption] = useState('')
  const [saveAddress, setSaveAddress] = useState(false)

  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('new')

  const detailAddressRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const deliveryOptions = [
    '부재 시 경비실에 맡겨주세요.',
    '부재 시 문 앞에 놓아주세요.',
    '배송 전 연락주세요.',
    '직접 입력',
  ]

  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const savedAddresses = await getAddresses()
        const sortedAddresses = savedAddresses.sort(
          (a, b) => b.isDefault - a.isDefault,
        )
        setAddresses(sortedAddresses)
        const defaultAddress = sortedAddresses.find((addr) => addr.isDefault)
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id)
          setPostcode(defaultAddress.postcode)
          setAddress(defaultAddress.address)
          setDetailAddress(defaultAddress.detailAddress)
        }
      } catch (error) {
        console.error('배송지 목록을 불러오는 데 실패했습니다.', error)
      }
    }

    if (user) {
      setRecipientName(user.name || '')
      setPhone(user.phone || '')
      fetchAddresses()
    }
  }, [user])

  useEffect(() => {
    if (cartItems.length === 0) {
      alert('주문할 상품이 없습니다. 장바구니로 돌아갑니다.')
      navigate('/member/cart')
    }
  }, [cartItems, navigate])

  const handleAddressSelect = useCallback(
    (e) => {
      const { value } = e.target
      setSelectedAddressId(value)
      if (value === 'new') {
        setPostcode('')
        setAddress('')
        setDetailAddress('')
      } else {
        const selected = addresses.find((addr) => addr._id === value)
        if (selected) {
          setPostcode(selected.postcode)
          setAddress(selected.address)
          setDetailAddress(selected.detailAddress)
        }
      }
    },
    [addresses],
  )

  const handleAddressSearch = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostcode(data.zonecode)
        setAddress(data.roadAddress)
        detailAddressRef.current.focus()
      },
    }).open()
  }, [])

  const handleMemoChange = useCallback((e) => {
    const { value } = e.target
    setMemoOption(value)
    if (value !== '직접 입력') {
      setDeliveryMemo(value)
    } else {
      setDeliveryMemo('')
    }
  }, [])

  const handleOrder = useCallback(async () => {
    if (!recipientName || !phone || !postcode || !address) {
      alert('배송지 정보를 모두 입력해주세요.')
      return
    }
    if (!window.confirm('주문을 확정하시겠습니까?')) return

    try {
      if (selectedAddressId === 'new' && saveAddress) {
        await addAddress({
          alias: address,
          postcode,
          address,
          detailAddress,
          isDefault: false,
        })
        await fetchUser()
      }

      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.sellingPrice,
          brand: item.product.brand,
          thumbnail1: item.product.thumbnail1,
          quantity: item.quantity,
        })),
        totalPrice: totalPrice,
        recipient: {
          name: recipientName,
          phone: phone,
        },
        shippingAddress: {
          postcode: postcode,
          address: address,
          detailAddress: detailAddress,
          deliveryMemo: deliveryMemo,
        },
      }

      const orderResponse = await createOrder(orderData)
      await fetchCartItems()
      alert('주문이 완료되었습니다.')
      navigate(`/member/order-confirmation/${orderResponse.orderId}`)
    } catch (error) {
      console.error('주문 처리 중 오류가 발생했습니다:', error)
      alert('주문 처리 중 오류가 발생했습니다.')
    }
  }, [
    recipientName,
    phone,
    postcode,
    address,
    selectedAddressId,
    saveAddress,
    detailAddress,
    fetchUser,
    cartItems,
    totalPrice,
    deliveryMemo,
    fetchCartItems,
    navigate,
  ])

  return {
    user,
    recipientName,
    setRecipientName,
    phone,
    setPhone,
    postcode,
    setPostcode,
    address,
    setAddress,
    detailAddress,
    setDetailAddress,
    deliveryMemo,
    setDeliveryMemo,
    memoOption,
    saveAddress,
    setSaveAddress,
    addresses,
    selectedAddressId,
    detailAddressRef,
    deliveryOptions,
    cartItems,
    totalPrice,
    handleAddressSelect,
    handleAddressSearch,
    handleMemoChange,
    handleOrder,
  }
}
