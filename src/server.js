const http = require("http");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const util = require("util");
const crypto = require("crypto");

// Carregamento nativo de variáveis do .env caso exista
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const PORT = Number(process.env.PORT || process.env.APP_PORT || 3000);
const ROOT_DIR = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

const DEMO_USERS = [
  {
    id: 1,
    name: "Admin Instrutor",
    email: "admin@jslab.dev",
    password: "Password@123",
    role: "Administrador",
    badge: "Acesso Total • Execução & Edição"
  },
  {
    id: 2,
    name: "Mentor JavaScript",
    email: "mentor@jslab.dev",
    password: "Password@123",
    role: "Mentor Técnico",
    badge: "Revisão de Código & Conceitos"
  },
  {
    id: 3,
    name: "Aluno DIO",
    email: "aluno@jslab.dev",
    password: "Password@123",
    role: "Estudante",
    badge: "Laboratório Prático ES6+"
  }
];

const sessions = new Map();

const EXAMPLES_CATALOG = [
  // História e Conceitos
  {
    id: "closure",
    title: "Closure (Escopo Léxico)",
    category: "História e Conceitos",
    file: "historia-conceitos/closure.js",
    description: "Demonstra a capacidade de uma função lembrar e acessar seu escopo léxico mesmo quando invocada em níveis aninhados.",
    tags: ["Closure", "Escopo Léxico", "High-Order Function"]
  },
  {
    id: "currying",
    title: "Currying",
    category: "História e Conceitos",
    file: "historia-conceitos/currying.js",
    description: "Transforma uma função com múltiplos parâmetros em uma cadeia de funções que recebem um parâmetro por vez.",
    tags: ["Currying", "Programação Funcional", "Arrow Functions"]
  },
  {
    id: "funcoes-primeira-classe",
    title: "Funções de Primeira Classe e Ordem Maior",
    category: "História e Conceitos",
    file: "historia-conceitos/funcoes-primeira-classe-ordem-maior.js",
    description: "Atribuição de funções a variáveis, passagem por argumento e retorno de funções como valores.",
    tags: ["First-Class", "Higher-Order", "Callbacks"]
  },
  {
    id: "hoisting-funcoes",
    title: "Hoisting de Funções",
    category: "História e Conceitos",
    file: "historia-conceitos/hoisting-funcoes.js",
    description: "Elevação completa da declaração de funções permitindo sua chamada antes da definição no código.",
    tags: ["Hoisting", "Function Declaration"]
  },
  {
    id: "hoisting-variaveis",
    title: "Hoisting de Variáveis",
    category: "História e Conceitos",
    file: "historia-conceitos/hoisting-variaveis.js",
    description: "Elevação da declaração var com valor inicial undefined antes da atribuição efetiva.",
    tags: ["Hoisting", "var", "undefined"]
  },
  {
    id: "imutabilidade",
    title: "Imutabilidade com Objetos",
    category: "História e Conceitos",
    file: "historia-conceitos/imutabilidade.js",
    description: "Criação de novos objetos derivados via Spread Operator (...) preservando o objeto original intacto.",
    tags: ["Imutabilidade", "Spread Operator", "Objetos"]
  },
  {
    id: "imutabilidade-filter",
    title: "Imutabilidade em Arrays (Filter)",
    category: "História e Conceitos",
    file: "historia-conceitos/imutabilidade-filter.js",
    description: "Filtragem não-destrutiva de arrays de objetos gerando uma nova coleção sem mutar a lista de alunos.",
    tags: ["Imutabilidade", "Array.filter", "Coleções"]
  },
  {
    id: "tipagem-dinamica",
    title: "Tipagem Dinâmica",
    category: "História e Conceitos",
    file: "historia-conceitos/tipagem-dinamica.js",
    description: "Reatribuição de valores de tipos distintos (Number para String) na mesma variável em tempo de execução.",
    tags: ["Tipagem Dinâmica", "Runtime"]
  },
  {
    id: "tipagem-fraca",
    title: "Tipagem Fraca (Coerção Implícita)",
    category: "História e Conceitos",
    file: "historia-conceitos/tipagem-fraca.js",
    description: "Concatenação automática entre número e string demonstrando a coerção implícita de tipos do JavaScript.",
    tags: ["Tipagem Fraca", "Coerção", "Operador +"]
  },
  // Escopo
  {
    id: "tipos-escopos",
    title: "Tipos de Escopo (Global, Bloco e Função)",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/escopo/tipos-escopos.js",
    description: "Separação entre escopo global, escopo de bloco ({}) e escopo de função.",
    tags: ["Escopo Global", "Escopo de Bloco", "Escopo de Função"]
  },
  // Variáveis
  {
    id: "1-variaveis",
    title: "Declaração com var, let e const",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/variaveis/1-variaveis.js",
    description: "Introdução às três palavras-chave de declaração de variáveis e constantes no JavaScript moderno.",
    tags: ["var", "let", "const"]
  },
  {
    id: "2-1-variaveis",
    title: "Comportamento de var em Blocos",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/variaveis/2-1-variaveis.js",
    description: "Demonstra como var ignora escopo de bloco condicional (if) e sofre hoisting na função.",
    tags: ["var", "Hoisting", "Escopo de Função"]
  },
  {
    id: "2-2-variaveis",
    title: "Comportamento de let em Blocos",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/variaveis/2-2-variaveis.js",
    description: "Demonstra o isolamento de escopo de bloco garantido pela declaração com let.",
    tags: ["let", "Escopo de Bloco", "ES6"]
  },
  {
    id: "2-3-variaveis",
    title: "Comportamento de const em Blocos",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/variaveis/2-3-variaveis.js",
    description: "Demonstra constantes isoladas por escopo de bloco sem colisão de identificadores.",
    tags: ["const", "Escopo de Bloco", "ES6"]
  },
  {
    id: "3-variaveis",
    title: "Mutação de Propriedades em const",
    category: "Escopo e Variáveis",
    file: "tipos-e-variaveis/variaveis/3-variaveis.js",
    description: "Explica a diferença entre reatribuição de referência e mutação interna de objetos e arrays declarados com const.",
    tags: ["const", "Referência", "Arrays & Objetos"]
  },
  // Tipos de Dados
  {
    id: "string",
    title: "Tipo String e Manipulação de Texto",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/string.js",
    description: "Operações essenciais em strings: length, split, replace, slice e substr.",
    tags: ["String", "slice", "replace", "split"]
  },
  {
    id: "number",
    title: "Tipo Number e Conversões Numéricas",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/number.js",
    description: "Formatação de casas decimais (toFixed), conversão para string e parsing (parseFloat / parseInt).",
    tags: ["Number", "toFixed", "parseFloat", "parseInt"]
  },
  {
    id: "boolean",
    title: "Tipo Boolean",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/boolean.js",
    description: "Valores lógicos primitivos true e false e verificação com operador typeof.",
    tags: ["Boolean", "typeof"]
  },
  {
    id: "null",
    title: "Tipo Null",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/null.js",
    description: "Representação de ausência intencional de valor e peculiaridade histórica de typeof null retornar 'object'.",
    tags: ["Null", "typeof", "Primitivos"]
  },
  {
    id: "undefined",
    title: "Tipo Undefined",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/undefined.js",
    description: "Verificação de variáveis declaradas sem atribuição de valor inicial.",
    tags: ["Undefined", "typeof"]
  },
  {
    id: "symbol",
    title: "Tipo Symbol e Reflexão",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/symbol.js",
    description: "Identificadores únicos imutáveis, propriedades não-enumeráveis, Object.getOwnPropertySymbols e Reflect.ownKeys.",
    tags: ["Symbol", "Reflect.ownKeys", "Enums"]
  },
  {
    id: "object",
    title: "Tipo Object (Propriedades Dinâmicas)",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/object.js",
    description: "Acesso e mutação por notação de ponto e colchetes, criação e remoção de propriedades com delete.",
    tags: ["Object", "Dynamic Keys", "delete"]
  },
  {
    id: "object-funcoes",
    title: "Métodos de Object (keys, entries, assign, freeze, seal)",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/object-funcoes.js",
    description: "Inspeção de chaves/entradas, clonagem com Object.assign e travamento com Object.freeze e Object.seal.",
    tags: ["Object.freeze", "Object.seal", "Object.assign"]
  },
  {
    id: "functions",
    title: "Funções e Controle de Execução",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/functions.js",
    description: "Funções tradicionais vs Arrow Functions, propriedades em funções e execução condicional via closures.",
    tags: ["Functions", "Arrow Function", "Higher-Order"]
  },
  {
    id: "functions-contexto",
    title: "Contexto de Execução (this em Arrow vs Function)",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/functions-contexto.js",
    description: "Diferença prática do vínculo de this entre funções tradicionais e arrow functions.",
    tags: ["this", "Contexto", "Arrow Function"]
  },
  {
    id: "array",
    title: "Manipulação Funcional de Arrays (forEach, filter, map, reduce)",
    category: "Tipos de Dados",
    file: "tipos-e-variaveis/tipos/array.js",
    description: "Iteração, filtragem, transformação e redução de coleções de objetos em JavaScript.",
    tags: ["Array", "map", "filter", "reduce"]
  }
];

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  header.split(";").forEach(part => {
    const idx = part.indexOf("=");
    if (idx > 0) {
      const k = part.slice(0, idx).trim();
      const v = part.slice(idx + 1).trim();
      out[k] = decodeURIComponent(v);
    }
  });
  return out;
}

