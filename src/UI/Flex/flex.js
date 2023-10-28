import ZikoUIElement from "../Setup.js"
function set_vertical(direction){
    direction == 1
      ? this.style({ flexDirection: "column" })
      : direction == -1 && this.style({ flexDirection: "column-reverse" });
    return this;
  }
function set_horizontal(direction){
  direction == 1
      ? this.style({ flexDirection: "row" })
      : direction == -1 && this.style({ flexDirection: "row-reverse" });
    return this;
}

function map_pos_x(align){
  let pos = ["flex-start", "center", "flex-end"];
  if (typeof align === "number") align = pos[align + 1];
  return align;
}
window.map_pos_x=map_pos_x
function map_pos_y(align){
  return map_pos_x(-align);
}
class ZikoUIFlex extends ZikoUIElement {
  constructor(tag ="div", w = "50vw", h = "50vh") {
    super();
    this.element = document.createElement(tag);
    this.direction = "cols";
    if (typeof w == "number") w += "%";
    if (typeof h == "number") h += "%";
    this.style({ border: "1px solid black", width: w, height: h });
    this.style({ display: "flex" });
    this.render();
  }
  resp(px,wrap = true) {
    this.wrap(wrap);
    if (this.element.clientWidth < px) this.vertical();
    else this.horizontal();
    return this;
  }
  setSpaceAround() {
    this.style({ justifyContent: "space-around" });
    return this;
  }
  setSpaceBetween() {
    this.style({ justifyContent: "space-between" });
    return this;
  }
  setBaseline() {
    this.style({ alignItems: "baseline" });
    return this;
  }
  gap(g) {
    if (this.direction === "row") this.style({ columnGap: g });
    else if (this.direction === "column") this.style({ rowGap: g });
    return this;
  }
  wrap(value = "wrap") {
    const values = ["no-wrap", "wrap","wrap-reverse"];
    this.style({
      flexWrap: typeof value === "string" ? value : values[+value],
    });
    return this;
  }
  _justifyContent(align = "center") {
    this.style({ justifyContent: align });
    return this;
  }
  vertical(x, y, order=1) {
    console.log(111111111111)
    set_vertical.call(this,order)
    this.style({
      alignItems: typeof(x)==="number"?map_pos_x.call(this,x):x,
      justifyContent: typeof(y)=="number"?map_pos_y.call(this,y):y
    });
    return this;
  }
  horizontal(x, y, order=1) {
    set_horizontal.call(this,order)
    this.style({
      alignItems: typeof(y)=="number"?map_pos_y.call(this,y):y,
      justifyContent: typeof(x)==="number"?map_pos_x.call(this,x):x
    });
    return this;
  }
  show() {
    this.isHidden = false;
    this.style({ display: "flex" });
    return this;
  }
}

const Flex = (...ZikoUIElement) => new ZikoUIFlex("div").append(...ZikoUIElement);
const FlexHeader = (...ZikoUIElement) => new ZikoUIFlex("header").append(...ZikoUIElement);
const FlexMain = (...ZikoUIElement) => new ZikoUIFlex("main").append(...ZikoUIElement);
const FlexArticle = (...ZikoUIElement) => new ZikoUIFlex("article").append(...ZikoUIElement);
const FlexSection = (...ZikoUIElement) => new ZikoUIFlex("section").append(...ZikoUIElement);
const FlexAside = (...ZikoUIElement) => new ZikoUIFlex("aside").append(...ZikoUIElement);
const FlexNav = (...ZikoUIElement) => new ZikoUIFlex("nav").append(...ZikoUIElement);
const FlexFooter = (...ZikoUIElement) => new ZikoUIFlex("footer").append(...ZikoUIElement);

export{Flex,ZikoUIFlex,FlexHeader,FlexMain,FlexArticle,FlexSection,FlexAside,FlexFooter}