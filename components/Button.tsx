import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

const styles = {
  primary: "bg-ink text-white hover:bg-[#4a4442]",
  secondary: "bg-blush text-ink hover:bg-[#f3d9dc]",
  ghost: "bg-white text-ink ring-1 ring-[#eadbd4] hover:bg-cream",
};

export function Button({ children, href, variant = "primary", className = "", ...props }: Props) {
  const base = `inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-center text-sm font-bold transition ${styles[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={base} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={base} {...props}>
      {children}
    </button>
  );
}
