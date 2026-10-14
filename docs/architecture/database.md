# Persistência e banco de dados

> Atualizado em: 2026-10-14

## Estado atual

A API declara PostgreSQL e Prisma. A persistência está conectada ao Nest pelo `DatabaseModule`, que fornece e exporta `PrismaRemoteRepository`.

`PrismaRemoteRepository` estende diretamente `PrismaClient`, instancia o adapter `PrismaPg` com a variável `DATABASE_URL` e conecta/desconecta pelos hooks de ciclo de vida do Nest. Atualmente não há outra classe de persistência, contrato independente de ORM, mapper ou camada de acesso a dados no código.

O `AppModule` importa `DatabaseModule`; no entanto, o `AppService` atual não injeta nem utiliza o provider. A conexão é iniciada pelo ciclo de vida do provider ao inicializar o módulo Nest.

## Schema e configuração Prisma

O schema oficial está em `apps/api/prisma/schema.prisma`. Ele configura o gerador `prisma-client-js`, declara PostgreSQL e define os enums `UserRole`, `ActivityStatus` e `ActivityPriority`, além dos modelos `User`, `Category` e `Activity`. Os identificadores e as chaves estrangeiras são declarados como `String` com `@db.Uuid`, alinhados ao tipo nativo `uuid` do PostgreSQL; e-mail de usuário e nome de categoria têm unicidade global.

`apps/api/prisma.config.ts` já aponta `schema` para `prisma/schema.prisma` e `migrations.path` para `prisma/migrations`, caminhos relativos ao pacote da API. O schema está presente. A pasta de migrations ainda não existe e será criada quando a primeira migration for gerada; sua ausência atual não é uma inconsistência na configuração.

`Activity.categoryId` é obrigatório e `Activity.assigneeId` é opcional. `Activity.dueDate` usa `DateTime? @db.Date` para persistir uma data civil PostgreSQL sem horário; embora o Prisma o represente como `DateTime` no TypeScript, conversões não devem deslocar o dia por fuso horário. `startedAt`, `completedAt`, `createdAt`, `updatedAt` e `archivedAt` representam data e hora. O schema inicial não contém `Comment`, nem índices adicionais ou políticas explícitas de cascata.

O schema define estrutura e restrições declarativas, mas não implementa regras que dependem do estado de outras entidades: validar usuário ativo ao atribuir, validar categoria ativa ao criar ou mudar categoria, impedir exclusão física de usuários/categorias no fluxo normal e permitir exclusão definitiva de atividade somente após arquivamento são responsabilidades da aplicação. Desativar usuário não limpa atribuições existentes; categoria desativada continua relacionada às atividades; editar outros campos de atividade não exige trocar uma categoria que ficou inativa. O arquivamento usa `archivedAt` de forma independente do status, e a restrição de exclusão de atividade arquivada não deve ser simulada por uma constraint no banco.

Para as implementações futuras, os contratos de repositório serão classes abstratas usadas como tokens de injeção, com implementações concretas responsáveis pelos detalhes de persistência em Prisma e PostgreSQL. Isso não significa que todos os contratos existentes já sejam independentes do Prisma: o provider atual expõe o cliente Prisma, e o grau de isolamento dos contratos será validado ao definir suas assinaturas. As decisões e orientações de persistência para implementações futuras estão registradas neste documento; a organização geral do backend está em [backend.md](./backend.md).

## Padrões para implementações futuras

As orientações desta seção não descrevem componentes já implementados. O backend começa com um repositório principal por módulo. Repositórios adicionais só devem ser criados quando uma necessidade concreta justificar responsabilidades ou tipos de consulta distintos; não se criam repositórios preventivamente para cada entidade, operação ou endpoint. Consultas de leitura especializadas podem ter repositórios próprios quando complexidade, agregações ou necessidades de consulta justificarem essa separação. O módulo `indicators`, responsável por indicadores e dados agregados do dashboard, pode ter um repositório especializado para essas consultas. Essa especialização não deve contornar limites entre módulos nem duplicar regras de negócio.

Outros módulos consomem as capacidades públicas do módulo proprietário por meio de seus casos de uso públicos, não acessando diretamente seus repositórios ou implementações Prisma.

