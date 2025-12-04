const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { ObjectId } = require('mongodb')

function initPassport(db) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.collection('user').findOne({ username })
        if (user) {
          const ok = await bcrypt.compare(password, user.password)
          if (ok) {
            return done(null, {
              _id: user._id,
              username: user.username,
              role: user.role || 'user',
            })
          }
        }
        return done(null, false, {
          message: '아이디 또는 비밀번호가 올바르지 않습니다.',
        })
      } catch (err) {
        return done(err)
      }
    }),
  )

  passport.serializeUser((user, done) => {
    done(null, String(user._id))
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db
        .collection('user')
        .findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } })
      if (!user) return done(null, false)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })
}

module.exports = { initPassport }
