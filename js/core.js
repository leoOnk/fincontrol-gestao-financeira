/**
 * Calcula o saldo atual e o balanço do fluxo de caixa baseado nas movimentações.
 * @param {Array} movimentacoes - Lista de lançamentos financeiros
 * @returns {Object} Totalizadores de entradas, saídas e saldo líquido
 */
export function calcularFluxoCaixa(movimentacoes) {
    const resumo = {
        receitas: 0,
        despesas: 0,
        saldo: 0
    };

    movimentacoes.forEach(mov => {
        const valor = parseFloat(mov.valor) || 0;
        if (mov.tipo === "RECEITA" || mov.tipo === "ENTRADA") {
            resumo.receitas += valor;
        } else if (mov.tipo === "DESPESA" || mov.tipo === "SAÍDA") {
            resumo.despesas += valor;
        }
    });

    resumo.saldo = resumo.receitas - resumo.despesas;
    return resumo;
}

/**
 * Mapeia o índice de inadimplência comparando faturamento esperado vs contas atrasadas.
 * @param {Array} contasReceber - Lista de duplicatas/parcelas a receber
 * @param {string} dataCorteISO - Data de referência (YYYY-MM-DD)
 * @returns {Object} Métricas de inadimplência
 */
export function calcularInadimplencia(contasReceber, dataCorteISO = new Date().toISOString().split('T')[0]) {
    let totalEsperado = 0;
    let totalAtrasado = 0;

    contasReceber.forEach(conta => {
        const valor = parseFloat(conta.valor) || 0;
        totalEsperado += valor;

        // Se a conta não foi paga e a data de vencimento é menor que a data de corte, está atrasada
        if (conta.status !== "PAGO" && conta.vencimento < dataCorteISO) {
            totalAtrasado += valor;
        }
    });

    const taxaPercentual = totalEsperado > 0 ? (totalAtrasado / totalEsperado) * 100 : 0;

    return {
        totalEsperado,
        totalAtrasado,
        taxaInadimplencia: parseFloat(taxaPercentual.toFixed(2))
    };
}
