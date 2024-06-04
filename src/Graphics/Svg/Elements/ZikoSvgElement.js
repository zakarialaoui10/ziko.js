class ZikoSvgElement {
  constructor(type) {
    this.cache = {
      type
    };
  }
  pos(x,y){
    return this.posX(x).posY(y);
  }
  posX(x){
    if(["cirlce","ellipse"].includes(this.cache.type))this.element.cx.baseVal.value=x;
    else this.element.x.baseVal.value=x;
    return this;
  }
  posY(y){
    if(["cirlce","ellipse"].includes(this.cache.type))this.element.cy.baseVal.value=y;
    else this.element.y.baseVal.value=y;
    return this;
  }
  translate(x,y){
    return this;
  }
  color({ stroke, fill }) {
    this.element.setAttribute("stroke", stroke);
    this.element.setAttribute("fill", fill);
    return this;
  }
  fill(color = "none") {
    this.element.setAttribute("fill", color);
    return this;
  }
  stroke(color = "none", width) {
    this.element.setAttribute("stroke", color);
    width && this.strokeWidth(width);
    return this;
  }
  strokeWidth(width = 1) {
    this.element.setAttribute("stroke-width", width);
    return this;
  }
  opacity(value = 1) {
    this.element.setAttribute("opacity", value);
    return this;
  }
}
export default ZikoSvgElement;
