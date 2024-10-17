export * from "./svg"
import * as SVG from "./svg"
// import{
//     Svg,
//     ZikoUISvg,
//     svgCircle,
//     svgEllipse,
//     svgImage,
//     svgLine,
//     svgPolygon,
//     svgRect,
//     svgText,
//     svgGroupe,
//     svgLink,
//     svgGrid,
//     svgObject,
//     svgPath
// } from "./svg/index.js";
// import {
//     Canvas,
//     canvasArc,
//     canvasCircle,
//     canvasPoints,
//     canvasLine,
//     canvasRect
// } from "./canvas/index.js";
// const Graphics={
//     Svg,
//     ZikoUISvg,
//     svgCircle,
//     svgEllipse,
//     svgImage,
//     svgLine,
//     svgPolygon,
//     svgRect,
//     svgText,
//     svgGroupe,
//     svgLink,
//     svgGrid,
//     svgObject,
//     svgPath,
//     Canvas, 
//     canvasArc,
//     canvasCircle,
//     canvasPoints,
//     canvasLine,
//     canvasRect,
//     ExtractAll: function () {
//         const keys = Object.keys(this);
//         for (let i = 0; i < keys.length; i++) {
//             const key = keys[i];
//             if (key !== 'ExtractAll' && key !== 'RemoveAll') {
//                 globalThis[key] = this[key];
//             }
//         }
//         return this;
//     },
//     RemoveAll: function () {
//         const keys = Object.keys(this);
//         for (let i = 0; i < keys.length; i++) {
//             const key = keys[i];
//             if (key !== 'RemoveAll') {
//                 delete globalThis[key];
//             }
//         }
//         return this;
//     }
// }
// export * from "./svg/index.js"
// export * from "./canvas/index.js"
// export default Graphics;

const Graphics = {
    ...SVG
}
export default Graphics