export default class Stage {
    constructor (id, w, h) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.touchAction = 'none';
        this.width = w;
        this.height = h;
        this.speed = 1;
        this.dpr = (window.devicePixelRatio || 1) / (this.ctx.backingStorePixelRatio || 1);
        this.naturalWidth = this.width * this.dpr;
        this.naturalHeight = this.height * this.dpr;
        if (this.width !== this.naturalWidth) {
            this.canvas.width = this.naturalWidth;
            this.canvas.height = this.naturalHeight;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
        }
    }
}
