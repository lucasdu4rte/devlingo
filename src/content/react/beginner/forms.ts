import type { Unit } from "@/content/types";

export const forms: Unit = {
  id: "forms",
  title: { en: "Forms", "pt-BR": "Formulários" },
  lessons: [
    {
      id: "forms-1",
      title: { en: "Controlled components", "pt-BR": "Componentes controlados" },
      description: {
        en: "Bind input values directly to React state.",
        "pt-BR": "Vincule valores de inputs diretamente ao estado do React.",
      },
      xp: 20,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "What makes an input 'controlled' in React?",
            "pt-BR": "O que torna um input 'controlado' no React?",
          },
          options: [
            {
              en: "It is wrapped in a `<controller>` HTML tag",
              "pt-BR": "Ele está envolvido em uma tag HTML `<controller>`",
            },
            {
              en: "Its current value is driven by React state and updated via an `onChange` callback",
              "pt-BR":
                "Seu valor atual é controlado pelo estado do React e atualizado via callback `onChange`",
            },
            {
              en: "It cannot be edited by the user under any circumstances",
              "pt-BR": "Ele não pode ser editado pelo usuário sob nenhuma circunstância",
            },
            {
              en: "It saves data directly into localStorage automatically",
              "pt-BR": "Ele salva dados diretamente no localStorage de forma automática",
            },
          ],
          correct: 1,
          explanation: {
            en: "In a controlled component, form data is handled by the React component state as the single source of truth.",
            "pt-BR":
              "Em um componente controlado, os dados do formulário são gerenciados pelo estado do componente React como fonte única da verdade.",
          },
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Complete the setter call to update state on each keystroke",
            "pt-BR": "Complete a chamada do setter para atualizar o estado a cada tecla digitada",
          },
          code: "<input value={name} onChange={(e) => ___(e.target.value)} />",
          answer: "setName",
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is the difference between `value` and `defaultValue` on an `<input />`?",
            "pt-BR": "Qual é a diferença entre `value` e `defaultValue` em um `<input />`?",
          },
          options: [
            {
              en: "`defaultValue` is only for password fields",
              "pt-BR": "`defaultValue` é usado apenas para campos de senha",
            },
            {
              en: "`value` creates a controlled input, while `defaultValue` sets the initial value of an uncontrolled input",
              "pt-BR":
                "`value` cria um input controlado, enquanto `defaultValue` define o valor inicial de um input não controlado",
            },
            {
              en: "There is no difference; they are aliases",
              "pt-BR": "Não há diferença; são apelidos para a mesma prop",
            },
            {
              en: "`value` is deprecated in React 19",
              "pt-BR": "`value` foi descontinuado no React 19",
            },
          ],
          correct: 1,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 key advantages of controlled components",
            "pt-BR": "Escolha as 2 principais vantagens de componentes controlados",
          },
          options: [
            {
              en: "You can validate or transform input values on every keystroke",
              "pt-BR": "Você pode validar ou transformar valores a cada tecla digitada",
            },
            {
              en: "They completely eliminate re-renders across the whole application",
              "pt-BR": "Eles eliminam completamente re-renderizações em toda a aplicação",
            },
            {
              en: "State is the single source of truth, making UI synchronization straightforward",
              "pt-BR":
                "O estado é a fonte única da verdade, facilitando a sincronização da interface",
            },
            {
              en: "They do not require JavaScript to run in the browser",
              "pt-BR": "Eles não exigem JavaScript para rodar no navegador",
            },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: 'What happens if you pass `value="hello"` without an `onChange` handler to an input?',
            "pt-BR":
              'O que acontece se você passar `value="hello"` sem um manipulador `onChange` para um input?',
          },
          options: [
            {
              en: "The input renders as read-only and React logs a warning in development",
              "pt-BR": "O input renderiza como somente leitura e o React emite um aviso no console",
            },
            {
              en: "The input allows editing normally",
              "pt-BR": "O input permite edição normalmente",
            },
            {
              en: "The component immediately crashes",
              "pt-BR": "O componente quebra imediatamente",
            },
            {
              en: "The text turns red automatically",
              "pt-BR": "O texto fica vermelho automaticamente",
            },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you control a `<textarea>` in React?",
            "pt-BR": "Como você controla um `<textarea>` no React?",
          },
          options: [
            { en: "<textarea>{text}</textarea>" },
            { en: "<textarea value={text} onChange={handleChange} />" },
            { en: "<textarea text={text} />" },
            { en: "<textarea content={text} />" },
          ],
          correct: 1,
          explanation: {
            en: "Unlike plain HTML which uses child text, React uses the `value` prop on `<textarea>` just like a single-line input.",
            "pt-BR":
              "Diferente do HTML puro que usa texto filho, o React usa a prop `value` no `<textarea>` igual a um input comum.",
          },
        },
      ],
    },
    {
      id: "forms-2",
      title: { en: "Form submission and events", "pt-BR": "Envio de formulários e eventos" },
      description: {
        en: "Handle form submission, prevent page reloads, and access event targets.",
        "pt-BR": "Manipule envios de formulários, impeça reloads e acesse alvos de eventos.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Why is `event.preventDefault()` called inside a form's `onSubmit` handler?",
            "pt-BR":
              "Por que `event.preventDefault()` é chamado dentro do manipulador `onSubmit` de um formulário?",
          },
          options: [
            {
              en: "To encrypt the form payload with SSL",
              "pt-BR": "Para criptografar os dados do formulário com SSL",
            },
            {
              en: "To prevent the default HTTP POST and browser page reload",
              "pt-BR":
                "Para impedir o HTTP POST padrão e o recarregamento da página pelo navegador",
            },
            {
              en: "To disable the user's keyboard",
              "pt-BR": "Para desativar o teclado do usuário",
            },
            {
              en: "To convert JSON data into XML",
              "pt-BR": "Para converter dados JSON em XML",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Prevent the default form submission reload",
            "pt-BR": "Impeça o recarregamento padrão no envio do formulário",
          },
          code: "function handleSubmit(e) {\n  e.___Default();\n}",
          answer: "prevent",
        },
        {
          type: "multi-choice",
          prompt: {
            en: 'Pick the 2 reasons to listen to `onSubmit` on `<form>` instead of `onClick` on `<button type="submit">`',
            "pt-BR":
              'Escolha as 2 razões para escutar `onSubmit` no `<form>` em vez de `onClick` no `<button type="submit">`',
          },
          options: [
            {
              en: "It triggers when the user presses Enter inside any form input",
              "pt-BR":
                "Dispara quando o usuário aperta Enter dentro de qualquer campo do formulário",
            },
            {
              en: "`onClick` on buttons does not work in mobile browsers",
              "pt-BR": "`onClick` em botões não funciona em navegadores móveis",
            },
            {
              en: "It preserves standard semantic form submission behavior and accessibility",
              "pt-BR":
                "Preserva o comportamento semântico padrão de envio de formulários e acessibilidade",
            },
            {
              en: "`onSubmit` runs 50% faster than `onClick`",
              "pt-BR": "`onSubmit` executa 50% mais rápido que `onClick`",
            },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "In a React event handler, what is the difference between `e.target` and `e.currentTarget`?",
            "pt-BR":
              "Em um manipulador de eventos do React, qual é a diferença entre `e.target` e `e.currentTarget`?",
          },
          options: [
            {
              en: "`e.target` is the element that triggered the event, while `e.currentTarget` is the element to which the event handler is attached",
              "pt-BR":
                "`e.target` é o elemento que disparou o evento, enquanto `e.currentTarget` é o elemento ao qual o manipulador está anexado",
            },
            {
              en: "They are completely identical in all scenarios",
              "pt-BR": "Eles são completamente idênticos em todos os cenários",
            },
            {
              en: "`e.target` only works on `<form>` tags",
              "pt-BR": "`e.target` só funciona em tags `<form>`",
            },
            {
              en: "`e.currentTarget` is a server-only property",
              "pt-BR": "`e.currentTarget` é uma propriedade exclusiva do servidor",
            },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "What type of event does React pass to `onChange` and `onSubmit` handlers?",
            "pt-BR": "Que tipo de evento o React passa para manipuladores `onChange` e `onSubmit`?",
          },
          options: [
            { en: "A native jQuery event" },
            {
              en: "A SyntheticEvent wrapper that normalizes browser inconsistencies",
              "pt-BR": "Um wrapper SyntheticEvent que padroniza inconsistências entre navegadores",
            },
            { en: "A plain JavaScript string" },
            { en: "A Node.js EventEmitter" },
          ],
          correct: 1,
        },
      ],
    },
    {
      id: "forms-3",
      title: { en: "Multiple inputs and FormData", "pt-BR": "Múltiplos inputs e FormData" },
      description: {
        en: "Manage multiple fields cleanly and use native FormData.",
        "pt-BR": "Gerencie múltiplos campos de forma limpa e use o FormData nativo.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "When managing a form with 10 fields, how can you update state with a single generic `handleChange` function?",
            "pt-BR":
              "Ao gerenciar um formulário com 10 campos, como atualizar o estado com uma única função genérica `handleChange`?",
          },
          code: "const handleChange = (e) => {\n  setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));\n};",
          options: [
            {
              en: "By creating a new React component for each character typed",
              "pt-BR": "Criando um novo componente React para cada caractere digitado",
            },
            {
              en: "By using computed property names matching `e.target.name` to form state keys",
              "pt-BR":
                "Usando nomes de propriedades computadas correspondendo `e.target.name` às chaves do estado",
            },
            {
              en: "By calling `localStorage.setItem` synchronously",
              "pt-BR": "Chamando `localStorage.setItem` de forma síncrona",
            },
            {
              en: "By using global CSS classes",
              "pt-BR": "Usando classes CSS globais",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Complete the computed property syntax to read the input's name attribute",
            "pt-BR":
              "Complete a sintaxe de propriedade computada para ler o atributo name do input",
          },
          code: "setForm(prev => ({ ...prev, [e.target.___]: e.target.value }));",
          answer: "name",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Which 2 input types use `e.target.checked` instead of `e.target.value` for their active state?",
            "pt-BR":
              "Quais 2 tipos de input usam `e.target.checked` em vez de `e.target.value` para seu estado ativo?",
          },
          options: [
            { en: 'type="checkbox"' },
            { en: 'type="text"' },
            { en: 'type="radio"' },
            { en: 'type="number"' },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you extract values from an uncontrolled form on submit using native web APIs?",
            "pt-BR":
              "Como extrair valores de um formulário não controlado no submit usando APIs nativas da web?",
          },
          code: "function handleSubmit(e) {\n  e.preventDefault();\n  const data = new FormData(e.currentTarget);\n}",
          options: [
            {
              en: "By passing the form element to `new FormData(formElement)`",
              "pt-BR": "Passando o elemento do formulário para `new FormData(formElement)`",
            },
            {
              en: "By scraping the page HTML with regex",
              "pt-BR": "Extraindo o HTML da página com expressões regulares",
            },
            {
              en: "By inspecting the Redux store directly",
              "pt-BR": "Inspecionando a store do Redux diretamente",
            },
            {
              en: "By running an SQL query in the browser",
              "pt-BR": "Executando uma query SQL no navegador",
            },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How is a `<select>` dropdown controlled in React?",
            "pt-BR": "Como um dropdown `<select>` é controlado no React?",
          },
          options: [
            {
              en: "By placing `selected` attribute on individual `<option>` elements",
              "pt-BR": "Colocando o atributo `selected` em elementos individuais `<option>`",
            },
            {
              en: "By passing `value` and `onChange` to the parent `<select>` element",
              "pt-BR": "Passando `value` e `onChange` para o elemento pai `<select>`",
            },
            {
              en: "By assigning CSS IDs to every option",
              "pt-BR": "Atribuindo IDs de CSS a cada opção",
            },
            {
              en: "By wrapping each option in a Fragment",
              "pt-BR": "Envolvendo cada opção em um Fragment",
            },
          ],
          correct: 1,
        },
      ],
    },
  ],
  sideQuest: {
    id: "forms-extra",
    title: { en: "Schema validation", "pt-BR": "Validação de esquemas" },
    description: {
      en: "Declare form schemas and validate input at scale.",
      "pt-BR": "Declare esquemas de formulários e valide entradas em escala.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "What problem do schema validation libraries like Zod or Yup solve for form handling?",
          "pt-BR":
            "Qual problema bibliotecas de validação como Zod ou Yup resolvem na manipulação de formulários?",
        },
        options: [
          {
            en: "They replace CSS styles with canvas drawings",
            "pt-BR": "Substituem estilos CSS por desenhos no canvas",
          },
          {
            en: "They eliminate manual `if` check chains and serve as a single source of truth for types and validation rules",
            "pt-BR":
              "Eliminam cadeias manuais de `if` e servem como fonte única da verdade para tipos e regras de validação",
          },
          {
            en: "They automatically deploy the frontend to AWS",
            "pt-BR": "Fazem deploy automático do frontend para a AWS",
          },
          {
            en: "They prevent users from copying text",
            "pt-BR": "Impedem usuários de copiar texto",
          },
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Complete the method call to validate without throwing an error",
          "pt-BR": "Complete o método para validar sem disparar erro",
        },
        code: "const result = schema.safe___(formData);",
        answer: "Parse",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 main benefits of integrating Zod with TypeScript forms",
          "pt-BR": "Escolha os 2 principais benefícios de integrar Zod com formulários TypeScript",
        },
        options: [
          {
            en: "`z.infer<typeof schema>` infers TypeScript types automatically from the schema",
            "pt-BR":
              "`z.infer<typeof schema>` infere tipos TypeScript automaticamente a partir do esquema",
          },
          {
            en: "It doubles runtime execution speed in the browser",
            "pt-BR": "Duplica a velocidade de execução em tempo de execução no navegador",
          },
          {
            en: "It validates data shape and types at runtime, where TypeScript types alone cannot",
            "pt-BR":
              "Valida o formato e tipos dos dados em runtime, onde tipos TypeScript sozinhos não conseguem",
          },
          {
            en: "It eliminates the need for unit testing forever",
            "pt-BR": "Elimina a necessidade de testes unitários para sempre",
          },
        ],
        correct: [0, 2],
      },
      {
        type: "single-choice",
        prompt: {
          en: "Why is client-side form validation not sufficient for security?",
          "pt-BR": "Por que a validação de formulários no cliente não é suficiente para segurança?",
        },
        options: [
          {
            en: "Client-side code can easily be bypassed or manipulated by an attacker using curl or Postman",
            "pt-BR":
              "O código no cliente pode ser facilmente ignorado ou manipulado por um invasor usando curl ou Postman",
          },
          {
            en: "Browsers do not support validation libraries",
            "pt-BR": "Navegadores não suportam bibliotecas de validação",
          },
          {
            en: "JavaScript runs on the CPU while server code runs on the GPU",
            "pt-BR": "O JavaScript roda na CPU enquanto o servidor roda na GPU",
          },
          {
            en: "HTML forms disable network encryption",
            "pt-BR": "Formulários HTML desativam criptografia de rede",
          },
        ],
        correct: 0,
      },
      {
        type: "single-choice",
        prompt: {
          en: "How do form libraries (like React Hook Form or Formik) typically store validation errors?",
          "pt-BR":
            "Como bibliotecas de formulário (como React Hook Form ou Formik) geralmente armazenam erros de validação?",
        },
        options: [
          {
            en: "Inside the browser history stack",
            "pt-BR": "Dentro da pilha de histórico do navegador",
          },
          {
            en: "In cookie headers only",
            "pt-BR": "Apenas em headers de cookie",
          },
          {
            en: "In an object keyed by field names, e.g. `{ email: 'Invalid email', password: 'Too short' }`",
            "pt-BR":
              "Em um objeto indexado pelos nomes dos campos, ex: `{ email: 'Email inválido', password: 'Muito curta' }`",
          },
          {
            en: "As global window error handlers",
            "pt-BR": "Como manipuladores globais de erro no window",
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
        en: "What is an uncontrolled input in React?",
        "pt-BR": "O que é um input não controlado no React?",
      },
      options: [
        {
          en: "An input that throws errors whenever typed into",
          "pt-BR": "Um input que dispara erros sempre que algo é digitado",
        },
        {
          en: "An input that cannot receive focus",
          "pt-BR": "Um input que não pode receber foco",
        },
        {
          en: "An input whose DOM state is managed internally by the browser DOM itself rather than React state",
          "pt-BR":
            "Um input cujo estado no DOM é gerenciado internamente pelo próprio navegador, e não pelo estado do React",
        },
        {
          en: "An input rendered outside the root div",
          "pt-BR": "Um input renderizado fora da div raiz",
        },
      ],
      correct: 2,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Complete the initial value prop for an uncontrolled input",
        "pt-BR": "Complete a prop de valor inicial para um input não controlado",
      },
      code: "<input ___Value='Initial' />",
      answer: "default",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does this render when `count` is `0`?",
        "pt-BR": "O que isso renderiza quando `count` é `0`?",
      },
      code: "const count = 0;\nreturn <div>{count && <Items />}</div>;",
      options: [{ en: "Nothing" }, { en: "<Items />" }, { en: "0" }, { en: "null" }],
      correct: 2,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about JSX syntax",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre a sintaxe JSX",
      },
      options: [
        {
          en: "JSX must have a single root element or Fragment",
          "pt-BR": "O JSX precisa ter um único elemento raiz ou Fragment",
        },
        {
          en: "HTML class attribute is written as `className` in JSX",
          "pt-BR": "O atributo class do HTML é escrito como `className` no JSX",
        },
        {
          en: "Browsers natively execute JSX without compilation",
          "pt-BR": "Navegadores executam JSX nativamente sem compilação",
        },
        {
          en: "Inline styles accept plain CSS strings in JSX",
          "pt-BR": "Estilos inline aceitam strings CSS comuns no JSX",
        },
      ],
      correct: [0, 1],
    },
    {
      type: "single-choice",
      prompt: {
        en: "What happens when you call `setState` in React?",
        "pt-BR": "O que acontece quando você chama `setState` no React?",
      },
      options: [
        {
          en: "React restarts the entire web server",
          "pt-BR": "O React reinicia todo o servidor web",
        },
        {
          en: "React schedules a re-render of the component and its children",
          "pt-BR": "O React agenda uma re-renderização do componente e de seus filhos",
        },
        {
          en: "The browser deletes cached cookies",
          "pt-BR": "O navegador deleta cookies em cache",
        },
        {
          en: "It synchronously blocks JavaScript execution for 100ms",
          "pt-BR": "Bloqueia a execução do JavaScript de forma síncrona por 100ms",
        },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "Why is a `key` prop required when rendering an array of elements in React?",
        "pt-BR": "Por que a prop `key` é necessária ao renderizar um array de elementos no React?",
      },
      options: [
        {
          en: "To give React a stable identity for each element during reconciliation",
          "pt-BR":
            "Para dar ao React uma identidade estável para cada elemento durante a reconciliação",
        },
        {
          en: "To create an HTML ID attribute on every node",
          "pt-BR": "Para criar um atributo HTML ID em cada nó",
        },
        {
          en: "To sort the elements by creation date",
          "pt-BR": "Para ordenar os elementos por data de criação",
        },
        {
          en: "To trigger CSS transitions",
          "pt-BR": "Para disparar transições CSS",
        },
      ],
      correct: 0,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Complete the hook call to manage component state",
        "pt-BR": "Complete a chamada do hook para gerenciar o estado do componente",
      },
      code: "const [isOpen, setIsOpen] = use___(false);",
      answer: "State",
    },
    {
      type: "single-choice",
      prompt: {
        en: "How do you pass a parameter `id` to an `onClick` handler in JSX?",
        "pt-BR": "Como passar um parâmetro `id` para um manipulador `onClick` no JSX?",
      },
      options: [
        { en: "onClick={handleClick(id)}" },
        { en: "onClick={() => handleClick(id)}" },
        { en: "onClick={handleClick: id}" },
        { en: "onClick=(id) => handleClick" },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does `e.preventDefault()` do on a form submit?",
        "pt-BR": "O que `e.preventDefault()` faz no submit de um formulário?",
      },
      options: [
        {
          en: "It clears all form inputs",
          "pt-BR": "Limpa todos os campos do formulário",
        },
        {
          en: "It prevents the browser from reloading the page",
          "pt-BR": "Impede o navegador de recarregar a página",
        },
        {
          en: "It prints the page to PDF",
          "pt-BR": "Imprime a página para PDF",
        },
        {
          en: "It logs out the current user",
          "pt-BR": "Desconecta o usuário atual",
        },
      ],
      correct: 1,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 valid ways to conditionally render in React",
        "pt-BR": "Escolha as 2 formas válidas de renderizar condicionalmente no React",
      },
      options: [
        { en: "{isOpen ? <Modal /> : null}" },
        { en: "<if condition={isOpen}><Modal /></if>" },
        { en: "{isOpen && <Modal />}" },
        { en: "{while (isOpen) <Modal />}" },
      ],
      correct: [0, 2],
    },
    {
      type: "single-choice",
      prompt: {
        en: "Why should you pass an updater function to `setState(prev => prev + 1)` when the new state depends on the previous state?",
        "pt-BR":
          "Por que passar uma função updater para `setState(prev => prev + 1)` quando o novo estado depende do anterior?",
      },
      options: [
        {
          en: "Because state updates may be batched or asynchronous, so reading stale state directly could lose updates",
          "pt-BR":
            "Porque atualizações de estado podem ser agrupadas ou assíncronas, ler o estado desatualizado diretamente pode perder updates",
        },
        {
          en: "Because updater functions run in web workers",
          "pt-BR": "Porque funções updater rodam em web workers",
        },
        {
          en: "Because numbers cannot be passed directly to `setState`",
          "pt-BR": "Porque números não podem ser passados diretamente para o `setState`",
        },
        {
          en: "It is only required when running on the server",
          "pt-BR": "Só é obrigatório ao executar no servidor",
        },
      ],
      correct: 0,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Complete the synthetic event prop name for key press events",
        "pt-BR": "Complete o nome da prop de evento sintético para tecla pressionada",
      },
      code: "<input onKey___={(e) => console.log(e.key)} />",
      answer: "Down",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does React render when a component returns `false`?",
        "pt-BR": "O que o React renderiza quando um componente retorna `false`?",
      },
      options: [
        { en: "The word 'false'", "pt-BR": "A palavra 'false'" },
        { en: "Nothing", "pt-BR": "Nada" },
        { en: "A red error box", "pt-BR": "Uma caixa de erro vermelha" },
        { en: "A 0", "pt-BR": "Um 0" },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What is the return type of JSX expressions in TypeScript?",
        "pt-BR": "Qual é o tipo de retorno de expressões JSX no TypeScript?",
      },
      options: [
        { en: "string" },
        { en: "HTMLElement" },
        { en: "JSX.Element (or React.ReactElement)" },
        { en: "void" },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What is 'lifting state up' in React?",
        "pt-BR": "O que é 'elevar o estado' (lifting state up) no React?",
      },
      options: [
        {
          en: "Moving state to the closest common ancestor so multiple components can share it",
          "pt-BR":
            "Mover o estado para o ancestral comum mais próximo para que múltiplos componentes possam compartilhá-lo",
        },
        {
          en: "Saving state to the cloud server",
          "pt-BR": "Salvar o estado no servidor na nuvem",
        },
        {
          en: "Converting state into a global window variable",
          "pt-BR": "Converter o estado em uma variável global do window",
        },
        {
          en: "Replacing state with CSS animations",
          "pt-BR": "Substituir o estado por animações CSS",
        },
      ],
      correct: 0,
    },
  ],
};
