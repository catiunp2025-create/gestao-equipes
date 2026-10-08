# Indicators

## Objetivo

Os indicadores representam a análise operacional do trabalho da equipe. Eles transformam o acompanhamento das atividades em sinais que ajudam a entender o estado do processo, a capacidade de entrega e o comportamento da equipe ao longo do tempo.

## Conceito geral

Os indicadores não são uma tecnologia. São fenômenos do negócio que devem ser medidos a partir de atividades, prazos, estados e datas relevantes.

## Períodos de análise

A análise deve considerar os seguintes períodos:

- 1 semana;
- 1 mês;
- 3 meses;
- 6 meses;
- 1 ano.

A semana tem uma função específica: comparar o estado atual da equipe com a semana anterior e observar melhora, estabilidade ou piora.

## Datas relevantes

Os indicadores devem usar as datas correspondentes ao fenômeno analisado:

- criação → `createdAt`;
- início → `startedAt`;
- conclusão → `completedAt`;
- prazo → `dueDate`;
- duração → `startedAt` + `completedAt`.

A mesma atividade pode participar de análises diferentes usando datas diferentes.

## Indicadores definidos

### KPI01 — Atividades abertas

#### Objetivo

Avaliar o volume atual de trabalho pendente.

#### Conceito

Quantidade de atividades cujo status não seja `DONE` nem `CANCELLED`.

#### Dados utilizados

Status da atividade e sua situação atual.

### KPI02 — Atividades em andamento

#### Objetivo

Acompanhar o volume de trabalho em execução.

#### Conceito

Quantidade de atividades com status `IN_PROGRESS`.

### KPI03 — Atividades atrasadas

#### Objetivo

Identificar problemas que exigem intervenção.

#### Conceito

Quantidade de atividades cujo prazo foi ultrapassado e que não estejam concluídas ou canceladas.

### KPI04 — Próximos vencimentos

#### Objetivo

Permitir uma intervenção preventiva antes da perda do prazo.

#### Conceito

Quantidade de atividades que entrarão em situação de vencimento dentro da janela configurada.

### KPI05 — Taxa de conclusão

#### Objetivo

Acompanhar a capacidade de conclusão da equipe no período selecionado.

#### Regra de cálculo

```text
atividades concluídas no período
──────────────────────────────── × 100
atividades existentes no período
```

#### Observação importante

A especificação identifica como pendência a semântica precisa do conjunto de atividades considerado como "existentes no período". Esse ponto não foi resolvido pela fonte e deve permanecer em aberto.

### KPI06 — Cumprimento de prazo

#### Objetivo

Avaliar se os compromissos estabelecidos estão sendo cumpridos.

#### Regra conceitual

```text
atividades concluídas no prazo
────────────────────────────── × 100
atividades concluídas com prazo
```

### KPI07 — Distribuição por colaborador

#### Objetivo

Identificar concentração ou distribuição desigual do trabalho.

#### Conceito

Quantidade de atividades atribuídas a cada usuário.

#### Observação

A especificação ressalta que quantidade de atividades não representa necessariamente complexidade. O indicador deve ser interpretado como distribuição de trabalho, não como produtividade isolada.

### KPI08 — Tempo médio de conclusão

#### Objetivo

Acompanhar a duração média do fluxo de execução.

#### Regra conceitual

```text
Σ (completedAt - startedAt)
───────────────────────────
atividades concluídas
```

#### Dados utilizados

A análise considera atividades que tenham `startedAt` e `completedAt` disponíveis.

## Regra de exclusão de cancelados

Atividades `CANCELLED` devem ser excluídas dos indicadores operacionais, salvo quando um indicador específico tiver como objetivo analisar cancelamentos.

## Filtros e comparação temporal

Os indicadores devem ser calculados com base em filtros combinados por `AND`.

Filtros previstos:

- período;
- colaborador;
- categoria;
- prioridade;
- status;
- situação de prazo.

Também existe o conceito de evolução temporal em que o indicador é comparado entre períodos, especialmente:

```text
período atual
      ↓
comparação
      ↓
período anterior de mesma duração
```

Exemplo:

```text
Semana atual
     ↕
Semana anterior
```

A especificação não define como decidir automaticamente se a variação é boa ou ruim, porque a direção desejável depende do indicador.

## Invariantes

- indicadores devem refletir dados reais da operação;
- filtros são combinados com AND;
- `CANCELLED` não entra automaticamente nos indicadores operacionais;
- as datas relevantes devem estar alinhadas ao fenômeno medido;
- cada indicador deve possuir um propósito útil de decisão.

## Decisões pendentes

### Semântica de "atividades existentes no período"

A especificação registra uma pendência explícita: a semântica histórica de "atividades existentes no período" ainda não foi definida com precisão.

Esse ponto permanece em aberto e não pode ser resolvido automaticamente por inferência.

### Acesso do MEMBER ao dashboard

A regra exata de acesso do MEMBER ao dashboard não está completamente fechada na documentação de produto.

### Periodicidade e granularidade temporal

A granularidade das séries temporais, o período padrão e a estratégia de atualização não foram fechados como decisão de domínio.

## Rastreabilidade

Relacionado a:

- RF06 — Dashboard e indicadores;
- RN10 — Filtros;
- RN11 — Atividades canceladas nos indicadores;
- RN12 — Taxa de conclusão;
- RN13 — Datas relevantes;
- KPIs definidos na especificação técnica.

## Conteúdo deliberadamente deixado para Architecture

Este documento não define:

- implementação do cálculo em banco ou em serviço;
- cache;
- granularidade técnica de séries temporais;
- estratégia de consulta histórica;
- UI, gráficos, bibliotecas ou frameworks.
