import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link href="/">
            <a className="flex items-center space-x-3 rtl:space-x-reverse mx-auto">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">✨Po-Pal.AI</span>
            </a>
          </Link>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-center"> 
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm list-none"> 
              <li>
                <Link href="/">
                  <a className="text-gray-900 dark:text-white hover:underline" aria-current="page">The Writer</a>
                </Link>
              </li>
              <li>
                <Link href="/reviewer">
                  <a className="text-gray-900 dark:text-white hover:underline">The Reviewer</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-900 dark:text-white hover:underline">The Splitter</a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-gray-900 dark:text-white hover:underline">The ideator</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
