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
                    this.fileName = '_graf4_casamento';
                    this.settings = {
                        fontSize: 30,
                        fontFamily: 'FrutigerLight',
                        fontColor: 'red',
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
                    this.drawEixoY();
                    this.drawAxesAndEixoX(dados);
                    this.drawBars(dados);
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
                };
                Grafico.prototype.drawEixoY = function () {
                    this.context.fillStyle = this.settings.fontColor;
                    var start = this.marginTop + this.settings.fontSize * 0.75;
                    var otherLine = this.settings.fontSize;
                    var spaceBetweenItems = this.settings.fontSize * 1.25 + this.settings.fontSize;
                    var y = start;
                    this.context.fillText('60 anos', 8, y);
                    y += otherLine;
                    this.context.fillText('ou mais', 10, y);
                    y += spaceBetweenItems;
                    this.context.fillText('50 a 59', 12, y);
                    y += spaceBetweenItems;
                    this.context.fillText('40 a 49', 10, y);
                    y += spaceBetweenItems;
                    this.context.fillText('30 a 39', 10, y);
                    y += spaceBetweenItems;
                    this.context.fillText('20 a 29', 12, y);
                    y += spaceBetweenItems;
                    this.context.fillText('0 a 19', 27, y);
                };
                Grafico.prototype.drawAxesAndEixoX = function (dados) {
                    var yEixo = this.yEixo;
                    var xZero = this.xZero;
                    var largura = this.areaGrafico;
                    var altura = yEixo - this.marginTop - this.settings.fontSize;
                    this.context.lineWidth = this.settings.lineWidth;
                    this.context.strokeStyle = this.settings.strokeStyle;
                    this.context.strokeRect(xZero, this.marginTop, largura, altura);
                    this.context.fillStyle = this.settings.fontColor;
                    this.context.fillText('0', xZero, yEixo);
                    var valores = Object.keys(dados).filter(function (key) { return key !== 'codigo'; }).map(function (key) {
                        var obj = dados[parseInt(key, 10)];
                        return obj.homem > obj.mulher ? obj.homem : obj.mulher;
                    });
                    var max = Math.max.apply(Math, [30].concat(valores));
                    while ((max % 6 !== 0 || max % 10 !== 0) && (max % 5 !== 0)) {
                        max++;
                    }
                    if (max % 6 === 0) {
                        var pace = max / 6;
                        var dist = (largura - (max.toString().length * 18)) / 6;
                        this.context.fillText(pace.toString(10), xZero + (dist), yEixo);
                        this.context.fillText((pace * 2).toString(10), xZero + (dist * 2), yEixo);
                        this.context.fillText((pace * 3).toString(10), xZero + (dist * 3), yEixo);
                        this.context.fillText((pace * 4).toString(10), xZero + (dist * 4), yEixo);
                        this.context.fillText((pace * 5).toString(10), xZero + (dist * 5), yEixo);
                        this.context.fillText((pace * 6).toString(10), xZero + (dist * 6), yEixo);
                        this.context.strokeStyle = this.settings.strokeStyle;
                        dist = largura / 6;
                        for (var i = 1; i <= 6; i++) {
                            this.context.beginPath();
                            this.context.moveTo(xZero + (dist * i), this.marginTop);
                            this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
                            this.context.stroke();
                        }
                    }
                    else if (max % 5 === 0) {
                        var pace = max / 5;
                        var dist = 130;
                        this.context.fillText(pace.toString(10), xZero + (dist), yEixo);
                        this.context.fillText((pace * 2).toString(10), xZero + (dist * 2), yEixo);
                        this.context.fillText((pace * 3).toString(10), xZero + (dist * 3), yEixo);
                        this.context.fillText((pace * 4).toString(10), xZero + (dist * 4), yEixo);
                        this.context.fillText((pace * 5).toString(10), xZero + (dist * 5), yEixo);
                        this.context.strokeStyle = this.settings.strokeStyle;
                        for (var i = 1; i < 5; i++) {
                            this.context.beginPath();
                            this.context.moveTo(xZero + (dist * i), this.marginTop);
                            this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
                            this.context.stroke();
                        }
                    }
                };
                Grafico.prototype.drawBars = function (dados) {
                    var max = this.getMaximo(dados);
                    var regiao = this.getRegiao(dados.codigo);
                    var barWidth = 30;
                    // 60
                    this.context.fillStyle = this.settings.colors[regiao].homem;
                    this.context.fillRect(this.xZero, this.marginTop + 10, this.areaGrafico * (dados[60].homem / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 100, this.areaGrafico * (dados[50].homem / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 160, this.areaGrafico * (dados[40].homem / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 240, this.areaGrafico * (dados[30].homem / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 300, this.areaGrafico * (dados[20].homem / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 360, this.areaGrafico * (dados[0].homem / max), barWidth);
                    this.context.fillStyle = this.settings.colors[regiao].mulher;
                    this.context.fillRect(this.xZero, this.marginTop + 40, this.areaGrafico * (dados[60].mulher / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 130, this.areaGrafico * (dados[50].mulher / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 190, this.areaGrafico * (dados[40].mulher / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 270, this.areaGrafico * (dados[30].mulher / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 330, this.areaGrafico * (dados[20].mulher / max), barWidth);
                    this.context.fillRect(this.xZero, this.marginTop + 390, this.areaGrafico * (dados[0].mulher / max), barWidth);
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
                            return 'centro';
                        case '5':
                            return 'sul';
                    }
                };
                Grafico.prototype.getMaximo = function (dados) {
                    var valores = Object.keys(dados).filter(function (key) { return key !== 'codigo'; }).map(function (key) {
                        var obj = dados[parseInt(key, 10)];
                        return obj.homem > obj.mulher ? obj.homem : obj.mulher;
                    });
                    return Math.max.apply(Math, valores);
                };
                return Grafico;
            }());
            exports_1("Grafico", Grafico);
        }
    }
});
//# sourceMappingURL=casamentos.js.map