function getSessionUser(req) {
  const cookies = parseCookies(req);
  const sid = cookies.jslab_sid;
  if (!sid || !sessions.has(sid)) return null;
  return sessions.get(sid);
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...extraHeaders
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error("Payload muito grande"));
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

function formatConsoleArg(arg) {
  if (typeof arg === "string") return arg;
  return util.inspect(arg, { depth: 4, colors: false, compact: false });
}

function executeScriptContent(code, filename = "script.js") {
  const logs = [];
  const start = process.hrtime.bigint();

  const customConsole = {
    log: (...args) => logs.push(args.map(formatConsoleArg).join(" ")),
    info: (...args) => logs.push(args.map(formatConsoleArg).join(" ")),
    warn: (...args) => logs.push("[WARN] " + args.map(formatConsoleArg).join(" ")),
    error: (...args) => logs.push("[ERROR] " + args.map(formatConsoleArg).join(" "))
  };

  const sandbox = {
    console: customConsole,
    Symbol,
    Object,
    Array,
    Number,
    String,
    Boolean,
    Reflect,
    Math,
    Date,
    JSON,
    parseInt,
    parseFloat,
    isNaN,
    isFinite
  };

  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, {
      filename,
      timeout: 2000
    });
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    return {
      success: true,
      output: logs.join("\n"),
      lines: logs,
      durationMs: Number(durationMs.toFixed(2))
    };
  } catch (err) {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1e6;
    return {
      success: false,
      output: logs.concat([`Erro: ${err.message}`]).join("\n"),
      error: err.message,
      durationMs: Number(durationMs.toFixed(2))
    };
  }
}

