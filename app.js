const r11 = document.getElementById("result11");
const r12 = document.getElementById("result12");
const r21 = document.getElementById("result21");
const r22 = document.getElementById("result22");

const grafico1 = document.getElementById("grafico1").getContext('2d');
const grafico2 = document.getElementById("grafico2").getContext('2d');

const dep1 = document.getElementById("departamento1")
const dep2 = document.getElementById("departamento2")

let g1 = null, g2 = null;

let dados = [];
carregarDados().then(json => dados = json);

async function carregarDados() {
    const response = await fetch('data/dados.json');
    return await response.json();
}

document.getElementById('comparar').addEventListener('click', async () => {


    const idOpcao1 = document.getElementById('area').value;
    const idOpcao2 = document.getElementById('area2').value;

    const curso1 = dados.find(item => item.codigo === idOpcao1);
    const curso2 = dados.find(item => item.codigo === idOpcao2);

    if (curso1){
        r11.textContent =  `HOMENS: ${curso1.qtdM}`
        r12.textContent =  `MULHERES: ${curso1.qtdF}`


        if (g1) g1.destroy();

        g1 = new Chart(grafico1, { 
            type: 'pie',
            data: {
                labels: ['Homens', 'Mulheres'],
                datasets: [{
                    label: 'Distribuição de gênero',
                    data: [curso1.qtdM, curso1.qtdF],
                    backgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                }]
            }
        });
    
        dep1.textContent = `Unidade Gestora:  ${curso1.nomeUnid}`;
    }
    else {
        r11.textContent =  `HOMENS: ----`
        r12.textContent =  `MULHERES: ----`
        dep1.textContent = `Unidade Gestora:  ----`;
    }

    if (curso2){
        r21.textContent =  `HOMENS: ${curso2.qtdM}`
        r22.textContent =  `MULHERES: ${curso2.qtdF}`

        if (g2) g2.destroy();

        g2 = new Chart(grafico2, { 
            type: 'pie',
            data: {
                labels: ['Homens', 'Mulheres'],
                datasets: [{
                    label: 'Distribuição de gênero',
                    data: [curso2.qtdM, curso2.qtdF],
                    backgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                }]
            }
        });

        dep2.textContent = `Unidade Gestora:  ${curso2.nomeUnid}`;
    }
    else {
        r21.textContent =  `HOMENS: ----`
        r22.textContent =  `MULHERES: ----`
        dep2.textContent = `Unidade Gestora: ----`;
    }

});