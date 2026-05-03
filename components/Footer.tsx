import Link from "next/link";
import { navLinks } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[#f0dfd7] bg-cream px-5 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-bold">恋愛キャラ診断</p>
          <p className="mt-3 leading-8 text-muted">返信待ちの夜に、気持ちと言葉を少し整えるための診断・講座・ロードマップサイトです。</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="text-muted hover:text-ink">{link.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
