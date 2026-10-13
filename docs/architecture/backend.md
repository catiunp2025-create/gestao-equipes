# Backend

> Atualizado em: 2026-10-13

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

## Arquitetura inicial pretendida

As decisões abaixo orientam implementações futuras e não descrevem módulos já existentes. Inicialmente, a API permanecerá uma aplicação NestJS organizada como **monólito modular por funcionalidades**; esta decisão não introduz microsserviços nem outras divisões de implantação.

### Divisão funcional

- **`auth`**: autenticação e responsabilidades relacionadas à sessão.
- **`users`**: gerenciamento de usuários.
- **`activities`**: gerenciamento de atividades e suas operações de negócio, incluindo atribuição, prioridades, prazos e transições de status.
- **`categories`**: gerenciamento de categorias e suas regras.
- **`indicators`**: consultas agregadas, indicadores e informações consumidas pelo dashboard.
- **`database`**: integração com Prisma e PostgreSQL.
- **`common`**: componentes genuinamente compartilhados e transversais, quando necessários.

O dashboard não é um módulo funcional independente nesta divisão inicial: suas consultas e indicadores pertencem a `indicators`. O Kanban utiliza as operações de `activities` e não duplica as regras de transição de status.

### Organização interna de referência

A organização abaixo ilustra como um módulo de funcionalidade, como `users`, poderá ser estruturado. É uma referência conceitual, não uma convenção rígida de nomenclatura ou uma lista de arquivos obrigatória:

```text
users/
├── dto/
│   ├── requests/
│   └── responses/
├── usecases/
│   ├── create-user.usecase.ts
│   ├── update-user.usecase.ts
│   └── ...
├── users.controller.ts
├── users.mapper.ts
├── users.repository.ts
├── users.prisma-repository.ts
├── users.module.ts
└── users.rules.ts
```

- **`dto/requests/`**: DTOs dos dados recebidos pela API, com as validações pertinentes.
- **`dto/responses/`**: DTOs dos formatos de resposta pública, quando necessários.
- **`usecases/`**: um caso de uso para cada operação de negócio com responsabilidade própria, orquestrando seus passos e aplicando as regras pertinentes. A relação não é necessariamente de um para um com endpoints: endpoints distintos podem compartilhar um caso de uso quando representam a mesma operação de negócio.
- **`*.controller.ts`**: camada HTTP; recebe requisições, invoca casos de uso e traduz resultados para respostas HTTP.
- **`*.mapper.ts`**: transformação entre resultados da aplicação e formatos de resposta pública, quando necessária.
- **`*.repository.ts`**: contrato de persistência consumido pela aplicação.
- **`*.prisma-repository.ts`**: implementação desse contrato com Prisma.
- **`*.module.ts`**: configuração do módulo NestJS e registro de seus componentes e dependências.
- **`*.rules.ts`**: regras explícitas do módulo que precisem ser isoladas ou reutilizadas, quando aplicável.

Os componentes devem ser criados somente quando as responsabilidades reais do módulo os justificarem; não se criam arquivos vazios nem se exige que todo módulo tenha todos esses componentes. Um diretório `utils/` é permitido apenas quando houver justificativa concreta para cada arquivo, correspondente à sua responsabilidade e ao escopo de reutilização; não deve servir como depósito genérico.

### Casos de uso e organização das regras

Cada operação de negócio com responsabilidade própria deve ter seu caso de uso, de modo que sua lógica possa ser localizada, alterada e testada independentemente. A quantidade de endpoints não determina a quantidade de casos de uso: endpoints diferentes podem invocar o mesmo caso de uso quando expressarem a mesma operação.

Casos de uso coordenam a operação. Regras reutilizáveis devem ter implementação centralizada, para evitar duplicação entre casos de uso e entre formas de interação, incluindo as operações consumidas pelo Kanban. Regras específicas de uma única operação podem permanecer no caso de uso correspondente.

A organização das regras deve acompanhar suas responsabilidades, coesão e necessidade de reutilização:

- Prefira componentes separados, como `activity-status.rules.ts`, quando houver responsabilidades distintas, complexidade relevante ou necessidade de reutilização independente.
- Um arquivo único `*.rules.ts` é adequado quando as regras forem poucas, coesas e fáceis de compreender e testar juntas.
- A separação é uma recomendação a aplicar conforme a necessidade; não crie arquivos ou abstrações apenas para cumprir uma convenção.

Como critério de revisão, a estrutura deve permitir localizar, compreender e testar uma regra sem navegar por responsabilidades não relacionadas. Considere coesão, responsabilidades, testabilidade e facilidade de manutenção ao decidir se componentes devem permanecer juntos ou ser separados.

### Contratos e limites de responsabilidade

O contrato de cada repositório será definido por uma **classe abstrata**, usada também como token de injeção de dependência no NestJS. A aplicação depende desse contrato e a implementação Prisma fornece a persistência concreta. Assinaturas de métodos, estratégia de transações e outros detalhes não estão definidos aqui.

- Controllers não concentram regras de negócio.
- Implementações Prisma não decidem permissões nem centralizam regras de domínio.
- Casos de uso dependem dos contratos necessários, sem acoplamento direto à implementação Prisma.
- Regras específicas de uma operação podem permanecer no caso de uso correspondente; regras reutilizadas devem ser isoladas explicitamente e de forma proporcional à sua complexidade.
- A mesma lógica de negócio não deve ser duplicada entre diferentes formas de interação com a API, incluindo as operações consumidas pelo Kanban.
- Abstrações e camadas são introduzidas quando houver responsabilidade real a separar; não se impõe uma estrutura integral de Clean Architecture por convenção.

## Estado experimental e decisões em aberto

- A API e o provider de persistência ainda fazem parte do bootstrap inicial; o repository não é utilizado por um fluxo HTTP atual.
- Política completa de dependências e comunicação entre módulos, incluindo importação de componentes internos e exposição de contratos entre módulos.
- Forma de injeção dos repositórios e demais dependências dos casos de uso além do uso das classes abstratas como tokens.
- Convenções finais de nomenclatura e estrutura de todos os módulos.
- Estratégias de transação e outros detalhes de persistência ainda não definidos.

As decisões iniciais registradas nesta seção não afirmam que a arquitetura futura esteja implementada nem encerram as questões listadas como abertas.
