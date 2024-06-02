import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgPolygon extends ZikoSvgElement{
    constructor(X=[],Y=[]){
      super()
      this.X=X;
      this.Y=Y
      this.element=document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon",
      );
      this.element.setAttribute("points","");
      this.addPoints(X,Y)
    }
    addPoint(x,y){
      let p=this.element.parentElement.createSVGPoint();
      p.x=x;
      p.y=y;
      this.element.points.appendItem(p);
      return this;
    }
    addPoints(X,Y){
      for(let i=0;i<X.length;i++){
        let p=this.element.parentElement.createSVGPoint();
        p.x=X[i];
        p.y=Y[i];
        this.element.points.appendItem(p)
      }
      return this;
    }
  } 
const svgPolygon=(X,Y)=>new ZikoSvgPolygon(X,Y);
export{ svgPolygon }