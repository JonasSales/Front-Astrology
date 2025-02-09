"use strict";
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length <= 3)
        return cpf;
    if (cpf.length <= 6)
        return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9)
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}
function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length <= 2)
        return `(${telefone}`;
    if (telefone.length <= 6)
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    if (telefone.length <= 10)
        return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
}
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11)
        return false;
    let soma = 0;
    let resto;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(9)))
        return false;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(10)))
        return false;
    return true;
}
function validarFormulario() {
    const cpfField = document.getElementById("cpf");
    const cpf = cpfField.value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido! Por favor, insira um CPF válido.");
        return false;
    }
    return true;
}
const form = document.getElementById("formCadastro");
const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");
cpfInput.addEventListener("input", () => {
    cpfInput.value = formatarCPF(cpfInput.value);
});
telefoneInput.addEventListener("input", () => {
    telefoneInput.value = formatarTelefone(telefoneInput.value);
});
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validarFormulario()) {
        return;
    }
    const formData = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        telefone: telefoneInput.value,
        email: document.getElementById("email").value,
        cpf: cpfInput.value
    };
    try {
        const response = await fetch("https://suaapi.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log("Resposta da API:", result);
        alert("Cadastro realizado com sucesso!");
        form.reset();
    }
    catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao enviar o formulário.");
    }
});
