<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const roteador = useRouter()

// Campos do formulário
const nome = ref('')
const senha = ref('')
const cpf = ref('')
const logradouro = ref('')
const bairro = ref('')
const cidade = ref('')
const estadoUF = ref('')
const cep = ref('')

const formatarCPF = (valor: string) =>
    valor.replace(/\D/g, '').slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

const formatarCEP = (valor: string) =>
    valor.replace(/\D/g, '').slice(0, 8)
        .replace(/(\d{5})(\d{1,3})$/, '$1-$2')

const formatarUF = (valor: string) =>
    valor.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2)

const apenasLetras = (valor: string) =>
    valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')

const validarCampos = () =>
    nome.value.trim() &&
    senha.value.length >= 6 &&
    cpf.value.length === 14 &&
    logradouro.value.trim() &&
    bairro.value.trim() &&
    cidade.value.trim() &&
    estadoUF.value.length === 2 &&
    cep.value.length === 9

const realizarCadastro = () => {
    if (!validarCampos()) {
        alert('Preencha todos os campos corretamente.')
        return
    }

    // Verifica se o CPF já está cadastrado
    const usuarioExistente = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (usuarioExistente.cpf === cpf.value) {
        alert('Já existe um cadastro com este CPF.')
        return
    }

    const usuario = {
        nome: nome.value,
        senha: senha.value,
        cpf: cpf.value,
        endereco: {
            logradouro: logradouro.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estadoUF: estadoUF.value,
            cep: cep.value
        }
    }

    localStorage.setItem('usuario', JSON.stringify(usuario))
    alert('Cadastro realizado com sucesso!')
    roteador.push('/')
}
</script>


<template>
    <div class="form-container">
        <h2>Cadastro</h2>

        <form @submit.prevent="realizarCadastro">
            <input v-model="nome" placeholder="Nome completo" minlength="10" maxlength="100" required />
            <input v-model="cpf" placeholder="CPF" @input="cpf = formatarCPF(cpf)" maxlength="14" required />
            <input v-model="logradouro" placeholder="Logradouro" minlength="10" maxlength="100" required />
            <input v-model="bairro" placeholder="Bairro" @input="bairro = apenasLetras(bairro)" minlength="4"
                maxlength="100" required />
            <input v-model="cidade" placeholder="Cidade" @input="cidade = apenasLetras(cidade)" minlength="4"
                maxlength="100" required />
            <input v-model="estadoUF" placeholder="UF" @input="estadoUF = formatarUF(estadoUF)" minlength="2"
                maxlength="2" required />
            <input v-model="cep" placeholder="CEP" @input="cep = formatarCEP(cep)" maxlength="9" required />
            <input v-model="senha" type="password" placeholder="Senha" minlength="6" required />

            <button type="submit">Cadastrar</button>
        </form>

        <p class="login-link">
            Já tem conta?
            <router-link to="/">Voltar ao login</router-link>
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

input {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

button {
    background: #4caf50;
    color: white;
    padding: 12px;
    border: none;
    width: 100%;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background: #45a049;
}

.login-link {
    margin-top: 15px;
    font-size: 0.95rem;
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
