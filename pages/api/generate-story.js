// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import OpenAI from "openai";
import dotenv from "dotenv";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
// dotenv.config({ path: "../api/.env.local" }); // Adjust the path as needed


const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: key
});
const openai = new OpenAIApi(configuration);


export const runtime = 'edge'; 

export default async function handler(req, res) {

  const { imageUrl, input } = await req.json();

  console.log("Input: " + input);
  console.log(imageUrl);

  const goldenUserStory = `
    Based on this image/screenshot, generate a user story following the below format and output should be embedded in html tags beginning with <div> tag ${
      input && "context of this screenshot is" + input
    }
    Write User story in format: As a ..., I want ..., so that ...

    Write short summary: Explanation summarizing the purpose of the user story.

    Write a list of pre-conditions: List conditions required for the scenario

    Write a list of Acceptance Criteria: Write the acceptance criteria and be as detailed and as accurate as possible. Take into account visuals, text, call to action, icons and other features.
  
    Write a list of analytics: list ideas what can be tracked for analytics

    Write a list of technical Brieffing: list of Technical specifications or API endpoints used and 200 and 400 Response formats and expected data
  `;

  if (imageUrl) {
      const response = await openai.createChatCompletion({
        model: "gpt-4-vision-preview",
        max_tokens: 1000,
        stream: true,
        messages: [
          {role: "system", content: "You are a product manager."},
          {
            role: "user",
            content: [
              {
                type: "text",
                text: goldenUserStory,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      }, { responseType: "stream" });
      
      const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);


  } else {
    console.log("Error: Please provide an image");
    res.end("Please provide an image");
  }
};
