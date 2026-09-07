import type { Unit } from "@/content/types";

export const events: Unit = {
  id: "events",
  title: { en: "Handling events", "pt-BR": "Eventos" },
  lessons: [
    {
      id: "events-1",
      title: { en: "Click handlers", "pt-BR": "Handlers de clique" },
      description: {
        en: "Respond to clicks with `onClick`.",
        "pt-BR": "Responda a cliques com `onClick`.",
      },
      xp: 20,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Wire up the click handler",
            "pt-BR": "Conecte o handler de clique",
          },
          code: `<button ___={handleClick}>Go</button>`,
          answer: "onClick",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which one correctly attaches the handler without calling it immediately?",
            "pt-BR": "Qual conecta o handler corretamente sem chamá-lo imediatamente?",
          },
          options: [
            { en: "onClick={handleClick()}" },
            { en: 'onClick="handleClick"' },
            { en: "onClick={handleClick}" },
            { en: "onClick={handleClick(event)}" },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What happens when this button is clicked?",
            "pt-BR": "O que acontece quando esse botão é clicado?",
          },
          code: `<button onClick={() => setOpen(true)}>Open</button>`,
          options: [
            {
              en: "Nothing, arrow functions don't run in JSX",
              "pt-BR": "Nada, funções de seta não rodam no JSX",
            },
            {
              en: "It runs once on every render",
              "pt-BR": "Roda uma vez a cada renderização",
            },
            { en: "It throws an error", "pt-BR": "Lança um erro" },
            {
              en: "`setOpen(true)` runs, updating state",
              "pt-BR": "`setOpen(true)` roda, atualizando o estado",
            },
          ],
          correct: 3,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about event handlers",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre handlers de eventos",
          },
          options: [
            {
              en: "They must be declared outside the component file",
              "pt-BR": "Precisam ser declarados fora do arquivo do componente",
            },
            {
              en: "They receive an event object as their argument",
              "pt-BR": "Eles recebem um objeto de evento como argumento",
            },
            {
              en: "They can only be arrow functions",
              "pt-BR": "Só podem ser funções de seta",
            },
            {
              en: "Handler prop names are written in camelCase, like `onClick`",
              "pt-BR": "Nomes de props de handler são escritos em camelCase, como `onClick`",
            },
          ],
          correct: [1, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Where is a click handler conventionally defined?",
            "pt-BR": "Onde um handler de clique é definido por convenção?",
          },
          options: [
            {
              en: "Inside the component function, before the return statement",
              "pt-BR": "Dentro da função do componente, antes do return",
            },
            {
              en: "In a separate global file only",
              "pt-BR": "Somente em um arquivo global separado",
            },
            {
              en: "Inside the JSX tag itself as a string",
              "pt-BR": "Dentro da própria tag JSX como uma string",
            },
            { en: "After the return statement", "pt-BR": "Depois do return" },
          ],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Name the event parameter",
            "pt-BR": "Nomeie o parâmetro de evento",
          },
          code: `function handleClick(___) {\n  e.preventDefault();\n}`,
          answer: "e",
        },
      ],
    },
    {
      id: "events-2",
      title: { en: "Event object and forms", "pt-BR": "Objeto de evento e formulários" },
      description: {
        en: "Read input values and prevent default behavior.",
        "pt-BR": "Leia valores de input e previna o comportamento padrão.",
      },
      xp: 30,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Read the input's current value",
            "pt-BR": "Leia o valor atual do input",
          },
          code: `<input onChange={e => setText(e.___.value)} />`,
          answer: "target",
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does `e.preventDefault()` do in a form submit handler?",
            "pt-BR": "O que `e.preventDefault()` faz em um handler de submit de formulário?",
          },
          options: [
            { en: "Deletes the form data", "pt-BR": "Apaga os dados do formulário" },
            {
              en: "Prevents the handler from running",
              "pt-BR": "Impede que o handler rode",
            },
            { en: "Submits the form twice", "pt-BR": "Envia o formulário duas vezes" },
            {
              en: "Stops the browser from reloading the page",
              "pt-BR": "Impede que o navegador recarregue a página",
            },
          ],
          correct: 3,
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which event fires on every keystroke in a text input?",
            "pt-BR": "Qual evento dispara a cada tecla digitada em um input de texto?",
          },
          options: [{ en: "onChange" }, { en: "onSubmit" }, { en: "onClick" }, { en: "onLoad" }],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about React events",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre eventos do React",
          },
          options: [
            {
              en: "They are synthetic wrappers around native browser events",
              "pt-BR": "São wrappers sintéticos em torno dos eventos nativos do navegador",
            },
            { en: "They only work in Chrome", "pt-BR": "Só funcionam no Chrome" },
            {
              en: "They replace the need for state entirely",
              "pt-BR": "Substituem completamente a necessidade de estado",
            },
            {
              en: "They behave consistently across different browsers",
              "pt-BR": "Se comportam de forma consistente entre navegadores diferentes",
            },
          ],
          correct: [0, 3],
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Wire up the form submit handler",
            "pt-BR": "Conecte o handler de submit do formulário",
          },
          code: `<form ___={handleSubmit}>`,
          answer: "onSubmit",
        },
        {
          type: "single-choice",
          prompt: {
            en: "What happens with this input?",
            "pt-BR": "O que acontece com esse input?",
          },
          code: `<input value={text} />`,
          options: [
            {
              en: "It works exactly like an uncontrolled input",
              "pt-BR": "Funciona exatamente como um input não controlado",
            },
            {
              en: "React warns and the input becomes read-only without an `onChange` handler",
              "pt-BR": "O React avisa e o input fica somente leitura sem um handler `onChange`",
            },
            {
              en: "It throws a compile error",
              "pt-BR": "Lança um erro de compilação",
            },
            {
              en: "`text` updates automatically as the user types",
              "pt-BR": "`text` atualiza automaticamente conforme o usuário digita",
            },
          ],
          correct: 1,
        },
      ],
    },
    {
      id: "events-3",
      title: { en: "Passing arguments", "pt-BR": "Passando argumentos" },
      description: {
        en: "Send extra data to a handler.",
        "pt-BR": "Envie dados extras para um handler.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "How do you pass an `id` argument to a click handler?",
            "pt-BR": "Como passar um argumento `id` para um handler de clique?",
          },
          options: [
            { en: "onClick={() => remove(id)}" },
            { en: "onClick={remove(id)}" },
            { en: "onClick={remove}(id)" },
            { en: "onClick={id => remove}" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What's wrong with this handler?",
            "pt-BR": "O que há de errado com esse handler?",
          },
          code: `<button onClick={remove(id)}>Delete</button>`,
          options: [
            {
              en: "`remove` is not a valid function name",
              "pt-BR": "`remove` não é um nome de função válido",
            },
            {
              en: "`remove(id)` runs immediately during render, not on click",
              "pt-BR": "`remove(id)` roda imediatamente durante a renderização, não no clique",
            },
            { en: "`id` must be a string", "pt-BR": "`id` precisa ser uma string" },
            {
              en: "`onClick` doesn't accept function calls",
              "pt-BR": "`onClick` não aceita chamadas de função",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Pass the whole `item` to `select`",
            "pt-BR": "Passe o `item` inteiro para `select`",
          },
          code: `<li onClick={() => select(___)}>{item.name}</li>`,
          answer: "item",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 ways to pass extra arguments to a handler",
            "pt-BR": "Escolha as 2 formas de passar argumentos extras para um handler",
          },
          options: [
            {
              en: "Pass the argument as a string in the prop name",
              "pt-BR": "Passar o argumento como string no nome da prop",
            },
            {
              en: "Wrap the call in an arrow function",
              "pt-BR": "Envolver a chamada em uma função de seta",
            },
            {
              en: "Use `.bind` to pre-fill arguments",
              "pt-BR": "Usar `.bind` para pré-preencher argumentos",
            },
            {
              en: "Call the handler directly in the JSX attribute",
              "pt-BR": "Chamar o handler diretamente no atributo JSX",
            },
          ],
          correct: [1, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Does writing `onClick={() => remove(id)}` create a new function on every render?",
            "pt-BR":
              "Escrever `onClick={() => remove(id)}` cria uma nova função a cada renderização?",
          },
          options: [
            {
              en: "No, React caches inline arrows automatically",
              "pt-BR": "Não, o React armazena em cache as arrow functions automaticamente",
            },
            {
              en: "Yes, and it always causes a bug",
              "pt-BR": "Sim, e isso sempre causa um bug",
            },
            {
              en: "Yes, but that's fine for most components",
              "pt-BR": "Sim, mas isso não é um problema para a maioria dos componentes",
            },
            {
              en: "No, arrow functions are only created once ever",
              "pt-BR": "Não, arrow functions são criadas só uma vez",
            },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do child components typically notify a parent about something that happened?",
            "pt-BR": "Como componentes filhos normalmente avisam o pai sobre algo que aconteceu?",
          },
          options: [
            {
              en: "The child directly modifies the parent's state variable",
              "pt-BR": "O filho modifica diretamente a variável de estado do pai",
            },
            {
              en: "The child dispatches a browser DOM event",
              "pt-BR": "O filho dispara um evento DOM do navegador",
            },
            {
              en: "Children cannot communicate with parents",
              "pt-BR": "Filhos não podem se comunicar com pais",
            },
            {
              en: "The parent passes a callback function as a prop, and the child calls it",
              "pt-BR": "O pai passa uma função de callback como prop, e o filho a chama",
            },
          ],
          correct: 3,
        },
      ],
    },
  ],
  challenge: [
    {
      type: "fill-blank",
      prompt: {
        en: "Avoid a stale closure by using the updater form",
        "pt-BR": "Evite uma closure desatualizada usando a forma de função atualizadora",
      },
      code: `function handleClick() {\n  setTimeout(() => {\n    setCount(___ => prev + 1);\n  }, 1000);\n}`,
      answer: "prev",
    },
    {
      type: "single-choice",
      prompt: {
        en: "If `count` starts at `0`, what is `count` after one click?",
        "pt-BR": "Se `count` começa em `0`, qual é o valor depois de um clique?",
      },
      code: `const [count, setCount] = useState(0);\nfunction handleClick() {\n  setCount(c => c + 1);\n  setCount(c => c + 1);\n}`,
      options: [
        { en: "`0`, because state doesn't update", "pt-BR": "`0`, porque o estado não atualiza" },
        {
          en: "`1`, because both calls still read the same `c`",
          "pt-BR": "`1`, porque as duas chamadas leem o mesmo `c`",
        },
        {
          en: "`2`, because each updater receives the latest queued value",
          "pt-BR": "`2`, porque cada atualizadora recebe o valor mais recente da fila",
        },
        { en: "It throws an error", "pt-BR": "Lança um erro" },
      ],
      correct: 2,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about React 18 batching",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre batching no React 18",
      },
      options: [
        {
          en: "Multiple `setState` calls inside a single event handler are batched into one re-render",
          "pt-BR":
            "Várias chamadas de `setState` dentro de um único handler são agrupadas em uma renderização",
        },
        {
          en: "`setState` calls inside a `setTimeout` callback are batched too",
          "pt-BR":
            "Chamadas de `setState` dentro de um callback de `setTimeout` também são agrupadas",
        },
        {
          en: "Batching means only the last `setState` call in a handler has any effect",
          "pt-BR": "Batching significa que só a última chamada de `setState` no handler tem efeito",
        },
        { en: "Batching was removed in React 18", "pt-BR": "O batching foi removido no React 18" },
      ],
      correct: [0, 1],
    },
    {
      type: "single-choice",
      prompt: {
        en: "`computeInitialItems()` is expensive. Which change avoids running it on every render?",
        "pt-BR": "`computeInitialItems()` é custosa. O que evita rodá-la a cada renderização?",
      },
      code: `const [items, setItems] = useState(computeInitialItems());`,
      options: [
        { en: "useState(computeInitialItems())" },
        { en: "useState(() => computeInitialItems())" },
        { en: "useState.lazy(computeInitialItems)" },
        { en: "const items = computeInitialItems(); useState(items);" },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "Why doesn't the UI update after `rename()` runs?",
        "pt-BR": "Por que a UI não atualiza depois que `rename()` roda?",
      },
      code: `function rename() {\n  profile.name = "Ada";\n  setProfile(profile);\n}`,
      options: [
        { en: "`profile.name` is read-only", "pt-BR": "`profile.name` é somente leitura" },
        { en: "`setProfile` only accepts strings", "pt-BR": "`setProfile` só aceita strings" },
        {
          en: "React batches this update forever",
          "pt-BR": "O React agrupa essa atualização para sempre",
        },
        {
          en: "`setProfile` receives the same object reference, so React's `Object.is` check sees no change",
          "pt-BR":
            "`setProfile` recebe a mesma referência de objeto, então a checagem `Object.is` do React não vê mudança",
        },
      ],
      correct: 3,
    },
    {
      type: "single-choice",
      prompt: {
        en: "If `count` is already `5`, what happens when `handleClick` runs?",
        "pt-BR": "Se `count` já é `5`, o que acontece quando `handleClick` roda?",
      },
      code: `function handleClick() {\n  setCount(5);\n  setCount(5);\n}`,
      options: [
        {
          en: "React bails out and skips re-rendering, since the new value is the same as the current one",
          "pt-BR": "O React desiste e pula a renderização, já que o novo valor é igual ao atual",
        },
        { en: "React re-renders twice", "pt-BR": "O React renderiza de novo duas vezes" },
        {
          en: "React throws an error for a duplicate value",
          "pt-BR": "O React lança um erro por valor duplicado",
        },
        { en: "`count` becomes `10`", "pt-BR": "`count` vira `10`" },
      ],
      correct: 0,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Replace the matching todo with a new object, without mutating the array",
        "pt-BR": "Substitua o todo correspondente por um novo objeto, sem mutar o array",
      },
      code: `setTodos(todos.___(t => (t.id === id ? { ...t, done: true } : t)));`,
      answer: "map",
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about the Rules of Hooks",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre as Regras dos Hooks",
      },
      options: [
        {
          en: "`useState` must be called in the same order on every render",
          "pt-BR": "`useState` precisa ser chamado na mesma ordem em toda renderização",
        },
        {
          en: "`useState` can be called inside an `if` statement as long as the condition is stable",
          "pt-BR":
            "`useState` pode ser chamado dentro de um `if` desde que a condição seja estável",
        },
        {
          en: "Calling `useState` inside a loop can misalign state between renders",
          "pt-BR":
            "Chamar `useState` dentro de um laço pode desalinhar o estado entre renderizações",
        },
        {
          en: "Hooks can be called inside any regular JavaScript function",
          "pt-BR": "Hooks podem ser chamados dentro de qualquer função JavaScript comum",
        },
      ],
      correct: [0, 2],
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about component state",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre o estado de um componente",
      },
      options: [
        {
          en: "State defined with `useState` is shared globally across all uses of that component",
          "pt-BR":
            "O estado definido com `useState` é compartilhado globalmente entre todos os usos daquele componente",
        },
        {
          en: "Two instances of the same component have independent state",
          "pt-BR": "Duas instâncias do mesmo componente têm estados independentes",
        },
        {
          en: "State persists automatically even after the component unmounts",
          "pt-BR": "O estado persiste automaticamente mesmo depois que o componente desmonta",
        },
        {
          en: "Unmounting a component instance discards its state",
          "pt-BR": "Desmontar uma instância de componente descarta seu estado",
        },
      ],
      correct: [1, 3],
    },
    {
      type: "single-choice",
      prompt: {
        en: "What's the bug if the parent later passes a different `user` prop?",
        "pt-BR": "Qual é o bug se o pai depois passar uma `user` prop diferente?",
      },
      code: `function Profile({ user }) {\n  const [name, setName] = useState(user.name);\n  return <p>{name}</p>;\n}`,
      options: [
        { en: "`name` updates automatically", "pt-BR": "`name` atualiza automaticamente" },
        { en: "React throws an error", "pt-BR": "O React lança um erro" },
        {
          en: "`name` keeps showing the old value, because `useState` only reads the initial value once",
          "pt-BR":
            "`name` continua mostrando o valor antigo, porque `useState` só lê o valor inicial uma vez",
        },
        { en: "The component unmounts", "pt-BR": "O componente desmonta" },
      ],
      correct: 2,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Force `Profile` to reset its internal state when the user changes",
        "pt-BR": "Force `Profile` a reiniciar seu estado interno quando o usuário mudar",
      },
      code: `<Profile ___={userId} />`,
      answer: "key",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What happens when this component renders?",
        "pt-BR": "O que acontece quando esse componente renderiza?",
      },
      code: `function Counter() {\n  const [count, setCount] = useState(0);\n  setCount(count + 1);\n  return <p>{count}</p>;\n}`,
      options: [
        {
          en: "It renders once and stops, `count` is `1`",
          "pt-BR": "Renderiza uma vez e para, `count` é `1`",
        },
        { en: "It throws a compile error", "pt-BR": "Lança um erro de compilação" },
        { en: "React ignores the `setCount` call", "pt-BR": "O React ignora a chamada `setCount`" },
        {
          en: "It re-renders in an infinite loop, since every render schedules another update",
          "pt-BR":
            "Entra em loop infinito de renderização, já que cada render agenda outra atualização",
        },
      ],
      correct: 3,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does `console.log(count)` print, if `count` was `4` before the click?",
        "pt-BR": "O que `console.log(count)` imprime, se `count` era `4` antes do clique?",
      },
      code: `function handleClick() {\n  setCount(count + 1);\n  console.log(count);\n}`,
      options: [
        { en: "5" },
        {
          en: "`4` — `count` still holds the value from this render until the next one",
          "pt-BR": "`4` — `count` ainda guarda o valor desta renderização até a próxima",
        },
        { en: "undefined" },
        { en: "It throws an error", "pt-BR": "Lança um erro" },
      ],
      correct: 1,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Spread the previous state, functional-update style",
        "pt-BR": "Espalhe o estado anterior, no estilo de atualização funcional",
      },
      code: `setUser(s => ({ ...___, name: "Ada" }));`,
      answer: "s",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What happens when the user types in this input?",
        "pt-BR": "O que acontece quando o usuário digita nesse input?",
      },
      code: `function Field() {\n  const [value, setValue] = useState("");\n  return <input value={value} />;\n}`,
      options: [
        {
          en: "Nothing appears, because there's no `onChange` handler to update `value`",
          "pt-BR": "Nada aparece, porque não há handler `onChange` para atualizar `value`",
        },
        { en: "The input updates normally", "pt-BR": "O input atualiza normalmente" },
        { en: "React throws an error", "pt-BR": "O React lança um erro" },
        {
          en: "`value` resets to empty on every keystroke automatically",
          "pt-BR": "`value` volta a ficar vazio a cada tecla automaticamente",
        },
      ],
      correct: 0,
    },
  ],
  sideQuest: {
    id: "events-extra",
    title: { en: "Forms at scale", "pt-BR": "Formulários em escala" },
    description: {
      en: "See what breaks down as a form grows, and what a form library buys you.",
      "pt-BR":
        "Veja o que passa a falhar conforme um formulário cresce, e o que uma biblioteca de formulários oferece.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "A form with 40 controlled `<input>`s calls a state setter on every keystroke, and the whole form component re-renders each time. What's the performance concern?",
          "pt-BR":
            "Um formulário com 40 `<input>`s controlados chama um setter de estado a cada tecla digitada, e o componente inteiro do formulário renderiza de novo a cada vez. Qual é a preocupação de performance?",
        },
        options: [
          {
            en: "Controlled inputs never re-render, so there's no concern",
            "pt-BR": "Inputs controlados nunca renderizam de novo, então não há preocupação",
          },
          {
            en: "The browser stops accepting further keystrokes after 40 fields",
            "pt-BR": "O navegador para de aceitar novas teclas depois de 40 campos",
          },
          {
            en: "Every keystroke re-renders all 40 inputs and everything else in that component, even though only one field changed",
            "pt-BR":
              "Cada tecla renderiza de novo os 40 inputs e tudo mais naquele componente, mesmo que só um campo tenha mudado",
          },
          {
            en: "React batches all 40 fields into a single DOM element, so re-renders are free",
            "pt-BR":
              "O React agrupa os 40 campos em um único elemento do DOM, então as renderizações não custam nada",
          },
        ],
        correct: 2,
      },
      {
        type: "single-choice",
        prompt: {
          en: 'What makes an input "uncontrolled"?',
          "pt-BR": 'O que torna um input "uncontrolled" (não controlado)?',
        },
        options: [
          {
            en: "It cannot have an `onChange` handler",
            "pt-BR": "Ele não pode ter um handler `onChange`",
          },
          {
            en: "It has no `value` prop tying it to React state — the DOM element keeps its own current value",
            "pt-BR":
              "Ele não tem uma prop `value` ligando-o ao estado do React — o próprio elemento do DOM guarda o valor atual",
          },
          { en: "It always starts out empty", "pt-BR": "Ele sempre começa vazio" },
          {
            en: "It cannot be used inside a `<form>`",
            "pt-BR": "Ele não pode ser usado dentro de um `<form>`",
          },
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Read the uncontrolled input's current value through the ref",
          "pt-BR": "Leia o valor atual do input não controlado através do ref",
        },
        code: `const inputRef = useRef(null);\nfunction handleSubmit() {\n  console.log(inputRef.current.___);\n}`,
        answer: "value",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 things a form library like react-hook-form typically gives you beyond plain controlled inputs",
          "pt-BR":
            "Escolha as 2 coisas que uma biblioteca de formulários como react-hook-form costuma dar além de inputs controlados simples",
        },
        options: [
          {
            en: "Built-in validation rules and per-field error messages",
            "pt-BR": "Regras de validação prontas e mensagens de erro por campo",
          },
          {
            en: 'Tracking of which fields the user actually touched or changed ("dirty" state)',
            "pt-BR":
              'Rastreamento de quais campos o usuário realmente tocou ou mudou (estado "dirty")',
          },
          {
            en: "Automatic integration with every possible backend API",
            "pt-BR": "Integração automática com qualquer API de backend",
          },
          {
            en: "A guarantee of zero re-renders anywhere in the app",
            "pt-BR": "Uma garantia de zero renderizações em qualquer lugar do app",
          },
        ],
        correct: [0, 1],
      },
      {
        type: "single-choice",
        prompt: {
          en: "Why does an `onSubmit` handler on the `<form>` beat a click handler on the submit `<button>`?",
          "pt-BR":
            "Por que um handler `onSubmit` no `<form>` é melhor que um handler de clique no `<button>` de envio?",
        },
        options: [
          {
            en: "`onSubmit` runs before the component mounts",
            "pt-BR": "`onSubmit` roda antes do componente montar",
          },
          {
            en: "Click handlers on buttons cannot call functions",
            "pt-BR": "Handlers de clique em botões não podem chamar funções",
          },
          {
            en: "`onSubmit` is the only handler that ever receives an event object",
            "pt-BR": "`onSubmit` é o único handler que recebe um objeto de evento",
          },
          {
            en: "`onSubmit` also fires for keyboard submission, like pressing Enter in a field, not just a button click",
            "pt-BR":
              "`onSubmit` também dispara ao enviar pelo teclado, como apertar Enter em um campo, não só ao clicar no botão",
          },
        ],
        correct: 3,
      },
      {
        type: "single-choice",
        prompt: {
          en: "What does calling `e.preventDefault()` inside a form's `onSubmit` accomplish?",
          "pt-BR": "O que chamar `e.preventDefault()` dentro do `onSubmit` de um formulário faz?",
        },
        options: [
          {
            en: "It stops the browser's default full-page reload, letting your JavaScript handle the submission instead",
            "pt-BR":
              "Impede o recarregamento padrão da página inteira pelo navegador, deixando seu JavaScript cuidar do envio",
          },
          {
            en: "It clears all the form fields",
            "pt-BR": "Limpa todos os campos do formulário",
          },
          {
            en: "It validates every field automatically",
            "pt-BR": "Valida todos os campos automaticamente",
          },
          {
            en: "It disables the submit button permanently",
            "pt-BR": "Desabilita o botão de envio permanentemente",
          },
        ],
        correct: 0,
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 true statements about controlled versus uncontrolled inputs",
          "pt-BR":
            "Escolha as 2 afirmações verdadeiras sobre inputs controlados versus não controlados",
        },
        options: [
          {
            en: "Uncontrolled inputs cannot store any value at all",
            "pt-BR": "Inputs não controlados não conseguem guardar nenhum valor",
          },
          {
            en: "Controlled inputs make the current value available in state on every keystroke; uncontrolled inputs don't",
            "pt-BR":
              "Inputs controlados deixam o valor atual disponível no estado a cada tecla; inputs não controlados não",
          },
          {
            en: "Uncontrolled inputs are read on demand, usually via a ref, instead of on every keystroke",
            "pt-BR":
              "Inputs não controlados são lidos sob demanda, geralmente via ref, em vez de a cada tecla",
          },
          {
            en: "Controlled inputs are managed entirely by the DOM, not React",
            "pt-BR": "Inputs controlados são gerenciados inteiramente pelo DOM, não pelo React",
          },
        ],
        correct: [1, 2],
      },
    ],
  },
};
