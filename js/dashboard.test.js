/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { atualizarIndicadoresDashboard } from "./views/dashboard.js";

describe("📊 Testes Unitários - Controlador do Dashboard (dashboard.js)", () => {
    
    beforeEach(() => {
        // 1. Injeta os elementos HTML simulando o DOM do navegador em memória
        document.body.innerHTML = `
            <strong id="dash-receitas">R$ 0,00</strong>
            <strong id="dash-despesas">R$ 0,00</strong>
            <strong id="dash-saldo">R$ 0,00</strong>
            <strong id="dash-inadimplencia">0.00%</strong>
        `;
        
        // 2. Limpa o banco de dados simulado antes de cada teste
        localStorage.clear();
    });

    test("Deve ler os dados salvos no localStorage e injetar os valores formatados no HTML", () => {
        // Em vez de simular arquivos, salvamos os dados reais diretamente na chave do banco local!
        const movimentacoesExemplo = [
            { descricao: "Entrada de Capital", valor: 5000, tipo: "RECEITA", vencimento: "2026-09-01", status: "PAGO" },
            { descricao: "Pagamento de Aluguel", valor: 2000, tipo: "DESPESA", vencimento: "2026-09-05", status: "PAGO" }
        ];
        
        // "fincontrol_movimentacoes" é a chave exata que criamos no seu arquivo storage.js
        localStorage.setItem("fincontrol_movimentacoes", JSON.stringify(movimentacoesExemplo));

        // Executa o controlador visual que vai ler o localStorage nativamente
        atualizarIndicadoresDashboard();

        // Limpa espaços especiais invisíveis gerados pelo padrão Intl de moeda
        const receitasTexto = document.querySelector("#dash-receitas").textContent.replace(/\u00a0/g, ' ');
        const saldoTexto = document.querySelector("#dash-saldo").textContent.replace(/\u00a0/g, ' ');

        // Validações matemáticas: Receita (5000) e Saldo Líquido (5000 - 2000 = 3000)
        expect(receitasTexto).toContain("5.000,00");
        expect(saldoTexto).toContain("3.000,00");
        expect(document.querySelector("#dash-inadimplencia").textContent).toBe("0.00%");
    });
});
