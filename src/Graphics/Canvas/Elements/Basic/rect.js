import ZikoCanvasElement from "../Element.js";
class CanvasRect extends ZikoCanvasElement{
    constructor(x,y,w,h){
        super(x,y);
        this.w=w;
        this.h=h;
        this.path=new Path2D();
    }
    draw(ctx){
        if(this.cache.config.rendered){
            ctx.save();
            this.applyNormalStyle(ctx);
            ctx.beginPath();
            this.path.rect(this._x, this._y,this.w,this.h);
            const{strokeEnabled,fillEnabled}=this.cache.style.normal;
            if(strokeEnabled)ctx.stroke(this.path);
            if(fillEnabled)ctx.fill(this.path);
            ctx.closePath(); 
            ctx.restore();
        }
        return this;   
    }
    width(w){
        this.w=w;
        if(this.parent)this.parent.draw();
        return this;
    }
    height(h){
        this.h=h;
        if(this.parent)this.parent.draw();
        return this;
    }
    // distanceFromCenter(x,y){
    //     return Math.sqrt(
    //         (this.position.x-x)**2-(this.position.y-y)**2
    //     )
    // }
    // isIn(x,y,strict=false){
    //     return strict?this.distanceFromCenter(x,y)<this.r:this.distanceFromCenter(x,y)<=this.r;
    // }
    // isInEdges(x,y){
    //     return this.distanceFromCenter(x,y)===this.r;
    // }
}
const canvasRect=(x,y,w,h)=>new CanvasRect(x,y,w,h)
export{canvasRect}