
import * as THREE from "three"
import ZikoThreeMesh from "../ZikoThreeMesh"
class ZikoThreeGroupe extends ZikoThreeMesh{
	constructor(){
		super();
		this.mesh=new THREE.Group();
		this.items=[]
	}
	add(...obj){
		for(let i=0;i<obj.length;i++){
			if(obj[i] instanceof THREE.Mesh){
				obj[i]=new ZikoThreeMesh(obj);
			}
			this.mesh.add(obj[i].mesh);
			this.items.push(obj[i])
		}
       return this;
	}
	remove(...obj){
        if(obj.length===0){
            //remove groupe
        }
		else for(let i=0;i<obj.length;i++){
			this.mesh.remove(obj[i].mesh);
		}
       return this;
	}
}
export const groupe3=(...obj)=>new ZikoThreeGroupe().add(...obj);

