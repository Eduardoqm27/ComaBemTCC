// Alternar visibilidade do menu lateral
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('nav.menu-lateral');
    const toggleBtn = document.querySelector('.btn-expandir');

    toggleBtn.addEventListener('click', () => {
        menu.classList.toggle('expandido');
    });
});

// Inicializar o carrinho
function inicializarCarrinho() {
    const botaoAddCarrinho = document.querySelectorAll('.btn-add-carrinho');
    botaoAddCarrinho.forEach(botao => {
        botao.addEventListener('click', () => {
            const produtoId = botao.dataset.id;
            adicionarAoCarrinho(produtoId);
        });
    });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    fetch(`/carrinho/adicionar/${produtoId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert('Produto adicionado ao carrinho!');
        })
        .catch(err => console.error('Erro ao adicionar ao carrinho:', err));
}

// Sistema de pesquisa
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input').value;

        fetch(`/produtos/pesquisar?query=${encodeURIComponent(searchInput)}`)
            .then(response => response.json())
            .then(data => {
                exibirResultados(data);
            })
            .catch(err => console.error('Erro na pesquisa:', err));
    });
}

// Exibir resultados da pesquisa
function exibirResultados(produtos) {
    const container = document.querySelector('.produtos-grid');
    container.innerHTML = ''; // Limpar os resultados anteriores

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card-produto');

        card.innerHTML = `
            <img src="/uploads/${produto.imagem}" alt="${produto.nome}">
            <h4>${produto.nome}</h4>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        `;

        container.appendChild(card);
    });
}
