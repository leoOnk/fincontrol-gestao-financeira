import { calcularFluxoCaixa, calcularInadimplencia } from "./core.js";

describe("📉 Testes Unitários - Inteligência Financeira (core.js)", () => {

    // —— TESTE DE FLUXO DE CAIXA ——
    test("Deve calcular o saldo líquido corretamente baseado em entradas e saídas", () => {
        const movimentacoesExemplo = [
            { descricao: "Aporte Inicial", valor: 10000, tipo: "RECEITA" },
            { descricao: "Aluguel Escritório", valor: 3000, tipo: "DESPESA" },
            { descricao: "Licença de Software", valor: 1500, tipo: "SAÍDA" },
            { descricao: "Serviço Prestado", valor: 2500, tipo: "ENTRADA" }
        ];

        const resultado = calcularFluxoCaixa(movimentacoesExemplo);

        expect(resultado.receitas).toBe(12500);
        expect(resultado.despesas).toBe(4500);
        expect(resultado.saldo).toBe(8000);
    });

    // —— TESTE DE INADIMPLÊNCIA ——
    test("Deve calcular a taxa percentual de inadimplência corretamente", () => {
        const contasAReceber = [
            { cliente: "Empresa A", valor: 5000, vencimento: "2026-01-10", status: "PAGO" },
            { cliente: "Empresa B", valor: 3000, vencimento: "2026-02-15", status: "PENDENTE" },
            { cliente: "Empresa C", valor: 2000, vencimento: "2026-03-01", status: "PENDENTE" }
        ];

        const dataCorte = "2026-02-20";

        const resultado = calcularInadimplencia(contasAReceber, dataCorte);

        expect(resultado.totalEsperado).toBe(10000);
        expect(resultado.totalAtrasado).toBe(3000);
        expect(resultado.taxaInadimplencia).toBe(30.00);
    });
});