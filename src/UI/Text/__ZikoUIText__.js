import ZikoUIElement from "../ZikoUIElement.js";
import ZikoContainerElement from "../ZikoUIContainerElement.js";
import {Complex} from "../../Math/Complex/index.js"
import { Matrix } from "../../Math/index.js";
import { arr2str, obj2str } from "../../Data/index.js";
class __ZikoUIText__ extends ZikoContainerElement {
    constructor(tag, name, lineBreak,...value) {
      super(tag, name);
      this.addValue(...value);
      this.style({margin:0,padding:0});
      Object.assign(this.cache,{
        lineBreak
      })
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
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] == "string" || typeof value[i] == "number") this.element.appendChild(document.createTextNode(value[i]));
        else if(value[i] instanceof ZikoUIElement) this.element.appendChild(value[i].element);
        else if(value[i] instanceof Complex || value[i] instanceof Matrix) this.element.appendChild(value[i].toString())
        else if(value[i] instanceof Array) this.element.appendChild(new Text(arr2str(value[i])));
        else if(value[i] instanceof Object) this.element.appendChild(new Text(obj2str(value[i])));
        // .replace(/ /g, '&nbsp;');
        this.element.appendChild(new Text(" "));
        if(this.cache.lineBreak)this.element.appendChild(document.createElement("br"));
      }
      this.element.innerHTML = this.element.innerHTML.replace(/\n/g, '<br>')
      return this;
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
