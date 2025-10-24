const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Prestador = sequelize.define('Prestador', {
    idPrestador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    idTipoServico: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPessoas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    percentualCobrado: {
      type: DataTypes.STRING(60),
      allowNull: false
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
