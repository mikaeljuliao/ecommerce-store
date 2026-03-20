<!--
================================================================================
DÚVIDA: Por que não usei o StrictMode no início do projeto?
================================================================================

No início do projeto, optei por NÃO usar o StrictMode do React, mesmo ele sendo
o padrão do template do Vite + React + TypeScript.

O StrictMode existe apenas em ambiente de desenvolvimento e serve para ajudar
a identificar problemas como:
- efeitos colaterais
- uso de APIs legadas
- padrões inseguros de código

Porém, no React 18, o StrictMode funciona de uma forma específica:
ele executa propositalmente algumas partes do código DUAS VEZES em desenvolvimento.

Isso inclui:
- useEffect
- inicializações de estado
- algumas lógicas internas
- possíveis chamadas de API

Isso NÃO é bug, é comportamento intencional do React.

O problema é que, no início do projeto, isso atrapalha o aprendizado e o debug,
principalmente quando estamos lidando com:
- reducers
- regras de negócio (carrinho)
- chamadas de API
- localStorage

Exemplos de confusão que podem acontecer:
- A API parece estar sendo chamada duas vezes
- Um item pode parecer duplicado no carrinho
- Um efeito parece "quebrado", quando na verdade é o StrictMode

Como o foco inicial do projeto é:
- entender a lógica
- modelar bem os tipos com TypeScript
- construir a arquitetura corretamente

o StrictMode foi desativado temporariamente.

Importante: isso NÃO significa que o StrictMode é ruim ou não será usado.
Ele pode (e deve) ser reativado depois, quando a lógica estiver sólida
e o comportamento da aplicação estiver bem entendido.

================================================================================
RESUMO:
- StrictMode roda código duas vezes em dev
- Isso pode gerar confusão no início
- Foi desativado conscientemente
- Pode ser reativado mais tarde
================================================================================
-->



<!--
================================================================================
DÚVIDA: Por que validar o container antes de usar createRoot?
================================================================================

Ao montar a aplicação React, usamos esse código:

const container = document.getElementById('root')

O método getElementById pode retornar dois valores:
- um elemento HTML (HTMLElement)
- ou null, caso o elemento não exista

Ou seja, para o TypeScript, o tipo de container é:
HTMLElement | null

O problema é que o React NÃO aceita null no createRoot.
Ele exige um elemento HTML válido.

Se passarmos null, a aplicação pode:
- quebrar
- não renderizar nada
- gerar erro difícil de entender

Por isso, fazemos a verificação:

if (!container) {
  throw new Error('Root container missing')
}

Essa verificação serve para:
- garantir que o elemento realmente existe
- interromper a aplicação imediatamente se algo estiver errado
- mostrar um erro claro no console

Isso é muito melhor do que deixar a aplicação falhar silenciosamente.

================================================================================
IMPORTANTE PARA O TYPESCRIPT
================================================================================

Depois desse if, o TypeScript entende automaticamente que:
- se o código chegou aqui
- então container NÃO é null

Isso se chama "type narrowing" (estreitamento de tipo).

Antes do if:
HTMLElement | null

Depois do if:
HTMLElement

Isso elimina a necessidade de usar o operador ! (non-null assertion).

================================================================================
COMPARAÇÃO COM O OPERADOR !
================================================================================

Forma mais comum (menos segura):

createRoot(document.getElementById('root')!).render(...)

O ! basicamente diz:
"confia em mim, isso nunca será null"

O problema:
- se for null, o erro acontece do mesmo jeito
- o TypeScript deixa de proteger
- o código fica menos seguro

Forma usada no projeto (mais profissional):

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root container missing')
}

createRoot(container).render(...)

Essa abordagem:
- é mais explícita
- é mais segura
- mostra maturidade técnica
- facilita debug
- mantém o TypeScript trabalhando a favor

================================================================================
ANALOGIA SIMPLES
================================================================================

É como tentar usar dinheiro sem saber se ele existe:

Errado:
comprarAlgo(dinheiro!)

Correto:
if (!dinheiro) {
  throw new Error('Sem saldo')
}

comprarAlgo(dinheiro)

================================================================================
RESUMO FINAL
================================================================================

- getElementById pode retornar null
- React não aceita null no createRoot
- O if garante segurança
- O erro fica explícito
- Evita uso desnecessário do !
- Código mais profissional e confiável
================================================================================
-->









<!--
================================================================================
TAILWIND CSS — PROCESSO COMPLETO DE INSTALAÇÃO (VERSÃO 3)
================================================================================

Este projeto utiliza Tailwind CSS na versão 3 de forma consciente e intencional.

A versão mais recente (v4) apresentou dificuldades de setup no ambiente com Vite,
principalmente relacionadas à geração automática de arquivos de configuração
e integração com o bundler.

Como o foco do projeto é aprendizado, clareza e estabilidade,
a versão 3 foi escolhida por ser:
- amplamente utilizada no mercado
- bem documentada
- estável
- previsível

================================================================================
PASSO 1 — REMOÇÃO DO TAILWIND (CASO JÁ EXISTA)
================================================================================

Antes de instalar o Tailwind v3, é importante remover qualquer resíduo
de instalações anteriores para evitar conflitos de versão.

Comandos utilizados:

npm uninstall tailwindcss postcss autoprefixer

Após isso, verificar e remover manualmente, se existirem:
- tailwind.config.js
- postcss.config.js

Isso garante um ambiente limpo para a nova instalação.

================================================================================
PASSO 2 — INSTALAÇÃO DO TAILWIND CSS v3
================================================================================

Instalação explícita da versão 3:

npm install -D tailwindcss@3 postcss autoprefixer

Após a instalação, gerar os arquivos de configuração:

npx tailwindcss init -p

Esse comando cria automaticamente:
- tailwind.config.js
- postcss.config.js

================================================================================
PASSO 3 — CONFIGURAÇÃO DO tailwind.config.js
================================================================================

Na versão 3 do Tailwind, o arquivo de configuração utiliza CommonJS.
Por isso, é obrigatório usar module.exports.

Conteúdo final do arquivo:

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

O campo "content" informa ao Tailwind onde procurar as classes
para gerar os estilos corretamente.

================================================================================
PASSO 4 — CONFIGURAÇÃO DO CSS GLOBAL
================================================================================

No arquivo src/index.css, foram adicionadas as diretivas do Tailwind:

@tailwind base;
@tailwind components;
@tailwind utilities;

Esse arquivo é importado no main.tsx, garantindo que os estilos
sejam aplicados globalmente na aplicação.

================================================================================
PASSO 5 — TESTE DE FUNCIONAMENTO
================================================================================

Para confirmar que o Tailwind está funcionando corretamente,
foi aplicado um layout simples no componente principal da aplicação.

Exemplo utilizado no App.tsx:

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">
        Tailwind v3 funcionando
      </h1>
    </div>
  )
}