function loadCatalogWithCode() {
  return EXAMPLES_CATALOG.map(item => {
    const absPath = path.join(ROOT_DIR, item.file);
    const code = fs.existsSync(absPath) ? fs.readFileSync(absPath, "utf8") : "";
    return {
      ...item,
      code
    };
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  // Healthcheck
  if (req.method === "GET" && pathname === "/api/health") {
    return sendJson(res, 200, {
      status: "ok",
      app: process.env.APP_NAME || "Introdução ao JavaScript Lab",
      env: process.env.APP_ENV || "local",
      totalExamples: EXAMPLES_CATALOG.length,
      dbConfig: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: Number(process.env.DB_PORT || 3307),
        database: process.env.DB_DATABASE || "introducao_javascript"
      },
      timestamp: new Date().toISOString()
    });
  }

  // Lista de perfis demo para a tela de login
  if (req.method === "GET" && pathname === "/api/auth/demo-users") {
    return sendJson(res, 200, {
      users: DEMO_USERS.map(({ id, name, email, password, role, badge }) => ({
        id,
        name,
        email,
        password,
        role,
        badge
      }))
    });
  }

  // Sessão atual
  if (req.method === "GET" && pathname === "/api/auth/session") {
    const user = getSessionUser(req);
    if (!user) {
      return sendJson(res, 401, { authenticated: false });
    }
    return sendJson(res, 200, { authenticated: true, user });
  }

  // Login
  if (req.method === "POST" && pathname === "/api/auth/login") {
    try {
      const body = await readJsonBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");

      const found = DEMO_USERS.find(
        u => u.email.toLowerCase() === email && u.password === password
      );

      if (!found) {
        return sendJson(res, 401, {
          success: false,
          message: "Credenciais inválidas. Utilize um dos perfis de demonstração listados abaixo."
        });
      }

      const sid = crypto.randomBytes(24).toString("hex");
      const sessionUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        badge: found.badge,
        loginAt: new Date().toISOString()
      };
      sessions.set(sid, sessionUser);

      return sendJson(
        res,
        200,
        { success: true, user: sessionUser },
        {
          "Set-Cookie": `jslab_sid=${sid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
        }
      );
    } catch (err) {
      return sendJson(res, 400, { success: false, message: err.message });
    }
  }

  // Logout
  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const cookies = parseCookies(req);
    if (cookies.jslab_sid) {
      sessions.delete(cookies.jslab_sid);
    }
    return sendJson(
      res,
      200,
      { success: true },
      {
        "Set-Cookie": "jslab_sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
      }
    );
  }

  // API protegida: Catálogo de exemplos
  if (req.method === "GET" && pathname === "/api/examples") {
    const user = getSessionUser(req);
    if (!user) {
      return sendJson(res, 401, { error: "Não autenticado" });
    }
    return sendJson(res, 200, {
      examples: loadCatalogWithCode()
    });
  }

  // API protegida: Executar exemplo ou código customizado
  if (req.method === "POST" && pathname === "/api/examples/run") {
    const user = getSessionUser(req);
    if (!user) {
      return sendJson(res, 401, { error: "Não autenticado" });
    }
    try {
      const body = await readJsonBody(req);
      let codeToRun = body.code;
      let filename = "custom.js";

      if (body.id) {
        const item = EXAMPLES_CATALOG.find(e => e.id === body.id);
        if (!item) {
          return sendJson(res, 404, { error: "Exemplo não encontrado" });
        }
        filename = item.file;
        if (typeof codeToRun !== "string") {
          const absPath = path.join(ROOT_DIR, item.file);
          codeToRun = fs.readFileSync(absPath, "utf8");
        }
      }

      if (typeof codeToRun !== "string" || !codeToRun.trim()) {
        return sendJson(res, 400, { error: "Código vazio ou inválido" });
      }

      const result = executeScriptContent(codeToRun, filename);
      return sendJson(res, 200, {
        id: body.id || "custom",
        filename,
        ...result
      });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // API protegida: Executar todos os exemplos em lote
  if (req.method === "POST" && pathname === "/api/examples/run-all") {
    const user = getSessionUser(req);
    if (!user) {
      return sendJson(res, 401, { error: "Não autenticado" });
    }
    const catalog = loadCatalogWithCode();
    const results = catalog.map(item => {
      const execResult = executeScriptContent(item.code, item.file);
      return {
        id: item.id,
        title: item.title,
        file: item.file,
        category: item.category,
        ...execResult
      };
    });

    return sendJson(res, 200, {
      total: results.length,
      passed: results.filter(r => r.success).length,
      results
    });
  }

  // Rotas de páginas HTML
  if (req.method === "GET" && (pathname === "/login" || pathname === "/login.html")) {
    const user = getSessionUser(req);
    if (user) {
      res.writeHead(302, { Location: "/" });
      return res.end();
    }
    const loginHtml = fs.readFileSync(path.join(PUBLIC_DIR, "login.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(loginHtml);
  }

  if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
    const user = getSessionUser(req);
    if (!user) {
      res.writeHead(302, { Location: "/login" });
      return res.end();
    }
    const indexHtml = fs.readFileSync(path.join(PUBLIC_DIR, "index.html"), "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(indexHtml);
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Rota não encontrada" }));
});

if (require.main === module) {
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor Introdução ao JavaScript Lab rodando em http://localhost:${PORT}`);
  });
}

module.exports = { server, EXAMPLES_CATALOG, executeScriptContent, DEMO_USERS };
