## Proposta de Projeto

## Plataforma de Gestão de Atividades e Indicadores de Equipe

## 1. Visão geral

O projeto consiste no desenvolvimento de uma plataforma web para gestão de atividades, acompanhamento do trabalho de equipes e análise de indicadores de desempenho operacional.

A solução será direcionada principalmente a gestores de pequenas e médias empresas que precisam acompanhar o trabalho de suas equipes sem depender de planilhas, anotações, grupos de mensagens ou informações descentralizadas.

O sistema terá como usuário principal o gestor da equipe, representado no desafio pelo personagem Ricardo, proprietário de uma empresa com aproximadamente 10 colaboradores.

O desafio original identifica três problemas centrais:

- dificuldade para saber o que realmente está em andamento;

- distribuição desequilibrada de tarefas entre os colaboradores;

- falta de visibilidade antecipada sobre atrasos e prazos;

- ausência de indicadores objetivos para apoiar as reuniões e decisões de gestão.

A proposta é centralizar essas informações em uma única aplicação, permitindo que o gestor registre o trabalho, acompanhe sua execução e transforme os dados operacionais em informações úteis para tomada de decisão.

## 2. Problemática

Atualmente, o trabalho de uma equipe pode estar distribuído entre diferentes meios de comunicação e controle, como:

- planilhas;

- documentos;


- anotações;

- mensagens;

- grupos de WhatsApp;

- comunicação verbal;

- sistemas diferentes e não integrados.

Essa fragmentação dificulta a obtenção de uma visão confiável do estado atual da equipe.

O problema não está apenas em registrar tarefas. O gestor precisa responder perguntas como:

- O que está sendo feito neste momento?

- Quem está responsável por cada atividade?

- Quantas atividades cada pessoa possui?

- Existem colaboradores sobrecarregados?

- Existem colaboradores com pouca ou nenhuma atividade?

- Quais atividades estão próximas do vencimento?

- Quais atividades já estão atrasadas?

- Quantas atividades foram concluídas no período?

- A equipe está conseguindo cumprir os prazos?

- Quais tipos de atividade estão consumindo mais tempo?

- A situação atual melhorou ou piorou em relação às semanas anteriores?

Sem essas informações centralizadas, a gestão tende a ser reativa.

O próprio desafio descreve situações em que o gestor só percebe problemas depois que alguém reclama, uma atividade não é concluída ou um prazo já foi ultrapassado. Também aponta a dificuldade de realizar reuniões baseadas em dados objetivos.

Portanto, o sistema deverá transformar o acompanhamento do trabalho de uma atividade predominantemente reativa e baseada em percepção para uma gestão centralizada, visual e orientada por dados.


## 3. Objetivos do projeto

## 3.1. Objetivo geral

Desenvolver uma plataforma web que permita ao gestor organizar, acompanhar e analisar o trabalho de sua equipe, centralizando atividades, responsáveis, prazos, prioridades e indicadores operacionais.

## 3.2. Objetivos específicos

A solução deverá:

- 1. Centralizar as atividades da equipe.

- 2. Permitir atribuir responsabilidades.

- 3. Registrar prazos e prioridades.

- 4. Permitir acompanhar o estado de cada atividade.

- 5. Identificar atividades atrasadas ou próximas do vencimento.

- 6. Permitir visualizar a distribuição de trabalho entre os colaboradores.

- 7. Disponibilizar indicadores de desempenho operacional.

- 8. Apresentar os indicadores de forma visual.

- 9. Permitir filtrar informações por período, responsável e status.

- 10. Auxiliar o gestor na identificação antecipada de problemas.

- 11. Criar uma base histórica para comparação da evolução da equipe.

## 4. Requisitos funcionais obrigatórios

O desafio apresenta duas necessidades funcionais obrigatórias.

## RF01 — Registro e acompanhamento do trabalho

O gestor deverá conseguir registrar e acompanhar o trabalho da equipe, incluindo atividades, responsáveis e prazos.

A implementação proposta adicionará os seguintes atributos às atividades:

- título;

- descrição;


- responsável;

- status;

- prioridade;

- data de criação;

- prazo;

- data de conclusão;

- categoria/tipo;

- observações.

## Estados sugeridos

As atividades poderão seguir um fluxo semelhante a:

Backlog → A fazer → Em andamento → Em revisão → Concluída

