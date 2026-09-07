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
      xp: 20,
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
          options: [{ en: "<card />" }, { en: "<Card />" }, { en: "Card()" }, { en: "{Card}" }],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Name the component in PascalCase to match the usage `<Greeting />`",
            "pt-BR": "Nomeie o componente em PascalCase para corresponder ao uso `<Greeting />`",
          },
          code: `function ___() { return <p>Hi</p>; }`,
          answer: "Greeting",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Why does `<card />` try to render an unknown HTML tag instead of your component?",
            "pt-BR":
              "Por que `<card />` tenta renderizar uma tag HTML desconhecida em vez do seu componente?",
          },
          options: [
            {
              en: "React doesn't support components named `Card`",
              "pt-BR": "React não permite componentes chamados `Card`",
            },
            {
              en: "JSX requires a semicolon after the tag",
              "pt-BR": "JSX exige um ponto e vírgula depois da tag",
            },
            {
              en: "Lowercase tag names are treated as built-in DOM elements",
              "pt-BR": "Nomes de tag em minúsculas são tratados como elementos DOM nativos",
            },
            {
              en: "`Card` must be imported from `react`",
              "pt-BR": "`Card` precisa ser importado do `react`",
            },
          ],
          correct: 2,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 rules a component must follow",
            "pt-BR": "Escolha as 2 regras que um componente deve seguir",
          },
          options: [
            { en: "It must accept props", "pt-BR": "Ele precisa aceitar props" },
            {
              en: "Its name starts with a capital letter",
              "pt-BR": "Seu nome começa com letra maiúscula",
            },
            { en: "It must use `useState`", "pt-BR": "Ele precisa usar `useState`" },
            { en: "It returns JSX (or `null`)", "pt-BR": "Ele retorna JSX (ou `null`)" },
          ],
          correct: [1, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Where can a component be defined?",
            "pt-BR": "Onde um componente pode ser definido?",
          },
          options: [
            { en: "Only inside `App`", "pt-BR": "Somente dentro de `App`" },
            {
              en: "Nested inside another component's function body",
              "pt-BR": "Aninhado dentro do corpo de outra função de componente",
            },
            {
              en: "Only in a file named `index.tsx`",
              "pt-BR": "Somente em um arquivo chamado `index.tsx`",
            },
            {
              en: "At the top level of a module, not nested inside another component",
              "pt-BR": "No nível superior de um módulo, não aninhado dentro de outro componente",
            },
          ],
          correct: 3,
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
      xp: 30,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Accept the `props` object as a parameter",
            "pt-BR": "Receba o objeto `props` como parâmetro",
          },
          code: `function Hello(___) { return <h1>Hi {props.name}</h1>; }`,
          answer: "props",
        },
        {
          type: "single-choice",
          prompt: {
            en: 'Given `<Hello name="Ada" />`, what is `props.name` inside `Hello`?',
            "pt-BR": 'Dado `<Hello name="Ada" />`, o que é `props.name` dentro de `Hello`?',
          },
          code: `<Hello name="Ada" />`,
          options: [{ en: "name" }, { en: "Ada" }, { en: "undefined" }, { en: "{name}" }],
          correct: 1,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you pass a number as a prop?",
            "pt-BR": "Como passar um número como prop?",
          },
          options: [{ en: 'age="30"' }, { en: "age=30" }, { en: "age={30}" }, { en: "age={{30}}" }],
          correct: 2,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Destructure the `name` prop directly in the parameter",
            "pt-BR": "Desestruture a prop `name` diretamente no parâmetro",
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
              en: "Props can be reassigned inside the component",
              "pt-BR": "Props podem ser reatribuídas dentro do componente",
            },
            {
              en: "A prop can be any JavaScript value, including functions",
              "pt-BR": "Uma prop pode ser qualquer valor JavaScript, incluindo funções",
            },
            { en: "Props are only strings", "pt-BR": "Props só podem ser strings" },
          ],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is the value of a prop that wasn't passed?",
            "pt-BR": "Qual é o valor de uma prop que não foi passada?",
          },
          options: [
            { en: "null" },
            { en: '""' },
            { en: "throws an error", "pt-BR": "lança um erro" },
            { en: "undefined" },
          ],
          correct: 3,
        },
      ],
    },
    {
      id: "components-props-3",
      title: { en: "Children and composition", "pt-BR": "Children e composição" },
      description: {
        en: "Nest components and use the `children` prop.",
        "pt-BR": "Aninhe componentes e use a prop `children`.",
      },
      xp: 30,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Destructure the `children` prop",
            "pt-BR": "Desestruture a prop `children`",
          },
          code: `function Card({ ___ }) { return <div className="card">{children}</div>; }`,
          answer: "children",
        },
        {
          type: "single-choice",
          prompt: {
            en: "Given `<Card><p>Hi</p></Card>`, what is `children` inside `Card`?",
            "pt-BR": "Dado `<Card><p>Hi</p></Card>`, o que é `children` dentro de `Card`?",
          },
          code: `<Card><p>Hi</p></Card>`,
          options: [
            { en: "undefined" },
            { en: 'The string `"Hi"`', "pt-BR": 'A string `"Hi"`' },
            { en: "The `<p>Hi</p>` element", "pt-BR": "O elemento `<p>Hi</p>`" },
            { en: "An empty array", "pt-BR": "Um array vazio" },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "How do you give a prop a default value?",
            "pt-BR": "Como dar um valor padrão a uma prop?",
          },
          options: [
            { en: 'function Card({ size ?? "md" }) {}' },
            { en: 'function Card({ size: "md" }) {}' },
            { en: 'function Card({ size || "md" }) {}' },
            { en: 'function Card({ size = "md" }) {}' },
          ],
          correct: 3,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 valid ways to reuse markup across components",
            "pt-BR": "Escolha as 2 formas válidas de reaproveitar marcação entre componentes",
          },
          options: [
            {
              en: "Copy and paste the JSX into every component",
              "pt-BR": "Copiar e colar o JSX em cada componente",
            },
            {
              en: "Extract the shared markup into its own component",
              "pt-BR": "Extrair a marcação compartilhada para o próprio componente",
            },
            {
              en: "Store the JSX as a string in a database",
              "pt-BR": "Guardar o JSX como uma string no banco de dados",
            },
            {
              en: "Pass markup as the `children` prop",
              "pt-BR": "Passar a marcação como a prop `children`",
            },
          ],
          correct: [1, 3],
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
            en: "In what order do `Title` and `Body` appear in the output?",
            "pt-BR": "Em que ordem `Title` e `Body` aparecem na saída?",
          },
          code: `function Card() {\n  return (\n    <div>\n      <Title />\n      <Body />\n    </div>\n  );\n}`,
          options: [
            { en: "In reverse order", "pt-BR": "Em ordem inversa" },
            {
              en: "In the order they're written: `Title` then `Body`",
              "pt-BR": "Na ordem em que foram escritos: `Title` e depois `Body`",
            },
            { en: "React decides randomly", "pt-BR": "O React decide aleatoriamente" },
            { en: "Only the last one renders", "pt-BR": "Só o último renderiza" },
          ],
          correct: 1,
        },
      ],
    },
  ],
  challenge: [
    {
      type: "fill-blank",
      prompt: {
        en: 'Complete the call this JSX compiles to: `<h1 className="title">Hi</h1>`',
        "pt-BR": 'Complete a chamada para a qual esse JSX compila: `<h1 className="title">Hi</h1>`',
      },
      code: `React.___("h1", { className: "title" }, "Hi");`,
      answer: "createElement",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What does this render when `items.length` is `0`?",
        "pt-BR": "O que isso renderiza quando `items.length` é `0`?",
      },
      code: `function List({ items }) {\n  return <div>{items.length && <p>{items.length} items</p>}</div>;\n}`,
      options: [
        {
          en: "Nothing is rendered because `0` is falsy",
          "pt-BR": "Nada é renderizado porque `0` é falsy",
        },
        {
          en: "A syntax error, because `&&` cannot be used in JSX",
          "pt-BR": "Um erro de sintaxe, porque `&&` não pode ser usado no JSX",
        },
        {
          en: "The literal number `0` is rendered as text",
          "pt-BR": "O número `0` é renderizado como texto",
        },
        { en: "`<p>0 items</p>` is rendered", "pt-BR": "`<p>0 items</p>` é renderizado" },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What renders inside the `<p>` when `isAdmin` is `false`?",
        "pt-BR": "O que renderiza dentro do `<p>` quando `isAdmin` é `false`?",
      },
      code: `const el = <p>{isAdmin ? "Admin" : null}</p>;`,
      options: [
        {
          en: "Nothing is rendered inside the `<p>`",
          "pt-BR": "Nada é renderizado dentro do `<p>`",
        },
        {
          en: "The word `null` is rendered as text",
          "pt-BR": "A palavra `null` é renderizada como texto",
        },
        { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
        {
          en: '`"Admin"` is rendered regardless',
          "pt-BR": '`"Admin"` é renderizado de qualquer forma',
        },
      ],
      correct: 0,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 3 true statements about JSX attribute names",
        "pt-BR": "Escolha as 3 afirmações verdadeiras sobre nomes de atributos no JSX",
      },
      options: [
        {
          en: "`className` is used instead of `class`",
          "pt-BR": "`className` é usado em vez de `class`",
        },
        {
          en: "`aria-label` keeps its hyphenated name unchanged",
          "pt-BR": "`aria-label` mantém o nome com hífen sem alterações",
        },
        {
          en: "`onclick` (all lowercase) works the same as `onClick`",
          "pt-BR": "`onclick` (tudo minúsculo) funciona igual a `onClick`",
        },
        {
          en: "`data-testid` keeps its hyphenated name unchanged",
          "pt-BR": "`data-testid` mantém o nome com hífen sem alterações",
        },
      ],
      correct: [0, 1, 3],
    },
    {
      type: "single-choice",
      prompt: {
        en: "You're rendering a list and need to attach a `key` without adding an extra DOM node. Which is correct?",
        "pt-BR":
          "Você está renderizando uma lista e precisa colocar um `key` sem adicionar um nó extra no DOM. Qual está correto?",
      },
      code: `items.map(item => (\n  <>\n    <dt>{item.term}</dt>\n    <dd>{item.def}</dd>\n  </>\n))`,
      options: [
        { en: "<> key={item.id} ...</>" },
        { en: "<React.Fragment key={item.id}>...</React.Fragment>" },
        {
          en: "`<Fragment>...</Fragment>`, no `key` needed for lists",
          "pt-BR": "`<Fragment>...</Fragment>`, sem precisar de `key` em listas",
        },
        {
          en: "Add `key` to the outer `<dl>` only",
          "pt-BR": "Adicione `key` só na `<dl>` externa",
        },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: { en: "Why does this fail to compile?", "pt-BR": "Por que isso não compila?" },
      code: `<div>{if (isOpen) { "Menu" }}</div>`,
      options: [
        { en: "`isOpen` is not defined", "pt-BR": "`isOpen` não está definido" },
        {
          en: "Curly braces in JSX only accept expressions, and `if` is a statement",
          "pt-BR": "Chaves no JSX só aceitam expressões, e `if` é uma instrução",
        },
        {
          en: "`div` cannot contain conditional content",
          "pt-BR": "`div` não pode conter conteúdo condicional",
        },
        {
          en: "JSX requires an `else` for every `if`",
          "pt-BR": "JSX exige um `else` para todo `if`",
        },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What is the value of the `name` prop?",
        "pt-BR": "Qual é o valor da prop `name`?",
      },
      code: `<Greeting name="{user.name}" />`,
      options: [
        { en: "The value stored in `user.name`", "pt-BR": "O valor armazenado em `user.name`" },
        {
          en: "`undefined`, because braces need to be a separate attribute value",
          "pt-BR": "`undefined`, porque chaves precisam ser um valor de atributo separado",
        },
        { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
        {
          en: 'The literal string `"{user.name}"`',
          "pt-BR": 'A string literal `"{user.name}"`',
        },
      ],
      correct: 3,
    },
    {
      type: "fill-blank",
      prompt: { en: "Spread all props onto the `div`", "pt-BR": "Espalhe todas as props no `div`" },
      code: `function Wrapper(props) {\n  return <div {...___} />;\n}`,
      answer: "props",
    },
    {
      type: "single-choice",
      prompt: {
        en: "Why does this component fail to compile?",
        "pt-BR": "Por que esse componente não compila?",
      },
      code: `function Card() {\n  return (\n    <h2>Title</h2>\n    <p>Body</p>\n  );\n}`,
      options: [
        {
          en: "A JSX expression must have a single root element",
          "pt-BR": "Uma expressão JSX precisa ter um único elemento raiz",
        },
        { en: "`h2` cannot be followed by `p`", "pt-BR": "`h2` não pode ser seguido de `p`" },
        {
          en: "`return` cannot span multiple lines",
          "pt-BR": "`return` não pode ocupar várias linhas",
        },
        { en: "It compiles fine", "pt-BR": "Compila normalmente" },
      ],
      correct: 0,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Name the required key for `dangerouslySetInnerHTML`'s object",
        "pt-BR": "Nomeie a chave obrigatória do objeto de `dangerouslySetInnerHTML`",
      },
      code: `<div dangerouslySetInnerHTML={{ ___: markup }} />`,
      answer: "__html",
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about boolean attributes in JSX",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre atributos booleanos no JSX",
      },
      code: `<button disabled="false">Save</button>`,
      options: [
        {
          en: "Writing `disabled` by itself makes the element disabled",
          "pt-BR": "Escrever `disabled` sozinho já deixa o elemento desabilitado",
        },
        {
          en: '`disabled="false"` makes the button enabled because the string says `false`',
          "pt-BR": '`disabled="false"` deixa o botão habilitado porque a string diz `false`',
        },
        {
          en: "`disabled={false}` makes the element enabled",
          "pt-BR": "`disabled={false}` deixa o elemento habilitado",
        },
        {
          en: "You must always write `disabled={true}`; `disabled` alone doesn't work",
          "pt-BR":
            "Você sempre precisa escrever `disabled={true}`; `disabled` sozinho não funciona",
        },
      ],
      correct: [0, 2],
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 valid ways to comment inside JSX",
        "pt-BR": "Escolha as 2 formas válidas de comentar dentro do JSX",
      },
      options: [
        {
          en: "`//` comment written directly inside JSX children",
          "pt-BR": "`//` comentário escrito diretamente dentro dos filhos do JSX",
        },
        {
          en: "`{/* comment */}` inside JSX children",
          "pt-BR": "`{/* comentário */}` dentro dos filhos do JSX",
        },
        {
          en: "`<!-- comment -->` inside JSX children",
          "pt-BR": "`<!-- comentário -->` dentro dos filhos do JSX",
        },
        {
          en: "`/* comment */` between attributes inside the opening tag",
          "pt-BR": "`/* comentário */` entre atributos dentro da tag de abertura",
        },
      ],
      correct: [1, 3],
    },
    {
      type: "single-choice",
      prompt: { en: "Why does this fail to compile?", "pt-BR": "Por que isso não compila?" },
      code: `const el = <img src="cat.png">;`,
      options: [
        { en: "`img` is not a valid JSX tag", "pt-BR": "`img` não é uma tag JSX válida" },
        { en: "`src` must be a number", "pt-BR": "`src` precisa ser um número" },
        {
          en: "Void elements must self-close with `/>`",
          "pt-BR": "Elementos vazios precisam se auto-fechar com `/>`",
        },
        { en: "It compiles fine", "pt-BR": "Compila normalmente" },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What happens when this renders?",
        "pt-BR": "O que acontece quando isso renderiza?",
      },
      code: `const el = <div class="card">Hi</div>;`,
      options: [
        { en: "React throws a compile error", "pt-BR": "O React lança um erro de compilação" },
        {
          en: "The `card` class is silently dropped",
          "pt-BR": "A classe `card` é descartada silenciosamente",
        },
        {
          en: "`className` is used automatically instead",
          "pt-BR": "`className` é usado automaticamente no lugar",
        },
        {
          en: "React renders it but warns that `class` should be `className`",
          "pt-BR": "O React renderiza, mas avisa que deveria usar `className`",
        },
      ],
      correct: 3,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Interpolate the `variant` into the class name",
        "pt-BR": "Interpole o `variant` no nome da classe",
      },
      code: "const el = <div className={`btn ___{variant}`}>Save</div>;",
      answer: "$",
    },
  ],
};
