System.register(['./120_municipios', '../json/9.religiao', './9.religiao'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var _120_municipios_1, _9_religiao_1, _9_religiao_2;
    function main() {
        var grafico = new _9_religiao_2.Grafico(document.getElementById('grafico'));
        run(grafico, _9_religiao_1.dados);
    }
    function run(grafico, dados, i) {
        if (i === void 0) { i = 0; }
        var codigo = dados[i].codigo;
        if (_120_municipios_1.lista[codigo]) {
            draw(grafico, dados[i]);
        }
        if (dados[i + 1]) {
            setTimeout(function () {
                run(grafico, dados, i + 1);
            }, 20);
        }
    }
    function draw(grafico, dados) {
        grafico.drawGrafico(dados);
        grafico.download(dados);
        grafico.destroy();
    }
    return {
        setters:[
            function (_120_municipios_1_1) {
                _120_municipios_1 = _120_municipios_1_1;
            },
            function (_9_religiao_1_1) {
                _9_religiao_1 = _9_religiao_1_1;
            },
            function (_9_religiao_2_1) {
                _9_religiao_2 = _9_religiao_2_1;
            }],
        execute: function() {
            main();
        }
    }
});
//# sourceMappingURL=main.js.map