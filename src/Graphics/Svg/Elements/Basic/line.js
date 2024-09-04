import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgLine extends ZikoSvgElement{
    constructor(x1,y1,x2,y2){
      super()
      this.element=document?.createElementtNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      this.x1(x1).y1(y1).x2(x2).y2(y2).stroke("black");
    }
    x1(x1){
       this.element.x1.baseVal.value=x1;
       return this;
    }
    y1(y1){
       this.element.y1.baseVal.value=y1;
       return this;
    }
    x2(x2){
       this.element.x2.baseVal.value=x2;
       return this;
    } 
    y2(y2){
       this.element.y2.baseVal.value=y2;
       return this;
    } 
  } 
const svgLine=(x1,y1,x2,y2)=>new ZikoSvgLine(x1,y1,x2,y2);
export{ svgLine }