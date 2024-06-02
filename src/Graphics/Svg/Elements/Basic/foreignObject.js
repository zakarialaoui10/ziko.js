import ZikoSvgElement from "../ZikoSvgElement";
class ZikoSvgForeignObject extends ZikoSvgElement{
    constructor(x=0,y=0,w="100%",h="100%",...ZikoUIElement){
      super("foreignObject")
      this.items=[];
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "foreignObject",
      );
      this.posX(x).posY(y).width(w).height(h);
      this.add(...ZikoUIElement)
    } 
    posX(x){
        this.element.setAttribute("x",x)
        return this;
    }
    posY(y){
        this.element.setAttribute("y",y)
        return this;
    }
    width(w){
        this.element.setAttribute("width",w)
        return this;
    }
    height(h){
        this.element.setAttribute("height",h)
        return this;
    }
    add(...ZikoUIElement){
        for(let i=0;i<ZikoUIElement.length;i++){
          this.element.appendChild(ZikoUIElement[i].element);
          this.items.push(ZikoUIElement[i])
        }
        if(ZikoUIElement.length===1)return ZikoUIElement[0]
        return ZikoUIElement;
      }
    remove(...ZikoUIElement){
        for(let i=0;i<ZikoUIElement.length;i++){
          this.element.removeChild(ZikoUIElement[i].element);
          this.items=this.items.filter(n=>!ZikoUIElement)
        }
        return this;     
      }
  } 
const svgObject=(x,y,r)=>new ZikoSvgForeignObject(x,y,r);
export { svgObject }