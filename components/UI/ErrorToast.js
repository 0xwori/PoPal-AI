import React, { useEffect, useState } from "react";

function ErrorToast({ errorMessage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [errorMessage]);


  const handleErrorcloseButton = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          id="toast-danger"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-between w-full max-w-xs p-4 mb-4 text-gray-500 bg-red-50 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm text-red-700 font-normal mr-auto">
            {errorMessage}
          </div>
          <button
            type="button"
            className="text-red-500 hover:text-red-900 rounded-lg focus:ring-2 focus:ring-red-300 p-1.5 hover:bg-red-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-red-800 dark:hover:bg-red-700"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
            onClick={handleErrorcloseButton}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export default ErrorToast;
