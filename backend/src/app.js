const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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
