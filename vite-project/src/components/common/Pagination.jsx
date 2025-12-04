import { useState, useEffect } from 'react'
import useWindowSize from '@/hooks/common/useWindowSize'

/**페이지네이션 바 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { width } = useWindowSize()
  const isMobile = width < 768

  const pageGroupSize = isMobile ? 5 : 10
  const currentPageGroup = Math.ceil(currentPage / pageGroupSize)
  const startPage = (currentPageGroup - 1) * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  )

  return (
    <div className="mt-4 flex justify-center">
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(startPage > pageGroupSize ? startPage - pageGroupSize : 1)}
          disabled={startPage === 1}
          className="rounded-md px-2 py-2 text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="sr-only">Previous {pageGroupSize} pages</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-md px-2 py-2 text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-md px-4 py-2 text-sm font-semibold ${
              currentPage === page
                ? 'bg-black text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-md px-2 py-2 text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={() =>
            onPageChange(endPage < totalPages ? endPage + 1 : totalPages)
          }
          disabled={endPage === totalPages}
          className="rounded-md px-2 py-2 text-gray-500 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="sr-only">Next {pageGroupSize} pages</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination
