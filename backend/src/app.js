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
      res.json({ mensagem: "Bem-vindo à API do Coworking!" });
    });

    // Rota de status
    app.get("/health", (req, res) => {
      res.json({ status: "OK", uptime: process.uptime() });
    });

    app.listen(3000, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.log("mensagemErro (...)");
    process.exit(1); // Encerra o processo se a conexão falhar
  }
}

inicianrSequelize();
