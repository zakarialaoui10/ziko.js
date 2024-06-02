import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgPath extends ZikoSvgElement{
    constructor(){
    super()
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      this.path="";
      
    }
    setPath(){
        this.element.setAttribute("d",this.path);
        return this;
    }
    clear(){
        this.path="";
        this.setPath();
        return this;
    }
    moveTo(x,y){
        this.path+=`M${x} ${y} `;
        this.setPath();
        return this;
    }
    lineTo(x,y){
        this.path+=`L${x} ${y} `;
        this.setPath();
        return this;
    }
    hr(x){
        this.path+=`H${x} `;
        this.setPath();
        return this;
    }
    vr(y){
        this.path+=`V${y} `;
        this.setPath();
        return this;
    }
    bezier(x1,y1,x2,y2,x,y){
        this.path+=`C ${x1} ${y1},${x2} ${y2},${x} ${y} `;
        this.setPath();
        return this;      
    }
    quadratic(x1,y1,x,y){
        this.path+=`Q ${x1} ${y1} ${x} ${y} `;
        this.setPath();
        return this;      
    }
    close(){
        this.path+="Z";
        this.setPath();
        return this;
    }
}

const svgPath=()=>new ZikoSvgPath();
export{ svgPath }