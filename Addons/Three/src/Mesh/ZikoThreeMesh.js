import * as THREE from "three"
import {
    GeometryComposer,
    MaterialComposer
} from "../Composer/index.js"
import { ZikoMaterial } from "./Materials/index.js";
class ZikoThreeMesh{
    constructor(Geometry,Material){
        this._cache={
            // Mouse:new THREE.Vector2(),
		    // Raycaster:new THREE.Raycaster()
        }
        this.parent=null; // Scene
        this.mesh=new THREE.Mesh(Geometry,Material);
        this.material=ZikoMaterial(this.mesh,{});

        Object.assign(this, GeometryComposer.call(this));
        Object.assign(this, MaterialComposer.call(this));
    }
    _Maintain(){
        this.mesh=new THREE.Mesh(this.geometry,this.material.currentMaterial);
        if(this.parent)this.parent.renderGl();
        return this;
    }
    render(){
        if(this.parent)this.parent.renderGl();
        return this;
    }
    remove(){

    }
    get Geometry(){
        return this.mesh.geometry;
    }
    get Material(){
        return this.mesh.material;
    }
    get px(){
        return this.mesh.position.x;
    }
    get py(){
        return this.mesh.position.y;
    }
    get pz(){
        return this.mesh.position.z;
    }
    get rx(){
        return this.mesh.rotation.x;
    }
    get ry(){
        return this.mesh.rotation.y;
    }
    get rz(){
        return this.mesh.rotation.z;
    }
    get x(){
        return {
            pos:this.px,
            rot:this.rx
        }
    }
    get y(){
        return {
            pos:this.py,
            rot:this.ry
        }
    }
    get z(){
        return {
            pos:this.pz,
            rot:this.rz
        }
    }

}

const ZikoMesh=()=>new ZikoThreeMesh()
export default ZikoThreeMesh