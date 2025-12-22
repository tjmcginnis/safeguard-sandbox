# Safeguard Sandbox

## Prerequisites

- AWS service account with access to AWS Bedrock
- AWS credentials with IAM permissions to invoke Bedrock models

## Environment Setup

### 1. Configure Environment Variables

Create a `.env.local` file in the project root with your AWS credentials:

```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

**Important**: Never commit `.env.local` to version control. This file is already in `.gitignore`.

### 2. Test Your Connection

Run the Bedrock connection test to verify your credentials:

```bash
pnpm test:bedrock
```

You should see:
```
✓ Connection test passed!
  Successfully connected to AWS Bedrock in region us-east-1
```

If the test fails, verify:
- Your `.env.local` file exists and contains all three required variables
- Your AWS credentials are valid
- Your AWS region supports the GPT-OSS-Safeguard model

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
