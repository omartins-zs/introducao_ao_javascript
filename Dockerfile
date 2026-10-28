# ==============================================================================
# Stage 1: Base & Validação de Dependências
# ==============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm cache clean --force

COPY src ./src
COPY public ./public
COPY historia-conceitos ./historia-conceitos
COPY tipos-e-variaveis ./tipos-e-variaveis
COPY tests ./tests
COPY .env.example ./.env.example

# Valida todos os 26 scripts durante o build
RUN node tests/run-all.js

# ==============================================================================
# Stage 2: Runtime Otimizado de Produção / Desenvolvimento
# ==============================================================================
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000

COPY --from=builder /app /app
COPY docker/scripts/start-app.sh /usr/local/bin/start-app.sh

RUN sed -i 's/\r$//' /usr/local/bin/start-app.sh && \
    chmod +x /usr/local/bin/start-app.sh

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["/usr/local/bin/start-app.sh"]
