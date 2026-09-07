export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];
export type Text = { en: string; "pt-BR"?: string };

export type SingleChoice = {
  type: "single-choice";
  prompt: Text;
  code?: string;
  options: Text[];
  correct: number;
};
export type MultiChoice = {
  type: "multi-choice";
  prompt: Text;
  code?: string;
  options: Text[];
  correct: number[];
};
export type FillBlank = { type: "fill-blank"; prompt: Text; code: string; answer: string };
export type Exercise = SingleChoice | MultiChoice | FillBlank;

export type Lesson = {
  id: string;
  title: Text;
  description: Text;
  xp: number;
  exercises: Exercise[];
};
export type Unit = { id: string; title: Text; lessons: Lesson[]; challenge?: Exercise[] };
export type LevelId = "beginner" | "intermediate" | "advanced" | "expert";
export type Level = { id: LevelId; title: Text; units: Unit[] };
export type Track = { id: string; title: Text; levels: Level[] };
