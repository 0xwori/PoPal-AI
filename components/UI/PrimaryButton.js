
import React from 'react'

function PrimaryButton({onClick, children, classnames}) {
  return (
    <button type="button" onClick={onClick} className={'text-white my-5 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ' + classnames}>{children}</button>

  )
}

export default PrimaryButton