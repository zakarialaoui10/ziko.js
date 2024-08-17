import ZikoUIElement from "../ZikoUIElement.js";
import ZikoUIContainerElement from "../ZikoUIContainerElement.js";
class ZikoUIHtmlTag extends ZikoUIContainerElement {
  constructor(element) {
    super(element,"html");
  }
}
class ZikoUIBtn extends ZikoUIElement {
  constructor(value = "button") {
    super("button","btn");
    this.element = document.createElement("button");
    this.setValue(value);
    this.st.cursor("pointer");
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
class ZikoUIBr extends ZikoUIElement {
    constructor() {
      super("br","br");
          // delete this.append
    }
  }
  class ZikoUIHr extends ZikoUIElement {
    constructor() {
      super("hr","hr");
          // delete this.append
    }
  }
  class ZikoUILink extends ZikoUIContainerElement{
    constructor(href){
      super("a","link");
      this.setHref(href);
    }
    setHref(href){
      this.element.href=href;
    }
  }
  const br = () => new ZikoUIBr();
  const hr = () => new ZikoUIHr();
  const brs = (n=1)=> new Array(n).fill(new ZikoUIBr());
  const hrs = (n=1)=> new Array(n).fill(new ZikoUIHr());
  const link=(href,...UIElement)=>new ZikoUILink(href).append(...UIElement);
  const html=(tag,...UIElement)=>new ZikoUIHtmlTag(tag).append(...UIElement);
  const btn = (value) => new ZikoUIBtn(value);
export{
  html,
  btn,
  br,
  hr,
  brs,
  hrs,
  link,
  ZikoUIHtmlTag,
  ZikoUIBr,
  ZikoUIHr,
  ZikoUILink
}
