import ZikoUIElement from "../ZikoUIElement.js"
class ZikoUIGrid extends ZikoUIElement {
    constructor(tag ="div", w = "50vw", h = "50vh") {
      super();
      this.element = document.createElement(tag);
      this.direction = "cols";
      if (typeof w == "number") w += "%";
      if (typeof h == "number") h += "%";
      this.style({ border: "1px solid black", width: w, height: h });
      this.style({ display: "grid" });
      this.render();
    }
}
const Grid = (...ZikoUIElement) => new ZikoUIGrid("div").append(...ZikoUIElement);
export {Grid,ZikoUIGrid};