Também deverá existir uma situação específica para atividades canceladas.

A quantidade de estados poderá ser reduzida caso o fluxo real do projeto não necessite de todos eles.

## RF02 — Indicadores para tomada de decisão

O gestor deverá visualizar indicadores que permitam compreender o estado da equipe e apoiar decisões de gestão. O desafio determina que cada indicador deve possuir uma finalidade prática: um número que não produz uma decisão útil deve ser considerado apenas informação decorativa.

A proposta inicial é trabalhar com os seguintes indicadores:

## 1. Atividades em andamento

O que representa: quantidade de atividades atualmente em execução.

Decisão: permite verificar o volume de trabalho ativo e identificar possíveis situações de excesso de atividades simultâneas.

## 2. Atividades atrasadas

O que representa: atividades cujo prazo foi ultrapassado e que ainda não foram concluídas.


Decisão: permite ao gestor identificar rapidamente onde existe risco operacional e priorizar ações de correção.

## 3. Atividades próximas do vencimento

O que representa: atividades cujo prazo está próximo.

Decisão: permite atuar preventivamente antes que uma atividade se transforme em atraso.

## 4. Taxa de conclusão

O que representa: proporção de atividades concluídas em determinado período.

Decisão: permite acompanhar a capacidade de entrega da equipe ao longo do tempo.

## 5. Distribuição de atividades por colaborador

O que representa: quantidade de atividades atribuídas a cada membro da equipe.

Decisão: permite identificar concentração de trabalho e possíveis desequilíbrios na distribuição das atividades.

## 6. Tempo médio de conclusão

O que representa: tempo médio entre o início e a conclusão das atividades.

Decisão: permite identificar mudanças na velocidade de execução e investigar processos que estejam demorando mais do que o esperado.

## 7. Cumprimento de prazos

O que representa: percentual de atividades concluídas dentro do prazo.

Decisão: permite avaliar se os compromissos estabelecidos estão sendo cumpridos e identificar necessidade de revisão de planejamento.

## 5. Dashboard gerencial

O dashboard será o principal ponto de entrada para a visão gerencial.


A proposta é dividir a interface em quatro áreas principais.

## 5.1. Resumo operacional

Cards com os principais indicadores:

- atividades abertas;

- atividades em andamento;

- atividades atrasadas;

- atividades concluídas;

- taxa de conclusão;

- cumprimento de prazos.

## 5.2. Distribuição de trabalho

Um gráfico apresentará a quantidade de atividades atribuídas a cada colaborador.

Exemplo:

Esse indicador não deve ser interpretado isoladamente como medida de produtividade.

A quantidade de atividades pode variar significativamente de acordo com a complexidade de cada tarefa. O objetivo inicial do indicador é fornecer visibilidade sobre distribuição de trabalho, permitindo que o gestor investigue possíveis desequilíbrios.

## 5.3. Evolução temporal

Um gráfico de linha poderá apresentar:

- atividades criadas;


- atividades concluídas;

- atividades atrasadas.

A visualização poderá ser filtrada por:

- últimos 7 dias;

- últimos 30 dias;

- período personalizado.

Isso permitirá comparar a evolução da operação ao longo do tempo.

## 5.4. Alertas operacionais

Uma seção específica apresentará situações que exigem atenção:

- atividades atrasadas;

- atividades próximas do vencimento;

- atividades sem responsável;

- colaboradores com concentração elevada de atividades;

- atividades paradas há muito tempo.

O objetivo é fazer com que o dashboard não seja apenas uma coleção de gráficos, mas uma ferramenta de priorização de ações.

## 6. Gestão de atividades

A tela de atividades será responsável pelo gerenciamento operacional.

## Funcionalidades propostas

## Listagem

A listagem deverá apresentar:

| Campo | Descrição |
| --- | --- |
| Atividade | Nome da atividade |
| Responsável | Colaborador atribuído |


| Status | Estado atual |
| --- | --- |
| Prioridade | Nível de prioridade |
| Prazo | Data limite |
| Situação | Normal, próxima do vencimento ou atrasada |
| Criada em | Data de criação |

## Filtros

O gestor poderá filtrar por:

- status;

- responsável;

- prioridade;

- período;

- situação do prazo;

- categoria.

## Ordenação

A listagem poderá ser ordenada por:

- prazo;

- prioridade;

- data de criação;

- responsável;

- status.

## 7. Visualização Kanban

Como uma das referências apresentadas pelo desafio é o Kanban, a aplicação poderá oferecer uma visualização alternativa das atividades. O desafio cita o Kanban como metodologia para visualizar o fluxo de trabalho e limitar o trabalho em andamento.

A visualização seria organizada em colunas:

| │ A FAZER | │ ANDAMENTO │ REVISÃO | │ CONCLUÍDO │ |
| --- | --- | --- |


| │ Atividade | │ Atividade │ Atividade | │ Atividade │ |   |
| --- | --- | --- | --- |
| │ Atividade | │ Atividade │ | │ Atividade │ |   |
| │ | │ Atividade │ | │ | │ |

│

│

O usuário poderá mover uma atividade entre estados.

Essa abordagem oferece uma visão rápida do fluxo de trabalho e complementa a visão tabular.

## 8. Gestão de colaboradores

O sistema deverá possuir uma área para gerenciamento dos membros da equipe.

Informações sugeridas:

- nome;

- e-mail;

- status;

- cargo/função;

- quantidade de atividades abertas;

- quantidade de atividades concluídas.

A tela também poderá apresentar um resumo individual:

Colaborador: João

Atividades abertas:

Em andamento:

Atrasadas:

Concluídas no período: 12

Essas informações deverão ser utilizadas como instrumento de acompanhamento operacional, e não como avaliação isolada de produtividade.

7

3

1


## 9. Alertas e prevenção de atrasos

Um dos problemas fundamentais apresentados pelo desafio é o gestor descobrir o atraso somente depois que o prazo já foi ultrapassado.

Por isso, a aplicação deverá destacar visualmente:

## Prazo normal

A atividade está dentro do prazo esperado.

## Próximo do vencimento

A atividade está chegando ao prazo limite.

## Atrasada

A atividade ultrapassou o prazo e ainda não foi concluída.

Uma evolução futura poderá incluir notificações automáticas por e-mail ou outros canais.

## 10. Metodologia de gestão adotada

O desafio apresenta diversas metodologias possíveis, incluindo Kanban, Scrum, OKR, Matriz de Eisenhower, PDCA e metas SMART, deixando explícita a possibilidade de combinar ou adaptar essas abordagens.

Para este projeto, propõe-se uma abordagem híbrida baseada principalmente em Kanban + princípios de priorização + acompanhamento por indicadores.

## Kanban

Será utilizado para representar o fluxo operacional:

A fazer → Em andamento → Em revisão → Concluído

A principal vantagem é tornar o trabalho visível.


## Priorização

Cada atividade possuirá uma prioridade:

- baixa;

- média;

- alta;

- crítica.

A prioridade ajudará o gestor a decidir quais atividades precisam de atenção primeiro.

## Indicadores

Os dados gerados pelo fluxo operacional serão utilizados para construir o dashboard.

Dessa maneira:

Atividades

↓

Fluxo de trabalho

↓

Dados históricos

↓

Indicadores

↓

Análise

↓

Decisão do gestor

A proposta não pretende implementar uma metodologia de gestão de maneira rígida. O próprio desafio ressalta que gestão deve considerar o contexto em vez de tratar uma metodologia como uma receita de bolo.

## 11. Arquitetura da solução

A aplicação será desenvolvida utilizando uma arquitetura web separando frontend e backend.


## 12. Stack tecnológica

## Backend

## NestJS

Framework responsável pela construção da API REST.

## Será utilizado para:

- organização dos módulos;

- controllers;

- serviços/use cases;

- validação;


- regras de negócio;

- autenticação e autorização;

- exposição da API.

## TypeScript

Utilizado como linguagem principal do backend.

## Prisma ORM

Responsável pela comunicação entre a aplicação e o banco de dados.

Será utilizado para:

- definição do modelo de dados;

- migrations;

- consultas;

- relacionamentos;

- operações CRUD.

## PostgreSQL

Banco de dados relacional responsável pelo armazenamento das informações da aplicação.

## 13. Frontend

## React

Responsável pela construção da interface da aplicação.

A aplicação será organizada em componentes e páginas, separando as responsabilidades entre apresentação, estado e comunicação com a API.

## TypeScript

Será utilizado para garantir tipagem estática e reduzir erros durante o desenvolvimento.