export default App

Se o fundo aparecer escuro, o texto branco e centralizado,
significa que o Tailwind está configurado corretamente.

================================================================================
CONCLUSÃO
================================================================================

A escolha pelo Tailwind CSS v3 não representa atraso tecnológico,
mas sim uma decisão técnica consciente para manter o foco no aprendizado,
evitar problemas de setup e garantir produtividade.

Versões mais novas podem ser avaliadas futuramente,
quando a base do projeto estiver sólida.

================================================================================
-->






















<!--
===========================================
ANOTAÇÃO IMPORTANTE — TYPESCRIPT + RUNTIME
===========================================

Essa foi, de longe, a parte MAIS CONFUSA do início do projeto.
Quase desisti aqui, então estou documentando com bastante detalhe
pra nunca mais passar por isso.

-------------------------------------------
1️⃣ O QUE SIGNIFICA "EXISTIR EM RUNTIME"?
-------------------------------------------

"Runtime" é o MOMENTO em que o JavaScript está rodando de verdade,
ou seja:

- Quando o navegador abre a aplicação
- Quando o código já virou JavaScript
- Quando NÃO EXISTE mais TypeScript

👉 Runtime = código final executando no navegador.

-------------------------------------------
2️⃣ TYPESCRIPT NÃO EXISTE EM RUNTIME
-------------------------------------------

TypeScript é só uma CAMADA DE DESENVOLVIMENTO.

Antes de rodar no navegador:
- O TypeScript é COMPILADO
- Interfaces e types SÃO APAGADOS
- Só sobra JavaScript

Exemplo:

interface Product {
  id: number
  title: string
}

⬇️ Depois da compilação ⬇️

(NADA)

Isso simplesmente NÃO EXISTE mais.

Ou seja:
❌ Interface NÃO vira variável
❌ Interface NÃO vira objeto
❌ Interface NÃO existe no JavaScript final

Ela só serve para:
- ajudar o editor
- evitar erros
- dar segurança de tipo

-------------------------------------------
3️⃣ O ERRO QUE ACONTECEU NO PROJETO
-------------------------------------------

Eu estava importando a interface assim:

import { Product } from '../types/Product'

Isso faz o bundler (Vite) pensar:

"Ok, então em runtime vai existir algo chamado Product"

MAS NÃO EXISTE.

Resultado:
- O Vite tenta encontrar Product no JavaScript
- Não acha nada
- A aplicação quebra

-------------------------------------------
4️⃣ POR QUE ISSO ACONTECE EM PROJETOS MODERNOS?
-------------------------------------------

Meu projeto usa configurações modernas, como:

- Vite
- TypeScript strict
- moduleResolution: "bundler"
- verbatimModuleSyntax: true

Essas configs são MAIS RÍGIDAS de propósito.

Elas obrigam o dev a deixar claro:
- o que é TYPE (só TS)
- o que é VALUE (existe em runtime)

-------------------------------------------
5️⃣ A SOLUÇÃO CORRETA (IMPORTANTE)
-------------------------------------------

Sempre que importar APENAS tipos ou interfaces,
PRECISO usar:

import type { Product } from '../types/Product'

Isso diz claramente:

"Isso aqui é SÓ PARA O TYPESCRIPT.
NÃO tente usar isso no JavaScript final."

Assim:
✅ O TypeScript entende
✅ O Vite não tenta resolver em runtime
✅ O erro some

-------------------------------------------
6️⃣ REGRA DE OURO PRA NUNCA MAIS ERRAR
-------------------------------------------

🧠 REGRA SIMPLES:

- Interface / type → import type
- Função / componente / variável → import normal

Exemplos:

✔ import type { Product } from '../types/Product'
✔ import { getAllProducts } from '../services/products'
✔ import { useState, useEffect } from 'react'

-->




















<!--
=====================================================================
ANOTAÇÃO DEFINITIVA — SERVICE DE PRODUTOS (API + ASYNC + TYPESCRIPT)
=====================================================================

Essa parte do projeto foi uma das mais difíceis de entender.
Não foi falta de capacidade: envolve conceitos FUNDAMENTAIS de
JavaScript assíncrono + TypeScript moderno + arquitetura de projeto.

Este arquivo NÃO é um componente React.
Ele NÃO renderiza nada na tela.
Ele existe apenas para BUSCAR DADOS.

Arquivo:
src/services/products.ts

---------------------------------------------------------------------
1️⃣ O QUE É ESSE ARQUIVO (IMPORTANTE)
---------------------------------------------------------------------

Esse arquivo é um SERVICE.

Service é uma camada responsável APENAS por:
- buscar dados
- tratar erros
- garantir tipos

Ele NÃO:
- renderiza UI
- usa JSX
- conhece estado do React

React apenas CONSOME esse service.
Isso é separação de responsabilidades (padrão profissional).

---------------------------------------------------------------------
2️⃣ POR QUE IMPORTAMOS A INTERFACE Product?
---------------------------------------------------------------------

import type { Product } from '../types/Product'

A interface Product é um CONTRATO de dados.

Ela define exatamente como um produto deve ser:
- id
- title
- price
- description
- category
- image

Isso NÃO é visual.
Isso NÃO é componente.
Isso NÃO existe em runtime.

Serve para:
- evitar erro de digitação
- evitar erro de tipo
- detectar problemas ANTES de rodar o app

Por isso usamos:
import type → deixando claro que é SÓ TypeScript.

---------------------------------------------------------------------
3️⃣ O QUE É ESSA API_URL?
---------------------------------------------------------------------

const API_URL = 'https://fakestoreapi.com/products'

Isso é o ENDEREÇO de onde os dados vêm.

É uma API (Application Programming Interface):
- um servidor externo
- que devolve dados
- no formato JSON

Não é banco local.
Não é mock.
É uma API REST real.

---------------------------------------------------------------------
4️⃣ O QUE SIGNIFICA "async" E POR QUE USAR?
---------------------------------------------------------------------

