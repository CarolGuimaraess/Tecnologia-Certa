<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const roteador = useRouter()
const termoDeBusca = ref('')
const nomeDoUsuario = ref('Usuário')
const dadosDoPagador = ref<{
  nome: string
  cpf: string
  endereco: {
    bairro: string
    cep: string
    cidade: string
    estadoUF: string
    logradouro: string
  }
}>({
  nome: '',
  cpf: '',
  endereco: {
    bairro: '',
    cep: '',
    cidade: '',
    estadoUF: '',
    logradouro: ''
  }
})

onMounted(() => {
  const dadosUsuario = localStorage.getItem('usuario')
  if (dadosUsuario) {
    const usuario = JSON.parse(dadosUsuario)
    nomeDoUsuario.value = usuario.nome
    dadosDoPagador.value = usuario
  }
})

const listaDeProdutos = ref([
  {
    id: 1,
    nome: 'Notebook Gamer',
    preco: 5500,
    estoque: 5,
    imagem: 'https://benchpromos.com.br/_next/image?url=https%3A%2F%2Facerstore.vtexassets.com%2Farquivos%2Fids%2F161729-1200-auto%3Fv%3D638024224749900000%26width%3D1200%26height%3Dauto%26aspect%3Dtrue&w=3840&q=75',
  },
  {
    id: 2,
    nome: 'Monitor 27" 144Hz',
    preco: 1800,
    estoque: 3,
    imagem: 'https://www.gamemax-br.com/img/produtos/1542873654(4).png',
  },
  {
    id: 3,
    nome: 'Teclado Mecânico RGB',
    preco: 350,
    estoque: 8,
    imagem: 'https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/301622057/k653-rgb-2-8825-pt-brown-9knemk9rjh.png',
  },
  {
    id: 4,
    nome: 'Mouse Gamer 16000 DPI',
    preco: 220,
    estoque: 10,
    imagem: 'https://img.terabyteshop.com.br/produto/g/mouse-gamer-redragon-cobra-pro-rgb-wireless-16000-dpi-8-botoes-programaveis-black-m711-pro_189329.png',
  },
  {
    id: 5,
    nome: 'Cadeira Gamer Reclinável',
    preco: 1200,
    estoque: 4,
    imagem: 'https://www.informak.com.br/image/cache/catalog/CADEIRAS%20%20POLTRONAS/155549-800-auto-728x800.png',
  },
  {
    id: 6,
    nome: 'Headset Surround 7.1',
    preco: 460,
    estoque: 6,
    imagem: 'https://static.vecteezy.com/system/resources/thumbnails/017/054/074/small/headphones-design-3d-rendering-for-product-mockup-png.png',
  },
  {
    id: 7,
    nome: 'Placa de Vídeo RTX 4070',
    preco: 3800,
    estoque: 2,
    imagem: 'https://img.terabyteshop.com.br/produto/g/placa-de-video-gigabyte-aorus-master-nvidia-geforce-rtx-4070-ti-super-16gb-gddr6x-dlss-ray-tracing-gv-n407tsaorus-m-16gd_193216.png',
  },
  {
    id: 8,
    nome: 'Processador Ryzen 9',
    preco: 2900,
    estoque: 5,
    imagem: 'https://s2-techtudo.glbimg.com/Uy9aOc0pCVQIba1iZlknJRYjjGQ=/0x0:992x558/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/P/D/ImKybbQUabNc8u0w4O6g/616656-amd-ryzen-9-5000-series-pib-1260x709-0.webp',
  },
  {
    id: 9,
    nome: 'Fonte 750W',
    preco: 600,
    estoque: 7,
    imagem: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/486503/Fonte-Gigabyte-Ud-750w-Modular-Efici-ncia-90-80-Plus-Gold-Gp-ud750gm_1731503932_g.jpg',
  },
  {
    id: 10,
    nome: 'Gabinete gamer Cougar Airface PRO White',
    preco: 500,
    estoque: 9,
    imagem: 'https://cdn.awsli.com.br/600x450/1882/1882647/produto/278784633/duofaceprorgb-w-01-d7ytacpl57.png',
  },
]);


const produtosFiltrados = computed(() =>
  listaDeProdutos.value.filter(produto =>
    produto.nome.toLowerCase().includes(termoDeBusca.value.toLowerCase())
  )
)

const dataAtual = new Date()
const dataVencimento = new Date()
dataVencimento.setDate(dataAtual.getDate() + 1)

