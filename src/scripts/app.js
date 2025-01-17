let db;
const request = indexedDB.open('MeuBanco', 1);

request.onupgradeneeded = event => {
    db = event.target.result;
    if (!db.objectStoreNames.contains('dados')) {
        db.createObjectStore('dados', {keyPath: 'id', autoIncrement: true});
    }
};

request.onsuccess = event => {
    db = event.target.result;
    console.log('IndexedDB aberto com sucesso.');
    exibirDados();
};

request.onerror = event => {
    console.error('Erro ao abrir o IndexedDB:', event.target.errorCode);
};

document.getElementById('data-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const transaction = db.transaction(['dados'], 'readwrite');
    const store = transaction.objectStore('dados');
    store.add({ name, message});

    transaction.oncomplete = () => {
        console.log('Dado salvo com sucesso.');
        exibirDados();
        document.getElementById('data-form').reset();
    };

    transaction.onerror = event => {
        console.error('Erro ao salvar o dado:', event.target.error);
    };
});


function exibirDados() {
    const dataList = document.getElementById('data-list');
    dataList.innerHTML = '';

    const transaction = db.transaction(['dados'], 'readonly');
    const store = transaction.objectStore('dados');

    store.openCursor().onsuccess = event => {
        const cursor = event.target.result;
        if (cursor) {
            const li = document.createElement('li');
            li.textContent = `dado1 : ${cursor.value.name}, dado1: ${cursor.value.message}`;
            dataList.appendChild(li);
            cursor.continue();
        }
    };
}


//função salvar anterior
function salvarDado() {
    const transaction = db.transaction(['dados'], 'readwrite');
    const store = transaction.objectStore('dados');
    store.add({ mensagem: 'Olá, PWA!' });
    console.log('Dado salvo no IndexedDB.');
}

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/MeuPWA/service-worker.js')
        .then(registration => {
            console.log('Service Worker registrado com sucesso', registration);
        })
        .catch(error => {
            console.error('Falha ao registrar o Service Worker: ', error);
        });
} else {
    console.log('Service Worker não é suportado neste ');
}

