document.addEventListener('DOMContentLoaded', () => {
    // Alternar visibilidade do menu lateral
    const menu = document.querySelector('nav.menu-lateral');
    const toggleBtn = document.querySelector('.btn-expandir');

    if (menu && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('expandido');
        });
    }

    // Inicializar o carrinho
    inicializarCarrinho();

    // Sistema de pesquisa
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input').value;

            fetch(`/produtos/pesquisar?query=${encodeURIComponent(searchInput)}`)
                .then((response) => response.json())
                .then((data) => {
                    exibirResultados(data);
                })
                .catch((err) => console.error('Erro na pesquisa:', err));
        });
    }

    // Evento do botão "Adicionar"
    const btnAdicionar = document.querySelector('#btn-adicionar');
    if (btnAdicionar) {
        btnAdicionar.addEventListener('click', () => {
            window.location.href = '/adicionar';
        });
    }
});

// Função para inicializar o carrinho
function inicializarCarrinho() {
    const botaoAddCarrinho = document.querySelectorAll('.btn-add-carrinho');

    botaoAddCarrinho.forEach((botao) => {
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
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (response.ok) {
                alert('Produto adicionado ao carrinho!');
            } else {
                throw new Error('Falha ao adicionar o produto.');
            }
        })
        .catch((err) => console.error('Erro ao adicionar ao carrinho:', err));
}

// Função para exibir resultados da pesquisa
function exibirResultados(produtos) {
    const container = document.querySelector('.produtos-grid');
    if (container) {
        container.innerHTML = ''; // Limpar os resultados anteriores

        produtos.forEach((produto) => {
            const card = document.createElement('div');
            card.classList.add('card-produto');

            card.innerHTML = `
                <img src="/uploads/${produto.imagem}" alt="${produto.nome}" />
                <h4>${produto.nome}</h4>
                <p class="preco">R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</p>
            `;

            container.appendChild(card);
        });
    }
}
