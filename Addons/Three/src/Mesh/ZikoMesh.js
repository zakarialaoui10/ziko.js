import {
    GeometryComposer,
    MaterialComposer
} from "./Composer/index.js"
class ZikoMesh{
    constructor(){
        this.geometry=null;
        this.material=null;
        this.mesh=null;
        this.parent=null;
        Object.assign(this, GeometryComposer.call(this));
        Object.assign(this, MaterialComposer.call(this));
    }
    _Maitain(){

    }
    render(){

    }
    remove(){

    }
    get Xpos(){

    }
    get Ypos(){

    }
    get Zpos(){

    }
    get Xrot(){

    }
    get Yrot(){

    }
    get Zrot(){

    }
}

const Mesh=()=>new ZikoMesh()
const m1=Mesh()
console.log(m1)
export default Mesh