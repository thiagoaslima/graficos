interface Dados {
    codigo: number
    [age: number]: { homem: number, mulher: number }
}
export class Grafico {
    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    private width = 921;
    private height = 567;
    private marginTop = 40;
    private xZero = 125;
    private yEixo = 490;
    private areaGrafico = 788;
    private maxValue: number|null = null;
    private finalEscala: number|null = null;
    private divisor: number|null = null;

    private fileName = '_graf4_casamento';

    private settings = {
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
    }

    constructor(
        public container: HTMLElement
    ) { }

    public drawGrafico(dados: Dados) {
        if (!this.canvas) { this.createCanvas() }
        
        this.setMaximos(dados);
        this.drawEixoY();
        this.drawAxesAndEixoX(dados);
        this.drawBars(dados);
        this.drawLegenda(dados.codigo);
    }

    public createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.font = `${this.settings.fontSize}px ${this.settings.fontFamily}`;

        this.container.appendChild(canvas);
    }

    public destroy() {
        this.container.removeChild(this.canvas);
        this.canvas = null;
        this.context = null;
        this.maxValue = null;
    }

    private drawEixoY() {
        this.context.fillStyle = this.settings.fontColor;

        const start = this.marginTop + this.settings.fontSize * 0.75;
        const otherLine = this.settings.fontSize;
        const spaceBetweenItems = this.settings.fontSize * 1.25 + this.settings.fontSize;

        let y = start;
        let text = '60 anos';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);

        y += otherLine
        text = 'ou mais'
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += spaceBetweenItems
        text = '50 a 59';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += spaceBetweenItems
        text = '40 a 49';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += spaceBetweenItems
        text = '30 a 39';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += spaceBetweenItems
        text = '20 a 29';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += spaceBetweenItems
        text = '0 a 19';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)
    }

    private drawAxesAndEixoX(dados: Dados) {
        const yEixo = this.yEixo;
        const xZero = this.xZero;
        const largura = this.areaGrafico;
        const altura = yEixo - this.marginTop - this.settings.fontSize;

        this.context.lineWidth = this.settings.lineWidth;
        this.context.strokeStyle = this.settings.strokeStyle;
        this.context.strokeRect(xZero, this.marginTop, largura, altura);

        this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('0', xZero, yEixo)

        // const divisor = this.finalEscala % 6 === 0 ? 6 : this.finalEscala % 5 === 0 ? 5 : 4

        let pace = this.finalEscala / this.divisor;
        let dist = (largura - (this.context.measureText(this.finalEscala.toString()).width)) / this.divisor;
            
        for (let i = 0; i <= this.divisor; i++) {
            this.context.fillText((pace * i).toString(10), xZero + (dist * i), yEixo)
        }

        this.context.strokeStyle = this.settings.strokeStyle;
        dist = largura / this.divisor;
        for (let i = 1; i <= this.divisor; i++) {
            this.context.beginPath()
            this.context.moveTo(xZero + (dist * i), this.marginTop);
            this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
            this.context.stroke();
        }
        
    }

    private drawBars(dados: Dados) {
        const regiao = this.getRegiao(dados.codigo);
        const barWidth = 25;
        const entreBarras = 20;

        this.context.fillStyle = this.settings.colors[regiao].homem;
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 0 + entreBarras * 0, this.areaGrafico * (dados[60].homem/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 2 + entreBarras * 1, this.areaGrafico * (dados[50].homem/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 4 + entreBarras * 2, this.areaGrafico * (dados[40].homem/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 6 + entreBarras * 3, this.areaGrafico * (dados[30].homem/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 8 + entreBarras * 4, this.areaGrafico * (dados[20].homem/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 10 + entreBarras * 5, this.areaGrafico * (dados[0].homem/this.finalEscala), barWidth);
        
        
        this.context.fillStyle = this.settings.colors[regiao].mulher;
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 1 + entreBarras * 0, this.areaGrafico * (dados[60].mulher/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 3 + entreBarras * 1, this.areaGrafico * (dados[50].mulher/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 5 + entreBarras * 2, this.areaGrafico * (dados[40].mulher/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 7 + entreBarras * 3, this.areaGrafico * (dados[30].mulher/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 9 + entreBarras * 4, this.areaGrafico * (dados[20].mulher/this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 3 + barWidth * 11 + entreBarras * 5, this.areaGrafico * (dados[0].mulher/this.finalEscala), barWidth);
        
    }

    private drawLegenda(codigo: number) {
        const regiao = this.getRegiao(codigo);
        const larguraQuadrado = 25
        
        this.context.fillStyle = this.settings.colors[regiao].homem
        this.context.fillRect(353, 530, larguraQuadrado, larguraQuadrado);

        this.context.fillStyle = this.settings.colors[regiao].mulher
        this.context.fillRect(549, 530, larguraQuadrado, larguraQuadrado);

        this.context.font = this.settings.fontSize + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('Homem', 353 + larguraQuadrado + 12, 530 + this.settings.fontSize * 0.8)
        this.context.fillText('Muher', 548 + larguraQuadrado + 12, 530 + this.settings.fontSize * 0.8)
    }

    public download(dados: Dados) {
        let event = document.createEvent("MouseEvents");
        let downloadLink = document.createElement('a');

        downloadLink.download = dados.codigo + this.fileName;
        downloadLink.href = this.canvas.toDataURL();

        event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        downloadLink.dispatchEvent(event);

        downloadLink = null;
        event = null;
    }

    private getRegiao(codigo: number) {
        switch(codigo.toString().substr(0, 1)) {
            case '1':
                return 'norte'
            
            case '2':
                return 'nordeste'

            case '3':
                return 'sudeste'

            case '4':
                return 'sul'

            case '5':
                return 'centro'
        }
    }

    private setMaximos(dados: Dados) {
        this.setMaxValue(dados);
        this.setMaxEscala(dados);
    }

    private setMaxValue(dados: Dados) {
        let valores = Object.keys(dados).filter(key => key !== 'codigo').map(key => {
            let obj = dados[parseInt(key, 10)];
            return obj.homem > obj.mulher ? obj.homem : obj.mulher;
        });
        this.maxValue = Math.max(...valores);
    }

    private setMaxEscala(dados: Dados) {
        let max: number = this.maxValue;

        while (
            !this.serveComoDivisor(max, 6) &&
            !this.serveComoDivisor(max, 5) &&
            !this.serveComoDivisor(max, 4)
        ) {
            max++;
        }

        this.finalEscala = max;
        this.divisor = this.serveComoDivisor(max, 6) ? 6 : this.serveComoDivisor(max, 5) ? 5 : 4;
    }

    private serveComoDivisor(valor: number, divisor: number) {
        let step = valor / divisor;
        let valoresValidos: number[];

        if (step <= 10) {
            valoresValidos = [1, 2, 3, 4, 5, 10];
            return valoresValidos.indexOf(step) >= 0;
        }

        if (valor % divisor !== 0) {
            return false;
        }

        valoresValidos = [10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90];
        const start = parseInt(step.toString().substr(0, 2), 10);

        const condition1 = valoresValidos.indexOf(start) >= 0;
        const condition2 = step.toString().substr(2).split('').every(n => n =='0') 

        return condition1 && condition2;
    }
}