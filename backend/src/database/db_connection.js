const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise'); // Driver do MySQL
const config = require('../config/config').development; // Importa a chave development do arquivo 'backend/src/config/config.js'

// Obs: Apenas MySQL e MariaDB! Não funciona para PostgreSQL, SQLite, etc.
const mensagemErro = "\nErro na função: createDatabase \nLocal: backend/src/database/db.connection.js\n";

async function createDatabase() {
    const { database, user, password, host, dialect } = config;

    try {
        const conexao = await mysql.createConnection({ host, user, password }); // Se conecta ao MySQL (mysql2)
        await conexao.query(`CREATE DATABASE IF NOT EXISTS ${database};`); // Cria o database se ele não existir
        console.log("\nO database foi criado\n");
    } catch (error) {
        console.log(error);
        throw error;
    }

    const sequelize = new Sequelize(database, user, password, { dialect, host }) // Use port: 3306 se der erro, é a porta padrão
                                                                                     // logging: false // Opcional: desliga os logs do MySQL

    try {
        await sequelize.authenticate();
        console.log("\nConexão estabelecida\n")
        // Opcionalmente a criação das tabelas podem ser realizadas aqui após a conexão
    } catch (error) {
        console.log(mensagemErro);
        // console.error(mensagemErro);
        throw error;
    }

    return sequelize;
}

module.exports = { createDatabase }
