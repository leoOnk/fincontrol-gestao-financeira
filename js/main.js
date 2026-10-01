import { inicializarContasPagar, inicializarContasReceber, inicializarFluxoCaixa, inicializarRelatorioInadimplencia } from "./views/financeiro.js";
import { inicializarClientes, inicializarFornecedores } from "./views/cadastros.js";
import { atualizarIndicadoresDashboard } from "./views/dashboard.js";

const viewContainer = document.querySelector("#view-container");
const viewTitle = document.querySelector("#current-view-title");
const navLinks = document.querySelectorAll(".nav-link");

const HTML_TEMPLATES = {
    dashboard: `
        <div class="metrics-grid">
            <div class="card-metric card-revenue"><span class="card-title">Receitas</span><strong id="dash-receitas">R$ 0,00</strong></div>
            <div class="card-metric card-expense"><span class="card-title">Despesas</span><strong id="dash-despesas">R$ 0,00</strong></div>
            <div class="card-metric card-balance"><span class="card-title">Saldo Líquido</span><strong id="dash-saldo">R$ 0,00</strong></div>
            <div class="card-metric card-overdue"><span class="card-title">Inadimplência</span><strong id="dash-inadimplencia">0.00%</strong></div>
        </div>`,
    "contas-pagar": `
        <div class="finance-panel">
            <form id="form-contas-pagar" class="financial-form">
                <input type="text" id="pagar-descricao" name="descricao" placeholder="Descrição" required>
                <input type="number" id="pagar-valor" name="valor" step="0.01" placeholder="0,00" required>
                <input type="date" id="pagar-vencimento" name="vencimento" required>
                <button type="submit">Lançar Despesa</button>
            </form>
            <table class="financial-table"><thead><tr><th>Descrição</th><th>Vencimento</th><th>Valor</th><th>Status</th></tr></thead><tbody id="tabela-contas-pagar"></tbody></table>
        </div>`,
    "contas-receber": `
        <div class="finance-panel">
            <form id="form-contas-receber" class="financial-form">
                <input type="text" id="receber-descricao" name="descricao" placeholder="Descrição" required>
                <input type="number" id="receber-valor" name="valor" step="0.01" placeholder="0,00" required>
                <input type="date" id="receber-vencimento" name="vencimento" required>
                <button type="submit">Registrar Faturamento</button>
            </form>
            <table class="financial-table"><thead><tr><th>Descrição</th><th>Previsão</th><th>Valor</th><th>Status</th></tr></thead><tbody id="tabela-contas-receber"></tbody></table>
        </div>`,
    clientes: `
        <div class="crud-panel">
            <form id="form-cadastro-cliente" class="financial-form">
                <input type="text" id="cliente-nome" name="nome" placeholder="Nome" required>
                <input type="text" id="cliente-documento" name="documento" placeholder="CPF/CNPJ" required>
                <button type="submit">Salvar Cliente</button>
            </form>
            <!-- COLUNA DE AÇÕES ADICIONADA ABAIXO NO THEAD -->
            <table><thead><tr><th>Nome</th><th>Documento</th><th>Ações</th></tr></thead><tbody id="tabela-clientes"></tbody></table>
        </div>`,
    fornecedores: `
        <div class="crud-panel">
            <form id="form-cadastro-fornecedor" class="financial-form">
                <input type="text" id="fornecedor-nome" name="nome" placeholder="Razão Social" required>
                <input type="text" id="fornecedor-documento" name="documento" placeholder="CNPJ" required>
                <button type="submit">Salvar Fornecedor</button>
            </form>
            <table><thead><tr><th>Fornecedor</th><th>CNPJ</th><th>Ações</th></tr></thead><tbody id="tabela-fornecedores"></tbody></table>
        </div>`,
    "fluxo-caixa": `
        <div class="metrics-grid">
            <div class="card-metric"><span>Entradas</span><strong id="fluxo-total-entradas">R$ 0,00</strong></div>
            <div class="card-metric"><span>Saídas</span><strong id="fluxo-total-saidas">R$ 0,00</strong></div>
            <div class="card-metric"><span>Saldo</span><strong id="fluxo-saldo-disponivel">R$ 0,00</strong></div>
        </div>
        <table class="financial-table"><thead><tr><th>Data</th><th>Descrição</th><th>Operação</th><th>Valor</th></tr></thead><tbody id="tabela-extrato-caixa"></tbody></table>`,
    "relatorio-inadimplencia": `
        <div class="metrics-grid">
            <div class="card-metric"><span>Esperado</span><strong id="inad-faturamento-total">R$ 0,00</strong></div>
            <div class="card-metric"><span>Em Atraso</span><strong id="inad-carteira-atraso">R$ 0,00</strong></div>
            <div class="card-metric"><span>Índice</span><strong id="inad-taxa-percentual">0.00%</strong></div>
        </div>
        <table class="financial-table"><thead><tr><th>Previsão</th><th>Título</th><th>Valor Aberto</th><th>Ação</th></tr></thead><tbody id="tabela-titulos-atrasados"></tbody></table>`
};

const TITLES = {
    dashboard: "📊 Dashboard Operacional",
    "contas-pagar": "📉 Contas a Pagar",
    "contas-receber": "📈 Contas a Receber",
    clientes: "👥 Cadastro de Clientes",
    fornecedores: "🏢 Cadastro de Fornecedores",
    "fluxo-caixa": "🔄 Fluxo de Caixa Analítico",
    "relatorio-inadimplencia": "⚠️ Relatório de Inadimplência"
};

function switchView(viewName) {
    if (!viewContainer || !viewTitle || !HTML_TEMPLATES[viewName]) return;

    viewTitle.textContent = TITLES[viewName];
    viewContainer.innerHTML = HTML_TEMPLATES[viewName];

    navLinks.forEach(link => link.classList.toggle("active", link.dataset.view === viewName));

    if (viewName === "dashboard") atualizarIndicadoresDashboard();
    if (viewName === "contas-pagar") inicializarContasPagar();
    if (viewName === "contas-receber") inicializarContasReceber();
    if (viewName === "clientes") inicializarClientes();
    if (viewName === "fornecedores") inicializarFornecedores();
    if (viewName === "fluxo-caixa") inicializarFluxoCaixa();
    if (viewName === "relatorio-inadimplencia") inicializarRelatorioInadimplencia();
}

navLinks.forEach(link => link.addEventListener("click", () => switchView(link.dataset.view)));
switchView("dashboard");
