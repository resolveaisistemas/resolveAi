const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Clientes = sequelize.define('Clientes', {
    idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idPessoa: { 
      type: DataTypes.INTEGER,
      allowNull: true 
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'Cliente',
    timestamps: true,
    createdAt: 'datacadastro',
    updatedAt: 'dataAlteracao'
});

  Usuario.associate = (models) => {
    Usuario.belongsTo(models.Pessoas, {
      foreignKey: 'idPessoa',
      targetKey: 'idPessoa',
      as: 'pessoa',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Usuario.belongsTo(models.Usuario, {
      foreignKey: 'idCliente ',
      targetKey: 'idCliente ',
      as: 'cliente',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  return Cliente;
};
