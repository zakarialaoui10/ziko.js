import { __ZikoUIText__ } from "./__ZikoUIText__.js";
class ZikoUIParagraphe extends __ZikoUIText__ {
    constructor(...value) {
      super("p", "p", true, ...value);
    }
    get isPara(){
      return true;
    }
}
class ZikoUIBlockQuote extends __ZikoUIText__ {
    constructor(cite,quote) {
      super("blockquote", "blockquote", true, quote);
      this.setAttr("cite", cite);
    }
    get isBlockQuote(){
      return true;
    }
}
const p = (...ZikoUIElement) => new ZikoUIParagraphe(...ZikoUIElement);
const blockQuote = (cite, quote) => new ZikoUIBlockQuote(cite, quote);
export {
  p,
  blockQuote,
  ZikoUIParagraphe,
  ZikoUIBlockQuote
}
