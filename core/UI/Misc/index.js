import ZikoUIElement from "../ZikoUIElement.js";
class ZikoUIHtmlTag extends ZikoUIElement {
  constructor(element) {
    super(element,"ZikoHtml");
      this.render();
  }
}
class ZikoUIBr extends ZikoUIElement {
    constructor() {
      super("br","br");
        this.render();
        delete this.append
    }
  }
  class ZikoUIHr extends ZikoUIElement {
    constructor() {
      super("hr","hr");
        this.render();
        delete this.append
    }
  }
  class ZikoUILink extends ZikoUIElement{
    constructor(href){
      super("a","link");
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
  const ZikoHtml=(tag,...UIElement)=>new ZikoUIHtmlTag(tag).append(...UIElement);
export{
  ZikoHtml,
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
