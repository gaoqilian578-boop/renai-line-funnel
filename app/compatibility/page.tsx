"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getLoveCharacter, loveCharacters } from "@/lib/loveCharacters";

type Group = "wait" | "confirm" | "act" | "accelerate";

const groupLabels: Record<Group, string> = {
  wait: "待ち型",
  confirm: "確認型",
  act: "行動型",
  accelerate: "加速型",
};

const groupOrder: Group[] = ["wait", "confirm", "act", "accelerate"];

const typeGroups: Record<Group, string[]> = {
  wait: ["WAIT", "CALM", "SPIN", "PACE"],
  confirm: ["HUSH", "EASE", "READ", "TACT"],
  act: ["PING", "MOVE", "SWAY", "FLOW"],
  accelerate: ["SEEK", "GLOW", "LOOP", "GROW"],
};

const results: Record<string, { feature: string; friction: string; tip: string; example: string }> = {
  "wait-wait": {
    feature: "お互いに慎重で、関係がゆっくり進みやすい組み合わせです。",
    friction: "どちらも様子を見るので、進展のきっかけが少なくなりやすいです。",
    tip: "小さな共有LINEや、軽い誘いで流れを作ると、無理なく距離を縮めやすくなります。",
    example: "この前話してたやつ見つけたから送っておくね笑",
  },
  "wait-confirm": {
    feature: "片方は待ちたい、片方は確かめたい。安心したいタイミングに差が出やすい組み合わせです。",
    friction: "確認したい側が不安になり、待ちたい側は少し圧を感じやすいことがあります。",
    tip: "答えを迫らず、会話のきっかけに変えると、相手も戻ってきやすくなります。",
    example: "落ち着いた時で大丈夫だから、また聞かせて〜",
  },
  "wait-act": {
    feature: "片方は慎重、片方は動きたい。気持ちはあっても、進む速さに差が出やすい組み合わせです。",
    friction: "動きたい側が不安になり、慎重な側は急かされているように感じることがあります。",
    tip: "誘いは軽く、断りやすい余白を残すと、関係の温度を守りやすくなります。",
    example: "無理ない日で大丈夫だから、またご飯行けたら嬉しいな。",
  },
  "wait-accelerate": {
    feature: "距離を縮めるスピードに差が出やすい組み合わせです。",
    friction: "加速したい側は不安になり、待ちたい側は少し戸惑いやすいかもしれません。",
    tip: "気持ちは短く、行動は小さく。大きな確認より、次につながる一文が合いやすいです。",
    example: "今週か来週あたり、時間合えばご飯行きたいなと思ってた。",
  },
  "confirm-confirm": {
    feature: "お互いに相手の気持ちを読み取りやすい組み合わせです。",
    friction: "確認や深読みが重なると、LINEひとつで不安が増えやすくなります。",
    tip: "LINEだけで判断せず、事実に戻る会話を意識すると落ち着きやすいです。",
    example: "最近忙しそうだから、落ち着いたらまた話そう〜",
  },
  "confirm-act": {
    feature: "確認したい気持ちと、動きたい気持ちが混ざりやすい組み合わせです。",
    friction: "行動が早いほど、確認したい側は不安になりやすいことがあります。",
    tip: "一方的に進めず、相手が返しやすい一文にすると、会話がやわらかく続きます。",
    example: "返事は急がなくて大丈夫。これだけ共有しておくね。",
  },
  "confirm-accelerate": {
    feature: "気持ちを確かめたい欲が強くなりやすい組み合わせです。",
    friction: "お互いに不安が強いと、確認・催促・長文になりやすいです。",
    tip: "結論を急がず、次の会話につながる一文に整えると、相手も受け取りやすくなります。",
    example: "また話せる時に話そう〜 無理しないでね。",
  },
  "act-act": {
    feature: "会話や予定は進みやすい組み合わせです。",
    friction: "勢いで進みすぎて、あとから不安になることがあります。",
    tip: "送る前に一呼吸置いて、明日の自分が見ても苦しくない一文に整えるのがおすすめです。",
    example: "返事は急がなくて大丈夫だけど、ちょっと共有したくなっただけ笑",
  },
  "act-accelerate": {
    feature: "関係が動きやすい組み合わせです。",
    friction: "どちらかが焦ると、相手に圧が伝わりやすいことがあります。",
    tip: "誘いは軽く、相手の余白を残すと、自然に次へつながりやすくなります。",
    example: "タイミング合えば、またご飯行けたら嬉しいな。",
  },
  "accelerate-accelerate": {
    feature: "気持ちが高まりやすく、進展も早くなりやすい組み合わせです。",
    friction: "不安も一緒に大きくなりやすく、確認したい気持ちが強く出ることがあります。",
    tip: "確認したくなった時ほど、短く整えると、相手も自分も苦しくなりにくいです。",
    example: "忙しそうだから、落ち着いた時で大丈夫。これだけ送っておくね。",
  },
};

