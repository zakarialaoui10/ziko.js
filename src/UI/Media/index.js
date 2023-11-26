
import ZikoUIElement from "../ZikoUIElement.js"
import {
  ZikoUIVideo
} from "./video.js"
class ZikoUIImage extends ZikoUIElement {
    constructor(src, w, h) {
      super();
      this.element = document.createElement("img");
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
  
  
  class ZikoUIAudio extends ZikoUIElement {
    constructor(src) {
      super();
      this.element = document.createElement("audio");
      this.element.setAttribute("src", src);
      this.render();
      this.controls();
    }
    controls(enabled = true) {
      this.element.controls = enabled;
      return this;
    }
    play() {
      this.element.play();
      return this;
    }
    pause() {
      this.element.pause();
      return this;
    }
  }
  class ZikoUIFigure extends ZikoUIElement{
    constructor(src,caption){
      super()
      this.element=document.createElement("figure");
      this.img=src.width("100%").element;
      this.caption=document.createElement("figcaption");
      this.caption.append(caption.element)
      this.element.append(this.img);
      this.element.append(this.caption);
      this.render();
    }
  }

const image = (src, width, height) => new ZikoUIImage(src, width, height);
const audio = (src) => new ZikoUIAudio(src);
const figure =(image,caption) =>new ZikoUIFigure(image,caption);
const video = (src, width, height) => new ZikoUIVideo(src, width, height);

export{
  image,
  audio,
  figure,
  video,
  ZikoUIImage,
  ZikoUIAudio,
  ZikoUIFigure,
  ZikoUIVideo
}