"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  return (
    <Section className="pt-0">
      <Card className="mx-auto max-w-2xl">
        {done ? (
          <>
            <h2 className="text-xl font-bold">登録ありがとうございます</h2>
            <p className="mt-3 leading-8 text-muted">実際の送信処理はまだありませんが、登録後の見た目として表示しています。</p>
          </>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setDone(true); }}>
            <label className="text-sm font-bold" htmlFor="email">メールアドレス</label>
            <input id="email" type="email" required placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-[#eadbd4] bg-white px-4 outline-none focus:border-roseSoft" />
            <Button type="submit" className="mt-5 w-full">不定期メルマガに登録する</Button>
          </form>
        )}
      </Card>
    </Section>
  );
}
