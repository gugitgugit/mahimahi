const router = require('express').Router()
const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { ObjectId } = require('mongodb')

const s3 = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    },
  }),
})

module.exports = function (db) {
  // 관리자 권한 확인 미들웨어
  const checkAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
      next()
    } else {
      res.status(403).json({ message: '관리자 권한이 필요합니다.' })
    }
  }

  // =============================================
  // 사용자 관리 (User Management)
  // =============================================

  /**
   * @route GET /api/admin/users
   * @group Admin - 관리자 API
   * @summary 모든 사용자 목록 조회 (관리자 전용)
   * @param {number} request.query.page - 페이지 번호 (기본값: 1)
   * @param {number} request.query.limit - 페이지당 사용자 수 (기본값: 10)
   * @param {string} request.query.searchTerm - 검색어 (사용자 아이디 또는 이름)
   * @returns {object} 200 - 사용자 목록 및 페이지네이션 정보
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/users', checkAdmin, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit
      const { searchTerm } = req.query

      let query = {}
      if (searchTerm) {
        query.$or = [
          { username: { $regex: searchTerm, $options: 'i' } },
          { name: { $regex: searchTerm, $options: 'i' } },
        ]
      }

      const totalUsers = await db.collection('user').countDocuments(query)
      const totalPages = Math.ceil(totalUsers / limit)

      const users = await db
        .collection('user')
        .aggregate([
          { $match: query },
          {
            $lookup: {
              from: 'order',
              localField: '_id',
              foreignField: 'userId',
              as: 'orders',
            },
          },
          {
            $addFields: {
              totalOrderAmount: { $sum: '$orders.totalPrice' },
            },
          },
          {
            $project: {
              password: 0,
              orders: 0,
            },
          },
          { $sort: { _id: -1 } },
          { $skip: skip },
          { $limit: limit },
        ])
        .toArray()

      res.status(200).json({ users, currentPage: page, totalPages })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
    }
  })

  // =============================================
  // 상품 관리 (Product Management)
  // =============================================

  /**
   * @route POST /api/admin/products/upload-images
   * @group Admin - 관리자 API
   * @summary 여러 상품 이미지 S3 업로드 (관리자 전용)
   * @param {array<File>} request.files.required - 업로드할 이미지 파일들 (최대 10개)
   * @returns {object} 200 - 업로드된 이미지 URL 배열
   * @throws {object} 400 - 업로드할 파일 없음
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.post(
    '/products/upload-images',
    checkAdmin,
    upload.array('images', 10),
    (req, res) => {
      try {
        if (!req.files || req.files.length === 0) {
          return res
            .status(400)
            .json({ message: '업로드할 이미지가 없습니다.' })
        }
        const imageUrls = req.files.map((file) => file.location)
        res.status(200).json({ imageUrls })
      } catch (err) {
        console.error(err)
        res
          .status(500)
          .json({ message: '이미지 업로드 중 서버 오류가 발생했습니다.' })
      }
    },
  )

  /**
   * @route POST /api/admin/products
   * @group Admin - 관리자 API
   * @summary 새로운 상품 추가 (관리자 전용)
   * @param {object} request.body.required - 상품 정보
   * @returns {object} 201 - 상품 추가 성공
   * @throws {object} 400 - 필수 정보 누락
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.post('/products', checkAdmin, async (req, res) => {
    try {
      const {
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        thumbnail1,
        thumbnail2,
        imageUrls,
        stock,
        brand,
      } = req.body

      if (
        !name ||
        !description ||
        !purchasePrice ||
        !sellingPrice ||
        !category ||
        !thumbnail1 ||
        !imageUrls ||
        !Array.isArray(imageUrls) ||
        stock === undefined ||
        !brand
      ) {
        return res.status(400).json({
          message: '모든 필수 필드를 입력해주세요. (썸네일1, 이미지 URL 포함)',
        })
      }

      const newProduct = {
        name,
        description,
        purchasePrice: Number(purchasePrice),
        sellingPrice: Number(sellingPrice),
        category,
        thumbnail1,
        thumbnail2: thumbnail2 || '',
        imageUrls,
        stock: Number(stock),
        brand,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const result = await db.collection('product').insertOne(newProduct)
      res.status(201).json({
        message: '상품이 성공적으로 추가되었습니다.',
        product: { ...newProduct, _id: result.insertedId },
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route GET /api/admin/products/all
   * @group Admin - 관리자 API
   * @summary 모든 상품 조회 (관리자 전용, 페이지네이션 및 검색 적용)
   * @param {number} request.query.page - 페이지 번호 (기본값: 1)
   * @param {number} request.query.limit - 페이지당 상품 수 (기본값: 10)
   * @param {string} request.query.category - 카테고리 필터
   * @param {string} request.query.searchTerm - 검색어 (상품명, 설명, 브랜드)
   * @returns {object} 200 - 상품 정보 및 페이지네이션 정보
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/products/all', checkAdmin, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit
      const { category, searchTerm } = req.query

      const query = {}
      if (category && category !== 'all') {
        query.category = category
      }

      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
        ]
      }

      const totalProducts = await db.collection('product').countDocuments(query)
      const totalPages = Math.ceil(totalProducts / limit)

      const products = await db
        .collection('product')
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray()

      res.status(200).json({
        products,
        currentPage: page,
        totalPages,
        totalProducts,
      })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: '상품 조회 중 서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route GET /api/admin/products/:id
   * @group Admin - 관리자 API
   * @summary 특정 상품 상세 정보 조회 (관리자 전용)
   * @param {string} request.params.id.required - 상품 ID
   * @returns {object} 200 - 상품의 모든 정보 (매입가 포함)
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 404 - 상품을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/products/:id', checkAdmin, async (req, res) => {
    try {
      const { id } = req.params
      const product = await db
        .collection('product')
        .findOne({ _id: new ObjectId(id) })

      if (!product) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
      }
      res.status(200).json(product)
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: '상품 조회 중 서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route PUT /api/admin/products/:id
   * @group Admin - 관리자 API
   * @summary 상품 정보 수정 (관리자 전용)
   * @param {string} request.params.id.required - 수정할 상품 ID
   * @param {object} request.body.required - 수정할 상품 정보
   * @returns {object} 200 - 수정 성공
   * @throws {object} 400 - 필수 정보 누락
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 404 - 상품을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.put('/products/:id', checkAdmin, async (req, res) => {
    try {
      const { id } = req.params
      const {
        name,
        description,
        purchasePrice,
        sellingPrice,
        category,
        thumbnail1,
        thumbnail2,
        imageUrls,
        stock,
        brand,
      } = req.body

      if (
        !name ||
        !description ||
        !purchasePrice ||
        !sellingPrice ||
        !category ||
        !thumbnail1 ||
        !imageUrls ||
        !Array.isArray(imageUrls) ||
        stock === undefined ||
        !brand
      ) {
        return res
          .status(400)
          .json({ message: '모든 필수 필드를 입력해주세요.' })
      }

      const updatedProduct = {
        name,
        description,
        purchasePrice: Number(purchasePrice),
        sellingPrice: Number(sellingPrice),
        category,
        thumbnail1,
        thumbnail2: thumbnail2 || '',
        imageUrls,
        stock: Number(stock),
        brand,
        updatedAt: new Date(),
      }

      const result = await db
        .collection('product')
        .updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct })

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
      }

      res
        .status(200)
        .json({ message: '상품 정보가 성공적으로 수정되었습니다.' })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: '상품 수정 중 서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route DELETE /api/admin/products/:id
   * @group Admin - 관리자 API
   * @summary 상품 삭제 (관리자 전용)
   * @param {string} request.params.id.required - 삭제할 상품 ID
   * @returns {object} 200 - 삭제 성공
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 404 - 상품을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.delete('/products/:id', checkAdmin, async (req, res) => {
    try {
      const { id } = req.params

      const result = await db
        .collection('product')
        .deleteOne({ _id: new ObjectId(id) })

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다.' })
      }

      res.status(200).json({ message: '상품이 성공적으로 삭제되었습니다.' })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: '상품 삭제 중 서버 오류가 발생했습니다.' })
    }
  })

  // =============================================
  // 주문 관리 (Order Management)
  // =============================================

  /**
   * @route GET /api/admin/orders/stats
   * @group Admin - 관리자 API
   * @summary 일자별 주문 통계 조회 (관리자 전용)
   * @returns {Array<object>} 200 - 일자별 주문 통계 데이터
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/orders/stats', checkAdmin, async (req, res) => {
    try {
      const stats = await db
        .collection('order')
        .aggregate([
          {
            $group: {
              _id: {
                $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
              },
              totalOrders: { $sum: 1 },
              totalAmount: { $sum: '$totalPrice' },
            },
          },
          {
            $sort: { _id: 1 }, // 날짜순으로 정렬
          },
        ])
        .toArray()

      res.status(200).json(stats)
    } catch (err) {
      console.error('주문 통계 조회 실패:', err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route GET /api/admin/orders
   * @group Admin - 관리자 API
   * @summary 모든 주문 목록 조회 (관리자 전용)
   * @param {number} request.query.page - 페이지 번호 (기본값: 1)
   * @param {number} request.query.limit - 페이지당 주문 수 (기본값: 10)
   * @returns {object} 200 - 주문 목록 및 페이지네이션 정보
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/orders', checkAdmin, async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit

      const totalOrders = await db.collection('order').countDocuments()
      const totalPages = Math.ceil(totalOrders / limit)

      const orders = await db
        .collection('order')
        .aggregate([
          {
            $lookup: {
              from: 'user',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $unwind: '$user',
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $project: {
              'user.password': 0, // exclude user password
            },
          },
        ])
        .toArray()

      res.status(200).json({ orders, currentPage: page, totalPages })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route PATCH /api/admin/orders/:orderId/status
   * @group Admin - 관리자 API
   * @summary 주문 상태 변경 (관리자 전용)
   * @param {string} request.params.orderId.required - 주문 ID
   * @param {object} request.body.required - 새로운 상태 정보
   * @param {string} request.body.status.required - 변경할 주문 상태
   * @returns {object} 200 - 상태 변경 성공
   * @throws {object} 400 - 잘못된 요청
   * @throws {object} 403 - 관리자 권한 없음
   * @throws {object} 404 - 주문을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.patch('/orders/:orderId/status', checkAdmin, async (req, res) => {
    try {
      const { orderId } = req.params
      const { status } = req.body

      if (!status) {
        return res
          .status(400)
          .json({ message: '새로운 상태를 제공해야 합니다.' })
      }

      const result = await db
        .collection('order')
        .updateOne(
          { _id: new ObjectId(orderId) },
          { $set: { status: status, updatedAt: new Date() } },
        )

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: '주문을 찾을 수 없습니다.' })
      }

      res
        .status(200)
        .json({ message: '주문 상태가 성공적으로 변경되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  return router
}
