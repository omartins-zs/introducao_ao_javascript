# 🔐 Acessos, Credenciais e Roteiro de Testes

Este documento reúne todas as URLs de acesso, credenciais de demonstração da aplicação, acessos de infraestrutura (Banco de Dados e phpMyAdmin) e o roteiro de testes funcionais do projeto **Introdução ao JavaScript Lab**.

---

## 🌐 1. URLs de Acesso da Aplicação

| Ambiente | Serviço | URL | Porta Host |
| :--- | :--- | :--- | :--- |
| **Docker (Recomendado)** | Aplicação Web (via Nginx) | [http://localhost:8080](http://localhost:8080) | `8080` |
| **Docker** | Tela de Login | [http://localhost:8080/login](http://localhost:8080/login) | `8080` |
| **Docker** | Healthcheck da API | [http://localhost:8080/api/health](http://localhost:8080/api/health) | `8080` |
| **Docker** | phpMyAdmin | [http://localhost:8085](http://localhost:8085) | `8085` |
| **Local (Node.js)** | Aplicação Web Direta | [http://localhost:3000](http://localhost:3000) | `3000` |
| **Local (Node.js)** | Tela de Login | [http://localhost:3000/login](http://localhost:3000/login) | `3000` |

---

## 👤 2. Perfis de Acesso Rápido (Login & Sessão)

A tela de login (`/login`) conta com cartões de **Acesso Rápido em 1 Clique**, além de permitir digitação manual das credenciais abaixo:

| Perfil / Papel | E-mail / Usuário | Senha | Permissões e Escopo |
| :--- | :--- | :--- | :--- |
| **Administrador / Instrutor** | `admin@jslab.dev` | `Password@123` | Acesso total ao catálogo, edição em tempo real e execução em lote dos 26 algoritmos. |
| **Mentor Técnico** | `mentor@jslab.dev` | `Password@123` | Acesso completo aos módulos de revisão de conceitos (`historia-conceitos` e `tipos-e-variaveis`). |
| **Estudante DIO** | `aluno@jslab.dev` | `Password@123` | Acesso ao laboratório interativo para estudo prático e testes de código ES6+. |

---

## 🗄️ 3. Credenciais de Banco de Dados e phpMyAdmin

| Parâmetro | Ambiente Local (Laragon) | Ambiente Docker |
| :--- | :--- | :--- |
| **Host (`DB_HOST`)** | `127.0.0.1` | `mysql` (interno) / `127.0.0.1` (externo) |
| **Porta (`DB_PORT`)** | `3307` | `3306` (interno) / `3308` (externo no Host) |
| **Banco (`DB_DATABASE`)** | `introducao_javascript` | `introducao_javascript` |
| **Usuário (`DB_USERNAME`)** | `root` | `root` |
| **Senha (`DB_PASSWORD`)** | *(vazio)* | `root` |
| **phpMyAdmin** | `http://localhost/phpmyadmin` | [http://localhost:8085](http://localhost:8085) (`root` / `root`) |

---

## 🧪 4. Roteiro Passo a Passo para Testar as Funcionalidades

### 4.1. Teste de Autenticação e Sessão
1. Acesse `/login` ([http://localhost:8080/login](http://localhost:8080/login) no Docker ou [http://localhost:3000/login](http://localhost:3000/login) localmente).
2. Clique no botão **Entrar** de qualquer um dos 3 cartões de demonstração (`Administrador`, `Mentor Técnico` ou `Estudante DIO`) ou preencha `admin@jslab.dev` / `Password@123`.
3. Verifique o redirecionamento automático para o painel principal (`/`) com identificação do nome e perfil do usuário no topo direito.
4. Clique em **Sair** no cabeçalho superior para encerrar a sessão e confirmar o retorno imediato à tela `/login`.

### 4.2. Teste de Execução Individual no Laboratório Interativo
1. No menu lateral esquerdo, selecione qualquer um dos **26 scripts** divididos entre **História e Conceitos**, **Escopo e Variáveis** e **Tipos de Dados**.
2. Clique em **▶ Executar Código** para rodar o script na VM isolada do Node.js e inspecionar a saída formatada no painel **Saída do Console (stdout)**.
3. Edite o código no editor interativo (por exemplo, alterando valores em `historia-conceitos/currying.js` ou `tipos-e-variaveis/tipos/array.js`) e clique novamente em **▶ Executar Código** para ver o resultado atualizado em tempo real.
4. Clique em **Restaurar Original** para reverter o código ao estado original do repositório.

### 4.3. Teste de Execução em Lote (26 Algoritmos)
1. No topo da aplicação, clique no botão **⚡ Executar Todos (26)**.
2. Verifique o relatório consolidado no console exibindo `26/26 SCRIPTS APROVADOS` com o tempo de execução individual em milissegundos.
3. Pelo terminal (CLI), você também pode validar toda a suíte com:

```bash
# Local
npm test

# Docker
docker compose exec app npm test
```
