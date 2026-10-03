# Plataforma de Gestão de Atividades e Indicadores

> Projeto open source voltado para aprendizado de desenvolvimento de software e trabalho em equipe.

Este projeto consiste no desenvolvimento de uma plataforma web para **gestão de atividades, acompanhamento de equipes e análise de indicadores operacionais**.

Mais do que construir uma aplicação, o projeto tem como objetivo criar um **ambiente prático de aprendizado**, onde estudantes e desenvolvedores em início de carreira possam aprender, praticar e colaborar em um projeto real utilizando ferramentas, padrões e processos próximos aos encontrados no mercado.

## 🎯 Objetivo

O projeto busca unir dois objetivos:

1. **Construir uma aplicação real**, capaz de centralizar atividades, responsáveis, prazos, prioridades e indicadores de uma equipe.
2. **Criar uma experiência de desenvolvimento colaborativo**, permitindo que novos desenvolvedores pratiquem programação, Git, organização de código, revisão, documentação, testes e trabalho em equipe.

A aplicação deverá permitir que uma equipe registre e acompanhe seu trabalho, visualize o fluxo das atividades e utilize indicadores para identificar situações que exigem atenção.

O conceito central do produto é:

```text
Registrar o trabalho
        ↓
Tornar o trabalho visível
        ↓
Gerar indicadores
        ↓
Identificar problemas
        ↓
Apoiar decisões
```

## 📚 Um projeto para aprender fazendo

Este não é apenas um projeto para implementar funcionalidades.

A ideia é utilizar o próprio desenvolvimento como uma oportunidade de aprendizado.

Os participantes poderão praticar, entre outros aspectos:

* Git e GitHub;
* Git Flow e estratégias de branches;
* desenvolvimento frontend e backend;
* APIs REST;
* bancos de dados relacionais;
* ORM;
* TypeScript;
* arquitetura de software;
* organização de código;
* testes;
* documentação;
* code review;
* resolução de problemas;
* planejamento de tarefas;
* comunicação entre desenvolvedores;
* trabalho colaborativo.

O objetivo é que o participante não apenas escreva código, mas compreenda **como software é desenvolvido em equipe**.

## 🤝 Contribuições

O projeto é open source, mas a participação será inicialmente **orientada para estudantes e desenvolvedores em fase de aprendizado**.

Isso significa que contribuições não serão avaliadas apenas pela quantidade de código produzido.

O processo também deverá considerar:

* entendimento do problema;
* qualidade da solução;
* organização do código;
* capacidade de trabalhar em uma equipe;
* documentação;
* comunicação;
* respeito às decisões arquiteturais;
* participação em revisões;
* capacidade de receber e aplicar feedback.

A intenção é criar um ambiente onde seja possível aprender com outros desenvolvedores e evoluir progressivamente.

### Não é necessário ser um desenvolvedor experiente

Contribuições podem envolver diferentes níveis de dificuldade.

Por exemplo:

* documentação;
* correção de pequenos bugs;
* melhorias de interface;
* criação de componentes;
* testes;
* melhorias de acessibilidade;
* ajustes de validação;
* implementação de endpoints;
* consultas ao banco;
* funcionalidades completas.

A dificuldade das tarefas poderá evoluir conforme o participante adquirir experiência.

## 🧭 Como pretendemos trabalhar

O desenvolvimento será baseado em uma abordagem colaborativa inspirada principalmente em **Kanban, priorização e acompanhamento por indicadores**.

O fluxo conceitual das atividades é:

```text
A FAZER
   ↓
EM ANDAMENTO
   ↓
EM REVISÃO
   ↓
CONCLUÍDA
```

Também poderão existir atividades canceladas.

A utilização do Kanban tem como objetivo tornar o trabalho visível e facilitar o acompanhamento do fluxo de desenvolvimento.

Cada atividade também poderá possuir diferentes níveis de prioridade:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

A metodologia não será tratada como uma regra rígida. Ela deverá ser adaptada às necessidades do projeto e ao contexto da equipe.

## 🏗️ O produto

A plataforma será composta inicialmente por funcionalidades como:

### Atividades

* criação e edição;
* atribuição de responsáveis;
* prioridades;
* prazos;
* status;
* filtros;
* ordenação;
* acompanhamento do fluxo;
* visualização em Kanban.

### Equipe

* gerenciamento de usuários;
* perfis e permissões;
* acompanhamento das atividades atribuídas.

### Dashboard

O dashboard deverá transformar os dados das atividades em informações úteis para acompanhamento da equipe.

Entre os indicadores planejados estão:

* atividades em andamento;
* atividades atrasadas;
* próximas do vencimento;
* taxa de conclusão;
* distribuição de atividades por colaborador;
* tempo médio de conclusão;
* cumprimento de prazos.

