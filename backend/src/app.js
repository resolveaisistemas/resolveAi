const express = require("express");
const cors = require("cors");
const { createDatabase } = require('./database/db_connection')

const app = express();
app.use(cors());
app.use(express.json());

async function inicianrSequelize() {
  try {
    const database = await createDatabase();

    // Rota principal
    app.get("/", (req, res) => {
      res.json({ mensagem: "Bem-vindo à Api do Resolve Ai!" });
    });

    // Rota sobre
    app.get("/sobre", (req, res) => {
      res.json({ mensagem: "Sobre o sistema do Resolve Ai!" });
    });

    // Rota de contato
    app.get("/contato", (req, res) => {
      res.json({ mensagem: "Informações para contato", campos: "{ nome, telefone, ... }" });
    });

    // Rota de busca
    app.get("/resolvai/busca", (req, res) => {
      res.json({ mensagem: "Resultado de busca" });
    });

    // Rota de carrinho
    app.get("/resolvai/carrinho", (req, res) => {
      res.json({ mensagem: "Lista de serviços escolhidos" });
    });

    // Rota de pagamento
    app.get("/resolvai/pagamento", (req, res) => {
      res.json({ mensagem: "Página para crédito, Pix" });
    });

    // Rota de dashboard (admin)
    app.get("/resolvai/dashboard", (req, res) => {
      res.json({ mensagem: "NÃO VISÍVEL (admin)" });
    });

    // Rota de login
    app.get("/resolvai/login", (req, res) => {
      res.json({ mensagem: "Tela para login" });
    });

    // Rota de cadastro
    app.get("/resolvai/cadastro", (req, res) => {
      res.json({ mensagem: "Tela de cadastro" });
    });

    // Rota de serviços
    app.get("/resolvai/servicos", (req, res) => {
      res.json({ mensagem: "Lista de serviços" });
    });

    // Rota de erro 404
    app.get("/resolvai/404", (req, res) => {
        res.json({ mensagem: "Página não encontrada" });
      });

   app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.log("Erro na conexão com o banco de dados");
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

inicianrSequelize();



//  tudo que estiver em /algumacoisa como /sobre
// será do resolveaisistemas

// o que estiver em /resilveai/alguma coisa
// será do resilveai

// por exemplo
// localhost:3000/ é a home do resolveaisistemas
// localhost:3000/resilveai/ é a home do resolveai
