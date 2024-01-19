"use client";

import DropZone from "@/components/Dropzone/DropZone";
import PrimaryButton from "@/components/UI/PrimaryButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import htmlReactParser from "html-react-parser";
import AWS, { ControlTower } from "aws-sdk";
import ResponseField from "@/components/Response/ResponseField";
import CopyButton from "@/components/UI/CopyButton";
import Loader from "@/components/UI/Loader";

export default function Home() {
  const [textAreaValue, setTextAreauValue] = useState();
  const [responeValue, setResponseValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [image, setImage] = useState();
  const [uploadedImageUrls, setUploadedImageUrls] = useState();
  const [accumulatedWords, setAccumulatedWords] = useState("");

  const [response, setResponse] = useState("");
  const [generating, setGenerating] = useState(false);

  const [textToCopy, setTextToCopy] = useState("");

  const handleCopyText = () => {
    const divToCopy = document.getElementById("textToCopy");
    const range = document.createRange();
    range.selectNode(divToCopy);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand("copy");
      console.log("Styled content copied to clipboard:", divToCopy.innerHTML);
      // You can also show a success message here if needed
    } catch (err) {
      console.error("Unable to copy styled content to clipboard.", err);
      // Handle errors here
    }

    selection.removeAllRanges();
  };

  const cleanResponse = (response) => {
    const cleanedResponse = response.replace(/```html|```/g, ""); // Remove ```html and ``` code blocks
    const doc = new DOMParser().parseFromString(cleanedResponse, "text/html");
    const bodyContent = doc.body.innerHTML; // Extract content from body
    return bodyContent;
  };

  const accessKeyId = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

  AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    endpoint: endpoint,
    s3ForcePathStyle: true, // Use path-style addressing for Cloudflare R2 Storage
  });

  process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  //               "https://517c76d11163f5facf60f0e02b7e141b.r2.cloudflarestorage.com/magic-ai", // Replace with your Cloudflare R2 S3 bucket

  const s3 = new AWS.S3();

  const handlePassedImage = async (data) => {
    setImage(data);
  };

  const handleImageUpload = async () => {
    console.log(image);
    if (image.length) {
      setError("");
      const uploadedImageUrls = []; // To store uploaded image URLs

      for (const img of image) {
        const objectKey = img.name; // Get the file name
        const params = {
          Bucket:
            "https://517c76d11163f5facf60f0e02b7e141b.r2.cloudflarestorage.com/magic-ai",
          Key: objectKey,
          Body: img,
          ContentType: "image/jpeg",
          ACL: "public-read", // Set ACL to make the uploaded file publicly readable
        };

        try {
          const uploadResponse = await s3.upload(params).promise();

          const imageUrl =
            "https://pub-e2c43000c64f446ebfc0e00a8b97e216.r2.dev/https:/" +
            uploadResponse.Key;
          return imageUrl;
          //   console.log(uploadResponse);
        } catch (error) {
          console.error("Error uploading image to Cloudflare R2 S3:", error);
        }
      }

      // Now you have an array of uploaded image URLs
      console.log("Uploaded Image URLs:", uploadedImageUrls);
    } else {
      setError("Please upload an image");
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    setResponseValue("");
    const uploadedImageUrl = await handleImageUpload();

    // Make a POST call to our api route
    await fetch("/api/generate-story", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        imageUrl: uploadedImageUrl,
        input: textAreaValue,
      }),
    }).then(async (response) => {
      const reader = response.body?.getReader();
      while (true) {
        const { done, value } = await reader?.read();
        if (done) {
          break;
        }

        var currentChunk = new TextDecoder().decode(value);
        setResponseValue((prev) => prev + currentChunk);
      }
    });

    setIsLoading(false);
    deleteFileFromS3(image[0].path);
  };

  const deleteFileFromS3 = async (fileName) => {
    const params = {
      Bucket:
        "https://517c76d11163f5facf60f0e02b7e141b.r2.cloudflarestorage.com/magic-ai",
      Key: fileName,
    };

    try {
      await s3.deleteObject(params).promise();
      console.log(`File ${fileName} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-between">
      <section className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-4 ">
          <div className="imageDrop h-full p-10">
            <h1 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900">
              ✨ PO-Pal.ai
            </h1>
            <DropZone sendImageData={handlePassedImage} />
            {error && <p>{error}</p>}
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 "
            >
              Add some context
            </label>
            <textarea
              id="message"
              value={textAreaValue}
              onChange={(e) => {
                setTextAreauValue(e.target.value);
              }}
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            ></textarea>
            <PrimaryButton classnames={"w-full"} onClick={handleClick}>
              Create User Story
            </PrimaryButton>
          </div>
          <div class="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-violet-300 min-h-screen p-5">
            <div className="magicOuter relative shadow-sm border-slate-100 h-full bg-white rounded-lg flex flex-col justify-between items-center">
              {!responeValue && (
                <div className="flex items-center justify-center h-full">
                 

                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <svg
                      class="h-12 w-12 text-stone-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                      
                      <p className="text-stone-400">Wait for the magic...</p>
                    </>
                  )}
                </div>
              )}

              {responeValue && (
                <>
                  <div id="textToCopy" className="htmlContent p-5">
                    <div class="relative w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
                    {htmlReactParser(cleanResponse(responeValue))}
                    </div>
                  </div>
                </>
              )}
              <CopyButton
                onClick={handleCopyText}
                className="absolute top-2 right-2"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
