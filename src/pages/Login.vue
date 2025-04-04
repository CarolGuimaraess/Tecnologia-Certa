<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const roteador = useRouter()
const cpf = ref('')
const senha = ref('')
const mensagemDeErro = ref('')

const formatarCPF = (valor: string) =>
    valor.replace(/\D/g, '').slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const realizarLogin = () => {
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || '{}')

    if (usuarioSalvo.cpf === cpf.value && usuarioSalvo.senha === senha.value) {
        localStorage.setItem('logado', 'true')
        roteador.push('/estoque')
    } else {
        mensagemDeErro.value = 'CPF ou senha inválidos!'
    }
}
</script>

<template>
    <div class="form-container">
        <h2>Acesso ao Sistema</h2>

        <form @submit.prevent="realizarLogin">
            <input v-model="cpf" placeholder="CPF" @input="cpf = formatarCPF(cpf)" maxlength="14" required />

            <input v-model="senha" type="password" placeholder="Senha" required autocomplete="current-password" />

            <button type="submit">Entrar</button>

            <p class="mensagem-erro" v-if="mensagemDeErro">{{ mensagemDeErro }}</p>
        </form>

        <p class="login-link">
            Não tem conta?
            <router-link to="/cadastro">Cadastre-se</router-link>
        </p>
    </div>
</template>

<style scoped>
.form-container {
    max-width: 400px;
    margin: 60px auto;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input,
button {
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    font-size: 1rem;
    border-radius: 5px;
    box-sizing: border-box;
}

input {
    border: 1px solid #ccc;
}

input:focus {
    border-color: #4a63ff;
}

button {
    background: #4a63ff;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:hover {
    background: #3947cc;
}

.mensagem-erro {
    color: #d00000;
    margin-top: 10px;
    font-weight: bold;
}

.login-link {
    margin-top: 15px;
    font-size: 0.95rem;
}

.login-link a {
    color: #4a63ff;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}

@media (max-width: 500px) {
    .form-container {
        margin: 20px;
        padding: 15px;
    }

    input,
    button {
        font-size: 0.95rem;
        padding: 10px;
    }
}
</style>
