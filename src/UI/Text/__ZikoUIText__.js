import ZikoUIElement from "../ZikoUIElement.js";
import ZikoContainerElement from "../ZikoUIContainerElement.js";
import { 
  ZikoUISubText,
  ZikoUISupText
 } from "./text.js";
import {Complex} from "../../Math/Complex/index.js"
import { Matrix } from "../../Math/index.js";
import { arr2str, obj2str } from "../../Data/index.js";
class __ZikoUIText__ extends ZikoContainerElement {
    constructor(tag, name, lineBreak,...value) {
      super(tag, name);
      this.addValue(...value);
      this.style({margin:0,padding:0});
      Object.assign(this.cache,{
        lineBreak,
      })
    }
    get isText(){
      return true;
    }
    get value(){
      return this.element.textContent;
    }
    clear() {
      this.element.childNodes.forEach((e) => e.remove());
      this.element.textContent = "";
      return this;
    }
    addValue(...value) {
      value.forEach((item,i) => {
        if (typeof item === "string" || typeof item === "number") this.element.appendChild(document.createTextNode(item))
        else if (item instanceof ZikoUIElement) this.element.appendChild(item.element)
        else if (item instanceof Complex || item instanceof Matrix) this.element.appendChild(new Text(item.toString()))
        else if (item instanceof Array) this.element.appendChild(new Text(arr2str(item)))
        else if (item instanceof Object) this.element.appendChild(new Text(obj2str(item)))
        
        // if(
        //   (item !== value[value.length - 1]) 
        //   && !(value[i+1] instanceof ZikoUIElement)
        //   && !(value[i-1] instanceof ZikoUIElement)
        // ) this.element.appendChild(new Text(" "))
        
        if(this.cache.lineBreak)this.element.appendChild(document.createElement("br"))
      })
      this.element.innerHTML = this.element.innerHTML
        .replace(/\n/g, '<br>')
        .replace(/(?<!<[^>]+) /g, '&nbsp;')
      return this
    }
    setValue(...value) {
      this.clear();
      this.addValue(...value);
      return this;
    }
  }
class __ZikoUIInlineText__ extends __ZikoUIText__{
  constructor(tag, name,...value){
    super(tag, name, ...value)
    this.cache.breakLine=false;
  }
}
  export {
    __ZikoUIText__,
    __ZikoUIInlineText__
  }
