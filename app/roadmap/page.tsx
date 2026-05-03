import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { RoadmapStep } from "@/components/RoadmapStep";
import { Section } from "@/components/Section";

export default function RoadmapPage() {
  return (
    <>
      <PageHeader title="3ヶ月で、追いすぎずに距離を縮めるロードマップ" description={"片思い中のLINE不安を整えながら、\n彼との距離を少しずつ縮めるための3ヶ月ロードマップです。"} />
      <Section className="pt-0">
        <div className="grid gap-5 lg:grid-cols-3">
          <RoadmapStep month="Month 1" title="不安を整える" description="返信が遅いだけで崩れないように、送る前のチェックと待つ時間の整え方を身につけます。" lessons="1,2,3,4,5" />
          <RoadmapStep month="Month 2" title="距離を縮める" description="返信が遅い彼、会話が止まった時、デート後など、関係を自然に動かすLINEを学びます。" lessons="6,7,8,9,10" />
          <RoadmapStep month="Month 3" title="関係を進める" description="LINEだけで判断せず、自分を小さくしないまま会う流れと次の一歩を整えます。" lessons="11,12,13,14,15" />
        </div>
        <Button href="/lessons" className="mt-8 w-full sm:w-auto">15講座を読む</Button>
      </Section>
    </>
  );
}
