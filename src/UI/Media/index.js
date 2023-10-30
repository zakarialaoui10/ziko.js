
import ZikoUIElement from "../ZikoUIElement.js"
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
  class ZikoUIVideo extends ZikoUIElement {
    constructor(src="", w = "100%", h = "50vh") {
      super();
      this.element = document.createElement("video");
      if (src.nodeName === "VIDEO") this.element.setAttribute("src", src.src);
      else this.element.setAttribute("src", src);
      if (typeof w == "number") w += "%";
      if (typeof h == "number") h += "%";
      this.style({ width: w, height: h });
      this.render();
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
    poster(src=""){
      this.element.poster=src;
      return this;
    }
    PIP(e){
      this.element.requestPictureInPicture(e);
      return this;
    }
  }
  class ZikoUIWebcame extends ZikoUIVideo{
    constructor(){
      super()
      this.element.setAttribute("src", "");
      this.constraints = { audio: true, video: { width: 1280, height: 720 } };
      //this.video=this.element
    }
    start(){
      navigator.mediaDevices.getUserMedia(this.constraints).then((mediaStream)=>{
        this.element.srcObject = mediaStream;
        this.element.onloadedmetadata = () =>{
          this.element.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });
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
const video = (src, width, height) => new ZikoUIVideo(src, width, height);
const audio = (src) => new ZikoUIAudio(src);
const webcame=()=>new ZikoUIWebcame();
const figure =(image,caption) =>new ZikoUIFigure(image,caption)
export{image,video,audio,webcame,figure,ZikoUIImage}