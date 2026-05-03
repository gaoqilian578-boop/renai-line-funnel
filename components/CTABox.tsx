import { Button } from "./Button";

export function CTABox({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="rounded-2xl bg-cream p-6">
      <h2 className="text-xl font-bold leading-8">{title}</h2>
      <p className="mt-3 whitespace-pre-line leading-8 text-muted">{description}</p>
      <div className="mt-6 grid gap-3 sm:flex">
        <Button href={primaryHref}>{primaryLabel}</Button>
        {secondaryHref && secondaryLabel ? <Button href={secondaryHref} variant="ghost">{secondaryLabel}</Button> : null}
      </div>
    </div>
  );
}
