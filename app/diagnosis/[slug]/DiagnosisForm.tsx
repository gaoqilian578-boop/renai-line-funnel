"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import type { Diagnosis } from "@/lib/diagnoses";
import { getDiagnosisType } from "@/lib/diagnoses";

export function DiagnosisForm({ diagnosis }: { diagnosis: Diagnosis }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(diagnosis.questions.length).fill(0));
  const score = useMemo(() => answers.reduce((sum, point) => sum + point, 0), [answers]);
  const complete = answers.every(Boolean);

  const submit = () => {
    if (!complete) return;
    const type = getDiagnosisType(diagnosis, score, answers);
    localStorage.setItem("latestDiagnosisResult", JSON.stringify({
      diagnosisSlug: diagnosis.slug,
      diagnosisTitle: diagnosis.title,
      typeName: type.name,
      typeCode: type.code,
      score,
      answers,
      savedAt: new Date().toISOString(),
    }));
    router.push("/diagnosis/result");
  };

  return (
    <Section className="pt-0">
      <div className="mx-auto grid max-w-3xl gap-5">
        {diagnosis.questions.map((question, index) => (
          <Card key={question.text}>
            <p className="text-sm font-bold text-roseSoft">Q{index + 1}</p>
            <h2 className="mt-2 text-lg font-bold leading-8">{question.text}</h2>
            <div className="mt-4 grid gap-3">
              {question.choices.map((choice) => (
                <label key={choice.label} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 leading-7 ${answers[index] === choice.point ? "border-roseSoft bg-blush" : "border-[#f0dfd7] bg-white"}`}>
                  <input
                    type="radio"
                    name={`q-${index}`}
                    className="h-4 w-4 accent-roseSoft"
                    checked={answers[index] === choice.point}
                    onChange={() => setAnswers((prev) => prev.map((value, i) => (i === index ? choice.point : value)))}
                  />
                  <span>{choice.label}</span>
                </label>
              ))}
            </div>
          </Card>
        ))}
        <Button onClick={submit} disabled={!complete} className="w-full disabled:cursor-not-allowed disabled:opacity-40">
          {diagnosis.slug === "love-line-type" ? "診断して恋愛キャラを見る" : "結果を見る"}
        </Button>
      </div>
    </Section>
  );
}
