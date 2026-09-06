export function CodeBlock({ html }: { html: string }) {
  return <div className="font-mono" dangerouslySetInnerHTML={{ __html: html }} />;
}
