import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { getDiagnosis } from "@/lib/diagnoses";
import { DiagnosisForm } from "../[slug]/DiagnosisForm";

export default function LoveLineTypePage() {
  const diagnosis = getDiagnosis("love-line-type");
  if (!diagnosis) notFound();

  return (
    <>
      <PageHeader title={diagnosis.title} description={`${diagnosis.description}\n各質問に、今の気持ちに近いものを選んでください。`} eyebrow="無料診断" />
      <DiagnosisForm diagnosis={diagnosis} />
    </>
  );
}
