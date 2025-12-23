export const modelOptions = [
  {
    value: "openai.gpt-oss-safeguard-20b",
    title: "GPT OSS Safeguard 20B",
    description: "Safety reasoning models built-upon gpt-oss.",
    current: true,
  },
  {
    value: "llama-guard-3-8B",
    title: "Llama Guard 3.1 8B (Coming Soon)",
    description:
      "Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification.",
    current: false,
    disabled: true,
  },
];

export const categoryCodeMappings: Record<string, string> = {
  H1: "Direct threats of violence",
  H2: "Hate speech targeting protected characteristics",
  H3: "Instructions for self-harm or suicide",
  P1: "Personal information (phone, email, address)",
  P2: "Government IDs, credit cards, credentials",
  I1: "Solicitation of illegal drugs, weapons, or services",
  I2: "Instructions for illegal activities",
};

export const CONTENT_POLICY_PROMPT = `INSTRUCTIONS: Classify user-generated comments for safety violations. Return JSON with: {"violation": 0 or 1, "categories": [array of category codes], "confidence_scores": {category: score}, "rationale": "explanation"}

DEFINITIONS:
- Harmful Content (H): Promotes violence, hate speech, harassment, or self-harm
- Personal Information (P): Contains PII like phone numbers, addresses, SSNs, credit cards
- Illegal Activity (I): Solicits, promotes, or describes illegal acts

VIOLATES:
H1: Direct threats of violence against individuals or groups (confidence: high if explicit)
H2: Hate speech targeting protected characteristics (race, religion, gender, etc.)
H3: Instructions for self-harm or suicide
P1: Full phone numbers, email addresses, physical addresses
P2: Government IDs, credit card numbers, credentials
I1: Solicitation of illegal drugs, weapons, or services
I2: Instructions for illegal activities

SAFE:
- News discussion, educational content, or historical references
- Redacted/partial PII (e.g., "call me at 555-...")
- Discussion of legal reform or policy debates

Return JSON with violation flag, category codes, confidence scores (0.0-1.0), and 2-4 sentence rationale.`;

export const MAX_CONTENT_LENGTH = 5000;
