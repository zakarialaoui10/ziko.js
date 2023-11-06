class ZikoCanvasElement{
    constructor(x,y){
        this.parent=null;
        this.position={
            x,
            y
        }
        this.cache={
            interact:" avoid redraw",
            config:{
                draggable:false,
                selected:false,
                highlighted:false,
                rendered:false
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
        this.render();
    }
    isIntersectedWith(){

    }
    isInStroke(x,y){
        let is;
        if(this.parent){
            this.parent.ctx.setTransform(1,0,0,1,0,0);
            is=this.parent.ctx.isPointInStroke(this.path,x,y);
            this.parent.applyTransformMatrix();
        }
        return is;
    }
    isInPath(x,y){
        let is;
        if(this.parent){
            this.parent.ctx.setTransform(1,0,0,1,0,0);
            is=this.parent.ctx.isPointInPath(this.path,x,y);
            this.parent.applyTransformMatrix();
        }
        return is;
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
    stroke(state=true){
        this.cache.style.normal.strokeEnabled=state;
        if(this.parent)this.parent.draw();
        return this  
    }
    fill(state=true){
        this.cache.style.normal.fillEnabled=state;
        if(this.parent)this.parent.draw();
        return this      
    }
    render(render=true){
       this.cache.config.rendered=render;
       return this;       
    }
}
export default ZikoCanvasElement;