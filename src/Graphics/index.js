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
} from "./Svg";
import {
    Canvas,
    canvasArc,
    canvasCircle,
    canvasPoints,
    canvasLine,
    canvasRect
} from "./Canvas";
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
    ExtractAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'ExtractAll' && key !== 'RemoveAll') {
                globalThis[key] = this[key];
            }
        }
        return this;
    },
    RemoveAll: function () {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (key !== 'RemoveAll') {
                delete globalThis[key];
            }
        }
        return this;
    }
}
export * from "./Svg"
export * from "./Canvas"
export default Graphics;