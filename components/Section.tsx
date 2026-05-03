import type { ReactNode } from "react";

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`px-5 py-12 sm:px-6 lg:px-8 ${className}`}><div className="mx-auto max-w-5xl">{children}</div></section>;
}
