interface Dados {
   "codigo": number,
   "nao_alfabetizado": string,
   "fundamental_incompleto": string,
   "fundamental_completo": string,
   "medio_incompleto": string,
   "medio_completo": string,
   "superior_incompleto": string,
   "superior_completo": string,
   "pos_graduacao": string
}
export class Grafico {
    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    private width = 921;
    private height = 791;
    private marginTop = 26.5;
    private xZero = 282;
    private yEixo = 490;
    private alturaAreaGrafico = 754;
    private larguraAreaGrafico = 605;
    private maxValue: number|null = null;
    private finalEscala: number|null = null;
    private divisor: number|null = null;

    private fileName = '_graf6_instrucao';

    private settings = {
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
    }

    constructor(
        public container: HTMLElement
    ) { }

    public drawGrafico(dados: Dados) {
        if (!this.canvas) { this.createCanvas() }
        
        // this.setMaximos(dados);
        this.drawEixoY();
        this.drawAreaGrafico();
        // this.drawEixoX(dados);
        this.drawBars(dados);
        this.drawLegenda(dados);
        this.extras();
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
        this.context.fillStyle = this.settings.fontColor;

        const start = this.marginTop + this.settings.fontSize * 0.75 + 30;
        const linha = 30;
        const entreItens = 34 + linha;

        let y = start;
        let text = 'Não alfabetizado';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y);

        y += entreItens + 17
        text = 'Ensino fundamental'
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'incompleto';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Ensino fundamental';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'completo';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Ensino médio';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'incompleto';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Ensino médio';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'completo';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Ensino superior';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'incompleto';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens
        text = 'Ensino superior';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += linha
        text = 'completo';
        this.context.fillText(text, this.xZero - this.context.measureText(text).width - 15, y)

        y += entreItens + 12
        text = 'Pós graduação';
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

        this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        this.context.fillText('0', xZero, yEixo)

        const divisor = this.finalEscala % 6 === 0 ? 6 : this.finalEscala % 5 === 0 ? 5 : 4

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
        const barWidth = 49;
        const entreBarras = 45;
        const start = this.marginTop + this.settings.fontSize * 0.75 - 5;

        this.context.fillStyle = this.settings.colors[regiao];

        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 0, this.larguraAreaGrafico * (parseFloat(dados.nao_alfabetizado.replace(',', '.')) / 100), barWidth);
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 1, this.larguraAreaGrafico * (parseFloat(dados.fundamental_incompleto.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 2, this.larguraAreaGrafico * (parseFloat(dados.fundamental_completo.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 3, this.larguraAreaGrafico * (parseFloat(dados.medio_incompleto.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 4, this.larguraAreaGrafico * (parseFloat(dados.medio_completo.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 5, this.larguraAreaGrafico * (parseFloat(dados.superior_incompleto.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 6, this.larguraAreaGrafico * (parseFloat(dados.superior_completo.replace(',', '.')) / 100), barWidth);        
        this.context.fillRect(this.xZero, start + (barWidth + entreBarras) * 7, this.larguraAreaGrafico * (parseFloat(dados.pos_graduacao.replace(',', '.')) / 100), barWidth);        
    }

    private drawLegenda(dados: Dados) {
        const regiao = this.getRegiao(dados.codigo);
        const barWidth = 49;
        const entreBarras = 45;
        const start = this.marginTop + this.settings.fontSize * 0.75 + 18;

        this.context.font = this.settings.fontSize * 0.9 + 'px ' + this.settings.fontFamily;
        this.context.fillStyle = this.settings.fontColor;
        
        this.context.fillText(this.format(dados.nao_alfabetizado),       this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.nao_alfabetizado.replace(',', '.')) / 100),         12 + start + (barWidth + entreBarras) * 0);
        this.context.fillText(this.format(dados.fundamental_incompleto), this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.fundamental_incompleto.replace(',', '.')) / 100),   12 + start + (barWidth + entreBarras) * 1);        
        this.context.fillText(this.format(dados.fundamental_completo),   this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.fundamental_completo.replace(',', '.')) / 100),     12 + start + (barWidth + entreBarras) * 2);        
        this.context.fillText(this.format(dados.medio_incompleto),       this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.medio_incompleto.replace(',', '.')) / 100),         12 + start + (barWidth + entreBarras) * 3);        
        this.context.fillText(this.format(dados.medio_completo),         this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.medio_completo.replace(',', '.')) / 100),           12 + start + (barWidth + entreBarras) * 4);        
        this.context.fillText(this.format(dados.superior_incompleto),    this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.superior_incompleto.replace(',', '.')) / 100),      12 + start + (barWidth + entreBarras) * 5);        
        this.context.fillText(this.format(dados.superior_completo),      this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.superior_completo.replace(',', '.')) / 100),        12 + start + (barWidth + entreBarras) * 6);        
        this.context.fillText(this.format(dados.pos_graduacao),          this.xZero + 10 + this.larguraAreaGrafico * (parseFloat(dados.pos_graduacao.replace(',', '.')) / 100),            12 + start + (barWidth + entreBarras) * 7);        
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

    private format(value: string) {
        return value.indexOf(',') === -1 ?  value + ',0' : value
    }
}