// import { lista } from './120_municipios';
import { dados } from '../json/7.pib';
import { Grafico } from './7.pib';

function main() {
    let grafico = new Grafico(document.getElementById('grafico'));  
    run(grafico, dados);
}

function run(grafico: Grafico, dados: any, i = 0) {
    const {codigo} = dados[i];

    // if (lista[codigo]) {
        draw(grafico, dados[i]);
    // }

    if (dados[i + 1]) {
        setTimeout(() => {
            run(grafico, dados, i + 1);
        }, 30)
    }
}

function draw(grafico: Grafico, dados: any) {
    grafico.drawGrafico(dados);
    grafico.download(dados);
    grafico.destroy();
}

main();