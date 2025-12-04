import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createProduct, uploadImages } from '@/apis/admin/products'

export function useAddProduct() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [selectedThumbnail, setSelectedThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')
  const [displayPurchasePrice, setDisplayPurchasePrice] = useState('')
  const [displaySellingPrice, setDisplaySellingPrice] = useState('')
  const [margin, setMargin] = useState('0.00%')

  const purchasePrice = watch('purchasePrice')
  const sellingPrice = watch('sellingPrice')

  useEffect(() => {
    if (purchasePrice && sellingPrice) {
      const marginValue = ((sellingPrice - purchasePrice) / purchasePrice) * 100
      setMargin(marginValue.toFixed(2) + '%')
    } else {
      setMargin('0.00%')
    }
  }, [purchasePrice, sellingPrice])

  const formatNumberWithCommas = (num) => {
    if (num === null || num === undefined) return ''
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handlePriceChange = useCallback((event, fieldOnChange, setDisplay) => {
    const rawValue = event.target.value.replace(/[^0-9]/g, '')
    const numericValue = rawValue ? Number(rawValue) : null
    fieldOnChange(numericValue)
    setDisplay(formatNumberWithCommas(numericValue))
  }, [])

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
        let thumbnailUrl = ''
        if (selectedThumbnail) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail,
          ])
          thumbnailUrl = thumbnailUploadResponse.imageUrls[0]
        }

        let imageUrls = []
        if (selectedFiles.length > 0) {
          const uploadResponse = await uploadImages(selectedFiles)
          imageUrls = uploadResponse.imageUrls
        }

        const response = await createProduct({
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
    [navigate, selectedFiles, selectedThumbnail],
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
    handlePriceChange,
    setDisplayPurchasePrice,
    setDisplaySellingPrice,
  }
}
