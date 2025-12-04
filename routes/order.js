const router = require('express').Router()
const { ObjectId } = require('mongodb')

module.exports = function (db) {
  // 로그인 확인 미들웨어
  const checkLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({ message: '로그인이 필요합니다.' })
    }
  }

  /**
   * @route POST /api/orders
   * @group Order - 주문 관련 API
   * @summary 새로운 주문 생성
   * @param {object} request.body.required - 주문 정보
   * @returns {object} 201 - 주문 생성 성공
   * @throws {object} 400 - 잘못된 요청
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.post('/', checkLogin, async (req, res) => {
    try {
      const { items, totalPrice, recipient, shippingAddress } = req.body
      const userId = req.user._id

      if (!items || !totalPrice || !recipient || !shippingAddress) {
        return res.status(400).json({ message: '잘못된 요청입니다.' })
      }

      const newOrder = {
        userId,
        items,
        totalPrice,
        recipient,
        shippingAddress,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      // 재고 업데이트
      const operations = items.map((item) => ({
        updateOne: {
          filter: { _id: new ObjectId(item.productId) },
          update: { $inc: { stock: -item.quantity } },
        },
      }))
      await db.collection('product').bulkWrite(operations)

      const result = await db.collection('order').insertOne(newOrder)

      // 장바구니 비우기
      await db.collection('cart').deleteMany({ userId: new ObjectId(userId) })

      res.status(201).json({ orderId: result.insertedId })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route GET /api/orders/my-orders
   * @group Order - 주문 관련 API
   * @summary 내 주문 목록 조회
   * @returns {object} 200 - 내 주문 목록
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.get('/my-orders', checkLogin, async (req, res) => {
    try {
      const userId = req.user._id
      const orders = await db
        .collection('order')
        .find({ userId: new ObjectId(userId) })
        .sort({ createdAt: -1 })
        .toArray()
      res.status(200).json(orders)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route GET /api/orders/:id
   * @group Order - 주문 관련 API
   * @summary 특정 주문 상세 정보 조회
   * @param {string} id.path.required - 주문 ID
   * @returns {object} 200 - 주문 상세 정보
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 404 - 주문을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/:id', checkLogin, async (req, res) => {
    try {
      const { id } = req.params
      const order = await db
        .collection('order')
        .findOne({ _id: new ObjectId(id) })

      if (!order) {
        return res.status(404).json({ message: '주문을 찾을 수 없습니다.' })
      }

      if (
        req.user.role !== 'admin' &&
        order.userId.toString() !== req.user._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: '이 주문을 볼 수 있는 권한이 없습니다.' })
      }

      const result = await db
        .collection('order')
        .aggregate([
          { $match: { _id: new ObjectId(id) } },
          {
            $lookup: {
              from: 'user',
              localField: 'userId',
              foreignField: '_id',
              as: 'user',
            },
          },
          { $unwind: '$user' },
          {
            $project: {
              'user.password': 0,
            },
          },
        ])
        .toArray()

      if (result.length === 0) {
        return res.status(404).json({ message: '주문을 찾을 수 없습니다.' })
      }

      res.status(200).json(result[0])
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  return router
}
