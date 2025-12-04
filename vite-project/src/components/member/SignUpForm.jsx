import { Link } from 'react-router-dom'

const SignUpForm = ({
  loading,
  idCheckMessage,
  passwordConditions,
  register,
  handleSubmit,
  watch,
  errors,
  handleCheckId,
  onSubmit,
}) => {
  const password = watch('password')

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label
              htmlFor="username"
              className="block text-sm leading-6 font-medium text-gray-900"
            >
              Username
            </label>
            <div className="mt-2 flex gap-x-2">
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('username', { required: '아이디를 입력하세요.' })}
              />
              <button
                type="button"
                onClick={handleCheckId}
                className="rounded-md bg-black px-3 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Check
              </button>
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
            {idCheckMessage && (
              <p
                className={`mt-2 text-sm ${
                  idCheckMessage === '사용 가능한 아이디입니다.'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {idCheckMessage}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex justify-between text-sm leading-6 font-medium text-gray-900"
            >
              Password
              <div className="flex justify-end gap-1 space-y-1 text-sm">
                <span
                  style={{
                    color: passwordConditions.letter ? 'black' : 'gray',
                  }}
                >
                  ✓ 영어
                </span>
                <span
                  style={{
                    color: passwordConditions.number ? 'black' : 'gray',
                  }}
                >
                  ✓ 숫자
                </span>
                <span
                  style={{
                    color: passwordConditions.specialChar ? 'black' : 'gray',
                  }}
                >
                  ✓ 특수문자
                </span>
                <span
                  style={{
                    color: passwordConditions.length ? 'black' : 'gray',
                  }}
                >
                  ✓ 8~20자
                </span>
              </div>
            </label>

            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
                    message:
                      '비밀번호는 8~20자, 영문, 숫자, 특수문자를 모두 포함해야 합니다.',
                  },
                })}
              />
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password_check"
              className="block text-sm leading-6 font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="password_check"
                type="password"
                autoComplete="new-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('password_check', {
                  required: '비밀번호를 다시 입력하세요.',
                  validate: (value) =>
                    value === password || '비밀번호가 일치하지 않습니다.',
                })}
              />
            </div>
            {errors.password_check && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password_check.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm leading-6 font-medium text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('name', {
                  required: '이름을 입력하세요.',
                })}
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm leading-6 font-medium text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('phone', {
                  required: '전화번호를 입력하세요.',
                })}
              />
            </div>
            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <Link
            to="/member/sign-in"
            className="ml-1 leading-6 font-semibold text-black hover:text-gray-700"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpForm
