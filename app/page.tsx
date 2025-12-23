"use client";

import { useActionState } from "react";

import { createEval } from "@/app/actions";
import ClassificationRationale from "@/app/components/classification-rationale";
import ContentEvaluationForm from "@/app/components/content-evaluation-form";
import SafetyClassification from "@/app/components/safety-classification";

const initialState = {
  errors: {},
};

export default function Home() {
  const [state, formAction, pending] = useActionState(createEval, initialState);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="h-full sm:grow xs:flex-col sm:flex">
        <div className="h-1/2 sm:h-full mx-auto sm:w-1/2 p-2">
          <ContentEvaluationForm
            formAction={formAction}
            pending={pending}
            state={state}
          />
        </div>
        <div className="mx-auto sm:w-1/2 p-2">
          <div className="h-full relative flex flex-col">
            <SafetyClassification
              violation={state.classification?.violation ?? null}
              categories={state.classification?.categories ?? []}
              confidenceScores={state.classification?.confidence_scores ?? {}}
              loading={pending}
            />
            <ClassificationRationale
              rationale={state.classification?.rationale ?? null}
              loading={pending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
