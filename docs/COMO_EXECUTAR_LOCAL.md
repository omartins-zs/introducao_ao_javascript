# 💻 Como Executar Localmente (Host / Laragon)

Este guia descreve o passo a passo completo para configurar e executar o projeto **Introdução ao JavaScript Lab** diretamente na sua máquina local.

---

## 🛠️ 1. Ambiente de Referência

Para garantir total compatibilidade no ecossistema de desenvolvimento local, utilize como referência as versões abaixo:

| Ferramenta | Versão Recomendada | Observação |
| :--- | :--- | :--- |
| **Laragon** | `6.0.0` | Ambiente integrado de serviços locais |
| **PHP** | `8.4.6` | Runtime de referência do ambiente Laragon |
| **Composer** | `2.8.12` | Gerenciador de pacotes do ecossistema local |
| **Laravel** | `13.15.0` | Versão padrão de referência da suíte local |
| **Node.js** | `22.14.0+` (ou `>= 18.0.0`) | Runtime JavaScript utilizado pelo servidor e scripts |
| **NPM** | `11.4.2+` | Gerenciador de pacotes Node.js |
| **MySQL (Laragon)** | `8.0+` | Porta padrão local configurada em `3307` |

---

## 📦 2. Passo a Passo de Instalação e Execução

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/gabriel-martins-dev/introducao_ao_javascript.git
cd introducao_ao_javascript
```

### Passo 2: Configurar o arquivo `.env`
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

Certifique-se de que o bloco `# LOCAL` está ativo (padrão) e o bloco `# DOCKER` está comentado:
```env
# LOCAL (Ativo por padrão)
APP_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_DATABASE=introducao_javascript
DB_USERNAME=root
DB_PASSWORD=
```

### Passo 3: Validar a suíte de 26 exemplos JavaScript
```bash
npm test
```

### Passo 4: Iniciar o servidor do Laboratório Interativo
```bash
npm start
```
Para desenvolvimento com recarregamento automático (watch mode):
```bash
npm run dev
```

---

## 🌐 3. Acessando a Aplicação Local

- **URL da Aplicação:** [http://localhost:3000](http://localhost:3000)
- **Tela de Login:** [http://localhost:3000/login](http://localhost:3000/login)
- **Healthcheck JSON:** [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Executar um arquivo `.js` individual via CLI
Caso deseje executar qualquer script diretamente no terminal:
```bash
node historia-conceitos/closure.js
node historia-conceitos/currying.js
node tipos-e-variaveis/tipos/array.js
```
