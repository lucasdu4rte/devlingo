import type { Unit } from "@/content/types";

export const componentsProps: Unit = {
  id: "components-props",
  title: { en: "Components & props", "pt-BR": "Componentes e props" },
  lessons: [
    {
      id: "components-props-1",
      title: { en: "Your first component", "pt-BR": "Seu primeiro componente" },
      description: {
        en: "Write a function component and render it.",
        "pt-BR": "Escreva um componente de função e renderize-o.",
      },
      xp: 10,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "What is a React component?",
            "pt-BR": "O que é um componente React?",
          },
          options: [
            {
              en: "A function that returns JSX describing what to render",
              "pt-BR": "Uma função que retorna JSX descrevendo o que renderizar",
            },
            {
              en: "A CSS class that styles an element",
              "pt-BR": "Uma classe CSS que estiliza um elemento",
            },
            {
              en: "A file that contains only HTML",
              "pt-BR": "Um arquivo que contém apenas HTML",
            },
            { en: "A database table", "pt-BR": "Uma tabela de banco de dados" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "Given this component, how do you render it?",
            "pt-BR": "Dado esse componente, como você o renderiza?",
          },
          code: `function Card() { return <div>Hi</div>; }`,
          options: [{ en: "<Card />" }, { en: "<card />" }, { en: "Card()" }, { en: "{Card}" }],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Name the component in PascalCase to match the usage <Greeting />",
            "pt-BR": "Nomeie o componente em PascalCase para corresponder ao uso <Greeting />",
          },
          code: `function ___() { return <p>Hi</p>; }`,
          answer: "Greeting",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Why does <card /> try to render an unknown HTML tag instead of your component?",
            "pt-BR":
              "Por que <card /> tenta renderizar uma tag HTML desconhecida em vez do seu componente?",
          },
          options: [
            {
              en: "Lowercase tag names are treated as built-in DOM elements",
              "pt-BR": "Nomes de tag em minúsculas são tratados como elementos DOM nativos",
            },
            {
              en: "React doesn't support components named Card",
              "pt-BR": "React não permite componentes chamados Card",
            },
            {
              en: "JSX requires a semicolon after the tag",
              "pt-BR": "JSX exige um ponto e vírgula depois da tag",
            },
            {
              en: "Card must be imported from react",
              "pt-BR": "Card precisa ser importado do react",
            },
          ],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 rules a component must follow",
            "pt-BR": "Escolha as 2 regras que um componente deve seguir",
          },
          options: [
            {
              en: "Its name starts with a capital letter",
              "pt-BR": "Seu nome começa com letra maiúscula",
            },
            { en: "It returns JSX (or null)", "pt-BR": "Ele retorna JSX (ou null)" },
            { en: "It must accept props", "pt-BR": "Ele precisa aceitar props" },
            { en: "It must use useState", "pt-BR": "Ele precisa usar useState" },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Where can a component be defined?",
            "pt-BR": "Onde um componente pode ser definido?",
          },
          options: [
            {
              en: "At the top level of a module, not nested inside another component",
              "pt-BR": "No nível superior de um módulo, não aninhado dentro de outro componente",
            },
            { en: "Only inside App", "pt-BR": "Somente dentro de App" },
            {
              en: "Nested inside another component's function body",
              "pt-BR": "Aninhado dentro do corpo de outra função de componente",
            },
            {
              en: "Only in a file named index.tsx",
              "pt-BR": "Somente em um arquivo chamado index.tsx",
            },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "components-props-2",
      title: { en: "Passing props", "pt-BR": "Passando props" },
      description: {
        en: "Send data into a component with attributes.",
        "pt-BR": "Envie dados para um componente com atributos.",
      },
      xp: 15,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Accept the props object as a parameter",
            "pt-BR": "Receba o objeto props como parâmetro",
          },
          code: `function Hello(___) { return <h1>Hi {props.name}</h1>; }`,
          answer: "props",
        },
        {
          type: "single-choice",
          prompt: {
            en: 'Given <Hello name="Ada" />, what is props.name inside Hello?',
            "pt-BR": 'Dado <Hello name="Ada" />, o que é props.name dentro de Hello?',
          },
          code: `<Hello name="Ada" />`,
          options: [{ en: "Ada" }, { en: "name" }, { en: "undefined" }, { en: "{name}" }],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you pass a number as a prop?",
            "pt-BR": "Como passar um número como prop?",
          },
          options: [{ en: "age={30}" }, { en: 'age="30"' }, { en: "age=30" }, { en: "age={{30}}" }],
          correct: 0,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Destructure the name prop directly in the parameter",
            "pt-BR": "Desestruture a prop name diretamente no parâmetro",
          },
          code: `function Hello({ ___ }) { return <h1>Hi {name}</h1>; }`,
          answer: "name",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about props",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre props",
          },
          options: [
            {
              en: "Props are read-only inside the component",
              "pt-BR": "Props são somente leitura dentro do componente",
            },
            {
              en: "A prop can be any JavaScript value, including functions",
              "pt-BR": "Uma prop pode ser qualquer valor JavaScript, incluindo funções",
            },
            {
              en: "Props can be reassigned inside the component",
              "pt-BR": "Props podem ser reatribuídas dentro do componente",
            },
            { en: "Props are only strings", "pt-BR": "Props só podem ser strings" },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is the value of a prop that wasn't passed?",
            "pt-BR": "Qual é o valor de uma prop que não foi passada?",
          },
          options: [
            { en: "undefined" },
            { en: "null" },
            { en: '""' },
            { en: "throws an error", "pt-BR": "lança um erro" },
          ],
          correct: 0,
        },
      ],
    },
    {
      id: "components-props-3",
      title: { en: "Children and composition", "pt-BR": "Children e composição" },
      description: {
        en: "Nest components and use the children prop.",
        "pt-BR": "Aninhe componentes e use a prop children.",
      },
      xp: 15,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Destructure the children prop",
            "pt-BR": "Desestruture a prop children",
          },
          code: `function Card({ ___ }) { return <div className="card">{children}</div>; }`,
          answer: "children",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Given <Card><p>Hi</p></Card>, what is children inside Card?",
            "pt-BR": "Dado <Card><p>Hi</p></Card>, o que é children dentro de Card?",
          },
          code: `<Card><p>Hi</p></Card>`,
          options: [
            { en: "The <p>Hi</p> element", "pt-BR": "O elemento <p>Hi</p>" },
            { en: "undefined" },
            { en: 'The string "Hi"', "pt-BR": 'A string "Hi"' },
            { en: "An empty array", "pt-BR": "Um array vazio" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you give a prop a default value?",
            "pt-BR": "Como dar um valor padrão a uma prop?",
          },
          options: [
            { en: 'function Card({ size = "md" }) {}' },
            { en: 'function Card({ size ?? "md" }) {}' },
            { en: 'function Card({ size: "md" }) {}' },
            { en: 'function Card({ size || "md" }) {}' },
          ],
          correct: 0,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 valid ways to reuse markup across components",
            "pt-BR": "Escolha as 2 formas válidas de reaproveitar marcação entre componentes",
          },
          options: [
            {
              en: "Extract the shared markup into its own component",
              "pt-BR": "Extrair a marcação compartilhada para o próprio componente",
            },
            {
              en: "Pass markup as the children prop",
              "pt-BR": "Passar a marcação como a prop children",
            },
            {
              en: "Copy and paste the JSX into every component",
              "pt-BR": "Copiar e colar o JSX em cada componente",
            },
            {
              en: "Store the JSX as a string in a database",
              "pt-BR": "Guardar o JSX como uma string no banco de dados",
            },
          ],
          correct: [0, 1],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Can a component render another component more than once?",
            "pt-BR": "Um componente pode renderizar outro componente mais de uma vez?",
          },
          options: [
            { en: "Yes, any number of times", "pt-BR": "Sim, quantas vezes quiser" },
            {
              en: "No, only once per render",
              "pt-BR": "Não, só uma vez por renderização",
            },
            {
              en: "Only if it's a class component",
              "pt-BR": "Só se for um componente de classe",
            },
            { en: "Only inside a loop", "pt-BR": "Só dentro de um laço" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "In what order do Title and Body appear in the output?",
            "pt-BR": "Em que ordem Title e Body aparecem na saída?",
          },
          code: `function Card() {\n  return (\n    <div>\n      <Title />\n      <Body />\n    </div>\n  );\n}`,
          options: [
            {
              en: "In the order they're written: Title then Body",
              "pt-BR": "Na ordem em que foram escritos: Title e depois Body",
            },
            { en: "In reverse order", "pt-BR": "Em ordem inversa" },
            { en: "React decides randomly", "pt-BR": "O React decide aleatoriamente" },
            { en: "Only the last one renders", "pt-BR": "Só o último renderiza" },
          ],
          correct: 0,
        },
      ],
    },
  ],
};
