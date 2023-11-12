import ZikoUISvgElement from "./_SvgElement.js";
class ZikoUISvgEllipse extends ZikoUISvgElement{
    constructor(cx,cy,rx,ry){
      super()
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse",
      );
      this.cx(cx).cy(cy).rx(rx).ry(ry);
    }
    cx(cx){
       this.element.cx.baseVal.value=cx;
       return this;
    }
    cy(cy){
       this.element.cy.baseVal.value=cy;
       return this;
    }
    rx(rx){
       this.element.rx.baseVal.value=rx;
       return this;
    } 
    ry(ry){
       this.element.ry.baseVal.value=ry;
       return this;
    } 
  } 
const svgEllipse=(x,y,rx,ry)=>new ZikoUISvgEllipse(x,y,rx,ry);
export default svgEllipse