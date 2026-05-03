import { notFound } from "next/navigation";
import { CTABox } from "@/components/CTABox";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getDiagnosis } from "@/lib/diagnoses";
import { DiagnosisForm } from "../[slug]/DiagnosisForm";

export default function LoveLineTypePage() {
  const diagnosis = getDiagnosis("love-line-type");
  if (!diagnosis) notFound();

  return (
    <>
      <PageHeader
        title="恋愛キャラ診断"
        description={"あなたの恋愛のクセを、キャラで可視化。\n待ち方・送り方・不安の出方から、\n今のあなたに出やすい恋愛キャラがわかります。"}
        eyebrow="無料診断"
      />
      <Section className="pt-0">
        <div className="mx-auto grid max-w-3xl gap-5">
          <div className="rounded-2xl border border-[#f0dfd7] bg-white p-6 leading-8 text-muted shadow-soft">
            <p className="whitespace-pre-line">
              {"返信を待つ時。\n自分から送る時。\n不安になって何度もLINEを見返す時。\n\n恋愛中の行動には、\nその人なりの“クセ”があります。\n\nこの診断では、あなたの待ち方・送り方・不安の出方から、\n今の恋愛で出やすいキャラを見つけます。\n\n結果は、正解や不正解ではありません。\n「私はこうなりやすいんだ」と知って、\n送る前に少し落ち着くためのメモとして使ってください。"}
            </p>
          </div>
          <CTABox
            title="診断して恋愛キャラを見る"
            description={"結果はスクショして保存できます。\n返信待ちで不安になった夜に、見返せるように作っています。\n\nよかったらこの結果、スクショして保存しておいてください。\n返信待ちで不安になった夜に、少し戻ってこれます。"}
            primaryHref="#questions"
            primaryLabel="質問へ進む"
          />
        </div>
      </Section>
      <div id="questions" />
      <DiagnosisForm diagnosis={diagnosis} />
    </>
  );
}
