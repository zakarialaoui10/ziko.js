import { __ZikoUIText__ } from "./__ZikoUIText__.js";
class ZikoUIText extends __ZikoUIText__ {
    constructor(...value) {
      super("span", "text", false, ...value);
    }
}
class ZikoUIQuote extends __ZikoUIText__ {
  constructor(...value) {
    super("q", "quote", false, ...value);
    this.style({
      fontStyle: "italic"
    })
  }
  get isQuote(){
    return true
  }
}
class ZikoUIDefintion extends __ZikoUIText__ {
  constructor(...value) {
    super("dfn", "dfnText", false, ...value);
  }
  get isDfnText(){
    return true
  }
}
class ZikoUISupText extends __ZikoUIText__ {
  constructor(sup) {
    super("sup", "supText", false, sup);
  }
  get isSupText(){
    return true
  }
}
class ZikoUISubText extends __ZikoUIText__ {
  constructor(...value) {
    super("sub", "subText", false, ...value);
  }
  get isSubText(){
    return true
  }
}
class ZikoUICodeText extends __ZikoUIText__ {
  constructor(...value) {
    super("code", "codeText", false, ...value);
  }
  get isCodeText(){
    return true
  }
}
class ZikoUIAbbrText extends __ZikoUIText__ {
  constructor(abbr, title) {
    super("abbr", "abbrText", false, abbr);
    this.setAttr("title", title);
  }
  get isAbbrText(){
    return true
  }
}
const text = (...str) => new ZikoUIText(...str);
const quote = (...str) => new ZikoUIQuote(...str);
const dfnText = (...str) => new ZikoUIDefintion(...str);
const supText = (...str) => new ZikoUISupText(...str);
const subText = (...str) => new ZikoUISubText(...str);
const codeText = (...str) => new ZikoUICodeText(...str);
const abbrText = (abbr, title) => new ZikoUIAbbrText(abbr, title); 
export {
  ZikoUIText,
  ZikoUIQuote,
  ZikoUIDefintion,
  ZikoUISupText,
  ZikoUISubText,
  ZikoUICodeText,
  ZikoUIAbbrText,
  text,
  quote,
  dfnText,
  supText,
  subText,
  codeText,
  abbrText
}