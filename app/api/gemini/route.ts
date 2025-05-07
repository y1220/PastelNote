import { GoogleGenerativeAI } from "@google/generative-ai";
import logger from "@/lib/logger";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

logger.info("Gemini API initialized");

export async function POST(req: Request) {
  try {
    logger.info("Gemini API POST request received");
    const { prompt, type } = await req.json();

    let systemPrompt = "";

    switch (type) {
      case "summary":
        systemPrompt = "Summarize the following text concisely while preserving the key information:";
        break;
      case "diagram":
        systemPrompt =
          "Analyze the following text and suggest how to represent it as a graph diagram with nodes and relationships in Neo4j:";
        break;
      case "insight":
        systemPrompt =
          "Analyze the following text and provide insights, connections to other topics, and suggestions for further exploration:";
        break;
      default:
        systemPrompt = "Respond to the following query based on the provided context:";
    }

    logger.debug(`Processing ${type} request with prompt: ${prompt.substring(0, 50)}...`);

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
    const text = result.response.text();

    logger.info(`Gemini API request successful, returned ${text.length} characters`);
    return Response.json({ text });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Gemini API error: ${errorMessage}`);
    return Response.json({ error: "Failed to process with Gemini API" }, { status: 500 });
  }
}
