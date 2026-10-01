import { validarMovimentacao, validarCadastroEntidade } from "./validation.js";

describe("🛡️ Testes Unitários - Regras de Validação (validation.js)", () => {

    // —— VALIDAÇÕES DE MOVIMENTAÇÃO (LANÇAMENTOS) ——
    test("Deve validar com sucesso uma movimentação com dados íntegros", () => {
        const lancamentoValido = {
            descricao: "Pagamento de Fornecedor X",
            valor: 1550.00,
            tipo: "DESPESA",
            vencimento: "2026-10-15"
        };

        const resultado = validarMovimentacao(lancamentoValido);

        expect(resultado.valido).toBe(true);
        expect(resultado.erros).toEqual({});
    });

    test("Deve acusar erro se a descrição for muito curta ou vazia", () => {
        const lancamentoDescricaoInvalida = {
            descricao: "NF", // Menor que 3 caracteres
            valor: 500,
            tipo: "RECEITA",
            vencimento: "2026-10-15"
        };

        const resultado = validarMovimentacao(lancamentoDescricaoInvalida);

        expect(resultado.valido).toBe(false);
        expect(resultado.erros.descricao).toBe("A descrição deve possuir pelo menos 3 caracteres.");
    });

    test("Deve recusar lançamentos com valor igual ou menor que zero", () => {
        const lancamentoValorInvalido = {
            descricao: "Venda de Produto",
            valor: -50, // Negativo
            tipo: "RECEITA",
            vencimento: "2026-10-15"
        };

        const resultado = validarMovimentacao(lancamentoValorInvalido);

        expect(resultado.valido).toBe(false);
        expect(resultado.erros.valor).toBe("O valor do lançamento deve ser maior que zero.");
    });

    test("Deve recusar tipos de movimentação fora do padrão corporativo", () => {
        const lancamentoTipoInvalido = {
            descricao: "Ajuste de Caixa",
            valor: 100,
            tipo: "TRANSFERENCIA_INTERNA", // Não permitido na regra rígida
            vencimento: "2026-10-15"
        };

        const resultado = validarMovimentacao(lancamentoTipoInvalido);

        expect(resultado.valido).toBe(false);
        expect(resultado.erros.tipo).toBe("Tipo de movimentação inválido.");
    });


    // —— VALIDAÇÕES DE CADASTROS (CLIENTES / FORNECECORES) ——
    test("Deve validar um cadastro corporativo com nome e documento corretos", () => {
        const entidadeValida = {
            nome: "Tech Solutions Ltda",
            documento: "12.345.678/0001-99"
        };

        const resultado = validarCadastroEntidade(entidadeValida);

        expect(resultado.valido).toBe(true);
    });

    test("Deve reter cadastros com documentos (CPF/CNPJ) incompletos", () => {
        const entidadeDocumentoCurto = {
            nome: "Mário Silva",
            documento: "123.456" // Menor que 11 dígitos numéricos
        };

        const resultado = validarCadastroEntidade(entidadeDocumentoCurto);

        expect(resultado.valido).toBe(false);
        expect(resultado.erros.documento).toBe("Insira um CPF ou CNPJ válido.");
    });
});
