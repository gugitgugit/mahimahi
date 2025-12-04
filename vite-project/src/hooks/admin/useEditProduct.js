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
  const [selectedThumbnail, setSelectedThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

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

        setThumbnailPreview(product.thumbnailUrl)
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

  const handleThumbnailChange = useCallback((event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedThumbnail(file)
      setThumbnailPreview(URL.createObjectURL(file))
    } else {
      setSelectedThumbnail(null)
      setThumbnailPreview('')
    }
  }, [])

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true)
      try {
        let thumbnailUrl = thumbnailPreview
        if (selectedThumbnail) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail,
          ])
          thumbnailUrl = thumbnailUploadResponse.imageUrls[0]
        }

        let imageUrls = imagePreviews
        if (selectedFiles.length > 0) {
          const uploadResponse = await uploadImages(selectedFiles)
          imageUrls = uploadResponse.imageUrls
        }

        const response = await updateProduct(productId, {
          ...data,
          thumbnailUrl,
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
      thumbnailPreview,
      selectedThumbnail,
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
    thumbnailPreview,
    displayPurchasePrice,
    displaySellingPrice,
    margin,
    onSubmit,
    handleFileChange,
    handleThumbnailChange,
    handlePurchasePriceChange,
    handleSellingPriceChange,
  }
}
