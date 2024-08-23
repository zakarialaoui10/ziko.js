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
}
class ZikoUIDefintion extends __ZikoUIText__ {
  constructor(...value) {
    super("dfn", "dfnText", false, ...value);
  }
}
class ZikoUISupText extends __ZikoUIText__ {
  constructor(sup) {
    super("sup", "supText", false, sup);
  }
}
class ZikoUISubText extends __ZikoUIText__ {
  constructor(...value) {
    super("sub", "subText", false, ...value);
  }
}
class ZikoUICodeText extends __ZikoUIText__ {
  constructor(...value) {
    super("code", "codeText", false, ...value);
  }
}
class ZikoUIAbbrText extends __ZikoUIText__ {
  constructor(abbr, title) {
    super("abbr", "abbrText", false, abbr);
    this.setAttr("title", title);
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