Cada indicador deverá possuir uma **finalidade prática**.

A intenção não é criar um dashboard cheio de números e gráficos, mas permitir que os dados auxiliem na identificação de problemas e na tomada de decisões.

## 🛠️ Stack

### Backend

* [NestJS](https://nestjs.com/)
* TypeScript
* Prisma ORM
* PostgreSQL

### Frontend

* React
* TypeScript
* Tailwind CSS
* Recharts

A arquitetura inicial será baseada em uma aplicação web separada em frontend e backend, mantendo o projeto simples o suficiente para ser compreendido e desenvolvido por participantes em diferentes níveis de experiência.

## 📁 Estrutura

A estrutura inicial do projeto seguirá uma organização semelhante a:

```text
.
├── apps/
│   ├── api/
│   └── web/
│
├── packages/
│
├── docs/
│
├── README.md
└── ...
```

A estrutura poderá evoluir conforme as necessidades do projeto.

## 🚀 Desenvolvimento

O projeto será desenvolvido de forma incremental.

As funcionalidades serão divididas em tarefas menores para permitir que diferentes participantes possam trabalhar simultaneamente.

O fluxo esperado de desenvolvimento será aproximadamente:

```text
Problema
   ↓
Tarefa
   ↓
Desenvolvimento
   ↓
Pull Request
   ↓
Code Review
   ↓
Ajustes
   ↓
Merge
   ↓
Validação
```

A ideia é que esse processo também faça parte do aprendizado.

## 🔍 Code Review

Pull Requests não serão utilizados apenas para verificar se o código funciona.

As revisões deverão ajudar os participantes a compreender:

* por que determinada solução foi escolhida;
* quais alternativas existiam;
* quais problemas podem existir na implementação;
* como melhorar a legibilidade;
* como reduzir complexidade;
* como escrever código mais fácil de manter.

Feedback técnico deverá ser utilizado como ferramenta de aprendizado.

## 🌱 Progressão dos participantes

A participação poderá acontecer de forma gradual.

Um participante pode começar corrigindo documentação ou pequenos problemas e, conforme adquirir experiência, passar para tarefas mais complexas.

Um possível caminho é:

```text
Documentação
      ↓
Pequenas correções
      ↓
Interface / componentes
      ↓
Testes
      ↓
Endpoints / serviços
      ↓
Regras de negócio
      ↓
Funcionalidades completas
      ↓
Arquitetura e decisões técnicas
```

Isso permite que o projeto seja utilizado tanto por quem está dando os primeiros passos quanto por participantes que já possuem alguma experiência.

## 📖 Documentação

A documentação será parte importante do projeto.

Além da documentação técnica, deverão existir materiais explicando:

* arquitetura;
* regras de negócio;
* funcionamento do projeto;
* decisões técnicas;
* configuração do ambiente;
* processo de contribuição;
* metodologia de desenvolvimento;
* indicadores;
* API.

Uma das premissas do projeto é que **uma solução que ninguém consegue entender ou manter não está completa**.

## 🗺️ Roadmap inicial

O desenvolvimento inicial será dividido em etapas:

1. Fundação do projeto
2. Configuração do banco de dados
3. Desenvolvimento do backend
4. Autenticação e autorização
5. Desenvolvimento do frontend
6. Gestão de atividades
7. Kanban
8. Dashboard e indicadores
9. Testes e qualidade
10. Documentação
11. Evolução através das contribuições da comunidade

O roadmap poderá mudar conforme o projeto evoluir.

## 💡 Princípios do projeto

Alguns princípios orientarão o desenvolvimento:

### Aprender fazendo

O conhecimento deve ser aplicado em problemas reais.

### Simplicidade

Soluções desnecessariamente complexas não serão introduzidas apenas para utilizar determinada tecnologia ou padrão.

### Colaboração

O projeto deve incentivar comunicação, revisão e compartilhamento de conhecimento.

### Código compreensível

Código destinado a um projeto educacional deve ser compreensível para outros desenvolvedores, não apenas para quem o escreveu.

### Feedback

Erros fazem parte do processo de aprendizado. Code reviews e discussões técnicas devem contribuir para a evolução dos participantes.

### Responsabilidade

Cada contribuição deve considerar não apenas "fazer funcionar", mas também impacto, manutenção, testes e integração com o restante do sistema.

## 📌 Status

> 🚧 **Em desenvolvimento**

O projeto está em sua fase inicial de estruturação.

As decisões técnicas e funcionais poderão evoluir conforme o desenvolvimento e as contribuições dos participantes.

## 📄 Licença

A licença do projeto será definida antes da primeira versão pública.

---

**Construir software. Aprender em equipe. Evoluir juntos.**
