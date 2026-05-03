"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABox } from "@/components/CTABox";
import { Section } from "@/components/Section";
import { diagnoses, getDiagnosisType } from "@/lib/diagnoses";
import { lessons } from "@/lib/lessons";
import { getLoveCharacter } from "@/lib/loveCharacters";

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
    const character = diagnosis.slug === "love-line-type" ? getLoveCharacter(type.code) : undefined;
    return { diagnosis, type, character, recommended: lessons.filter((lesson) => type.lessonIds.includes(lesson.id)) };
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
        {detail.character ? (
          <LoveCharacterResultCard character={detail.character} />
        ) : (
          <Card className="p-6 text-center sm:p-8">
            <p className="text-sm font-bold text-roseSoft">あなたの結果は…</p>
            <p className="mt-5 text-5xl font-black tracking-normal text-ink sm:text-6xl">{detail.type.code ?? detail.type.name}</p>
            {detail.type.characterName ? <h2 className="mt-3 text-3xl font-black leading-10">{detail.type.characterName}</h2> : null}
            <p className="mt-3 text-xl font-bold leading-9 text-ink">{detail.type.title ?? detail.type.name}</p>
          </Card>
        )}

        {detail.character ? (
          <Card className="bg-[#fffaf7]">
            <p className="leading-8 text-muted">
              よかったらこの結果、スクショして保存しておいてください。<br />
              返信待ちで不安になった夜に、少し戻ってこれます。
            </p>
            <p className="mt-4 leading-8 text-muted">
              ストーリーで共有するなら、<br />
              「私これだった」くらいの軽さで大丈夫です。
            </p>
            <p className="mt-4 rounded-xl bg-white p-4 leading-8 text-muted ring-1 ring-[#f0dfd7]">
              診断結果は、正解・不正解ではありません。<br />
              あなたの恋愛を少しラクに見るためのメモです。
            </p>
          </Card>
        ) : null}

        <Card>
          <p className="text-sm font-bold text-roseSoft">{detail.diagnosis.title}</p>
          <div className="mt-5 grid gap-4">
            <Info title="特徴" body={detail.type.features} />
            <Info title="一言" body={detail.type.message ?? detail.type.goodSide} />
            <Info title="LINEで出やすいクセ" body={detail.type.lineTrouble ?? detail.type.todo} />
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

        {detail.character ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Button href={`/types/${detail.character.code}`} variant="secondary">このキャラを詳しく見る</Button>
            <Button href="/mini" variant="ghost">100円LINE整理メモを見る</Button>
            <Button href="/column" variant="ghost">場面別の例文を見る</Button>
            <Button href="/line" variant="ghost">LINEで恋の道標を見る</Button>
          </div>
        ) : (
          <>
            <CTABox title="100円ミニ講座" description="今夜すぐ送るか迷っているLINEがあるなら、まずは短い講座で言葉を整えてみてください。" primaryHref="/mini" primaryLabel="100円ミニ講座を見る" />
            <CTABox title="980円コラム" description="自分の不安の癖や、関係を進めるLINEの作り方をもう少し深く整理したい人向けです。" primaryHref="/column" primaryLabel="980円コラムを見る" />
            <CTABox title="LINE登録" description="ひとりで抱え込まず、今の状況に合わせて読み返せるヒントを受け取りたい時はこちらへ。" primaryHref="/line" primaryLabel="LINE登録を見る" />
          </>
        )}
      </div>
    </Section>
  );
}

function LoveCharacterResultCard({ character }: { character: NonNullable<ReturnType<typeof getLoveCharacter>> }) {
  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[2rem] bg-[#f8e6e8] p-3 shadow-soft">
      <div className="rounded-[1.5rem] bg-[#fffdf9] p-7 text-center ring-1 ring-white/80 sm:p-9">
        <p className="text-xs font-bold tracking-[0.18em] text-roseSoft">恋愛キャラ診断</p>
        <p className="mt-5 text-sm font-bold text-muted">あなたの恋愛キャラは…</p>
        <p className="mt-5 text-5xl font-black tracking-normal text-ink sm:text-6xl">{character.code}</p>
        <h2 className="mt-4 text-4xl font-black leading-tight text-ink">{character.name}</h2>
        <p className="mx-auto mt-4 max-w-[18rem] text-xl font-bold leading-9 text-ink">{character.title}</p>
        <div className="mx-auto my-6 h-px w-16 bg-[#e9a8b2]" />
        <p className="text-left text-base font-bold leading-8 text-[#4a4442]">{character.catchCopy}</p>
      </div>
    </div>
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
