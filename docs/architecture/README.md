# Arquitetura

> Atualizado em: 2026-10-13

## Objetivo

Esta documentação registra a estrutura arquitetural que existe atualmente no repositório. Distingue código implementado, scaffolds provisórios, componentes apenas declarados e decisões que continuam em aberto. Não define a arquitetura final do backend.

## Relação com Requirements e Domain

```text
Requirements
  ↓
Domain
  ↓
Architecture
  ↓
Implementation
```

- Requirements descreve o que o sistema precisa fazer.
- Domain descreve como os conceitos de negócio se comportam.
- Architecture registra a organização técnica existente.
- Implementation materializa os requisitos na estrutura do repositório.

Requisitos e conceitos de domínio podem descrever o produto desejado sem que suas funcionalidades já estejam implementadas.

## Documentos disponíveis

- [overview.md](./overview.md): visão geral do monorepo e estado das aplicações.
- [backend.md](./backend.md): estrutura NestJS e estado implementado, decisões iniciais para o backend e questões ainda em aberto.
- [frontend.md](./frontend.md): scaffold web atual e propostas anteriormente registradas.
- [database.md](./database.md): provider Prisma, schema e configuração existente.
- [api.md](./api.md): endpoint e inicialização HTTP atuais.

## Estado arquitetural consolidado

### Implementado

- monorepo com pnpm workspaces e Turbo;
- backend em Node.js 24, NestJS e TypeScript;
- frontend em React, TypeScript e Vite;
- persistência declarada como PostgreSQL/Prisma;
- `DatabaseModule` que registra e exporta `PrismaRemoteRepository`;
- schema Prisma atual com o modelo `User`;
- `prisma.config.ts` configurado para `prisma/schema.prisma` e `prisma/migrations`; a pasta de migrations será criada quando a primeira migration for gerada;
- execução ESM no backend, com imports relativos emitidos com extensão `.js`.

### Declarado, provisório ou inconsistente

- `@gestao-equipes/contracts` está declarado como pacote workspace, mas o arquivo `src/index.ts` indicado pelo seu `package.json` não existe;
- API e Web ainda estão em scaffolds; funcionalidades do produto não estão implementadas.

### Decisões em aberto

- política de dependências e comunicação entre módulos, convenções finais e detalhes de persistência do backend;
- contratos HTTP e compartilhamento de tipos;
- decisões de produto pendentes nos documentos de requisitos e domínio.

## Registro da arquitetura atual

Os documentos distinguem o que existe hoje das decisões que orientarão implementações futuras. Propostas anteriores são tratadas como referências, não como decisões já implementadas; as decisões iniciais de arquitetura do backend estão registradas em [backend.md](./backend.md).

## Leitura recomendada

- Para a estrutura geral, consulte [overview.md](./overview.md).
- Para o backend, leia [backend.md](./backend.md).
- Para a camada web, consulte [frontend.md](./frontend.md).
- Para persistência, leia [database.md](./database.md).
- Para o endpoint e inicialização HTTP, consulte [api.md](./api.md).
