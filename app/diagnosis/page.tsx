import { DiagnosisCard } from "@/components/DiagnosisCard";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { diagnoses } from "@/lib/diagnoses";

export default function DiagnosisIndex() {
  return (
    <>
      <PageHeader title="無料診断" description="今の恋愛のクセや不安を、少しラクに見られる形へ整理します。いちばん気になるものから始めて大丈夫です。" />
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagnoses.map((diagnosis) => <DiagnosisCard key={diagnosis.slug} title={diagnosis.title} description={diagnosis.description} href={`/diagnosis/${diagnosis.slug}`} />)}
        </div>
      </Section>
    </>
  );
}
