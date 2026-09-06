import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { findTrack, tracks } from "@/content/tracks";
import { localize, type Locale } from "@/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.map((track) => ({ track: track.id }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ locale: Locale; track: string }>;
}) {
  const { locale, track: trackId } = await params;
  const track = findTrack(trackId);
  if (!track) notFound();
  return (
    <>
      <Header locale={locale} trackId={track.id} />
      <main className="p-4">{localize(locale, track.title)}</main>
    </>
  );
}