### Transações

A coordenação da transação pertence ao caso de uso que orquestra uma operação composta por múltiplas alterações que precisam ser atômicas. Nem todo caso de uso precisa abrir uma transação: ela é necessária quando a atomicidade da operação exigir. Se múltiplos repositórios participarem, todos devem usar o mesmo contexto transacional. Uma falha na operação deve impedir a confirmação parcial das alterações abrangidas pela transação; repositórios participantes não devem abrir transações independentes. Transações não devem permanecer abertas durante chamadas externas de rede, interação com usuários ou processamento demorado fora da seção crítica.

A abstração definida para implementação futura é um contrato `TransactionManager` e uma implementação `PrismaTransactionManager`. O contrato deverá permitir executar uma função dentro de uma transação sem exigir que o caso de uso conheça a API concreta do Prisma; a implementação concreta deverá abrir e coordenar a transação com `$transaction`. Repositórios Prisma usarão o client transacional recebido para participar da mesma transação, ou o client padrão quando a operação não estiver dentro de uma. O caso de uso define as operações que compõem a unidade atômica e coordena sua execução. Conceitualmente, o caso de uso chama `runInTransaction`, a implementação Prisma disponibiliza o contexto à função, e o sucesso ou falha dessa função determina a confirmação ou reversão. Esse fluxo descreve o comportamento esperado, não uma assinatura definitiva.

O contexto transacional deve ser conceitualmente separado dos dados de negócio. Não se deve incorporar client ou contexto de persistência a DTOs de criação, atualização ou contratos equivalentes; se necessário, deve-se preferir uma opção ou parâmetro próprio. A forma exata de transportar esse contexto ainda será definida durante a implementação. Os casos de uso não devem depender diretamente de `Prisma.TransactionClient`; o nível de isolamento dos contratos abstratos em relação ao Prisma será validado ao implementar a solução. A implementação deverá reduzir, na medida permitida pelo contrato adotado, o risco de misturar clients ou contextos incompatíveis. Não se decide agora pela criação de um `TransactionContext` abstrato adicional.

`TransactionManager`, `PrismaTransactionManager`, qualquer contexto transacional, tipos compartilhados e arquivos relacionados **não devem ser criados agora**. Esses componentes serão implementados quando surgir a primeira operação concreta que exija uma transação. Nesse momento, o responsável deverá revisar o uso do Prisma e os contratos de repositório existentes antes de definir as assinaturas finais, sem antecipar abstrações além das necessárias.

### Integridade, concorrência e atomicidade

Para cada operação, os desenvolvedores deverão avaliar a documentação oficial e os riscos relevantes para escolher a estratégia técnica adequada. Ela pode envolver transações, atualizações condicionais, restrições no banco, controle de versão ou outras técnicas. A escolha deve preservar as invariantes e regras de negócio, avaliar condições de corrida e não depender exclusivamente de verificações prévias que possam ficar obsoletas antes da gravação. Alterações que, pelas regras de negócio, precisam ocorrer em conjunto devem ser atômicas. Não há um mecanismo universal de concorrência definido, o uso de transações não resolve por si só todo problema de integridade e a solução não deve ser mais complexa do que o caso exige.

### Decisões ainda a definir na implementação

- Assinaturas definitivas dos contratos e métodos de repositório.
- Representação e transporte do contexto transacional e eventual necessidade de um contexto abstrato adicional.
- Estratégia de concorrência e integridade apropriada a cada operação.
- Organização definitiva de repositórios especializados.
- Detalhes adicionais de isolamento e configuração das transações Prisma.

## Limites do que está implementado

Os modelos iniciais de usuário, categoria e atividade estão definidos no schema Prisma, mas ainda não há migrations nem fluxos de negócio que os utilizem. Comentários, histórico e indicadores não fazem parte deste schema. Regras de integridade que dependem de operações da aplicação não devem ser consideradas implementadas apenas por constarem no schema ou na documentação.

## Pendências

- Definir posteriormente a estratégia de evolução e aplicação do schema e das migrations nos ambientes do projeto.
- Modelar persistência para os conceitos de negócio somente quando essas decisões forem implementadas.
