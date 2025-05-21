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
          "Analyze the following text and provide insights concisely, connections to other topics, and suggestions for further exploration:";
        break;
      default:
        systemPrompt = "Respond to the following query based on the provided context:";
    }

    logger.debug(`Processing ${type} request with prompt: ${prompt.substring(0, 50)}...`);

    // Get the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate content
    const result = await model.generateContent(`${systemPrompt}\n\n${prompt}`);
    let text = result.response.text();

    // Replace **xxxx** and 'then xxxx' with <b>xxxx</b>
    // 1. Markdown bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // 2. 'then xxxx' at the start of a line or after a period/colon
    text = text.replace(/(?:^|[\.:])\s*then ([A-Z][^\n\r]*)/g, (match, p1) => {
      return match.replace('then ' + p1, '<b>' + p1.trim() + '</b>');
    });
    // 3. Convert single '*' at line start to <li> and wrap in <ul>
    // First, split into lines
    const lines = text.split(/\r?\n/);
    let inList = false;
    let html = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*\*\s+/.test(line)) {
        if (!inList) {
          html += '<ul style="margin:0 0 0 1.2em; padding:0">';
          inList = true;
        }
        html += '<li>' + line.replace(/^\s*\*\s+/, '') + '</li>';
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += line + '\n';
      }
    }
    if (inList) html += '</ul>';
    text = html;

    logger.info(`Gemini API request successful, returned ${text.length} characters`);
    return Response.json({ text });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error(`Gemini API error: ${errorMessage}`);
    return Response.json({ error: "Failed to process with Gemini API" }, { status: 500 });
  }
}
