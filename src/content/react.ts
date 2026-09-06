import type { Track, Unit } from "./types";
import { jsxBasics } from "./react/beginner/jsx-basics";
import { componentsProps } from "./react/beginner/components-props";
import { state } from "./react/beginner/state";
import { events } from "./react/beginner/events";

const soon = (id: string, en: string, ptBR: string): Unit => ({
  id,
  title: { en, "pt-BR": ptBR },
  lessons: [],
});

export const react: Track = {
  id: "react",
  title: { en: "React" },
  levels: [
    {
      id: "beginner",
      title: { en: "Beginner", "pt-BR": "Iniciante" },
      units: [
        jsxBasics,
        componentsProps,
        state,
        events,
        soon("lists-keys", "Lists & keys", "Listas e keys"),
        soon("conditional-rendering", "Conditional rendering", "Renderização condicional"),
        soon("forms", "Forms", "Formulários"),
      ],
    },
    {
      id: "intermediate",
      title: { en: "Intermediate", "pt-BR": "Intermediário" },
      units: [
        soon("use-effect", "useEffect", "useEffect"),
        soon("lifting-state", "Lifting state up", "Elevando o estado"),
        soon("context", "Context", "Context"),
        soon("refs", "Refs", "Refs"),
        soon("custom-hooks", "Custom hooks", "Hooks customizados"),
        soon("performance", "Performance basics", "Básico de performance"),
      ],
    },
    {
      id: "advanced",
      title: { en: "Advanced", "pt-BR": "Avançado" },
      units: [
        soon("reducers", "Reducers", "Reducers"),
        soon("suspense", "Suspense & lazy", "Suspense e lazy"),
        soon("error-boundaries", "Error boundaries", "Error boundaries"),
        soon("portals", "Portals", "Portals"),
        soon("render-patterns", "Render patterns", "Padrões de renderização"),
        soon("testing", "Testing components", "Testando componentes"),
      ],
    },
    {
      id: "expert",
      title: { en: "Expert", "pt-BR": "Especialista" },
      units: [
        soon("concurrent", "Concurrent rendering", "Renderização concorrente"),
        soon("server-components", "Server components", "Server components"),
        soon("compiler", "Compiler & memoization", "Compilador e memoização"),
        soon("reconciliation", "Reconciliation internals", "Internals da reconciliação"),
      ],
    },
  ],
};
