import ZikoUISvgElement from "./_SvgElement.js";
import {ZikoUISvg} from "../index.js"
class ZikoUISvgGrpupe extends ZikoUISvgElement{
    constructor(...svgElement){
      super();
      this.items=[];
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g",
      );
      this.add(...svgElement)
    }
    add(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element.appendChild(svgElement[i].element);
        this.items.push(svgElement[i])
      }
      if(svgElement.length===1)return svgElement[0]
      return svgElement;
    }
    remove(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element.removeChild(svgElement[i].element);
        this.items=this.items.filter(n=>!svgElement)
      }
      return this;     
    }
}
// ZikoUISvgGrpupe.prototype.addd=(...svgElement)=>ZikoUISvg.prototype.add.apply(ZikoUISvgGrpupe,...svgElement)
// ZikoUISvgGrpupe.prototype.remove=(...svgElement)=>ZikoUISvg.prototype.remove(...svgElement).bind(this)
export default svgGroupe=(...svgElement)=>new ZikoUISvgGrpupe(...svgElement)
