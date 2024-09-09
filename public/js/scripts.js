// Função para alternar a visibilidade do menu lateral
function initMenuLateral() {
    const menuButton = document.querySelector('.menu-button');
    const menuLateral = document.querySelector('.menu-lateral');

    if (menuButton && menuLateral) {
        menuButton.addEventListener('click', () => {
            menuLateral.classList.toggle('show'); // Alterna a visibilidade do menu
        });
    }
}

// Função para inicializar eventos do carrinho
function initCart() {
    const cartButton = document.querySelector('.cart-button');

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            window.location.href = '/carrinho'; // Redireciona para a página do carrinho
        });
    }
}

// Função para enviar pesquisa
function initSearch() {
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            const query = document.querySelector('#search-input').value;
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        });
    }
}

// Função para exibir a descrição ao passar o mouse sobre a imagem do produto
function initProductImageHover() {
    const productImages = document.querySelectorAll('.product-card img');
    productImages.forEach(image => {
        image.addEventListener('mouseover', function() {
            const description = image.nextElementSibling; // A descrição está no próximo elemento
            if (description) {
                description.style.display = 'block';
            }
        });
        image.addEventListener('mouseout', function() {
            const description = image.nextElementSibling;
            if (description) {
                description.style.display = 'none';
            }
        });
    });
}

// Função para inicializar todos os scripts necessários
function init() {
    initMenuLateral();
    initCart();
    initSearch();
    initProductImageHover();
}

// Inicializar scripts ao carregar a página
document.addEventListener('DOMContentLoaded', init);