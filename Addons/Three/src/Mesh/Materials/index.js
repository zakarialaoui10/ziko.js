import * as THREE from "three"
class ZikoTHREEMaterial{
    #MESH_BASIC_MATERIAL=null;
    #MESH_PHONG_MATERIAL=null;
    #MESH_DEPTH_MATERIAL=null;
    #MESH_LAMBERT_MATERIAL=null;
    #MESH_PHYSICAL_MATERIAL=null;
    #MESH_NORMAL_MATERIAL=null;
    #MESH_STANDARD_MATERIAL=null;
    #MESH_DISTANCE_MATERIAL=null;
    #MESH_MATCAP_MATERIAL=null;
    #MESH_TOON_MATERIAL=null;
    
    #LINE_BASIC_MATERIAL=null;
    #LINE_DASHED_MATERIAL=null;

    #POINTS_MATERIAL
    constructor(mesh){
        this.mesh=mesh;
        this.attributes={}
    }
    get currentMaterial(){
        return this.mesh.material;
    }
    useMeshBasicMaterial(){
        if(!this.#MESH_BASIC_MATERIAL)this.#MESH_BASIC_MATERIAL=new THREE.MeshBasicMaterial(this.attributes);
        this.mesh.material=this.#MESH_BASIC_MATERIAL;
        return this;
    }
    useMeshPhongMaterial(){
        if(!this.#MESH_PHONG_MATERIAL)this.#MESH_PHONG_MATERIAL=new THREE.MeshPhongMaterial(this.attributes);
        this.mesh.material=this.#MESH_PHONG_MATERIAL;
        return this;
    }
    useMeshDepthMaterial(){
        if(!this.#MESH_DEPTH_MATERIAL)this.#MESH_DEPTH_MATERIAL=new THREE.MeshDepthMaterial(this.attributes);
        this.mesh.material=this.#MESH_DEPTH_MATERIAL;
        return this;
    }
    useMeshLambertMaterial(){
        if(!this.#MESH_LAMBERT_MATERIAL)this.#MESH_LAMBERT_MATERIAL=new THREE.MeshLambertMaterial(this.attributes);
        this.mesh.material=this.#MESH_LAMBERT_MATERIAL;
        return this;
    }
    useMeshPhysicalMaterial(){
        if(!this.#MESH_PHYSICAL_MATERIAL)this.#MESH_PHYSICAL_MATERIAL=new THREE.MeshPhysicalMaterial(this.attributes);
        this.mesh.material=this.#MESH_PHYSICAL_MATERIAL;
        return this;
    }
    useMeshNormalMaterial(){
        if(!this.#MESH_NORMAL_MATERIAL)this.#MESH_NORMAL_MATERIAL=new THREE.MeshNormalMaterial(this.attributes);
        this.mesh.material=this.#MESH_NORMAL_MATERIAL;
        return this;
    }
    useMeshStandardMaterial(){
        if(!this.#MESH_STANDARD_MATERIAL)this.#MESH_STANDARD_MATERIAL=new THREE.MeshStandardMaterial(this.attributes);
        this.mesh.material=this.#MESH_STANDARD_MATERIAL;
        return this;
    }
    useMeshDistanceMaterial(){
        if(!this.#MESH_DISTANCE_MATERIAL)this.#MESH_DISTANCE_MATERIAL=new THREE.MeshDistanceMaterial(this.attributes);
        this.mesh.material=this.#MESH_DISTANCE_MATERIAL;
        return this;
    }
    useMeshMatcapMaterial(){
        if(!this.#MESH_MATCAP_MATERIAL)this.#MESH_MATCAP_MATERIAL=new THREE.MeshMatcapMaterial(this.attributes);
        this.mesh.material=this.#MESH_MATCAP_MATERIAL;
        return this;
    }
    useMeshToonMaterial(){
        if(!this.#MESH_TOON_MATERIAL)this.#MESH_TOON_MATERIAL=new THREE.MeshToonMaterial(this.attributes);
        this.mesh.material=this.#MESH_TOON_MATERIAL;
        return this;
    }
    useLineBasicMaterial(){
        if(!this.#LINE_BASIC_MATERIAL)this.#LINE_BASIC_MATERIAL=new THREE.LineBasicMaterial(this.attributes);
        this.mesh.material=this.#LINE_BASIC_MATERIAL;
        return this;
    }
    useLineDashedMaterial(){
        if(!this.#LINE_DASHED_MATERIAL)this.#LINE_DASHED_MATERIAL=new THREE.LineDashedMaterial(this.attributes);
        this.mesh.material=this.#LINE_DASHED_MATERIAL;
        return this;
    }
    usePointsMaterial(){
        if(!this.#POINTS_MATERIAL)this.#POINTS_MATERIAL=new THREE.PointsMaterial(this.attributes);
        this.mesh.material=this.#POINTS_MATERIAL;
        return this;      
    }
}
const ZikoMaterial=(mesh,attributes={})=>new ZikoTHREEMaterial(mesh,attributes);
export {ZikoMaterial}