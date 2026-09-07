import { notFound } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { findLesson, findTrack, lessonsOf, tracks } from "@/content/tracks";
import { localize, type Locale } from "@/i18n";
import { highlightExercise, highlightOptions } from "@/lib/highlight";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.flatMap((track) =>
    lessonsOf(track).map((ref) => ({ track: track.id, lessonId: ref.lesson.id })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ locale: Locale; track: string; lessonId: string }>;
}) {
  const { locale, track: trackId, lessonId } = await params;
  const track = findTrack(trackId);
  const ref = track && findLesson(track, lessonId);
  if (!track || !ref) notFound();

  const codeHtml = await Promise.all(ref.lesson.exercises.map(highlightExercise));
  const optionsHtml = await Promise.all(ref.lesson.exercises.map(highlightOptions));

  return (
    <main>
      <LessonRunner
        mode={{
          kind: "lesson",
          lesson: ref.lesson,
          unitTitle: localize(locale, ref.unit.title),
          previousLessonId: ref.previousLessonId,
        }}
        exercises={ref.lesson.exercises}
        codeHtml={codeHtml}
        optionsHtml={optionsHtml}
        locale={locale}
        trackHref={`/${locale}/${track.id}`}
      />
    </main>
  );
}
