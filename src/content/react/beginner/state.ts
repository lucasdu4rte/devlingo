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
      xp: 20,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Why doesn't the UI update when `inc()` runs?",
            "pt-BR": "Por que a UI não atualiza quando `inc()` roda?",
          },
          code: `let count = 0;\nfunction inc() {\n  count++;\n}`,
          options: [
            { en: "`count` is not a number", "pt-BR": "`count` não é um número" },
            { en: "`inc()` throws an error", "pt-BR": "`inc()` lança um erro" },
            {
              en: "JSX caches old values forever",
              "pt-BR": "JSX guarda valores antigos para sempre",
            },
            {
              en: "React doesn't know the value changed, so it doesn't re-render",
              "pt-BR": "O React não sabe que o valor mudou, então não renderiza de novo",
            },
          ],
          correct: 3,
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
            en: "Where must hooks like `useState` be called?",
            "pt-BR": "Onde hooks como `useState` devem ser chamados?",
          },
          options: [
            { en: "Anywhere in the file", "pt-BR": "Em qualquer lugar do arquivo" },
            {
              en: "At the top level of a component, not inside conditionals or loops",
              "pt-BR": "No nível superior do componente, não dentro de condicionais ou laços",
            },
            { en: "Only inside `useEffect`", "pt-BR": "Somente dentro de `useEffect`" },
            { en: "Only in class components", "pt-BR": "Somente em componentes de classe" },
          ],
          correct: 1,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 things `useState` returns",
            "pt-BR": "Escolha as 2 coisas que `useState` retorna",
          },
          options: [
            { en: "The current value", "pt-BR": "O valor atual" },
            {
              en: "The previous render's props",
              "pt-BR": "As props da renderização anterior",
            },
            { en: "A reference to the DOM node", "pt-BR": "Uma referência ao nó do DOM" },
            {
              en: "A function to update the value",
              "pt-BR": "Uma função para atualizar o valor",
            },
          ],
          correct: [0, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "Which naming convention is idiomatic for state?",
            "pt-BR": "Qual convenção de nomes é idiomática para estado?",
          },
          options: [
            { en: "const [count, count2] = useState(0);" },
            { en: "const [getCount, count] = useState(0);" },
            { en: "const [count, setCount] = useState(0);" },
            { en: "const state = useState(0);" },
          ],
          correct: 2,
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
      xp: 30,
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
              en: "React re-renders the component with the new `count`",
              "pt-BR": "O React renderiza o componente de novo com o novo `count`",
            },
            { en: "`count` is mutated in place", "pt-BR": "`count` é mutado no lugar" },
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
            en: "Why must you call `setCount` instead of reassigning `count` directly?",
            "pt-BR":
              "Por que você deve chamar `setCount` em vez de reatribuir `count` diretamente?",
          },
          options: [
            {
              en: "`count` is stored on the server",
              "pt-BR": "`count` fica armazenado no servidor",
            },
            {
              en: "React only knows to re-render when you call the setter function",
              "pt-BR":
                "O React só sabe que precisa renderizar de novo quando você chama a função setter",
            },
            {
              en: "Reassigning `count` deletes the component",
              "pt-BR": "Reatribuir `count` apaga o componente",
            },
            { en: "JSX ignores all variables", "pt-BR": "JSX ignora todas as variáveis" },
          ],
          correct: 1,
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
              en: "State is shared automatically between all instances of a component",
              "pt-BR":
                "O estado é compartilhado automaticamente entre todas as instâncias de um componente",
            },
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
              en: "State updates always happen synchronously and immediately",
              "pt-BR": "Atualizações de estado sempre acontecem de forma síncrona e imediata",
            },
          ],
          correct: [1, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "If `count` starts at `0`, what is `count` after one click?",
            "pt-BR": "Se `count` começa em `0`, qual é o valor depois de um clique?",
          },
          code: `function handleClick() {\n  setCount(count + 1);\n  setCount(count + 1);\n}`,
          options: [
            {
              en: "`2`, because both calls add `1`",
              "pt-BR": "`2`, porque as duas chamadas somam `1`",
            },
            {
              en: "`0`, because state doesn't update",
              "pt-BR": "`0`, porque o estado não atualiza",
            },
            {
              en: "`1`, because `count` is stale in both calls",
              "pt-BR": "`1`, porque `count` está desatualizado nas duas chamadas",
            },
            { en: "It throws an error", "pt-BR": "Lança um erro" },
          ],
          correct: 2,
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
      xp: 30,
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
              en: "`user.name` cannot be reassigned",
              "pt-BR": "`user.name` não pode ser reatribuído",
            },
            {
              en: "`setUser` receives the same object reference, so React sees no change",
              "pt-BR":
                "`setUser` recebe a mesma referência de objeto, então o React não percebe mudança",
            },
            {
              en: "`setUser` only works with numbers",
              "pt-BR": "`setUser` só funciona com números",
            },
            {
              en: "React re-renders but doesn't repaint",
              "pt-BR": "O React renderiza de novo, mas não repinta",
            },
          ],
          correct: 1,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Spread the existing `user` and override the name",
            "pt-BR": "Espalhe o `user` existente e sobrescreva o nome",
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
            { en: "items.push(item)" },
            { en: "setItems(items.push(item))" },
            { en: "setItems([...items, item])" },
            { en: "items[items.length] = item" },
          ],
          correct: 2,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Remove the item with the matching `id`",
            "pt-BR": "Remova o item com o `id` correspondente",
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
          options: [{ en: "push" }, { en: "map" }, { en: "splice" }, { en: "filter" }],
          correct: [0, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "How many `useState` calls can a single component have?",
            "pt-BR": "Quantas chamadas de `useState` um único componente pode ter?",
          },
          options: [
            { en: "Exactly one", "pt-BR": "Exatamente uma" },
            { en: "At most three", "pt-BR": "No máximo três" },
            {
              en: "Zero, state must be an object",
              "pt-BR": "Zero, o estado precisa ser um objeto",
            },
            {
              en: "Any number, one per independent piece of state",
              "pt-BR": "Qualquer quantidade, uma para cada pedaço independente de estado",
            },
          ],
          correct: 3,
        },
      ],
    },
  ],
  challenge: [
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about props",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre props",
      },
      options: [
        {
          en: "Props flow one-way, from parent to child",
          "pt-BR": "Props fluem numa única direção, do pai para o filho",
        },
        {
          en: "A component can mutate its own `props` object to update the UI",
          "pt-BR": "Um componente pode mutar seu próprio objeto de `props` para atualizar a UI",
        },
        {
          en: "You change what a child sees by having the parent re-render with new data",
          "pt-BR": "Você muda o que um filho vê fazendo o pai renderizar de novo com novos dados",
        },
        {
          en: "Props are automatically deep-cloned by React before being passed to children",
          "pt-BR":
            "O React clona profundamente as props automaticamente antes de passá-las aos filhos",
        },
      ],
      correct: [0, 2],
    },
    {
      type: "fill-blank",
      prompt: {
        en: 'Default the `name` so `<Greeting />` (no `name` passed) renders `"Hi, Guest"`',
        "pt-BR":
          'Defina o valor padrão para que `<Greeting />` (sem `name`) renderize `"Hi, Guest"`',
      },
      code: `function Greeting({ name = "___" }) {\n  return <p>Hi, {name}</p>;\n}`,
      answer: "Guest",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What must `children` be here for this to work?",
        "pt-BR": "O que `children` precisa ser aqui para isso funcionar?",
      },
      code: `function Toggle({ on, children }) {\n  return children(on);\n}\n<Toggle on={true}>{(isOn) => <p>{isOn ? "On" : "Off"}</p>}</Toggle>`,
      options: [
        { en: "A React element", "pt-BR": "Um elemento React" },
        {
          en: "A function that `Toggle` calls with a value",
          "pt-BR": "Uma função que `Toggle` chama com um valor",
        },
        { en: "An array of elements", "pt-BR": "Um array de elementos" },
        { en: "A string", "pt-BR": "Uma string" },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "What problem does defining `Child` inside `Parent` cause?",
        "pt-BR": "Que problema definir `Child` dentro de `Parent` causa?",
      },
      code: `function Parent() {\n  function Child() {\n    return <input />;\n  }\n  return <Child />;\n}`,
      options: [
        {
          en: "`Child` is redefined on every `Parent` render, so React treats it as a new type and remounts it",
          "pt-BR":
            "`Child` é redefinido a cada renderização de `Parent`, então o React o trata como um novo tipo e o remonta",
        },
        {
          en: "Nothing, this is a common recommended pattern",
          "pt-BR": "Nada, esse é um padrão comum e recomendado",
        },
        {
          en: "`Child` cannot receive props this way",
          "pt-BR": "`Child` não consegue receber props assim",
        },
        {
          en: "It causes an infinite render loop",
          "pt-BR": "Isso causa um loop infinito de renderização",
        },
      ],
      correct: 0,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about JSX tag names",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre nomes de tags no JSX",
      },
      options: [
        {
          en: "`<button>` renders the built-in DOM `button` element",
          "pt-BR": "`<button>` renderiza o elemento `button` nativo do DOM",
        },
        {
          en: "`<Button>` looks up a variable named `Button` in scope",
          "pt-BR": "`<Button>` procura uma variável chamada `Button` no escopo",
        },
        {
          en: "`<button>` and `<Button>` always refer to the same thing",
          "pt-BR": "`<button>` e `<Button>` sempre se referem à mesma coisa",
        },
        {
          en: "Component names must be declared with the `const` keyword",
          "pt-BR": "Nomes de componentes precisam ser declarados com `const`",
        },
      ],
      correct: [0, 1],
    },
    {
      type: "single-choice",
      prompt: { en: "What is `key` inside `Item`?", "pt-BR": "O que é `key` dentro de `Item`?" },
      code: `function Item({ id, key }) {\n  return <li>{key}</li>;\n}\n<Item key={id} id={id} />`,
      options: [
        { en: "The same value passed to `key`", "pt-BR": "O mesmo valor passado para `key`" },
        { en: "`id`'s value", "pt-BR": "O valor de `id`" },
        { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
        {
          en: "`undefined` — `key` is used internally by React and is never passed as a prop",
          "pt-BR":
            "`undefined` — `key` é usado internamente pelo React e nunca é passado como prop",
        },
      ],
      correct: 3,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Pass the handler under the name `Child` expects",
        "pt-BR": "Passe o handler com o nome que `Child` espera",
      },
      code: `function Child({ onSave }) {\n  return <button onClick={onSave}>Save</button>;\n}\nfunction Parent() {\n  function handleSave() {}\n  return <Child ___={handleSave} />;\n}`,
      answer: "onSave",
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about composition in React",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre composição no React",
      },
      options: [
        {
          en: "React recommends composition (nesting or passing components) over class inheritance",
          "pt-BR":
            "O React recomenda composição (aninhar ou passar componentes) em vez de herança de classes",
        },
        {
          en: "You compose components mainly by extending a base component class",
          "pt-BR":
            "Você compõe componentes principalmente estendendo uma classe base de componente",
        },
        {
          en: "The `children` prop is a common tool for composition",
          "pt-BR": "A prop `children` é uma ferramenta comum de composição",
        },
        {
          en: "Composition means one component automatically inherits another's state",
          "pt-BR": "Composição significa que um componente herda automaticamente o estado de outro",
        },
      ],
      correct: [0, 2],
    },
    {
      type: "single-choice",
      prompt: {
        en: "What determines which component renders?",
        "pt-BR": "O que determina qual componente renderiza?",
      },
      code: `return isLoggedIn ? <Dashboard /> : <LoginForm />;`,
      options: [
        {
          en: "Both components always render, one hidden with CSS",
          "pt-BR": "Os dois componentes sempre renderizam, um escondido com CSS",
        },
        { en: "Only `Dashboard` ever renders", "pt-BR": "Só `Dashboard` renderiza" },
        {
          en: "The `isLoggedIn` value at the moment of render",
          "pt-BR": "O valor de `isLoggedIn` no momento da renderização",
        },
        {
          en: "A compile error, since ternaries can't return JSX",
          "pt-BR": "Um erro de compilação, já que ternários não podem retornar JSX",
        },
      ],
      correct: 2,
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Render each child on its own line, since `children` with siblings is an array",
        "pt-BR":
          "Renderize cada child em sua própria linha, já que `children` com irmãos é um array",
      },
      code: `function List({ children }) {\n  return <ul>{children.___((child, i) => <li key={i}>{child}</li>)}</ul>;\n}`,
      answer: "map",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What renders when `show` is `false`?",
        "pt-BR": "O que renderiza quando `show` é `false`?",
      },
      code: `function Banner({ show }) {\n  if (!show) return null;\n  return <div className="banner">Hi</div>;\n}`,
      options: [
        {
          en: "Nothing is rendered — returning `null` renders no DOM node",
          "pt-BR": "Nada é renderizado — retornar `null` não gera nenhum nó no DOM",
        },
        { en: "A compile error", "pt-BR": "Um erro de compilação" },
        { en: "An empty `<div>`", "pt-BR": "Uma `<div>` vazia" },
        {
          en: "The word `null` appears on the page",
          "pt-BR": "A palavra `null` aparece na página",
        },
      ],
      correct: 0,
    },
    {
      type: "single-choice",
      prompt: { en: 'What is "prop drilling"?', "pt-BR": 'O que é "prop drilling"?' },
      options: [
        {
          en: "Mutating a prop deep inside a component tree",
          "pt-BR": "Mutar uma prop no fundo de uma árvore de componentes",
        },
        {
          en: "Passing a prop through several components that don't use it, just to reach a deeply nested one",
          "pt-BR":
            "Passar uma prop por vários componentes que não a usam, só para chegar a um componente bem aninhado",
        },
        {
          en: "A build tool that inlines props at compile time",
          "pt-BR": "Uma ferramenta de build que embute props em tempo de compilação",
        },
        {
          en: "Rendering the same component multiple times",
          "pt-BR": "Renderizar o mesmo componente várias vezes",
        },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "If `Parent` re-renders, what happens to `Child` by default?",
        "pt-BR": "Se `Parent` renderiza de novo, o que acontece com `Child` por padrão?",
      },
      code: `function Parent() {\n  return <Child label="Hi" />;\n}`,
      options: [
        { en: "`Child` never re-renders again", "pt-BR": "`Child` nunca mais renderiza de novo" },
        {
          en: "`Child` re-renders only if its own props changed",
          "pt-BR": "`Child` só renderiza de novo se suas próprias props mudarem",
        },
        {
          en: "`Child` unmounts and a new instance mounts",
          "pt-BR": "`Child` desmonta e uma nova instância é montada",
        },
        {
          en: "`Child` re-renders too, even though its props didn't change",
          "pt-BR": "`Child` também renderiza de novo, mesmo que suas props não tenham mudado",
        },
      ],
      correct: 3,
    },
    {
      type: "fill-blank",
      prompt: {
        en: 'Override `props.variant` with `"primary"` after spreading the rest',
        "pt-BR": 'Sobrescreva `props.variant` com `"primary"` depois de espalhar o resto',
      },
      code: `<Button {...props} ___="primary" />`,
      answer: "variant",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What renders inside the `div` when `show` is `false`?",
        "pt-BR": "O que renderiza dentro da `div` quando `show` é `false`?",
      },
      code: `function Modal({ show }) {\n  return <div>{show && <p>Popup</p>}</div>;\n}`,
      options: [
        { en: "The word `false` is printed", "pt-BR": "A palavra `false` é exibida" },
        { en: "`<p>Popup</p>` still renders", "pt-BR": "`<p>Popup</p>` ainda renderiza" },
        {
          en: "Nothing — `false` renders as nothing, unlike `0`",
          "pt-BR": "Nada — `false` renderiza como nada, diferente de `0`",
        },
        { en: "A syntax error", "pt-BR": "Um erro de sintaxe" },
      ],
      correct: 2,
    },
  ],
  sideQuest: {
    id: "state-extra",
    title: { en: "Global state", "pt-BR": "Estado global" },
    description: {
      en: "Recognize prop drilling and see when a shared store solves what context or lifting doesn't.",
      "pt-BR":
        "Reconheça o prop drilling e veja quando um store compartilhado resolve o que context ou lifting não resolvem.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "A header's cart icon and a product page, on opposite sides of the component tree, both need the same `cartItems` list. Where does that state have to live for both to see it?",
          "pt-BR":
            "O ícone de carrinho no cabeçalho e a página de produto, em lados opostos da árvore de componentes, precisam da mesma lista `cartItems`. Onde esse estado precisa viver para que os dois a vejam?",
        },
        options: [
          {
            en: "In each component separately, kept in sync by copying values back and forth",
            "pt-BR":
              "Em cada componente separadamente, sincronizado copiando valores de um lado para o outro",
          },
          {
            en: "In a common ancestor above both — or in a store outside the component tree that both can read",
            "pt-BR":
              "Em um ancestral comum acima dos dois — ou em um store fora da árvore de componentes que ambos possam ler",
          },
          {
            en: "It can live in whichever component happens to render first",
            "pt-BR": "Pode viver em qualquer componente que renderize primeiro",
          },
          {
            en: "Local `useState` in each component, since React syncs same-named state automatically",
            "pt-BR":
              "`useState` local em cada componente, já que o React sincroniza estados com o mesmo nome automaticamente",
          },
        ],
        correct: 1,
      },
      {
        type: "single-choice",
        prompt: {
          en: "You pass `theme` through 5 components that never use it, just so a 6th one can read it. What is this called, and what does it usually signal?",
          "pt-BR":
            "Você passa `theme` por 5 componentes que nunca a usam, só para que um 6º possa lê-la. Como isso se chama, e o que costuma sinalizar?",
        },
        options: [
          {
            en: '"Composition", and it\'s the recommended pattern',
            "pt-BR": '"Composição", e é o padrão recomendado',
          },
          {
            en: '"Prop drilling" — a sign the state might belong somewhere more shared, like context or a store',
            "pt-BR":
              '"Prop drilling" — um sinal de que o estado talvez devesse estar em algo mais compartilhado, como context ou um store',
          },
          {
            en: '"Hoisting", a compiler optimization',
            "pt-BR": '"Hoisting", uma otimização do compilador',
          },
          {
            en: '"Memoization", which improves performance',
            "pt-BR": '"Memoization", que melhora a performance',
          },
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Name the store method that registers a callback to run whenever the state changes",
          "pt-BR":
            "Nomeie o método do store que registra um callback para rodar sempre que o estado mudar",
        },
        code: `store.___(listener);`,
        answer: "subscribe",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 things a global store like Redux or Zustand provides",
          "pt-BR": "Escolha as 2 coisas que um store global como Redux ou Zustand fornece",
        },
        options: [
          {
            en: "A single source of truth accessible from any component in the tree",
            "pt-BR": "Uma única fonte de verdade acessível de qualquer componente na árvore",
          },
          {
            en: "Actions (or setters) that describe how the state changes, plus subscribers that react to it",
            "pt-BR":
              "Ações (ou setters) que descrevem como o estado muda, além de subscribers que reagem a isso",
          },
          {
            en: "Automatic elimination of every state-related bug",
            "pt-BR": "Eliminação automática de todo bug relacionado a estado",
          },
          {
            en: "A guarantee that the app never needs `useState` again",
            "pt-BR": "Uma garantia de que o app nunca mais vai precisar de `useState`",
          },
        ],
        correct: [0, 1],
      },
      {
        type: "single-choice",
        prompt: {
          en: "Two sibling components need to share one piece of state, and no other component needs it. What's the simplest fix?",
          "pt-BR":
            "Dois componentes irmãos precisam compartilhar um único pedaço de estado, e nenhum outro componente precisa dele. Qual é a solução mais simples?",
        },
        options: [
          { en: "Reach for Redux immediately", "pt-BR": "Recorrer ao Redux imediatamente" },
          {
            en: "Lift the state up to their closest common parent and pass it down as props",
            "pt-BR": "Elevar o estado (lifting) até o pai comum mais próximo e passá-lo como props",
          },
          {
            en: "Put it in a global store so it's available everywhere",
            "pt-BR": "Colocar em um store global para que fique disponível em todo lugar",
          },
          {
            en: "Duplicate the state in both siblings",
            "pt-BR": "Duplicar o estado nos dois irmãos",
          },
        ],
        correct: 1,
      },
      {
        type: "single-choice",
        prompt: {
          en: "React Context lets a value skip prop drilling. When is context already enough, without reaching for a dedicated state library?",
          "pt-BR":
            "O Context do React permite que um valor pule o prop drilling. Quando o context já é suficiente, sem precisar de uma biblioteca de estado dedicada?",
        },
        options: [
          {
            en: "When the value rarely changes and only a few components deep in the tree need it",
            "pt-BR":
              "Quando o valor muda raramente e só alguns componentes no fundo da árvore precisam dele",
          },
          {
            en: "Never — context can't hold state at all",
            "pt-BR": "Nunca — context não consegue guardar estado",
          },
          { en: "Only when the value is a number", "pt-BR": "Só quando o valor é um número" },
          {
            en: "Always — no state library is ever needed",
            "pt-BR": "Sempre — nenhuma biblioteca de estado é necessária",
          },
        ],
        correct: 0,
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 true statements about React Context versus a dedicated state library like Redux or Zustand",
          "pt-BR":
            "Escolha as 2 afirmações verdadeiras sobre Context do React comparado a uma biblioteca de estado dedicada, como Redux ou Zustand",
        },
        options: [
          {
            en: "Context requires installing an external library",
            "pt-BR": "Context exige instalar uma biblioteca externa",
          },
          {
            en: "Every component reading a context re-renders whenever that context value changes",
            "pt-BR":
              "Todo componente que lê um context renderiza de novo sempre que o valor do context muda",
          },
          {
            en: "A dedicated store can let components subscribe to just a slice of state, avoiding unrelated re-renders",
            "pt-BR":
              "Um store dedicado pode deixar componentes assinarem só uma fatia do estado, evitando renderizações não relacionadas",
          },
          {
            en: "A dedicated state library can never be combined with Context",
            "pt-BR": "Uma biblioteca de estado dedicada nunca pode ser combinada com Context",
          },
        ],
        correct: [1, 2],
      },
    ],
  },
};
