const { MongoClient } = require('mongodb');

// Configurações do MongoDB
const mongoDBConfig = {
    host: 'localhost',
    port: '3000',
    database: 'fruteia'
};

// URL de conexão com o MongoDB
const mongoURL = `mongodb://${mongoDBConfig.host}:${mongoDBConfig.port}`;

// Conectar ao MongoDB
async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoURL);
        await client.connect();
        console.log('Conexão com o MongoDB estabelecida com sucesso');
        return client.db(mongoDBConfig.database);
    } catch (error) {
        console.error('Erro de conexão com o MongoDB:', error);
        throw error;
    }
}

module.exports = connectToMongoDB;
