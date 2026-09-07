"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Exercise, Lesson } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { isAnswered, isCorrect, type Answer } from "@/lib/check";
import { CHALLENGE_MAX_MISTAKES, CHALLENGE_XP, challengeOutcome } from "@/lib/challenge";
import { completeLesson, lessonStatus, load, passChallenge } from "@/lib/progress";
import { Button } from "./Button";
import { ChallengeFailed } from "./ChallengeFailed";
import { CodeBlock } from "./CodeBlock";
import { FillBlank } from "./FillBlank";
import { Check, Close } from "./icons";
import { LessonComplete } from "./LessonComplete";
import { MultiChoice } from "./MultiChoice";
import { ProgressBar } from "./ProgressBar";
import { QuitDialog } from "./QuitDialog";
import { SingleChoice } from "./SingleChoice";

type Phase = "answering" | "checked" | "complete" | "failed";

export type RunnerMode =
  | { kind: "lesson"; lesson: Lesson; unitTitle: string; previousLessonId: string | null }
  | { kind: "challenge"; unitId: string; unitTitle: string; lessonIds: string[] };

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
  mode,
  exercises,
  codeHtml,
  locale,
  trackHref,
}: {
  mode: RunnerMode;
  exercises: Exercise[];
  codeHtml: (string | null)[];
  locale: Locale;
  trackHref: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(() => emptyAnswer(exercises[0]));
  const [phase, setPhase] = useState<Phase>("answering");
  const [mistakes, setMistakes] = useState(0);
  const [result, setResult] = useState({ xp: 0, streak: 0 });
  const [quitting, setQuitting] = useState(false);

  useEffect(() => {
    if (mode.kind === "lesson") {
      if (lessonStatus(mode.lesson.id, mode.previousLessonId, load()) === "locked") {
        router.replace(trackHref);
      }
      return;
    }
    if (load().completedLessons.includes(mode.lessonIds.at(-1) as string)) {
      router.replace(trackHref);
    }
  }, [mode, router, trackHref]);

  const exercise = exercises[index];
  const normalized = normalize(exercise, answer);
  const correct = phase === "checked" && isCorrect(exercise, normalized);

  function check() {
    if (!isCorrect(exercise, normalize(exercise, answer))) setMistakes((m) => m + 1);
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
    if (!isCorrect(exercise, normalize(exercise, option))) setMistakes((m) => m + 1);
    setPhase("checked");
  }

  function next() {
    if (mode.kind === "challenge") {
      const outcome = challengeOutcome(mistakes, index + 1, exercises.length);
      if (outcome === "failed") {
        setPhase("failed");
        return;
      }
      if (outcome === "passed") {
        const progress = passChallenge(mode.lessonIds, CHALLENGE_XP);
        setResult({ xp: CHALLENGE_XP, streak: progress.streak });
        setPhase("complete");
        return;
      }
    } else if (index === exercises.length - 1) {
      const already = load().completedLessons.includes(mode.lesson.id);
      const progress = completeLesson(mode.lesson.id, mode.lesson.xp);
      setResult({ xp: already ? 0 : mode.lesson.xp, streak: progress.streak });
      setPhase("complete");
      return;
    }
    setIndex(index + 1);
    setAnswer(emptyAnswer(exercises[index + 1]));
    setPhase("answering");
  }

  function retry() {
    setIndex(0);
    setAnswer(emptyAnswer(exercises[0]));
    setMistakes(0);
    setPhase("answering");
  }

  if (phase === "failed") {
    return <ChallengeFailed locale={locale} onRetry={retry} trackHref={trackHref} />;
  }

  if (phase === "complete") {
    const subtitle =
      mode.kind === "lesson"
        ? `${mode.unitTitle} · ${localize(locale, mode.lesson.title)}`
        : t(locale, "challenge.subtitle", { unit: mode.unitTitle });
    return (
      <LessonComplete
        locale={locale}
        subtitle={subtitle}
        xp={result.xp}
        streak={result.streak}
        trackHref={trackHref}
      />
    );
  }

  const checked = phase === "checked";
  const reveal = mode.kind === "lesson";
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
        <ProgressBar value={index / exercises.length} />
        {mode.kind === "challenge" && (
          <span className="whitespace-nowrap text-xs font-bold text-muted">
            {t(locale, "challenge.mistakesLeft", {
              n: Math.max(0, CHALLENGE_MAX_MISTAKES - mistakes),
            })}
          </span>
        )}
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
            reveal={reveal}
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
            reveal={reveal}
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
          {!correct && mode.kind === "lesson" && (
            <div className="mb-3 text-sm">{explanation(exercise, locale)}</div>
          )}
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
