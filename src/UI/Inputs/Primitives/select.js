import ZikoUIElement from "../../ZikoUIElement.js";
import { ZikoUIInputOption } from "./elements.js";
class ZikoUISelect extends ZikoUIElement {
    constructor(){
      super();
      this.element=document.createElement("select");
    }
    addOptions(...options) {
      options.map(n => this.append(new ZikoUIInputOption(n)));
      return this;
    }
    get isSelect(){
      return true;
    }
  }
const select=()=>new ZikoUISelect()
export{select,ZikoUISelect}