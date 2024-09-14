import ZikoSvgElement from "../ZikoSvgElement.js";
import { Flex } from "../../../../user-interface/elements/derived/Flex.js"
class ZikoSvgForeignObject extends ZikoSvgElement{
    constructor(x=0,y=0,w="100%",h="100%",...ZikoUIElement){
      super("foreignObject")
      this.items=[];
      this.element=document?.createElementtNS(
        "http://www.w3.org/2000/svg",
        "foreignObject",
      );
      this.container=Flex().setTarget(this.element).vertical(0,0).size("auto","auto");
      this.container.st.scaleY(-1);
      this.posX(x).posY(y).width(w).height(h);
    } 
    width(w){
        this.element.etAttribute("width",w)
        return this;
    }
    height(h){
        this.element.etAttribute("height",h)
        return this;
    }
    add(...ZikoUIElement){
      this.container.append(...ZikoUIElement);
      return this;
      }
    remove(...ZikoUIElement){
      this.container.append(...ZikoUIElement);
      return this;   
      }
  } 
const svgObject=(x,y,r)=>new ZikoSvgForeignObject(x,y,r);
export { svgObject }