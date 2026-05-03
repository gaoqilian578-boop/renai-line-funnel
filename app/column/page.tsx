import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

const items = ["返信が遅い時に送らない方がいいLINE", "追いLINEしたくなった時の代替文", "デート後に次につながるお礼LINE", "会いたいを重く見せない言い方", "久しぶりLINEの自然な送り方", "今日は送らない方がいい時の判断リスト", "そのまま使えるLINE例文30個"];

export default function ColumnPage() {
  return (
    <>
      <PageHeader eyebrow="980円コラム" title="返信が遅い彼に、重くならず送るLINEの作り方" description={"追いLINEしたくなった夜に読む、恋愛LINE整えコラム\n\n返信が遅い時、デート後、久しぶりLINE、会いたい時。\n毎回「何送ればいいかわからない」と止まってしまう人へ。\n場面別にそのまま使えるLINE例文と、送っていい時・今日は待つ時の判断をまとめました。"} />
      <Section className="pt-0">
        <Card className="mx-auto max-w-3xl">
          <p className="text-sm font-bold text-roseSoft">価格</p>
          <p className="mt-2 text-4xl font-bold">980円</p>
          <h2 className="mt-8 text-xl font-bold">このコラムで読めること</h2>
          <ul className="mt-4 grid gap-3 leading-7 text-muted">{items.map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}</ul>
          <Button href="https://note.com/" className="mt-8 w-full">980円コラムで場面別の例文を見る</Button>
        </Card>
      </Section>
    </>
  );
}
