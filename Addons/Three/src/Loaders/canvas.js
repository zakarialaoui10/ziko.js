import * as THREE from "three"
import { ZikoUICanvas } from "ziko";
const canvas2texture=Canvas=>{
    let element=null;
    if(Canvas instanceof ZikoUICanvas)element = Canvas.element;
    return new THREE.CanvasTexture(element)

}
export {canvas2texture}