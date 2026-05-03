import { Button } from "./Button";
import { Card } from "./Card";

export function LessonCard({ id, title, description, slug }: { id: number; title: string; description: string; slug: string }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="text-sm font-bold text-roseSoft">講座 {id}</p>
      <h2 className="mt-2 text-lg font-bold leading-8">{title}</h2>
      <p className="mt-3 flex-1 leading-7 text-muted">{description}</p>
      <Button href={`/lessons/${slug}`} variant="ghost" className="mt-5 w-full">読む</Button>
    </Card>
  );
}
