const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
//const cors = require('cors');

const app = express();
const port=3000;

// app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const db = new sqlite3.Database('./dados.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao bando de dados:', err.message);
    } else {
        console.log('Conectando ao banco de dados SQLite.');
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/GitHub-OrbX/index.html');
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

/*
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

app.get('/valores', (req, res)=> {
    db.all('SELECT * FROM valores', [], (err, rows) => {
        if(err) {
            return res.status(500).send('Erro ao consultar os valores.');
        }
        res.json(rows);
    });
});
*/

app.put('/editar/:id', (req, res) => {
    const {id} = req.params;
    const {valor} = req.body;
    db.run('UPDATE valores SET valor = ? WHERE id = ?', [valor, id], (err) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar o valor.');
        }
        res.send('Valor atualizado com sucesso!');
    });
});

app.delete('/deletar/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM valores WHERE id = ?', [id], (err) => {
        if(err) {
            return res.status(500).send('Erro ao deletar o valor.');
        }
        res.send('Valor deletado com sucesso!');
    });
});

app.use(bodyParser.json());
app.use(express.static('GitHub-OrbX'));

app.get('/valores', (req,res)  => {
    db.all('SELECT * FROM valores', [], (err, rows) => {
        if(err) {
            res.status(500).send('Erro ao buscar valores.');
        } else {
            res.json(rows);
        }
    });
});

app.post('/adicionar', (req, res) => {
    const { valor } = req.body;
    if (!valor){
        return res.status(400).json({ error: 'O campo "valor" é obrigatório.'});
    }

    const sql = 'INSERT INTO valoes (valor) VALUES (?)';
    db.run(sql, [valor], function (err) {
        if (err) {
            console.error('Erro ao adicionar valor:', err.message);
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({ id: this.lastID, valor});
        }
    });
});

app.put('/editar/:id', (req, res)=> {
    const { id } = req.params;
    const { valor } = req.body;
    db.run('UPDATE valores SET valor = ? WHERE id = ?', [valor, id], (err) => {
        if (err) {
            res.status(500).send('Erro ao atualizar o valor.');
        } else {
            res.send('Valor atualizado com sucesso!');
        }
    });
});

app.delete('/deletar/:id', (req, res)=> {
    const { id } = req.params;
    db.run('DELETE FROM valores WHERE id = ?', [id], (err) => {
        if(err) {
            res.status(500).send('Erro ao deletar o valor.');
        } else {
            res.send('Valor deletado com sucesso!');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});