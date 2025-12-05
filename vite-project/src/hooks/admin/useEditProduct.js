import { useState, useEffect, useCallback } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getProductByIdAdmin,
  updateProduct,
  uploadImages,
} from '@/apis/admin/products'

export function useEditProduct() {
  const navigate = useNavigate()
  const { productId } = useParams()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [selectedThumbnail1, setSelectedThumbnail1] = useState(null)
  const [thumbnail1Preview, setThumbnail1Preview] = useState('')
  const [selectedThumbnail2, setSelectedThumbnail2] = useState(null)
  const [thumbnail2Preview, setThumbnail2Preview] = useState('')

  const [displayPurchasePrice, setDisplayPurchasePrice] = useState('')
  const [displaySellingPrice, setDisplaySellingPrice] = useState('')
  const [margin, setMargin] = useState('')

  const purchasePrice = useWatch({ control, name: 'purchasePrice' })
  const sellingPrice = useWatch({ control, name: 'sellingPrice' })

  const formatNumberWithCommas = useCallback((num) => {
    if (num === null || num === undefined) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductByIdAdmin(productId)
        setValue('name', product.name)
        setValue('description', product.description)
        setValue('category', product.category)
        setValue('stock', product.stock)
        setValue('brand', product.brand)
        setValue('purchasePrice', product.purchasePrice)
        setValue('sellingPrice', product.sellingPrice)

        setThumbnail1Preview(product.thumbnail1 || '')
        setThumbnail2Preview(product.thumbnail2 || '')
        setImagePreviews(product.imageUrls)

        setDisplayPurchasePrice(formatNumberWithCommas(product.purchasePrice))
        setDisplaySellingPrice(formatNumberWithCommas(product.sellingPrice))
      } catch (err) {
        console.error(err)
        alert('상품 정보를 불러오는 데 실패했습니다.')
      }
    }
    fetchProduct()
  }, [productId, setValue, formatNumberWithCommas])

  useEffect(() => {
    if (
      typeof purchasePrice === 'number' &&
      typeof sellingPrice === 'number' &&
      purchasePrice > 0
    ) {
      const marginValue = ((sellingPrice - purchasePrice) / purchasePrice) * 100
      setMargin(marginValue.toFixed(2) + '%')
    } else {
      setMargin('')
    }
  }, [purchasePrice, sellingPrice])

  const handlePurchasePriceChange = useCallback((event, fieldOnChange) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '')
    const numericValue = rawValue ? Number(rawValue) : null
    fieldOnChange(numericValue)
    setDisplayPurchasePrice(formatNumberWithCommas(numericValue))
  }, [formatNumberWithCommas])

  const handleSellingPriceChange = useCallback((event, fieldOnChange) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '')
    const numericValue = rawValue ? Number(rawValue) : null
    fieldOnChange(numericValue)
    setDisplaySellingPrice(formatNumberWithCommas(numericValue))
  }, [formatNumberWithCommas])

  const handleFileChange = useCallback((event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews(previews)
  }, [])

  const handleThumbnail1Change = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedThumbnail1(file)
      setThumbnail1Preview(URL.createObjectURL(file))
    } else {
      setSelectedThumbnail1(null)
      setThumbnail1Preview('')
    }
  }, [])

  const handleThumbnail2Change = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedThumbnail2(file)
      setThumbnail2Preview(URL.createObjectURL(file))
    } else {
      setSelectedThumbnail2(null)
      setThumbnail2Preview('')
    }
  }, [])

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        let thumbnail1 = thumbnail1Preview
        if (selectedThumbnail1) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail1,
          ])
          thumbnail1 = thumbnailUploadResponse.imageUrls[0]
        }

        let thumbnail2 = thumbnail2Preview
        if (selectedThumbnail2) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail2,
          ])
          thumbnail2 = thumbnailUploadResponse.imageUrls[0]
        }

        let imageUrls = imagePreviews
        if (selectedFiles.length > 0) {
          const uploadResponse = await uploadImages(selectedFiles)
          imageUrls = uploadResponse.imageUrls
        }

        const response = await updateProduct(productId, {
          ...data,
          thumbnail1,
          thumbnail2,
          imageUrls,
        })
        alert(response.message)
        navigate('/admin/dashboard')
      } catch (err) {
        console.error(err)
        alert(err.message)
      } finally {
        setLoading(false)
      }
    },
    [
      thumbnail1Preview,
      selectedThumbnail1,
      thumbnail2Preview,
      selectedThumbnail2,
      imagePreviews,
      selectedFiles,
      productId,
      navigate,
    ],
  )

  return {
    register,
    handleSubmit,
    control,
    errors,
    loading,
    imagePreviews,
    thumbnail1Preview,
    thumbnail2Preview,
    displayPurchasePrice,
    displaySellingPrice,
    margin,
    onSubmit,
    handleFileChange,
    handleThumbnail1Change,
    handleThumbnail2Change,
    handlePurchasePriceChange,
    handleSellingPriceChange,
  }
}
