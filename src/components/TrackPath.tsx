"use client";

import { useEffect, useState } from "react";
import { lessonsOf, sideQuestsOf, type LessonRef, type SideQuestRef } from "@/content/tracks";
import type { Track, Unit } from "@/content/types";
import { localize, t, type Locale } from "@/i18n";
import { EMPTY, lessonStatus, load } from "@/lib/progress";
import { Bolt } from "./icons";
import { JumpDialog } from "./JumpDialog";
import { ComingSoonNode, LessonNode } from "./LessonNode";
import { LessonPopover } from "./LessonPopover";
import { SideQuestNode } from "./SideQuestNode";

const offsets = [0, -44, 0, 44];
const unitColors = ["bg-primary", "bg-unit-2", "bg-unit-3"];

export function TrackPath({ track, locale }: { track: Track; locale: Locale }) {
  const [progress, setProgress] = useState(EMPTY);
  const [open, setOpen] = useState<LessonRef | SideQuestRef | null>(null);
  const [jump, setJump] = useState<Unit | null>(null);
  useEffect(() => setProgress(load()), []);

  const refs = lessonsOf(track);
  const refByLessonId = new Map(refs.map((ref) => [ref.lesson.id, ref]));
  const quests = sideQuestsOf(track);
  const questByUnitId = new Map(quests.map((ref) => [ref.unit.id, ref]));
  const statusOf = (ref: LessonRef | SideQuestRef) =>
    lessonStatus(ref.lesson.id, ref.previousLessonId, progress);
  const done = refs.filter((ref) => statusOf(ref) === "completed").length;
  const extrasDone = quests.filter((ref) => statusOf(ref) === "completed").length;
  const upNext = refs.find((ref) => statusOf(ref) === "current");
  const unitEntries = track.levels.flatMap((level) => level.units.map((unit) => ({ level, unit })));

  return (
    <div className="mx-auto flex max-w-5xl justify-center gap-12 px-4 py-6 lg:px-12">
      <div className="w-full max-w-md">
        {unitEntries.map(({ level, unit }, i) => {
          const unitIndex = i + 1;
          const soon = unit.lessons.length === 0;
          const color = unitColors[(unitIndex - 1) % unitColors.length];
          const firstRef = soon ? undefined : refByLessonId.get(unit.lessons[0].id);
          const locked = firstRef !== undefined && statusOf(firstRef) === "locked";
          const canJump = locked && unit.challenge !== undefined;
          const questRef = questByUnitId.get(unit.id);
          return (
            <section key={unit.id} className="mb-2">
              <div
                className={`mb-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 ${soon ? "border-2 border-dashed border-border bg-surface-2 text-muted" : `${color} text-white shadow-[0_4px_0_rgba(0,0,0,0.35)]`}`}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">
                    {localize(locale, level.title)} · {t(locale, "track.unit", { n: unitIndex })}
                  </div>
                  <div className="font-display text-lg font-bold">
                    {localize(locale, unit.title)}
                    {soon && (
                      <span className="ml-2 font-sans text-xs font-semibold">
                        {t(locale, "track.comingSoon")}
                      </span>
                    )}
                  </div>
                </div>
                {canJump && (
                  <button
                    type="button"
                    onClick={() => setJump(unit)}
                    className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border-2 border-white/40 bg-black/20 px-3 text-xs font-extrabold uppercase tracking-wider text-white"
                  >
                    <Bolt size={14} />
                    {t(locale, "track.jumpHere")}
                  </button>
                )}
              </div>
              <div className="relative flex flex-col items-center gap-6 pb-4 pt-6">
                {soon
                  ? [0, 1].map((i) => <ComingSoonNode key={i} offset={offsets[i]} index={i} />)
                  : unit.lessons.map((lesson, i) => {
                      const ref = refByLessonId.get(lesson.id) as LessonRef;
                      const status = statusOf(ref);
                      return (
                        <LessonNode
                          key={lesson.id}
                          status={status}
                          label={localize(locale, lesson.title)}
                          offset={offsets[i % offsets.length]}
                          startLabel={status === "current" ? t(locale, "track.start") : undefined}
                          index={i}
                          onClick={() => setOpen(ref)}
                        />
                      );
                    })}
                {questRef && (
                  <SideQuestNode
                    status={statusOf(questRef)}
                    label={localize(locale, questRef.lesson.title)}
                    side={unitIndex % 2 === 0 ? "left" : "right"}
                    onClick={() => setOpen(questRef)}
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="hidden w-72 flex-col gap-3.5 pt-3.5 lg:flex">
        <Card label={t(locale, "track.track")}>
          {localize(locale, track.title)} · {upNext ? localize(locale, upNext.level.title) : ""}
        </Card>
        <Card label={t(locale, "track.progress")}>
          <div className="flex justify-between">
            <span>{t(locale, "track.progressCount", { done, total: refs.length })}</span>
            <span className="text-ok-text">{Math.round((done / refs.length) * 100)}%</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full border border-border bg-surface-2">
            <div className="h-full bg-ok" style={{ width: `${(done / refs.length) * 100}%` }} />
          </div>
          {quests.length > 0 && (
            <div className="flex justify-between text-sm text-muted">
              <span>
                {t(locale, "track.extrasCount", { done: extrasDone, total: quests.length })}
              </span>
            </div>
          )}
        </Card>
        <Card label={t(locale, "track.upNext")}>
          {upNext ? (
            <>
              <div>{localize(locale, upNext.lesson.title)}</div>
              <div className="text-sm font-semibold text-muted">
                {localize(locale, upNext.lesson.description)}
              </div>
            </>
          ) : (
            t(locale, "track.allDone")
          )}
        </Card>
      </aside>

      {open && (
        <LessonPopover
          lesson={open}
          status={statusOf(open)}
          locale={locale}
          href={`/${locale}/${track.id}/${open.lesson.id}`}
          onClose={() => setOpen(null)}
          extra={!("indexInUnit" in open)}
        />
      )}

      {jump && (
        <JumpDialog
          unitTitle={localize(locale, jump.title)}
          href={`/${locale}/${track.id}/challenge/${jump.id}`}
          locale={locale}
          onClose={() => setJump(null)}
        />
      )}
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-2 border-border bg-surface p-4 font-bold">
      <div className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</div>
      {children}
    </div>
  );
}
