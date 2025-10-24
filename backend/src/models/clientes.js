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
    status: {
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

  Clientes.associate = (models) => {
    Clientes.belongsTo(models.Pessoas, {
      foreignKey: 'idPessoa',
      targetKey: 'idPessoa',
      as: 'pessoa',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  };

  return Clientes;
};
