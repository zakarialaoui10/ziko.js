import ZikoUIElement from "../../UI/ZikoUIElement.js";
class ZikoUICanvas extends ZikoUIElement{
    constructor(w,h){
        super();
        this.element=document.createElement("canvas");
        this.ctx = this.element.getContext("2d");
        this.style({
            border:"1px red solid"
        })
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
        this.items.forEach((element) => element.call(this));
        return this;
    }
    append(element){
        this.items.push(element);
        return this;
    }
    background(){

    }
    clear(){
        this.ctx.clearRect(0, 0, this.Width, this.Height);
        return this;
    }
}

const Canvas=(w,h)=>new ZikoUICanvas(w,h);
export default Canvas;