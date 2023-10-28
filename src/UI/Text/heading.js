import ZikoUIElement from "../ZikoUIElement.js";
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
  const h1 = (text = "text") => new ZikoUIHeading(1, text);
  const h2 = (text = "text") => new ZikoUIHeading(2, text);
  const h3 = (text = "text") => new ZikoUIHeading(3, text);
  const h4 = (text = "text") => new ZikoUIHeading(4, text);
  const h5 = (text = "text") => new ZikoUIHeading(5, text);
  const h6 = (text = "text") => new ZikoUIHeading(6, text);
  export{h1,h2,h3,h4,h5,h6}