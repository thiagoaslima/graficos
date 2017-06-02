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
                    this.height = 567;
                    this.marginTop = 40;
                    this.xZero = 125;
                    this.yEixo = 490;
                    this.areaGrafico = 788;
                    this.maxValue = null;
                    this.finalEscala = null;
                    this.divisor = null;
                    this.fileName = '_graf4_casamento';
                    this.settings = {
                        fontSize: 30,
                        fontFamily: 'FrutigerLight',
                        fontColor: 'black',
                        lineWidth: 0.5,
                        strokeStyle: 'hsl(0, 0, 25)',
                        colors: {
                            norte: {
                                homem: "rgb(106, 61, 49)",
                                mulher: "rgb(159, 87, 41)"
                            },
                            nordeste: {
                                homem: "rgb(38, 95, 139)",
                                mulher: "rgb(145, 175, 210)"
                            },
                            sudeste: {
                                homem: "rgb(200, 87, 38)",
                                mulher: "rgb(218, 154, 34)"
                            },
                            sul: {
                                homem: "rgb(29, 106, 69)",
                                mulher: "rgb(158, 201, 174)"
                            },
                            centro: {
                                homem: "rgb(127, 0, 25)",
                                mulher: "rgb(181, 79, 54)"
                            }
                        }
                    };
                }
                Grafico.prototype.drawGrafico = function (dados) {
                    if (!this.canvas) {
                        this.createCanvas();
                    }
                    this.setMaximos(dados);
                    this.drawEixoY();
                    this.drawAxesAndEixoX(dados);
                    this.drawBars(dados);
                    this.drawLegenda(dados.codigo);
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
                };
                Grafico.prototype.drawEixoY = function () {
                    this.context.fillStyle = this.settings.fontColor;
                    var start = this.marginTop + this.settings.fontSize * 0.75;
                    var otherLine = this.settings.fontSize;
                    var spaceBetweenItems = this.settings.fontSize * 1.25 + this.settings.fontSize;
                    var y = start;
                    var text = '60 anos';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += otherLine;
                    text = 'ou mais';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += spaceBetweenItems;
                    text = '50 a 59';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += spaceBetweenItems;
                    text = '40 a 49';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += spaceBetweenItems;
                    text = '30 a 39';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += spaceBetweenItems;
                    text = '20 a 29';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                    y += spaceBetweenItems;
                    text = '0 a 19';
                    this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);
                };
                Grafico.prototype.drawAxesAndEixoX = function (dados) {
                    var yEixo = this.yEixo;
                    var xZero = this.xZero;
                    var largura = this.areaGrafico;
                    var altura = yEixo - this.marginTop - this.settings.fontSize;
                    this.context.lineWidth = this.settings.lineWidth;
                    this.context.strokeStyle = this.settings.strokeStyle;
                    this.context.strokeRect(xZero, this.marginTop, largura, altura);
                    this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText('0', xZero, yEixo);
                    // const divisor = this.finalEscala % 6 === 0 ? 6 : this.finalEscala % 5 === 0 ? 5 : 4
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
                    var barWidth = 25;
                    var entreBarras = 20;
                    this.context.fillStyle = this.settings.colors[regiao].homem;
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 0 + entreBarras * 0, this.areaGrafico * (dados[60].homem / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 2 + entreBarras * 1, this.areaGrafico * (dados[50].homem / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 4 + entreBarras * 2, this.areaGrafico * (dados[40].homem / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 6 + entreBarras * 3, this.areaGrafico * (dados[30].homem / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 8 + entreBarras * 4, this.areaGrafico * (dados[20].homem / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 10 + entreBarras * 5, this.areaGrafico * (dados[0].homem / this.finalEscala), barWidth);
                    this.context.fillStyle = this.settings.colors[regiao].mulher;
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 1 + entreBarras * 0, this.areaGrafico * (dados[60].mulher / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 3 + entreBarras * 1, this.areaGrafico * (dados[50].mulher / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 5 + entreBarras * 2, this.areaGrafico * (dados[40].mulher / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 7 + entreBarras * 3, this.areaGrafico * (dados[30].mulher / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 9 + entreBarras * 4, this.areaGrafico * (dados[20].mulher / this.finalEscala), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 11 + entreBarras * 5, this.areaGrafico * (dados[0].mulher / this.finalEscala), barWidth);
                };
                Grafico.prototype.drawLegenda = function (codigo) {
                    var regiao = this.getRegiao(codigo);
                    var larguraQuadrado = 25;
                    this.context.fillStyle = this.settings.colors[regiao].homem;
                    this.context.fillRect(353, 530, larguraQuadrado, larguraQuadrado);
                    this.context.fillStyle = this.settings.colors[regiao].mulher;
                    this.context.fillRect(549, 530, larguraQuadrado, larguraQuadrado);
                    this.context.font = this.settings.fontSize + 'px ' + this.settings.fontFamily;
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText('Homem', 353 + larguraQuadrado + 12, 530 + this.settings.fontSize * 0.8);
                    this.context.fillText('Muher', 548 + larguraQuadrado + 12, 530 + this.settings.fontSize * 0.8);
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
                return Grafico;
            }());
            exports_1("Grafico", Grafico);
        }
    }
});
//# sourceMappingURL=4.casamentos.js.map