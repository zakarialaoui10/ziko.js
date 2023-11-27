import ZikoThreeMesh from "../ZikoThreeMesh";
import { groupe3 } from "./groupe";
class ZikoThreeExtrude extends ZikoThreeMesh{
    constructor(shape,depth=5,bevelEnabled=false){
        super()
        this.mesh=new THREE.ExtrudeGeometry(shape, {
            depth,
            bevelEnabled
        });
    }
}
const extrudeGeo=(shape,depth=20,bevelEnabled=false)=>new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled
});
const extrude3=(shape,depth=5,bevelEnabled=false)=>new ZikoThreeMesh(extrudeGeo(shape,depth,bevelEnabled));
const svg3=(svg,depth=5,bevelEnabled=false)=>groupe3(...loadSVG(svg).map(n=>extrude3(n,depth,bevelEnabled)))
export {
    extrude3,
    svg3
}