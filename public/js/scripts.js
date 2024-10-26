// Função para carregar conteúdo dinamicamente
function loadContent(content) {
    const contentDiv = document.querySelector('.content');
    
    if (contentDiv) {
        switch(content) {
            case 'home':
                contentDiv.innerHTML = '<h2>Bem-vindo à Página Inicial</h2><p>Aqui está o conteúdo da página inicial.</p>';
                break;
            case 'categorias':
                contentDiv.innerHTML = '<h2>Categorias</h2><p>Aqui estão as categorias de produtos.</p>';
                break;
            case 'usuario':
                contentDiv.innerHTML = '<h2>Página do Usuário</h2><p>Aqui estão as informações do usuário.</p>';
                break;
            case 'carrinho':
                contentDiv.innerHTML = '<h2>Carrinho de Compras</h2><p>Aqui está o carrinho de compras.</p>';
                break;
            default:
                contentDiv.innerHTML = '<h2>Conteúdo Não Encontrado</h2>';
        }
    }
}

// Função para inicializar os eventos de navegação dinâmica
function initNavigation() {
    const menuItems = document.querySelectorAll('.item-menu a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const content = this.getAttribute('data-content');
            loadContent(content);
        });
    });
}

// Função para alternar exibição do formulário de adição de produtos
function toggleForm() {
    const formContainer = document.getElementById('formContainer');
    if (formContainer) {
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
    }
}

// Função para aplicar filtro de categoria
function applyCategoryFilter() {
    const filtros = document.querySelectorAll('.filtro');
    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.getAttribute('data-categoria');
            document.querySelectorAll('.card-produto').forEach(card => {
                card.style.display = (categoria === 'todas' || card.getAttribute('data-categoria') === categoria) ? 'block' : 'none';
            });
        });
    });
}

// Função de pesquisa de produtos
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput.value;

    fetch(`/produto/pesquisar?termo=${termo}`)
        .then(response => response.json())
        .then(produtos => {
            const contentDiv = document.querySelector('.content');
            contentDiv.innerHTML = ''; // Limpa conteúdo atual

            produtos.forEach(produto => {
                const produtoCard = `
                    <div class="card-produto" data-categoria="${produto.categoria}">
                        <h3>${produto.nome_produto}</h3>
                        <p>Preço: ${produto.preco}</p>
                        ${produto.promocao ? '<span>Promoção!</span>' : ''}
                    </div>
                `;
                contentDiv.innerHTML += produtoCard;
            });
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));
}

// Inicializar navegação e funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    init();
    applyCategoryFilter();

    // Botão de exibição do formulário de adição de produtos
    const addButton = document.getElementById('btnAdicionar');
    if (addButton) addButton.addEventListener('click', toggleForm);

    // Botão de pesquisa
    const searchButton = document.getElementById('searchButton');
    if (searchButton) searchButton.addEventListener('click', searchProducts);
});
