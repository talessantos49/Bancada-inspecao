const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./dados.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao bando de dados:', err.message);
    } else {
        console.log('Conectando ao banco de dados SQLite.');
    }
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});

app.post('/salvar', (req, res) => {
    const { valor } = req.body;

    db.run('INSERT INTO valores (valor) VALUES (?)', [valor], function (err) {
        if (err) {
            return res.status(500).send('Erro ao salvar o valor.');
        }
        res.send('Valor salvo com sucesso.');
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

app.get('/valores', (req, res)=> {
    db.all('SELECT * FROM valores', [], (err, rows) => {
        if(err) {
            return res.status(500).send('Erro ao consultar os valores.');
        }
        res.json(rows);
    });
});