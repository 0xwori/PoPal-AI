// pages/api/generate-story-textual.js
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";


const key = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: key
});
const openai = new OpenAIApi(configuration);


export const runtime = 'edge'; 

export default async (req, res) => {

  try {
    const { userStory, input } = await req.json();

    const goldenUserStory = `
    Based on this info, generate a user story following the below format.  
    ${userStory.asA && userStory.asA}, ${userStory.iWant && userStory.iWant}, ${userStory.soThat && userStory.soThat},

    Write short summary: Explanation summarizing the purpose of the user story.

    Write a list of pre-conditions: List conditions required for the scenario

    Write a list of Acceptance Criteria: Write the acceptance criteria and be as detailed and as accurate as possible. Take into account visuals, text, call to action, icons and other features. Use a When-Then format in formulating the criteria, and indent the then format under when.
  
    Write a list of analytics: list ideas what can be tracked for analytics

    Write a list of technical Brieffing: list of Technical specifications or API endpoints used and 200 and 400 Response formats and expected data
  `;

    // const url = `https://bomi6nttd7.execute-api.eu-west-1.amazonaws.com/proxy4//openai/deployments/gpt-4-32k/chat/completions?api-version=2023-12-01-preview&api-key=35aec2b0666d417a86f2376b3eea1de1`;

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      max_tokens: 1000,
      stream: true,
      temperature: 0.7, // Controls the randomness of the response
      messages: [
        {role: "system", content: "You are a senior Product Manager, who write the best User Stories and designed to output in HTML format, starting with <div> tag."},
        {
          role: "user",
          content: [
            {
              type: "text",
              text: goldenUserStory,
            },
          ],
        },
      ],
    }, { responseType: "stream" });

    if (!response.ok) {
      const errorText = await response.text(); // Read the error response
      throw new Error(`Failed to fetch response from Azure OpenAI: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const stream = OpenAIStream(response);
      return new StreamingTextResponse(stream);

    
  } catch (error) {
    console.error('Error in API route:', error);
  }
};
