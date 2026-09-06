import { react } from "./react";
import type { Lesson, Level, Track, Unit } from "./types";

export const tracks: Track[] = [react];

export type LessonRef = {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  unitIndex: number;
  indexInUnit: number;
  previousLessonId: string | null;
};

export function findTrack(id: string) {
  return tracks.find((track) => track.id === id);
}

export function lessonsOf(track: Track): LessonRef[] {
  const refs: LessonRef[] = [];
  let unitIndex = 0;
  for (const level of track.levels) {
    for (const unit of level.units) {
      unitIndex += 1;
      unit.lessons.forEach((lesson, indexInUnit) => {
        const previous = refs.at(-1);
        refs.push({
          lesson,
          unit,
          level,
          unitIndex,
          indexInUnit,
          previousLessonId: previous ? previous.lesson.id : null,
        });
      });
    }
  }
  return refs;
}

export function findLesson(track: Track, lessonId: string) {
  return lessonsOf(track).find((ref) => ref.lesson.id === lessonId);
}
