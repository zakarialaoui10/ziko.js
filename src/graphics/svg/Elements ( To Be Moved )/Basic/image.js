import ZikoSvgElement from "../ziko-svg-element.js";
class ZikoSvgImage extends ZikoSvgElement{
    constructor(src="",w="100%",h="100%",x=0,y=0){
      super()
      this.element=document?.createElementNS(
        "http://www.w3.org/2000/svg",
        "image",
      );
      this.setSrc(src).width(w).height(h).x(x).y(y);
    }
    x(x){
       this.element.x.baseVal.value=x;
       return this;
    }
    y(y){
       this.element.y.baseVal.value=y;
       return this;
    }
    width(w){
       this.element?.setAttribute("width",w);
       return this;
    }
    height(h){
       this.element?.setAttribute("height",h);
       return this;
    }
    setSrc(src=""){
      this.element?.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src)
      return this;
    }
  } 
const svgImage=(src,w,h,x,y)=>new ZikoSvgImage(src,w,h,x,y);
export { 
  svgImage,
  ZikoSvgImage
 }