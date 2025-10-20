const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const TiposServico = database.define('TiposServico', {

  idtiposServico: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  descricao: {
    type: DataTypes.STRING(255),
    allowNull: false
  }

}, {
  tableName: 'TiposServico',
  timestamps: false
});

module.exports = TiposServico;

