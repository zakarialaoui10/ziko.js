import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import {ZikoUISvg} from "ziko";
import * as THREE from "three"
const loadSVG=svg=>{
    let element=null;
    let shapes = [];
    const loader = new SVGLoader();
    if(svg instanceof ZikoUISvg) {
        element=svg.element.outerHTML;
    }
    if(svg instanceof HTMLElement) element = svg.outerHTML;
    const svgData = loader.parse(element);
    svgData.paths.forEach((path, i) => {
        shapes[i]=path.toShapes(true)[0];
    });
    return shapes
}
export {loadSVG}