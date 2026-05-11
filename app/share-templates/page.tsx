import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getCharacterHref, loveCharacters } from "@/lib/loveCharacters";

export default function ShareTemplatesPage() {
  return (
    <>
      <PageHeader
        title="恋愛キャラ別 投稿テンプレ"
        description={"診断結果をストーリーや投稿でシェアしたい時に使える、\nキャラ別のひとことをまとめました。"}
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl">
          <Button href="/diagnosis/love-line-type" className="w-full sm:w-auto">自分の恋愛キャラを診断する</Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loveCharacters.map((character) => (
            <Card key={character.code} className="flex flex-col bg-[#fffaf7]">
              <p className="text-xs font-black tracking-normal text-roseSoft">{character.displayCode}</p>
              <h2 className="mt-2 text-lg font-black leading-8">{character.shareTemplate.title}</h2>
              <p className="mt-4 whitespace-pre-line grow leading-8 text-muted">{character.shareTemplate.body}</p>
              <p className="mt-4 rounded-xl bg-white p-3 text-sm leading-7 text-muted ring-1 ring-[#f0dfd7]">{character.shareTemplate.saveText}</p>
              <p className="mt-3 text-sm font-bold text-roseSoft">{character.shareTemplate.cta}</p>
              <Button href={getCharacterHref(character)} variant="ghost" className="mt-5">タイプ詳細へ</Button>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
