// product 컬렉션 초기화 스크립트
require('dotenv').config()
const { connectDB } = require('../database')

async function clearProducts() {
  try {
    console.log('🔄 DB 연결 중...')
    const client = await connectDB()
    const db = client.db(process.env.DB_NAME)
    
    console.log('🗑️  product 컬렉션 초기화 중...')
    const result = await db.collection('product').deleteMany({})
    
    console.log(`✅ 완료! ${result.deletedCount}개의 상품이 삭제되었습니다.`)
    
    await client.close()
    process.exit(0)
  } catch (err) {
    console.error('❌ 오류 발생:', err)
    process.exit(1)
  }
}

clearProducts()

