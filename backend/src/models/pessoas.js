const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pessoa = sequelize.define('Pessoa', {
    idPessoas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nomeSobrenome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Telefone: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    Senha: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    Status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    idEndereço: { 
      type: DataTypes.INTEGER,
      allowNull: true 
    }
  }, {
    tableName: 'Pessoas',
    timestamps: true,
    createdAt: 'datacadastro',
    updatedAt: 'dataAlteracao'
  });

  Pessoa.associate = (models) => {
    Pessoa.belongsTo(models.Endereco, {
      foreignKey: 'idEndereço',
      as: 'endereco',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };

  return Pessoa;
};
