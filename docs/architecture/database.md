# Persistência e banco de dados

## Estado atual

A API declara PostgreSQL e Prisma. A persistência está conectada ao Nest pelo `DatabaseModule`, que fornece e exporta `PrismaRemoteRepository`.

`PrismaRemoteRepository` estende diretamente `PrismaClient`, instancia o adapter `PrismaPg` com a variável `DATABASE_URL` e conecta/desconecta pelos hooks de ciclo de vida do Nest. Atualmente não há outra classe de persistência, contrato independente de ORM, mapper ou camada de acesso a dados no código.

O `AppModule` importa `DatabaseModule`; no entanto, o `AppService` atual não injeta nem utiliza o provider. A conexão é iniciada pelo ciclo de vida do provider ao inicializar o módulo Nest.

## Schema e configuração Prisma

O schema existente está em `apps/api/prisma/schema.prisma`. Ele configura o gerador `prisma-client-js`, declara PostgreSQL e contém atualmente somente o modelo `User` (`id`, `email`, `name`, `createdAt` e `updatedAt`).

Há uma divergência objetiva a resolver antes de depender dos comandos Prisma: `apps/api/prisma.config.ts` ainda aponta `schema` para `src/prisma/schema.prisma` e migrations para `src/prisma/migrations`, mas esses caminhos não existem no estado atual. O schema encontrado está em `prisma/schema.prisma`, e não foi encontrada pasta de migrations. Esta consolidação registra a divergência sem mover arquivos ou alterar a configuração.

## Limites do que está implementado

Os modelos de usuários, atividades, categorias, comentários, histórico e indicadores descritos nos documentos de requisitos/domínio não estão materializados no schema Prisma atual. Da mesma forma, regras de integridade, índices, transações e estratégia de exclusão não devem ser interpretados como implementados apenas por constarem em documentação de produto ou propostas anteriores.

## Pendências

- Alinhar `prisma.config.ts` com o local real do schema e com a localização de migrations, antes de usar os comandos de geração ou migração.
- Definir posteriormente como evoluir schema e migrations nos ambientes do projeto.
- Decidir, durante a definição arquitetural do backend, se e onde abstrair o acesso Prisma.
- Modelar persistência para os conceitos de negócio somente quando essas decisões forem implementadas.
