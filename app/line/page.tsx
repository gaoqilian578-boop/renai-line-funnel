import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";

const sections = [
  { title: "こんな人向け", items: ["彼の返信で一日が揺れやすい", "追いすぎずに距離を縮めたい", "今の状況に合う動き方を整理したい"] },
  { title: "プログラムで整えること", items: ["LINEの送り方", "会う流れの作り方", "不安で空回りしない関係の進め方"] },
  { title: "3ヶ月の流れ", items: ["1ヶ月目：不安を整える", "2ヶ月目：距離を縮める", "3ヶ月目：関係を進める"] },
  { title: "まずはLINEで相談できます", items: ["今の彼との状況を整理", "送る前の不安を言語化", "必要な講座やコラムへ案内"] },
];

export default function LinePage() {
  return (
    <>
      <PageHeader title={"恋の道標\n3ヶ月で彼を手に入れる\n片思い革命プログラム"} description="今の彼との状況に合わせて、LINE・会う流れ・距離の縮め方を一緒に整えていくプログラムです。不安で空回りする恋愛から、追いすぎずにちゃんと距離を縮める恋愛へ進むための場所です。" />
      <Section className="pt-0">
        <div className="mx-auto grid max-w-3xl gap-5">
          {sections.map((section) => (
            <Card key={section.title}>
              <h2 className="text-xl font-bold">{section.title}</h2>
              <ul className="mt-4 grid gap-3 leading-7 text-muted">{section.items.map((item) => <li key={item} className="rounded-xl bg-cream p-3">{item}</li>)}</ul>
            </Card>
          ))}
          <Button href="https://line.me/" className="w-full">「恋の道標」への参加はこちら</Button>
        </div>
      </Section>
    </>
  );
}
