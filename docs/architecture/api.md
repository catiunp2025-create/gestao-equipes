# API HTTP atual

> Atualizado em: 2026-10-14

## Estado implementado

A API está em `apps/api` e usa NestJS. O único endpoint implementado no código atual é:

| Método | Caminho | Comportamento |
|---|---|---|
| `GET` | `/` | Retorna `Hello World!` por meio de `AppController` e `AppService`. |

Não há atualmente rotas de autenticação, usuários, atividades, categorias, Kanban ou indicadores, nem contratos HTTP compartilhados materializados.

## Inicialização e comportamento HTTP

`main.ts` cria a aplicação Nest e:

- registra `ValidationPipe` global com `whitelist`, `forbidNonWhitelisted` e `transform`;
- habilita CORS com origem `*` e os métodos GET, HEAD, PUT, PATCH, POST, DELETE e OPTIONS;
- ativa shutdown hooks;
- escuta a variável `PORT` ou, se ausente, a porta `3000`.

`AppModule` registra `ConfigModule.forRoot` como global e importa `DatabaseModule`. O provider Prisma é inicializado pelo Nest, mas o endpoint atual não o consulta.

## Contratos e funcionalidades não implementados

Embora `@gestao-equipes/contracts` esteja declarado como dependência workspace, o arquivo exportado pelo pacote não existe e não há contratos consumidos pelo endpoint atual. As políticas de autenticação, autorização, paginação, filtros e versionamento descritas em requisitos ou propostas continuam sem implementação HTTP correspondente. O padrão arquitetural futuro para erros e exceções está registrado em [backend.md](./backend.md); ele ainda não está implementado na API.

Esta página registra o estado presente; formato REST por recurso, contrato HTTP definitivo de erros e demais decisões de API serão detalhados quando os endpoints correspondentes forem implementados.
