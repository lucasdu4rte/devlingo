import { notFound } from "next/navigation";
import { LessonRunner } from "@/components/LessonRunner";
import { findTrack, findUnit, lessonsBefore, tracks, unitsOf } from "@/content/tracks";
import { localize, type Locale } from "@/i18n";
import { highlightExercise, highlightOptions } from "@/lib/highlight";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.flatMap((track) =>
    unitsOf(track)
      .filter(({ unit }) => unit.challenge)
      .map(({ unit }) => ({ track: track.id, unitId: unit.id })),
  );
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ locale: Locale; track: string; unitId: string }>;
}) {
  const { locale, track: trackId, unitId } = await params;
  const track = findTrack(trackId);
  const unit = track && findUnit(track, unitId);
  if (!track || !unit?.challenge) notFound();

  const codeHtml = await Promise.all(unit.challenge.map(highlightExercise));
  const optionsHtml = await Promise.all(unit.challenge.map(highlightOptions));
  const lessonIds = lessonsBefore(track, unit.id).map((ref) => ref.lesson.id);

  return (
    <main>
      <LessonRunner
        mode={{
          kind: "challenge",
          unitId: unit.id,
          unitTitle: localize(locale, unit.title),
          lessonIds,
        }}
        exercises={unit.challenge}
        codeHtml={codeHtml}
        optionsHtml={optionsHtml}
        locale={locale}
        trackHref={`/${locale}/${track.id}`}
      />
    </main>
  );
}
