import * as THREE from "three";
import {ZikoUIElement} from "ziko"
import { ZikoCamera } from "../Camera";
import ZikoThreeMesh from "../Mesh/ZikoThreeMesh";
import { SceneComposer } from "../Composer/scene";
import { 
    ZikoOrbitControls,
    ZikoTransformControls
 } from "../Controls";

class SceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        Object.assign(this.cache,{
            controls:{
                orbit:null,
                transfrom:null
            }
        })
        Object.assign(this,SceneComposer.call(this))
        this.element=document.createElement("figure");
        this.canvas=document.createElement("canvas");
        this.element.appendChild(this.canvas);
        this.rendererGl=new THREE.WebGLRenderer({canvas:this.canvas});
		this.sceneGl=new THREE.Scene();
        this.camera=ZikoCamera(w,h,0.1,1000);
        this.camera.currentCamera.position.z=10;
        this.camera.parent=this;
        this.sceneGl.background=new THREE.Color("#ff0000");
        this.cache.controls.orbit=ZikoOrbitControls(this)
        this.cache.controls.transfrom=ZikoTransformControls(this)
        this.renderGl()
        this.render();
        this.size(w,h);
        
    }
    renderGl(){
		this.rendererGl.render(this.sceneGl,this.camera.currentCamera);
		return this;
	}
    addGl(...obj){
		obj.map((n,i)=>{
			if(n instanceof ZikoThreeMesh){
				this.sceneGl.add(obj[i].mesh);
				this.items.push(obj[i]);
				n.parent=this;
			}
			else this.sceneGl.add(obj[i])
		});
        this.maintain();
		this.renderGl();
		return this;
	}
    removeGl(...obj){
		obj.map((n,i)=>this.sceneGl.remove(obj[i].mesh));
        this.items=this.items.filter(n=>!obj.includes(n));
        this.maintain();
		this.renderGl();
		return this;
    }
}
export {SceneGl}