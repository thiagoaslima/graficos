System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Grafico;
    return {
        setters:[],
        execute: function() {
            Grafico = (function () {
                function Grafico(container) {
                    this.container = container;
                    this.width = 921;
                    this.height = 791;
                    this.marginTop = 26.5;
                    this.xZero = 282;
                    this.yEixo = 490;
                    this.alturaAreaGrafico = 754;
                    this.larguraAreaGrafico = 605;
                    this.maxValue = null;
                    this.finalEscala = null;
                    this.divisor = null;
                    this.fileName = '_graf6_instrucao';
                    this.settings = {
                        fontSize: 30,
                        fontFamily: 'FrutigerLight',
                        fontColor: 'black',
                        lineWidth: 0.5,
                        strokeStyle: 'hsl(0, 0, 25)',
                        colors: {
                            norte: "rgb(106, 61, 49)",
                            nordeste: "rgb(38, 95, 139)",
                            sudeste: "rgb(200, 87, 38)",
                            sul: "rgb(29, 106, 69)",
                            centro: "rgb(127, 0, 25)"
                        }
                    };
                }
                Grafico.prototype.drawGrafico = function (dados) {
                    if (!this.canvas) {
                        this.createCanvas();
                    }
                    // this.setMaximos(dados);
                    this.drawEixoY();
                    this.drawAreaGrafico();
                    // this.drawEixoX(dados);
                    this.drawBars(dados);
                    this.drawLegenda(dados);
                    this.extras();
                };
                Grafico.prototype.createCanvas = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.height;
                    this.canvas = canvas;
                    this.context = canvas.getContext('2d');
                    this.context.font = this.settings.fontSize + "px " + this.settings.fontFamily;
                    this.container.appendChild(canvas);
                };
                Grafico.prototype.destroy = function () {
                    this.container.removeChild(this.canvas);
                    this.canvas = null;
                    this.context = null;
                    this.maxValue = null;
                    this.finalEscala = null;
                    this.divisor = null;
                };
                Grafico.prototype.drawEixoY = function () {
                    this.context.fillStyle = this.settings.fontColor;
                    var start = this.marginTop + this.settings.fontSize * 0.75 + 30;
                    var linha = 30;
                    var entreItens = 34 + linha;
                    var y = start;
                    var text = 'Não alfabetizado';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens + 17;
                    text = 'Ensino fundamental';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'incompleto';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens;
                    text = 'Ensino fundamental';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'completo';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens;
                    text = 'Ensino médio';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'incompleto';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens;
                    text = 'Ensino médio';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'completo';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens;
                    text = 'Ensino superior';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'incompleto';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens;
                    text = 'Ensino superior';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += linha;
                    text = 'completo';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += entreItens + 12;
                    text = 'Pós graduação';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                };
                Grafico.prototype.drawAreaGrafico = function () {
                    this.context.lineWidth = this.settings.lineWidth;
                    this.context.strokeStyle = this.settings.strokeStyle;
                    this.context.strokeRect(this.xZero, this.marginTop, this.larguraAreaGrafico, this.alturaAreaGrafico);
                };
                Grafico.prototype.drawEixoX = function (dados) {
                    var yEixo = this.yEixo;
                    var xZero = this.xZero;
                    var largura = this.larguraAreaGrafico;
                    var altura = this.alturaAreaGrafico;
                    this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText('0', xZero, yEixo);
                    var divisor = this.finalEscala % 6 === 0 ? 6 : this.finalEscala % 5 === 0 ? 5 : 4;
                    var pace = this.finalEscala / this.divisor;
                    var dist = (largura - (this.context.measureText(this.finalEscala.toString()).width)) / this.divisor;
                    for (var i = 0; i <= this.divisor; i++) {
                        this.context.fillText((pace * i).toString(10), xZero + (dist * i), yEixo);
                    }
                    this.context.strokeStyle = this.settings.strokeStyle;
                    dist = largura / this.divisor;
                    for (var i = 1; i <= this.divisor; i++) {
                        this.context.beginPath();
                        this.context.moveTo(xZero + (dist * i), this.marginTop);
                        this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
                        this.context.stroke();
                    }
                };
                Grafico.prototype.drawBars = function (dados) {
                    var regiao = this.getRegiao(dados.codigo);
                    var barWidth = 49;
                    var entreBarras = 45;
                    var start = this.marginTop + this.settings.fontSize * 0.75 - 5;
                    this.context.fillStyle = this.settings.colors[regiao];
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 0, this.larguraAreaGrafico * (parseFloat(dados.nao_alfabetizado.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 1, this.larguraAreaGrafico * (parseFloat(dados.fundamental_incompleto.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 2, this.larguraAreaGrafico * (parseFloat(dados.fundamental_completo.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 3, this.larguraAreaGrafico * (parseFloat(dados.medio_incompleto.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 4, this.larguraAreaGrafico * (parseFloat(dados.medio_completo.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 5, this.larguraAreaGrafico * (parseFloat(dados.superior_incompleto.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 6, this.larguraAreaGrafico * (parseFloat(dados.superior_completo.replace(',', '.')) / 100), barWidth);
                    this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 7, this.larguraAreaGrafico * (parseFloat(dados.pos_graduacao.replace(',', '.')) / 100), barWidth);
                };
                Grafico.prototype.drawLegenda = function (dados) {
                    var regiao = this.getRegiao(dados.codigo);
                    var barWidth = 49;
                    var entreBarras = 45;
                    var start = this.marginTop + this.settings.fontSize * 0.75 + 18;
                    this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText(this.format(dados.nao_alfabetizado), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.nao_alfabetizado.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 0);
                    this.context.fillText(this.format(dados.fundamental_incompleto), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.fundamental_incompleto.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 1);
                    this.context.fillText(this.format(dados.fundamental_completo), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.fundamental_completo.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 2);
                    this.context.fillText(this.format(dados.medio_incompleto), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.medio_incompleto.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 3);
                    this.context.fillText(this.format(dados.medio_completo), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.medio_completo.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 4);
                    this.context.fillText(this.format(dados.superior_incompleto), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.superior_incompleto.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 5);
                    this.context.fillText(this.format(dados.superior_completo), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.superior_completo.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 6);
                    this.context.fillText(this.format(dados.pos_graduacao), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.pos_graduacao.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 7);
                };
                Grafico.prototype.extras = function () {
                    this.context.font = this.settings.fontSize * 0.8 + 'px ' + this.settings.fontFamily;
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText('%', this.xZero + 5 + this.larguraAreaGrafico, this.marginTop + this.alturaAreaGrafico);
                };
                Grafico.prototype.download = function (dados) {
                    var event = document.createEvent("MouseEvents");
                    var downloadLink = document.createElement('a');
                    downloadLink.download = dados.codigo + this.fileName;
                    downloadLink.href = this.canvas.toDataURL();
                    event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    downloadLink.dispatchEvent(event);
                    downloadLink = null;
                    event = null;
                };
                Grafico.prototype.getRegiao = function (codigo) {
                    switch (codigo.toString().substr(0, 1)) {
                        case '1':
                            return 'norte';
                        case '2':
                            return 'nordeste';
                        case '3':
                            return 'sudeste';
                        case '4':
                            return 'sul';
                        case '5':
                            return 'centro';
                    }
                };
                Grafico.prototype.setMaximos = function (dados) {
                    this.setMaxValue(dados);
                    this.setMaxEscala(dados);
                };
                Grafico.prototype.setMaxValue = function (dados) {
                    var valores = Object.keys(dados).filter(function (key) { return key !== 'codigo'; }).map(function (key) {
                        var obj = dados[parseInt(key, 10)];
                        return obj.homem > obj.mulher ? obj.homem : obj.mulher;
                    });
                    this.maxValue = Math.max.apply(Math, valores);
                };
                Grafico.prototype.setMaxEscala = function (dados) {
                    var max = this.maxValue;
                    while (!this.serveComoDivisor(max, 6) &&
                        !this.serveComoDivisor(max, 5) &&
                        !this.serveComoDivisor(max, 4)) {
                        max++;
                    }
                    this.finalEscala = max;
                    this.divisor = this.serveComoDivisor(max, 6) ? 6 : this.serveComoDivisor(max, 5) ? 5 : 4;
                };
                Grafico.prototype.serveComoDivisor = function (valor, divisor) {
                    var step = valor / divisor;
                    var valoresValidos;
                    if (step <= 10) {
                        valoresValidos = [1, 2, 3, 4, 5, 10];
                        return valoresValidos.indexOf(step) >= 0;
                    }
                    if (valor % divisor !== 0) {
                        return false;
                    }
                    valoresValidos = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90];
                    var start = parseInt(step.toString().substr(0, 2), 10);
                    var condition1 = valoresValidos.indexOf(start) >= 0;
                    var condition2 = step.toString().substr(2).split('').every(function (n) { return n == '0'; });
                    return condition1 && condition2;
                };
                Grafico.prototype.format = function (value) {
                    return value.indexOf(',') === -1 ? value + ',0' : value;
                };
                return Grafico;
            }());
            exports_1("Grafico", Grafico);
        }
    }
});
//# sourceMappingURL=6.instrucao.js.map