import ZikoSvgElement from "./ZikoSvgElement.js";
class ZikoSvgEllipse extends ZikoSvgElement{
    constructor(cx,cy,rx,ry){
      super("ellipse")
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "ellipse",
      );
      this.pos(cx,cy).setRx(rx).setRy(ry);
    }
   //  setCx(cx){
   //     this.element.cx.baseVal.value=cx;
   //     return this;
   //  }
   //  setCy(cy){
   //     this.element.cy.baseVal.value=cy;
   //     return this;
   //  }
    setRx(rx){
       this.element.rx.baseVal.value=rx;
       return this;
    } 
    setRy(ry){
       this.element.ry.baseVal.value=ry;
       return this;
    } 
  } 
const svgEllipse=(x,y,rx,ry)=>new ZikoSvgEllipse(x,y,rx,ry);
export default svgEllipse