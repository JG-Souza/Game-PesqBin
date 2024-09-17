const min = 0;
const max = 500;
let escolhaComp = Math.floor(Math.random() * (max - min + 1)) + min;
let tentativas = 1;

const botaoTentar = document.getElementById('botaoTentar');
const formularioAdivinhar = document.getElementById('formAdivinhar');
const formularioEscolher = document.getElementById('formEscolher')
const botaoAdivinhar = document.getElementById('adivinhar');
const botaoEscolher = document.getElementById('escolher');
const botaoEnviar = document.getElementById('botaoEnviar')
const botaoSim = document.getElementById('botaoSim')
const botaoNao = document.getElementById('botaoNao')
const resultado = document.getElementById('resultado')

let listaNumeros = []
for (let i = 1; i < 501; i++) {
        listaNumeros.push(i)
    }
let elementoInicial = listaNumeros[0]
let elementoFinal = listaNumeros[listaNumeros.length -1]
let elementoMeio = Math.floor((elementoInicial + elementoFinal) / 2)
let numeroBuscado = 0
let elementoMeioIndex
let novaLista = []


formularioAdivinhar.style.display = 'none';
botaoTentar.style.display = 'none';
formularioEscolher.style.display = 'none';
botaoEnviar.style.display = 'none';
botaoNao.style.display ='none'
botaoSim.style.display = 'none'
resultado.style.display = 'none'

// Funções e botões


botaoTentar.addEventListener('click', () => {
    const escolhaJogador = Number(document.getElementById('inputAdivinhar').value); // Converte para número

    if (escolhaJogador === escolhaComp) {
        Swal.fire(`Você acertou!!! Precisou de apenas ${tentativas} tentativas`);
        formularioAdivinhar.style.display = 'none';
        botaoTentar.style.display = 'none';
        botaoAdivinhar.style.display = 'block';
        botaoEscolher.style.display = 'block';
        let novaEscolhaComp = Math.floor(Math.random() * (max - min + 1)) + min;
        escolhaComp = novaEscolhaComp
        tentativas = 0

    } else if (escolhaJogador < escolhaComp) {
        Swal.fire('O número que você inseriu é menor do que o número correto');
    } else if (escolhaJogador > escolhaComp) {
        Swal.fire('O número que você digitou é maior que o número correto');
    }

    tentativas++;
});


botaoEnviar.addEventListener('click', () => {
    tentativas = 1
    numeroBuscado = Number(document.getElementById('inputEscolher').value)
    resultado.style.display = 'block'
    resultado.textContent = 'Tentativa ' +':'  + elementoMeio;
    botaoNao.style.display ='block'
    botaoSim.style.display = 'block'
    formularioEscolher.style.display = 'none';
    botaoEnviar.style.display = 'none';
})

botaoEscolher.addEventListener('click', () => {
    formularioEscolher.style.display = 'block';
    botaoEnviar.style.display = 'block';
    botaoAdivinhar.style.display = 'none';
    botaoEscolher.style.display = 'none';
})

botaoSim.addEventListener('click', () => {
    Swal.fire(`O Computador acertou!!! Com ${tentativas} tentativas`).then(() => {
        botaoAdivinhar.style.display = 'block'
        botaoEscolher.style.display = 'block'
        resultado.style.display = 'none'
        botaoSim.style.display = 'none'
        botaoNao.style.display = 'none'

        let novoNumeroBuscado = Number(document.getElementById('inputEscolher').value)
        numeroBuscado = novoNumeroBuscado
        novaLista = listaNumeros
        elementoInicial = novaLista[0]
        elementoFinal = novaLista[listaNumeros.length -1]
        elementoMeio = Math.floor((elementoInicial + elementoFinal) / 2)
        tentativas = 0
    });
    


})

function tentativaComp() {
    if(numeroBuscado == elementoMeio) {
        Swal.fire(`Tentou mentir, né? o Computador sabe que acertou! E com ${tentativas} tentativas`).then(() => {
            botaoAdivinhar.style.display = 'block'
            botaoEscolher.style.display = 'block'
            resultado.style.display = 'none'
            botaoSim.style.display = 'none'
            botaoNao.style.display = 'none'

            let novoNumeroBuscado = Number(document.getElementById('inputEscolher').value)
            numeroBuscado = novoNumeroBuscado
            novaLista = listaNumeros
            elementoInicial = novaLista[0]
            elementoFinal = novaLista[listaNumeros.length -1]
            elementoMeio = Math.floor((elementoInicial + elementoFinal) / 2)
            tentativas = 0
        });
        
  
    } else if(numeroBuscado < elementoMeio) {
        novaLista = listaNumeros.slice(elementoInicial - 1, elementoMeio)
    } else if (numeroBuscado > elementoMeio){
        novaLista = listaNumeros.slice(elementoMeio - 1, elementoFinal)
    }

    elementoInicial = novaLista[0]
    elementoFinal = novaLista[novaLista.length -1]

    const par = novaLista.length % 2 === 0
    if (par) {
        elementoMeioIndex = novaLista.length / 2 - 1
    } else {
        elementoMeioIndex = Math.floor(novaLista.length / 2)
    }
    elementoMeio = novaLista[elementoMeioIndex]
    tentativas ++
}


botaoNao.addEventListener('click', () => {
    tentativaComp()

    resultado.textContent = 'Tentativa ' +':'  + elementoMeio;
    
})

botaoAdivinhar.addEventListener('click', () => {
    formularioAdivinhar.style.display = 'block';
    botaoTentar.style.display = 'block';
    botaoAdivinhar.style.display = 'none';
    botaoEscolher.style.display = 'none';
});



