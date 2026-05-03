import { Button } from "@/components/Button";
import { CTABox } from "@/components/CTABox";
import { DiagnosisCard } from "@/components/DiagnosisCard";
import { LessonCard } from "@/components/LessonCard";
import { RoadmapStep } from "@/components/RoadmapStep";
import { Section } from "@/components/Section";
import { diagnoses } from "@/lib/diagnoses";
import { lessons } from "@/lib/lessons";

export default function Home() {
  return (
    <>
      <Section className="bg-gradient-to-b from-cream to-[#fffdf9] pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-bold text-roseSoft">恋愛LINEの不安を、送れる言葉まで整える場所</p>
          <h1 className="mt-4 text-4xl font-bold leading-[1.35] sm:text-5xl">返信が遅いだけで、何も手につかなくなる夜へ。</h1>
          <p className="mt-6 whitespace-pre-line text-lg leading-9 text-muted">
            何送ればいいかわからない。{"\n"}重いと思われたくない。{"\n"}でも、このまま終わるのも嫌。{"\n\n"}そんな恋愛LINEの不安を、診断・講座・ロードマップで{"\n"}“送れる言葉”まで整える場所です。
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Button href="/diagnosis">無料診断をはじめる</Button>
            <Button href="/mini" variant="secondary">100円ミニ講座を見る</Button>
            <Button href="/column" variant="ghost">980円コラムを見る</Button>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {["今の不安タイプを知る", "3ヶ月の順番で読む", "そのまま使える一文を持つ"].map((title, index) => (
            <div key={title} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-[#f0dfd7]">
              <p className="text-sm font-bold text-roseSoft">できること {index + 1}</p>
              <h2 className="mt-2 text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-8 text-muted">不安を否定せず、今の状況に合う読み物と行動へ進めます。</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-cream">
        <h2 className="text-2xl font-bold">5つの無料診断</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagnoses.map((diagnosis) => <DiagnosisCard key={diagnosis.slug} title={diagnosis.title} description={diagnosis.description} href={`/diagnosis/${diagnosis.slug}`} />)}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold">3ヶ月ロードマップ</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <RoadmapStep month="Month 1" title="不安を整える" description="返信待ちで崩れない土台を作り、送る前に気持ちと言葉を分けます。" lessons="1,2,3,4,5" />
          <RoadmapStep month="Month 2" title="距離を縮める" description="会話の再開、久しぶりLINE、デート後のやりとりを整えます。" lessons="6,7,8,9,10" />
          <RoadmapStep month="Month 3" title="関係を進める" description="自分を小さくせず、会う流れと次の一歩を作ります。" lessons="11,12,13,14,15" />
        </div>
      </Section>

      <Section className="bg-cream">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">15講座の一部紹介</h2>
          <Button href="/lessons" variant="ghost">一覧へ</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.slice(0, 6).map((lesson) => <LessonCard key={lesson.slug} {...lesson} />)}
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <CTABox title="返信が来ない夜に見る 100円LINE整理メモ" description="送る前に、いったんここで整えて。今夜の不安を小さく整えるスマホ用メモです。" primaryHref="/mini" primaryLabel="100円ミニ講座を見る" />
          <CTABox title="返信が遅い彼に、重くならず送るLINEの作り方" description="場面別に使える例文と、今日は送るか待つかの判断をまとめたコラムです。" primaryHref="/column" primaryLabel="980円コラムを見る" />
        </div>
      </Section>

      <Section className="bg-cream">
        <div className="grid gap-5 lg:grid-cols-2">
          <CTABox title="恋の道標" description="3ヶ月で彼を手に入れる 片思い革命プログラム。今の状況に合わせて一緒に整えます。" primaryHref="/line" primaryLabel="LINEを見る" />
          <CTABox title="夜に読み返す恋愛LINE便り" description="返信待ちで不安になった夜に、少し気持ちが整う話と例文を不定期で届けます。" primaryHref="/newsletter" primaryLabel="メルマガ登録へ" />
        </div>
      </Section>
    </>
  );
}
