const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)));

const tabClicked = (tab) => {
	tabs.forEach(tab => tab.classList.remove('active'));
	tab.classList.add('active');
 
	const contents = document.querySelectorAll('.content');
	contents.forEach(content => content.classList.remove('show'));

	const contentId = tab.getAttribute('content-id');
	const content = document.getElementById(contentId);

	content.classList.add('show');
}

const currentActiveTab = document.querySelector('.tab-btn.active');
tabClicked(currentActiveTab);

//ÁREA DOS GRAFICOS E ATUALIZAÇÕES
const ctxLine = document.getElementById('myLineChart').getContext('2d');
const ctxRadar = document.getElementById('myChart').getContext('2d');

// Elemento para exibir o valor atual
const valorAtualElemento = document.getElementById('valor-atual');

// Dados compartilhados entre os dois gráficos
const blueData = [];
let prev = 100;
for (let i = 0; i < 360; i++) {
    prev += 5 - Math.random() * 10;
    blueData.push(prev);
}

const redData = [];
let prev2 = 80;
for (let i = 0; i < 360; i++) {
    prev2 += 5 - Math.random() * 10;
    redData.push(prev2);
}

// Gráfico Linear
const myLineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: Array.from({ length: 360 }, (_, i) => `T${i + 1}`),
        datasets: [
            {
                label: 'Linha Azul',
                data: Array(360).fill(null),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 3,
                pointRadius: 0,
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Linha Vermelha',
                data: Array(360).fill(null),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 3,
                pointRadius: 0,
                tension: 0.4,
                fill: false,
            }
        ]
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        scales: {
            x: { title: { display: true, text: 'Tempo' } },
            y: { title: { display: true, text: 'Valor' }, min: 0, max: 300 }
        },
        plugins: {
            legend: { display: true }
        }
    }
});

// Gráfico Radar
const radarChart = new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: Array.from({ length: 360 }, (_, i) => `${i}°`),
        datasets: [
            {
                label: 'Linha Azul',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                radius: 0,
                data: [],
                fill: false,
                tension: 0.4,
            },
            {
                label: 'Linha Vermelha',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                radius: 0,
                data: [],
                fill: false,
                tension: 0.4,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        scales: {
            r: {
                min: 0,
                max: 300,
                beginAtZero: true,
                ticks: { display: false },
                grid: { circular: true },
                angleLines: { display: false },
                pointLabels: { display: false },
            },
        },
        elements: { line: { tension: 0.4 } },
        plugins: { legend: { display: false } },
    }
});

// Função para atualizar uma linha nos dois gráficos e exibir o valor atual
function atualizarLinha(dados, datasetIndex, callback) {
    let index = 0;

    const interval = setInterval(() => {
        if (index < dados.length) {
            const valorAtual = dados[index];

            // Atualiza o gráfico linear
            myLineChart.data.datasets[datasetIndex].data[index] = valorAtual;

            // Atualiza o gráfico radar
            radarChart.data.datasets[datasetIndex].data[index] = valorAtual;

            // Atualiza o valor na tela
            valorAtualElemento.innerText = valorAtual.toFixed(2);

            // Atualiza os gráficos
            myLineChart.update();
            radarChart.update();

            index++;
        } else {
            clearInterval(interval);
            if (callback) callback(); // Inicia a próxima linha ao finalizar
        }
    }, 10); // Intervalo de 10ms entre cada ponto
}

// // Inicia a atualização: Linha Azul -> Linha Vermelha
// atualizarLinha(blueData, 0, () => {
//     console.log('Linha azul concluída. Iniciando linha vermelha...');
//     atualizarLinha(redData, 1);
// });

// Captura os elementos dos sensores e do botão iniciar
const sensores = [
    document.getElementById('sensor1'),
    document.getElementById('sensor2'),
    document.getElementById('sensor3'),
    document.getElementById('sensor4')
];
const botaoIniciar = document.getElementById('btn-start-inspection1');

// Verifica se todos os sensores estão marcados
function verificarSensores() {
    const todosAtivos = sensores.every(sensor => sensor.checked);
    botaoIniciar.disabled = !todosAtivos; // Habilita ou desabilita o botão
}

