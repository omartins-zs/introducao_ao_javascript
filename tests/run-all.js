const fs = require("fs");
const path = require("path");
const { EXAMPLES_CATALOG, executeScriptContent } = require("../src/server");

const ROOT_DIR = path.join(__dirname, "..");

console.log("==============================================================");
console.log("🧪 VALIDAÇÃO AUTOMATIZADA - INTRODUÇÃO AO JAVASCRIPT (26 SCRIPTS)");
console.log("==============================================================\n");

let passed = 0;
let failed = 0;

for (const item of EXAMPLES_CATALOG) {
  const absPath = path.join(ROOT_DIR, item.file);
  if (!fs.existsSync(absPath)) {
    console.error(`❌ [FALHA] Arquivo ausente: ${item.file}`);
    failed++;
    continue;
  }

  const code = fs.readFileSync(absPath, "utf8");
  const result = executeScriptContent(code, item.file);

  if (result.success && result.output.trim().length > 0) {
    console.log(`✅ [OK] ${item.file} (${result.durationMs}ms)`);
    passed++;
  } else {
    console.error(`❌ [ERRO] ${item.file}: ${result.error || "Saída vazia"}`);
    failed++;
  }
}

console.log("\n--------------------------------------------------------------");
console.log(`Resumo: ${passed} aprovados | ${failed} falhas | Total: ${EXAMPLES_CATALOG.length}`);
console.log("--------------------------------------------------------------");

if (failed > 0) {
  process.exit(1);
}
