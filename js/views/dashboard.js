import { loadMovimentacoes } from "../storage.js";
import { calcularFluxoCaixa, calcularInadimplencia } from "../core.js";

/**
 * Captura os dados do armazenamento local, processa os totais 
 * e atualiza os elementos do DOM na tela de Dashboard.
 */
export function atualizarIndicadoresDashboard() {
    // 1. Busca os lançamentos do banco local
    const movimentacoes = loadMovimentacoes();

    // 2. Processa os totais utilizando o motor lógico (core.js)
    const resumo = calcularFluxoCaixa(movimentacoes);
    const inadimplencia = calcularInadimplencia(movimentacoes); // Usa a mesma lista para simplificar o escopo

    // 3. Captura os elementos de texto da tela de forma protegida
    const elReceitas = document.querySelector("#dash-receitas");
    const elDespesas = document.querySelector("#dash-despesas");
    const elSaldo = document.querySelector("#dash-saldo");
    const elInadimplencia = document.querySelector("#dash-inadimplencia");

    // 4. Injeta os valores formatados em moeda corrente (BRL) se os elementos existirem
    if (elReceitas) elReceitas.textContent = formatarMoeda(resumo.receitas);
    if (elDespesas) elDespesas.textContent = formatarMoeda(resumo.despesas);
    if (elSaldo) elSaldo.textContent = formatarMoeda(resumo.saldo);
    if (elInadimplencia) elInadimplencia.textContent = `${inadimplencia.taxaInadimplencia.toFixed(2)}%`;
}

/**
 * Função utilitária interna para formatar números no padrão R\$ 0,00
 */
function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);
}
