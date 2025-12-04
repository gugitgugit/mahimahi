const router = require('express').Router()
const { ObjectId } = require('mongodb')

module.exports = function (db) {
  const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).json({ message: '로그인이 필요합니다.' })
  }

  /**
   * @route GET /api/cart
   * @group Cart - 장바구니 관련 API
   * @summary 사용자의 장바구니 목록 조회
   * @returns {Array<object>} 200 - 장바구니 아이템 배열 (상품 정보 포함)
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.get('/', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user._id
      const cartItems = await db
        .collection('cart')
        .aggregate([
          { $match: { userId: new ObjectId(userId) } },
          {
            $lookup: {
              from: 'product',
              localField: 'productId',
              foreignField: '_id',
              as: 'productDetails',
            },
          },
          { $unwind: '$productDetails' },
          {
            $project: {
              quantity: 1,
              product: '$productDetails',
            },
          },
          { $unset: 'product.purchasePrice' },
        ])
        .toArray()

      res.status(200).json(cartItems)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route POST /api/cart
   * @group Cart - 장바구니 관련 API
   * @summary 상품을 장바구니에 추가
   * @param {object} request.body.required - 장바구니에 추가할 상품 정보
   * @param {string} request.body.productId.required - 상품 ID
   * @param {number} request.body.quantity.required - 수량
   * @returns {object} 200 - 장바구니 추가/수정 성공
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.post('/', isAuthenticated, async (req, res) => {
    try {
      const { productId, quantity } = req.body
      const userId = req.user._id

      if (!productId || !quantity) {
        return res
          .status(400)
          .json({ message: '상품 ID와 수량을 입력해주세요.' })
      }

      const cartCollection = db.collection('cart')

      const existingItem = await cartCollection.findOne({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
      })

      if (existingItem) {
        await cartCollection.updateOne(
          { _id: existingItem._id },
          { $inc: { quantity: Number(quantity) } },
        )
      } else {
        await cartCollection.insertOne({
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
          quantity: Number(quantity),
          createdAt: new Date(),
        })
      }

      res.status(200).json({ message: '장바구니에 상품이 추가되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route PUT /api/cart/:productId
   * @group Cart - 장바구니 관련 API
   * @summary 장바구니 상품 수량 변경
   * @param {string} request.params.productId.required - 상품 ID
   * @param {object} request.body.required - 변경할 수량 정보
   * @param {number} request.body.quantity.required - 새로운 수량
   * @returns {object} 200 - 수량 변경 성공
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.put('/:productId', isAuthenticated, async (req, res) => {
    try {
      const { productId } = req.params
      const { quantity } = req.body
      const userId = req.user._id

      if (!quantity || Number(quantity) < 1) {
        return res.status(400).json({ message: '수량은 1 이상이어야 합니다.' })
      }

      await db.collection('cart').updateOne(
        {
          userId: new ObjectId(userId),
          productId: new ObjectId(productId),
        },
        { $set: { quantity: Number(quantity) } },
      )

      res.status(200).json({ message: '수량이 변경되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route DELETE /api/cart/:productId
   * @group Cart - 장바구니 관련 API
   * @summary 장바구니에서 상품 삭제
   * @param {string} request.params.productId.required - 삭제할 상품 ID
   * @returns {object} 200 - 삭제 성공
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.delete('/:productId', isAuthenticated, async (req, res) => {
    try {
      const { productId } = req.params
      const userId = req.user._id

      await db.collection('cart').deleteOne({
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
      })

      res.status(200).json({ message: '상품이 장바구니에서 삭제되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  return router
}
