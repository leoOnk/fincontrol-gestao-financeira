// Chaves de armazenamento do sistema baseadas nos seus módulos
const KEYS = {
    MOVIMENTACOES: "fincontrol_movimentacoes",
    CADASTROS: "fincontrol_cadastros",
    CONFIGURACOES: "fincontrol_configuracoes"
};

/**
 * Salva qualquer dado genérico no localStorage associado a uma chave específica.
 */
function save(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Erro ao salvar dados na chave [${key}]:`, error);
        return false;
    }
}

/**
 * Carrega e faz o parse de dados do localStorage com tratamento de erro integrado.
 */
function load(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Erro ao carregar dados da chave [${key}]:`, error);
        return [];
    }
}

// —— EXPORTS PÚBLICOS PARA O SISTEMA ——

export function saveMovimentacoes(movimentacoes) {
    return save(KEYS.MOVIMENTACOES, movimentacoes);
}

export function loadMovimentacoes() {
    return load(KEYS.MOVIMENTACOES);
}

export function saveCadastros(cadastros) {
    return save(KEYS.CADASTROS, cadastros);
}

export function loadCadastros() {
    // Retorna um objeto estruturado caso não existam cadastros ainda
    try {
        const data = localStorage.getItem(KEYS.CADASTROS);
        return data ? JSON.parse(data) : { clientes: [], fornecedores: [], contasBancarias: [] };
    } catch {
        return { clientes: [], fornecedores: [], contasBancarias: [] };
    }
}

export function clearAllData() {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
}
