const selecaoVoz = document.querySelector('#selecao-voz-box')
const entradaTexto = document.querySelector('#entrada-de-texto')
const botaoOuvir = document.querySelector('#ouvir-btn')
const botaoBaixarTexto = document.querySelector('#baixar-texto-btn')
const uploadArquivo = document.querySelector('#upload-arquivo')
const botaoLimpar = document.querySelector('#limpar-btn')

// API de Vozes
const fala = new SpeechSynthesisUtterance()

let vozesDisponiveis = []

// Preencher o Select
const atualizarValores = () => {
    vozesDisponiveis = window.speechSynthesis.getVoices()

    // Limpar opções existentes
    selecaoVoz.innerHTML = ''

    // Adicionar novas opções
    vozesDisponiveis.forEach((voz, index) => {
        const opcao = document.createElement('option')
        opcao.value = index
        opcao.textContent = `${voz.name} (${voz.lang})`
        selecaoVoz.appendChild(opcao)
    })

    fala.voice = vozesDisponiveis[0]
}

window.speechSynthesis.onvoiceschanged = atualizarValores;

botaoOuvir.addEventListener('click', () => {
    fala.text = entradaTexto.value
    fala.voice = vozesDisponiveis[selecaoVoz.value]
    window.speechSynthesis.speak(fala)
})

botaoBaixarTexto.addEventListener('click', () => {
    const blob = new Blob([entradaTexto.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'texto.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
})

uploadArquivo.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            entradaTexto.value = e.target.result
        };
        reader.readAsText(file)
    }
})

botaoLimpar.addEventListener('click', () => {
    entradaTexto.value = ''
})
