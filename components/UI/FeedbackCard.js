import React from "react";
import * as commonmark from "commonmark";
import HTMLReactParser from "html-react-parser";

function FeedbackCard({ type, content }) {
  console.log(content);
  // const reader = new commonmark.Parser();
  // const writer = new commonmark.HtmlRenderer();

  // Parse Markdown content and convert it to HTML
  // const parsedContent = writer.render(reader.parse(content));

  let typeDescription;

  switch (type) {
    case "developer":
      typeDescription =
        "As a developer, I look at the techicalities within the User Story.";
      break;
    case "sr-product-manager":
      typeDescription =
        "As a product manager I look at overall User Story such as typos and how the business requirements are stated";

    default:
      break;
  }

  return (
    <div class="w-full animate-fade-down mx-auto p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
      <div class="flow-root">
        <ul
          role="list"
          class="divide-y divide-gray-200 dark:divide-gray-700 list-none"
        >
          {content && (
            <li class="py-3 sm:py-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                    alt="Neil image"
                  />
                </div>
                <div class="flex-1 min-w-0 ms-4">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {type}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {typeDescription}
                  </p>
                </div>
              </div>
            </li>
          )}
        </ul>
        <div class="flex flex-col leading-1.5 p-5 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
          {content
            ? HTMLReactParser(content)
            : "Please click the above roles to review your User Story"}
        </div>
      </div>
    </div>
  );
}

export default FeedbackCard;
