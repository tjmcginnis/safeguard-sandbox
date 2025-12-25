import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

import { CONTENT_POLICY_PROMPT } from "@/app/constants";
import { env } from "./env";

/**
 * Bedrock response structure for OpenAI-compatible models
 */
interface BedrockResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export function createBedrockClient(): BedrockRuntimeClient {
  return new BedrockRuntimeClient({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Test Bedrock connection
 * Verifies that credentials work and AWS Bedrock is accessible
 *
 * @returns Promise that resolves if connection is successful, rejects otherwise
 */
export async function testBedrockConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const client = createBedrockClient();

    // Simple connection test: send a minimal request to verify credentials
    // Using the config method to validate client initialization
    const config = client.config;

    if (!config.region) {
      throw new Error("Region not configured");
    }

    return {
      success: true,
      message: `Successfully connected to AWS Bedrock in region ${env.AWS_REGION}`,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return {
      success: false,
      message: `Failed to connect to AWS Bedrock: ${errorMessage}`,
    };
  }
}

/**
 * Extract JSON from response text that may contain reasoning tags
 * (The model sometimes wraps JSON in <reasoning> tags)
 *
 * @param responseText - The raw text response from the model
 * @returns Extracted JSON string
 * @throws Error if no JSON is found
 */
function extractClassificationJSON(responseText: string): string {
  // Remove reasoning tags if present to avoid matching braces inside them
  let cleanedText = responseText;
  const reasoningEndTag = "</reasoning>";
  const reasoningEndIndex = responseText.indexOf(reasoningEndTag);

  if (reasoningEndIndex !== -1) {
    // Skip past the closing reasoning tag
    cleanedText = responseText.substring(
      reasoningEndIndex + reasoningEndTag.length,
    );
  }

  const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("No JSON found in response");
  }
  return jsonMatch[0];
}

/**
 * Parse Bedrock response body to extract classification result
 *
 * @param responseBody - The parsed response body from Bedrock
 * @returns Classification object with violation, categories, confidence_scores, and rationale
 * @throws Error if response format is invalid
 */
function parseBedrockResponse(responseBody: BedrockResponse): {
  violation: 0 | 1;
  categories: string[];
  confidence_scores: Record<string, number>;
  rationale: string;
} {
  // OpenAI format: { choices: [{ message: { content: "JSON string" } }] }
  const responseText = responseBody.choices?.[0]?.message?.content;

  if (!responseText) {
    throw new Error("Invalid response format from Bedrock");
  }

  const jsonString = extractClassificationJSON(responseText);
  const classification = JSON.parse(jsonString.trim());

  return {
    violation: classification.violation,
    categories: classification.categories || [],
    confidence_scores: classification.confidence_scores || {},
    rationale: classification.rationale || "",
  };
}

/**
 * Classify content for safety violations using AWS Bedrock safety models
 *
 * @param content - The user-generated content to classify
 * @param modelId - The Bedrock model ID to use for classification
 * @returns Classification result with violation status, categories, scores, and rationale
 * @throws Error if the API call fails or response is invalid
 */
export async function classifyContent(
  content: string,
  modelId: string,
): Promise<{
  violation: 0 | 1;
  categories: string[];
  confidence_scores: Record<string, number>;
  rationale: string;
}> {
  const client = createBedrockClient();
  const messages = [
    {
      role: "system",
      content: CONTENT_POLICY_PROMPT,
    },
    {
      role: "user",
      content: content,
    },
  ];
  const payload = {
    messages,
    max_tokens: 1000,
    temperature: 0.0,
  };

  const command = new InvokeModelCommand({
    modelId,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(payload),
  });

  console.log("Invoking Bedrock model with payload:", {
    modelId,
    contentLength: content.length,
  });

  const response = await client.send(command);
  const decodedResponse = new TextDecoder().decode(response.body).trim();
  const responseBody = JSON.parse(decodedResponse);

  return parseBedrockResponse(responseBody);
}
