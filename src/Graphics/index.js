import{
    Svg,
    ZikoUISvg,
    svgCircle,
    svgEllipse,
    svgImage,
    svgLine,
    svgPolygon,
    svgRect,
    svgText,
    svgGroupe
} from "./Svg/index.js";
import {
    Canvas,
    canvasArc,
    canvasCircle,
    canvasPoints,
    canvasLine,
    canvasRect
} from "./Canvas/index.js";
const Graphics={
    Svg,
    ZikoUISvg,
    svgCircle,
    svgEllipse,
    svgImage,
    svgLine,
    svgPolygon,
    svgRect,
    svgText,
    svgGroupe,
    Canvas, 
    canvasArc,
    canvasCircle,
    canvasPoints,
    canvasLine,
    canvasRect,
    ExtractAll:function(){
            for (let i = 0; i < Object.keys(this).length; i++) {
                globalThis[Object.keys(this)[i]] = Object.values(this)[i];
        }
        return this;
    },
    RemoveAll:function(){
            for (let i = 0; i < Object.keys(this).length; i++) delete globalThis[Object.keys(this)[i]];   
        return this;
    }
}
export * from "./Svg"
export * from "./Canvas"
export default Graphics;