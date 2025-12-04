const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const axios = require('axios')
const { ObjectId } = require('mongodb')

module.exports = function (db) {
  const checkLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(401).json({ message: '로그인이 필요합니다.' })
    }
  }
  /**
   * @route GET /api/member/me
   * @group Member - 사용자 관련 API
   * @summary 현재 로그인된 사용자 정보 조회
   * @description 현재 세션을 기반으로 로그인된 사용자의 정보를 반환합니다.
   * @returns {object} 200 - 성공. 로그인 시 사용자 정보, 비로그인 시 user: null
   * @returns {object | null} 200.user - 사용자 정보 객체 또는 null
   */
  router.get('/me', (req, res) => {
    res.json({ user: req.user || null })
  })

  /**
   * @route PUT /api/member/me
   * @group Member - 사용자 관련 API
   * @summary 현재 로그인된 사용자 정보(이름, 전화번호) 수정
   * @param {object} request.body.required - 수정할 사용자 정보
   * @param {string} request.body.name.required - 새 이름
   * @param {string} request.body.phone.required - 새 전화번호
   * @returns {object} 200 - 업데이트된 사용자 정보
   * @throws {object} 400 - 잘못된 요청
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.put('/me', checkLogin, async (req, res) => {
    try {
      const { name, phone } = req.body
      if (!name || !phone) {
        return res
          .status(400)
          .json({ message: '이름과 전화번호를 모두 입력해주세요.' })
      }

      const result = await db
        .collection('user')
        .findOneAndUpdate(
          { _id: req.user._id },
          { $set: { name, phone } },
          { returnDocument: 'after' },
        )

      const updatedUser = result.value
      if (!updatedUser) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' })
      }

      // 세션 정보 업데이트
      req.login(updatedUser, (err) => {
        if (err) {
          return res.status(500).json({ message: '세션 업데이트 실패' })
        }
        const { password, ...userWithoutPassword } = updatedUser
        res.status(200).json({ user: userWithoutPassword })
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route POST /api/member/check-id
   * @group Member - 사용자 관련 API
   * @summary 아이디 중복 검사
   * @param {object} request.body.required - 아이디 정보
   * @param {string} request.body.username.required - 확인할 사용자 아이디
   * @returns {object} 200 - 사용 가능한 아이디
   * @throws {object} 400 - 아이디 미입력 또는 유효성 검사 실패
   * @throws {object} 409 - 이미 사용중인 아이디
   * @throws {object} 500 - 서버 에러
   */
  router.post('/check-id', async (req, res) => {
    try {
      const { username } = req.body
      if (!username) {
        return res.status(400).json({ message: 'ID를 입력해주세요.' })
      }

      const usernameRegex = /^[a-zA-Z0-9]{8,20}$/
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message: '아이디는 영어, 숫자를 포함하여 8~20자 사이여야 합니다.',
        })
      }

      const existingUser = await db.collection('user').findOne({ username })
      if (existingUser) {
        return res.status(409).json({ message: '이미 사용중인 아이디입니다.' })
      }

      res.status(200).json({ message: '사용 가능한 아이디입니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
    }
  })

  /**
   * @route POST /api/member/sign-up
   * @group Member - 사용자 관련 API
   * @summary 일반 회원가입
   * @param {object} request.body.required - 회원가입 정보
   * @param {string} request.body.username.required - 사용자 아이디 (8~20자)
   * @param {string} request.body.password.required - 사용자 비밀번호 (영어, 숫자, 특수문자 포함 8~20자)
   * @param {string} request.body.name.required - 사용자 이름
   * @param {string} request.body.phone.required - 사용자 전화번호
   * @returns {object} 201 - 회원가입 성공
   * @throws {object} 400 - 필수 정보 누락 또는 아이디/비밀번호 유효성 검사 실패
   * @throws {object} 500 - 서버 에러
   */
  router.post('/sign-up', async (req, res) => {
    try {
      const { username, password, name, phone } = req.body

      if (!username || !password || !name || !phone) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' })
      }

      const usernameRegex = /^[a-zA-Z0-9]{8,20}$/
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          message: '아이디는 영어, 숫자를 포함하여 8~20자 사이여야 합니다.',
        })
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message:
            '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~20자 사이여야 합니다.',
        })
      }

      const hash = await bcrypt.hash(password, 10)
      await db
        .collection('user')
        .insertOne({ username, password: hash, name, phone })

      res.status(201).json({ message: '회원가입이 완료되었습니다!' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
    }
  })

  /**
   * @route POST /api/member/sign-in
   * @group Member - 사용자 관련 API
   * @summary 일반 로그인
   * @param {object} request.body.required - 로그인 정보
   * @param {string} request.body.username.required - 사용자 아이디
   * @param {string} request.body.password.required - 사용자 비밀번호
   * @returns {object} 200 - 로그인 성공
   * @returns {object} 200.user - 사용자 정보
   * @throws {object} 401 - 인증 실패
   * @throws {object} 500 - 서버 에러
   */
  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) {
        console.error('Passport 에러: ', error)
        return res.status(500).json({ message: 'Server Error' })
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || '인증 실패' })
      }
      req.logIn(user, (err) => {
        if (err) {
          console.error('세션 저장 실패: ', err)
          return res.status(500).json({ message: '세션 저장 실패' })
        }
        const { password, ...userWithoutPassword } = user
        return res.status(200).json({ user: userWithoutPassword })
      })
    })(req, res, next)
  })

  /**
   * @route POST /api/member/sign-out
   * @group Member - 사용자 관련 API
   * @summary 로그아웃
   * @description 현재 사용자의 세션을 종료하고 로그아웃합니다.
   * @returns {object} 200 - 로그아웃 성공
   * @throws {object} 500 - 서버 에러
   */
  router.post('/sign-out', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err)
      }
      req.session.destroy((err) => {
        if (err) {
          return next(err)
        }
        res.clearCookie('connect.sid')
        res.status(200).json({ message: '로그아웃되었습니다.' })
      })
    })
  })

  /**
   * @route POST /api/member/change-password
   * @group Member - 사용자 관련 API
   * @summary 비밀번호 변경
   * @param {object} request.body.required - 비밀번호 변경 정보
   * @param {string} request.body.currentPassword.required - 현재 비밀번호
   * @param {string} request.body.newPassword.required - 새 비밀번호
   * @returns {object} 200 - 비밀번호 변경 성공
   * @throws {object} 400 - 잘못된 요청
   * @throws {object} 401 - 인증 실패
   * @throws {object} 500 - 서버 에러
   */
  router.post('/change-password', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: '로그인이 필요합니다.' })
    }

    try {
      const { currentPassword, newPassword } = req.body
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' })
      }

      const user = await db.collection('user').findOne({ _id: req.user._id })
      if (!user) {
        return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' })
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: '현재 비밀번호가 일치하지 않습니다.' })
      }

      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          message:
            '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~20자 사이여야 합니다.',
        })
      }

      const hash = await bcrypt.hash(newPassword, 10)
      await db
        .collection('user')
        .updateOne({ _id: req.user._id }, { $set: { password: hash } })

      res.status(200).json({ message: '비밀번호가 성공적으로 변경되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route GET /api/member/kakao
   * @group Member - 사용자 관련 API
   * @summary 카카오 로그인 처리 (백엔드 리디렉션 방식)
   * @description 카카오 인증 코드를 받아 토큰을 발급받고, 사용자 프로필을 조회합니다.
   * 기존 사용자는 로그인 처리하고, 신규 사용자는 추가 정보 입력을 위해 리디렉션합니다.
   * @param {string} request.query.code.required - Kakao authorization code
   * @returns {void} 302 - 성공 시 클라이언트 URL 또는 추가 정보 입력 페이지로 리디렉션
   */
  router.get('/kakao', async (req, res) => {
    try {
      const tokenResponse = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_REST_API_KEY,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          code: req.query.code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )

      const profileResponse = await axios.get(
        'https://kapi.kakao.com/v2/user/me',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.access_token}`,
          },
        },
      )

      const kakaoId = profileResponse.data.id
      const username = `kakao_${kakaoId}`

      const user = await db.collection('user').findOne({ username: username })

      if (user) {
        req.logIn(user, (err) => {
          if (!user.name || !user.phone) {
            return res.redirect(`${process.env.CLIENT_URL}/member/extra-info`)
          }
          return res.redirect(process.env.CLIENT_URL)
        })
      } else {
        req.session.kakaoProfile = {
          username: username,
        }
        req.session.save(() => {
          res.redirect(`${process.env.CLIENT_URL}/member/extra-info`)
        })
      }
    } catch (err) {
      console.error(err)
    }
  })

  /**
   * @route POST /api/member/complete-signup
   * @group Member - 사용자 관련 API
   * @summary 카카오 신규 유저 회원가입 완료
   * @description 세션에 저장된 카카오 프로필 정보와 사용자가 입력한 추가 정보를 합쳐 DB에 새 사용자를 생성합니다.
   * @param {object} request.body.required - 추가 정보 (이름, 전화번호)
   * @returns {object} 201 - 회원가입 성공 및 사용자 정보 반환
   * @throws {object} 400 - 잘못된 요청
   * @throws {object} 409 - 이미 가입된 사용자
   * @throws {object} 500 - 서버 에러
   */
  router.post('/complete-signup', async (req, res) => {
    if (!req.session.kakaoProfile) {
      return res.status(400).json({ message: '카카오 로그인 정보가 없습니다.' })
    }

    try {
      const { name, phone } = req.body
      if (!name || !phone) {
        return res
          .status(400)
          .json({ message: '이름과 전화번호를 모두 입력해주세요.' })
      }

      const { username } = req.session.kakaoProfile
      const existingUser = await db.collection('user').findOne({ username })
      if (existingUser) {
        req.session.destroy()
        return res
          .status(409)
          .json({ message: '이미 가입된 사용자입니다. 다시 로그인해주세요.' })
      }

      const newUser = { username, name, phone }
      const result = await db.collection('user').insertOne(newUser)
      const user = { _id: result.insertedId, ...newUser }

      delete req.session.kakaoProfile

      req.logIn(user, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: '회원가입 후 로그인에 실패했습니다.' })
        }
        const { password, ...userWithoutPassword } = user
        res.status(201).json({ user: userWithoutPassword })
      })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 오류가 발생했습니다.' })
    }
  })

  /**
   * @route GET /api/member/addresses
   * @group Member - 사용자 관련 API
   * @summary 사용자의 모든 배송지 목록 조회
   * @returns {Array<object>} 200 - 배송지 목록
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.get('/addresses', checkLogin, async (req, res) => {
    try {
      const user = await db.collection('user').findOne({ _id: req.user._id })
      res.status(200).json(user.shippingAddresses || [])
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route POST /api/member/addresses
   * @group Member - 사용자 관련 API
   * @summary 새 배송지 추가
   * @param {object} request.body.required - 새 배송지 정보
   * @returns {object} 201 - 추가된 배송지 정보
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.post('/addresses', checkLogin, async (req, res) => {
    try {
      const newAddress = { _id: new ObjectId(), ...req.body }
      const userId = req.user._id

      const user = await db.collection('user').findOne({ _id: userId })
      const addressCount = user.shippingAddresses
        ? user.shippingAddresses.length
        : 0

      if (addressCount === 0) {
        newAddress.isDefault = true
      } else if (newAddress.isDefault) {
        await db
          .collection('user')
          .updateOne(
            { _id: userId, 'shippingAddresses.isDefault': true },
            { $set: { 'shippingAddresses.$.isDefault': false } },
          )
      }

      await db
        .collection('user')
        .updateOne(
          { _id: userId },
          { $push: { shippingAddresses: newAddress } },
        )

      res.status(201).json(newAddress)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route PUT /api/member/addresses/:id
   * @group Member - 사용자 관련 API
   * @summary 배송지 정보 수정
   * @param {string} request.params.id.required - 수정할 배송지 ID
   * @param {object} request.body.required - 수정할 배송지 정보
   * @returns {object} 200 - 수정 성공 메시지
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 404 - 해당 배송지를 찾을 수 없음
   * @throws {object} 500 - 서버 에러
   */
  router.put('/addresses/:id', checkLogin, async (req, res) => {
    try {
      const { id } = req.params
      const { alias, postcode, address, detailAddress, isDefault } = req.body
      const userId = req.user._id

      if (isDefault) {
        await db
          .collection('user')
          .updateOne(
            { _id: userId, 'shippingAddresses.isDefault': true },
            { $set: { 'shippingAddresses.$.isDefault': false } },
          )
      }

      const result = await db.collection('user').updateOne(
        { _id: userId, 'shippingAddresses._id': new ObjectId(id) },
        {
          $set: {
            'shippingAddresses.$.alias': alias,
            'shippingAddresses.$.postcode': postcode,
            'shippingAddresses.$.address': address,
            'shippingAddresses.$.detailAddress': detailAddress,
            'shippingAddresses.$.isDefault': isDefault,
          },
        },
      )

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: '주소를 찾을 수 없습니다.' })
      }

      res.status(200).json({ message: '주소가 업데이트되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route DELETE /api/member/addresses/:id
   * @group Member - 사용자 관련 API
   * @summary 배송지 삭제
   * @param {string} request.params.id.required - 삭제할 배송지 ID
   * @returns {object} 200 - 삭제 성공 메시지
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.delete('/addresses/:id', checkLogin, async (req, res) => {
    try {
      const { id } = req.params
      const userId = req.user._id

      await db
        .collection('user')
        .updateOne(
          { _id: userId },
          { $pull: { shippingAddresses: { _id: new ObjectId(id) } } },
        )

      res.status(200).json({ message: '주소가 삭제되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  /**
   * @route PATCH /api/member/addresses/:id/default
   * @group Member - 사용자 관련 API
   * @summary 기본 배송지로 설정
   * @param {string} request.params.id.required - 기본 배송지로 설정할 배송지 ID
   * @returns {object} 200 - 설정 성공 메시지
   * @throws {object} 401 - 로그인 필요
   * @throws {object} 500 - 서버 에러
   */
  router.patch('/addresses/:id/default', checkLogin, async (req, res) => {
    try {
      const { id } = req.params
      const userId = req.user._id

      await db
        .collection('user')
        .updateOne(
          { _id: userId, 'shippingAddresses.isDefault': true },
          { $set: { 'shippingAddresses.$.isDefault': false } },
        )

      await db
        .collection('user')
        .updateOne(
          { _id: userId, 'shippingAddresses._id': new ObjectId(id) },
          { $set: { 'shippingAddresses.$.isDefault': true } },
        )

      res.status(200).json({ message: '기본 배송지로 설정되었습니다.' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: '서버 에러' })
    }
  })

  return router
}
