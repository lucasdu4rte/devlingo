import type { Unit } from "@/content/types";

export const events: Unit = {
  id: "events",
  title: { en: "Handling events", "pt-BR": "Eventos" },
  lessons: [
    {
      id: "events-1",
      title: { en: "Click handlers", "pt-BR": "Handlers de clique" },
      description: {
        en: "Respond to clicks with onClick.",
        "pt-BR": "Responda a cliques com onClick.",
      },
      xp: 10,
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
              en: "setOpen(true) runs, updating state",
              "pt-BR": "setOpen(true) roda, atualizando o estado",
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
              en: "Handler prop names are written in camelCase, like onClick",
              "pt-BR": "Nomes de props de handler são escritos em camelCase, como onClick",
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
      xp: 15,
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
            en: "What does e.preventDefault() do in a form submit handler?",
            "pt-BR": "O que e.preventDefault() faz em um handler de submit de formulário?",
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
              en: "React warns and the input becomes read-only without an onChange handler",
              "pt-BR": "O React avisa e o input fica somente leitura sem um handler onChange",
            },
            {
              en: "It throws a compile error",
              "pt-BR": "Lança um erro de compilação",
            },
            {
              en: "text updates automatically as the user types",
              "pt-BR": "text atualiza automaticamente conforme o usuário digita",
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
      xp: 15,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "How do you pass an id argument to a click handler?",
            "pt-BR": "Como passar um argumento id para um handler de clique?",
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
              en: "remove is not a valid function name",
              "pt-BR": "remove não é um nome de função válido",
            },
            {
              en: "remove(id) runs immediately during render, not on click",
              "pt-BR": "remove(id) roda imediatamente durante a renderização, não no clique",
            },
            { en: "id must be a string", "pt-BR": "id precisa ser uma string" },
            {
              en: "onClick doesn't accept function calls",
              "pt-BR": "onClick não aceita chamadas de função",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Pass the whole item to select",
            "pt-BR": "Passe o item inteiro para select",
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
              en: "Use .bind to pre-fill arguments",
              "pt-BR": "Usar .bind para pré-preencher argumentos",
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
            en: "Does writing onClick={() => remove(id)} create a new function on every render?",
            "pt-BR":
              "Escrever onClick={() => remove(id)} cria uma nova função a cada renderização?",
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
};
