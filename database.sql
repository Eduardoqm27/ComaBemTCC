-- Criação do banco de dados
CREATE DATABASE ComaBem;

-- Uso do banco de dados
USE ComaBem;

-- Tabela de Endereços
CREATE TABLE TbEndereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    numero VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    cep CHAR(8) NOT NULL
);

-- Tabela de Clientes
CREATE TABLE TbCliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    endereco_id INT NOT NULL,
    senha VARCHAR(30) NOT NULL,
    FOREIGN KEY (endereco_id) REFERENCES TbEndereco(id_endereco)
);

-- Tabela de Entregadores
CREATE TABLE TbEntregador (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(50) NOT NULL,
    avaliacao VARCHAR(50) NOT NULL
);

-- Tabela de Produtos
CREATE TABLE TbProduto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(25) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    imagem VARCHAR(20) NOT NULL,
    marca VARCHAR(20) NOT NULL,
    origem VARCHAR(30) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE TbPedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    pagto DECIMAL(10, 2) NOT NULL,
    id_cliente INT NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES TbCliente(id_cliente)
);

-- Tabela de Entregas
CREATE TABLE TbEntrega (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_pedido INT NOT NULL,
    id_entregador INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES TbCliente(id_cliente),
    FOREIGN KEY (id_pedido) REFERENCES TbPedido(id_pedido),
    FOREIGN KEY (id_entregador) REFERENCES TbEntregador(id_entregador)
);
