// Função para carregar conteúdo dinamicamente
function loadContent(content) {
    const contentDiv = document.querySelector('.content');
    
    if (contentDiv) {
        // Simulação de carregamento de conteúdo baseado no botão clicado
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
            loadContent(content); // Carregar o conteúdo ao clicar
        });
    });
}

// Inicializar navegação dinâmica
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    init();  // Preserva as outras funcionalidades do script
});
