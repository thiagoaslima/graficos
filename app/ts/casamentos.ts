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

    private fileName = '_graf4_casamento';

    private settings = {
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
    }

    constructor(
        public container: HTMLElement
    ) { }

    public drawGrafico(dados: Dados) {
        if (!this.canvas) { this.createCanvas() }

        this.drawEixoY();
        this.drawAxesAndEixoX(dados);
        this.drawBars(dados);
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
    }

    private drawEixoY() {
        this.context.fillStyle = this.settings.fontColor;

        const start = this.marginTop + this.settings.fontSize * 0.75;
        const otherLine = this.settings.fontSize;
        const spaceBetweenItems = this.settings.fontSize * 1.25 + this.settings.fontSize;

        let y = start;
        this.context.fillText('60 anos', 8, y);

        y += otherLine
        this.context.fillText('ou mais', 10, y)

        y += spaceBetweenItems
        this.context.fillText('50 a 59', 12, y)

        y += spaceBetweenItems
        this.context.fillText('40 a 49', 10, y)

        y += spaceBetweenItems
        this.context.fillText('30 a 39', 10, y)

        y += spaceBetweenItems
        this.context.fillText('20 a 29', 12, y)

        y += spaceBetweenItems
        this.context.fillText('0 a 19', 27, y)
    }

    private drawAxesAndEixoX(dados: Dados) {
        const yEixo = this.yEixo;
        const xZero = this.xZero;
        const largura = this.areaGrafico;
        const altura = yEixo - this.marginTop - this.settings.fontSize;

        this.context.lineWidth = this.settings.lineWidth;
        this.context.strokeStyle = this.settings.strokeStyle;
        this.context.strokeRect(xZero, this.marginTop, largura, altura);

        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('0', xZero, yEixo)

        let valores = Object.keys(dados).filter(key => key !== 'codigo').map(key => {
            let obj = dados[parseInt(key, 10)];
            return obj.homem > obj.mulher ? obj.homem : obj.mulher;
        });
        let max = Math.max(30, ...valores);

        while ((max % 6 !== 0 || max % 10 !== 0) && (max % 5 !== 0)) {
            max++;
        }

        if (max % 6 === 0) {
            let pace = max / 6;
            let dist = (largura - (max.toString().length * 18)) / 6;

            this.context.fillText(pace.toString(10), xZero + (dist), yEixo)
            this.context.fillText((pace * 2).toString(10), xZero + (dist * 2), yEixo)
            this.context.fillText((pace * 3).toString(10), xZero + (dist * 3), yEixo)
            this.context.fillText((pace * 4).toString(10), xZero + (dist * 4), yEixo)
            this.context.fillText((pace * 5).toString(10), xZero + (dist * 5), yEixo)
            this.context.fillText((pace * 6).toString(10), xZero + (dist * 6), yEixo)

            this.context.strokeStyle = this.settings.strokeStyle;
            dist = largura / 6;
            for (let i = 1; i <= 6; i++) {
                this.context.beginPath()
                this.context.moveTo(xZero + (dist * i), this.marginTop);
                this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
                this.context.stroke();
            }
        }
        else if (max % 5 === 0) {
            let pace = max / 5;
            let dist = 130;
            this.context.fillText(pace.toString(10), xZero + (dist), yEixo)
            this.context.fillText((pace * 2).toString(10), xZero + (dist * 2), yEixo)
            this.context.fillText((pace * 3).toString(10), xZero + (dist * 3), yEixo)
            this.context.fillText((pace * 4).toString(10), xZero + (dist * 4), yEixo)
            this.context.fillText((pace * 5).toString(10), xZero + (dist * 5), yEixo)

            this.context.strokeStyle = this.settings.strokeStyle;
            for (let i = 1; i < 5; i++) {
                this.context.beginPath()
                this.context.moveTo(xZero + (dist * i), this.marginTop);
                this.context.lineTo(xZero + (dist * i), yEixo - this.settings.fontSize);
                this.context.stroke();
            }
        }
    }

    private drawBars(dados: Dados) {
        const max = this.getMaximo(dados);
        const regiao = this.getRegiao(dados.codigo);
        const barWidth = 30;

        // 60
        this.context.fillStyle = this.settings.colors[regiao].homem;
        this.context.fillRect(this.xZero, this.marginTop + 10, this.areaGrafico * (dados[60].homem/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 100, this.areaGrafico * (dados[50].homem/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 160, this.areaGrafico * (dados[40].homem/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 240, this.areaGrafico * (dados[30].homem/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 300, this.areaGrafico * (dados[20].homem/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 360, this.areaGrafico * (dados[0].homem/max), barWidth);
        
        
        this.context.fillStyle = this.settings.colors[regiao].mulher;
        this.context.fillRect(this.xZero, this.marginTop + 40, this.areaGrafico * (dados[60].mulher/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 130, this.areaGrafico * (dados[50].mulher/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 190, this.areaGrafico * (dados[40].mulher/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 270, this.areaGrafico * (dados[30].mulher/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 330, this.areaGrafico * (dados[20].mulher/max), barWidth);
        this.context.fillRect(this.xZero, this.marginTop + 390, this.areaGrafico * (dados[0].mulher/max), barWidth);
        
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
                return 'centro'

            case '5':
                return 'sul'
        }
    }

    private getMaximo(dados: Dados) {
        let valores = Object.keys(dados).filter(key => key !== 'codigo').map(key => {
            let obj = dados[parseInt(key, 10)];
            return obj.homem > obj.mulher ? obj.homem : obj.mulher;
        });
        return Math.max(...valores);
    }
}