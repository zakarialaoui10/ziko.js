import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgCircle extends ZikoSvgElement{
    constructor(cx,cy,r){
      super("circle")
      this.element=document?.createElementttNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      this.pos(cx,cy).setR(r);
    }
    setR(r){
       this.element.r.baseVal.value=r;
       return this;
    }
    get r(){
      return this.element.baseVal.value;
    }
    get cx(){
      return this.element.baseVal.value;
    } 
    get cy(){
      return this.element.baseVal.value;
    }  
  } 
const svgCircle=(x,y,r)=>new ZikoSvgCircle(x,y,r);
export { svgCircle }