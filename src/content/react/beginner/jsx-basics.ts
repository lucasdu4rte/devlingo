import type { Unit } from "@/content/types";

export const jsxBasics: Unit = {
  id: "jsx-basics",
  title: { en: "JSX basics", "pt-BR": "Básico de JSX" },
  lessons: [
    {
      id: "jsx-basics-1",
      title: { en: "What is JSX?", "pt-BR": "O que é JSX?" },
      description: {
        en: "Learn what JSX is and how it turns into React elements.",
        "pt-BR": "Entenda o que é JSX e como ele vira elementos React.",
      },
      xp: 10,
      exercises: [
        {
          type: "single-choice",
          prompt: { en: "What is JSX?", "pt-BR": "O que é JSX?" },
          options: [
            { en: "A new programming language", "pt-BR": "Uma nova linguagem de programação" },
            {
              en: "A syntax extension that lets you write markup inside JavaScript",
              "pt-BR": "Uma extensão de sintaxe para escrever marcação dentro do JavaScript",
            },
            { en: "A CSS preprocessor", "pt-BR": "Um pré-processador de CSS" },
            {
              en: "A templating engine that runs on the server",
              "pt-BR": "Um motor de templates que roda no servidor",
            },
          ],
          correct: 1,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does this expression evaluate to?",
            "pt-BR": "O que essa expressão produz?",
          },
          code: `const el = <h1>Hi</h1>;`,
          options: [
            { en: "A real DOM node", "pt-BR": "Um nó real do DOM" },
            { en: 'The string "<h1>Hi</h1>"', "pt-BR": 'A string "<h1>Hi</h1>"' },
            {
              en: "A React element describing an h1",
              "pt-BR": "Um elemento React descrevendo um h1",
            },
            { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
          ],
          correct: 2,
        },
        {
          type: "fill-blank",
          prompt: { en: "Complete the equivalent call", "pt-BR": "Complete a chamada equivalente" },
          code: `const el = React.___("h1", null, "Hi");`,
          answer: "createElement",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about JSX",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre JSX",
          },
          options: [
            { en: "JSX is required to use React", "pt-BR": "JSX é obrigatório para usar React" },
            {
              en: "Browsers cannot run JSX directly",
              "pt-BR": "Navegadores não executam JSX diretamente",
            },
            {
              en: "JSX only works with class components",
              "pt-BR": "JSX só funciona com componentes de classe",
            },
            {
              en: "JSX compiles to function calls",
              "pt-BR": "JSX compila para chamadas de função",
            },
          ],
          correct: [1, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which file extension is conventional for React components with JSX in TypeScript?",
            "pt-BR": "Qual extensão é a convenção para componentes React com JSX em TypeScript?",
          },
          options: [{ en: ".jsx" }, { en: ".ts" }, { en: ".html" }, { en: ".tsx" }],
          correct: 3,
        },
        {
          type: "single-choice",
          prompt: { en: "Why does this fail to compile?", "pt-BR": "Por que isso não compila?" },
          code: `return <h1>Hi</h1><p>There</p>;`,
          options: [
            {
              en: "JSX must return a single root element",
              "pt-BR": "JSX precisa retornar um único elemento raiz",
            },
            { en: "p is not allowed after h1", "pt-BR": "p não pode vir depois de h1" },
            { en: "return cannot contain JSX", "pt-BR": "return não pode conter JSX" },
            { en: "It compiles fine", "pt-BR": "Compila normalmente" },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "jsx-basics-2",
      title: { en: "Expressions in JSX", "pt-BR": "Expressões no JSX" },
      description: {
        en: "Embed variables and function calls with curly braces.",
        "pt-BR": "Insira variáveis e chamadas de função com chaves.",
      },
      xp: 15,
      exercises: [
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const name = "Ada";\nconst el = <h1>Hello, {name}</h1>;`,
          options: [
            { en: "Hello, {name}" },
            { en: "Hello, name" },
            { en: "Hello, Ada" },
            { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
          ],
          correct: 2,
        },
        {
          type: "fill-blank",
          prompt: { en: "Embed the expression", "pt-BR": "Insira a expressão" },
          code: `const el = <p>Total: ___price * 2}</p>;`,
          answer: "{",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which of these can go inside curly braces in JSX?",
            "pt-BR": "O que pode ir dentro das chaves no JSX?",
          },
          options: [
            { en: "Only variables", "pt-BR": "Apenas variáveis" },
            { en: "if statements", "pt-BR": "Instruções if" },
            { en: "for loops", "pt-BR": "Laços for" },
            { en: "Any JavaScript expression", "pt-BR": "Qualquer expressão JavaScript" },
          ],
          correct: 3,
        },
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const el = <p>{2 + 3}</p>;`,
          options: [{ en: "5" }, { en: "2 + 3" }, { en: "{5}" }, { en: "23" }],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 values React renders as nothing",
            "pt-BR": "Escolha os 2 valores que o React renderiza como nada",
          },
          options: [{ en: "null" }, { en: "0" }, { en: '"" + 1' }, { en: "false" }],
          correct: [0, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you call a function inside JSX?",
            "pt-BR": "Como chamar uma função dentro do JSX?",
          },
          options: [
            { en: "<p>format(date)</p>" },
            { en: "<p>{format(date)}</p>" },
            { en: "<p>{{ format(date) }}</p>" },
            { en: "<p>%format(date)%</p>" },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Interpolate the size into the class name",
            "pt-BR": "Interpole o tamanho no nome da classe",
          },
          code: "const el = <div className={`card ___{size}`}>...</div>;",
          answer: "$",
        },
      ],
    },
    {
      id: "jsx-basics-3",
      title: { en: "Attributes and children", "pt-BR": "Atributos e filhos" },
      description: {
        en: "className, camelCase attributes, and nesting elements.",
        "pt-BR": "className, atributos em camelCase e aninhamento de elementos.",
      },
      xp: 15,
      exercises: [
        {
          type: "fill-blank",
          prompt: { en: "Set a CSS class in JSX", "pt-BR": "Defina uma classe CSS no JSX" },
          code: `const el = <div ___="card">Hi</div>;`,
          answer: "className",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which attribute name is correct in JSX?",
            "pt-BR": "Qual nome de atributo está correto no JSX?",
          },
          options: [{ en: "onclick" }, { en: "on-click" }, { en: "OnClick" }, { en: "onClick" }],
          correct: 3,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you pass a number as an attribute?",
            "pt-BR": "Como passar um número como atributo?",
          },
          options: [
            { en: "<Item count={3} />" },
            { en: '<Item count="3" />' },
            { en: "<Item count=3 />" },
            { en: "<Item count={{3}} />" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is the JSX equivalent of the HTML for attribute on a label?",
            "pt-BR": "Qual o equivalente em JSX do atributo for de um label?",
          },
          options: [{ en: "for" }, { en: "htmlFor" }, { en: "labelFor" }, { en: "forId" }],
          correct: 1,
        },
        {
          type: "single-choice",
          prompt: { en: "What does this render?", "pt-BR": "O que isso renderiza?" },
          code: `const el = (\n  <ul>\n    <li>One</li>\n    <li>Two</li>\n  </ul>\n);`,
          options: [
            { en: "Two separate lists", "pt-BR": "Duas listas separadas" },
            {
              en: "A syntax error because of the parentheses",
              "pt-BR": "Um erro de sintaxe por causa dos parênteses",
            },
            { en: "A list with two items", "pt-BR": "Uma lista com dois itens" },
            { en: "Only the last item", "pt-BR": "Só o último item" },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you group siblings without adding a DOM node?",
            "pt-BR": "Como agrupar irmãos sem adicionar um nó no DOM?",
          },
          options: [
            { en: "<div>...</div>" },
            { en: "<group>...</group>" },
            { en: "[...] (an array)", "pt-BR": "[...] (um array)" },
            { en: "<>...</> (a Fragment)", "pt-BR": "<>...</> (um Fragment)" },
          ],
          correct: 3,
        },
      ],
    },
  ],
};
