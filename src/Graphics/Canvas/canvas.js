import ZikoUIElement from "../../UI/ZikoUIElement.js";
import {Matrix} from "../../Math/Matrix/index.js"
class ZikoUICanvas extends ZikoUIElement{
    constructor(w,h){
        super();
        this.element=document.createElement("canvas");
        this.ctx = this.element.getContext("2d");
        this.style({
            border:"1px red solid",
            //width:"300px",
            //height:"300px"
        })
        this.transformMatrix=new Matrix([
            [1,0,0],
            [0,1,0],
            [0,0,1]
        ])
        this.axisMatrix=new Matrix([
            [-10,-10],
            [10,10]
        ])
        this.render();
    }
    get Width(){
        return this.element.width;
    }
    get Height(){
        return this.element.height;
    }
    draw(){
        this.clear();  
        this.items.forEach(element => {
            element.parent=this;
            element.draw(this.ctx)
        });
        return this;
    }
    #applyTransformMatrix(){
        this.ctx.setTransform(
            this.transformMatrix[0][0],
            this.transformMatrix[1][0],
            this.transformMatrix[0][1],
            this.transformMatrix[1][1],
            this.transformMatrix[0][2],
            this.transformMatrix[1][2],
        );
        return this;
    }
    size(w,h){
        this.style({
            width:w,
            height:h
        })
        //this.lineWidth();
        this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
        return this;
    }
    adjust(){
        this.element.width=this.element.getBoundingClientRect().width;
        this.element.height=this.element.getBoundingClientRect().height;
        this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
        return this;
    }
    view(xMin,yMin,xMax,yMax){
        this.transformMatrix[0][0]=this.Width/(xMax-xMin); // scaleX
        this.transformMatrix[1][1]=-this.Height/(yMax-yMin); // scaleY
        this.transformMatrix[0][2]=this.Width/2;
        this.transformMatrix[1][2]=this.Height/2;
        this.axisMatrix=new Matrix([
            [xMin,yMin],
            [xMax,yMax]
        ])
        
        this.#applyTransformMatrix(); 
        this.clear();
        this.lineWidth(1);
        this.draw();
        return this;
    }
    reset(){
        this.ctx.setTransform(1,0,0,0,0,0);
        return this;
    }
    append(element){
        this.items.push(element);
        this.draw();
        return this;
    }
    background(color){
        this.ctx.fillStyle = color;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.fillRect(0, 0, this.Width, this.Height);
        this.#applyTransformMatrix();
        this.draw();
    }
    lineWidth(w){
        this.ctx.lineWidth=w/this.transformMatrix[0][0];;
        return this
    }
    clear(){
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.Width, this.Height);
        this.#applyTransformMatrix(); 
        return this;
    }
    zoomIn(){

    }
    zoomOut(){
        
    }
    undo(n){

    }
    redo(n){

    }
    stream(){

    }
}

const Canvas=(w,h)=>new ZikoUICanvas(w,h);
export default Canvas;