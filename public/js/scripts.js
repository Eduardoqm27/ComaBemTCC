// Função para alternar a visibilidade do menu dropdown
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}

// Fechar o dropdown ao clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.user-menu img')) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        }
    }
};

// Função para abrir e fechar o menu dropdown no header
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.user-menu img');
    if (menuButton) {
        menuButton.addEventListener('click', toggleDropdown);
    }

    // Função para enviar pesquisa
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            const query = document.querySelector('#search-input').value;
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        });
    }

    // Função para exibir a descrição ao passar o mouse sobre a imagem do produto
    const productImages = document.querySelectorAll('.product-image');
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
});