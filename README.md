<h1 align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="38" valign="middle" alt="JavaScript" />
  Introdução ao JavaScript — Interactive Lab ES6+
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="38" valign="middle" alt="Node.js" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="38" valign="middle" alt="Docker" />
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript ES6+" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=ffffff" alt="Node.js" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=ffffff" alt="Docker" />
  <img src="https://img.shields.io/badge/Nginx-1.27_Alpine-009639?style=for-the-badge&logo=nginx&logoColor=ffffff" alt="Nginx" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=ffffff" alt="MySQL" />
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-22C55E?style=for-the-badge" alt="Status Concluído" />
</p>

<p align="center">
  <a href="#-descrição">Descrição</a> •
  <a href="#-arquitetura-do-sistema">Arquitetura</a> •
  <a href="#-tecnologias-utilizadas">Tecnologias</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-documentação-do-projeto">Documentação</a> •
  <a href="#-comandos">Comandos</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a>
</p>

---

## 📝 Descrição

> <cite>"Laboratório prático e interativo para estudo aprofundado dos fundamentos da linguagem JavaScript (ES6+), reunindo 26 algoritmos executáveis sobre história, conceitos funcionais, escopos, tipos de dados primitivos/objetos e declarações de variáveis, acompanhado de uma plataforma web com execução em tempo real via Node.js VM e infraestrutura Docker completa."</cite>

