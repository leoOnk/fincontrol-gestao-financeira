/**
 * Valida o lançamento de uma movimentação financeira (Receita ou Despesa).
 */
export function validarMovimentacao(dados) {
    const erros = {};

    if (!dados.descricao || dados.descricao.trim().length < 3) {
        erros.descricao = "A descrição deve possuir pelo menos 3 caracteres.";
    }

    const valorNum = parseFloat(dados.valor);
    if (isNaN(valorNum) || valorNum <= 0) {
        erros.valor = "O valor do lançamento deve ser maior que zero.";
    }

    const tiposValidos = ["RECEITA", "ENTRADA", "DESPESA", "SAÍDA"];
    if (!dados.tipo || !tiposValidos.includes(dados.tipo.toUpperCase())) {
        erros.tipo = "Tipo de movimentação inválido.";
    }

    if (!dados.vencimento || isNaN(Date.parse(dados.vencimento))) {
        erros.vencimento = "Insira uma data de vencimento válida.";
    }

    return {
        valido: Object.keys(erros).length === 0,
        erros
    };
}

/**
 * Valida o cadastro de entidades corporativas (Clientes ou Fornecedores).
 */
export function validarCadastroEntidade(entidade) {
    const erros = {};

    if (!entidade.nome || entidade.nome.trim().length < 3) {
        erros.nome = "O nome ou razão social é obrigatório e deve ter no mínimo 3 caracteres.";
    }

    if (!entidade.documento || entidade.documento.trim().replace(/\D/g, "").length < 11) {
        erros.documento = "Insira um CPF ou CNPJ válido.";
    }

    return {
        valido: Object.keys(erros).length === 0,
        erros
    };
}
