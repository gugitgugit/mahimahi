const router = require('express').Router()
const { ObjectId } = require('mongodb')

module.exports = function (db) {
  // 더미 데이터 만들기(http://localhost:8080/api/products/seed)로 접속하면 각 카테고리마다 20개씩 총 100개 생성
  router.get('/seed', async (req, res) => {
    try {
      const categories = ['new-in', 'outer', 'top', 'bottom', 'acc']
      const brands = ['Soyo', 'BrandB', 'BrandC', 'BrandD']
      const productsPerCategory = 20

      const dummyProducts = []

      const subcategoriesByCategory = {
        outer: ['jacket', 'vest', 'coat'],
        top: ['half-shirt', 'shirt', 'sweat-shirt', 'knit-wear'],
        bottom: ['denim', 'shorts', 'pants'],
        acc: ['hat', 'bag', 'shoes', 'etc'],
      }

      categories.forEach((category, categoryIndex) => {
        for (let i = 0; i < productsPerCategory; i++) {
          const productIndex = categoryIndex * productsPerCategory + i
          const purchasePrice = Math.floor(Math.random() * 50000) + 5000
          const sellingPrice = purchasePrice * (1 + Math.random() * 0.5 + 0.2)

          const product = {
            name: `${category.toUpperCase()} Product ${i + 1}`,
            description: `This is a description for ${category} product ${i + 1}. It is a high-quality item.`,
            purchasePrice: purchasePrice,
            sellingPrice: Math.floor(sellingPrice / 100) * 100,
            category: category,
            brand: brands[productIndex % brands.length],
            thumbnail1: `https://picsum.photos/seed/${productIndex}/400/400`,
            thumbnail2: `https://picsum.photos/seed/${productIndex}-2/400/400`,
            imageUrls: [
              `https://picsum.photos/seed/${productIndex}-1/800/800`,
              `https://picsum.photos/seed/${productIndex}-2/800/800`,
              `https://picsum.photos/seed/${productIndex}-3/800/800`,
            ],
            stock: Math.floor(Math.random() * 100),
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          // subcategory를 지원하는 카테고리인 경우 subcategory 추가
          if (subcategoriesByCategory[category]) {
            const subcategories = subcategoriesByCategory[category]
            product.subcategory =
              subcategories[Math.floor(Math.random() * subcategories.length)]
          }

          dummyProducts.push(product)
        }
      })

      await db.collection('product').deleteMany({})
      await db.collection('product').insertMany(dummyProducts)

      res.status(200).json({
        message: `Successfully seeded ${dummyProducts.length} products (${productsPerCategory} per category).`,
        totalProducts: dummyProducts.length,
        productsPerCategory: productsPerCategory,
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to seed database.' })
    }
  })

  /**
   * @route GET /api/products
   * @group Product - 상품 관련 API
   * @summary 모든 상품 조회 (페이지네이션 및 카테고리 필터링)
   * @param {number} request.query.page - 페이지 번호 (기본값: 1)
   * @param {number} request.query.limit - 페이지당 상품 수 (기본값: 10)
   * @param {string} request.query.category - 카테고리 (기본값: all)
   * @returns {object} 200 - 상품 정보 및 페이지네이션 정보
   * @throws {object} 500 - 서버 에러
   */
  router.get('/', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 12
      const {
        category,
        sort,
        brand,
        minPrice,
        maxPrice,
        searchTerm,
        subcategory,
      } = req.query

      const query = {}
      if (category && category !== 'all') {
        query.category = category
      }
      if (subcategory) {
        query.subcategory = subcategory
      }
      if (brand) {
        query.brand = { $in: brand.split(',') }
      }
      if (minPrice || maxPrice) {
        query.sellingPrice = {}
        if (minPrice) {
          query.sellingPrice.$gte = parseInt(minPrice)
        }
        if (maxPrice) {
          query.sellingPrice.$lte = parseInt(maxPrice)
        }
      }

      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
        ]
      }

      let sortOption = { createdAt: -1 }
      if (sort === 'price-asc') {
        sortOption = { sellingPrice: 1 }
      } else if (sort === 'price-desc') {
        sortOption = { sellingPrice: -1 }
      }

      const totalProducts = await db.collection('product').countDocuments(query)
      const totalPages = Math.ceil(totalProducts / limit)
      const skip = (page - 1) * limit

      const products = await db
        .collection('product')
        .find(query)
        .project({ purchasePrice: 0 })
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .toArray()

      res.status(200).json({
        products,
        currentPage: page,
        totalPages,
      })
    } catch (err) {
      console.error(err)
      res
        .status(500)
        .json({ message: '상품 조회 중 서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route GET /api/products/:id
   * @group Product - 상품 관련 API
   * @summary 특정 상품 조회
   * @param {string} request.params.id.required - 상품 ID
   * @returns {object} 200 - 상품 정보
   * @throws {object} 404 - 상품을 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const product = await db
        .collection('product')
        .findOne(
          { _id: new ObjectId(id) },
          { projection: { purchasePrice: 0 } },
        )
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

  return router
}
