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
      xp: 20,
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
            en: "After this line runs, what is stored in `el`?",
            "pt-BR": "Depois que essa linha roda, o que fica guardado em `el`?",
          },
          code: `const el = <h1>Hi</h1>;`,
          options: [
            {
              en: "An actual `<h1>` DOM node, already on the page",
              "pt-BR": "Um nó `<h1>` real do DOM, já na página",
            },
            {
              en: 'The text `"<h1>Hi</h1>"` as a plain string',
              "pt-BR": 'O texto `"<h1>Hi</h1>"` como uma string comum',
            },
            {
              en: "A plain JavaScript object describing an `h1` (a React element)",
              "pt-BR": "Um objeto JavaScript comum descrevendo um `h1` (um elemento React)",
            },
            {
              en: "Nothing: JSX cannot be assigned to a variable",
              "pt-BR": "Nada: JSX não pode ser atribuído a uma variável",
            },
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
            { en: "`p` is not allowed after `h1`", "pt-BR": "`p` não pode vir depois de `h1`" },
            { en: "`return` cannot contain JSX", "pt-BR": "`return` não pode conter JSX" },
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
      xp: 30,
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
            { en: "`if` statements", "pt-BR": "Instruções `if`" },
            { en: "`for` loops", "pt-BR": "Laços `for`" },
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
        en: "`className`, camelCase attributes, and nesting elements.",
        "pt-BR": "`className`, atributos em camelCase e aninhamento de elementos.",
      },
      xp: 30,
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
            en: "What is the JSX equivalent of the HTML `for` attribute on a `label`?",
            "pt-BR": "Qual o equivalente em JSX do atributo `for` de um `label`?",
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
            { en: "`[...]` (an array)", "pt-BR": "`[...]` (um array)" },
            { en: "`<>...</>` (a `Fragment`)", "pt-BR": "`<>...</>` (um `Fragment`)" },
          ],
          correct: 3,
        },
      ],
    },
  ],
  sideQuest: {
    id: "jsx-basics-extra",
    title: { en: "Styling components", "pt-BR": "Estilizando componentes" },
    description: {
      en: "Compare where component styles can live and the trade-off each approach makes.",
      "pt-BR":
        "Compare onde os estilos de um componente podem viver e a troca que cada abordagem faz.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "Two different components each define a class named `.title` in their own plain CSS file, and both files get loaded on the same page. What happens?",
          "pt-BR":
            "Dois componentes diferentes definem uma classe chamada `.title` em seus próprios arquivos CSS simples, e os dois arquivos são carregados na mesma página. O que acontece?",
        },
        options: [
          {
            en: "Both stylesheets are merged without any conflict",
            "pt-BR": "Os dois arquivos CSS são combinados sem nenhum conflito",
          },
          {
            en: "The build fails with a duplicate class name error",
            "pt-BR": "O build falha com um erro de nome de classe duplicado",
          },
          {
            en: "Whichever stylesheet loads last wins, and one component's `.title` styles override the other's",
            "pt-BR":
              "O arquivo CSS que carrega por último vence, e os estilos de `.title` de um componente sobrescrevem os do outro",
          },
          {
            en: "React automatically renames one of the classes to avoid the clash",
            "pt-BR": "O React renomeia automaticamente uma das classes para evitar o conflito",
          },
        ],
        correct: 2,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Complete the import so the binding matches the one used below",
          "pt-BR": "Complete o import para que o nome bata com o usado abaixo",
        },
        code: `import ___ from "./Card.module.css";\n\nfunction Card() {\n  return <div className={styles.card}>Hi</div>;\n}`,
        answer: "styles",
      },
      {
        type: "single-choice",
        prompt: {
          en: "Given `styles.card` from a CSS Modules import, what ends up in the rendered `className`?",
          "pt-BR":
            "Dado `styles.card` de um import do CSS Modules, o que acaba no `className` renderizado?",
        },
        code: `import styles from "./Card.module.css";\nfunction Card() {\n  return <div className={styles.card}>Hi</div>;\n}`,
        options: [
          { en: 'The literal string `"card"`', "pt-BR": 'A string literal `"card"`' },
          {
            en: 'A unique hashed string like `"Card_card__a1b2c"`',
            "pt-BR": 'Uma string única com hash, como `"Card_card__a1b2c"`',
          },
          {
            en: "`undefined`, because `styles.card` must be called as a function",
            "pt-BR": "`undefined`, porque `styles.card` precisa ser chamado como função",
          },
          {
            en: "The object `{ card: ... }` itself",
            "pt-BR": "O próprio objeto `{ card: ... }`",
          },
        ],
        correct: 1,
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 true statements about utility-class libraries like Tailwind CSS",
          "pt-BR":
            "Escolha as 2 afirmações verdadeiras sobre bibliotecas de classes utilitárias, como o Tailwind CSS",
        },
        options: [
          {
            en: "You compose styles by combining many small, single-purpose classes directly in the JSX",
            "pt-BR":
              "Você compõe estilos combinando várias classes pequenas e de propósito único direto no JSX",
          },
          {
            en: "Utility classes eliminate the need to write any custom CSS, ever",
            "pt-BR":
              "Classes utilitárias eliminam para sempre a necessidade de escrever CSS customizado",
          },
          {
            en: "They reduce the need to invent a unique class name for every one-off style",
            "pt-BR":
              "Elas reduzem a necessidade de inventar um nome de classe único para cada estilo pontual",
          },
          {
            en: "Utility classes are automatically scoped to the component that uses them, like CSS Modules",
            "pt-BR":
              "Classes utilitárias têm escopo automático para o componente que as usa, como o CSS Modules",
          },
        ],
        correct: [0, 2],
      },
      {
        type: "single-choice",
        prompt: {
          en: "A CSS-in-JS library that computes styles while the app runs in the browser, instead of at build time. What's the cost?",
          "pt-BR":
            "Uma biblioteca CSS-in-JS que calcula os estilos enquanto o app roda no navegador, em vez de em tempo de build. Qual é o custo?",
        },
        options: [
          {
            en: "It cannot use JavaScript variables inside styles",
            "pt-BR": "Ela não consegue usar variáveis JavaScript dentro dos estilos",
          },
          {
            en: "It requires a dedicated server to run",
            "pt-BR": "Ela exige um servidor dedicado para rodar",
          },
          {
            en: "It always fails to override existing styles",
            "pt-BR": "Ela sempre falha ao sobrescrever estilos existentes",
          },
          {
            en: "It ships extra JavaScript to the browser and computes styles at runtime, adding bundle size and runtime cost",
            "pt-BR":
              "Ela envia JavaScript extra para o navegador e calcula os estilos em tempo de execução, aumentando o tamanho do bundle e o custo de runtime",
          },
        ],
        correct: 3,
      },
      {
        type: "single-choice",
        prompt: {
          en: "Why does the inline `style` attribute take a JavaScript object instead of a CSS string?",
          "pt-BR":
            "Por que o atributo `style` inline recebe um objeto JavaScript em vez de uma string CSS?",
        },
        code: `<div style={{ color: "red", fontSize: 14 }}>Hi</div>`,
        options: [
          {
            en: "JSX attributes inside curly braces must be JavaScript values, and inline styles use camelCase keys like `fontSize`",
            "pt-BR":
              "Atributos JSX dentro de chaves precisam ser valores JavaScript, e estilos inline usam chaves em camelCase como `fontSize`",
          },
          {
            en: "Only objects can be sent over the network",
            "pt-BR": "Só objetos podem ser enviados pela rede",
          },
          {
            en: "Strings are not allowed anywhere in JSX",
            "pt-BR": "Strings não são permitidas em nenhum lugar do JSX",
          },
          {
            en: "`style` only accepts numeric values",
            "pt-BR": "`style` só aceita valores numéricos",
          },
        ],
        correct: 0,
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 true statements about these styling approaches",
          "pt-BR": "Escolha as 2 afirmações verdadeiras sobre essas abordagens de estilização",
        },
        options: [
          {
            en: "Plain stylesheets give no protection against class name collisions across files",
            "pt-BR":
              "Arquivos CSS simples não dão nenhuma proteção contra colisões de nomes de classe entre arquivos",
          },
          {
            en: "Inline `style` objects can't express pseudo-classes like `:hover` or media queries",
            "pt-BR":
              "Objetos `style` inline não conseguem expressar pseudo-classes como `:hover` ou media queries",
          },
          {
            en: "CSS Modules only work if you also add a runtime CSS-in-JS library",
            "pt-BR":
              "O CSS Modules só funciona se você também adicionar uma biblioteca CSS-in-JS em runtime",
          },
          {
            en: "Utility-class libraries always produce a smaller final CSS bundle than hand-written stylesheets",
            "pt-BR":
              "Bibliotecas de classes utilitárias sempre produzem um bundle CSS final menor que folhas de estilo escritas à mão",
          },
        ],
        correct: [0, 1],
      },
    ],
  },
};
