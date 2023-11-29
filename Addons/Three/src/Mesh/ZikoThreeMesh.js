import * as THREE from "three"
import {
    GeometryComposer,
    MaterialComposer
} from "../Composer/index.js"
import { ZikoMaterial } from "./Materials/index.js";
class ZikoThreeObject{
    constructor(){
        this.parent=null; // Scene
        Object.assign(this, GeometryComposer.call(this));
    }
    _Maintain(){
        this.element=new THREE.Mesh(this.geometry,this.material.currentMaterial);
        if(this.parent)this.parent.renderGl();
        return this;
    }
    render(){
        if(this.parent)this.parent.renderGl();
        return this;
    }
    remove(){

    }
    get px(){
        return this.element.position.x;
    }
    get py(){
        return this.element.position.y;
    }
    get pz(){
        return this.element.position.z;
    }
    get rx(){
        return this.element.rotation.x;
    }
    get ry(){
        return this.element.rotation.y;
    }
    get rz(){
        return this.element.rotation.z;
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
class ZikoThreeMesh extends ZikoThreeObject{
    constructor(Geometry,Material){
        super()
        this.cache={
            type:"gl"
        }
        this.element=new THREE.Mesh(Geometry,Material);
        this.material=ZikoMaterial(this.element,{});
        Object.assign(this, MaterialComposer.call(this));
    }
    get isHovered(){
        //this.parent.renderGl()

        //return this.parent.cache.last_intersected_uuid===this.element.uuid;
    }
    get Geometry(){
        return this.element.geometry;
    }
    get Material(){
        return this.element.material;
    }

}
export {
    ZikoThreeObject,
    ZikoThreeMesh
}