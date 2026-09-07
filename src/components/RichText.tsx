export function RichText({ text }: { text: string }) {
  return text.split("`").map((part, i) => {
    if (i % 2 === 0) return part;
    return (
      <code key={i} className="rounded-md bg-code px-1.5 py-0.5 font-mono text-[0.9em]">
        {part}
      </code>
    );
  });
}
