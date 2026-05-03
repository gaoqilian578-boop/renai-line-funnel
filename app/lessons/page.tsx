import { LessonCard } from "@/components/LessonCard";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { lessons } from "@/lib/lessons";

export default function LessonsPage() {
  return (
    <>
      <PageHeader title="15講座一覧" description="返信待ちの不安を整えるところから、彼との距離を少しずつ縮めるところまで。今の段階に合う講座から読めます。" />
      <Section className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => <LessonCard key={lesson.slug} {...lesson} />)}
        </div>
      </Section>
    </>
  );
}
