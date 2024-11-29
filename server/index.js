const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

// Conexão com o banco de dados
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

// Middleware para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json()); // Para receber dados no formato JSON

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.json({ message: 'Usuário cadastrado com sucesso!' });
    }
  });
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar usuários');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
