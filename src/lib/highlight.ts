import { codeToHtml } from "shiki";

// ponytail: single dark theme; the code block stays dark in light mode by design.
export async function highlight(code: string) {
  const html = await codeToHtml(code, { lang: "tsx", theme: "catppuccin-mocha" });
  return html.replace("___", '<span class="blank">___</span>');
}
