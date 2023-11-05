class ZikoCanvasElement{
    constructor(x,y){
        this.parent=null;
        this.position={
            x,
            y
        }
        this.cache={
            config:{
                draggable:false,
                selected:false,
                highlighted:false,
            },
            style:{
                normal:{
                    strokeEnabled:true,
                    fillEnabled:false,
                    strokeColor:"#111111",
                    fillColor:"#777777",
                },
                highlighted:{
                    strokeEnabled:true,
                    fillEnabled:false,
                    strokeColor:null,
                    fillColor:null,
                }
            },
        }
        this.history={
            position:[],
            styles:[]
        }
    }
    isIntersectedWith(){

    }
    isPointInside(x,y){

    }
    posX(x){
        this.position.x=x;
        if(this.parent)this.parent.draw()
        return this;
    }
    posY(y){
        this.position.y=y;
        if(this.parent)this.parent.draw()
        return this;
    }
    color({stroke=this.cache.style.normal.strokeColor,fill=this.cache.style.normal.fillColor}={stroke,fill}){
        this.cache.style.normal.strokeColor=stroke;
        this.cache.style.normal.fillColor=fill;
        if(this.parent)this.parent.draw()
        return this;
    }
    translate(dx=0,dy=0){
        this.position.x+=dx;
        this.position.y+=dy;
        if(this.parent)this.parent.draw();
        return;
    }
    applyNormalStyle(ctx){
        ctx.strokeStyle=this.cache.style.normal.strokeColor;
        ctx.fillStyle=this.cache.style.normal.fillColor;
        return this;   
    }
    applyHighlightedStyle(ctx){
        ctx.strokeStyle=this.cache.style.highlighted.strokeColor;
        ctx.fillStyle=this.cache.style.highlighted.fillColor;
        return this;
    }
    stroke(color){

    }
    fill(color){

    }
}
export default ZikoCanvasElement;