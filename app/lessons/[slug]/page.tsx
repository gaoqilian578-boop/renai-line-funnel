import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CTABox } from "@/components/CTABox";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getLesson, lessons } from "@/lib/lessons";

export function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const nextLessons = lesson.nextSlugs.map(getLesson).filter(Boolean);

  return (
    <>
      <PageHeader eyebrow={`講座 ${lesson.id}`} title={lesson.title} description={lesson.description} />
      <Section className="pt-0">
        <article className="article-body mx-auto max-w-3xl">
          <div className="rounded-2xl bg-cream p-6">
            <h2 className="mt-0 text-xl">この講座でわかること</h2>
            <ul>{lesson.learn.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>

          <h2>はじめに</h2>
          <p>恋愛中のLINEは、短い一文なのに心を大きく揺らします。返事が遅いだけで不安になったり、送る前に何度も見返したり、あとから「少し重かったかな」と考えたり。けれど、その不安はあなたが弱いからではありません。大切にしたい関係があるからこそ、言葉を慎重に選ぼうとしているだけです。</p>
          <p>この講座では、今の気持ちを否定せず、相手に届きやすい形へ整えることを目指します。強い恋愛テクニックではなく、夜にスマホで読み返して、少し呼吸が戻るような実用的な考え方と例文をまとめました。</p>

          {lesson.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}

          <div className="mt-10 rounded-2xl bg-blush p-6">
            <h2 className="mt-0 text-xl">そのまま使えるLINE例文</h2>
            <ul>{lesson.examples.map((example) => <li key={example}>{example}</li>)}</ul>
          </div>

          <div className="mt-8 rounded-2xl bg-cream p-6">
            <h2 className="mt-0 text-xl">今日からできる小さな行動</h2>
            <ul>{lesson.actions.map((action) => <li key={action}>{action}</li>)}</ul>
          </div>

          <div className="mt-8 rounded-2xl border border-[#f0dfd7] bg-white p-6">
            <h2 className="mt-0 text-xl">次に読むおすすめ講座</h2>
            <div className="mt-4 grid gap-3">
              {nextLessons.map((next) => next ? <Button key={next.slug} href={`/lessons/${next.slug}`} variant="ghost" className="justify-start text-left">{next.id}. {next.title}</Button> : null)}
            </div>
          </div>

          <div className="mt-8 grid gap-5">
            <CTABox title="今夜送る前に整える" description="迷っているLINEがあるなら、100円ミニ講座で送る前のチェックと例文を見返せます。" primaryHref="/mini" primaryLabel="100円ミニ講座を見る" secondaryHref="/column" secondaryLabel="980円コラムを見る" />
            <CTABox title="状況に合わせて相談する" description="3ヶ月で追いすぎずに距離を縮める流れを、LINEでも案内しています。" primaryHref="/line" primaryLabel="LINEを見る" />
          </div>
        </article>
      </Section>
    </>
  );
}
