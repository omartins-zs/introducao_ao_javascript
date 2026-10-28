#!/bin/sh
set -e

echo "=============================================================="
echo "🚀 Inicializando Container: Introdução ao JavaScript Lab"
echo "=============================================================="

if [ ! -f /app/.env ] && [ -f /app/.env.example ]; then
  echo "📄 Criando arquivo .env a partir de .env.example..."
  cp /app/.env.example /app/.env
fi

echo "🧪 Executando verificação rápida dos 26 exemplos JavaScript..."
node /app/tests/run-all.js

echo "🌐 Iniciando servidor Node.js na porta ${PORT:-3000}..."
exec node /app/src/server.js
