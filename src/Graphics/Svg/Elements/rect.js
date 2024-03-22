
import ZikoSvgELement from "./ZikoSvgElement.js";
class ZikoSvgRectangle extends ZikoSvgELement{
    constructor(x,y,w,h,center=true){
      super()
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      this.setX(x).setY(y).width(w).height(h);
      this.rx=this.x+this.w/2;
      this.ty=this.y+this.h/2;
    }
    setX(x){
       this.element.x.baseVal.value=x;
       this.x=x;
       return this;
    }
    setY(y){
       this.element.y.baseVal.value=y;
       this.y=y;
       return this;
    }
    r(rx,ry){
      this.rx=rx;
      this.ry=ry;
      this.setX(this.rx-this.w/2);
      this.setY(this.ry-this.h/2);
      return this;
    } 
    width(w){
       this.element.width.baseVal.value=w;
       this.w=w;
       return this;
    } 
    height(h){
       this.element.height.baseVal.value=h;
       this.h=h;
       return this;
    } 
  } 
  const svgRect=(x,y,w,h,center)=>new ZikoSvgRectangle(x,y,w,h,center);
  export default svgRect