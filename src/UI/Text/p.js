import ZikoUIElement from "../ZikoUIElement.js";
import {Complex} from "../../Math/Complex/index.js"
import { text } from "./text.js";
import ALL_UI_ELEMENTS from "../all.js";
class ZikoUIParagraphe extends ZikoUIElement {
    constructor(...value) {
      super();
      this.element = document.createElement("p");
      this.addValue(...value);
      this.style({margin:0,padding:0});
      this.render();
    }
    addValue(...value) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] == "string" || typeof value[i] == "number") {
          this.element.appendChild(document.createTextNode(value[i]));
          this.element.appendChild(document.createElement("br"));
        } else if (value[i] instanceof ZikoUIElement)
          this.element.appendChild(value[i].element);
        else if (value[i] instanceof Complex)
          text(value.a + " + " + value.b + "i");
      }
      return this;
    }
    clear() {
      this.element.childNodes.forEach((e) => e.remove());
      return this;
    }
    setValue(...value) {
      this.clear();
      this.addValue(...value);
      return this;
    }
  }
  const p = (...ZikoUIElement) => {
    const UI=new ZikoUIParagraphe().append(...ZikoUIElement);
    ALL_UI_ELEMENTS.p.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.p.length;  
    return UI
   }
  export {p}
