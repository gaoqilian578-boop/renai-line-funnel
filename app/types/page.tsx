import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getCharacterHref, loveCharacters } from "@/lib/loveCharacters";

export default function TypesPage() {
  return (
    <>
      <PageHeader
        title="恋愛キャラ一覧"
        description={"待ち方、送り方、不安の出方は人それぞれ。\n自分のキャラを知ると、送る前に少し落ち着けます。"}
      />
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl rounded-2xl bg-cream p-6 leading-8 text-muted">
          ここでは、恋愛中に出やすいキャラを一覧で見られます。
          どのキャラが良い・悪いではなく、
          「私はこうなりやすいんだ」と知るためのページです。
        </div>
        <div className="mx-auto mt-6 max-w-3xl">
          <Button href="/diagnosis/love-line-type" className="w-full sm:w-auto">診断して自分のキャラを見る</Button>
          <Button href="/share-templates" variant="ghost" className="mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto">投稿テンプレを見る</Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loveCharacters.map((character) => (
            <Card key={character.code} className="flex flex-col">
              <p className="text-sm font-black tracking-normal text-roseSoft">{character.displayCode}</p>
              <h2 className="mt-2 text-2xl font-black">{character.characterLabel}</h2>
              <p className="mt-2 font-bold leading-7 text-ink">{character.title}</p>
              <p className="mt-3 grow leading-8 text-muted">{character.emotionalCopy}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {character.compatibility.easy.slice(0, 3).map((code) => (
                  <span key={code} className="rounded-full bg-blush px-3 py-1 text-xs font-bold text-ink">{code}</span>
                ))}
              </div>
              <Button href={getCharacterHref(character)} variant="ghost" className="mt-5">詳細を見る</Button>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
