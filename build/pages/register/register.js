"use strict";
function validarTextoApenasLetras(input) {
    return input.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
}
const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const emailInput = document.getElementById("email");
const cpfInput = document.getElementById("cpf");
const telefoneInput = document.getElementById("telefone");
const passwordInput = document.getElementById("password");
function criarMensagemErro(campo) {
    const msgErro = document.createElement("p");
    msgErro.style.color = "red";
    msgErro.style.fontSize = "12px";
    msgErro.style.margin = "5px 0 0";
    campo.insertAdjacentElement("afterend", msgErro);
    return msgErro;
}
const msgErroNome = criarMensagemErro(nomeInput);
const msgErroSobrenome = criarMensagemErro(sobrenomeInput);
const msgErroCPF = criarMensagemErro(cpfInput);
const msgErroTelefone = criarMensagemErro(telefoneInput);
nomeInput.addEventListener("input", () => {
    const textoCorrigido = validarTextoApenasLetras(nomeInput.value);
    msgErroNome.textContent = nomeInput.value !== textoCorrigido ? "Apenas letras são permitidas!" : "";
    nomeInput.value = textoCorrigido;
});
sobrenomeInput.addEventListener("input", () => {
    const textoCorrigido = validarTextoApenasLetras(sobrenomeInput.value);
    msgErroSobrenome.textContent = sobrenomeInput.value !== textoCorrigido ? "Apenas letras são permitidas!" : "";
    sobrenomeInput.value = textoCorrigido;
});
cpfInput.addEventListener("input", () => {
    cpfInput.value = formatarCPF(cpfInput.value);
    msgErroCPF.textContent = validarCPF(cpfInput.value) ? "" : "Insira um CPF válido!";
});
telefoneInput.addEventListener("input", () => {
    telefoneInput.value = formatarTelefone(telefoneInput.value);
    msgErroTelefone.textContent = validarTelefone(telefoneInput.value) ? "" : "Telefone inválido!";
});
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
function validarTelefone(telefone) {
    const regexFixo = /^\(\d{2}\) \d{4}-\d{4}$/;
    const regexCelular = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regexFixo.test(telefone) || regexCelular.test(telefone);
}
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11)
        return false;
    let soma = 0, resto;
    for (let i = 0; i < 9; i++)
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(9)))
        return false;
    soma = 0;
    for (let i = 0; i < 10; i++)
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11)
        resto = 0;
    if (resto !== parseInt(cpf.charAt(10)))
        return false;
    return true;
}
function validarFormulario() {
    const cpfField = document.getElementById("cpf");
    const telefoneField = document.getElementById("telefone");
    const cpf = cpfField.value;
    const telefone = telefoneField.value;
    if (!validarCPF(cpf)) {
        alert("CPF inválido! Por favor, insira um CPF válido.");
        return false;
    }
    if (!validarTelefone(telefone)) {
        alert("Telefone inválido! Use o formato (DDD) xxxx-xxxx ou (DDD) 9xxx-xxxx.");
        return false;
    }
    return true;
}
const formRegister = document.getElementById("formCadastro");
cpfInput.addEventListener("input", () => {
    cpfInput.value = formatarCPF(cpfInput.value);
});
telefoneInput.addEventListener("input", () => {
    telefoneInput.value = formatarTelefone(telefoneInput.value);
});
formRegister.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validarFormulario())
        return;
    const formData = {
        nome: nomeInput.value,
        sobrenome: sobrenomeInput.value,
        email: emailInput.value,
        cpf: cpfInput.value,
        telefone: telefoneInput.value,
        password: passwordInput.value
    };
    console.log(formData);
    try {
        const response = await fetch("faltaFazerApi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        console.log("Resposta da API:", result);
        alert("Cadastro realizado com sucesso!");
        formRegister.reset();
    }
    catch (error) {
        console.error("Erro ao enviar:");
        alert("Erro ao enviar o formulário.");
    }
});