## Tailwind CSS

Será utilizado para:

- construção da interface;

- responsividade;

- padronização visual;

- espaçamento;

- estados dos componentes;

- criação do dashboard.

## Recharts

Será utilizado para construção dos gráficos do dashboard, incluindo:

- gráficos de barras;

- gráficos de linhas;

- gráficos de distribuição;

- indicadores temporais.

## 14. Modelo de dados inicial

Uma estrutura inicial de domínio poderá ser composta por:

User

├── id

├── name

├── email

├── role

└── createdAt

Task

├── id

├── title

├── description

├── status

├── priority

├── dueDate


├── startedAt

├── completedAt

├── createdAt

├── updatedAt

└── assigneeId

Category

├── id

├── name

└── description

Relacionamentos:

User 1 ───────── N Task

Category 1 ──── N Task

Esse modelo é apenas a base inicial. A modelagem definitiva deverá ser determinada durante a análise dos requisitos e da implementação.

## 15. API

A API deverá seguir o padrão REST.

Exemplos de endpoints:

## Autenticação

POST /auth/login POST /auth/logout

GET

/auth/me

## Usuários

GET

GET

POST

/users

/users/:id

/users


PATCH /users/:id

DELETE /users/:id

## Atividades

GET

/tasks

GET

/tasks/:id

POST

/tasks

PATCH /tasks/:id

DELETE /tasks/:id

## Dashboard

GET /dashboard/summary

GET /dashboard/tasks-by-user

GET /dashboard/tasks-over-time

GET /dashboard/deadlines

Os endpoints de dashboard poderão utilizar consultas agregadas no banco para evitar que o frontend precise realizar cálculos complexos sobre grandes conjuntos de dados.

## 16. Requisitos não funcionais

## RNF01 — Responsividade

A aplicação deverá funcionar adequadamente em:

- desktop;

- notebook;

- tablet;

- dispositivos móveis.

## RNF02 — Performance

As consultas deverão evitar carregamento desnecessário de grandes volumes de dados.


Paginação deverá ser utilizada nas listagens quando necessário.

## RNF03 — Segurança

A API deverá possuir:

- autenticação;

- autorização;

- validação dos dados recebidos;

- proteção dos endpoints;

- tratamento adequado de erros.

## RNF04 — Tipagem

Frontend e backend deverão utilizar TypeScript, reduzindo inconsistências entre as camadas.

## RNF05 — Manutenibilidade

O código deverá ser organizado por domínio/responsabilidade, evitando concentrar regras de negócio nos controllers ou componentes de interface.

## RNF06 — Observabilidade

A aplicação deverá registrar erros relevantes da API e possuir tratamento consistente das falhas de comunicação entre frontend e backend.

## 17. Experiência do usuário

A interface deverá priorizar a rapidez de entendimento.

O gestor deverá conseguir abrir o sistema e responder rapidamente:

"Como está minha equipe agora?"

Por isso, a página inicial deverá apresentar primeiro:

- 1. situação geral;


- 2. problemas que exigem atenção;

- 3. distribuição do trabalho;

- 4. evolução histórica.

A interface deverá evitar excesso de informações e gráficos sem finalidade operacional.

Cada elemento visual deverá responder a uma pergunta de gestão.

## 18. Fluxo principal de utilização

Um fluxo esperado seria:

Login ↓ Dashboard ↓ Identificação de problema ↓ Abertura da lista/Kanban ↓ Análise das atividades ↓ Redistribuição/priorização ↓ Acompanhamento ↓ Conclusão das atividades ↓ Atualização dos indicadores

Exemplo:

O dashboard apresenta 8 atividades atrasadas.

O gestor acessa a lista de atividades atrasadas, identifica que cinco delas pertencem

ao mesmo colaborador e verifica que esse colaborador também possui várias atividades em andamento.

O gestor pode então redistribuir atividades ou alterar prioridades.


Posteriormente, os indicadores poderão demonstrar se a quantidade de atrasos

diminuiu.

O valor da ferramenta está justamente nessa relação:

## indicador → investigação → ação → acompanhamento do resultado.

## 19. Escopo inicial — MVP

Para manter o projeto executável e demonstrável, o MVP deverá priorizar:

## Autenticação

- login;

- sessão do usuário;

- proteção de rotas.

