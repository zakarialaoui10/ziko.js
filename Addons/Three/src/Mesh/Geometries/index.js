import * as THREE from "three"
import { loadSVG } from "../../Loaders/index.js";
const extrudeGeo=(shape,depth=20,bevelEnabled=false)=>new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled
});
const extrudeSvgGeo=(svg,depth=20,bevelEnabled=false)=>loadSVG(svg).map(n=>extrudeGeo(n,depth,bevelEnabled))
export{
    extrudeGeo,
    extrudeSvgGeo
}