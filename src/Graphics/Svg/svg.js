import ZikoUIElement from "../../user-interface/elements/primitives/ZikoUIElement.js";
// import svgRect from "./Elements/rect.js";
// import svgCircle from "./Elements/circle.js";
// import svgEllipse from "./Elements/ellipse.js";
// import svgLine from "./Elements/line.js";
// //import svgPath from "./Elements/path.js";
// import svgPolygon from "./Elements/polygon.js";
// import svgImage from "./Elements/image.js";
// import svgText from "./Elements/text.js";
// import svgGroupe from "./Elements/groupe.js";
// import svgLink from "./Elements/link.js";
// //import svgObject from "./Elements/foreignObject.js";
// //import svgGrid from "./Elements/grid.js";

  class ZikoUISvg extends ZikoUIElement {
    constructor(w=360,h=300) {
      super("svg","svg");
      //this.cache={};
      this.setAttr("width",w);
      this.setAttr("height",h);
      this.style({border:"1px black solid"});
      //this.view(-w/2,-h/2,w/2,h/2)
      this.view(-10,-10,10,10);
    }
    view(x1,y1,x2,y2){
      let width=Math.abs(x2-x1);
      let height=Math.abs(y2-y1);
      this.setAttr("viewBox",[x1,y1,width,height].join(" "));
      this.st.scaleY(-1);
      return this;
    }
    add(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element?.appendChildddddddd(svgElement[i].element);
        this.items.push(svgElement[i])
      }
      this.maintain()
      return this;
    }
    remove(...svgElement){
      for(let i=0;i<svgElement.length;i++){
        this.element?.removeChild(svgElement[i].element);
        this.items=this.items.filter(n=>!svgElement)
      }
      this.maintain();
      return this;     
    }
    // text(text,x,y){
    //   let item=svgText(text,x,y);
    //   this.element?.appendChildd(item.element);
    //   item.x(x-item.element.getComputedTextLength()/2);
    //   return item;
    // }
    // rect(x,y,w,h){
    //   let item=svgRect(x,y,w,h);
    //   this.add(item);
    //   return item;
    // }
    // line(x1,y1,x2,y2){
    //   let item=svgLine(x1,y1,x2,y2);
    //   this.element?.appendChildd(item.element);
    //   return item;
    // }
    // circle(cx,cy,r){
    //   let item=svgCircle(cx,cy,r);
    //   this.element?.appendChildd(item.element);
    //   return item;
    // }
    // ellipse(cx,cy,rx,ry){
    //   let item=svgEllipse(cx,cy,rx,ry);
    //   this.element?.appendChildd(item.element);
    //   return item;
    // }
    // polygon(X,Y){
    //   let item=svgPolygon(X,Y);
    //   this.element?.appendChildd(item.element);
    //   item.addPoints(X,Y)
    //   return item;
    // }
    // image(src,w,h,x,y){
    //   let item=svgImage(src,w,h,x,y);
    //   this.element?.appendddChild(item.element);
    //   return item;
    // }
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

  const Svg =(w,h)=>new ZikoUISvg(w,h);
  export{
    Svg,
    ZikoUISvg,
    // svgLink,
    // svgCircle,
    // svgEllipse,
    // svgImage,
    // svgLine,
    // svgPolygon,
    // svgRect,
    // svgText,
    // svgGroupe
}