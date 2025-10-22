const { Sequelize, DataTypes } = require('sequelize');
const database = require('../config/db.js');

const Solicitacoes = database.define('Solicitacoes', {
	idSolicitacoes: {
    	type: DataTypes.INTEGER,
    	primaryKey: true,
    	autoIncrement: true
	},
	// idCliente, idTipoSorvico e idEndereco são criados automaticamente com a associação
	descricaoProblema: {
		type: DataTypes.STRING,
		allowNull: false
	},
	dataSolicitacao: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW // Pega a data automaticamente, é possível usar Sequelize.NOW se tiver importado 'Sequelize'
	}
}, {
	tableName: 'Solicitacoes',
	timestamps: false
});

Solicitacoes.associate = (models) => {
  Usuario.belongsTo(models.Cliente, {
    foreignKey: 'idCliente',
    targetKey: 'idCliente',
    as: 'cliente'
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  Usuario.belongsTo(models.TipoServico, {
    foreignKey: 'idTipoServico',
    targetKey: 'idTipoSorvico',
    as: 'prestador'
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
  Usuario.belongsTo(models.idEndereco, {
    foreignKey: 'idEndereco',
    targetKey: 'idEndereco',
    as: 'prestador'
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  });
}
