import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

const readable = ["送る前に見る3つのチェック", "今は送らない方がいいLINE 5選", "追いLINEの代わりに送れる一文 10選", "返信が遅い彼に送るOK例・NG例", "デート後にそっけない時の一文", "会いたいけど重く見せたくない時の一文", "久しぶりに送る時の一文", "今日は送らない方がいいサイン", "980円コラムに進むべき人"];
const targets = ["返信が遅いだけで不安になる", "追いLINEしたくなる", "何を送ればいいかわからない", "重いと思われたくない", "今夜送るか迷っているLINEがある", "送ったあとに「なんか重かったかな」と後悔しやすい", "このまま終わるのは嫌だけど、どう動けばいいかわからない"];

export default function MiniPage() {
  return (
    <>
      <PageHeader eyebrow="100円ミニ講座" title="返信が来ない夜に見る 100円LINE整理メモ" description={"送る前に、いったんここで整えて。\n\n返信が来ない。\n追いLINEしたい。\nでも重いと思われたくない。\n\nそんな夜に、不安のまま送って後悔しないための\nスマホで読めるLINE整理メモです。"} />
      <Section className="pt-0">
        <div className="mx-auto grid max-w-3xl gap-5">
          <Card>
            <h2 className="text-xl font-bold">この講座で読めること</h2>
            <ul className="mt-4 grid gap-3 leading-7 text-muted">{readable.map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}</ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">こんな人向け</h2>
            <ul className="mt-4 grid gap-3 leading-7 text-muted">{targets.map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}</ul>
          </Card>
          <Card className="text-center">
            <p className="text-sm font-bold text-roseSoft">価格</p>
            <p className="mt-2 text-4xl font-bold">¥100</p>
            <p className="mt-3 leading-8 text-muted">まずは小さく、今夜の不安を整えるところから。</p>
            <Button href="/mini/content" className="mt-6 w-full">100円で読む</Button>
            <p className="mt-4 text-sm leading-7 text-muted">購入後すぐにスマホで読めます。今夜送る前に見返せる内容です。</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
