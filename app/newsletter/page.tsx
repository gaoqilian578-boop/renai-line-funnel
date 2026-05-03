import { PageHeader } from "@/components/PageHeader";
import { NewsletterForm } from "./NewsletterForm";

export default function NewsletterPage() {
  return (
    <>
      <PageHeader title={"不定期メルマガ\n夜に読み返す恋愛LINE便り"} description="返信待ちで不安になった夜に、少し気持ちが整う話と、そのまま使えるLINE例文を不定期でお届けします。" />
      <NewsletterForm />
    </>
  );
}
