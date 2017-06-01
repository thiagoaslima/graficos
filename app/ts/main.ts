import { dados } from '../json/casamentos'; 
import { Grafico } from './casamentos';

console.log('runned');

function main() {
    let grafico = new Grafico(document.getElementById('grafico'));

    grafico.drawGrafico(dados[0]);
    grafico.download(dados[0]);
    // grafico.destroy();
}

main();