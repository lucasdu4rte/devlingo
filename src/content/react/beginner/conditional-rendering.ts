import type { Unit } from "@/content/types";

export const conditionalRendering: Unit = {
  id: "conditional-rendering",
  title: { en: "Conditional rendering", "pt-BR": "Renderização condicional" },
  lessons: [
    {
      id: "conditional-rendering-1",
      title: { en: "Ternaries and if/else", "pt-BR": "Ternários e if/else" },
      description: {
        en: "Choose between elements using JavaScript conditions.",
        "pt-BR": "Escolha entre elementos usando condições JavaScript.",
      },
      xp: 20,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Which operator lets you choose between two JSX elements inline inside curly braces?",
            "pt-BR":
              "Qual operador permite escolher entre dois elementos JSX inline dentro das chaves?",
          },
          options: [
            { en: "The `switch` statement", "pt-BR": "A instrução `switch`" },
            { en: "The ternary operator `? :`", "pt-BR": "O operador ternário `? :`" },
            { en: "The `while` loop", "pt-BR": "O laço `while`" },
            { en: "The `typeof` operator", "pt-BR": "O operador `typeof`" },
          ],
          correct: 1,
          explanation: {
            en: "The ternary operator is an expression, so it can live directly inside JSX curly braces.",
            "pt-BR":
              "O operador ternário é uma expressão, por isso pode ser colocado diretamente dentro das chaves no JSX.",
          },
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Complete the ternary operator to render `<UserMenu />` when logged in",
            "pt-BR":
              "Complete o operador ternário para renderizar `<UserMenu />` quando autenticado",
          },
          code: "const el = <div>{isLoggedIn ___ <UserMenu /> : <LoginButton />}</div>;",
          answer: "?",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Why can't you put a regular `if (condition) { ... }` directly inside JSX curly braces?",
            "pt-BR":
              "Por que não é permitido usar `if (condition) { ... }` diretamente dentro das chaves no JSX?",
          },
          options: [
            {
              en: "JSX curly braces only accept JavaScript expressions, but `if` is a statement",
              "pt-BR":
                "Chaves no JSX só aceitam expressões JavaScript, mas `if` é uma instrução (statement)",
            },
            {
              en: "React only supports conditions on the server",
              "pt-BR": "O React só suporta condições no servidor",
            },
            {
              en: "The browser deletes `if` statements before React loads",
              "pt-BR": "O navegador deleta instruções `if` antes do React carregar",
            },
            {
              en: "`if` statements only work inside HTML `<script>` tags",
              "pt-BR": "Instruções `if` só funcionam dentro de tags `<script>` do HTML",
            },
          ],
          correct: 0,
          explanation: {
            en: "JSX curly braces must evaluate to a value (an expression). Statements like `if` do not evaluate to values.",
            "pt-BR":
              "As chaves no JSX precisam ser avaliadas como um valor (expressão). Instruções como `if` não produzem valor.",
          },
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 valid ways to use `if` statements for conditional rendering in a component",
            "pt-BR":
              "Escolha as 2 formas válidas de usar instruções `if` para renderização condicional em um componente",
          },
          options: [
            {
              en: "Return early before the main `return` statement",
              "pt-BR": "Retornar antecipadamente antes do `return` principal",
            },
            {
              en: "Place `if` directly as a prop value: `<div visible={if (open)} />`",
              "pt-BR": "Colocar o `if` diretamente como prop: `<div visible={if (open)} />`",
            },
            {
              en: "Assign JSX to a variable conditionally before `return`",
              "pt-BR": "Atribuir JSX a uma variável condicionalmente antes do `return`",
            },
            {
              en: "Wrap the entire component declaration in an `if` statement",
              "pt-BR": "Envolver a declaração inteira do componente dentro de um `if`",
            },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What happens when a component returns `null`?",
            "pt-BR": "O que acontece quando um componente retorna `null`?",
          },
          options: [
            {
              en: "It throws a runtime error",
              "pt-BR": "Dispara um erro em tempo de execução",
            },
            {
              en: "React renders nothing to the DOM for this component",
              "pt-BR": "O React não renderiza nada no DOM para esse componente",
            },
            {
              en: 'It renders the literal text `"null"`',
              "pt-BR": 'Renderiza o texto literal `"null"`',
            },
            {
              en: "It deletes the entire parent element",
              "pt-BR": "Deleta todo o elemento pai",
            },
          ],
          correct: 1,
          explanation: {
            en: "Returning `null` tells React not to mount any DOM nodes for this component's render output.",
            "pt-BR":
              "Retornar `null` instrui o React a não montar nós do DOM na saída de renderização do componente.",
          },
        },
        {
          type: "single-choice",
          prompt: {
            en: "In this early return pattern, when does `<Dashboard />` render?",
            "pt-BR": "Neste padrão de retorno antecipado, quando `<Dashboard />` renderiza?",
          },
          code: "function Page({ isLoading }) {\n  if (isLoading) return <Spinner />;\n  return <Dashboard />;\n}",
          options: [
            {
              en: "Always, alongside `<Spinner />`",
              "pt-BR": "Sempre, ao lado do `<Spinner />`",
            },
            {
              en: "Only when `isLoading` is false",
              "pt-BR": "Apenas quando `isLoading` for falso",
            },
            {
              en: "Never, because `if` overrides `return`",
              "pt-BR": "Nunca, porque o `if` sobrescreve o `return`",
            },
            {
              en: "Only on the server",
              "pt-BR": "Apenas no servidor",
            },
          ],
          correct: 1,
        },
      ],
    },
    {
      id: "conditional-rendering-2",
      title: { en: "The logical && operator", "pt-BR": "O operador lógico &&" },
      description: {
        en: "Render an element when a condition is true, and avoid the 0 gotcha.",
        "pt-BR": "Renderize um elemento quando a condição for verdadeira e evite a pegadinha do 0.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "When `hasUnread` is `true`, what does this render?",
            "pt-BR": "Quando `hasUnread` é `true`, o que isso renderiza?",
          },
          code: "const el = <div>{hasUnread && <Badge />}</div>;",
          options: [
            { en: "Nothing at all", "pt-BR": "Nada" },
            { en: "The `<Badge />` component", "pt-BR": "O componente `<Badge />`" },
            { en: 'The text `"true"`', "pt-BR": 'O texto `"true"`' },
            { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
          ],
          correct: 1,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does this code render when `count` is `0`?",
            "pt-BR": "O que este código renderiza quando `count` é `0`?",
          },
          code: "const count = 0;\nconst el = <div>{count && <Badge />}</div>;",
          options: [
            { en: "Nothing", "pt-BR": "Nada" },
            {
              en: "The number `0` visible on screen",
              "pt-BR": "O número `0` visível na tela",
            },
            { en: "The `<Badge />` component", "pt-BR": "O componente `<Badge />`" },
            { en: "An unhandled exception", "pt-BR": "Uma exceção não tratada" },
          ],
          correct: 1,
          explanation: {
            en: "`0 && <Badge />` evaluates to `0`. Unlike `false`, React renders numbers (including `0`) into the DOM!",
            "pt-BR":
              "`0 && <Badge />` resulta em `0`. Diferente de `false`, o React renderiza números (incluindo `0`) no DOM!",
          },
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Coerce count to a boolean to prevent rendering `0`",
            "pt-BR": "Converta count para boolean para evitar renderizar `0`",
          },
          code: "const el = <div>{___(count) && <Badge />}</div>;",
          answer: "Boolean",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 safe ways to avoid the `0 && <Component />` rendering bug",
            "pt-BR": "Escolha as 2 formas seguras de evitar o bug de renderizar `0` com `&&`",
          },
          options: [
            { en: "count > 0 && <Badge />" },
            { en: "count ? <Badge /> : null" },
            { en: "count = true && <Badge />" },
            { en: "count - 1 && <Badge />" },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which of these falsy values will React render into the DOM as text instead of skipping?",
            "pt-BR":
              "Qual destes valores falsy o React renderiza no DOM como texto em vez de ignorar?",
          },
          options: [{ en: "null" }, { en: "undefined" }, { en: "false" }, { en: "NaN" }],
          correct: 3,
          explanation: {
            en: 'React ignores `null`, `undefined`, and booleans, but renders `NaN` as the string `"NaN"`.',
            "pt-BR":
              'O React ignora `null`, `undefined` e booleanos, mas renderiza `NaN` como o texto `"NaN"`.',
          },
        },
        {
          type: "single-choice",
          prompt: {
            en: "When `user` is `null`, what does `{user?.name && <span>{user.name}</span>}` render?",
            "pt-BR":
              "Quando `user` é `null`, o que `{user?.name && <span>{user.name}</span>}` renderiza?",
          },
          options: [
            {
              en: "A TypeError trying to read `user.name`",
              "pt-BR": "Um TypeError ao tentar ler `user.name`",
            },
            {
              en: "Nothing, because `undefined` is ignored by React",
              "pt-BR": "Nada, porque `undefined` é ignorado pelo React",
            },
            {
              en: 'The string `"undefined"`',
              "pt-BR": 'A string `"undefined"`',
            },
            {
              en: "An empty `<span>` tag",
              "pt-BR": "Uma tag `<span>` vazia",
            },
          ],
          correct: 1,
        },
      ],
    },
    {
      id: "conditional-rendering-3",
      title: { en: "Switch and lookup maps", "pt-BR": "Switch e mapas de lookup" },
      description: {
        en: "Handle complex multi-state rendering cleanly.",
        "pt-BR": "Lide com múltiplos estados de renderização de forma limpa.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "When a component has more than 3 states (e.g. idle, loading, success, error), what is a clean alternative to nested ternaries?",
            "pt-BR":
              "Quando um componente tem mais de 3 estados (ex: idle, loading, success, error), qual é uma alternativa limpa a ternários aninhados?",
          },
          options: [
            {
              en: "Chaining 10 `useMemo` calls",
              "pt-BR": "Encadear 10 chamadas de `useMemo`",
            },
            {
              en: "A JavaScript object acting as a lookup map",
              "pt-BR": "Um objeto JavaScript atuando como mapa de lookup",
            },
            {
              en: "Reloading the page on each state change",
              "pt-BR": "Recarregar a página a cada mudança de estado",
            },
            {
              en: "Using CSS `@media` print styles",
              "pt-BR": "Usar estilos CSS `@media` de impressão",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Access the view component for the current status from the map",
            "pt-BR": "Acesse o componente de visualização para o status atual no mapa",
          },
          code: "const views = { idle: <Idle />, loading: <Spinner />, error: <Error /> };\nconst el = views[___] ?? <Idle />;",
          answer: "status",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 key differences between conditionally unmounting a component and hiding it with `display: none`",
            "pt-BR":
              "Escolha as 2 principais diferenças entre desmontar condicionalmente um componente e escondê-lo com `display: none`",
          },
          options: [
            {
              en: "Unmounting destroys component state, while CSS hiding preserves it",
              "pt-BR":
                "Desmontar destrói o estado interno do componente, enquanto esconder com CSS o preserva",
            },
            {
              en: "CSS hiding completely removes DOM elements from memory",
              "pt-BR": "Esconder com CSS remove completamente os elementos do DOM da memória",
            },
            {
              en: "Unmounting runs cleanup functions in `useEffect`",
              "pt-BR": "Desmontar executa as funções de limpeza do `useEffect`",
            },
            {
              en: "`display: none` requires a dedicated React hook",
              "pt-BR": "`display: none` exige um hook dedicado do React",
            },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is an Immediately Invoked Function Expression (IIFE) useful for in JSX?",
            "pt-BR":
              "Para que uma Expressão de Função Imediatamente Invocada (IIFE) serve dentro do JSX?",
          },
          code: "<div>{(() => { switch(status) { case 'a': return <A />; default: return <B />; } })()}</div>",
          options: [
            {
              en: "To speed up JavaScript execution by 10x",
              "pt-BR": "Para acelerar a execução do JavaScript em 10x",
            },
            {
              en: "To create a permanent global variable",
              "pt-BR": "Para criar uma variável global permanente",
            },
            {
              en: "To run complex statements like `switch` inline inside JSX",
              "pt-BR": "Para executar instruções complexas como `switch` inline dentro do JSX",
            },
            {
              en: "To prevent React from re-rendering",
              "pt-BR": "Para impedir o React de renderizar novamente",
            },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "In a lookup map `{ [key: string]: React.ReactNode }`, why might storing component functions `() => <Item />` be preferred over pre-instantiated `<Item />` elements?",
            "pt-BR":
              "Em um mapa `{ [key: string]: React.ReactNode }`, por que guardar funções de componentes `() => <Item />` pode ser preferível a elementos pré-instanciados `<Item />`?",
          },
          options: [
            {
              en: "It prevents instantiating elements and evaluating props for branches that are not rendered",
              "pt-BR":
                "Evita instanciar elementos e avaliar props para ramificações que não serão renderizadas",
            },
            {
              en: "Functions are always faster than objects in JavaScript",
              "pt-BR": "Funções são sempre mais rápidas que objetos no JavaScript",
            },
            {
              en: "React cannot render objects from maps",
              "pt-BR": "O React não consegue renderizar objetos vindos de mapas",
            },
            {
              en: "It disables TypeScript type checking",
              "pt-BR": "Desativa a verificação de tipos do TypeScript",
            },
          ],
          correct: 0,
        },
      ],
    },
  ],
  sideQuest: {
    id: "conditional-rendering-extra",
    title: { en: "Feature flags", "pt-BR": "Feature flags" },
    description: {
      en: "Toggle features dynamically without redeploying code.",
      "pt-BR": "Ative ou desative funcionalidades dinamicamente sem novo deploy.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "What is the primary purpose of a feature flag in software delivery?",
          "pt-BR": "Qual é o objetivo principal de uma feature flag na entrega de software?",
        },
        options: [
          {
            en: "To compile TypeScript into WebAssembly",
            "pt-BR": "Compilar TypeScript em WebAssembly",
          },
          {
            en: "To decouple code deployment from feature release",
            "pt-BR": "Desacoplar o deploy de código do lançamento da funcionalidade",
          },
          {
            en: "To minify CSS files automatically",
            "pt-BR": "Minificar arquivos CSS automaticamente",
          },
          {
            en: "To replace unit tests in CI",
            "pt-BR": "Substituir testes unitários no CI",
          },
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Complete the hook call to query whether a flag is enabled",
          "pt-BR": "Complete a chamada do hook para verificar se a flag está ativa",
        },
        code: "const isNewCheckoutEnabled = useFeature___('new_checkout');",
        answer: "Flag",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 best practices when working with feature flags in React apps",
          "pt-BR":
            "Escolha as 2 melhores práticas ao trabalhar com feature flags em aplicações React",
        },
        options: [
          {
            en: "Wrap the vendor SDK in a custom hook or context provider",
            "pt-BR": "Envolver o SDK do fornecedor em um hook customizado ou provider de contexto",
          },
          {
            en: "Keep feature flags in code forever as permanent if/else statements",
            "pt-BR":
              "Manter as feature flags no código para sempre como instruções if/else permanentes",
          },
          {
            en: "Remove obsolete flags and old code paths once a feature is 100% rolled out",
            "pt-BR":
              "Remover flags obsoletas e caminhos de código antigos assim que a funcionalidade estiver 100% liberada",
          },
          {
            en: "Commit secret API keys directly into JSX components",
            "pt-BR": "Commエクitar chaves de API secretas diretamente dentro de componentes JSX",
          },
        ],
        correct: [0, 2],
      },
      {
        type: "single-choice",
        prompt: {
          en: "What is 'feature flag debt'?",
          "pt-BR": "O que é o 'débito técnico de feature flags'?",
        },
        options: [
          {
            en: "Unused, stale flag branches left behind in code after rollout, adding complexity",
            "pt-BR":
              "Ramificações de flags antigas esquecidas no código após o rollout, aumentando a complexidade",
          },
          {
            en: "The monetary cost of a cloud subscription",
            "pt-BR": "O custo financeiro da assinatura em nuvem",
          },
          {
            en: "A bug caused by missing semicolons",
            "pt-BR": "Um bug causado por falta de ponto e vírgula",
          },
          {
            en: "A feature that was rejected in code review",
            "pt-BR": "Uma funcionalidade reprovada no code review",
          },
        ],
        correct: 0,
      },
      {
        type: "single-choice",
        prompt: {
          en: "Why is evaluating feature flags during Server-Side Rendering (SSR) often preferred over purely client-side evaluation?",
          "pt-BR":
            "Por que avaliar feature flags durante o Server-Side Rendering (SSR) é frequentemente preferível à avaliação puramente no cliente?",
        },
        options: [
          {
            en: "Browsers refuse to execute boolean checks in JavaScript",
            "pt-BR": "Navegadores se recusam a executar checagens booleanas no JavaScript",
          },
          {
            en: "SSR flags completely disable caching forever",
            "pt-BR": "Flags no SSR desativam completamente o cache para sempre",
          },
          {
            en: "It prevents content layout shifts (flicker) when the flag resolves after page load",
            "pt-BR":
              "Evita oscilação de layout (flicker) quando a flag é resolvida após o carregamento da página",
          },
          {
            en: "Client-side code cannot access variables",
            "pt-BR": "O código no cliente não consegue acessar variáveis",
          },
        ],
        correct: 2,
      },
    ],
  },
  challenge: [
    {
      type: "single-choice",
      prompt: {
        en: "What does this render when `items` is an empty array `[]`?",
        "pt-BR": "O que isso renderiza quando `items` é um array vazio `[]`?",
      },
      code: "const items = [];\nreturn <div>{items.length && <List items={items} />}</div>;",
      options: [
        { en: "Nothing" },
        { en: "The number 0", "pt-BR": "O número 0" },
        { en: "<List items={[]} />" },
        { en: "A RangeError", "pt-BR": "Um RangeError" },
      ],
      correct: 1,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Use nullish coalescing to fall back when title is null or undefined",
        "pt-BR": "Use coalescência nula para valor padrão quando title for null ou undefined",
      },
      code: "const heading = title ___ 'Default Title';",
      answer: "??",
    },
    {
      type: "single-choice",
      prompt: {
        en: "How do you pass a click handler without immediately calling it during render?",
        "pt-BR":
          "Como passar um manipulador de clique sem chamá-lo imediatamente durante a renderização?",
      },
      options: [
        { en: "onClick={handleClick()}" },
        { en: "onClick={handleClick}" },
        { en: "onClick=handleClick" },
        { en: "onClick={() => handleClick()()}" },
      ],
      correct: 1,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 values that React completely omits from the DOM output",
        "pt-BR": "Escolha os 2 valores que o React omite completamente da saída do DOM",
      },
      options: [{ en: "false" }, { en: "0" }, { en: "undefined" }, { en: "NaN" }],
      correct: [0, 2],
    },
    {
      type: "single-choice",
      prompt: {
        en: "What is the primary purpose of the `key` prop when rendering lists?",
        "pt-BR": "Qual é o objetivo principal da prop `key` ao renderizar listas?",
      },
      options: [
        {
          en: "To style the element with CSS automatically",
          "pt-BR": "Estilizar o elemento com CSS automaticamente",
        },
        {
          en: "To assign a database primary key on the server",
          "pt-BR": "Atribuir uma chave primária de banco de dados no servidor",
        },
        {
          en: "To help React identify which items have changed, been added, or removed across renders",
          "pt-BR":
            "Ajudar o React a identificar quais itens mudaram, foram adicionados ou removidos entre renderizações",
        },
        {
          en: "To sort list items in alphabetical order",
          "pt-BR": "Ordenar itens da lista em ordem alfabética",
        },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "Why should you avoid using the array index as a list `key` when list items can be reordered or filtered?",
        "pt-BR":
          "Por que você deve evitar usar o índice do array como `key` quando itens da lista podem ser reordenados ou filtrados?",
      },
      options: [
        {
          en: "Indices are rejected by TypeScript compilers",
          "pt-BR": "Índices são rejeitados por compiladores TypeScript",
        },
        {
          en: "Arrays in JavaScript cannot have more than 10 keys",
          "pt-BR": "Arrays no JavaScript não podem ter mais de 10 chaves",
        },
        {
          en: "React crashes with an OutOfMemory error",
          "pt-BR": "O React quebra com erro de OutOfMemory",
        },
        {
          en: "It causes state bugs and incorrect component updates when items move",
          "pt-BR":
            "Provoca bugs de estado e atualizações incorretas de componentes quando itens se movem",
        },
      ],
      correct: 3,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Complete the updater function inside useState",
        "pt-BR": "Complete a função updater dentro do useState",
      },
      code: "setCount(prev => prev ___ 1);",
      answer: "+",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What happens if you mutate state directly, e.g. `user.name = 'Ada'` without calling the setter function?",
        "pt-BR":
          "O que acontece se você mutar o estado diretamente, ex: `user.name = 'Ada'`, sem chamar a função setter?",
      },
      options: [
        {
          en: "The browser immediately freezes",
          "pt-BR": "O navegador trava imediatamente",
        },
        {
          en: "React automatically creates a deep clone",
          "pt-BR": "O React cria automaticamente um clone profundo",
        },
        {
          en: "React does not know state changed, so no re-render is triggered",
          "pt-BR":
            "O React não sabe que o estado mudou, portanto nenhuma re-renderização é disparada",
        },
        {
          en: "The component unmounts instantly",
          "pt-BR": "O componente é desmontado instantaneamente",
        },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "In React, what are props?",
        "pt-BR": "No React, o que são props?",
      },
      options: [
        {
          en: "Mutable state that the child component modifies directly",
          "pt-BR": "Estado mutável que o componente filho modifica diretamente",
        },
        {
          en: "Read-only inputs passed from a parent component to a child component",
          "pt-BR":
            "Entradas somente leitura passadas de um componente pai para um componente filho",
        },
        {
          en: "Global variables accessible anywhere in the window object",
          "pt-BR": "Variáveis globais acessíveis em qualquer lugar no objeto window",
        },
        {
          en: "CSS properties applied only to `<div>` elements",
          "pt-BR": "Propriedades CSS aplicadas apenas a elementos `<div>`",
        },
      ],
      correct: 1,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 valid ways to conditionally render JSX elements",
        "pt-BR": "Escolha as 2 formas válidas de renderizar elementos JSX condicionalmente",
      },
      options: [
        { en: "{isReady ? <App /> : <Loader />}" },
        { en: "<if condition={isReady}><App /></if>" },
        { en: "{isReady && <App />}" },
        { en: "{for (let i of items) <Item />}" },
      ],
      correct: [0, 2],
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does `event.preventDefault()` do in a form submit handler?",
        "pt-BR": "O que `event.preventDefault()` faz em um manipulador de submit de formulário?",
      },
      options: [
        {
          en: "It stops the browser from doing a full page reload on submit",
          "pt-BR": "Impede o navegador de recarregar a página inteira no submit",
        },
        {
          en: "It clears all input values automatically",
          "pt-BR": "Limpa todos os valores dos inputs automaticamente",
        },
        {
          en: "It closes the browser window",
          "pt-BR": "Fecha a janela do navegador",
        },
        {
          en: "It converts the form into a WebSocket",
          "pt-BR": "Converte o formulário em um WebSocket",
        },
      ],
      correct: 0,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Complete the React fragment syntax",
        "pt-BR": "Complete a sintaxe do React Fragment",
      },
      code: "return <___><h1>Title</h1><p>Body</p></React.Fragment>;",
      answer: "React.Fragment",
    },
    {
      type: "single-choice",
      prompt: {
        en: "Which syntax is used to embed a JavaScript variable `name` inside JSX text?",
        "pt-BR":
          "Qual sintaxe é usada para inserir uma variável JavaScript `name` dentro do texto no JSX?",
      },
      options: [
        { en: "<h1>{{name}}</h1>" },
        { en: "<h1>{name}</h1>" },
        { en: "<h1>$name</h1>" },
        { en: "<h1>%name%</h1>" },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does React's `useState` return?",
        "pt-BR": "O que o `useState` do React retorna?",
      },
      options: [
        {
          en: "An array with the current state value and a function to update it",
          "pt-BR": "Um array com o valor atual do estado e uma função para atualizá-lo",
        },
        {
          en: "A single boolean value",
          "pt-BR": "Um único valor booleano",
        },
        {
          en: "A promise that resolves on the next frame",
          "pt-BR": "Uma promessa que resolve no próximo quadro",
        },
        {
          en: "A reference to a real DOM node",
          "pt-BR": "Uma referência para um nó real do DOM",
        },
      ],
      correct: 0,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What is JSX compiled to before running in the browser?",
        "pt-BR": "Para o que o JSX é compilado antes de rodar no navegador?",
      },
      options: [
        {
          en: "Function calls like `React.createElement` or the JSX transform runtime",
          "pt-BR": "Chamadas de função como `React.createElement` ou o runtime do JSX transform",
        },
        {
          en: "Plain HTML strings parsed with `innerHTML`",
          "pt-BR": "Strings HTML puras interpretadas com `innerHTML`",
        },
        {
          en: "Binary machine code executed by the GPU",
          "pt-BR": "Código binário de máquina executado pela GPU",
        },
        {
          en: "A CSS stylesheet loaded into `<head>`",
          "pt-BR": "Uma folha de estilos CSS carregada no `<head>`",
        },
      ],
      correct: 0,
    },
  ],
};
