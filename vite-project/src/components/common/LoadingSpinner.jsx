import logoImg from '@/assets/logo.png'

/**로딩창 */
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <img
        src={logoImg}
        alt="Mahi Mahi"
        className="h-auto w-full max-w-md object-contain"
      />
    </div>
  )
}

export default LoadingSpinner
