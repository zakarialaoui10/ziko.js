import ZikoUIElement from "../ZikoUIElement.js";
class ZikoHtmlTag extends ZikoUIElement {
  constructor(element) {
    super();
      this.element = document.createElement(element);
      this.render();
      //delete this.append
  }
}
class ZikoUIBr extends ZikoUIElement {
    constructor() {
      super();
        this.element = document.createElement("br");
        this.render();
        delete this.append
    }
  }
  class ZikoUIHr extends ZikoUIElement {
    constructor() {
      super();
        this.element = document.createElement("hr");
        this.render();
        delete this.append
    }
  }
  class ZikoUILink extends ZikoUIElement{
    constructor(href){
      super();
      this.element = document.createElement("a");
      this.setHref(href);
      this.render();
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
  const ZikoHtml=(tag,...UIElement)=>new ZikoHtmlTag(tag).append(...UIElement);
export{
  ZikoHtml,
  br,
  hr,
  brs,
  hrs,
  link
}
