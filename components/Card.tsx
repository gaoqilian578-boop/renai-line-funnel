import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#f0dfd7] bg-white p-5 shadow-soft ${className}`}>{children}</div>;
}
