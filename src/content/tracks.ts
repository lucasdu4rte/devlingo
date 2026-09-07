import { react } from "./react";
import type { Lesson, Level, Track, Unit } from "./types";

export const tracks: Track[] = [react];

export type LessonRef = {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  indexInUnit: number;
  previousLessonId: string | null;
};

export function findTrack(id: string) {
  return tracks.find((track) => track.id === id);
}

export function lessonsOf(track: Track): LessonRef[] {
  const refs: LessonRef[] = [];
  for (const level of track.levels) {
    for (const unit of level.units) {
      unit.lessons.forEach((lesson, indexInUnit) => {
        const previous = refs.at(-1);
        refs.push({
          lesson,
          unit,
          level,
          indexInUnit,
          previousLessonId: previous ? previous.lesson.id : null,
        });
      });
    }
  }
  return refs;
}

export type SideQuestRef = {
  lesson: Lesson;
  unit: Unit;
  level: Level;
  previousLessonId: string | null;
};

export function sideQuestsOf(track: Track): SideQuestRef[] {
  return unitsOf(track)
    .filter(({ unit }) => unit.sideQuest)
    .map(({ unit, level }) => ({
      lesson: unit.sideQuest as Lesson,
      unit,
      level,
      previousLessonId: lessonsBefore(track, unit.id).at(-1)?.lesson.id ?? null,
    }));
}

export function findLesson(track: Track, lessonId: string): LessonRef | SideQuestRef | undefined {
  const main = lessonsOf(track).find((ref) => ref.lesson.id === lessonId);
  if (main) return main;
  return sideQuestsOf(track).find((ref) => ref.lesson.id === lessonId);
}

export function unitsOf(track: Track) {
  return track.levels.flatMap((level) => level.units.map((unit) => ({ unit, level })));
}

export function findUnit(track: Track, unitId: string) {
  return unitsOf(track).find(({ unit }) => unit.id === unitId)?.unit;
}

export function lessonsBefore(track: Track, unitId: string): LessonRef[] {
  const refs = lessonsOf(track);
  const start = refs.findIndex((ref) => ref.unit.id === unitId);
  if (start === -1) return [];
  return refs.slice(0, start);
}