export default function CompatibilityPage() {
  const [mine, setMine] = useState("LOOP");
  const [theirs, setTheirs] = useState("PACE");

  const result = useMemo(() => {
    const myCharacter = getLoveCharacter(mine);
    const theirCharacter = getLoveCharacter(theirs);
    if (!myCharacter || !theirCharacter) return null;

    const myGroup = getGroup(myCharacter.displayCode);
    const theirGroup = getGroup(theirCharacter.displayCode);
    const key = makeResultKey(myGroup, theirGroup);
    return { myCharacter, theirCharacter, myGroup, theirGroup, content: results[key] };
  }, [mine, theirs]);

  return (
    <>
      <PageHeader
        title="好きな人との相性診断"
        description={"あなたと好きな人の恋愛キャラから、\nすれ違いやすいポイントと、距離の縮め方を見てみましょう。"}
      />
      <Section className="pt-0">
        <div className="mx-auto grid max-w-3xl gap-5">
          <Card className="bg-[#fffaf7]">
            <p className="leading-8 text-muted">
              相性は、良い・悪いを決めるものではありません。<br />
              不安の出方や、距離の縮め方の違いを知るためのメモです。
            </p>
            <p className="mt-4 whitespace-pre-line leading-8 text-muted">
              {"「なんで返信が遅いんだろう」\n「私ばかり考えてる気がする」\n「どう動けば重く見えないんだろう」"}
            </p>
            <p className="mt-4 leading-8 text-muted">
              そんな時に、自分と相手のタイプを並べて見ると、少しだけ落ち着いて考えやすくなります。
            </p>
          </Card>

          <Card>
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="自分の恋愛キャラを選ぶ" value={mine} onChange={setMine} />
              <SelectField label="好きな人の恋愛キャラを選ぶ" value={theirs} onChange={setTheirs} />
            </div>
          </Card>

          {result ? (
            <Card>
              <p className="text-sm font-bold text-roseSoft">ふたりの組み合わせ</p>
              <div className="mt-4 grid gap-3 rounded-2xl bg-cream p-4">
                <p className="font-bold">あなた：{result.myCharacter.displayCode}｜{result.myCharacter.characterLabel}</p>
                <p className="font-bold">好きな人：{result.theirCharacter.displayCode}｜{result.theirCharacter.characterLabel}</p>
                <p className="text-sm leading-7 text-muted">{groupLabels[result.myGroup]} × {groupLabels[result.theirGroup]}</p>
              </div>

              <div className="mt-5 grid gap-4">
                <ResultBlock title="この組み合わせで起きやすいこと" body={result.content.feature} />
                <ResultBlock title="すれ違いやすいポイント" body={result.content.friction} />
                <ResultBlock title="距離を縮めるコツ" body={result.content.tip} />
                <div className="rounded-xl bg-blush p-4">
                  <p className="font-bold">そのまま使える一文</p>
                  <p className="mt-2 leading-8 text-ink">「{result.content.example}」</p>
                </div>
              </div>
            </Card>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2">
            <Button href="/mini" variant="secondary">100円LINE整理メモを見る</Button>
            <Button href="/column" variant="ghost">場面別の例文を見る</Button>
            <Button href="/diagnosis/love-line-type" variant="ghost">恋愛キャラ診断をもう一度見る</Button>
            <Button href="/line" variant="ghost">LINEで恋の道標を見る</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function SelectField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2">
      <span className="font-bold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-xl border border-[#f0dfd7] bg-white px-4 py-3 text-base font-bold text-ink outline-none focus:border-roseSoft"
      >
        {loveCharacters.map((character) => (
          <option key={character.code} value={character.displayCode}>
            {character.displayCode} {character.characterLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-[#fffaf7] p-4 ring-1 ring-[#f0dfd7]">
      <p className="font-bold">{title}</p>
      <p className="mt-2 leading-8 text-muted">{body}</p>
    </div>
  );
}

function getGroup(code: string): Group {
  return (Object.entries(typeGroups).find(([, codes]) => codes.includes(code))?.[0] as Group | undefined) ?? "wait";
}

function makeResultKey(a: Group, b: Group) {
  const sorted = [a, b].sort((left, right) => groupOrder.indexOf(left) - groupOrder.indexOf(right));
  return `${sorted[0]}-${sorted[1]}`;
}
