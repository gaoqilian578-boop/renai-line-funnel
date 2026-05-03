"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABox } from "@/components/CTABox";
import { Section } from "@/components/Section";
import { diagnoses, getDiagnosisType } from "@/lib/diagnoses";
import { lessons } from "@/lib/lessons";

type SavedResult = {
  diagnosisSlug: string;
  diagnosisTitle: string;
  typeName: string;
  typeCode?: string;
  score: number;
  answers?: number[];
  savedAt: string;
};

export function ResultClient() {
  const [result, setResult] = useState<SavedResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("latestDiagnosisResult");
    setResult(raw ? JSON.parse(raw) : null);
    setLoaded(true);
  }, []);

  const detail = useMemo(() => {
    if (!result) return null;
    const diagnosis = diagnoses.find((item) => item.slug === result.diagnosisSlug);
    if (!diagnosis) return null;
    const type = diagnosis.types.find((item) => item.code === result.typeCode || item.name === result.typeName) ?? getDiagnosisType(diagnosis, result.score, result.answers);
    return { diagnosis, type, recommended: lessons.filter((lesson) => type.lessonIds.includes(lesson.id)) };
  }, [result]);

  if (!loaded) return null;

  if (!detail || !result) {
    return (
      <Section className="pt-0">
        <Card className="mx-auto max-w-2xl">
          <h2 className="text-xl font-bold">まだ診断結果がありません</h2>
          <p className="mt-3 leading-8 text-muted">気になる診断を受けると、ここに最新の結果が表示されます。</p>
          <Button href="/diagnosis" className="mt-6 w-full">診断ページへ戻る</Button>
        </Card>
      </Section>
    );
  }

  return (
    <Section className="pt-0">
      <div className="mx-auto grid max-w-3xl gap-5">
        <Card className="p-6 text-center sm:p-8">
          <p className="text-sm font-bold text-roseSoft">あなたの恋愛LINEタイプは…</p>
          <p className="mt-5 text-5xl font-black tracking-normal text-ink sm:text-6xl">{detail.type.code ?? detail.type.name}</p>
          {detail.type.characterName ? <h2 className="mt-3 text-3xl font-black leading-10">{detail.type.characterName}</h2> : null}
          <p className="mt-3 text-xl font-bold leading-9 text-ink">{detail.type.title ?? detail.type.name}</p>
        </Card>

        <Card>
          <p className="text-sm font-bold text-roseSoft">{detail.diagnosis.title}</p>
          <div className="mt-5 grid gap-4">
            <Info title="特徴" body={detail.type.features} />
            <Info title="一言" body={detail.type.message ?? detail.type.goodSide} />
            <Info title="恋愛LINEで起きやすいこと" body={detail.type.lineTrouble ?? detail.type.todo} />
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold">おすすめ講座</h2>
          <div className="mt-4 grid gap-3">
            {detail.recommended.map((lesson) => (
              <Button key={lesson.slug} href={`/lessons/${lesson.slug}`} variant="ghost" className="justify-start text-left">
                {lesson.id}. {lesson.title}
              </Button>
            ))}
          </div>
        </Card>

        <CTABox title="100円ミニ講座" description="今夜すぐ送るか迷っているLINEがあるなら、まずは短い講座で言葉を整えてみてください。" primaryHref="/mini" primaryLabel="100円ミニ講座を見る" />
        <CTABox title="980円コラム" description="自分の不安の癖や、関係を進めるLINEの作り方をもう少し深く整理したい人向けです。" primaryHref="/column" primaryLabel="980円コラムを見る" />
        <CTABox title="LINE登録" description="ひとりで抱え込まず、今の状況に合わせて読み返せるヒントを受け取りたい時はこちらへ。" primaryHref="/line" primaryLabel="LINE登録を見る" />
      </div>
    </Section>
  );
}

function Info({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-cream p-4">
      <p className="font-bold">{title}</p>
      <p className="mt-2 leading-8 text-muted">{body}</p>
    </div>
  );
}
