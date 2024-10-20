import ZikoCanvasElement from "../element.js";
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
            ctx.moveTo(this.x0+this._x,this.y0+this._y_);
            ctx.lineTo(this.x1+this._x,this.y1+this._y);
            ctx.stroke();
            if(this.cache.style.normal.strokeEnabled)ctx.stroke();
            ctx.restore();
        }
        return this;   
    }
}
const canvasLine=(x0,y0,x1,y1)=>new CanvasLine(x0,y0,x1,y1)
export{canvasLine}