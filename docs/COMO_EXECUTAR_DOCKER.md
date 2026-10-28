# 🐳 Como Executar com Docker

Este guia detalha como subir toda a infraestrutura containerizada do projeto **Introdução ao JavaScript Lab** utilizando **Docker** e **Docker Compose**.

---

## 🏗️ 1. Arquitetura dos Containers

O arquivo `docker-compose.yml` orquestra 4 serviços integrados na rede `introducao_javascript_network`:

| Serviço | Container | Imagem Base | Porta Interna | Porta no Host | Função |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`app`** | `introducao_javascript_app` | `node:20-alpine` (Multi-stage) | `3000` | *(Exposta ao Nginx)* | Servidor Node.js e VM de execução dos 26 scripts |
| **`nginx`** | `introducao_javascript_nginx` | `nginx:1.27-alpine` | `80` | **`8080`** | Proxy reverso com compressão Gzip e DNS dinâmico |
| **`mysql`** | `introducao_javascript_mysql` | `mysql:8.0` | `3306` | **`3308`** | Banco de dados relacional com volume persistente |
| **`phpmyadmin`** | `introducao_javascript_phpmyadmin` | `phpmyadmin/phpmyadmin:latest` | `80` | **`8085`** | Interface visual para administração do MySQL |

---

## ⚙️ 2. Configuração do `.env` para Docker

1. Caso ainda não possua o arquivo `.env`, crie-o a partir do `.env.example`:
```bash
cp .env.example .env
```

2. No arquivo `.env`, comente o bloco `# LOCAL` e descomente o bloco `# DOCKER`:
```env
# ==============================================================================
# LOCAL
# ==============================================================================
# APP_URL=http://localhost:3000
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3307
# DB_DATABASE=introducao_javascript
# DB_USERNAME=root
# DB_PASSWORD=

# ==============================================================================
# DOCKER
# ==============================================================================
APP_URL=http://localhost:8080

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=introducao_javascript
DB_USERNAME=root
DB_PASSWORD=root
```

---

## 🚀 3. Subindo os Containers

Execute o comando abaixo na raiz do projeto:

```bash
docker compose up -d --build
```

Acompanhe o status e os logs de inicialização:

```bash
docker compose ps
docker compose logs -f app
```

---

## 🌐 4. URLs e Acessos no Docker

- **Aplicação Web (via Nginx):** [http://localhost:8080](http://localhost:8080)
- **Tela de Login:** [http://localhost:8080/login](http://localhost:8080/login)
- **Healthcheck da API:** [http://localhost:8080/api/health](http://localhost:8080/api/health)
- **phpMyAdmin:** [http://localhost:8085](http://localhost:8085)
  - **Servidor:** `mysql`
  - **Utilizador:** `root`
  - **Palavra-passe:** `root`
- **Conexão Externa ao MySQL (DBeaver / TablePlus / Workbench):**
  - **Host:** `127.0.0.1`
  - **Porta:** `3308`
  - **Usuário / Senha:** `root` / `root`

---

## 🛠️ 5. Comandos Úteis de Manutenção

```bash
# Executar a bateria de testes dos 26 scripts dentro do container
docker compose exec app npm test

# Executar um script específico dentro do container
docker compose exec app node historia-conceitos/closure.js

# Reiniciar apenas o serviço da aplicação
docker compose restart app

# Parar e remover os containers (preservando o volume do banco)
docker compose down

# Parar e remover containers + volumes (reset completo)
docker compose down -v
```