O projeto **Introdução ao JavaScript** nasceu durante a trilha de formação da **Digital Innovation One (DIO)** (ministrada pelo instrutor [Guilherme Cabrini da Silva](https://github.com/guilhermecabrini)) e foi evoluído para um **Laboratório Interativo Full-Stack** em **Node.js**. Além de permitir a execução direta de cada script via CLI, a aplicação disponibiliza uma interface web moderna com autenticação por sessão, perfis de demonstração em 1 clique, editor de código em tempo real e bateria automatizada de validação dos 26 exemplos.

---

## 📊 Status do Projeto

- ✅ **Concluído e Estável (v2.0.0)** — Todos os **26 scripts** revisados, padronizados e validados com saída de console (`stdout`), painel web interativo com login/sessão e ambiente Docker multi-container pronto para uso.

---

## 🏗️ Arquitetura do Sistema

O projeto opera em uma arquitetura modular dividida em três camadas principais:

1. **Núcleo Didático (`historia-conceitos/` e `tipos-e-variaveis/`):** Coleção organizada de 26 scripts JavaScript independentes que demonstram na prática Closures, Currying, Hoisting, Imutabilidade, Tipagem Dinâmica/Fraca, Escopos (`global`, `bloco`, `função`), Variáveis (`var`, `let`, `const`) e Tipos de Dados (`String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`, `Object`, `Function`, `Array`).
2. **Servidor & Sandbox VM (`src/server.js`):** Servidor HTTP nativo em Node.js responsável pelo gerenciamento de sessão via cookies HTTP-Only, catálogo estruturado de algoritmos e execução isolada de código utilizando o módulo nativo `node:vm` com captura segura de `console.log` e medição de tempo em alta precisão (`process.hrtime.bigint()`).
3. **Infraestrutura Containerizada (`Dockerfile` + `docker-compose.yml`):** Orquestração composta por **Nginx** (`8080:80`) atuando como proxy reverso com compressão Gzip e resolução dinâmica de DNS, **App Node.js** (`node:20-alpine` multi-stage), **MySQL 8.0** (`3308:3306`) com healthcheck e **phpMyAdmin** (`8085:80`).

---

## 📋 Pré-requisitos

### Para Execução com Docker (Recomendado)
- **Docker Engine** `24.0+` / **Docker Desktop** `4.25+`
- **Docker Compose** `v2.20+`
- Portas livres no host: `8080` (Nginx/App), `3308` (MySQL) e `8085` (phpMyAdmin)

### Para Execução Local (Host / Laragon)
- **Node.js** `22.14.0+` (compatível com `>= 18.0.0`)
- **NPM** `11.4.2+`
- **Laragon** `6.0.0` (Ambiente de referência com PHP `8.4.6`, Composer `2.8.12`, Laravel `13.15.0` e MySQL na porta `3307`)

---

## 🚀 Tecnologias Utilizadas

- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="20" valign="middle" /> **JavaScript (ES6+)** — Linguagem base dos 26 algoritmos (Closures, Currying, Arrow Functions, Spread, Symbol, Reflect, Array HOFs).
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="20" valign="middle" /> **Node.js (`http`, `vm`, `crypto`, `fs`)** — Runtime backend e motor de execução isolada (sandbox) dos scripts.
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="20" valign="middle" /> **HTML5 & CSS3 Moderno** — Interface responsiva da plataforma de login e do laboratório de código.
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="20" valign="middle" /> **Docker & Docker Compose** — Containerização multi-stage (`node:20-alpine`) e orquestração completa de serviços.
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="20" valign="middle" /> **Nginx (`1.27-alpine`)** — Servidor proxy reverso de alta performance com Gzip ativo.
- <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" width="20" valign="middle" /> **MySQL 8.0 & phpMyAdmin** — Serviços de banco de dados e administração visual integrados à stack Docker.

---

## ⚙️ Funcionalidades

- 🔐 **Autenticação e Controle de Sessão Completo:**
  - Tela de login dedicada (`/login`) com validação de credenciais e sessão via Cookie HTTP-Only (`jslab_sid`).
  - **3 Perfis de Demonstração com Preenchimento em 1 Clique** (`Administrador`, `Mentor Técnico` e `Estudante DIO`).
  - Proteção de rotas e encerramento seguro de sessão (`Logout`).
- 🧪 **Laboratório Interativo de Código no Navegador:**
  - Catálogo navegável e filtrável com todos os **26 exemplos práticos** divididos por categoria e tags de conceitos.
  - Editor de código interativo que permite alterar qualquer exemplo, executar na VM do Node.js (`POST /api/examples/run`) e inspecionar o `stdout` e o tempo de execução em milissegundos.
  - Botão **Restaurar Original** para recuperar instantaneamente o código-fonte do repositório.
- ⚡ **Execução em Lote (Batch Runner):**
  - Execução simultânea de todos os 26 scripts pelo navegador (`POST /api/examples/run-all`) ou pelo terminal (`npm test`), exibindo o relatório completo de aprovação.
- 📘 **Cobertura Didática Integral (26 Scripts):**
  - **História e Conceitos (9 scripts):** Closure, Currying, Funções de Primeira Classe e Ordem Maior, Hoisting de Funções, Hoisting de Variáveis, Imutabilidade em Objetos, Imutabilidade com `Array.filter`, Tipagem Dinâmica e Tipagem Fraca.
  - **Escopo e Variáveis (6 scripts):** Escopos Global/Bloco/Função, declarações `var`, `let` e `const`, comportamento em blocos condicionais e mutação de propriedades em constantes.
  - **Tipos de Dados (11 scripts):** `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`, `Object`, Métodos de `Object` (`keys`, `entries`, `assign`, `freeze`, `seal`), `Functions`, Contexto `this` e `Array` (`forEach`, `filter`, `map`, `reduce`).

---

## 💡 Sobre o Projeto

Este repositório consolida a base conceitual indispensável para qualquer desenvolvedor JavaScript moderno. Em vez de manter apenas arquivos estáticos isolados, o projeto transforma o material de estudo em uma **aplicação auto-contida e experimentável**, onde recrutadores, estudantes e desenvolvedores podem visualizar o código-fonte lado a lado com a saída real do interpretador sem precisar configurar ferramentas complexas.

---

## 🖥️ Preview

| Tela / Módulo | Rota | Destaque Visual |
| :--- | :--- | :--- |
| **Login & Perfis Demo** | `/login` | Formulário dark mode + 3 cartões de acesso rápido em 1 clique (`admin@jslab.dev`, `mentor@jslab.dev`, `aluno@jslab.dev`). |
| **Laboratório Interativo** | `/` | Sidebar com busca instantânea por conceito, editor de código em tempo real e console `stdout` com tempo de execução. |
| **Healthcheck API** | `/api/health` | Diagnóstico JSON instantâneo do ambiente, banco configurado e total de algoritmos carregados. |

---

## 📚 Documentação do Projeto

Toda a documentação operacional, guias de execução e credenciais de teste estão organizados na pasta [`docs/`](./docs):

- 📘 **[Como Executar o Projeto (Visão Geral)](./docs/COMO_EXECUTAR.md)** — Escolha entre execução Local ou Docker e entenda a regra dos blocos `# LOCAL` e `# DOCKER` no `.env`.
- 💻 **[Como Executar Localmente (Host / Laragon)](./docs/COMO_EXECUTAR_LOCAL.md)** — Passo a passo para ambiente local e tabela do Ambiente de Referência.
- 🐳 **[Como Executar com Docker](./docs/COMO_EXECUTAR_DOCKER.md)** — Arquitetura dos 4 containers (`app`, `nginx`, `mysql`, `phpmyadmin`), portas e comandos de manutenção.
- 🔐 **[Acessos, Credenciais e Roteiro de Testes](./docs/ACESSOS_TESTES.md)** — URLs, logins de demonstração (`Password@123`), credenciais de banco e checklist de validação.

---

## 💻 Comandos

> ⚠️ **Importante:** Antes de executar os comandos abaixo, consulte a seção [📚 Documentação do Projeto](#-documentação-do-projeto) para configurar corretamente o arquivo `.env` de acordo com o ambiente escolhido (**Local** ou **Docker**).

### Execução com Docker (Recomendado)

```bash
# 1. Criar o arquivo .env (e ativar o bloco # DOCKER conforme docs/COMO_EXECUTAR_DOCKER.md)
cp .env.example .env

# 2. Construir e subir todos os containers em background
docker compose up -d --build

# 3. Executar a suíte de validação dos 26 algoritmos dentro do container
docker compose exec app npm test

# 4. Parar os serviços
docker compose down
```

### Execução Local (Node.js)

```bash
# 1. Criar o arquivo .env (mantendo o bloco # LOCAL ativo por padrão)
cp .env.example .env

# 2. Validar todos os 26 scripts JavaScript no terminal
npm test

# 3. Iniciar o servidor web interativo na porta 3000
npm start
```

---

## 📁 Estrutura do Projeto

```text
introducao_ao_javascript/
├── docker/
│   ├── nginx/
│   │   └── default.conf                      # Proxy reverso Nginx com Gzip e DNS dinâmico
│   └── scripts/
│       └── start-app.sh                      # Entrypoint do container App (validação + servidor)
├── docs/
│   ├── ACESSOS_TESTES.md                     # URLs, logins demo, credenciais DB e roteiro de testes
│   ├── COMO_EXECUTAR.md                      # Guia central de execução (Local vs Docker)
│   ├── COMO_EXECUTAR_DOCKER.md               # Manual detalhado da stack Docker
│   └── COMO_EXECUTAR_LOCAL.md                # Manual detalhado para ambiente Local / Laragon
├── historia-conceitos/
│   ├── closure.js                            # Escopo léxico e funções aninhadas
│   ├── currying.js                           # Aplicação parcial de parâmetros
│   ├── funcoes-primeira-classe-ordem-maior.js# First-class e Higher-order functions
│   ├── hoisting-funcoes.js                   # Elevação de declarações de função
│   ├── hoisting-variaveis.js                 # Elevação de variáveis var
│   ├── imutabilidade-filter.js               # Filtragem imutável de coleções
│   ├── imutabilidade.js                      # Criação de objetos imutáveis com Spread
│   ├── tipagem-dinamica.js                   # Mutação de tipo em tempo de execução
│   └── tipagem-fraca.js                      # Coerção implícita entre número e string
├── public/
│   ├── index.html                            # Interface do Laboratório Interativo ES6+
│   └── login.html                            # Tela de login com acesso rápido em 1 clique
├── src/
│   └── server.js                             # Servidor HTTP Node.js, Auth, API e Sandbox VM
├── tests/
│   └── run-all.js                            # Executor e validador automatizado dos 26 scripts
├── tipos-e-variaveis/
│   ├── escopo/
│   │   └── tipos-escopos.js                  # Escopos global, de bloco e de função
│   ├── tipos/
│   │   ├── array.js                          # map, filter, reduce, forEach e Array.isArray
│   │   ├── boolean.js                        # Primitivo lógico boolean
│   │   ├── functions-contexto.js             # Vínculo de this em Arrow vs Function
│   │   ├── functions.js                      # Funções como objetos e closures de controle
│   │   ├── null.js                           # Primitivo null e operador typeof
│   │   ├── number.js                         # toFixed, toString, parseFloat e parseInt
│   │   ├── object-funcoes.js                 # keys, entries, assign, freeze e seal
│   │   ├── object.js                         # Manipulação dinâmica de propriedades
│   │   ├── string.js                         # length, split, replace, slice e substr
│   │   ├── symbol.js                         # Symbols únicos, Reflect.ownKeys e enums
│   │   └── undefined.js                      # Verificação do tipo undefined
│   └── variaveis/
│       ├── 1-variaveis.js                    # Declaração inicial var, let e const
│       ├── 2-1-variaveis.js                  # Comportamento de var em escopo de bloco
│       ├── 2-2-variaveis.js                  # Isolamento de let em escopo de bloco
│       ├── 2-3-variaveis.js                  # Isolamento de const em escopo de bloco
│       └── 3-variaveis.js                    # Mutação interna de objetos/arrays em const
├── .dockerignore                             # Exclusões de contexto de build Docker
├── .env.example                              # Template de variáveis com blocos # LOCAL e # DOCKER
├── .gitignore                                # Arquivos ignorados pelo Git
├── Dockerfile                                # Build multi-stage otimizado (node:20-alpine)
├── docker-compose.yml                        # Orquestração: app, nginx, mysql e phpmyadmin
├── package.json                              # Metadados e scripts de automação
└── README.md                                 # Documentação principal do projeto
```

---

## 🔮 Melhorias Futuras

- [ ] Persistência de histórico de execuções e snippets personalizados por usuário no MySQL.
- [ ] Exportação de relatórios de execução em formato PDF/Markdown diretamente pelo painel web.
- [ ] Adição de novos módulos sobre `Promises`, `Async/Await`, `Generators`, `Proxies` e `ES Modules`.
- [ ] Modo de desafios interativos (Quizzes de saída esperada com pontuação por perfil de estudante).

---

<p align="center">Feito com ❤️ por <strong>Gabriel Martins</strong> 🚀</p>
