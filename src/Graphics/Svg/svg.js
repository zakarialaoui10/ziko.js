import ZikoUIElement from "../../UI/ZikoUIElement.js"
import svgRect from "./Elements/rect.js";
import svgCircle from "./Elements/circle.js";
import svgEllipse from "./Elements/eircle.js";
import svgLine from "./Elements/line.js";
//import svgPath from "./Elements/path.js";
import svgPolygon from "./Elements/polygon.js";
import svgImage from "./Elements/image.js";
import svgText from "./Elements/text.js";
import svgGroupe from "./Elements/groupe.js";
//import svgObject from "./Elements/foreignObject.js";
//import svgGrid from "./Elements/grid.js";

  class ZikoUISvg extends ZikoUIElement {
    constructor(w=360,h=300) {
      super();
      this.element=document.createElementNS("http://www.w3.org/2000/svg", "svg");
      //this.cache={};
      this.setAttribute("width",w);
      this.setAttribute("height",h);
      this.style({border:"1px black solid"});
      //this.view(-w/2,-h/2,w/2,h/2)
      //this.view(-10,-10,10,10);
      this.render();
    }
    view(x1,y1,x2,y2){
      let width=Math.abs(x2-x1);
      let height=Math.abs(y2-y1);
      //this.element.style.transform="scale("+Math.sign(x2-x1)+","+(-Math.sign(y2-y1))+")";
      this.element.setAttribute("viewBox",[x1,y1,width,height].join(" "));
      //console.log({width:width,height:height})
      return this;
  
    }
    add(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element.appendChild(svgElement[i].element);
        this.items.push(svgElement[i])
      }
      if(svgElement.length===1)return svgElement[0]
      return svgElement;
    }
    remove(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element.removeChild(svgElement[i].element);
        this.items=this.items.filter(n=>!svgElement)
      }
      return this;     
    }
    text(text,x,y){
      let item=svgText(text,x,y);
      this.element.appendChild(item.element);
      item.x(x-item.element.getComputedTextLength()/2);
      return item;
    }
    rect(x,y,w,h){
      let item=svgRect(x,y,w,h);
      this.add(item);
      return item;
    }
    line(x1,y1,x2,y2){
      let item=svgLine(x1,y1,x2,y2);
      this.element.appendChild(item.element);
      return item;
    }
    circle(cx,cy,r){
      let item=svgCircle(cx,cy,r);
      this.element.appendChild(item.element);
      return item;
    }
    ellipse(cx,cy,rx,ry){
      let item=svgEllipse(cx,cy,rx,ry);
      this.element.appendChild(item.element);
      return item;
    }
    polygon(X,Y){
      let item=svgPolygon(X,Y);
      this.element.appendChild(item.element);
      item.addPoints(X,Y)
      return item;
    }
    image(src,w,h,x,y){
      let item=svgImage(src,w,h,x,y);
      this.element.appendChild(item.element);
      return item;
    }
    mask(){
  
    }
    toString(){
      return  (new XMLSerializer()).serializeToString(this.element);
    }
    btoa(){
      return btoa(this.toString())
    }
    toImg(){
      return 'data:image/svg+xml;base64,'+this.btoa()
    }
    toImg2(){
      return "data:image/svg+xml;charset=utf8,"+this.toString().replaceAll("<","%3C").replaceAll(">","%3E").replaceAll("#","%23").replaceAll('"',"'");
    }
  }

  const Svg =(w,h)=>new ZikoUISvg(w,h)