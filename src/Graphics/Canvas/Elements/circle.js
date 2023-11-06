import ZikoCanvasElement from "./_element.js";
class CanvasCircle extends ZikoCanvasElement{
    constructor(x,y,r){
        super(x,y);
        this.r=r;
        this.path=new Path2D();
    }
    draw(ctx){
        if(this.cache.config.rendered){
            ctx.save();
            this.applyNormalStyle(ctx);
            ctx.beginPath();
            this.path.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
            const{strokeEnabled,fillEnabled}=this.cache.style.normal;
            if(strokeEnabled)ctx.stroke(this.path);
            if(fillEnabled)ctx.fill(this.path);
            ctx.closePath(); 
            ctx.restore();
        }
        return this;   
    }
    radius(r){
        this.r=r;
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
const canvasCircle=(x,y,r)=>new CanvasCircle(x,y,r)
export{canvasCircle}