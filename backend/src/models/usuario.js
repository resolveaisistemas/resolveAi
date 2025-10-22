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

// Para criar as chaves estrangeiras é necessário criar a associação entre as tabelas
// isso é feito usando o modelo.belongsTo ou modelo.hasOne (no outro arquivo).

// Não entendi porque o foreignKey está dentro de modelo.Cliente e não modelo.Usuario
// mas aparentemente essa é a forma correta de criar o relacionamento.

Usuario.associate = (models) => {
  Usuario.belongsTo(models.Cliente, {
    foreignKey: 'idCliente',
    targetKey: 'idCliente',
    as: 'cliente'
  });
  Usuario.belongsTo(models.Prestador, {
    foreignKey: 'idPrestador',
    targetKey: 'idPrestador',
    as: 'prestador'
  });
}

module.exports = Usuario;

