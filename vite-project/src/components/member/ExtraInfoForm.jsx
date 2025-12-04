const ExtraInfoForm = ({
  loading,
  register,
  handleSubmit,
  errors,
  onSubmit,
}) => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900">
          추가 정보 입력
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          서비스 이용을 위해 이름과 전화번호를 입력해주세요.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
                {...register('name', { required: '이름을 입력하세요.' })}
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
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm leading-6 font-semibold text-white hover:bg-gray-800 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ExtraInfoForm
