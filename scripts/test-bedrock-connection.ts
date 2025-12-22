/**
 * Test script for Bedrock connection
 * Run with: npx tsx scripts/test-bedrock-connection.ts
 */

import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(__dirname, "../.env.local") });

import { testBedrockConnection } from "../lib/bedrock";

async function main() {
  console.log("Testing AWS Bedrock connection...\n");

  const result = await testBedrockConnection();

  if (result.success) {
    console.log("✓ Connection test passed!");
    console.log(`  ${result.message}`);
    process.exit(0);
  } else {
    console.error("✗ Connection test failed!");
    console.error(`  ${result.message}`);
    process.exit(1);
  }
}

main();
