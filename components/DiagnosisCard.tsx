import { Button } from "./Button";
import { Card } from "./Card";

export function DiagnosisCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card>
      <h2 className="text-lg font-bold leading-8">{title}</h2>
      <p className="mt-3 leading-7 text-muted">{description}</p>
      <Button href={href} variant="secondary" className="mt-5 w-full">診断する</Button>
    </Card>
  );
}
