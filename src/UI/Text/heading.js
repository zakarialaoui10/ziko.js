import ZikoUIElement from "../ZikoUIElement.js";
import { __UI__ } from "../../App";
class ZikoUIHeading extends ZikoUIElement {
    constructor(type = 1, value = "") {
      super();
      this.element = document.createElement("h" + type);
      this.element.textContent = value;
      this.render();
    }
    get value() {
      return this.element.innerText;
    }
    setValue(text = "") {
      this.element.innerText = text;
      return;
    }
    addValue(text = "") {
      this.element.innerText += text;
      return this;
    }
  }
  const h1 = (text = "") => {
    const UI=new ZikoUIHeading(1, text)
    __UI__.h1.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
  const h2 = (text = "") => {
    const UI=new ZikoUIHeading(2, text)
    __UI__.h2.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
  const h3 = (text = "") => {
    const UI=new ZikoUIHeading(3, text)
    __UI__.h3.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
  const h4 = (text = "") => {
    const UI=new ZikoUIHeading(4, text)
    __UI__.h4.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
  const h5 = (text = "") => {
    const UI=new ZikoUIHeading(5, text)
    __UI__.h5.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
   const h6 = (text = "") => {
    const UI=new ZikoUIHeading(6, text)
    __UI__.h6.push(UI)
    UI.cache.order=__UI__.text.length;  
    return UI
   }
  export{h1,h2,h3,h4,h5,h6}