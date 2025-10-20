const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Endereco = database.define('Endereco', {

  idEndereco: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  logradouro: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  numero: {
    type: DataTypes.STRING(10),
    allowNull: false
  },

  complemento: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  bairro: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  cidade: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  estado: {
    type: DataTypes.STRING(2),
    allowNull: false
  },

  cep: {
    type: DataTypes.STRING(10),
    allowNull: false
  }

}, {
  tableName: 'Endereco',
  timestamps: false
});

module.exports = Endereco;
