import ZikoCanvasElement from "./_element.js";
class CanvasCircle extends ZikoCanvasElement{
    constructor(x,y,r){
        super(x,y);
        this.r=r;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath(); 
        return this;   
    }
    posX(x){
        this.position.x=x;
        return this;
    }
    posY(y){
        this.position.y=y;
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