// Adiciona um evento a cada sensor para verificar o estado
sensores.forEach(sensor => {
    sensor.addEventListener('change', verificarSensores);
});

// Evento para iniciar a inspeção e gráficos ao clicar no botão
botaoIniciar.addEventListener('click', () => {
    console.log('Iniciando inspeção e leitura dos gráficos...');

    // Chama as funções de leitura dos gráficos
    atualizarLinha(blueData, 0, () => {
        console.log('Linha azul concluída. Iniciando linha vermelha...');
        atualizarLinha(redData, 1);
    });
});


//----------------------------------------------------------------------------------------
// Checkbox e checagens de acionamento

const botaoInspecao1 = document.getElementById("btn-start-inspection1");
const botaoInspecao2 = document.getElementById("btn-start-inspection2");
const botaoInspecao3 = document.getElementById("btn-start-inspection3");
const botaoInspecao4 = document.getElementById("btn-start-inspection4");
const botaoInspecao5 = document.getElementById("btn-start-inspection5");
const botaoInspecao6 = document.getElementById("btn-start-inspection6");
const botaoInspecao7 = document.getElementById("btn-start-inspection7");

const checkboxes610 = [
	document.getElementById('sensor1'),
	document.getElementById('sensor2'),
	document.getElementById('sensor3'),
	document.getElementById('sensor4')
];
const checkboxes810 = [
	document.getElementById('sensor5'),
	document.getElementById('sensor6'),
	document.getElementById('sensor7'),
	document.getElementById('sensor8')
];
const checkboxes870 = [
	document.getElementById('sensor9'),
	document.getElementById('sensor10'),
	document.getElementById('sensor11'),
	document.getElementById('sensor12')
];
const checkboxes1000 = [
	document.getElementById('sensor13'),
	document.getElementById('sensor14'),
	document.getElementById('sensor15'),
	document.getElementById('sensor16')
];
const checkboxesConfig = [
	document.getElementById('sensor17'),
	document.getElementById('sensor18'),
	document.getElementById('sensor19'),
	document.getElementById('sensor20')
];
const checkboxesCalib = [
	document.getElementById('sensor21'),
	document.getElementById('sensor22'),
	document.getElementById('sensor23'),
	document.getElementById('sensor24')
];
const checkboxesLogin = [
	document.getElementById('sensor25'),
	document.getElementById('sensor26'),
	document.getElementById('sensor27'),
	document.getElementById('sensor28')
];

//função para verificar se todos os checkboxes estão marcados

function verificarCheckboxes610(){
	const todosMarcados = checkboxes610.every(checkbox => checkbox.checked);
	botaoInspecao1.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxes610.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxes610));

function verificarCheckboxes810(){
	const todosMarcados = checkboxes810.every(checkbox => checkbox.checked);
	botaoInspecao2.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxes810.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxes810));

function verificarCheckboxes870(){
	const todosMarcados = checkboxes870.every(checkbox => checkbox.checked);
	botaoInspecao3.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxes870.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxes870));

function verificarCheckboxes1000(){
	const todosMarcados = checkboxes1000.every(checkbox => checkbox.checked);
	botaoInspecao4.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxes1000.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxes1000));

function verificarCheckboxesConfig(){
	const todosMarcados = checkboxesConfig.every(checkbox => checkbox.checked);
	botaoInspecao5.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxesConfig.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxesConfig));

function verificarCheckboxesCalib(){
	const todosMarcados = checkboxesCalib.every(checkbox => checkbox.checked);
	botaoInspecao6.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxesCalib.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxesCalib));

function verificarCheckboxesLogin(){
	const todosMarcados = checkboxesLogin.every(checkbox => checkbox.checked);
	botaoInspecao7.disabled = !todosMarcados; //habilita o botão se todos estiverem marcados
}
checkboxesLogin.forEach(checkbox => checkbox.addEventListener('change', verificarCheckboxesLogin));

//----------------------------------------------------------------------------------------

