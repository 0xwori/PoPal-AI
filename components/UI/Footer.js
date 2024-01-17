import React from "react";

function Footer() {
  return (
    <div>
      <footer class="text-center dark:bg-neutral-400 lg:text-left">
        <div class="p-4 text-center text-neutral-400 dark:text-neutral-200">
          © 2023 Copyright -  
          <a
            class="text-neutral-400 dark:text-neutral-400"
            href="https://tw-elements.com/"
          >
            This applications makes use of OpenAI API. The provided images will be immediatily deleted when processed.
          </a>
        </div>
        <div class="p-4 text-center text-neutral-400 dark:text-neutral-200">
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Build by Wouter van Rijmenam 
              </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
