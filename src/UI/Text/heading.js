import ZikoUIElement from "../ZikoUIElement.js";
import ALL_UI_ELEMENTS from "../all.js";
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
    ALL_UI_ELEMENTS.h1.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
  const h2 = (text = "") => {
    const UI=new ZikoUIHeading(2, text)
    ALL_UI_ELEMENTS.h2.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
  const h3 = (text = "") => {
    const UI=new ZikoUIHeading(3, text)
    ALL_UI_ELEMENTS.h3.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
  const h4 = (text = "") => {
    const UI=new ZikoUIHeading(4, text)
    ALL_UI_ELEMENTS.h4.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
  const h5 = (text = "") => {
    const UI=new ZikoUIHeading(5, text)
    ALL_UI_ELEMENTS.h5.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
   const h6 = (text = "") => {
    const UI=new ZikoUIHeading(6, text)
    ALL_UI_ELEMENTS.h6.push(UI)
    UI.cache.order=ALL_UI_ELEMENTS.text.length;  
    return UI
   }
  export{h1,h2,h3,h4,h5,h6}