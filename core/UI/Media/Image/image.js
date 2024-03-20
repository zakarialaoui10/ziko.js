import ZikoUIElement from "../../ZikoUIElement.js";
class ZikoUIImage extends ZikoUIElement {
    constructor(src, w, h) {
      super("image","image");
      this.value=src;
      if (src.nodeName === "IMG")this.element.setAttribute("src", src.src);
      else this.element.setAttribute("src", src);
      if (typeof w == "number") w += "%";
      if (typeof h == "number") h += "%";
      this.style({ border: "1px solid black", width: w, height: h });
      this.render();
    }
     updateSrc(url){
      this.value=url;
      this.element.src=url;
     return this;
    }
    toggleSrc(...values){
      values=values.map(n=>""+n);
      let index=values.indexOf(""+this.value);
      if(index!=-1&&index!=(values.length-1))this.updateSrc(values[index+1]);
      else this.updateSrc(values[0]);
      return this;
    }
    alt(alt){
      this.element.alt=alt;
      return this;
    }
  }
const image = (src, width, height) => new ZikoUIImage(src, width, height);
export{
    image,
    ZikoUIImage
}