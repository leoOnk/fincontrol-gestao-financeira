/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { inicializarFluxoCaixa } from "./views/financeiro.js";

describe("🔄 Testes Unitários - Demonstrativo de Fluxo de Caixa (financeiro.js)", () => {

    beforeEach(() => {
        // Injeta a estrutura de cards de balanço e tabela do livro caixa em memória
        document.body.innerHTML = `
            <strong id="fluxo-total-entradas">R$ 0,00</strong>
            <strong id="fluxo-total-saidas">R$ 0,00</strong>
            <strong id="fluxo-saldo-disponivel">R$ 0,00</strong>
            <table>
                <tbody id="tabela-extrato-caixa"></tbody>
            </table>
        `;
        localStorage.clear();
    });

    test("Deve consolidar a matemática de entradas e saídas e renderizar o extrato cronologicamente", () => {
        // 1. Simula lançamentos mistos de receitas e despesas salvos no banco local
        const movimentacoesExemplo = [
            { descricao: "Venda de Serviço", valor: 3000, tipo: "RECEITA", vencimento: "2026-10-20" },
            { descricao: "Compra de Insumos", valor: 1000, tipo: "DESPESA", vencimento: "2026-10-10" } // Mais antiga, deve subir na tabela
        ];
        localStorage.setItem("fincontrol_movimentacoes", JSON.stringify(movimentacoesExemplo));

        // 2. Executa o controlador analítico
        inicializarFluxoCaixa();

        // 3. Validações dos cards totalizadores superiores
        expect(document.querySelector("#fluxo-total-entradas").textContent).toBe("R\$ 3000.00");
        expect(document.querySelector("#fluxo-total-saidas").textContent).toBe("R\$ 1000.00");
        expect(document.querySelector("#fluxo-saldo-disponivel").textContent).toBe("R\$ 2000.00");

        // 4. Valida se a ordenação cronológica colocou a despesa do dia 10 antes da receita do dia 20
        const linhasTabela = document.querySelectorAll("#tabela-extrato-caixa tr");
        expect(linhasTabela).toHaveLength(2);
        expect(linhasTabela[0].innerHTML).toContain("Compra de Insumos"); // Dia 10/10 aparece primeiro
        expect(linhasTabela[1].innerHTML).toContain("Venda de Serviço");  // Dia 20/10 aparece depois
    });
});
