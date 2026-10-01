/** @jest-environment jsdom */
import { jest } from '@jest/globals';
import { inicializarClientes, inicializarFornecedores } from "./views/cadastros.js";

describe("👥 Testes Unitários - Módulo de Cadastros (cadastros.js)", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test("Deve salvar um novo cliente no localStorage ao enviar o formulário válido", () => {
        document.body.innerHTML = `
            <form id="form-cadastro-cliente">
                <input type="text" id="cliente-nome" name="nome">
                <small id="error-cliente-nome"></small>
                <input type="text" id="cliente-documento" name="documento">
                <small id="error-cliente-documento"></small>
                <button type="submit">Salvar</button>
            </form>
            <table><tbody id="tabela-clientes"></tbody></table>
        `;

        inicializarClientes();

        document.querySelector("#cliente-nome").value = "Leonardo Takedi Onuki";
        document.querySelector("#cliente-documento").value = "35889984899";

        const form = document.querySelector("#form-cadastro-cliente");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        const dadosSalvos = JSON.parse(localStorage.getItem("fincontrol_cadastros")) || {};
        expect(dadosSalvos.clientes).toHaveLength(1);
        expect(dadosSalvos.clientes[0].nome).toBe("Leonardo Takedi Onuki");
        expect(dadosSalvos.clientes[0].documento).toBe("35889984899");
    });

    test("Deve reter o envio do fornecedor se o CNPJ for inválido", () => {
        document.body.innerHTML = `
            <form id="form-cadastro-fornecedor">
                <input type="text" id="fornecedor-nome" name="nome">
                <small id="error-fornecedor-nome"></small>
                <input type="text" id="fornecedor-documento" name="documento">
                <small id="error-fornecedor-documento"></small>
                <button type="submit">Salvar</button>
            </form>
            <table><tbody id="tabela-fornecedores"></tbody></table>
        `;

        inicializarFornecedores();

        document.querySelector("#fornecedor-nome").value = "Distribuidora ABC";
        document.querySelector("#fornecedor-documento").value = "123";

        const form = document.querySelector("#form-cadastro-fornecedor");
        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

        const dadosSalvos = JSON.parse(localStorage.getItem("fincontrol_cadastros")) || {};
        expect(dadosSalvos.fornecedores || []).toHaveLength(0);
        expect(document.querySelector("#error-fornecedor-documento").textContent).toBe("Insira um CPF ou CNPJ válido.");
    });

    test("Deve excluir um cliente do localStorage ao clicar no botão de exclusão", () => {
        document.body.innerHTML = `<table><tbody id="tabela-clientes"></tbody></table>`;
        
        const dadosFalsos = {
            clientes: [{ id: "cli123", nome: "Cliente Teste Remocao", documento: "11122233344" }],
            fornecedores: []
        };
        localStorage.setItem("fincontrol_cadastros", JSON.stringify(dadosFalsos));

        inicializarClientes();

        const btnExcluir = document.querySelector(".btn-excluir-cliente");
        expect(btnExcluir).not.toBeNull();
        btnExcluir.click();

        const dadosSalvos = JSON.parse(localStorage.getItem("fincontrol_cadastros")) || {};
        expect(dadosSalvos.clientes).toHaveLength(0);
        expect(document.querySelectorAll("#tabela-clientes tr")).toHaveLength(0);
    });
        test("Deve excluir um fornecedor do localStorage ao clicar no botão de exclusão", () => {
        document.body.innerHTML = `<table><tbody id="tabela-fornecedores"></tbody></table>`;
        
        const dadosFalsos = {
            clientes: [],
            fornecedores: [{ id: "forn789", nome: "Fornecedor Teste Remocao", documento: "12345678000199" }]
        };
        localStorage.setItem("fincontrol_cadastros", JSON.stringify(dadosFalsos));

        inicializarFornecedores();

        const btnExcluir = document.querySelector(".btn-excluir-fornecedor");
        expect(btnExcluir).not.toBeNull();
        btnExcluir.click();

        const dadosSalvos = JSON.parse(localStorage.getItem("fincontrol_cadastros")) || {};
        expect(dadosSalvos.fornecedores).toHaveLength(0);
        expect(document.querySelectorAll("#tabela-fornecedores tr")).toHaveLength(0);
    });
});