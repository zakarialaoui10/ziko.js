import ZikoSvgElement from "./ZikoSvgElement.js";
class ZikoSvgCircle extends ZikoSvgElement{
    constructor(cx,cy,r){
      super()
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle",
      );
      this.cx(cx).cy(cy).r(r);
    }
    cx(cx){
       this.element.cx.baseVal.value=cx;
       return this;
    }
    cy(cy){
       this.element.cy.baseVal.value=cy;
       return this;
    }
    r(r){
       this.element.r.baseVal.value=r;
       return this;
    }
    get R(){
      return this.element.r.baseVal.value;
    }
    get Cx(){
      return this.element.cx.baseVal.value;
    } 
    get Cy(){
      return this.element.cy.baseVal.value;
    }  
  } 
const svgCircle=(x,y,r)=>new ZikoSvgCircle(x,y,r);
export default svgCircle