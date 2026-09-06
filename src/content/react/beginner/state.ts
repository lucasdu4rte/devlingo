import type { Unit } from "@/content/types";

export const state: Unit = {
  id: "state",
  title: { en: "State with useState", "pt-BR": "Estado com useState" },
  lessons: [
    {
      id: "state-1",
      title: { en: "Why state?", "pt-BR": "Por que estado?" },
      description: {
        en: "Understand why a plain variable does not update the screen.",
        "pt-BR": "Entenda por que uma variável comum não atualiza a tela.",
      },
      xp: 10,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Why doesn't the UI update when inc() runs?",
            "pt-BR": "Por que a UI não atualiza quando inc() roda?",
          },
          code: `let count = 0;\nfunction inc() {\n  count++;\n}`,
          options: [
            {
              en: "React doesn't know the value changed, so it doesn't re-render",
              "pt-BR": "O React não sabe que o valor mudou, então não renderiza de novo",
            },
            { en: "count is not a number", "pt-BR": "count não é um número" },
            { en: "inc() throws an error", "pt-BR": "inc() lança um erro" },
            {
              en: "JSX caches old values forever",
              "pt-BR": "JSX guarda valores antigos para sempre",
            },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is state in a React component?",
            "pt-BR": "O que é estado (state) em um componente React?",
          },
          options: [
            {
              en: "Data that React tracks and re-renders the UI when it changes",
              "pt-BR":
                "Dados que o React acompanha e que fazem a UI renderizar de novo quando mudam",
            },
            {
              en: "Any variable declared inside a function",
              "pt-BR": "Qualquer variável declarada dentro de uma função",
            },
            { en: "The component's props", "pt-BR": "As props do componente" },
            { en: "CSS applied to the component", "pt-BR": "O CSS aplicado ao componente" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Import the hook used to add state to a component",
            "pt-BR": "Importe o hook usado para adicionar estado a um componente",
          },
          code: `import { ___ } from "react";`,
          answer: "useState",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Where must hooks like useState be called?",
            "pt-BR": "Onde hooks como useState devem ser chamados?",
          },
          options: [
            {
              en: "At the top level of a component, not inside conditionals or loops",
              "pt-BR": "No nível superior do componente, não dentro de condicionais ou laços",
            },
            { en: "Anywhere in the file", "pt-BR": "Em qualquer lugar do arquivo" },
            { en: "Only inside useEffect", "pt-BR": "Somente dentro de useEffect" },
            { en: "Only in class components", "pt-BR": "Somente em componentes de classe" },
          ],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 things useState returns",
            "pt-BR": "Escolha as 2 coisas que useState retorna",
          },
          options: [
            { en: "The current value", "pt-BR": "O valor atual" },
            {
              en: "A function to update the value",
              "pt-BR": "Uma função para atualizar o valor",
            },
            {
              en: "The previous render's props",
              "pt-BR": "As props da renderização anterior",
            },
            { en: "A reference to the DOM node", "pt-BR": "Uma referência ao nó do DOM" },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which naming convention is idiomatic for state?",
            "pt-BR": "Qual convenção de nomes é idiomática para estado?",
          },
          options: [
            { en: "const [count, setCount] = useState(0);" },
            { en: "const [count, count2] = useState(0);" },
            { en: "const [getCount, count] = useState(0);" },
            { en: "const state = useState(0);" },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "state-2",
      title: { en: "Updating state", "pt-BR": "Atualizando o estado" },
      description: {
        en: "Set new values and trigger re-renders.",
        "pt-BR": "Defina novos valores e dispare novas renderizações.",
      },
      xp: 15,
      exercises: [
        {
          type: "fill-blank",
          prompt: { en: "Start the counter at zero", "pt-BR": "Comece o contador em zero" },
          code: `const [count, setCount] = useState(___);`,
          answer: "0",
        },
        {
          type: "single-choice",
          prompt: {
            en: "What happens when this runs inside a click handler?",
            "pt-BR": "O que acontece quando isso roda dentro de um handler de clique?",
          },
          code: `function handleClick() {\n  setCount(count + 1);\n}`,
          options: [
            {
              en: "React re-renders the component with the new count",
              "pt-BR": "O React renderiza o componente de novo com o novo count",
            },
            { en: "count is mutated in place", "pt-BR": "count é mutado no lugar" },
            {
              en: "Nothing happens until the page reloads",
              "pt-BR": "Nada acontece até a página recarregar",
            },
            { en: "It throws an error", "pt-BR": "Lança um erro" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "Why must you call setCount instead of reassigning count directly?",
            "pt-BR": "Por que você deve chamar setCount em vez de reatribuir count diretamente?",
          },
          options: [
            {
              en: "React only knows to re-render when you call the setter function",
              "pt-BR":
                "O React só sabe que precisa renderizar de novo quando você chama a função setter",
            },
            { en: "count is stored on the server", "pt-BR": "count fica armazenado no servidor" },
            {
              en: "Reassigning count deletes the component",
              "pt-BR": "Reatribuir count apaga o componente",
            },
            { en: "JSX ignores all variables", "pt-BR": "JSX ignora todas as variáveis" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Use the updater function form to avoid stale state",
            "pt-BR": "Use a forma de função atualizadora para evitar estado desatualizado",
          },
          code: `setCount(___ => c + 1);`,
          answer: "c",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about state",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre estado",
          },
          options: [
            {
              en: "React can batch multiple state updates into one re-render",
              "pt-BR":
                "O React pode agrupar várias atualizações de estado em uma única renderização",
            },
            {
              en: "State is local to that component instance",
              "pt-BR": "O estado é local àquela instância do componente",
            },
            {
              en: "State is shared automatically between all instances of a component",
              "pt-BR":
                "O estado é compartilhado automaticamente entre todas as instâncias de um componente",
            },
            {
              en: "State updates always happen synchronously and immediately",
              "pt-BR": "Atualizações de estado sempre acontecem de forma síncrona e imediata",
            },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "If count starts at 0, what is count after one click?",
            "pt-BR": "Se count começa em 0, qual é o valor depois de um clique?",
          },
          code: `function handleClick() {\n  setCount(count + 1);\n  setCount(count + 1);\n}`,
          options: [
            {
              en: "1, because count is stale in both calls",
              "pt-BR": "1, porque count está desatualizado nas duas chamadas",
            },
            {
              en: "2, because both calls add 1",
              "pt-BR": "2, porque as duas chamadas somam 1",
            },
            {
              en: "0, because state doesn't update",
              "pt-BR": "0, porque o estado não atualiza",
            },
            { en: "It throws an error", "pt-BR": "Lança um erro" },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "state-3",
      title: { en: "Objects and arrays in state", "pt-BR": "Objetos e arrays no estado" },
      description: {
        en: "Replace, never mutate.",
        "pt-BR": "Substitua, nunca mute.",
      },
      xp: 15,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Why doesn't the UI update after this?",
            "pt-BR": "Por que a UI não atualiza depois disso?",
          },
          code: `user.name = "Ada";\nsetUser(user);`,
          options: [
            {
              en: "setUser receives the same object reference, so React sees no change",
              "pt-BR":
                "setUser recebe a mesma referência de objeto, então o React não percebe mudança",
            },
            {
              en: "user.name cannot be reassigned",
              "pt-BR": "user.name não pode ser reatribuído",
            },
            {
              en: "setUser only works with numbers",
              "pt-BR": "setUser só funciona com números",
            },
            {
              en: "React re-renders but doesn't repaint",
              "pt-BR": "O React renderiza de novo, mas não repinta",
            },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Spread the existing user and override the name",
            "pt-BR": "Espalhe o user existente e sobrescreva o nome",
          },
          code: `setUser({ ___user, name: "Ada" });`,
          answer: "...",
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you add an item to an array in state?",
            "pt-BR": "Como adicionar um item a um array no estado?",
          },
          options: [
            { en: "setItems([...items, item])" },
            { en: "items.push(item)" },
            { en: "setItems(items.push(item))" },
            { en: "items[items.length] = item" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Remove the item with the matching id",
            "pt-BR": "Remova o item com o id correspondente",
          },
          code: `setItems(items.___(i => i.id !== id));`,
          answer: "filter",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 methods that mutate an array in place",
            "pt-BR": "Escolha os 2 métodos que mutam um array no lugar",
          },
          options: [{ en: "push" }, { en: "splice" }, { en: "map" }, { en: "filter" }],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "How many useState calls can a single component have?",
            "pt-BR": "Quantas chamadas de useState um único componente pode ter?",
          },
          options: [
            {
              en: "Any number, one per independent piece of state",
              "pt-BR": "Qualquer quantidade, uma para cada pedaço independente de estado",
            },
            { en: "Exactly one", "pt-BR": "Exatamente uma" },
            { en: "At most three", "pt-BR": "No máximo três" },
            {
              en: "Zero, state must be an object",
              "pt-BR": "Zero, o estado precisa ser um objeto",
            },
          ],
          correct: 0,
        },
      ],
    },
  ],
};
