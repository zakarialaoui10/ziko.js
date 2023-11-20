import {
    GeometryComposer,
    MaterialComposer
} from "./Composer/index.js"
class ZikoMesh{
    constructor(Geometry,Material){
        this._cache={
            Mouse:new THREE.Vector2(),
		    Raycaster:new THREE.Raycaster()
        }
        this.parent=null; // Scene
        this.mesh=new THREE.Mesh(Geometry,Material);
        Object.assign(this, GeometryComposer.call(this));
        Object.assign(this, MaterialComposer.call(this));
    }
    _Maintain(){
        this.mesh=new THREE.Mesh(this.geometry,this.material);
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
    get XPOS(){
        return this.mesh.position.x;
    }
    get YPOS(){
        return this.mesh.position.y;
    }
    get ZPOS(){
        return this.mesh.position.z;
    }
    get XROT(){
        return this.mesh.rotation.x;
    }
    get YROT(){
        return this.mesh.rotation.y;
    }
    get ZROT(){
        return this.mesh.rotation.z;
    }
    get X(){
        return {
            pos:this.XPOS,
            rot:this.XROT
        }
    }
    get Y(){
        return {
            pos:this.YPOS,
            rot:this.YROT
        }
    }
    get Z(){
        return {
            pos:this.ZPOS,
            rot:this.ZROT
        }
    }

}

const Mesh=()=>new ZikoMesh()
const m1=Mesh()
console.log(m1)
export default Mesh