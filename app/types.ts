export type EvalState = {
  content?: string;
  model?: string;
  classification?: {
    violation: 0 | 1;
    categories: string[];
    confidence_scores: Record<string, number>;
    rationale: string;
  };
  errors?: Record<string, string | string[]>;
};
