import { __ZikoUIText__ } from "./__ZikoUIText__.js";
class ZikoUIText extends __ZikoUIText__ {
    constructor(...value) {
      super("span", "text", false, ...value);
    }
}
class ZikoUIQuote extends __ZikoUIText__ {
  constructor(...value) {
    super("q", "quote", false, ...value);
  }
}
class ZikoUIDefintion extends __ZikoUIText__ {
  constructor(...value) {
    super("dfn", "dfnText", false, ...value);
  }
}
class ZikoUISupText extends __ZikoUIText__ {
  constructor(...value) {
    super("sup", "supText", false, ...value);
  }
}
class ZikoUISubText extends __ZikoUIText__ {
  constructor(...value) {
    super("sub", "subText", false, ...value);
  }
}
class ZikoUIabbrText extends __ZikoUIText__ {
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
const abbrText = (abbr, title) => new ZikoUIabbrText(abbr, title); 
window.quote = quote;
window.subText = subText;
window.supText = supText;
window.abbrText = abbrText;
window.dfnText = dfnText;
export {
  ZikoUIText,
  ZikoUIQuote,
  ZikoUIDefintion,
  ZikoUISupText,
  ZikoUISubText,
  ZikoUIabbrText,
  text,
  quote,
  dfnText,
  supText,
  subText,
  abbrText
}