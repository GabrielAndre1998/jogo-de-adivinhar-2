//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo de adivinhaçao';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Digite um numero e tente adivinhar qual e o correto de 1 ao 10 ';
    
// Declaração de uma variável para armazenar a lista de números sorteados
let listaDeNumerosSorteados = [];

// Definição do número limite para o jogo
let numeroLimite = 10;

// Chamada da função para gerar um número aleatório e atribuição do resultado à variável numeroSecreto
let numeroSecreto = gerarNumeroAleatorio();

// Inicialização do contador de tentativas
let tentativas = 1;

// Função para exibir um texto na tela, recebe uma tag HTML e um texto como parâmetros
function exibirTextoNaTela(tag, texto) {
    // Seleciona o elemento HTML com a tag especificada
    let campo = document.querySelector(tag);
    // Define o conteúdo desse elemento como o texto passado como parâmetro
    campo.innerHTML = texto;
}

// Chamada da função para exibir o título do jogo e uma mensagem inicial
exibirTextoNaTela('h1', 'Jogo de adivinhação');
exibirTextoNaTela('p', 'Digite um número e tente adivinhar qual é o correto de 1 a 10.');

// Função para verificar o chute do jogador
function verificarChute() {
    // Seleciona o elemento input onde o jogador digita o seu chute
    let chute = document.querySelector('input').value;
    // Verifica se o chute do jogador é igual ao número secreto
    if (chute == numeroSecreto) {
        // Exibe mensagem de acerto na tela
        exibirTextoNaTela('h1', 'Acertou!');
        // Verifica se houve mais de uma tentativa para corrigir a gramática da mensagem
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        // Monta a mensagem de quantas tentativas foram necessárias para acertar
        let mensagemTentativas = `Você descobriu o número secreto com (${tentativas}) ${palavraTentativas}!`;
        // Exibe a mensagem na tela
        exibirTextoNaTela('p', mensagemTentativas);
        // Habilita o botão de reiniciar o jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // Se o chute não for correto, verifica se é maior ou menor que o número secreto
        if (chute > numeroSecreto) {
            // Exibe mensagem indicando que o número secreto é menor
            exibirTextoNaTela('p', 'O número secreto é MENOR.');
        } else {
            // Exibe mensagem indicando que o número secreto é maior
            exibirTextoNaTela('p', 'O número secreto é MAIOR.');
        }
        // Incrementa o número de tentativas
        tentativas++;
        // Limpa o campo de input para que o jogador possa tentar novamente
        limparCampo();
    }
}

// Função para gerar um número aleatório dentro do limite definido
function gerarNumeroAleatorio() {
    // Gera um número aleatório entre 1 e o número limite
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // Obtém a quantidade de elementos na lista de números sorteados
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Verifica se a lista de números sorteados já atingiu o limite
    if (quantidadeDeElementosNaLista == numeroLimite) {
        // Se sim, reinicia a lista
        listaDeNumerosSorteados = [];
    }
    // Verifica se o número sorteado já está na lista de números sorteados
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se sim, chama recursivamente a função para sortear outro número
        return gerarNumeroAleatorio();
    } else {
        // Se não, adiciona o número à lista de números sorteados e o retorna
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de input após cada tentativa
function limparCampo() {
    // Seleciona o campo de input
    chute = document.querySelector('input');
    // Limpa o valor do campo
    chute.value = '';
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    // Gera um novo número secreto
    numeroSecreto = gerarNumeroAleatorio();
    // Limpa o campo de input
    limparCampo();
    // Reinicia o contador de tentativas
    tentativas = 1;
    // Exibe novamente o título do jogo e a mensagem inicial
    exibirTextoNaTela('h1', 'Jogo de adivinhação');
    exibirTextoNaTela('p', 'Digite um número e tente adivinhar qual é o correto de 1 a 10.');
    // Desabilita o botão de reiniciar o jogo até que o jogador faça uma nova tentativa
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
