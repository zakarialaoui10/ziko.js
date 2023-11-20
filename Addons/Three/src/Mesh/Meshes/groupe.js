
import ZikoThreeMesh from "../ZikoThreeMesh"
class ZikoThreeGroupe extends ZikoThreeMesh{
	constructor(){
		super();
		this.mesh=new THREE.Group();
	}
	add(...obj){
		for(let i=0;i<obj.length;i++){
			this.mesh.add(obj[i].mesh);
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
