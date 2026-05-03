export function PageHeader({ title, description, eyebrow }: { title: string; description?: string; eyebrow?: string }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-8 pt-10 sm:px-6 lg:px-8">
      {eyebrow ? <p className="mb-3 text-sm font-bold text-roseSoft">{eyebrow}</p> : null}
      <h1 className="text-3xl font-bold leading-[1.45] text-ink sm:text-4xl">{title}</h1>
      {description ? <p className="mt-5 whitespace-pre-line text-base leading-8 text-muted">{description}</p> : null}
    </div>
  );
}
