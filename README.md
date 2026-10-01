# 📊 FINCONTROL — Sistema de Gestão Financeira Empresarial com Esteira de Testes Integrada

O **FINCONTROL** é um sistema ERP de gestão financeira corporativa moderno, desenhado como uma Single Page Application (SPA) reativa utilizando JavaScript nativo (ES6+). O grande diferencial do projeto está na sua arquitetura de software focada em **Clean Architecture** e **Qualidade Contínua**, contendo uma esteira automatizada com **5 suítes de Testes Unitários e de Integração de DOM**.

---

## 🚀 Tecnologias e Ferramentas

### Interface e Lógica Core

* **HTML5 Semântico:** Estruturação otimizada para acessibilidade e manipulação dinâmica de views.
* **CSS Componentizado:** Design baseado em variáveis CSS (`variables.css`) e arquitetura de layout estável via **CSS Grid** e **Flexbox**.
* **JavaScript ES6+ Nativo:** Arquitetura modularizada nativa do navegador (`type="module"`), garantindo separação rígida de responsabilidades.
* **Web Storage API:** Camada de persistência local (`localStorage`) estruturada com tratamento de falhas em blocos críticos.

### Esteira de Qualidade e Testes (QA/Dev)

* **Jest:** Framework de testes utilizado para rodar asserções lógicas e simular o ecossistema de microsserviços em memória.
* **Babel:** Transpilador configurado para viabilizar o suporte nativo a ECMAScript Modules (ESM) no ambiente Node de testes de forma assíncrona.
* **JSDOM:** Ambiente de simulação de navegador integrado ao Jest para validação de manipulação de elementos HTML e interceptação de eventos de formulários (`submit`).

---

## 🏛️ Arquitetura e Estrutura de Pastas

O projeto adota uma divisão estrita entre lógica purificada de negócios, persistência de dados e controladores visuais (Views), permitindo alta testabilidade:

```text
📂 fincontrol
 ┣ 📂 css
 ┃ ┣ 📄 main.css        # Grid global do painel ERP e estilizações de componentes
 ┃ ┣ 📄 reset.css       # Redefinição de margens e heranças nativas
 ┃ ┗ 📄 variables.css   # Paleta de cores institucionais (Entradas, Saídas, Alertas)
 ┣ 📂 js
 ┃ ┣ 📂 views           # Controladores visuais de tela (Manipuladores de DOM)
 ┃ ┃ ┣ 📄 cadastros.js  # Regras de salvamento e listagem de Clientes/Fornecedores
 ┃ ┃ ┣ 📄 dashboard.js   # Renderização reativa de cards de indicadores
 ┃ ┃ ┗ 📄 financeiro.js  # Gestão de lançamentos lógicos de Pagar, Receber e Fluxo
 ┃ ┣ 📄 core.js         # Inteligência matemática (Fluxo de caixa, taxas de inadimplência)
 ┃ ┣ 📄 main.js         # Orquestrador central e roteador dinâmico de views da SPA
 ┃ ┣ 📄 storage.js      # Camada isolada de persistência em banco local
 ┃ ┣ 📄 validation.js   # Validador de esquemas e formatos de documentos corporativos
 ┃ ┣ 📄 cadastros.test.js # Testes de DOM dos formulários de Clientes e Fornecedores
 ┃ ┣ 📄 core.test.js    # Testes lógicos da matemática financeira pura
 ┃ ┣ 📄 dashboard.test.js # Testes de integração de dados no painel principal
 ┃ ┣ 📄 fluxo.test.js   # Testes de ordenação cronológica do livro caixa
 ┃ ┗ 📄 validation.test.js # Testes de caminhos felizes e exceções de dados
 ┣ 📄 index.html        # Ponto de entrada único do ecossistema da aplicação
 ┣ 📄 jest.config.cjs   # Ativador do ambiente de navegador JSDOM para o Jest
 ┗ 📄 package.json      # Scripts de automação de testes e dependências do Node
```

---

## 🧪 Estratégia de Cobertura de Testes

A aplicação é testada de forma contínua em duas camadas fundamentais de engenharia de software:

### 1. Testes Lógicos Puros (regras de negócio)

Validam o motor computacional sem interferência do navegador ou de arquivos externos:

* **Matemática Financeira (`core.js`):** Garante a precisão dos saldos de caixa, soma de receitas e dedução de despesas, além de computar o índice percentual exato de inadimplência ativa.

* **Validador de Esquemas (`validation.js`):** Bloqueia descrições em branco, valores negativos ou iguais a zero e recusa cadastros organizacionais que não possuam o comprimento mínimo de caracteres de CPF ou CNPJ.

### 2. Testes de Integração de DOM (Comportamento de Interface)

Utilizam o ambiente simulado do **JSDOM** e injeção de payloads controlados no `localStorage` para validar interações reais do usuário:

* **Fluxo de Lançamentos:** Preenche inputs programaticamente, simula o disparo de eventos de `submit`, checa se as mensagens de erro dinâmicas funcionam e se as tabelas organizam os dados de forma cronológica (livro caixa).
* **Renderização Dinâmica:** Valida se os seletores de moeda corrente (BRL) e estilizações condicionais são acionados com precisão com base nas mutações do banco de dados local.

---

## 📈 Resultados da Esteira de Automação

* **5/5 Suítes de Testes** validadas e executadas em paralelo.
* **12/12 Cenários Críticos de Negócio** aprovados com 100% de aproveitamento verde, assegurando resiliência total contra regressões de código e quebras visuais.
# fincontrol-gestao-financeira
