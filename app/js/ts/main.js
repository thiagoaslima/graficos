System.register(['../json/7.pib', './7.pib'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _7_pib_1, _7_pib_2;
    function main() {
        var grafico = new _7_pib_2.Grafico(document.getElementById('grafico'));
        run(grafico, _7_pib_1.dados);
    }
    function run(grafico, dados, i) {
        if (i === void 0) { i = 0; }
        var codigo = dados[i].codigo;
        // if (lista[codigo]) {
        draw(grafico, dados[i]);
        // }
        if (dados[i + 1]) {
            setTimeout(function () {
                run(grafico, dados, i + 1);
            }, 30);
        }
    }
    function draw(grafico, dados) {
        grafico.drawGrafico(dados);
        grafico.download(dados);
        grafico.destroy();
    }
    return {
        setters:[
            function (_7_pib_1_1) {
                _7_pib_1 = _7_pib_1_1;
            },
            function (_7_pib_2_1) {
                _7_pib_2 = _7_pib_2_1;
            }],
        execute: function() {
            main();
        }
    }
});
//# sourceMappingURL=main.js.map