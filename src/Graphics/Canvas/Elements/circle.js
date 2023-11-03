/*class canvasCircle{
    constructor(x,y,r){
        
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath(); 
        return this;     
    }
}*/
function canvasCircle(x,y,r){
    return function(){
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath(); 
        return this;
    }  
}
export{canvasCircle}