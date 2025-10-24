const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Usuario = sequelize.define('Usuario', {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPrestador: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo'), // igual ao SQL!
      allowNull: false,
      defaultValue: 'ativo'
    }
  }, {
    tableName: 'Usuario',
    timestamps: false,
    createdAt: 'datacadastro',
    updatedAt: 'dataAlteracao'
});

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Cliente, {
      foreignKey: 'idCliente',
      targetKey: 'idCliente',
      as: 'cliente',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Usuario.belongsTo(models.Prestador, {
      foreignKey: 'idPrestador',
      targetKey: 'idPrestador',
      as: 'prestador',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  return Usuario;
};
