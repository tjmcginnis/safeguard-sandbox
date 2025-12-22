const requiredEnvVars = [
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
] as const;

type RequiredEnvVar = (typeof requiredEnvVars)[number];

function validateEnv(): Record<RequiredEnvVar, string> {
  const missing: string[] = [];
  const env: Record<string, string> = {};

  for (const varName of requiredEnvVars) {
    const value = process.env[varName];
    if (!value) {
      missing.push(varName);
    } else {
      env[varName] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        `Please ensure these are set in your .env.local file.`
    );
  }

  return env as Record<RequiredEnvVar, string>;
}

let cachedEnv: Record<RequiredEnvVar, string> | null = null;

export const env = new Proxy({} as Record<RequiredEnvVar, string>, {
  get(_target, prop: string) {
    if (!cachedEnv) {
      cachedEnv = validateEnv();
    }
    return cachedEnv[prop as RequiredEnvVar];
  },
});
