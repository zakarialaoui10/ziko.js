class ZikoUISvgElement{
    color({stroke,fill}){
      this.element.setAttribute("stroke",stroke);
      this.element.setAttribute("fill",fill);
      return this; 
    }
    fill(color="none"){
      this.element.setAttribute('fill', color);
      return this;
    }
    stroke(color="none",width){
      this.element.setAttribute('stroke', color);
      width && this.strokeWidth(width)
      return this;
    }
    strokeWidth(width=1){
      this.element.setAttribute('stroke-width', width);
      return this;
    }
    opacity(value=1){
      this.element.setAttribute('opacity', value);
      return this;   
    }
    }
  export default ZikoUISvgElement