const realizarCompra = async (produto: any) => {
  if (produto.estoque <= 0) return

  produto.estoque--
console.log(dadosDoPagador.value.cpf)
  const corpoRequisicao = {
    pagador: {
      endereco: {
        bairro: dadosDoPagador.value.endereco.bairro,
        cep: dadosDoPagador.value.endereco.cep,
        cidade: dadosDoPagador.value.endereco.cidade,
        estadoUF: dadosDoPagador.value.endereco.estadoUF,
        logradouro: dadosDoPagador.value.endereco.logradouro
      },
      nome: dadosDoPagador.value.nome,
      registroNacional: dadosDoPagador.value.cpf
    },
    beneficiario: {
      cnpj: "078.033.999-03",
      nome: "Tecnologia Certa - " + produto.nome,
      endereco: { cep: "42740-040" },
      dadosBancarios: {
        agencia: "452",
        agenciaDigito: "0",
        carteira: "17",
        conta: "123873",
        contaDigito: "0",
        nossoNumero: "00031285573014000001", // Atualmente está fixo, mas precisa ser dinâmico.
        nossoNumeroDigito: ""
      }
    },
    boleto: {
      datas: {
        documentos: formatarData(dataAtual),
        processamento: formatarData(dataAtual),
        vencimento: formatarData(dataVencimento),
      },
      imagemQrCode: "",
      emv: "00020101021226920014br.gov.bcb.pix2570qrcodepix-h.bb.com.br/pix/v2/cobv/02df3405-b6e5-40aa-aad9-89f6d2a6273552040000530398654041.005802BR5925MERCEARIA MANASSES PEREIR6008BRASILIA62070503***6304A31A",
      especieDocumento: "DM",
      numeroDocumento: "",
      valor: produto.preco
    }
  }

  try {
    const resposta = await fetch('http://localhost:4000/boleto/pdf/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpoRequisicao)
    })

    if (!resposta.ok) throw new Error('Erro ao gerar boleto')

    const arquivo = await resposta.blob()
    const url = window.URL.createObjectURL(arquivo)

    const linkDeDownload = document.createElement('a')
    linkDeDownload.href = url
    linkDeDownload.download = 'boleto.pdf'
    document.body.appendChild(linkDeDownload)
    linkDeDownload.click()
    document.body.removeChild(linkDeDownload)
    window.URL.revokeObjectURL(url)
  } catch (erro) {
    console.error('Erro:', erro)
    alert('Erro ao gerar o boleto.')
  }
}

function formatarData(data: Date): string {
  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}-${mes}-${ano}`
}

const sair = () => {
  localStorage.setItem('logado', 'false')
  roteador.push('/login')
}
</script>

<template>
  <div class="app">
    <header class="header">
      <h2>Tecnologia Certa</h2>
      <div class="usuario">Olá, {{ nomeDoUsuario }}
        <button @click="sair" class="sair">Sair</button>
      </div>
    </header>

    <div class="container">
      <div class="search-bar">
        <input v-model="termoDeBusca" type="text" placeholder="Pesquisar produtos..." class="search-input" />
      </div>

      <div class="grid">
        <div v-for="produto in produtosFiltrados" :key="produto.id" class="produto">
          <img :src="produto.imagem" :alt="produto.nome" class="imagem-produto" />
          <p class="text-lg font-semibold">{{ produto.nome }}</p>
          <p class="text-sm">R$ {{ produto.preco.toFixed(2) }}</p>
          <p class="text-sm">Estoque: {{ produto.estoque }}</p>
          <button :disabled="produto.estoque === 0" @click="realizarCompra(produto)" class="botao">
            Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f6f8;
  min-height: 100vh;
}

.header {
  background-color: #646cff;
  color: white;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.usuario {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sair {
  background-color: white;
  color: #646cff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.sair:hover {
  background-color: #e0e0ff;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.search-bar {
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.produto {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s;
  min-height: 380px;
  /* evita aumentar ao pesquisar */
  max-height: 380px;
  overflow: hidden;
}

.produto:hover {
  transform: scale(1.02);
}

.imagem-produto {
  max-width: 100%;
  height: 160px;
  object-fit: contain;
  margin-bottom: 10px;
}

.produto p {
  margin: 5px 0;
}

.botao {
  margin-top: auto;
  background-color: #646cff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.botao:hover {
  background-color: #4b4fcf;
}

@media (max-width: 768px) {
  .produto {
    min-height: 360px;
    max-height: 360px;
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .produto {
    min-height: 340px;
    max-height: 340px;
  }

  .imagem-produto {
    height: 140px;
  }
}
</style>
