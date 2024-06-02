import ZikoSvgElement from "./ZikoSvgElement.js";
class ZikoSvgCircle extends ZikoSvgElement{
    constructor(cx,cy,r){
      super("circle")
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      this.pos(cx,cy).setR(r);
    }
    // setCx(cx){
    //    this.element.cx.baseVal.value=cx;
    //    return this;
    // }
    // setCy(cy){
    //    this.element.cy.baseVal.value=cy;
    //    return this;
    // }
    setR(r){
       this.element.r.baseVal.value=r;
       return this;
    }
    get r(){
      return this.element.r.baseVal.value;
    }
    get cx(){
      return this.element.cx.baseVal.value;
    } 
    get cy(){
      return this.element.cy.baseVal.value;
    }  
  } 
const svgCircle=(x,y,r)=>new ZikoSvgCircle(x,y,r);
export default svgCircle