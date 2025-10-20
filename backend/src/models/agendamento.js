const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Agendamento = database.define('Agendamento', {

  idAgendamento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  idSolicitacao: {
    type: DataTypes.INTEGER,
    allowNull: true
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

  dataAgendada: {
    type: DataTypes.DATEONLY, // melhor para data sem hora
    allowNull: false
  },

  horarioAgendado: {
    type: DataTypes.TIME,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM('pendente', 'confirmado', 'cancelado'),
    allowNull: false
  }

}, {
  tableName: 'Agendamento',
  timestamps: false
});

module.exports = Agendamento;

