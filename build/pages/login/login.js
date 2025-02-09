"use strict";
const formLogin = document.getElementById("formLogin");
const emailInputLogin = document.getElementById("email");
const passwordInputLogin = document.getElementById("password");
formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = {
        email: emailInputLogin.value,
        password: passwordInputLogin.value
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
        alert("Login com sucesso!");
        formLogin.reset();
    }
    catch (error) {
        console.error("Erro ao enviar:");
        alert("Email ou senha incorretos.");
    }
});
