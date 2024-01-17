import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function DropZone({ sendImageData }) {
  const [images, setImages] = useState([]);

  const deleteImage = () => {
    setImages([]);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }))
      );
      sendImageData(acceptedFiles);
    },
    [sendImageData]
  );
  const isMobile = () => {
    if (typeof window === 'undefined') return false; // Check for window availability
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod|android|webos|blackberry|iemobile|opera mini/i.test(userAgent);
  };
  
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    noClick: isMobile(),
    noDrag: isMobile(),
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center w-full my-5" {...getRootProps()}>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {images.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* Your upload icon */}
              {/* ... */}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              {/* Other upload instructions */}
              {/* ... */}
            </div>
          )}
          {images.length > 0 && (
            <section className="w-full">
              {images.map((image) => (
                <div key={image.file.name} className="w-28 m-auto">
                  <div className="relative overflow-hidden flex items-center justify-center">
                    <img
                      src={image.preview}
                      alt="Image"
                      className="object-cover"
                      width="314"
                      height="314"
                    />
                    <div className="absolute top-0 right-0 flex items-center justify-center">
                      <button
                        onClick={deleteImage}
                        type="button"
                        className="bg-red rounded-md p-2 inline-flex items-center justify-center text-red-400 hover:text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close menu</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
          <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
        </label>
      </div>
      {/* Other parts of your component */}
      {/* ... */}
    </div>
  );
}

export default DropZone;
