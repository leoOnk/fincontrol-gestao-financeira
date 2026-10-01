import { loadCadastros, saveCadastros } from "../storage.js";
import { validarCadastroEntidade } from "../validation.js";

export function inicializarClientes() {
    const form = document.querySelector("#form-cadastro-cliente");
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const dadosCliente = {
                id: Math.random().toString(36).substring(2, 9),
                nome: formData.get("nome"),
                documento: formData.get("documento")
            };

            const validacao = validarCadastroEntidade(dadosCliente);
            if (document.querySelector("#error-cliente-nome")) document.querySelector("#error-cliente-nome").textContent = "";
            if (document.querySelector("#error-cliente-documento")) document.querySelector("#error-cliente-documento").textContent = "";

            if (!validacao.valido) {
                if (validacao.erros.nome && document.querySelector("#error-cliente-nome")) document.querySelector("#error-cliente-nome").textContent = validacao.erros.nome;
                if (validacao.erros.documento && document.querySelector("#error-cliente-documento")) document.querySelector("#error-cliente-documento").textContent = validacao.erros.documento;
                return;
            }

            const banco = loadCadastros();
            banco.clientes.push(dadosCliente);
            saveCadastros(banco);

            form.reset();
            renderizarTabelaClientes();
        };
    }
    renderizarTabelaClientes();
}

export function excluirCliente(id) {
    const banco = loadCadastros();
    banco.clientes = banco.clientes.filter(c => c.id !== id);
    saveCadastros(banco);
    renderizarTabelaClientes();
}

export function inicializarFornecedores() {
    const form = document.querySelector("#form-cadastro-fornecedor");
    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault();
            
            const formData = new FormData(form);
            const dadosFornecedor = {
                id: Math.random().toString(36).substring(2, 9),
                nome: formData.get("nome"),
                documento: formData.get("documento")
            };

            const validacao = validarCadastroEntidade(dadosFornecedor);
            if (document.querySelector("#error-fornecedor-nome")) document.querySelector("#error-fornecedor-nome").textContent = "";
            if (document.querySelector("#error-fornecedor-documento")) document.querySelector("#error-fornecedor-documento").textContent = "";

            if (!validacao.valido) {
                if (validacao.erros.nome && document.querySelector("#error-fornecedor-nome")) document.querySelector("#error-fornecedor-nome").textContent = validacao.erros.nome;
                if (validacao.erros.documento && document.querySelector("#error-fornecedor-documento")) document.querySelector("#error-fornecedor-documento").textContent = validacao.erros.documento;
                return;
            }

            const banco = loadCadastros();
            banco.fornecedores.push(dadosFornecedor);
            saveCadastros(banco);

            form.reset();
            renderizarTabelaFornecedores();
        };
    }
    renderizarTabelaFornecedores();
}

export function excluirFornecedor(id) {
    const banco = loadCadastros();
    // Filtra removendo o fornecedor correspondente ao ID selecionado
    banco.fornecedores = banco.fornecedores.filter(f => f.id !== id);
    saveCadastros(banco);
    renderizarTabelaFornecedores();
}

function renderizarTabelaClientes() {
    const tbody = document.querySelector("#tabela-clientes");
    if (!tbody) return;
    tbody.replaceChildren();
    
    const banco = loadCadastros();
    const listaClientes = banco.clientes || [];
    listaClientes.forEach(c => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--border-color)";
        tr.innerHTML = `
            <td style="padding: 0.75rem;">${c.nome}</td>
            <td style="padding: 0.75rem;">${c.documento}</td>
            <td style="padding: 0.75rem;">
                <button class="btn-excluir-cliente" data-id="${c.id}" style="background-color: var(--color-expense); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: var(--radius-md); cursor: pointer; font-size: 0.85rem; font-weight: 600;">🗑️ Excluir</button>
            </td>`;
        tbody.appendChild(tr);
    });

    document.querySelectorAll(".btn-excluir-cliente").forEach(btn => {
        btn.onclick = function() { excluirCliente(btn.dataset.id); };
    });
}

function renderizarTabelaFornecedores() {
    const tbody = document.querySelector("#tabela-fornecedores");
    if (!tbody) return;
    tbody.replaceChildren();
    
    const banco = loadCadastros();
    const listaForn = banco.fornecedores || [];
    listaForn.forEach(f => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--border-color)";
        tr.innerHTML = `
            <td style="padding: 0.75rem;">${f.nome}</td>
            <td style="padding: 0.75rem;">${f.documento}</td>
            <td style="padding: 0.75rem;">
                <button class="btn-excluir-fornecedor" data-id="${f.id}" style="background-color: var(--color-expense); color: white; border: none; padding: 0.4rem 0.8rem; border-radius: var(--radius-md); cursor: pointer; font-size: 0.85rem; font-weight: 600;">🗑️ Excluir</button>
            </td>`;
        tbody.appendChild(tr);
    });

    // Vincula o evento de exclusão aos botões dinâmicos de fornecedores
    document.querySelectorAll(".btn-excluir-fornecedor").forEach(btn => {
        btn.onclick = function() { excluirFornecedor(btn.dataset.id); };
    });
}
