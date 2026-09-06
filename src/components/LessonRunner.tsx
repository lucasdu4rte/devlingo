"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Exercise, Lesson } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { isAnswered, isCorrect, type Answer } from "@/lib/check";
import { completeLesson, lessonStatus, load } from "@/lib/progress";
import { Button } from "./Button";
import { CodeBlock } from "./CodeBlock";
import { FillBlank } from "./FillBlank";
import { Check, Close } from "./icons";
import { LessonComplete } from "./LessonComplete";
import { MultiChoice } from "./MultiChoice";
import { ProgressBar } from "./ProgressBar";
import { QuitDialog } from "./QuitDialog";
import { SingleChoice } from "./SingleChoice";

type Phase = "answering" | "checked" | "complete";

function emptyAnswer(exercise: Exercise): Answer {
  if (exercise.type === "multi-choice") return [];
  if (exercise.type === "fill-blank") return "";
  return -1;
}

function normalize(exercise: Exercise, answer: Answer): Answer | null {
  if (exercise.type === "single-choice" && answer === -1) return null;
  return answer;
}

export function LessonRunner({
  lesson,
  unitTitle,
  previousLessonId,
  locale,
  trackHref,
  codeHtml,
}: {
  lesson: Lesson;
  unitTitle: string;
  previousLessonId: string | null;
  locale: Locale;
  trackHref: string;
  codeHtml: (string | null)[];
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(() => emptyAnswer(lesson.exercises[0]));
  const [phase, setPhase] = useState<Phase>("answering");
  const [result, setResult] = useState({ xp: 0, streak: 0 });
  const [quitting, setQuitting] = useState(false);

  useEffect(() => {
    if (lessonStatus(lesson.id, previousLessonId, load()) === "locked") router.replace(trackHref);
  }, [lesson.id, previousLessonId, router, trackHref]);

  const exercise = lesson.exercises[index];
  const normalized = normalize(exercise, answer);
  const correct = phase === "checked" && isCorrect(exercise, normalized);

  function check() {
    setPhase("checked");
  }

  function close() {
    const untouched = index === 0 && phase === "answering" && !isAnswered(exercise, normalized);
    if (untouched) {
      router.push(trackHref);
      return;
    }
    setQuitting(true);
  }

  function pickAndCheck(option: number) {
    setAnswer(option);
    setPhase("checked");
  }

  function next() {
    const last = index === lesson.exercises.length - 1;
    if (!last) {
      setIndex(index + 1);
      setAnswer(emptyAnswer(lesson.exercises[index + 1]));
      setPhase("answering");
      return;
    }
    const already = load().completedLessons.includes(lesson.id);
    const progress = completeLesson(lesson.id, lesson.xp);
    setResult({ xp: already ? 0 : lesson.xp, streak: progress.streak });
    setPhase("complete");
  }

  if (phase === "complete") {
    return (
      <LessonComplete
        locale={locale}
        subtitle={`${unitTitle} · ${localize(locale, lesson.title)}`}
        xp={result.xp}
        streak={result.streak}
        trackHref={trackHref}
      />
    );
  }

  const checked = phase === "checked";
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      {quitting && (
        <QuitDialog
          locale={locale}
          onQuit={() => router.push(trackHref)}
          onStay={() => setQuitting(false)}
        />
      )}
      <div className="flex items-center gap-3.5 px-4 pb-2.5 pt-4">
        <button
          type="button"
          onClick={close}
          aria-label={t(locale, "lesson.close")}
          className="flex h-11 w-11 items-center justify-center text-muted"
        >
          <Close size={20} />
        </button>
        <ProgressBar value={index / lesson.exercises.length} />
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-5 py-3.5">
        <h1 id="exercise-prompt" className="font-display text-xl font-bold leading-snug">
          {localize(locale, exercise.prompt)}
        </h1>
        {codeHtml[index] && <CodeBlock html={codeHtml[index]} />}
        {exercise.type === "single-choice" && (
          <SingleChoice
            exercise={exercise}
            locale={locale}
            answer={answer === -1 ? null : (answer as number)}
            checked={checked}
            onChange={pickAndCheck}
            labelledBy="exercise-prompt"
          />
        )}
        {exercise.type === "multi-choice" && (
          <MultiChoice
            exercise={exercise}
            locale={locale}
            answer={answer as number[]}
            checked={checked}
            onChange={setAnswer}
            labelledBy="exercise-prompt"
          />
        )}
        {exercise.type === "fill-blank" && (
          <FillBlank
            locale={locale}
            answer={answer as string}
            checked={checked}
            correct={correct}
            onChange={setAnswer}
          />
        )}
      </div>

      {!checked && exercise.type !== "single-choice" && (
        <div className="border-t-2 border-border bg-surface p-4 pb-6">
          <Button variant={isAnswered(exercise, normalized) ? "ok" : "disabled"} onClick={check}>
            {t(locale, "lesson.check")}
          </Button>
        </div>
      )}
      {checked && (
        <div
          className={`slide-up flex flex-col gap-1 p-5 pb-6 ${correct ? "bg-ok-soft text-ok-text" : "bg-bad-soft text-bad-text"}`}
        >
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <span
              className={`flex h-[26px] w-[26px] items-center justify-center rounded-full ${correct ? "bg-ok-text text-ok-soft" : "bg-bad-text text-bad-soft"}`}
            >
              {correct ? <Check size={16} /> : <Close size={16} />}
            </span>
            {t(locale, correct ? "lesson.correct" : "lesson.wrong")}
          </div>
          {!correct && <div className="mb-3 text-sm">{explanation(exercise, locale)}</div>}
          <Button variant={correct ? "ok" : "bad"} onClick={next}>
            {t(locale, "lesson.continue")}
          </Button>
        </div>
      )}
    </div>
  );
}

function explanation(exercise: Exercise, locale: Locale) {
  if (exercise.type === "single-choice") {
    return t(locale, "lesson.correctAnswer", {
      answer: localize(locale, exercise.options[exercise.correct]),
    });
  }
  if (exercise.type === "fill-blank")
    return t(locale, "lesson.correctAnswer", { answer: exercise.answer });
  return t(locale, "lesson.correctHighlighted");
}
