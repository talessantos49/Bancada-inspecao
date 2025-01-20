const { app,BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width:800,
        height: 600, 
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

async function carregarValores(){
    try {
        const resposta = await fetch('/valores');
        const valores = await resposta.json();
        const tabela = document.getElementById('tabela-valores');
        tabela.innerHTML = valores.map(v => `
            <tr>
                <td>${v.id}</td>
                <td><input type="text" value="${v.valor}" id="valor-${v.id}" class="form-control"></td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="editarValor(${v.id})">Salvar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirValor(${v.id})">Excluir</button>
                </td>
            </tr>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar valores:', erro);
    }
carregarValores();
}

document.getElementById('form-add').addEventListener('submit', async (e) => {
    e.preventDefault();
    const valor = document.getElementById('novo-valor').value;
    if (valor.trim() !== '') {
        await fetch('/adicionar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ valor })
        });
        document.getElementById('novo-valor').value = '';
        carregarValores();
    }
});

async function editarValor(id) {
    const novoValor = document.getElementById(`valor-${id}`).value;
    await fetch(`/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ valor: novoValor})
    });
    carregarValores();
}

async function excluirValor(id) {
    await fetch(`/deletar/${id}`, {method: 'DELETE'});
    carregarValores();    
}