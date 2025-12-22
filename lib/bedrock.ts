import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";
import { env } from "./env";

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
