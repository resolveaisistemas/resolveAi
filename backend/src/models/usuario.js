const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Usuario = database.define('Usuario', {

  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  idCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Cliente',
      key: 'idCliente'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  idPrestador: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prestador',
      key: 'idPrestador'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },

  login: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  senha: {
    type: DataTypes.STRING(255),
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM('ativo', 'inativo'), // igual ao SQL!
    allowNull: false,
    defaultValue: 'ativo'
  }

}, {
  tableName: 'Usuario',
  timestamps: false
});

module.exports = Usuario;

