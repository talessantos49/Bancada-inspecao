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


const limitValue = 50; // Valor da linha pontilhada e limite
const ctx = document.getElementById('myLineChart').getContext('2d');
const myLineChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [], // Inicialmente vazio
		datasets: [{
			label: 'Abaixo do Limite',
			data: [], // Inicialmente vazio
			borderColor: 'rgba(75, 192, 192, 1)',
			tension: 0.3,
			borderWidth: 3,
			fill: false,
			segment: {
				borderColor: (ctx) => ctx.p1.parsed.y > limitValue ? 'red' : 'rgba(75, 192, 192, 1)',
			}
		}
	]
},
options: {
	responsive: true,
	scales: {
		x: { title: { display: true, text: 'Tempo' } },
		y: { title: { display: true, text: 'Valor' } }
	},
	plugins: {
		annotation:{
			annotations:{
				linhaLimite:{
						type: 'line',
						yMin: limitValue,
						yMax: limitValue,
						borderColor: 'rgba(0,0,0,0.5)',
						borderWidth: 2,
						borderDash: [10,5], //Linha Pontilhada
						label:{
							display: true,
							content: 'Limite',
							position: 'end'
						}
					}
				}
			}
		}
	}
});
function addData(label, data) {
myLineChart.data.labels.push(label);
myLineChart.data.datasets[0].data.push(data);
myLineChart.update(); // Atualiza o gráfico com o novo dado
}

// Exemplo de uso com intervalo para simular dados chegando
let contador = 0;
setInterval(() => {
	addData(`T${contador}`, Math.random() * 100); // Adiciona ponto aleatório
	contador++;
}, 1000); // Adiciona ponto a cada segundo

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