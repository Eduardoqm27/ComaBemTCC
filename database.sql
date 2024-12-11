CREATE DATABASE ComaBem;

USE ComaBem;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_nasc DATE NOT NULL,
    tipo_usuario ENUM('administrador', 'vendedor', 'cliente') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TbEndereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    cep CHAR(8) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

CREATE TABLE TbEntregador (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    avaliacao DECIMAL(3, 2) CHECK (avaliacao >= 0 AND avaliacao <= 5) NOT NULL
);

CREATE TABLE TbProduto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(255) NOT NULL,
    descricao VARCHAR(500),
    imagem VARCHAR(255),
    marca VARCHAR(255),
    origem VARCHAR(255),
    preco DECIMAL(10, 2) NOT NULL,
    promocao BOOLEAN DEFAULT FALSE,
    categoria ENUM('fruta', 'verdura', 'legumes', 'kits') NOT NULL
);

CREATE TABLE TbPedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    pagto DECIMAL(10, 2) NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE
);

CREATE TABLE TbEntrega (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_pedido INT NOT NULL,
    id_entregador INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_pedido) REFERENCES TbPedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_entregador) REFERENCES TbEntregador(id_entregador) ON DELETE CASCADE
);

CREATE TABLE Carrinhos (
    id_carrinho INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1 CHECK (quantidade >= 1),
    FOREIGN KEY (produto_id) REFERENCES TbProduto(id_produto) ON DELETE CASCADE
);