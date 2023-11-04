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
                    stroke:null,
                    fill:null,
                },
                highlighted:{
                    stroke:null,
                    fill:null
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
    pos(x,y){
        Object.assign(this.position,{x,y});
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