import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgText extends ZikoSvgElement{
    constructor(text,x,y){
      super()
      this.element=document?.createElementNS(
        "http://www.w3.org/2000/svg",
        "text",
      );
      this.setText(text)
      this.x(x).y(y);
    }
    x(x){
       this.element?.setAttribute("x",x);
       return this;
    }
    y(y){
       this.element?.setAttribute("y",y);
       return this;
    }
    setText(text=""){
      this.element.textContent=text;
      return this;
    }
  } 
const svgText=(text,x,y)=>new ZikoSvgText(text,x,y);
export{ svgText }