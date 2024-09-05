CREATE DATABASE CRUD;

USE CRUD;

CREATE TABLE TbCliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    senha VARCHAR (30) NOT NULL,
    FOREIGN KEY (endereco) REFERENCES TbEndereco(id_cliente)
);

CREATE TABLE TbEndereco (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    cep CHAR(8) NOT NULL,
    id_entegrador VARCHAR(255) NOT NULL,
    FOREIGN KEY (endereco) REFERENCES TbEndereco(id_cliente)
);

CREATE TABLE TbEntregador (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(50) NOT NULL,
    avaliacao VARCHAR(50) NOT NULL,
);

CREATE TABLE TbEntrega(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente VARCHAR(255) NOT NULL,
    id_pedido VARCHAR(255) NOT NULL,
    id_entregador VARCHAR(255) NOT NULL,
    data DATA NOT NULL,
    FOREIGN KEY (endereco) REFERENCES TbEndereco(id_cliente),
    FOREIGN KEY (pedido) REFERENCES TbPedido(id_pedido),
    FOREIGN KEY (entregador) REFERENCES TbEntregador(id_entregador),
);

CREATE TABLE TbPedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    total REAL NOT NULL,
    pagto REAL NOT NULL,
    id_cliente VARCHAR(255) NOT NULL,
    id_produto VARCHAR(255) NOT NULL,
    FOREIGN KEY (cliente) REFERENCES TbCliente(id_cliente),
    FOREIGN KEY (produto) REFERENCES TbProduto(id_produto),
);

CREATE TABLE TbProduto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto CHARACTER(25) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    imagem VARCHAR(20) NOT NULL,
    marca VARCHAR(20) NOT NULL,
    origem VARCHAR(30) NOT NULL,
    preco REAL NOT NULL,
);
