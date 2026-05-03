import { Card } from "./Card";

export function RoadmapStep({ month, title, description, lessons }: { month: string; title: string; description: string; lessons: string }) {
  return (
    <Card>
      <p className="text-sm font-bold text-roseSoft">{month}</p>
      <h2 className="mt-2 text-xl font-bold">{title}</h2>
      <p className="mt-4 leading-8 text-muted">{description}</p>
      <p className="mt-5 rounded-xl bg-cream p-4 text-sm font-bold leading-7 text-ink">おすすめ講座：{lessons}</p>
    </Card>
  );
}
