/**로딩창 */
const LoadingSpinner = () => {
  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-white">
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
          .blinking-text {
            animation: blink 1.5s infinite;
          }
        `}
      </style>
      <h1 className="blinking-text text-5xl font-bold text-black">逍遥</h1>
    </div>
  )
}

export default LoadingSpinner
