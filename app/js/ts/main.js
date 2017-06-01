System.register(['../json/casamentos', './casamentos'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var casamentos_1, casamentos_2;
    function main() {
        var grafico = new casamentos_2.Grafico(document.getElementById('grafico'));
        grafico.drawGrafico(casamentos_1.dados[0]);
        grafico.download(casamentos_1.dados[0]);
        // grafico.destroy();
    }
    return {
        setters:[
            function (casamentos_1_1) {
                casamentos_1 = casamentos_1_1;
            },
            function (casamentos_2_1) {
                casamentos_2 = casamentos_2_1;
            }],
        execute: function() {
            console.log('runned');
            main();
        }
    }
});
//# sourceMappingURL=main.js.map