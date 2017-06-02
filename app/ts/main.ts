import { lista } from './120_municipios';
import { dados } from '../json/9.religiao';
import { Grafico } from './9.religiao';

function main() {
    let grafico = new Grafico(document.getElementById('grafico'));  
    run(grafico, dados);
}

function run(grafico: Grafico, dados: any, i = 0) {
    const {codigo} = dados[i];

    if (lista[codigo]) {
        draw(grafico, dados[i]);
    }

    if (dados[i + 1]) {
        setTimeout(() => {
            run(grafico, dados, i + 1);
        }, 20)
    }

}

function draw(grafico: Grafico, dados: any) {
    grafico.drawGrafico(dados);
    grafico.download(dados);
    grafico.destroy();
}

main();