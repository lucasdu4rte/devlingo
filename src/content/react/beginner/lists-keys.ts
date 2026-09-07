import type { Unit } from "@/content/types";

export const listsKeys: Unit = {
  id: "lists-keys",
  title: { en: "Lists & keys", "pt-BR": "Listas e keys" },
  lessons: [
    {
      id: "lists-keys-1",
      title: { en: "Rendering a list", "pt-BR": "Renderizando uma lista" },
      description: {
        en: "Turn arrays into JSX and handle empty or nested collections clearly.",
        "pt-BR": "Transforme arrays em JSX e trate coleções vazias ou aninhadas com clareza.",
      },
      xp: 20,
      exercises: [
        {
          type: "fill-blank",
          prompt: {
            en: "Call the array method that transforms every name into an `li` element",
            "pt-BR": "Chame o método de array que transforma cada nome em um elemento `li`",
          },
          code: `const rows = names.___(name => <li>{name}</li>);`,
          answer: "map",
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does `map` return in this example?",
            "pt-BR": "O que `map` retorna neste exemplo?",
          },
          code: `const rows = names.map(name => <li>{name}</li>);`,
          options: [
            {
              en: "One `li` whose text contains the whole array",
              "pt-BR": "Um único `li` cujo texto contém o array inteiro",
            },
            {
              en: "The original `names` array, changed in place",
              "pt-BR": "O array `names` original, alterado no lugar",
            },
            {
              en: "A new array of `li` elements, one for each name",
              "pt-BR": "Um novo array de elementos `li`, um para cada nome",
            },
            {
              en: "A string containing the generated HTML",
              "pt-BR": "Uma string contendo o HTML gerado",
            },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "Why does this fail to compile?",
            "pt-BR": "Por que isso não compila?",
          },
          code: `<ul>{for (const name of names) { <li>{name}</li> }}</ul>`,
          options: [
            {
              en: "A `ul` cannot contain expressions",
              "pt-BR": "Uma `ul` não pode conter expressões",
            },
            {
              en: "JSX braces accept expressions, but `for` is a statement and produces no value",
              "pt-BR":
                "Chaves no JSX aceitam expressões, mas `for` é uma instrução e não produz valor",
            },
            {
              en: "The callback must be asynchronous",
              "pt-BR": "O callback precisa ser assíncrono",
            },
            {
              en: "React only supports arrays of strings",
              "pt-BR": "O React só aceita arrays de strings",
            },
          ],
          correct: 1,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 true statements about these two list components",
            "pt-BR": "Escolha as 2 afirmações verdadeiras sobre estes dois componentes de lista",
          },
          code: `function Inline({ items }) {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}

function Extracted({ items }) {
  const rows = items.map(item => <li key={item.id}>{item.name}</li>);
  return <ul>{rows}</ul>;
}`,
          options: [
            {
              en: "Both can render the same list because React accepts arrays of elements as children",
              "pt-BR":
                "Os dois podem renderizar a mesma lista porque o React aceita arrays de elementos como filhos",
            },
            {
              en: "Only the inline version is valid JSX",
              "pt-BR": "Só a versão inline é JSX válido",
            },
            {
              en: "Extracting `rows` makes React render an extra DOM element",
              "pt-BR": "Extrair `rows` faz o React renderizar um elemento DOM extra",
            },
            {
              en: "Extracting the array can make a long transformation easier to read or reuse",
              "pt-BR":
                "Extrair o array pode deixar uma transformação longa mais fácil de ler ou reutilizar",
            },
          ],
          correct: [0, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does this component render when `products` is empty?",
            "pt-BR": "O que este componente renderiza quando `products` está vazio?",
          },
          code: `function Products({ products }) {
  if (products.length === 0) return <p>No products</p>;
  return <ul>{products.map(product => <li key={product.id}>{product.name}</li>)}</ul>;
}`,
          options: [
            { en: "An empty `ul`", "pt-BR": "Uma `ul` vazia" },
            { en: "The word `undefined`", "pt-BR": "A palavra `undefined`" },
            { en: "A runtime error", "pt-BR": "Um erro em tempo de execução" },
            {
              en: "A paragraph that says `No products`",
              "pt-BR": "Um parágrafo que diz `No products`",
            },
          ],
          correct: 3,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Use `map` for the inner collection so every project's tasks become `li` elements",
            "pt-BR":
              "Use `map` na coleção interna para que as tarefas de cada projeto virem elementos `li`",
          },
          code: `projects.map(project => (
  <section key={project.id}>
    <h2>{project.name}</h2>
    <ul>{project.tasks.___(task => <li key={task.id}>{task.title}</li>)}</ul>
  </section>
));`,
          answer: "map",
        },
      ],
    },
    {
      id: "lists-keys-2",
      title: { en: "The key prop", "pt-BR": "A prop key" },
      description: {
        en: "Give React stable identities for sibling elements in a list.",
        "pt-BR": "Dê ao React identidades estáveis para elementos irmãos em uma lista.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "What does React use a list item's `key` for?",
            "pt-BR": "Para que o React usa a `key` de um item de lista?",
          },
          options: [
            {
              en: "To expose the item's database id to the browser",
              "pt-BR": "Para expor o id do item no banco de dados ao navegador",
            },
            {
              en: "To sort the list alphabetically before rendering",
              "pt-BR": "Para ordenar a lista alfabeticamente antes de renderizar",
            },
            {
              en: "To match each sibling with its previous render when items move, appear, or disappear",
              "pt-BR":
                "Para associar cada irmão à renderização anterior quando itens mudam, aparecem ou somem",
            },
            {
              en: "To create a CSS selector for the item",
              "pt-BR": "Para criar um seletor CSS para o item",
            },
          ],
          correct: 2,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Add the special prop React uses to identify each rendered person",
            "pt-BR":
              "Adicione a prop especial que o React usa para identificar cada pessoa renderizada",
          },
          code: `<li ___={person.id}>{person.name}</li>`,
          answer: "key",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 valid statements about key uniqueness",
            "pt-BR": "Escolha as 2 afirmações válidas sobre a unicidade de keys",
          },
          options: [
            {
              en: "Every `key` must be unique across the entire application",
              "pt-BR": "Toda `key` precisa ser única no aplicativo inteiro",
            },
            {
              en: "Keys must be unique among items returned by the same surrounding list",
              "pt-BR":
                "Keys precisam ser únicas entre os itens retornados pela mesma lista ao redor",
            },
            {
              en: "Two separate lists can never reuse the same ids as keys",
              "pt-BR": "Duas listas separadas nunca podem reutilizar os mesmos ids como keys",
            },
            {
              en: "Separate sibling groups may reuse the same key values",
              "pt-BR": "Grupos separados de irmãos podem reutilizar os mesmos valores de key",
            },
          ],
          correct: [1, 3],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What does `Row` receive as `props.key`?",
            "pt-BR": "O que `Row` recebe como `props.key`?",
          },
          code: `function Row(props) {
  return <p>{String(props.key)}</p>;
}

<Row key="ada" />`,
          options: [
            {
              en: "No usable value, because React consumes `key` instead of passing it as a prop",
              "pt-BR":
                "Nenhum valor utilizável, porque o React consome `key` em vez de passá-la como prop",
            },
            { en: 'The string `"ada"`', "pt-BR": 'A string `"ada"`' },
            { en: "A generated number", "pt-BR": "Um número gerado" },
            { en: "The whole `Row` element", "pt-BR": "O elemento `Row` inteiro" },
          ],
          correct: 0,
        },
        {
          type: "single-choice",
          prompt: {
            en: "Each post must render an `h2` and a `p` without adding a wrapper to the DOM. Which replacement can carry the key?",
            "pt-BR":
              "Cada post deve renderizar um `h2` e um `p` sem adicionar um wrapper ao DOM. Qual substituição pode carregar a key?",
          },
          code: `posts.map(post => (
  <>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </>
))`,
          options: [
            { en: "< key={post.id}>...</>" },
            { en: "<React key={post.id}>...</React>" },
            { en: "<Fragment>...</Fragment>" },
            { en: "<Fragment key={post.id}>...</Fragment>" },
          ],
          correct: 3,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 correct places for a key when one mapped item renders multiple elements",
            "pt-BR":
              "Escolha os 2 lugares corretos para uma key quando um item mapeado renderiza vários elementos",
          },
          options: [
            {
              en: "On the outermost element returned for that item",
              "pt-BR": "No elemento mais externo retornado para aquele item",
            },
            {
              en: "Only on the first text node inside the item",
              "pt-BR": "Somente no primeiro nó de texto dentro do item",
            },
            {
              en: "On an explicit `Fragment` that groups the item's sibling elements",
              "pt-BR": "Em um `Fragment` explícito que agrupa os elementos irmãos do item",
            },
            {
              en: "On every descendant element, all with the same value",
              "pt-BR": "Em cada elemento descendente, todos com o mesmo valor",
            },
          ],
          correct: [0, 2],
        },
      ],
    },
    {
      id: "lists-keys-3",
      title: { en: "Choosing a key", "pt-BR": "Escolhendo uma key" },
      description: {
        en: "Choose stable data ids so item identity survives list changes.",
        "pt-BR":
          "Escolha ids estáveis dos dados para preservar a identidade dos itens quando a lista mudar.",
      },
      xp: 30,
      exercises: [
        {
          type: "single-choice",
          prompt: {
            en: "Why can an array index be a dangerous key in a sortable list?",
            "pt-BR": "Por que o índice do array pode ser uma key perigosa em uma lista ordenável?",
          },
          options: [
            {
              en: "Indices are too large for React to compare",
              "pt-BR": "Índices são grandes demais para o React comparar",
            },
            {
              en: "React refuses every numeric key",
              "pt-BR": "O React recusa toda key numérica",
            },
            {
              en: "The index makes the array immutable",
              "pt-BR": "O índice torna o array imutável",
            },
            {
              en: "After a reorder, the same index can refer to a different item, so React may preserve the wrong item state",
              "pt-BR":
                "Depois de reordenar, o mesmo índice pode apontar para outro item, então o React pode preservar o estado do item errado",
            },
          ],
          correct: 3,
        },
        {
          type: "fill-blank",
          prompt: {
            en: "Use the stable `id` stored with each row as its key",
            "pt-BR": "Use o `id` estável armazenado em cada linha como key",
          },
          code: `rows.map(row => <Row key={row.___} row={row} />)`,
          answer: "id",
        },
        {
          type: "multi-choice",
          prompt: {
            en: "Pick the 2 good sources for a list key",
            "pt-BR": "Escolha as 2 boas fontes para uma key de lista",
          },
          options: [
            {
              en: "A fresh `Math.random()` call during every render",
              "pt-BR": "Uma nova chamada a `Math.random()` durante cada renderização",
            },
            {
              en: "A database id already stored on the record",
              "pt-BR": "Um id do banco de dados já armazenado no registro",
            },
            {
              en: "An id created once when a client-side item is added and then stored with it",
              "pt-BR":
                "Um id criado uma vez quando um item é adicionado no cliente e depois armazenado com ele",
            },
            {
              en: "The item's current position after every sort",
              "pt-BR": "A posição atual do item depois de cada ordenação",
            },
          ],
          correct: [1, 2],
        },
        {
          type: "single-choice",
          prompt: {
            en: "What is the main problem with this key?",
            "pt-BR": "Qual é o principal problema desta key?",
          },
          code: `items.map(item => <Row key={crypto.randomUUID()} item={item} />)`,
          options: [
            {
              en: "UUIDs cannot be strings",
              "pt-BR": "UUIDs não podem ser strings",
            },
            {
              en: "The key is only unique among siblings",
              "pt-BR": "A key só é única entre irmãos",
            },
            {
              en: "A new key is generated on every render, so React treats every row as a new item and resets its state",
              "pt-BR":
                "Uma nova key é gerada em toda renderização, então o React trata cada linha como um item novo e reinicia seu estado",
            },
            {
              en: "The key should be passed through `item` instead",
              "pt-BR": "A key deveria ser passada por `item`",
            },
          ],
          correct: 2,
        },
        {
          type: "single-choice",
          prompt: {
            en: "When is using the index as a key usually acceptable?",
            "pt-BR": "Quando usar o índice como key costuma ser aceitável?",
          },
          options: [
            {
              en: "Whenever the list contains input fields",
              "pt-BR": "Sempre que a lista contém campos de entrada",
            },
            {
              en: "When the list is static and items will never be inserted, removed, or reordered",
              "pt-BR":
                "Quando a lista é estática e os itens nunca serão inseridos, removidos ou reordenados",
            },
            {
              en: "Whenever the items also have stable ids",
              "pt-BR": "Sempre que os itens também têm ids estáveis",
            },
            {
              en: "Only when the list has more than one thousand items",
              "pt-BR": "Somente quando a lista tem mais de mil itens",
            },
          ],
          correct: 1,
        },
        {
          type: "multi-choice",
          prompt: {
            en: "A user types into the second row, then a new row is inserted at the front. Pick the 2 problems index keys can cause",
            "pt-BR":
              "Uma pessoa digita na segunda linha e depois uma nova linha é inserida no início. Escolha os 2 problemas que keys por índice podem causar",
          },
          options: [
            {
              en: "The typed value or focus can stay with the old position and appear on the wrong row",
              "pt-BR":
                "O valor digitado ou o foco pode ficar na posição antiga e aparecer na linha errada",
            },
            {
              en: "The array automatically becomes sorted alphabetically",
              "pt-BR": "O array automaticamente fica ordenado alfabeticamente",
            },
            {
              en: "React converts every input into an uncontrolled input",
              "pt-BR": "O React converte todo input em um input não controlado",
            },
            {
              en: "Component state can be associated with a different data item after positions shift",
              "pt-BR":
                "O estado do componente pode ficar associado a outro item dos dados depois que as posições mudam",
            },
          ],
          correct: [0, 3],
        },
      ],
    },
  ],
  challenge: [
    {
      type: "single-choice",
      prompt: {
        en: "What text appears in the paragraph after the props are combined?",
        "pt-BR": "Que texto aparece no parágrafo depois que as props são combinadas?",
      },
      code: 'const defaults = { children: "First", className: "muted" };\nconst element = <p {...defaults}>Second</p>;',
      options: [
        {
          en: "First, because spread props always win",
          "pt-BR": "First, porque props espalhadas sempre vencem",
        },
        {
          en: "FirstSecond, because React concatenates both values",
          "pt-BR": "FirstSecond, porque o React concatena os dois valores",
        },
        {
          en: "Second, because nested JSX supplies the final `children` value",
          "pt-BR": "Second, porque o JSX aninhado fornece o valor final de `children`",
        },
        {
          en: "Nothing, because two `children` values cause an error",
          "pt-BR": "Nada, porque dois valores de `children` causam um erro",
        },
      ],
      correct: 2,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Pick the 2 true statements about the rendered `section`",
        "pt-BR": "Escolha as 2 afirmações verdadeiras sobre a `section` renderizada",
      },
      code: "const count = 0;\nconst ready = false;\nconst element = (\n  <section>\n    {count && <b>Items</b>}\n    {ready && <i>Ready</i>}\n  </section>\n);",
      options: [
        {
          en: "The number `0` appears as text",
          "pt-BR": "O número `0` aparece como texto",
        },
        {
          en: "The word `false` appears as text",
          "pt-BR": "A palavra `false` aparece como texto",
        },
        {
          en: "The `b` element appears because `0` is a number",
          "pt-BR": "O elemento `b` aparece porque `0` é um número",
        },
        {
          en: "The `i` element does not appear",
          "pt-BR": "O elemento `i` não aparece",
        },
      ],
      correct: [0, 3],
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Override only the font size to 20 pixels while preserving the shared color",
        "pt-BR":
          "Sobrescreva somente o tamanho da fonte para 20 pixels, preservando a cor compartilhada",
      },
      code: 'const shared = { color: "red", fontSize: 12 };\nconst element = <p style={{ ...shared, ___: 20 }}>Hello</p>;',
      answer: "fontSize",
    },
    {
      type: "single-choice",
      prompt: {
        en: "What renders inside the paragraph when `text` is explicitly `null`?",
        "pt-BR": "O que renderiza dentro do parágrafo quando `text` é explicitamente `null`?",
      },
      code: 'function Label({ text = "Guest" }) {\n  return <p>{text}</p>;\n}\nconst element = <Label text={null} />;',
      options: [
        {
          en: "Guest, because every falsy prop uses the default",
          "pt-BR": "Guest, porque toda prop falsy usa o padrão",
        },
        {
          en: "Nothing; the default applies to `undefined`, and `null` renders no text",
          "pt-BR": "Nada; o padrão se aplica a `undefined`, e `null` não renderiza texto",
        },
        {
          en: "The word `null`",
          "pt-BR": "A palavra `null`",
        },
        {
          en: "A runtime error, because `null` cannot be a prop",
          "pt-BR": "Um erro em tempo de execução, porque `null` não pode ser uma prop",
        },
      ],
      correct: 1,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "After one click, pick the 2 true statements about `Rename`",
        "pt-BR": "Após um clique, escolha as 2 afirmações verdadeiras sobre `Rename`",
      },
      code: 'function Rename({ user, onRename }) {\n  return (\n    <button onClick={() => onRename({ ...user, name: "Ada" })}>\n      Rename\n    </button>\n  );\n}',
      options: [
        {
          en: "The existing `user` object is mutated",
          "pt-BR": "O objeto `user` existente é mutado",
        },
        {
          en: "The callback receives a new object with the original fields and an overridden `name`",
          "pt-BR": "O callback recebe um objeto novo com os campos originais e `name` sobrescrito",
        },
        {
          en: "The parent must decide how to handle the callback to update its own state",
          "pt-BR": "O pai precisa decidir como tratar o callback para atualizar seu próprio estado",
        },
        {
          en: "Calling `onRename` automatically changes every component's state",
          "pt-BR": "Chamar `onRename` altera automaticamente o estado de todos os componentes",
        },
      ],
      correct: [1, 2],
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Forward the content supplied between `Panel`'s opening and closing tags, using the standard React prop",
        "pt-BR":
          "Encaminhe o conteúdo fornecido entre as tags de abertura e fechamento de `Panel`, usando a prop padrão do React",
      },
      code: 'function Panel(props) {\n  return <section className="panel">{props.___}</section>;\n}\nconst element = <Panel><strong>Ada</strong></Panel>;',
      answer: "children",
    },
    {
      type: "single-choice",
      prompt: {
        en: "With `count` initially `2`, what is the final value after one click?",
        "pt-BR": "Com `count` inicialmente em `2`, qual é o valor final depois de um clique?",
      },
      code: "function handleClick() {\n  setCount(count + 3);\n  setCount(previous => previous * 2);\n  setCount(count + 1);\n}",
      options: [
        {
          en: "10",
        },
        {
          en: "6",
        },
        {
          en: "11",
        },
        {
          en: "3",
        },
      ],
      correct: 3,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "With `count` initially `4`, pick the 2 true statements about one click",
        "pt-BR":
          "Com `count` inicialmente em `4`, escolha as 2 afirmações verdadeiras sobre um clique",
      },
      code: "function handleClick() {\n  setCount(count + 1);\n  console.log(count);\n}",
      options: [
        {
          en: "The log prints `5`",
          "pt-BR": "O log imprime `5`",
        },
        {
          en: "The setter mutates the local `count` binding before the log",
          "pt-BR": "O setter muta a variável local `count` antes do log",
        },
        {
          en: "The log prints `4` from this render's snapshot",
          "pt-BR": "O log imprime `4` do snapshot desta renderização",
        },
        {
          en: "The next render receives `5` as the state",
          "pt-BR": "A próxima renderização recebe `5` como estado",
        },
      ],
      correct: [2, 3],
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Preserve the latest queued state in the second updater so the first update's new city is not lost",
        "pt-BR":
          "Preserve o estado mais recente da fila na segunda atualizadora para não perder a nova cidade da primeira atualização",
      },
      code: 'setUser(previous => ({ ...previous, city: "Recife" }));\nsetUser(previous => ({ ...___, name: "Ada" }));',
      answer: "previous",
    },
    {
      type: "single-choice",
      prompt: {
        en: "With `count` initially `1`, what value is shown after this handler finishes?",
        "pt-BR":
          "Com `count` inicialmente em `1`, qual valor aparece depois que este handler termina?",
      },
      code: "function handleClick() {\n  setCount(previous => previous + 1);\n  setCount(count + 5);\n  setCount(previous => previous * 2);\n}",
      options: [
        {
          en: "14",
        },
        {
          en: "12",
        },
        {
          en: "4",
        },
        {
          en: "7",
        },
      ],
      correct: 1,
    },
    {
      type: "single-choice",
      prompt: {
        en: "Before any click, what happens when this code runs during rendering?",
        "pt-BR":
          "Antes de qualquer clique, o que acontece quando este código roda durante a renderização?",
      },
      code: 'function save(id) {\n  console.log(id);\n}\nconst element = <button onClick={save("draft")}>Save</button>;',
      options: [
        {
          en: "The function waits until the click, then logs `draft`",
          "pt-BR": "A função espera o clique e então imprime `draft`",
        },
        {
          en: "React passes the click event as `id` immediately",
          "pt-BR": "O React passa o evento de clique como `id` imediatamente",
        },
        {
          en: "The JSX cannot compile because arguments are forbidden in attributes",
          "pt-BR": "O JSX não compila porque argumentos são proibidos em atributos",
        },
        {
          en: "It logs `draft` during rendering and passes `undefined` as the handler",
          "pt-BR": "Imprime `draft` durante a renderização e passa `undefined` como handler",
        },
      ],
      correct: 3,
    },
    {
      type: "multi-choice",
      prompt: {
        en: "Click the link once. Pick the 2 true statements; no other handlers are installed",
        "pt-BR":
          "Clique no link uma vez. Escolha as 2 afirmações verdadeiras; não há outros handlers instalados",
      },
      code: '<div onClick={() => console.log("parent")}>\n  <a href="/next" onClick={event => {\n    event.preventDefault();\n    console.log("link");\n  }}>Next</a>\n</div>',
      options: [
        {
          en: "The browser's default navigation is prevented",
          "pt-BR": "A navegação padrão do navegador é impedida",
        },
        {
          en: "The parent's handler cannot run after `preventDefault()`",
          "pt-BR": "O handler do pai não pode rodar depois de `preventDefault()`",
        },
        {
          en: "The logs are `link`, then `parent`",
          "pt-BR": "Os logs são `link` e depois `parent`",
        },
        {
          en: "The logs are `parent`, then `link`",
          "pt-BR": "Os logs são `parent` e depois `link`",
        },
      ],
      correct: [0, 2],
    },
    {
      type: "fill-blank",
      prompt: {
        en: "Stop this button's click from bubbling to the enclosing `div`, while still calling `save()`",
        "pt-BR":
          "Impeça que o clique deste botão se propague até a `div` ao redor, mantendo a chamada a `save()`",
      },
      code: '<div onClick={openPanel}>\n  <button type="button" onClick={event => {\n    event.___();\n    save();\n  }}>Save</button>\n</div>',
      answer: "stopPropagation",
    },
    {
      type: "single-choice",
      prompt: {
        en: "Which update changes the city without mutating existing objects or losing the name and postal code?",
        "pt-BR":
          "Qual atualização altera a cidade sem mutar objetos existentes nem perder o nome e o código postal?",
      },
      code: 'const [profile, setProfile] = useState({\n  name: "Ada",\n  address: { city: "Recife", postalCode: "50000" }\n});',
      options: [
        {
          en: 'profile.address.city = "Natal"; setProfile(profile);',
        },
        {
          en: 'setProfile({ ...profile, address: { city: "Natal" } });',
        },
        {
          en: 'setProfile({ ...profile, address: { ...profile.address, city: "Natal" } });',
        },
        {
          en: 'setProfile({ address: { ...profile.address, city: "Natal" } });',
        },
      ],
      correct: 2,
    },
    {
      type: "single-choice",
      prompt: {
        en: "Click the button once so its click also bubbles to the `div`. What count is shown after React processes both handlers?",
        "pt-BR":
          "Clique no botão uma vez, deixando o clique se propagar também até a `div`. Qual contagem aparece depois que o React processa os dois handlers?",
      },
      code: "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <div onClick={() => setCount(count + 1)}>\n      <button onClick={() => setCount(count + 1)}>{count}</button>\n    </div>\n  );\n}",
      options: [
        {
          en: "2, because there are two setter calls",
          "pt-BR": "2, porque há duas chamadas ao setter",
        },
        {
          en: "1, because both handlers queue the value from `0 + 1`",
          "pt-BR": "1, porque os dois handlers enfileiram o valor de `0 + 1`",
        },
        {
          en: "0, because the handlers cancel each other",
          "pt-BR": "0, porque os handlers se cancelam",
        },
        {
          en: "React throws because one click cannot update state twice",
          "pt-BR": "O React lança um erro porque um clique não pode atualizar estado duas vezes",
        },
      ],
      correct: 1,
    },
  ],
  sideQuest: {
    id: "lists-keys-extra",
    title: { en: "Long lists", "pt-BR": "Listas longas" },
    description: {
      en: "Compare windowing, pagination, and infinite scroll when thousands of DOM rows become expensive.",
      "pt-BR":
        "Compare windowing, paginação e rolagem infinita quando milhares de linhas no DOM ficam caras.",
    },
    xp: 60,
    exercises: [
      {
        type: "single-choice",
        prompt: {
          en: "A performance trace for 10,000 simple rows shows 14 ms in React's JavaScript work and 230 ms in browser style, layout, and paint. What does this measurement suggest for this screen?",
          "pt-BR":
            "Um perfil de performance para 10.000 linhas simples mostra 14 ms no trabalho JavaScript do React e 230 ms em estilo, layout e pintura do navegador. O que essa medição sugere para esta tela?",
        },
        options: [
          {
            en: "React's JavaScript work is the only cost worth reducing",
            "pt-BR": "O trabalho JavaScript do React é o único custo que vale reduzir",
          },
          {
            en: "The trace proves the DOM is always the bottleneck in every React app",
            "pt-BR": "O perfil prova que o DOM é sempre o gargalo em todo aplicativo React",
          },
          {
            en: "On this screen, keeping 10,000 DOM nodes styled, laid out, and painted costs far more than React's measured work",
            "pt-BR":
              "Nesta tela, manter 10.000 nós DOM com estilo, layout e pintura custa muito mais que o trabalho medido do React",
          },
          {
            en: "Replacing `map` with a `for` loop will remove layout and paint costs",
            "pt-BR": "Trocar `map` por um laço `for` removerá os custos de layout e pintura",
          },
        ],
        correct: 2,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Copy the window from index `start` up to, but not including, `end`, without changing `items`",
          "pt-BR": "Copie a janela do índice `start` até, sem incluir, `end`, sem alterar `items`",
        },
        code: `const visibleItems = items.___(start, end);`,
        answer: "slice",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 core ideas behind list windowing",
          "pt-BR": "Escolha as 2 ideias centrais do windowing de listas",
        },
        options: [
          {
            en: "Keep only the rows that fit in or near the viewport mounted",
            "pt-BR":
              "Mantenha montadas somente as linhas que cabem dentro ou perto da área visível",
          },
          {
            en: "Download every future page before showing the first row",
            "pt-BR": "Baixe todas as páginas futuras antes de mostrar a primeira linha",
          },
          {
            en: "Give every visible row the same position at the top",
            "pt-BR": "Dê a toda linha visível a mesma posição no topo",
          },
          {
            en: "Offset the rendered rows to the positions they would occupy in the full list",
            "pt-BR":
              "Desloque as linhas renderizadas para as posições que ocupariam na lista completa",
          },
        ],
        correct: [0, 3],
      },
      {
        type: "single-choice",
        prompt: {
          en: "Which statement correctly compares pagination and infinite scroll?",
          "pt-BR": "Qual afirmação compara corretamente paginação e rolagem infinita?",
        },
        options: [
          {
            en: "Both must keep every item ever loaded in the DOM",
            "pt-BR": "As duas precisam manter no DOM todo item já carregado",
          },
          {
            en: "Pagination exposes explicit pages; infinite scroll loads more as the user approaches the end",
            "pt-BR":
              "Paginação expõe páginas explícitas; rolagem infinita carrega mais quando a pessoa se aproxima do fim",
          },
          {
            en: "Pagination only works with static data, while infinite scroll only works with live data",
            "pt-BR":
              "Paginação só funciona com dados estáticos, enquanto rolagem infinita só funciona com dados ao vivo",
          },
          {
            en: "Infinite scroll automatically virtualizes all loaded rows",
            "pt-BR": "Rolagem infinita virtualiza automaticamente todas as linhas carregadas",
          },
        ],
        correct: 1,
      },
      {
        type: "fill-blank",
        prompt: {
          en: "Set the physical CSS offset from the top edge of the positioned container",
          "pt-BR":
            "Defina o deslocamento físico em CSS a partir da borda superior do contêiner posicionado",
        },
        code: `<div style={{ position: "absolute", ___: rowIndex * rowHeight }} />`,
        answer: "top",
      },
      {
        type: "multi-choice",
        prompt: {
          en: "Pick the 2 accessibility concerns introduced by virtualizing a long list",
          "pt-BR":
            "Escolha as 2 preocupações de acessibilidade introduzidas pela virtualização de uma lista longa",
        },
        options: [
          {
            en: "Virtualization guarantees that keyboard focus always moves to the next logical item",
            "pt-BR":
              "A virtualização garante que o foco do teclado sempre avance para o próximo item lógico",
          },
          {
            en: "Unmounted off-screen items can complicate keyboard navigation and focus restoration",
            "pt-BR":
              "Itens fora da tela e desmontados podem complicar a navegação por teclado e a restauração de foco",
          },
          {
            en: "Assistive technology may receive an incomplete or changing view of the collection unless semantics and counts are supplied carefully",
            "pt-BR":
              "Tecnologias assistivas podem receber uma visão incompleta ou mutável da coleção se semântica e contagens não forem fornecidas com cuidado",
          },
          {
            en: "Screen readers require every list to use infinite scroll",
            "pt-BR": "Leitores de tela exigem que toda lista use rolagem infinita",
          },
        ],
        correct: [1, 2],
      },
    ],
  },
};
