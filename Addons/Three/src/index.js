import * as THREE from "three"
import { SceneGl } from "./Scene/gl.js";
import { image2texture } from "./Loaders/image.js";
import { loadSVG } from "./Loaders/svg.js";
import{
    cube3,
    plan3,
    line3,
    cuboid3,
    cylindre3,
    sphere3,
    cone3,
    torus3,
    ring,
    torusKnot3,
    tetradron3,
    dodecahedron3,
    icosahedron3,
    octahedron3,
    groupe3,
} from "./Mesh/index.js";
const ZikoThree={
    loadSVG,
    image2texture,
    THREE,
    SceneGl,
    cube3,
    plan3,
    line3,
    cuboid3,
    cylindre3,
    sphere3,
    cone3,
    torus3,
    ring,
    torusKnot3,
    tetradron3,
    dodecahedron3,
    icosahedron3,
    octahedron3,
    groupe3,
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

//if(Ziko)Object.assign(Ziko.Graphics,{...ZikoThree})
export default ZikoThree