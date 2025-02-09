// Função para validar se a entrada contém apenas letras
function validarTextoApenasLetras(input: string): string {
    return input.replace(/[^A-Za-zÀ-ÿ\s]/g, ""); // Remove números e caracteres especiais
}

// Obtém os campos do formulário
const nomeInput = document.getElementById("nome") as HTMLInputElement;
const sobrenomeInput = document.getElementById("sobrenome") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const cpfInput = document.getElementById("cpf") as HTMLInputElement;
const telefoneInput = document.getElementById("telefone") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;

// Função para criar e adicionar mensagens de erro abaixo de um campo específico
function criarMensagemErro(campo: HTMLInputElement): HTMLParagraphElement {
    const msgErro = document.createElement("p");
    msgErro.style.color = "red";
    msgErro.style.fontSize = "12px";
    msgErro.style.margin = "5px 0 0";
    campo.insertAdjacentElement("afterend", msgErro);
    return msgErro;
}

// Criando mensagens de erro para cada campo
const msgErroNome = criarMensagemErro(nomeInput);
const msgErroSobrenome = criarMensagemErro(sobrenomeInput);
const msgErroCPF = criarMensagemErro(cpfInput);
const msgErroTelefone = criarMensagemErro(telefoneInput);

// Eventos para validação dos campos
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


// Função para formatar CPF
function formatarCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9) return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}

//Função para formatar telefone
function formatarTelefone(telefone: string): string {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length <= 2) return `(${telefone}`;
    if (telefone.length <= 6) return `(${telefone.slice(0, 2)}) ${telefone.slice(2)}`;
    if (telefone.length <= 10) return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 6)}-${telefone.slice(6)}`;
    return `(${telefone.slice(0, 2)}) ${telefone.slice(2, 7)}-${telefone.slice(7, 11)}`;
}

//Validação de Telefone
function validarTelefone(telefone: string): boolean {
    const regexFixo = /^\(\d{2}\) \d{4}-\d{4}$/;  // (84) 3333-4444
    const regexCelular = /^\(\d{2}\) \d{5}-\d{4}$/;  // (84) 98888-4444
    return regexFixo.test(telefone) || regexCelular.test(telefone);
}
// Validação do CPF
function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;

    let soma = 0, resto;

    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}



// Função de validação do formulário
function validarFormulario(): boolean {
    const cpfField = document.getElementById("cpf") as HTMLInputElement;
    const telefoneField = document.getElementById("telefone") as HTMLInputElement;


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

// Manipulação do formulário
const form = document.getElementById("formCadastro") as HTMLFormElement;

// Eventos de formatação ao digitar
cpfInput.addEventListener("input", () => {
    cpfInput.value = formatarCPF(cpfInput.value);
});

telefoneInput.addEventListener("input", () => {
    telefoneInput.value = formatarTelefone(telefoneInput.value);
});

// Evento de envio do formulário
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!validarFormulario()) return;

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
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar:");
        alert("Erro ao enviar o formulário.");
    }
});
