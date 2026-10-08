# Domain

## Objetivo

A documentação de domínio tem como objetivo explicar os conceitos do negócio, suas regras, estados, relações e invariantes sem assumir uma implementação técnica. Ela serve como base para que a arquitetura seja definida a partir de um entendimento consolidado do problema.

## Diferença entre Domain e Requirements

Os Requirements respondem principalmente "o que o sistema precisa fazer". O Domain responde "quais são os conceitos de negócio e como eles se comportam".

- Requirements: ações e expectativas do produto.
- Domain: entidades, estados, regras e relações do negócio.

A documentação de domínio deve ser lida como a visão conceitual do sistema e não como descrição de frameworks, módulos, APIs ou infraestrutura.

## Contextos

### Authentication

Conceitos relacionados à identidade do usuário, autenticação, sessão, expiração e renovação.

### Users

Conceitos relacionados ao usuário da equipe, perfis, ativação e relacionamentos com atividades.

### Activities

Conceito central do produto. Define a atividade, seus estados, datas, prioridade, atribuição e regras de ciclo de vida.

### Categories

Conceito de classificação de atividades, com regras de uso e vínculo.

### Kanban

Representação operacional do domínio de atividades em colunas de status.

### Indicators

Conceitos de análise operacional e comparação temporal baseados nas atividades.

## Relação com Requirements

A documentação de domínio foi construída a partir dos documentos em `docs/requirements` e preserva as decisões ali documentadas. Quando algum ponto não está suficientemente definido, ele é mantido como pendência de domínio e não é transformado em regra inventada.

## Decisões pendentes

Alguns pontos continuam não definidos na origem e, por isso, devem permanecer explícitos como pendências de domínio:

- janela exata de alerta de prazo;
- semântica precisa de "atividades existentes no período";
- acesso do MEMBER ao dashboard;
- comportamento de datas sem horário;
- finais de semana e timezone;
- alguns detalhes relacionados a autenticação e sessão.

## Orientação de leitura

- comece por [authentication.md](./authentication.md) para entender o contexto de acesso;
- siga para [users.md](./users.md), [activities.md](./activities.md) e [categories.md](./categories.md);
- consulte [kanban.md](./kanban.md) para entender a representação operacional;
- consulte [indicators.md](./indicators.md) para entender o acompanhamento gerencial.

## Conceitos principais

- Usuário
- Perfil/Papel
- Autenticação
- Sessão
- Atividade
- Status de atividade
- Categoria
- Prazo
- Prioridade
- Indicador
- Kanban

## Questões em aberto

O domínio não deve resolver, por conta própria, questões que ainda não foram decididas pelo produto. Isso inclui decisões de implementação, ajustes de política de alerta e algumas regras de acesso e análise temporal.
