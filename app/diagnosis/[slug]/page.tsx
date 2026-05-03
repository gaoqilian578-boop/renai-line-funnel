import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { diagnoses, getDiagnosis } from "@/lib/diagnoses";
import { DiagnosisForm } from "./DiagnosisForm";

export function generateStaticParams() {
  return diagnoses.map((diagnosis) => ({ slug: diagnosis.slug }));
}

export default async function DiagnosisPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const diagnosis = getDiagnosis(slug);
  if (!diagnosis) notFound();

  return (
    <>
      <PageHeader title={diagnosis.title} description={`${diagnosis.description}\n各質問に、今の気持ちに近いものを選んでください。`} eyebrow="無料診断" />
      <DiagnosisForm diagnosis={diagnosis} />
    </>
  );
}
