const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const Pagamento = database.define('Pagamento', {


const Pagamento = database.define(‘Pagamento’, {

	idPagamento: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true
},

	idCliente: {
	    type: sequelize.INTEGER
},

	idPrestador: {
	    type: sequelize.INTEGER
},

	idServico:{
	    type: sequelize.INTEGER
},

metodoPagamento: {
     type: DataTypes.ENUM('cartão', 'pix', 'boleto’'),
      allowNull: false,
},

valorPago: {
    type: sequelize.DECIMAL (10, 2),
    allowNull: false;
},

 dataPagamento: {
     type: Squelize.TIME ,
     defaultValue: ‘Ativo’
},

 status: {
    type: Sequelize.ENUM('Pago', 'Pendente’', ‘Cancelado’),.
    allowNull: false,
    defaultValue: 'Ativo',

 idCliente: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Cliente',
    key: 'idCliente'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},


 CPF:{
      type: sequelize.STRING(14)
      allowNull: false,

references: {
    model: 'CPF',
    key: 'idCPF'

 },

 dataNascimento:{
      type: Sequelize.DATE,
      allowNull: false,
references: {
    model: ‘dataNascimento',
    key: 'iddataNascimento'

 },

idPessoas: {
     type: sequelize.INTEGER
references: {
    model: ‘Pessoas',
    key: 'idPessoas'


},


 idPrestador: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Prestador',
    key: 'idPrestador'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
},
 CNPJ: {
  type: Sequelize.STRING (18),
  allowNull: false;
  references: {
    model: 'CNPJ',
    key: 'idCNPJ'
},

 idTipoServico: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Prestador',
    key: 'idPrestador'
},

 idPessoas: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Pessoas',
    key: 'idPessoas'

},

percentualCobrado: {
    type: sequelize.DECIMAL(5, 2),
    allowNull: false;
 idPrestador: {
  type: Sequelize.INTEGER,

}),
{
  tableName: 'Pagamento',
  timestamps: false
});

module.exports = Pagamento;



