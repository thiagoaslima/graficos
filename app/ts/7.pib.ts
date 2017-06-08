interface Dados {
   "codigo": number
   "agro": string
   "industria": string
   "servicos": string
   "adm": string
}
export class Grafico {
    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    private width = 921;
    private height = 726;
    private marginTop = 28;
    private xZero = 315;
    private yEixo = 667;
    private alturaAreaGrafico = 610;
    private larguraAreaGrafico = 580;
    private maxValue: number|null = null;
    private finalEscala: number|null = null;
    private divisor: number|null = null;

    private fileName = '_graf7_pib';

    private settings = {
        fontSize: 27,
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
    }

    constructor(
        public container: HTMLElement
    ) { }

    public drawGrafico(dados: Dados) {
        if (!this.canvas) { this.createCanvas() }
        
        this.setMaximos(dados);
        this.drawEixoY();
        this.drawAreaGrafico();
        this.drawEixoX(dados);
        this.drawBars(dados);
        //this.drawLegenda(dados);
        // this.extras();
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
        this.finalEscala = null;
        this.divisor = null;
    }

    private drawEixoY() {
        this.context.font = this.settings.fontSize + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;

        const start = this.marginTop + 85;
        const linha = 30;
        const entreItens = 120 + linha;

        let y = start;
        let text = 'Agropecuária';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);

        y += entreItens
        text = 'Indústria'
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Serviços';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)
        
        y += 120
        text = 'Administração, saúde';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'e educação públicas';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'e seguridade social';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)
    }

    private drawAreaGrafico() {
        this.context.lineWidth = this.settings.lineWidth;
        this.context.strokeStyle = this.settings.strokeStyle;
        this.context.strokeRect(this.xZero, this.marginTop, this.larguraAreaGrafico, this.alturaAreaGrafico);
    }

    private drawEixoX(dados: Dados) {
        const yEixo = this.yEixo;
        const xZero = this.xZero;
        const largura = this.larguraAreaGrafico;
        const altura = this.alturaAreaGrafico;

        this.context.font = this.settings.fontSize * 0.7 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('0', xZero, yEixo)

        const divisor = this.finalEscala % 6 === 0 ? 6 : this.finalEscala % 5 === 0 ? 5 : 4

        let pace = this.finalEscala / this.divisor;
        let dist = (largura - (this.context.measureText(this.format(this.finalEscala.toString(10))).width * 0.8)) / this.divisor;
        let i;
        for (i = 1; i < this.divisor; i++) {
            let text = this.format((pace * i).toString(10))
            this.context.fillText(text, xZero + (dist * i) - this.context.measureText(text).width * (this.divisor - i) * 0.08, yEixo)
        }
        this.context.fillText(this.format((pace * i).toString(10)), xZero + (dist * i), yEixo)

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
        const barWidth = 55;
        const entreBarras = 95;
        const start = this.marginTop + 50;

        this.context.fillStyle = this.settings.colors[regiao];

        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 0, this.larguraAreaGrafico * (parseInt(dados.agro.replace(/\./g, ''), 10) / this.finalEscala), barWidth);
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 1, this.larguraAreaGrafico * (parseInt(dados.industria.replace(/\./g, ''), 10) / this.finalEscala), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 2, this.larguraAreaGrafico * (parseInt(dados.servicos.replace(/\./g, ''), 10) / this.finalEscala), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 3, this.larguraAreaGrafico * (parseInt(dados.adm.replace(/\./g, ''), 10) / this.finalEscala), barWidth);        
        // this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 4, this.larguraAreaGrafico * (parseInt(dados.adm.replace(/\./g, ''), 10) / this.finalEscala), barWidth);        
    }

    private drawLegenda(dados: Dados) {
        const regiao = this.getRegiao(dados.codigo);
        const barWidth = 45;
        const entreBarras = 32;
        const start = this.marginTop + this.settings.fontSize * 0.75 + 17;

        this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        
        // this.context.fillText(this.format(dados.catolica),   this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.catolica.replace(',', '.')) / 100),   12 + start + (barWidth + entreBarras) * 0);
        // this.context.fillText(this.format(dados.evangelica), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.evangelica.replace(',', '.')) / 100), 12 + start + (barWidth + entreBarras) * 1);        
        // this.context.fillText(this.format(dados.espirita),   this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.espirita.replace(',', '.')) / 100),   12 + start + (barWidth + entreBarras) * 2);        
        // this.context.fillText(this.format(dados.umbanda),    this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.umbanda.replace(',', '.')) / 100),    12 + start + (barWidth + entreBarras) * 3);        
        // this.context.fillText(this.format(dados.outras),     this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.outras.replace(',', '.')) / 100),     12 + start + (barWidth + entreBarras) * 4);        
        // this.context.fillText(this.format(dados.sem),        this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.sem.replace(',', '.')) / 100),        12 + start + (barWidth + entreBarras) * 5);        
    }

    private extras() {
        this.context.font = this.settings.fontSize * 0.8 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('%', this.xZero + 5 + this.larguraAreaGrafico, this.marginTop + this.alturaAreaGrafico);
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
            let value = dados[key];
            return parseInt(value.replace(/\./g, ''), 10)
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

    private format(value: string) {
        while (value.match(/^\d\d{3}/)){
	        value = value.replace(/(\d)(\d{3}(\.|,|$))/, '$1.$2');
        }
        return value;
    }
}