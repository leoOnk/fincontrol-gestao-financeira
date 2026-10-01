import { loadMovimentacoes, saveMovimentacoes } from "../storage.js";
import { validarMovimentacao } from "../validation.js";
import { calcularFluxoCaixa, calcularInadimplencia } from "../core.js";

export function inicializarContasPagar() {
    const form = document.querySelector("#form-contas-pagar");
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const lanc = {
                id: Math.random().toString(36).substring(2, 9),
                descricao: formData.get("descricao"),
                valor: parseFloat(formData.get("valor")) || 0,
                vencimento: formData.get("vencimento"),
                tipo: "DESPESA",
                status: "PENDENTE"
            };
            if (!validarMovimentacao(lanc).valido) return;
            const movs = loadMovimentacoes();
            movs.push(lanc);
            saveMovimentacoes(movs);
            form.reset();
            renderizarTabelaContasPagar();
        };
    }
    renderizarTabelaContasPagar();
}

function renderizarTabelaContasPagar() {
    const tbody = document.querySelector("#tabela-contas-pagar");
    if (!tbody) return;
    tbody.replaceChildren();
    loadMovimentacoes().filter(m => m.tipo === "DESPESA").forEach(desp => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${desp.descricao}</td><td>${desp.vencimento}</td><td>R$ ${desp.valor.toFixed(2)}</td><td>${desp.status}</td>`;
        tbody.appendChild(tr);
    });
}

export function inicializarContasReceber() {
    const form = document.querySelector("#form-contas-receber");
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const lanc = {
                id: Math.random().toString(36).substring(2, 9),
                descricao: formData.get("descricao"),
                valor: parseFloat(formData.get("valor")) || 0,
                vencimento: formData.get("vencimento"),
                tipo: "RECEITA",
                status: "PENDENTE"
            };
            if (!validarMovimentacao(lanc).valido) return;
            const movs = loadMovimentacoes();
            movs.push(lanc);
            saveMovimentacoes(movs);
            form.reset();
            renderizarTabelaContasReceber();
        };
    }
    renderizarTabelaContasReceber();
}

function renderizarTabelaContasReceber() {
    const tbody = document.querySelector("#tabela-contas-receber");
    if (!tbody) return;
    tbody.replaceChildren();
    loadMovimentacoes().filter(m => m.tipo === "RECEITA").forEach(rec => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${rec.descricao}</td><td>${rec.vencimento}</td><td>R$ ${rec.valor.toFixed(2)}</td><td>${rec.status}</td>`;
        tbody.appendChild(tr);
    });
}

export function inicializarFluxoCaixa() {
    const movs = loadMovimentacoes();
    const resumo = calcularFluxoCaixa(movs);
    const elEntradas = document.querySelector("#fluxo-total-entradas");
    const elSaidas = document.querySelector("#fluxo-total-saidas");
    const elSaldo = document.querySelector("#fluxo-saldo-disponivel");
    const tbody = document.querySelector("#tabela-extrato-caixa");

    if (elEntradas) elEntradas.textContent = `R$ ${resumo.receitas.toFixed(2)}`;
    if (elSaidas) elSaidas.textContent = `R$ ${resumo.despesas.toFixed(2)}`;
    if (elSaldo) elSaldo.textContent = `R$ ${resumo.saldo.toFixed(2)}`;

    if (!tbody) return;
    tbody.replaceChildren();
    [...movs].sort((a, b) => a.vencimento.localeCompare(b.vencimento)).forEach(mov => {
        const tr = document.createElement("tr");
        const ehRec = mov.tipo === "RECEITA";
        tr.innerHTML = `<td>${mov.vencimento}</td><td>${mov.descricao}</td><td>${ehRec ? "Entrada" : "Saída"}</td><td>R$ ${mov.valor.toFixed(2)}</td>`;
        tbody.appendChild(tr);
    });
}

export function inicializarRelatorioInadimplencia() {
    const movs = loadMovimentacoes();
    const contasRec = movs.filter(m => m.tipo === "RECEITA");
    const hoje = new Date().toISOString().split('T')[0];
    const analise = calcularInadimplencia(contasRec, hoje);

    const elFat = document.querySelector("#inad-faturamento-total");
    const elAtr = document.querySelector("#inad-carteira-atraso");
    const elTaxa = document.querySelector("#inad-taxa-percentual");
    const tbody = document.querySelector("#tabela-titulos-atrasados");

    if (elFat) elFat.textContent = `R$ ${analise.totalEsperado.toFixed(2)}`;
    if (elAtr) elAtr.textContent = `R$ ${analise.totalAtrasado.toFixed(2)}`;
    if (elTaxa) elTaxa.textContent = `${analise.taxaInadimplencia.toFixed(2)}%`;

    if (!tbody) return;
    tbody.replaceChildren();
    contasRec.filter(c => c.status !== "PAGO" && c.vencimento < hoje).forEach(tit => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${tit.vencimento}</td><td>${tit.descricao}</td><td>R$ ${tit.valor.toFixed(2)}</td><td>Cobrança</td>`;
        tbody.appendChild(tr);
    });
}
