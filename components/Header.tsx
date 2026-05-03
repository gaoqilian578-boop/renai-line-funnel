import Link from "next/link";
import { navLinks, siteName } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#f0dfd7] bg-[#fffdf9]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="shrink-0 text-base font-bold text-ink">{siteName}</Link>
        <nav className="flex gap-2 overflow-x-auto pb-1 text-sm text-muted">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="shrink-0 rounded-full px-3 py-2 hover:bg-cream hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
