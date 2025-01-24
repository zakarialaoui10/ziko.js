import ZikoSvgElement from "../ziko-svg-element.js";
class ZikoSvgGroupe extends ZikoSvgElement{
    constructor(...svgElement){
      super();
      this.items=[];
      this.element=document?.createElementNS(
        "http://www.w3.org/2000/svg",
        "g",
      );
      this.add(...svgElement)
    }
    add(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element?.appendChild(svgElement[i].element);
        this.items.push(svgElement[i])
      }
      if(svgElement.length===1)return svgElement[0]
      return svgElement;
    }
    remove(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element?.removeChild(svgElement[i].element);
        this.items=this.items.filter(n=>n!=svgElement)
      }
      return this;     
    }
}
const svgGroupe=(...svgElement)=>new ZikoSvgGroupe(...svgElement)
export { 
  svgGroupe,
  ZikoSvgGroupe
 }
