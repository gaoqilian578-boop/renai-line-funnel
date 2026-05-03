import type { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "", ...props }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl border border-[#f0dfd7] bg-white p-5 shadow-soft ${className}`} {...props}>{children}</div>;
}