## Usuários

- cadastro;

- edição;

- listagem;

- ativação/desativação.

## Atividades

- criação;

- edição;

- exclusão;

- atribuição;

- alteração de status;

- prioridade;

- prazo;

- filtros;

- ordenação.

## Dashboard

- resumo de indicadores;


- atividades atrasadas;

- próximas do vencimento;

- distribuição por colaborador;

- evolução de atividades;

- taxa de conclusão.

## Kanban

- visualização por status;

- movimentação das atividades.

## 20. Funcionalidades futuras

Após o MVP, algumas funcionalidades poderão ser incorporadas.

## Notificações

Notificar responsáveis quando:

- uma atividade estiver próxima do vencimento;

- uma atividade estiver atrasada;

- uma atividade for atribuída.

## Histórico de atividades

Registrar alterações importantes:

10:32 — João atribuído à atividade

11:15 — Prioridade alterada para Alta

14:20 — Status alterado para Em andamento

## Comentários

Permitir comunicação contextual dentro da própria atividade.


## Anexos

Permitir anexar documentos relacionados à atividade.

## Metas

Adicionar metas de equipe e acompanhamento de resultados.

## Relatórios

Permitir exportação de informações para formatos como CSV ou PDF.

## Permissões avançadas

Criar diferentes níveis de acesso:

- administrador;

- gestor;

- colaborador.

## 21. Sugestões de evolução do produto

Uma evolução importante seria transformar o dashboard em uma ferramenta de gestão preventiva, e não apenas de acompanhamento.

Por exemplo, em vez de simplesmente informar:

"8 atividades estão atrasadas."

o sistema poderia destacar:

"8 atividades estão atrasadas — 5 pertencem ao mesmo responsável."

Isso reduz o esforço necessário para interpretar os dados.

Outra evolução seria utilizar histórico para identificar tendências:

Atrasos


Nesse cenário, o gestor consegue observar se as ações tomadas estão produzindo efeito.

## 22. Critérios de sucesso

O projeto poderá ser considerado funcionalmente bem-sucedido quando o gestor conseguir:

- visualizar todas as atividades da equipe;

- saber quem é responsável por cada atividade;

- identificar atividades atrasadas;

- identificar atividades próximas do vencimento;

- verificar como o trabalho está distribuído;

- acompanhar o volume de atividades concluídas;

- observar a evolução dos indicadores;

- utilizar os indicadores para identificar situações que demandem intervenção.

A qualidade do dashboard não deverá ser medida pela quantidade de gráficos, mas pela capacidade de transformar os dados em informações úteis para decisões.

## 23. Entregáveis

O projeto deverá entregar:

## Backend

- API REST;

- autenticação;

- módulos de usuários;

- módulo de atividades;


- módulo de indicadores/dashboard;

- Prisma schema;

- migrations;

- integração PostgreSQL;

- validação dos dados;

- documentação dos endpoints.

## Frontend

- aplicação React;

- autenticação;

- dashboard;

- gestão de atividades;

- visualização Kanban;

- gestão de usuários;

- filtros;

- gráficos;

- interface responsiva.

## Documentação

- README;

- descrição da arquitetura;

- instruções para execução;

- documentação da metodologia escolhida;

- descrição dos indicadores;

- documentação da API;

- instruções de configuração do ambiente.

O desafio original também determina que a escolha da metodologia seja explicada no README, assim como a finalidade de cada indicador utilizado.

## 24. Conclusão

A proposta busca resolver o problema central apresentado pelo desafio: a falta de visibilidade sobre o trabalho de uma equipe e a ausência de informações objetivas para orientar a gestão.


A plataforma concentrará o fluxo operacional em um único ambiente e transformará os registros das atividades em indicadores gerenciais.

A solução será construída utilizando:

## Backend

- NestJS

- TypeScript

- Prisma ORM

- PostgreSQL

## Frontend

- React

- TypeScript

- Tailwind CSS

- Recharts

O conceito central do projeto será:

## Registrar o trabalho → tornar o trabalho visível → gerar indicadores → identificar problemas → apoiar decisões.

Dessa forma, a ferramenta não será apenas um sistema de cadastro de tarefas. A

proposta é construir uma plataforma de gestão operacional orientada por dados, na qual cada informação apresentada ao gestor tenha uma finalidade prática.
