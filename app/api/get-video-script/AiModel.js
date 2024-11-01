const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
     export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate a 30 seconds video on topic : Interesting historical story along with AI image prompt in realistic format for each scene and give me results in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling medieval marketplace, filled with people, stalls selling wares, and a prominent sign reading \\\"The Black Death\\\"\",\n    \"ContentText\": \"In the 14th century, Europe was gripped by a terrifying pandemic: the Black Death.  A disease that swept across the continent, wiping out millions and leaving a lasting impact on history.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up of a person's face, covered in boils and sores, with a look of agony\",\n    \"ContentText\": \"The plague was merciless, causing fever, chills, and painful buboes – swollen lymph nodes – all over the body.\"\n  },\n  {\n    \"imagePrompt\": \"A grim, shadowy scene of people dying in the streets, their bodies being collected in carts\",\n    \"ContentText\": \"The death toll was staggering. Cities were deserted, families were shattered, and the fear of the disease gripped everyone.\"\n  },\n  {\n    \"imagePrompt\": \"A scene of a physician in a long, feathered mask, holding a stick with a cloth wrapped around it, examining a patient\",\n    \"ContentText\": \"Doctors, wearing long, beak-shaped masks stuffed with herbs, tried desperately to treat the sick. But their efforts were largely futile.\"\n  },\n  {\n    \"imagePrompt\": \"A beautiful, sunny scene of fields and a village, with people working and laughing, signifying life going on\",\n    \"ContentText\": \"Despite the devastating impact, life did go on.  Communities rebuilt, and society adapted to the new realities.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up of a hand holding a small, leather-bound book, the page open to reveal text about medicine and disease\",\n    \"ContentText\": \"The Black Death left a legacy of fear and caution, but it also led to advancements in medicine, public health, and our understanding of disease.\"\n  }\n]\n```\n\n**Explanation:**\n\n* **imagePrompt:**  Each entry contains a descriptive prompt for an AI image generator like DALL-E 2 or Midjourney. \n* **ContentText:** This field provides the corresponding narration or text that would accompany the generated image in the video.\n\n**How to use this JSON:**\n\n1. **Generate Images:** Use the image prompts in each entry to generate images using your preferred AI tool.\n2. **Edit Images:** If needed, edit the images to enhance their quality or to make them more visually appealing for your video.\n3. **Create Video:** Use a video editing software to combine the images and audio narration (based on the ContentText) to create your 30-second video.\n\n**Note:**\n\n* This script is designed to be a starting point. You can adjust the image prompts and content text to suit your specific vision and creative direction.\n* Consider using a voiceover artist or text-to-speech software for a professional-sounding narration.\n* Explore different styles of animation or transitions to add visual interest to your video. \n"},
          ],
        },
      ],
    });