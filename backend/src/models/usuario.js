const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/db.js');

const Usuario = database.define('Usuario', {
  
  idUsuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  // Não precisa criar idCliente e idPrestador, a associação belongsTo (foreignKey) faz isso automaticamente

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

// Para criar as chaves estrangeiras é necessário criar a associação entre as tabelas
// isso é feito usando o modelo.belongsTo ou modelo.hasOne (no outro arquivo).

Usuario.associate = (models) => {
  Usuario.belongsTo(models.Cliente, {
    foreignKey: 'idCliente',
    targetKey: 'idCliente',
    as: 'cliente'
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  Usuario.belongsTo(models.Prestador, {
    foreignKey: 'idPrestador',
    targetKey: 'idPrestador',
    as: 'prestador'
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
}

module.exports = Usuario;
