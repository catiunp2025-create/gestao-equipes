# Backend

## Estado atual

O backend está em `apps/api`, usa Node.js 24, TypeScript e NestJS 12, e ainda é um bootstrap mínimo. A estrutura implementada em `src/` é:

```text
src/
  app.controller.ts
  app.controller.spec.ts
  app.module.ts
  app.service.ts
  main.ts
  database/
    database.module.ts
    repositories/
      PrismaRemoteRepository.ts
```

Não existem atualmente módulos de autenticação, usuários, atividades, categorias, Kanban ou indicadores.

## Bootstrap e composição

- `main.ts` cria a aplicação Nest, configura um `ValidationPipe` global, habilita CORS para qualquer origem, ativa shutdown hooks e escuta `PORT` ou a porta `3000`.
- `AppModule` registra `ConfigModule.forRoot` como global, importa `DatabaseModule` e registra `AppController` e `AppService`.
- `AppController` expõe somente `GET /`, que retorna a resposta de exemplo do `AppService`.
- `AppService` atualmente retorna `Hello World!`; não injeta nem chama o componente Prisma.

Essa composição descreve apenas o código existente; não representa ainda os fluxos e funcionalidades de negócio do produto.

## Persistência no Nest

`DatabaseModule` registra `PrismaRemoteRepository` como provider e o exporta. O provider é uma classe que estende `PrismaClient`, configura `PrismaPg` com `DATABASE_URL` e implementa os hooks Nest para conectar e desconectar. Não há uma interface de repositório nem outra implementação de persistência no código atual.

O nome `PrismaRemoteRepository` não implica, por si só, uma abstração independente do Prisma: a classe expõe o próprio cliente Prisma. O módulo está conectado ao `AppModule`, mas o `AppService` não consome o provider atualmente.

## Build e runtime

O pacote da API declara `"type": "module"`. O TypeScript usa `module: "preserve"` e `moduleResolution: "bundler"`; o build Nest compila `src/` para `dist/` e remove o diretório de saída anterior. O script de produção executa `node dist/main`.

Imports relativos entre arquivos TypeScript são escritos com a extensão `.js`, preservada no JavaScript emitido. Por exemplo, `DatabaseModule` importa `./repositories/PrismaRemoteRepository.js`, e o artefato emitido é `dist/database/repositories/PrismaRemoteRepository.js`. A extensão explícita é necessária para a resolução ESM do Node em runtime.

## Estado experimental e decisões em aberto

- A API e o provider de persistência ainda fazem parte do bootstrap inicial; o repository não é utilizado por um fluxo HTTP atual.
- Organização definitiva de módulos e responsabilidades de negócio permanece por decidir.
- O grau de abstração sobre o Prisma e a futura organização da persistência permanecem em aberto.

Esta documentação não prescreve camadas ou padrões para a implementação futura.
