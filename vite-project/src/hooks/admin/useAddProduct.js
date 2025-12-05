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
  const [selectedThumbnail1, setSelectedThumbnail1] = useState(null)
  const [thumbnail1Preview, setThumbnail1Preview] = useState('')
  const [selectedThumbnail2, setSelectedThumbnail2] = useState(null)
  const [thumbnail2Preview, setThumbnail2Preview] = useState('')
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
        let thumbnail1 = ''
        if (selectedThumbnail1) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail1,
          ])
          thumbnail1 = thumbnailUploadResponse.imageUrls[0]
        }

        let thumbnail2 = ''
        if (selectedThumbnail2) {
          const thumbnailUploadResponse = await uploadImages([
            selectedThumbnail2,
          ])
          thumbnail2 = thumbnailUploadResponse.imageUrls[0]
        }

        let imageUrls = []
        if (selectedFiles.length > 0) {
          const uploadResponse = await uploadImages(selectedFiles)
          imageUrls = uploadResponse.imageUrls
        }

        const response = await createProduct({
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
    [navigate, selectedFiles, selectedThumbnail1, selectedThumbnail2],
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
    handlePriceChange,
    setDisplayPurchasePrice,
    setDisplaySellingPrice,
  }
}
