CREATE DATABASE ComaBem;

USE ComaBem;

CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE, 
    senha VARCHAR(255) NOT NULL, -- Aumentar tamanho para armazenar senhas criptografadas
    data_nasc DATE NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE TbEndereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    usuarioId INT NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    cep CHAR(8) NOT NULL,
    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id) ON DELETE CASCADE
);

CREATE TABLE TbEntregador (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL, 
    avaliacao DECIMAL(3, 2) NOT NULL 
);

CREATE TABLE TbProduto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(255) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    imagem VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL,
    origem VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    promocao BOOLEAN DEFAULT FALSE 
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
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_pedido INT NOT NULL,
    id_entregador INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_pedido) REFERENCES TbPedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_entregador) REFERENCES TbEntregador(id_entregador) ON DELETE CASCADE
);

CREATE TABLE Carrinhos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    produtoId INT NOT NULL,
    FOREIGN KEY (produtoId) REFERENCES TbProduto(id_produto) ON DELETE CASCADE
);
