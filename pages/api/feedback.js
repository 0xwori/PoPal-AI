const { OpenAI } = require("openai");
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
  console.log(req)
  const { content, input } = await req.json();
  console.log(content);
  console.log(input);

  let object = {
    "type": "",
    "system-prompt": "",
    "system-user": "",
  };

  switch (content) {
    case "developer":
      object = {
        "type": "Developer",
        "system-prompt": "Give general feedback and give a bullet-list action feedback, where only short statements the change and matching line number",
        "system-user": "Could you give me feedback on my User Story as a Developer. Look if the acceptance criteria is clear, and give feedback on the technical brief",
      };
      console.log("Developer");
      break;
    case "sr-product-manager":
      object = {
        "type": "Senior Product Manager",
        "system-prompt": "Give general feedback and give a bullet-list action feedback, where only short statements the change and matching line number",
        "user-prompt": "Could you give me feedback on my User Story. Check the following: Typos, General improvements on the User Story, If tags are correct and corresponding with the acceptance criteria.",
      };
      console.log("Senior Product Manager");
      break;
    default:
      console.log("Unknown content type");
      break;
  }

  if (content && input) {

    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo-preview",
      stream: true,
      temperature: 0.7, // Controls the randomness of the response
      messages:  [
        {
          role: "system",
          content: `You are a helpful ${object["type"]} that gives feedback on User Stories and designed to output in html format and begin with <div> tag.`,
        },
        {
          role: "system",
          content: object["system-prompt"],
        },
        { 
          role: "user", 
          content: `${object["user-prompt"]} This is my User Story: ${input}` 
        },
      ],
    }, { responseType: "stream" });
    
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

    // const completion = await openai.chat.completions.create({
    //   temperature: 0.7,
    //   messages: [
    //     {
    //       role: "system",
    //       content: `You are a helpful ${object["type"]} that gives feedback on User Stories and designed to output in Markdown format.`,
    //     },
    //     {
    //       role: "system",
    //       content: object["system-prompt"],
    //     },
    //     { 
    //       role: "user", 
    //       content: `${object["user-prompt"]} This is my User Story: ${input}` 
    //     },
    //   ],
    //   model: "gpt-4-turbo-preview",
    // });

    // const answer = completion.choices[0].message.content;

    // res.status(200).json({ content: object["type"], answer });
  }
}
