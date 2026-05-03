import { PageHeader } from "@/components/PageHeader";
import { ResultClient } from "./ResultClient";

export default function ResultPage() {
  return (
    <>
      <PageHeader title="診断結果" description="最後に受けた診断結果を表示します。結果はこの端末のブラウザに保存されています。" />
      <ResultClient />
    </>
  );
}
