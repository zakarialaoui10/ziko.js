import * as THREE from "three"
import { ZikoUIImage } from "ziko";
const image2texture=Image=>{
    let img=null;
    if(Image instanceof ZikoUIImage)img = Image.element.src;
    else if(Image instanceof HTMLElement)img = Image.src
    return new THREE.TextureLoader().load(img)

}
export {image2texture}