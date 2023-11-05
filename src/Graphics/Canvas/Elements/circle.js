import ZikoCanvasElement from "./_element.js";
import { Random } from "../../../Math/Random/index.js";
class CanvasCircle extends ZikoCanvasElement{
    constructor(x,y,r){
        super(x,y);
        this.r=r;
    }
    draw(ctx){
        ctx.save();
        ctx.strokeStyle=this.cache.style.normal.strokeColor
        ctx.fillStyle=this.cache.style.normal.fillColor
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
        if(this.cache.style.normal.strokeEnabled)ctx.stroke();
        if(this.cache.style.normal.fillEnabled)ctx.fill();
        ctx.closePath(); 
        ctx.restore();
        return this;   
    }
    radius(r){
        this.r=r;
        return this;
    }
}
const canvasCircle=(x,y,r)=>new CanvasCircle(x,y,r)
// function canvasCircle(x,y,r){
//     return function(){
//         this.ctx.beginPath();
//         this.ctx.arc(x, y, r, 0, Math.PI * 2);
//         this.ctx.fill();
//         this.ctx.closePath(); 
//         return this;
//     }  
// }
export{canvasCircle}