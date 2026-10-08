# Visão geral da arquitetura atual

## Estrutura do repositório

O projeto é um monorepo com pnpm workspaces e Turbo:

```text
apps/
  api/       NestJS, TypeScript, Prisma
  web/       React, TypeScript, Vite
packages/
  contracts/ pacote workspace declarado
```

O workspace inclui `apps/*` e `packages/*`. O Turbo orquestra scripts de build, desenvolvimento, lint e typecheck conforme as tarefas declaradas no repositório.

## Estado das aplicações

### API

`apps/api` é atualmente um bootstrap NestJS. `AppModule` configura o módulo global de configuração e importa `DatabaseModule`; o controller expõe apenas `GET /` com uma resposta de exemplo. A integração de persistência está em `src/database`, mas o service HTTP atual não a utiliza. Veja [backend.md](./backend.md).

### Web

`apps/web` é uma aplicação React + Vite que ainda mantém o scaffold inicial. Não há funcionalidades do produto nem estrutura por domínio implementadas. A organização descrita em [frontend.md](./frontend.md) permanece uma proposta, não a estrutura atual.

### Contratos compartilhados

`@gestao-equipes/contracts` está declarado como pacote workspace e como dependência da API e Web. Seu `package.json` exporta `./src/index.ts`, mas esse arquivo/source não existe no estado atual. A existência do pacote não significa que já haja contratos compartilhados implementados ou consumidos.

### Persistência

O backend registra `PrismaRemoteRepository` pelo `DatabaseModule`; a classe estende `PrismaClient` e usa `PrismaPg`. O schema PostgreSQL atual contém somente `User`. A configuração Prisma aponta para caminhos antigos inexistentes; os detalhes estão em [database.md](./database.md).

## Fluxo efetivamente implementado

```text
Cliente HTTP
  ↓ GET /
AppController
  ↓
AppService
  ↓
Resposta de exemplo
```

O `DatabaseModule` é carregado como parte da inicialização Nest, mas o fluxo HTTP acima não consulta o banco. Não há implementação atual de autenticação, autorização ou funcionalidades de domínio.

## Classificação do estado

- **Implementado:** monorepo pnpm/Turbo; aplicações NestJS e React/Vite; bootstrap HTTP; provider Prisma registrado no Nest.
- **Declarado, mas não materializado:** conteúdo exportado por `packages/contracts`; funcionalidades de produto e modelos de domínio além de `User`.
- **Provisório:** controller/service de exemplo e organização mínima atual do backend.
- **Em aberto:** arquitetura definitiva do backend, organização das features, abstrações de persistência e contratos API/Web.

Os documentos de requisitos e domínio continuam descrevendo o produto pretendido; eles não indicam que essas funcionalidades já estejam implementadas.
