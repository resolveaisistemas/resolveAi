const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Prestador = database.define('Pagamento', {


const Prestador = database.define('Prestador', {
    idPrestador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

   CNPJ: {
       type: sequelize.STRING(11),
       allowNull: false,
},

idTipoServico: {
       type: sequelize.INTEGER
},

idPessoas: {
        type: sequelize.INTEGER
},

percentualCobrado: {
        type: sequelize.DECIMAL(5, 2),
        allowNull: false;
},

  idPessoas: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Pessoas',
      key: 'idPessoas',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'  // ajustado para um valor válido
  },

  login: {
    type: Sequelize.STRING(255), //  STRING
    allowNull: false,
  },

  senha: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },

  status: {
    type: Sequelize.ENUM('Ativo', 'Inativo'), //  valores que você definiu, outro dá erro.
    allowNull: false,
    defaultValue: 'Ativo',
  },

});
