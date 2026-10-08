# Frontend Architecture

## 1. Decisão existente

O frontend já está definido como:

- React;
- Vite;
- TypeScript;
- pacote workspace `@gestao-equipes/web`.

A intenção do projeto também menciona:

- Tailwind CSS;
- Recharts;
- Motion.

No estado atual do repositório, o app web ainda está em formato padrão de template Vite, sem a organização funcional do produto implementada de fato.

## 2. Objetivo arquitetural

A arquitetura do frontend deve manter a camada de apresentação separada do domínio e da comunicação com a API. O frontend deve ser responsável principalmente por:

- renderizar telas;
- gerir interação do usuário;
- coletar dados de formulários;
- tratar estados de loading, empty e error;
- consumir a API;
- apresentar indicadores e Kanban;
- respeitar regras de permissões e UX, sem duplicar a lógica de negócio.

## 3. Estrutura proposta

A organização mais adequada para este projeto, dado o escopo e a intenção de aprendizagem, é uma estrutura por domínio/feature, com camadas concisas:

```text
apps/web/src/
  app/
  features/
    auth/
    users/
    activities/
    categories/
    dashboard/
    kanban/
  components/
  hooks/
  lib/
  services/
  styles/
  types/
  routes/
```

Essa estrutura é uma proposta inicial e está alinhada com o domínio documentado em `docs/domain`.

## 4. Por que uma organização por feature

A organização por feature é mais apropriada neste projeto do que uma estrutura puramente por tipo de arquivo por dois motivos principais:

1. o domínio é forte e bem segmentado;
2. o projeto tem objetivos de educação, colaboração e manutenção.

Com isso, cada feature fica mais fácil de entender, testar e revisar.

## 5. Camadas sugeridas

### 5.1 App

Responsável pela camada de bootstrap e navegação geral.

- roteamento;
- layout global;
- providers;
- autenticação da sessão no nível de aplicação;
- aplicação de estilos globais.

### 5.2 Features

Cada feature reúne tudo relacionado a um mesmo contexto do negócio:

- auth;
- users;
- activities;
- categories;
- dashboard;
- kanban.

Essa organização favorece coesão e reduz o acoplamento entre áreas distintas.

### 5.3 Components

Componentes genéricos reutilizáveis:

- buttons;
- inputs;
- cards;
- tables;
- charts wrappers;
- modals;
- lists.

### 5.4 Hooks

Hook local para:

- dados de API;
- autenticação;
- filtros;
- formulários;
- debouncing e ações de UI.

### 5.5 Services

Aqui ficam os adaptadores internos para comunicação externa com a API, sem misturar regras de negócio da interface.

### 5.6 Lib

Utilitários compartilhados:

- formatadores;
- helpers de data;
- normalização de respostas;
- utilitários de validação local.

## 6. Estado no frontend

### Estado local

O estado local deve ser usado para:

- abrir/fechar modais;
- formularários;
- filtros da página;
- toggles de interface.

### Estado de servidor

O estado de servidor deve ser tratado por hooks específicos ou por uma camada de dados da interface, sem que o componente diretamente acesse a API de forma dispersa.

### Estado global

No estado atual do projeto, não há justificativa clara para um estado global sofisticado como Redux, Zustand ou semelhante.

Recomendação inicial:

- React Context para autenticação e sessão;
- hooks locais para dados de feature;
- estado de formulário em local state.

### Por que não forçar biblioteca global

- o projeto ainda está em fase inicial;
- o domínio de UI é amplo, mas não exige um ecossistema de gerenciamento de estado pesado;
- a complexidade de manutenção poderia ser maior que o benefício.

## 7. Comunicação com a API

A camada de frontend deve manter a comunicação com a API em um conjunto explícito de serviços, evitando espalhar chamadas HTTP em vários componentes.

A proposta é:

- `services/api` ou equivalente;
- funções de request com tratamento de erro e autorização;
- serialização e tipagem conforme `packages/contracts`;
- respostas adaptadas para camadas de UI.

## 8. Design de componentes

A UI deve separar:

- componente de apresentação;
- componente de container/feature;
- componente de página;
- hook de dados.

Essa separação facilita:

- reuso;
- leitura;
- testes;
- code review.

## 9. Estados de UX

A interface deve explicitamente tratar:

- loading;
- empty;
- error;
- success;
- session expired.

Esses estados já aparecem na especificação funcional e devem continuar sendo parte da arquitetura da interface.

## 10. Regras de UI e regras de domínio

A UI deve refletir o domínio, mas não duplicar a regra de negócio.

Exemplos:

- a UI pode bloquear uma transição inválida visualmente;
- a regra real da transição deve continuar no backend;
- a UI pode exibir mensagens e indicadores, mas não definir a regra final do negócio.

## 11. Trade-offs

### Benefícios da estrutura proposta

- organização fácil de entender;
- melhor onboarding para novos colaboradores;
- manutenção mais previsível;
- menor acoplamento entre telas e dados;
- maior clareza de responsabilidades.

### Custos

- exige disciplina na organização de pastas;
- pode parecer mais complexa em um projeto pequeno;
- exige esforço para manter contratos e serviços consistentes.

## 12. Padrões deliberadamente não adotados

### React Query/Server state heavy

Não é necessário introduzir ferramenta de dados remotos complexa neste momento, a menos que o projeto cresça bastante.

### Redux/Zustand por default

Sem necessidade comprovada, não é recomendado.

### Estrutura genérica sem domínio

Uma estrutura por pasta somente com `components`, `pages`, `hooks` e `lib` é insuficiente para o caos de um projeto de gestão de equipe.

## 13. Decisões pendentes

- definição final do state management global;
- escolha entre `app` ou `features` como organização baseline;
- número exato de camadas de UI e seu nível de abstração;
- uso de Tailwind, Motion e Recharts em todos os fluxos ou apenas em módulos específicos;
- definição de componente de dados de dashboard e Kanban.

## 14. Conclusão

O frontend deve ser organizado como um conjunto de features, com serviços de comunicação desacoplados da UI e com uma clara separação entre apresentação, dados e regras de experiência. Essa abordagem preserva simplicidade e facilita evolução, sem transformar o projeto em uma camada excessivamente abstrata.
