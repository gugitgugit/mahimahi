// 환경변수 설정
require('dotenv').config()

// 기본 라이브러리
const express = require('express')
const path = require('path')
const cors = require('cors')

// 세션/인증
const session = require('express-session')
const passport = require('passport')
const MongoStore = require('connect-mongo')

// DB
const { connectDB } = require('./database')

const app = express()
const dist = path.resolve(__dirname, 'vite-project/dist')

// CORS 설정
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: (origin, callback) => {
      // origin이 없는 요청 (같은 도메인에서의 요청 등) 허용
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('CORS 정책에 의해 차단되었습니다.'))
      }
    },
    credentials: true,
  }),
)

// 공통 미들웨어
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 세션 미들웨어
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
      dbName: process.env.DB_NAME,
    }),
  }),
)

// passport 초기화
app.use(passport.initialize())
app.use(passport.session())

// DB 연결 후 passport 전략 세팅 & 라우터 등록
;(async () => {
  try {
    const client = await connectDB()
    const db = client.db(process.env.DB_NAME)
    app.locals.db = db

    const { initPassport } = require('./passport')
    initPassport(db)

    // 정적 파일
    app.use(express.static(dist))

    // 사용자 관련
    app.use('/api/member', require('./routes/member.js')(db))

    // 관리자 관련
    app.use('/api/admin', require('./routes/admin.js')(db))

    // 상품 관련
    app.use('/api/products', require('./routes/products.js')(db))

    // 장바구니 관련
    app.use('/api/cart', require('./routes/cart.js')(db))

    // 주문 관련
    app.use('/api/orders', require('./routes/order.js')(db))

    // SPA fallback
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(__dirname, 'vite-project/dist/index.html'))
    })

    // 서버 시작
    app.listen(process.env.PORT, () =>
      console.log(`🚀 http://localhost:${process.env.PORT}에서 서버 실행중`),
    )
  } catch (err) {
    console.error('서버 시작 실패: ', err)
    process.exit(1)
  }
})()
