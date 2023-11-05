class ZikoCanvasElement{
    constructor(x,y){
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
    draw(){

    }
    posX(x){
        this.position.x=x;
        return this;
    }
    posY(y){
        this.position.y=y;
        return this;
    }
    color({stroke=this.cache.style.normal.strokeColor,fill=this.cache.style.normal.fillColor}={stroke,fill}){
        this.cache.style.normal.strokeColor=stroke;
        this.cache.style.normal.fillColor=fill;
        return this;
    }
    translate(dx,dy){
        this.pos(this.position.x+dx,this.position.y+dy);
        return;
    }
    stroke(color){

    }
    fill(color){

    }
}
export default ZikoCanvasElement;