export async function getAllProducts(): Promise<Product[]> {

Buscar dados da internet NÃO acontece na hora.
Pode:
- demorar
- falhar
- não responder

O JavaScript roda em uma única fila.
Se ele travar esperando a internet, o app congela.

async significa:
"Essa função começa agora, mas termina depois.
Não trave o resto da aplicação esperando."

Sem async:
❌ tela travaria
❌ app congelaria
❌ péssima UX

Com async:
✅ código continua rodando
✅ UI não trava
✅ experiência fluida

---------------------------------------------------------------------
5️⃣ O QUE É Promise<Product[]>?
---------------------------------------------------------------------

Promise significa PROMESSA.

Essa função NÃO retorna os produtos agora.
Ela retorna uma promessa dizendo:

"Quando tudo terminar, eu te entrego um array de Product."

Ou seja:
- agora → Promise
- depois → Product[]

Isso é obrigatório em funções async,
porque os dados ainda NÃO EXISTEM no momento da chamada.

Projeto real NÃO funciona sem Promise.

---------------------------------------------------------------------
6️⃣ O QUE É fetch?
---------------------------------------------------------------------

const response = await fetch(API_URL)

fetch é a função nativa do JavaScript para:
- fazer requisições HTTP
- buscar dados de APIs

Ele:
- vai até a URL
- pede os dados
- aguarda resposta

fetch SEMPRE retorna uma resposta se o servidor respondeu,
mesmo quando essa resposta é um erro.

---------------------------------------------------------------------
7️⃣ O QUE É await?
---------------------------------------------------------------------

await significa:
"Espere isso terminar antes de continuar."

Sem await:
- o código continuaria sem dados
- tudo quebraria

await fetch(...) =
espera a API responder antes de seguir.

---------------------------------------------------------------------
8️⃣ O QUE É response?
---------------------------------------------------------------------

response é o OBJETO de resposta do servidor.

Ele contém:
- status (200, 404, 500, etc)
- headers
- corpo da resposta (ainda não convertido)

Importante:
response NÃO são os dados ainda.
response SEMPRE existe se o servidor respondeu.

---------------------------------------------------------------------
9️⃣ O QUE SÃO OS CÓDIGOS HTTP (200, 404, ETC)?
---------------------------------------------------------------------

Esses números indicam o resultado da requisição:

200–299 → sucesso
300–399 → redirecionamento
400–499 → erro do cliente
500–599 → erro do servidor

Isso é padrão da web, não do React.

---------------------------------------------------------------------
🔟 O QUE É response.ok?
---------------------------------------------------------------------

response.ok é um BOOLEAN (true ou false)
calculado automaticamente pelo navegador.

Funciona assim:
- status entre 200 e 299 → ok = true
- qualquer outro status → ok = false

Ou seja:
response.ok é um RESUMO do status HTTP.

---------------------------------------------------------------------
1️⃣1️⃣ O QUE SIGNIFICA if (!response.ok)?
---------------------------------------------------------------------

O ! significa "NÃO".

if (!response.ok) significa:
"Se a resposta NÃO foi bem-sucedida"

Isso NÃO quer dizer que response não existe.
Quer dizer:
- o servidor respondeu
- mas respondeu com erro (404, 500, etc)

Por isso NÃO usamos if (!response).

---------------------------------------------------------------------
1️⃣2️⃣ O QUE É throw new Error?
---------------------------------------------------------------------

throw significa "lançar um erro".

throw new Error('mensagem'):

- interrompe a execução da função
- impede uso de dados inválidos
- avisa quem chamou que algo deu errado

Isso NÃO quebra o app sozinho.
O erro pode (e deve) ser tratado depois.

É a forma correta de tratar erro.

---------------------------------------------------------------------
1️⃣3️⃣ O QUE É response.json()?
---------------------------------------------------------------------

A API devolve TEXTO em formato JSON.

response.json():
- converte esse texto
- em um objeto JavaScript

Essa conversão também demora,
por isso usamos await.

---------------------------------------------------------------------
1️⃣4️⃣ O QUE É 'as Product[]'?
---------------------------------------------------------------------

'as' é do TypeScript, NÃO do JavaScript.

Ele significa:
"Confia em mim, isso tem esse formato."

as Product[] é uma AFIRMAÇÃO de tipo.

Importante:
- NÃO valida dados
- NÃO altera runtime
- NÃO cria objeto

Serve apenas para ensinar o TypeScript.

---------------------------------------------------------------------
1️⃣5️⃣ POR QUE USAR 'as Product[]'?
---------------------------------------------------------------------

O TypeScript NÃO sabe o que vem da internet.
Ele não confia automaticamente.

Sem 'as':
- o TS não permite acessar propriedades
- gera erros de tipagem

Com 'as Product[]':
- o TS confia
- libera autocomplete
- evita erros futuros

---------------------------------------------------------------------
1️⃣6️⃣ POR QUE USAR PARÊNTESES?
---------------------------------------------------------------------

(await response.json()) as Product[]

Significa:
1. espera o JSON
2. depois aplica o tipo

Os parênteses evitam ambiguidade de sintaxe.

---------------------------------------------------------------------
1️⃣7️⃣ CONCLUSÃO FINAL (IMPORTANTE)
---------------------------------------------------------------------

Esse arquivo NÃO é React.
Ele é uma camada de serviço.

Ele existe para:
✔ buscar dados
✔ tratar erros
✔ garantir tipos
✔ manter o código organizado

Entender isso foi difícil,
mas é conhecimento FUNDAMENTAL
para projetos reais com TypeScript.
-->













<!--
===========================================================
ANOTAÇÃO COMPLETA — COMPONENTE HOME (PASSO A PASSO)
===========================================================

Arquivo:
src/pages/Home.tsx

Esse arquivo É um componente React.
Ele NÃO é service.
Ele NÃO busca dados direto da API.
Ele é responsável APENAS por:

✔ pedir os dados para a camada de service
✔ controlar estados da interface (UI)
✔ decidir O QUE aparece na tela e QUANDO

Se algo der errado aqui, NÃO é problema de API,
é problema de lógica de estado ou renderização.

-----------------------------------------------------------
1️⃣ IMPORTAÇÕES — O QUE CADA COISA FAZ DE VERDADE
-----------------------------------------------------------

import { useEffect, useState } from 'react'

- useState:
  serve para criar estados que controlam a interface.
  Quando um estado muda, o componente inteiro roda de novo.

- useEffect:
  serve para rodar código em momentos específicos do ciclo de vida.
  Aqui ele roda QUANDO o componente aparece na tela.

----------------------------------------

import type { Product } from '../types/Product'

- Product é uma INTERFACE
- interface NÃO existe em runtime
- ela serve apenas para o TypeScript verificar tipos

Ela NÃO é componente.
Ela NÃO renderiza nada.
Ela é só um CONTRATO dizendo:
"um produto precisa ter essas propriedades".

----------------------------------------

import { getAllProducts } from '../services/products'

- Essa função vem da camada de service.
- Ela é responsável por:
  ✔ buscar dados
  ✔ lidar com async
  ✔ lidar com erro de API

O React NÃO sabe como os dados são buscados.
Isso é arquitetura correta.

-----------------------------------------------------------
2️⃣ DEFINIÇÃO DO COMPONENTE
-----------------------------------------------------------

export function Home() {

Esse é um componente funcional React.
Tudo dentro dele é executado:

✔ no primeiro render
✔ em todo re-render causado por mudança de estado

IMPORTANTE:
React não executa linha por linha "uma vez".
Ele REEXECUTA o componente inteiro sempre que um estado muda.

-----------------------------------------------------------
3️⃣ ESTADOS — ESSA É A PARTE MAIS IMPORTANTE
-----------------------------------------------------------

const [products, setProducts] = useState<Product[]>([])

- products guarda os produtos vindos da API.
- começa como array vazio porque:
  no primeiro render, ainda não buscamos nada.

Isso NÃO significa erro.
Isso significa "ainda não chegou".

----------------------------------------

const [loading, setLoading] = useState(true)

ESSA PARTE É CRÍTICA.

loading NÃO é algo automático.
loading NÃO vem da API.
loading NÃO vem do React.

loading é uma DECISÃO DE LÓGICA.

true significa:
"enquanto isso for true, a interface deve mostrar carregamento".

Não existe nada mágico aqui.
É só um boolean controlando o fluxo da UI.

----------------------------------------

const [error, setError] = useState<string | null>(null)

- error começa como null (nenhum erro).
- se virar string, significa que houve erro.
- essa string será exibida na tela.

-----------------------------------------------------------
4️⃣ useEffect — QUANDO O CÓDIGO RODA
-----------------------------------------------------------

useEffect(() => {

Esse useEffect roda:
✔ uma única vez
✔ quando o componente aparece na tela

Isso acontece porque o array de dependências é [].

----------------------------------------

O useEffect NÃO pode ser async diretamente.
Por isso criamos uma função async dentro dele.

-----------------------------------------------------------
5️⃣ FUNÇÃO loadProducts — O FLUXO REAL
-----------------------------------------------------------

async function loadProducts() {

Essa função existe para:
✔ buscar os dados
✔ tratar erro
✔ controlar loading

Ela NÃO renderiza nada.
Ela só mexe em estado.

----------------------------------------
try {
----------------------------------------

const data = await getAllProducts()

- getAllProducts retorna uma Promise<Product[]>
- await faz o JavaScript esperar essa Promise resolver
- quando resolve, data vira Product[]

----------------------------------------

setProducts(data)

- isso atualiza o estado products
- setState causa RE-RENDER
- o componente Home vai rodar de novo

----------------------------------------
catch (err) {
----------------------------------------

IMPORTANTE:
err é o ERRO que aconteceu.

Esse err:
- vem do throw new Error no service
- é passado automaticamente pelo JavaScript

Mesmo que eu não use err diretamente,
ele PRECISA existir para capturar o erro.

Aqui foi uma decisão consciente:
não mostrar erro técnico ao usuário,
apenas uma mensagem genérica.

----------------------------------------

setError('Erro ao carregar produtos')

- define que houve erro
- ativa renderização condicional de erro

----------------------------------------
finally {
----------------------------------------

setLoading(false)

finally SEMPRE roda:
✔ se deu certo
✔ se deu erro
✔ se algo inesperado aconteceu

Aqui é onde dizemos:
"não estou mais carregando".

-----------------------------------------------------------
6️⃣ CHAMADA DA FUNÇÃO
-----------------------------------------------------------

loadProducts()

Se eu não chamar essa função,
NADA acontece.

Declarar função ≠ executar função.

-----------------------------------------------------------
7️⃣ RENDERIZAÇÃO CONDICIONAL — COMO FUNCIONA DE VERDADE
-----------------------------------------------------------

IMPORTANTE:
React lê o código de CIMA PARA BAIXO.
Quando encontra um return, ele PARA.

----------------------------------------
PRIORIDADE 1 — LOADING
----------------------------------------

if (loading) {
  return <p>Carregando...</p>
}

Isso NÃO é especial.
Isso NÃO é React avançado.
Isso é JavaScript puro.

Enquanto loading = true:
- o componente retorna aqui
- nada abaixo é executado
- produtos e erro NÃO existem na UI

----------------------------------------
PRIORIDADE 2 — ERRO
----------------------------------------

if (error) {
  return <p>{error}</p>
}

Esse bloco só é avaliado se loading for false.

Se error tiver valor:
- renderiza erro
- encerra o componente aqui

----------------------------------------
PRIORIDADE 3 — SUCESSO
----------------------------------------

Se chegou aqui:
✔ loading é false
✔ error é null
✔ products tem dados

Agora sim renderizamos os produtos.

-----------------------------------------------------------
8️⃣ RENDERIZAÇÃO DOS PRODUTOS
-----------------------------------------------------------

{products.map(product => (

- map percorre o array products
- product é um Product (tipado)
- React exige uma key única

----------------------------------------

key={product.id}

- evita bugs de renderização
- melhora performance
- é obrigatório em listas

----------------------------------------

<img src={product.image} />

- imagem vem da API
- já validada e tipada

----------------------------------------

{product.title}
{product.price}

Nada disso seria possível se:
- loading não fosse controlado
- erro não fosse tratado
- estados não fossem bem definidos

-----------------------------------------------------------
9️⃣ RESUMO FINAL PRA EU DO FUTURO
-----------------------------------------------------------

Esse componente NÃO é simples,
mas ele segue lógica clara.

✔ React NÃO busca dados
✔ estados controlam tudo
✔ loading é só um boolean
✔ erro é só um estado
✔ a ordem dos if define prioridade
✔ return encerra renderização

Se eu travar aqui de novo:
👉 lembrar que React só reage a estado
👉 lembrar que setState causa re-render
👉 lembrar que não existe mágica
👉 lembrar que EU controlo o fluxo







-->

























<!--
=====================================================
ANOTAÇÃO COMPLETA — BASE LAYOUT, CHILDREN E TIPAGEM
=====================================================

Essa anotação existe para EU NO FUTURO entender:
- por que foi criado o BaseLayout
- por que usei children
- por que usei interface
- por que isso NÃO é exagero
- e por que essa estrutura faz sentido em projeto real

Essa parte CONFUNDE MESMO no começo.
Não é óbvia.
Então a explicação precisa ser completa.

-----------------------------------------------------
1️⃣ O QUE É import type { ReactNode } from 'react'
-----------------------------------------------------

ReactNode é APENAS um tipo do TypeScript.
Ele NÃO existe quando a aplicação está rodando (runtime).

ReactNode representa:
- qualquer coisa que o React consegue renderizar
- JSX (<div>, <Component />)
- texto
- número
- null
- arrays de JSX

Por isso uso:
import type { ReactNode } from 'react'

Isso diz claramente:
"isso aqui é só tipagem, não é código real".

Se eu importar sem 'type', o ESLint reclama,
porque ele tenta achar isso no JavaScript final,
mas ReactNode NÃO existe em runtime.

-----------------------------------------------------
2️⃣ O QUE É children NO REACT
-----------------------------------------------------

children NÃO é algo que eu criei.
children é um comportamento padrão do React.

Tudo que eu coloco ENTRE as tags de um componente:

<BaseLayout>
  <Home />
</BaseLayout>

Automaticamente vira:

props.children = <Home />

Ou seja:
children é simplesmente o CONTEÚDO INTERNO do componente.

-----------------------------------------------------
3️⃣ O QUE É A INTERFACE BaseLayoutProps
-----------------------------------------------------

interface BaseLayoutProps {
  children: ReactNode
}

Essa interface é um CONTRATO.

Ela diz:
"Se alguém usar o BaseLayout,
é OBRIGATÓRIO passar children,
e esse children precisa ser algo renderizável."

A interface NÃO cria props.
A interface NÃO passa valores.
Ela só serve para o TypeScript validar.

-----------------------------------------------------
4️⃣ O QUE SIGNIFICA ESSA SINTAXE ESTRANHA
-----------------------------------------------------

export function BaseLayout({ children }: BaseLayoutProps)

Isso mistura DUAS coisas diferentes:

1) JavaScript → desestruturação
2) TypeScript → tipagem

-----------------------------------------------------
5️⃣ QUEBRANDO ESSA LINHA EM PARTES
-----------------------------------------------------

Parte 1 — { children }

Isso é desestruturação.
Significa:
"pegue a propriedade children de props".

É o mesmo que:
props.children

Parte 2 — : BaseLayoutProps

Isso é TypeScript dizendo:
"as props desse componente precisam seguir essa interface".

Ou seja:
- precisa existir children
- children precisa ser ReactNode

Juntando tudo:
"Recebo props, valido com BaseLayoutProps e uso só o children".

-----------------------------------------------------
6️⃣ CHILDREN DA INTERFACE E CHILDREN DO COMPONENTE
-----------------------------------------------------

Eles NÃO são diferentes.

São a MESMA coisa vista em momentos diferentes:

- Interface → define a regra
- Função → recebe o valor
- JSX → renderiza

Tudo aponta para o mesmo children.

-----------------------------------------------------
7️⃣ POR QUE NÃO USAR props.children DIRETO?
-----------------------------------------------------

Eu poderia escrever assim:

export function BaseLayout(props: BaseLayoutProps) {
  return <main>{props.children}</main>
}

Isso FUNCIONA 100%.

A versão com:
({ children }: BaseLayoutProps)

é:
- mais limpa
- mais legível
- mais comum no mercado

Por isso deixei assim.

-----------------------------------------------------
8️⃣ O QUE ACONTECE NO RETURN
-----------------------------------------------------

<main>
  {children}
</main>

Isso significa:
"Renderize aqui dentro tudo que veio de fora".

Se eu fizer:

<BaseLayout>
  <Home />
</BaseLayout>

O resultado final será:

<header />
<main>
  <Home />
</main>
<footer />

O layout define a ESTRUTURA.
A página define o CONTEÚDO.

-----------------------------------------------------
9️⃣ O PROBLEMA DA SOLUÇÃO “FÁCIL”
-----------------------------------------------------

Existe uma forma mais simples de fazer isso,
que seria colocar tudo direto no App.tsx:

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  )
}

Isso FUNCIONA.
Não tem erro técnico nenhum.

Se o projeto fosse pequeno,
ou tivesse só uma página,
isso já resolveria.

-----------------------------------------------------
🔟 ONDE A SOLUÇÃO FÁCIL COMEÇA A DAR PROBLEMA
-----------------------------------------------------

O problema aparece quando o projeto cresce.

Hoje existe apenas a Home,
mas amanhã podem existir páginas como:

- /produto/:id
- /login
- /checkout

Todas essas páginas precisam:
- Header
- Footer
- SEO
- <main>

Se eu usar a solução fácil,
vou precisar copiar e colar essa estrutura
ou deixar o App.tsx gigante e confuso.

Isso gera:
- código duplicado
- manutenção difícil
- mais chance de erro no futuro

-----------------------------------------------------
1️⃣1️⃣ O QUE O BaseLayout RESOLVE DE VERDADE
-----------------------------------------------------

O BaseLayout resolve problemas REAIS de arquitetura.

Com BaseLayout:

<BaseLayout>
  <Home />
</BaseLayout>

Depois:

<BaseLayout>
  <ProductPage />
</BaseLayout>

Depois:

<BaseLayout>
  <Checkout />
</BaseLayout>

➡️ A estrutura é sempre a mesma
➡️ Só o conteúdo muda
➡️ Nenhuma repetição de Header, Main e Footer

-----------------------------------------------------
1️⃣2️⃣ CONCLUSÃO PRA EU NO FUTURO
-----------------------------------------------------

A solução fácil resolve o AGORA.
O BaseLayout resolve o FUTURO.

Ele existe para:
- reaproveitar estrutura
- manter o código organizado
- facilitar manutenção
- garantir semântica e SEO
- permitir crescimento sem bagunça

Por isso faz sentido usar:
- children
- interface
- ReactNode
- import type

Mesmo parecendo mais código no começo.

-----------------------------------------------------
1️⃣3️⃣ REGRA DE OURO PRA NÃO ESQUECER
-----------------------------------------------------

- children = conteúdo interno
- ReactNode = tudo que pode ser renderizado
- interface = contrato
- import type = só tipagem
- BaseLayout = estrutura fixa
- páginas = conteúdo variável

Se eu estiver confuso no futuro,
lembra disso:

"Layout envolve páginas,
páginas NÃO envolvem layout."
-->


































<!--
===========================================================
ANOTAÇÃO COMPLETA — useParams, ROTAS DINÂMICAS E ID NA URL
===========================================================

Essa anotação existe para EU NO FUTURO entender:
- o que é useParams
- por que ele existe
- como ele funciona
- por que usamos {} na const
- como o id aparece sem buscar dados
- e como isso se conecta com API depois

Nada aqui é mágico.
Tudo é fluxo.

-----------------------------------------------------------
1️⃣ O QUE É useParams
-----------------------------------------------------------

useParams é um HOOK do react-router-dom.

Ele serve para:
👉 LER parâmetros dinâmicos da URL

Parâmetro dinâmico = parte variável da rota.

Exemplo de rota:

<Route path="/produto/:id" element={<Product />} />

Aqui:
- :id é um parâmetro
- o valor real vem da URL

Se a URL for:
http://localhost:5173/produto/3

Então:
id = "3"

Quem faz essa leitura automaticamente é o useParams.

-----------------------------------------------------------
2️⃣ O QUE useParams RETORNA
-----------------------------------------------------------

useParams SEMPRE retorna um OBJETO.

Exemplo real:

useParams()

retorna algo assim:

{
  id: "3"
}

📌 Importante:
- Tudo vem como STRING
- Mesmo se o ID for um número

-----------------------------------------------------------
3️⃣ POR QUE USAMOS { id } = useParams()
-----------------------------------------------------------

Essa linha junta dois conceitos:

const { id } = useParams()

Vamos separar.

Primeiro, sem desestruturação:

const params = useParams()
const id = params.id

Agora, com desestruturação (forma curta):

const { id } = useParams()

Isso é JavaScript puro.
Não é React.
Não é TypeScript.

Significa:
👉 "pegue a propriedade id de dentro do objeto retornado"

-----------------------------------------------------------
4️⃣ POR QUE USAMOS CONST
-----------------------------------------------------------

Usamos const porque:
- o valor vem da URL
- não muda durante o render
- é só leitura

Não faz sentido usar let aqui.

-----------------------------------------------------------
5️⃣ DE ONDE VEM ESSE ID?
-----------------------------------------------------------

O id NÃO vem de um objeto produto.
O id NÃO vem da API.
O id NÃO vem do Home.

Ele vem EXCLUSIVAMENTE da URL.

Fluxo real:

URL → React Router → useParams → id

Exemplo:

/produto/3
↓
useParams()
↓
{ id: "3" }

-----------------------------------------------------------
6️⃣ POR QUE NÃO USAMOS product.id AQUI?
-----------------------------------------------------------

Na Home:
- você já tem os produtos
- você já tem os dados
- você faz map(product)

Na página de Produto:
- você NÃO tem dados ainda
- você só sabe QUAL produto quer
- você só tem o ID

Ou seja:
product ainda NÃO existe.

Primeiro:
- pega o ID da URL

Depois (próximo passo):
- usa o ID para buscar o produto na API

-----------------------------------------------------------
7️⃣ EXEMPLO SIMPLES DE USO ATUAL
-----------------------------------------------------------

Página de Produto simples:

import { useParams } from 'react-router-dom'

export function Product() {
  const { id } = useParams()

  return (
    <div>
      <h1>Página de Produto</h1>
      <p>ID do produto: {id}</p>
    </div>
  )
}

Isso NÃO busca dados.
Isso só prova que a rota dinâmica funciona.

-----------------------------------------------------------
8️⃣ EXEMPLO COM MAIS DE UM PARÂMETRO
-----------------------------------------------------------

Rota:

<Route path="/categoria/:categoriaId/produto/:id" element={<Product />} />

URL:
http://localhost:5173/categoria/10/produto/3

useParams retorna:

{
  categoriaId: "10",
  id: "3"
}

Uso:

const { categoriaId, id } = useParams()

-----------------------------------------------------------
9️⃣ EXEMPLO COM OUTRA IDEIA (USUÁRIO)
-----------------------------------------------------------

Rota:

<Route path="/usuario/:username" element={<User />} />

URL:
http://localhost:5173/usuario/mikael

useParams retorna:

{
  username: "mikael"
}

Uso:

const { username } = useParams()

-----------------------------------------------------------
🔟 EXEMPLO SEM DESESTRUTURAÇÃO (FORMA LONGA)
-----------------------------------------------------------

Você também pode fazer assim:

const params = useParams()

return (
  <p>ID: {params.id}</p>
)

Funciona igual.
Só é menos usado.

-----------------------------------------------------------
1️⃣1️⃣ O QUE useParams NÃO FAZ
-----------------------------------------------------------

useParams NÃO:
- busca dados
- chama API
- valida ID
- converte string em número

Ele APENAS lê a URL.

-----------------------------------------------------------
1️⃣2️⃣ CONEXÃO COM API (PRÓXIMO PASSO)
-----------------------------------------------------------

Fluxo completo profissional:

1️⃣ URL contém o ID
2️⃣ useParams lê o ID
3️⃣ useEffect usa o ID
4️⃣ API é chamada com esse ID
5️⃣ product é carregado
6️⃣ página renderiza dados reais

Exemplo futuro:

const { id } = useParams()

useEffect(() => {
  fetch(`/api/products/${id}`)
}, [id])

-----------------------------------------------------------
1️⃣3️⃣ REGRA DE OURO PRA NÃO CONFUNDIR
-----------------------------------------------------------

- useParams → lê URL
- id → vem da rota
- product → vem da API
- Home → lista
- Product → detalhe

Se eu só tenho o ID:
👉 ainda não tenho dados

-----------------------------------------------------------
1️⃣4️⃣ FRASE PRA EU LEMBRAR NO FUTURO
-----------------------------------------------------------

"A URL me diz QUEM eu quero.
A API me diz O QUE ele é."

===========================================================
FIM DA ANOTAÇÃO
===========================================================
-->

































<!--

=====================================================
ANOTAÇÃO COMPLETA — PÁGINA DE PRODUTO (Product.tsx)
=====================================================

Essa anotação documenta TODO o raciocínio por trás
da página de detalhes do produto.

Ela existe para:
- eu entender TypeScript no React
- não copiar código sem entender
- lembrar por que cada coisa existe
- evitar erros comuns no futuro

-----------------------------------------------------
1️⃣ O QUE ESSE COMPONENTE FAZ
-----------------------------------------------------

Esse componente representa a página:

/produto/:id

Exemplo de URL:
http://localhost:5173/produto/3

Ele:
- lê o ID da URL
- busca o produto pelo ID
- controla loading e erro
- exibe os dados do produto

-----------------------------------------------------
2️⃣ IMPORTS — O QUE CADA UM FAZ
-----------------------------------------------------

import { useEffect, useState } from 'react'

useState:
- cria estados (product, loading, error)

useEffect:
- executa código quando algo muda
- aqui usamos para buscar o produto quando o ID muda


import { useParams } from 'react-router-dom'

useParams:
- lê parâmetros dinâmicos da URL
- no nosso caso: o :id da rota


import type { Product as ProductType } from '../types/Product'

Aqui acontece algo MUITO importante:

- Existe uma interface chamada Product
- Ela descreve o formato de um produto
- O nome Product entra em conflito com o componente Product

Então fazemos:
Product → ProductType

⚠️ ProductType NÃO é outro tipo.
É O MESMO Product, só com outro nome.

Isso se chama ALIAS DE TIPO.

Usamos `import type` porque:
- isso é só TypeScript
- não existe em runtime
- evita erro do ESLint


import { getProdutoPorId } from '../services/products'

Função responsável por:
- buscar UM produto na API
- retornar um Product tipado

-----------------------------------------------------
3️⃣ ESTRUTURA DO COMPONENTE
-----------------------------------------------------

export default function Product() {

Esse é o componente da página de produto.

-----------------------------------------------------
4️⃣ useParams + DESESTRUTURAÇÃO
-----------------------------------------------------

const { id } = useParams<{ id: string }>()

Vamos quebrar isso:

useParams() retorna um OBJETO com os parâmetros da rota.

Exemplo:
URL: /produto/3

Retorno:
{ id: "3" }

A DESESTRUTURAÇÃO:
{ id }

Significa:
"pegue a propriedade id desse objeto"

O <{ id: string }> é um GENERIC.

GENERIC = "eu quero definir o tipo manualmente"

Aqui estamos dizendo:
"O objeto retornado terá uma propriedade id do tipo string"

⚠️ Mesmo assim, o TypeScript considera:
id: string | undefined

Porque:
- a rota pode estar errada
- o usuário pode acessar /produto/ sem id

-----------------------------------------------------
5️⃣ ESTADOS DO COMPONENTE
-----------------------------------------------------

const [product, setProduct] = useState<ProductType | null>(null)

Aqui temos 3 conceitos importantes:

1) GENERIC:
<ProductType | null>

Estamos dizendo:
"Esse estado pode ser:
- um produto (ProductType)
- OU null"

Isso é um UNION TYPE.

Union Type = tipo A OU tipo B


2) Por que null?
Porque:
- antes da API responder
- não existe produto ainda


const [loading, setLoading] = useState(true)

Controla se a busca ainda está acontecendo.


const [error, setError] = useState<string | null>(null)

Guarda mensagens de erro, se algo der errado.

-----------------------------------------------------
6️⃣ useEffect — FLUXO COMPLETO
-----------------------------------------------------

useEffect(() => {
}, [id])

Esse efeito roda:
- quando o componente monta
- sempre que o ID da URL mudar

-----------------------------------------------------
7️⃣ VALIDAÇÃO DO ID
-----------------------------------------------------

if (!id) {
  setError('ID do produto não encontrado')
  setLoading(false)
  return
}

Isso significa:

- Se o ID NÃO existir
- Evita chamar a API
- Evita erro de tipagem
- Mostra erro pro usuário
- Para o loading
- Sai da função (return)

Esse return é FUNDAMENTAL.
Sem ele, o código continuaria executando.

-----------------------------------------------------
8️⃣ AFIRMAÇÃO DE TIPO (TYPE NARROWING)
-----------------------------------------------------

const productId: string = id

Aqui acontece algo importante:

Antes:
id → string | undefined

Depois dessa validação (!id):
o TypeScript SABE que id é string.

Essa linha afirma isso explicitamente.

Isso se chama:
TYPE NARROWING (afunilamento de tipo)

-----------------------------------------------------
9️⃣ FUNÇÃO ASSÍNCRONA DE BUSCA
-----------------------------------------------------

async function loadProduct() {

Criamos uma função async dentro do useEffect
porque:
- useEffect NÃO pode ser async diretamente

-----------------------------------------------------
🔁 TRY / CATCH / FINALLY
-----------------------------------------------------

try {
  const data = await getProdutoPorId(productId)
  setProduct(data)
}

Aqui:
- chamamos o service
- esperamos a resposta
- data é do tipo ProductType
- salvamos no estado product


catch {
  setError('Erro ao carregar produto')
}

Se algo falhar:
- exibimos erro


finally {
  setLoading(false)
}

Sempre executa:
- com sucesso ou erro
- encerra o loading

-----------------------------------------------------
🔄 EXECUÇÃO DA FUNÇÃO
-----------------------------------------------------

loadProduct()

Chama a função definida acima.

-----------------------------------------------------
10️⃣ RENDERIZAÇÃO CONDICIONAL
-----------------------------------------------------

if (loading) {
  return <p>Carregando...</p>
}

Enquanto carrega:
- não acessa product
- evita erro
- mostra feedback


if (error) {
  return <p>{error}</p>
}

Se deu erro:
- mostra mensagem clara


if (!product) {
  return <p>Produto não encontrado</p>
}

Proteção extra:
- garante que product existe

-----------------------------------------------------
11️⃣ RENDER FINAL DO PRODUTO
-----------------------------------------------------

Quando tudo deu certo:

- product existe
- loading é false
- error é null

Podemos acessar com segurança:

product.title
product.image
product.description
product.price

exemplo feito no componente:
return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        className="h-64 object-contain mb-4"
      />

      <p className="mb-4">{product.description}</p>

      <p className="text-xl font-semibold">
        R$ {product.price}
      </p>
    </div>
  )

-----------------------------------------------------
12️⃣ ERROS QUE ACONTECERAM (E POR QUÊ)
-----------------------------------------------------

❌ Erro:
Argument of type 'string | undefined'...

Motivo:
- useParams pode retornar undefined

Solução:
- validação do id
- type narrowing


❌ Erro:
product.description não existe

Motivo:
- product podia ser null

Solução:
- renderização condicional
- union type bem definido

-----------------------------------------------------
13️⃣ CONCEITOS APRENDIDOS AQUI
-----------------------------------------------------

✔️ useParams
✔️ Generics
✔️ Union Types
✔️ Type Narrowing
✔️ Alias de tipo
✔️ Tipagem de API
✔️ Fluxo assíncrono correto
✔️ Padrão profissional de página

-----------------------------------------------------
14️⃣ REGRA DE OURO PRA LEMBRAR
-----------------------------------------------------

- URL fornece dados → useParams
- API pode falhar → error
- API demora → loading
- Estado começa vazio → null
- TypeScript protege → escute ele

Se o TS reclama, NÃO IGNORE.
Ele está te salvando de bugs.

=====================================================
FIM DA ANOTAÇÃO
=====================================================


-->















<!--
====================================================================
ANOTAÇÃO COMPLETA — FEATURE BASE DE DADOS LOCAL + UI/UX FIRST
====================================================================

Essa feature mudou COMPLETAMENTE a base do projeto.

Saímos de:
- API externa (FakeStore)
- dados em inglês
- produtos aleatórios
- lógica antes do visual

Para:
- Banco de dados local (JSON)
- produtos em PT-BR
- categorias reais
- foco em UI/UX primeiro
- arquitetura clara e profissional

====================================================================
1️⃣ POR QUE CRIAMOS UM BANCO DE DADOS LOCAL (JSON)
====================================================================

Decisão de arquitetura:

❌ API externa:
- dados fora do meu controle
- títulos e descrições em inglês
- produtos sem contexto
- dependência externa

✅ JSON local:
- total controle dos dados
- produtos realistas
- fácil de trocar no futuro
- qualquer pessoa pode usar o projeto
  → basta trocar o JSON

O JSON NÃO é lógica.
Ele é apenas DADOS.

====================================================================
2️⃣ ESTRUTURA DO JSON (VISÃO GERAL)
====================================================================

O JSON segue esta ideia:

BancoDeProdutos
 └─ categorias[]
     └─ categoria
         ├─ slug
         ├─ nome
         └─ produtos[]
             └─ produto
                 ├─ id
                 ├─ titulo
                 ├─ descricao
                 ├─ preco
                 ├─ preco_desconto
                 ├─ imagens[]
                 └─ categoria

O JSON NÃO valida nada.
Quem valida é o TypeScript.

====================================================================
3️⃣ INTERFACES (TYPESCRIPT) — O MOLDE DOS DADOS
====================================================================

IMPORTANTE:
Interface ≠ dados reais  
Interface = REGRA / MOLDE / CONTRATO

Ela diz:
"Se você quiser usar esse dado, ele PRECISA ter essa forma."

-----------------------------------------------------
📄 Product.ts
-----------------------------------------------------

export interface Product {
  id: number
  titulo: string
  descricao: string
  preco: number
  preco_desconto: number | null
  imagens: string[]
  categoria: string
}

Aqui definimos:
- o que é um produto
- quais campos ele tem
- quais são obrigatórios
- quais podem ser null

O `| null` significa:
→ Union Type
→ pode ser number OU null

-----------------------------------------------------
📄 Categoria.ts
-----------------------------------------------------

import type { Product } from './Product'

export interface Categoria {
  slug: string
  nome: string
  produtos: Product[]
}

Aqui acontece algo importante:

- Categoria NÃO inventa produto
- Ela IMPORTA o modelo Product
- produtos é um ARRAY de Product

Ou seja:
Cada item dentro de produtos PRECISA seguir
o formato definido em Product.ts

-----------------------------------------------------
📄 BancoDeProdutos.ts
-----------------------------------------------------

import type { Categoria } from './Categoria'

export interface BancoDeProdutos {
  categorias: Categoria[]
}

Isso representa o JSON inteiro.

Não é um banco real.
É apenas o MOLDE do banco.

====================================================================
4️⃣ SERVICES — A CAMADA DE ACESSO AOS DADOS
====================================================================

O service serve para:
- isolar lógica
- evitar acessar o JSON direto nas páginas
- facilitar troca futura (JSON → API)

-----------------------------------------------------
📄 services/products.ts
-----------------------------------------------------

import produtosJson from '../data/produtos.json'
import type { BancoDeProdutos } from '../types/BancoDeProdutos'
import type { Categoria } from '../types/Categoria'
import type { Product } from '../types/Product'

const bancoDeProdutos = produtosJson as BancoDeProdutos

Aqui acontece uma COISA MUITO IMPORTANTE:

- produtosJson vem do JSON (JavaScript puro)
- TypeScript NÃO sabe o formato disso
- usamos `as BancoDeProdutos` para dizer:

"CONFIA, esse JSON segue esse modelo"

Isso é:
→ Type Assertion (afirmação de tipo)

-----------------------------------------------------
🔹 getCategorias
-----------------------------------------------------

export function getCategorias(): Categoria[] {
  return bancoDeProdutos.categorias
}

Essa função:
- retorna TODAS as categorias
- já tipadas corretamente
- sem lógica complexa

É usada na Home.

-----------------------------------------------------
🔹 getProdutosPorCategoria
-----------------------------------------------------

export function getProdutosPorCategoria(slug: string): Product[] {
  const categoria = bancoDeProdutos.categorias.find(
    (cat) => cat.slug === slug
  )

  return categoria ? categoria.produtos : []
}

Aqui acontece:

1) Recebo um slug (string)
2) Procuro uma categoria com esse slug
3) Se existir:
   → retorno os produtos dela
4) Se não existir:
   → retorno array vazio

Por que array vazio?
Porque evita erro no map().

-----------------------------------------------------
🔹 getProdutoPorId
-----------------------------------------------------

export function getProdutoPorId(id: number): Product | undefined {
  for (const categoria of bancoDeProdutos.categorias) {
    const produto = categoria.produtos.find(
      (produto) => produto.id === id
    )

    if (produto) return produto
  }

  return undefined
}

Essa função:
- percorre TODAS as categorias
- procura o produto pelo id
- retorna o produto se achar
- retorna undefined se não achar

Isso simula um banco real.

====================================================================
5️⃣ ROTAS — App.tsx
====================================================================

<BrowserRouter>
  <BaseLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produto/:id" element={<Product />} />
      <Route path="/carrinho" element={<Cart />} />
    </Routes>
  </BaseLayout>
</BrowserRouter>

Importante:

- BaseLayout envolve tudo
- Header e Footer são fixos
- apenas o conteúdo central muda

A rota /produto/:id é dinâmica.
Exemplo:
- /produto/3
- /produto/10

====================================================================
6️⃣ HOME — EXIBINDO CATEGORIAS E PRODUTOS
====================================================================

Na Home:

- chamamos getCategorias()
- fazemos map nas categorias
- dentro de cada categoria:
  - exibimos os produtos
  - usamos Link para navegar

Exemplo:

<Link to={`/produto/${produto.id}`}>

Isso conecta Home → Product.

====================================================================
7️⃣ PRODUCT — PÁGINA DE PRODUTO
====================================================================

A página Product é uma página DINÂMICA.

-----------------------------------------------------
🔹 useParams
-----------------------------------------------------

const { id } = useParams<{ id: string }>()

Isso significa:
- a URL tem /produto/:id
- id SEMPRE vem como string
- mesmo sendo número no JSON

-----------------------------------------------------
🔹 Conversão de ID
-----------------------------------------------------

const productId = Number(id)

Por quê?
Porque no JSON o id é number.

Depois validamos:
- se é NaN
- se existe produto

-----------------------------------------------------
🔹 Estados
-----------------------------------------------------

const [product, setProduct] = useState<Product | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

Isso controla:
- carregamento
- erro
- produto encontrado

-----------------------------------------------------
🔹 Lógica do useEffect
-----------------------------------------------------

1) Verifica se existe id
2) Converte id para number
3) Busca produto no service
4) Se não existir → erro
5) Se existir → seta produto
6) Finaliza loading

-----------------------------------------------------
🔹 Render condicional
-----------------------------------------------------

if (loading) → mostra loading
if (error) → mostra erro
if (!product) → produto não encontrado

Isso evita:
- acessar dados inexistentes
- erros de runtime

====================================================================
8️⃣ UI/UX — DECISÃO DE DESIGN
====================================================================

Prioridade agora:
- layout profissional
- visual antes da lógica pesada
- experiência clara

Decisões:
- cards com imagem centralizada
- preço com desconto destacado
- hover suave
- grid responsivo
- hero introdutório
- categorias separadas

====================================================================
9️⃣ REGRA DE OURO DESSA FEATURE
====================================================================

- JSON = dados
- Interfaces = regras
- Service = lógica
- Pages = renderização
- Router = navegação
- UI vem ANTES da lógica pesada

====================================================================
🔚 CONCLUSÃO
====================================================================

Essa feature:
- organizou o projeto
- deixou escalável
- deixou profissional
- facilitou aprendizado
- preparou o terreno para:
  → carrinho
  → categorias
  → recomendados
  → filtros
  → backend real no futuro

Se no futuro eu estiver perdido, lembrar:
"Primeiro estrutura, depois lógica, depois refinamento."

-->
