// pages/api/generate-story-textual.js

export default async (req, res) => {
  try {
    const { userStory, input } = req.body;

    const goldenUserStory = `
    Based on this info, generate a user story following the below format.  
    ${userStory.asA && userStory.asA}, ${userStory.iWant && userStory.iWant}, ${userStory.soThat && userStory.soThat}, ${input && input},

    Write short summary: Explanation summarizing the purpose of the user story.

    Write a list of pre-conditions: List conditions required for the scenario

    Write a list of Acceptance Criteria: Write the acceptance criteria and be as detailed and as accurate as possible. Take into account visuals, text, call to action, icons and other features.
  
    Write a list of analytics: list ideas what can be tracked for analytics

    Write a list of technical Brieffing: list of Technical specifications or API endpoints used and 200 and 400 Response formats and expected data
  `;

    const url = `https://bomi6nttd7.execute-api.eu-west-1.amazonaws.com/proxy4//openai/deployments/gpt-4-32k/chat/completions?api-version=2023-12-01-preview&api-key=35aec2b0666d417a86f2376b3eea1de1`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messages": [
          {
            "role": "system",
            "content": "You are a senior Product Manager, who write the best User Stories and designed to output in HTML format, starting with <div> tag."
          },
          {
            "role": "user",
            "content": goldenUserStory
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Read the error response
      throw new Error(`Failed to fetch response from Azure OpenAI: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const responseData = await response.json();
    res.status(200).json(responseData.choices[0]?.message?.content);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: error.message });
  }
};
