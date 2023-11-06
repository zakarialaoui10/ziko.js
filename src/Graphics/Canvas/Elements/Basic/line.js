import ZikoCanvasElement from "../Element.js";
class CanvasLine extends ZikoCanvasElement{
    constructor(x0,y0,x1,y1){
        super();
        this.x0=x0;
        this.x1=x1;
        this.y0=y0;
        this.y1=y1;
        delete this.fill;
    }
    draw(ctx){
        if(this.cache.config.rendered){
            ctx.save();
            this.applyNormalStyle(ctx);
            ctx.beginPath();
            ctx.moveTo(this.x0,this.y0);
            ctx.lineTo(this.x1,this.y1);
            ctx.stroke();
            if(this.cache.style.normal.strokeEnabled)ctx.stroke();
            ctx.restore();
        }
        return this;   
    }
}
const canvasLine=(x0,y0,x1,y1)=>new CanvasLine(x0,y0,x1,y1)
export{canvasLine}