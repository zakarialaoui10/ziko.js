import ZikoSvgElement from "../ZikoSvgElement.js";
class ZikoSvgPolyLine extends ZikoSvgElement{}
const svgPolyLine=(X,Y)=>new ZikoSvgPolyLine(X,Y);
export { 
    svgPolyLine,
    ZikoSvgPolyLine
 }