import ZikoUIElement from "../ZikoUIElement.js";
class ZikoUIBtn extends ZikoUIElement {
    constructor(value = "button") {
      super();
      this.element = document.createElement("button");
      this.setValue(value);
      this.render();
      this.cursor("pointer");
    }
    setValue(value) {
      if (value instanceof ZikoUIElement) value.setTarget(this.element);
      else {
        this.element.appendChild(document.createTextNode(""));
        this.element.childNodes[0].data = value;
      }
      return this;
    }
    get value() {
      return this.element.innerText;
    }
    toggleValues(...values) {
      values = values.map((n) => "" + n);
      let index = values.indexOf("" + this.value);
      if (index != -1 && index != values.length - 1)
        this.setValue(values[index + 1]);
      else this.setValue(values[0]);
      return this;
    }
  }
const btn = (value) => new ZikoUIBtn(value);
export{btn}