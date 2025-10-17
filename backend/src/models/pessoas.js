const Sequelize = require('sequelize');
const database = require('cd ../config/db.js');

const pessoas = database.define('pessoas', {
    idPessoas: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nomeSobrenome: {
        type: Sequelize.VARCHAR(100),
        allowNull: false
    },
    telefone:{
        type: Sequelize.VARCHAR(15),
        allowNull: false
    },
   
    Senha:{
       type: Sequelize.VARCHAR(10),
       allowNull: false,
    },

    Status:{
      type: DataTypes.ENUM ('Ativo','Inativo'),
      allowNull: false,
      defaultValue: 'Ativo',
    },
    
    dataCadastro:{
       type: DataTypes.DATE,
       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },

    dataAlteracao:{
      type: dataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    idEndereco: {
        type: Sequelize.INTEGER,        // 1. O tipo de dado da coluna é INTEGER (número inteiro).
        references: {                   // 2. Indica que esta coluna é uma chave estrangeira (foreign key).
          model: 'Endereco',            // 3. A chave estrangeira referencia a tabela 'Endereco'.
          key: 'idEndereco'             // 4. Ela aponta para a coluna 'idEndereco' da tabela 'Endereco'.
        },
        onUpdate: 'CASCADE',            // 5. Se o valor de 'idEndereco' na tabela Endereco for atualizado, essa mudança é replicada aqui automaticamente.
        onDelete: 'SET NULL'            // 6. Se o registro referenciado na tabela Endereco for deletado, o valor desta chave estrangeira será definido como NULL.
      },

     
})


const cliente = database.define('cliente', {
    idPessoas: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    cpf: {
        type: Sequelize.VARCHAR(14),
        allowNull: false
    },

    dataNascimento: {
        type: Sequelize.DATE,
        da
    },

    idPessoas: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,        // 1. O tipo de dado da coluna é INTEGER (número inteiro).
        references: {                   // 2. Indica que esta coluna é uma chave estrangeira (foreign key).
          model: 'Cliente',            // 3. A chave estrangeira referencia a tabela 'Endereco'.
          key: 'idCliente'             // 4. Ela aponta para a coluna 'idEndereco' da tabela 'Endereco'.
        },
        onUpdate: 'CASCADE',            // 5. Se o valor de 'idEndereco' na tabela Endereco for atualizado, essa mudança é replicada aqui automaticamente.
        onDelete: 'SET NULL'            // 6. Se o registro referenciado na tabela Endereco for deletado, o valor desta chave estrangeira será definido como NULL.

    },

})

const Prestador = database.define('Prestador', {
    idPrestador: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})


module.exports = pessoas;
