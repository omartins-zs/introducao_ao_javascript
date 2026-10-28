# 🚀 Como Executar o Projeto

O projeto **Introdução ao JavaScript Lab** foi estruturado para rodar de forma simples e padronizada tanto em **Ambiente Local (Laragon / Node.js)** quanto em **Ambiente Docker Completo (App + Nginx + MySQL + phpMyAdmin)**.

---

## 📋 Escolha o seu Modo de Execução

| Modo de Execução | Quando utilizar | Guia Detalhado |
| :--- | :--- | :--- |
| **💻 Execução Local** | Ideal para desenvolvimento rápido direto no sistema operacional ou com Laragon. | [📘 Ler `COMO_EXECUTAR_LOCAL.md`](./COMO_EXECUTAR_LOCAL.md) |
| **🐳 Execução com Docker** | Ideal para rodar toda a stack isolada em containers (`app`, `nginx`, `mysql`, `phpmyadmin`) sem instalar dependências no host. | [🐳 Ler `COMO_EXECUTAR_DOCKER.md`](./COMO_EXECUTAR_DOCKER.md) |
| **🔐 Acessos e Testes** | Consulta rápida de URLs, logins de demonstração (`Password@123`) e roteiro de testes. | [🔑 Ler `ACESSOS_TESTES.md`](./ACESSOS_TESTES.md) |

---

## ⚙️ Regra de Ouro do Arquivo `.env`

O arquivo `.env.example` possui dois blocos claramente identificados:

1. **Bloco `# LOCAL` (Ativo por padrão):** Configurado para execução direta no host (`APP_URL=http://localhost:3000`, `DB_HOST=127.0.0.1`, `DB_PORT=3307`).
2. **Bloco `# DOCKER` (Comentado por padrão):** Configurado para comunicação entre containers na rede Docker (`APP_URL=http://localhost:8080`, `DB_HOST=mysql`, `DB_PORT=3306`).

---

## ⚡ Resumo Rápido de Comandos

### Execução Local
```bash
cp .env.example .env
npm test
npm start
```
Acesse: **[http://localhost:3000](http://localhost:3000)**

### Execução via Docker
```bash
cp .env.example .env
docker compose up -d --build
```
Acesse:
- **Aplicação Web (Nginx):** [http://localhost:8080](http://localhost:8080)
- **phpMyAdmin:** [http://localhost:8085](http://localhost:8085)
- **MySQL Externo:** `127.0.0.1:3308`
