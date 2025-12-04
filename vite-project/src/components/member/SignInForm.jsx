import { Link } from 'react-router-dom'
import KakaoLoginButton from '@/components/member/KakaoLoginButton'

const SignInForm = ({ loading, register, handleSubmit, errors, onSubmit }) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          Sign in to your account
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
            <div className="mt-2">
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('username', { required: '아이디를 입력하세요.' })}
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm leading-6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="find-password"
                  className="font-semibold text-black hover:text-gray-700"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-inset sm:text-sm sm:leading-6"
                {...register('password', {
                  required: '비밀번호를 입력하세요.',
                  minLength: { value: 6, message: '6자 이상 입력하세요.' },
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
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <KakaoLoginButton />
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link
            to="/member/sign-up"
            className="leading-6 font-semibold text-black hover:text-gray-700"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
