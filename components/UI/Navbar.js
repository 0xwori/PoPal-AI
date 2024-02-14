import React from "react";

function Navbar() {
  return (

    <>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse mx-auto">
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">✨Po-Pal.AI</span>
            </a>

            
        </div>
    </nav>
    <nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center justify-center"> 
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm list-none"> 
                <li>
                    <a href="/" class="text-gray-900 dark:text-white hover:underline" aria-current="page">The Writer</a>
                </li>
                <li>
                    <a href="/reviewer" class="text-gray-900 dark:text-white hover:underline">The Reviewer</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">The Splitter</a>
                </li>
                <li>
                    <a href="#" class="text-gray-900 dark:text-white hover:underline">The ideator</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    </>
  );
}

export default Navbar;
