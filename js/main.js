// seleciona o formulário pelo ID
const form = document.getElementById('novoItem');

// seleciona a lista pelo ID
const lista = document.getElementById("lista");

const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criaElemento(elemento);
})
// adiciona um listener para o evento de submit do formulário
form.addEventListener('submit', (evento) => {
    // evita que o formulário seja enviado (recarregando a página)
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find(elemento =>  elemento.nome === nome.value)

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id).id] = itemAtual;
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        itens.push(itemAtual);
    }

    // chama a função para criar um novo item, passando os valores dos campos do formulário como argumentos
   

    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
})

// função para criar um novo elemento de lista com nome e quantidade
function criaElemento(item) {

    // cria um novo elemento de lista (<li>)
    const novoItem =  document.createElement('li');

    // adiciona a classe "item" ao novo elemento
    novoItem.classList.add('item');

    // cria um elemento <strong> para exibir a quantidade
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    // adiciona o elemento <strong> como filho do novo elemento de lista
    novoItem.appendChild(numeroItem);

    // adiciona o nome do item como texto dentro do novo elemento de lista
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    // adiciona o novo elemento de lista como filho da lista (<ul>) com ID "lista"
    lista.appendChild(novoItem);

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'X';

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode)
    })

    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id == id), 1);

    console.log(itens);
    localStorage.setItem('itens', JSON.stringify(itens));
}