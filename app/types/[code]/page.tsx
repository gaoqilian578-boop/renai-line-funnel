import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { CTABox } from "@/components/CTABox";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { lessons } from "@/lib/lessons";
import { getCharacterHref, getLoveCharacter, loveCharacters } from "@/lib/loveCharacters";

export function generateStaticParams() {
  return loveCharacters.flatMap((character) => [{ code: character.displayCode.toLowerCase() }, { code: character.code }]);
}

export default async function TypeDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const character = getLoveCharacter(code.toUpperCase());
  if (!character) notFound();

  const recommended = lessons.filter((lesson) => character.recommendedLessons.includes(lesson.id));

  return (
    <>
      <PageHeader
        eyebrow="恋愛キャラ診断"
        title={"あなたのキャラ詳細"}
        description={`${character.displayCode} / ${character.characterLabel}\n${character.title}`}
      />
      <Section className="pt-0">
        <div className="mx-auto grid max-w-3xl gap-5">
          <Card className="bg-[#fffaf7] text-center">
            <p className="text-5xl font-black tracking-normal text-ink">{character.displayCode}</p>
            <h1 className="mt-4 text-4xl font-black leading-tight">{character.characterLabel}</h1>
            <p className="mt-3 text-xl font-bold leading-9">{character.title}</p>
            <p className="mx-auto mt-5 max-w-xl rounded-2xl bg-blush p-5 text-left font-bold leading-8 text-ink">{character.emotionalCopy}</p>
            <p className="mx-auto mt-4 max-w-xl leading-8 text-muted">{character.nightCopy}</p>
          </Card>

          <InfoCard title="あなたの恋愛の特徴" body={character.lovePattern} />
          <InfoCard title="LINEで出やすいクセ" body={character.linePattern} />
          <InfoCard title="返信待ちで起きやすいこと" body={character.anxietyPattern} />
          <InfoCard title="送る前に気をつけたいこと" body={character.beforeSendCheck} />

          <ListCard title="そのまま使えるLINE例文" items={character.okExamples} tone="ok" />
          <ListCard title="やめた方がいいLINE" items={character.ngExamples} tone="ng" />
          <ListCard title="あなたに合う3ヶ月ロードマップ" items={character.roadmap} tone="roadmap" />
          <CompatibilitySection character={character} />
          <ShareTemplateSection character={character} />

          <Card>
            <h2 className="text-xl font-bold">おすすめ講座</h2>
            <p className="mt-3 leading-8 text-muted">{character.ctaText}</p>
            <div className="mt-4 grid gap-3">
              {recommended.map((lesson) => (
                <Button key={lesson.slug} href={`/lessons/${lesson.slug}`} variant="ghost" className="justify-start text-left">
                  {lesson.id}. {lesson.title}
                </Button>
              ))}
            </div>
          </Card>

          <CTABox title="100円ミニ講座" description="今夜送るか迷っているLINEを、短いメモでいったん整えたい人へ。" primaryHref="/mini" primaryLabel="100円ミニ講座を見る" />
          <CTABox title="980円コラム" description="場面別の例文や、送る・待つの判断をもう少し深く読みたい人へ。" primaryHref="/column" primaryLabel="980円コラムを見る" />
          <CTABox title="LINE登録" description="ひとりで抱え込まず、今の状況に合わせて読み返せるヒントを受け取りたい時はこちらへ。" primaryHref="/line" primaryLabel="LINEで恋の道標を見る" />
          <CTABox title="メルマガ" description="返信待ちで不安になった夜に、少し気持ちが整う話と例文を不定期で届けます。" primaryHref="/newsletter" primaryLabel="メルマガ登録へ" />

          <Card className="bg-[#fffaf7]">
            <p className="leading-8 text-muted">
              このページも、あとで見返せるように保存しておいてください。<br />
              夜に不安が戻ってきた時、送る前の一呼吸になります。
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}

function CompatibilitySection({ character }: { character: NonNullable<ReturnType<typeof getLoveCharacter>> }) {
  return (
    <Card className="scroll-mt-24" id="compatibility">
      <h2 className="text-xl font-bold">相性メモ</h2>
      <p className="mt-3 leading-8 text-muted">{character.compatibility.description}</p>
      <div className="mt-5 grid gap-4">
        <CompatibilityGroup title="相性がラクなキャラ" codes={character.compatibility.easy} />
        <CompatibilityGroup title="一緒に成長しやすいキャラ" codes={character.compatibility.growth} />
        <CompatibilityGroup title="少し気をつけたいキャラ" codes={character.compatibility.careful} />
      </div>
      <p className="mt-4 rounded-xl bg-cream p-4 leading-8 text-muted">
        相性は「うまくいく・いかない」を決めるものではありません。不安の出方が噛み合いやすいか、すれ違いやすいかを見るための小さなメモです。
      </p>
    </Card>
  );
}

function CompatibilityGroup({ title, codes }: { title: string; codes: string[] }) {
  return (
    <div className="rounded-xl bg-[#fffaf7] p-4 ring-1 ring-[#f0dfd7]">
      <p className="font-bold">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {codes.map((code) => {
          const character = getLoveCharacter(code);
          return character ? (
            <Button key={code} href={getCharacterHref(character)} variant="ghost" className="min-h-10 px-3 py-2 text-xs">
              {code} {character.characterLabel}
            </Button>
          ) : null;
        })}
      </div>
    </div>
  );
}

function ShareTemplateSection({ character }: { character: NonNullable<ReturnType<typeof getLoveCharacter>> }) {
  return (
    <Card>
      <h2 className="text-xl font-bold">投稿に使えるひとこと</h2>
      <p className="mt-3 leading-8 text-muted">この文章を投稿の参考にしてOKです。ストーリーに載せる時は、スクショして短く使って大丈夫。</p>
      <div className="mt-5 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-[#f0dfd7]">
        <p className="text-sm font-black tracking-normal text-roseSoft">{character.shareTemplate.title}</p>
        <p className="mt-4 whitespace-pre-line text-lg font-bold leading-9 text-ink">{character.shareTemplate.body}</p>
        <p className="mt-5 rounded-xl bg-cream p-4 leading-8 text-muted">{character.shareTemplate.saveText}</p>
        <p className="mt-4 text-sm font-bold text-roseSoft">{character.shareTemplate.cta}</p>
      </div>
      <Button href="/share-templates" variant="ghost" className="mt-5 w-full">全キャラの投稿テンプレを見る</Button>
    </Card>
  );
}

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <Card>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-3 leading-8 text-muted">{body}</p>
    </Card>
  );
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: "ok" | "ng" | "roadmap" }) {
  const bg = tone === "ok" ? "bg-[#fffaf7]" : tone === "ng" ? "bg-cream" : "bg-blush";

  return (
    <Card>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className={`rounded-xl ${bg} p-4 leading-8 text-muted ring-1 ring-[#f0dfd7]`}>
            {item}
          </p>
        ))}
      </div>
    </Card>
  );
}
