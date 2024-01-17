import React from 'react'

function CopyButton({onClick}) {
  return (
    <button
    id="copyButton"
    type="button"
    class=" mt-5 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
    onClick={onClick}
  >
    <svg
      class="h-5 w-5 text-grey-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {" "}
      <rect
        x="9"
        y="9"
        width="13"
        height="13"
        rx="2"
        ry="2"
      />{" "}
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  </button>
  )
}

export default CopyButton