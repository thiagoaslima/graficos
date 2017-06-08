interface AreaSettings {
    largura: number
    altura?: number
    padding: {
        top: number
        right: number
        bottom: number
        left: number
    }
}

interface GraficoSettings {
    geral: {
        largura: number
        altura: number
        padding?: {
            top: number
            right: number
            bottom: number
            left: number
        }
    }
    eixoX: {
        largura?: number
        altura?: number
        padding?: {
            top: number
            right: number
            bottom: number
            left: number
        }
        texto: string[]
    }
    eixoY: {
        largura?: number
        altura?: number
        padding?: {
            top: number
            right: number
            bottom: number
            left: number
        }
        texto: string[][]
    }
    font: {
        size: number
        family: string
        
    }
}

export class Grafico {
    /** configuracao geral **/
    private geral: AreaSettings = {
        altura: 0,
        largura: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }

    /** configuracao eixo y **/
    private areaY: AreaSettings = {
        altura: 0,
        largura: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }

    /** configuracao eixo X **/
    private areaX: AreaSettings = {
        altura: 0,
        largura: 0,
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    }

    /** tipografia **/
    private font: {
        size: number
        family: string
        color: string
    }

    private stroke: {
        width: number,
        style: string
    }


    /** textos **/
    private textosEixoY: string[][]
    private textosEixoX: string[]


    /** DOM **/
    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D

    constructor(
        public container: HTMLElement,
        options: GraficoSettings
    ) {
        this.setSizes(Object.assign({geral: {}, eixoX: {}, eixoY: {}}, options));
    }

    private setSizes(options: GraficoSettings) {
        if (!options.geral.largura) {
            throw new Error('Largura obrigatória')
        }

        if (!options.geral.altura) {
            throw new Error('Altura obrigatória')
        }

        this.geral.altura = options.geral.altura;
        this.geral.largura = options.geral.altura;

        if (options.geral.padding) {
            Object.assign(this.geral.padding, options.geral.padding);
        }

        if (options.eixoX.largura) {
            this.areaX.largura = options.eixoX.largura;
        }
        if (options.eixoY.largura) {
            this.areaY.largura = options.eixoY.largura;
        }

        if (this.areaX.largura && !this.areaY.largura) {
            this.areaY.largura = this.geral.largura - this.areaX.largura - this.geral.padding.left - this.geral.padding.right;
        }

        if (this.areaY.largura && !this.areaX.largura) {
            this.areaX.largura = this.geral.largura - this.areaY.largura - this.geral.padding.left - this.geral.padding.right;
        }

        if (!this.areaY.largura && !this.areaX.largura) {
            this.areaY.largura = (this.geral.largura - this.geral.padding.left - this.geral.padding.right) * 0.3;
            this.areaX.largura = (this.geral.largura - this.geral.padding.left - this.geral.padding.right) * 0.7;
        }

        if (!options.eixoX.hasOwnProperty('largura') && options.eixoY.hasOwnProperty('largura')) {
            this.geral.padding.left = this.geral.padding.right = (this.geral.largura - this.areaX.largura - this.areaY.largura) / 2;
        }

        if (options.eixoX.padding) {
            Object.assign(this.areaX.padding, options.eixoX.padding)
        }
        if (options.eixoY.padding) {
            Object.assign(this.areaX.padding, options.eixoY.padding)
        }

        if (options.eixoX.hasOwnProperty('altura')) {
            this.areaX.altura = options.eixoX.altura;    
        }
        if (options.eixoY.hasOwnProperty('altura')) {
            this.areaY.altura = options.eixoY.altura;    
        }
        if (!options.eixoX.hasOwnProperty('altura') && !options.eixoY.hasOwnProperty('altura')) {
            this.areaX.altura = this.areaY.altura = this.geral.altura - this.geral.padding.top - this.geral.padding.bottom;
        }
        if (!this.areaX.altura && this.areaY.altura) {
            this.areaX.altura = this.areaY.altura
        }
        if (this.areaX.altura && !this.areaY.altura) {
            this.areaY.altura = this.areaX.altura
        }

        if (!options.geral.padding && (options.eixoX.altura || options.eixoY.altura)) {
            this.geral.padding.top = this.geral.padding.bottom = (this.geral.altura - this.areaY.altura) / 2;
        }
    }
}