const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Teste = database.define('teste', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    preco: Sequelize.DECIMAL,
    descricao: Sequelize.STRING
})

module.exports = Teste;