# Persistência e banco de dados

> Atualizado em: 2026-10-13

## Estado atual

A API declara PostgreSQL e Prisma. A persistência está conectada ao Nest pelo `DatabaseModule`, que fornece e exporta `PrismaRemoteRepository`.

`PrismaRemoteRepository` estende diretamente `PrismaClient`, instancia o adapter `PrismaPg` com a variável `DATABASE_URL` e conecta/desconecta pelos hooks de ciclo de vida do Nest. Atualmente não há outra classe de persistência, contrato independente de ORM, mapper ou camada de acesso a dados no código.

O `AppModule` importa `DatabaseModule`; no entanto, o `AppService` atual não injeta nem utiliza o provider. A conexão é iniciada pelo ciclo de vida do provider ao inicializar o módulo Nest.

## Schema e configuração Prisma

O schema oficial está em `apps/api/prisma/schema.prisma`. Ele configura o gerador `prisma-client-js`, declara PostgreSQL e contém atualmente somente o modelo `User` (`id`, `email`, `name`, `createdAt` e `updatedAt`).

`apps/api/prisma.config.ts` já aponta `schema` para `prisma/schema.prisma` e `migrations.path` para `prisma/migrations`, caminhos relativos ao pacote da API. O schema está presente. A pasta de migrations ainda não existe e será criada quando a primeira migration for gerada; sua ausência atual não é uma inconsistência na configuração.

Para as implementações futuras, os contratos de repositório serão classes abstratas usadas como tokens de injeção, com implementações Prisma concretas. A organização e os limites dessa decisão estão descritos em [backend.md](./backend.md); assinaturas, transações e outros detalhes de persistência continuam em aberto.

## Limites do que está implementado

Os modelos de usuários, atividades, categorias, comentários, histórico e indicadores descritos nos documentos de requisitos/domínio não estão materializados no schema Prisma atual. Da mesma forma, regras de integridade, índices, transações e estratégia de exclusão não devem ser interpretados como implementados apenas por constarem em documentação de produto ou propostas anteriores.

## Pendências

- Definir posteriormente a estratégia de evolução e aplicação do schema e das migrations nos ambientes do projeto.
- Definir assinaturas dos contratos, estratégias de transação e outros detalhes de persistência quando necessários.
- Modelar persistência para os conceitos de negócio somente quando essas decisões forem implementadas.
