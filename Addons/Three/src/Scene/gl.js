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
            },
            pointer:new THREE.Vector2(),
		    raycaster:new THREE.Raycaster()
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

        this.cache.raycaster.setFromCamera( this.cache.pointer, this.camera.currentCamera );
        // calculate objects intersecting the picking ray
        const intersects = this.cache.raycaster.intersectObjects( this.sceneGl.children );
        for ( let i = 0; i < intersects.length; i ++ ) {
            //intersects[ i ].object.material.color.set( 0x0000ff );
            if(intersects[i].object.uuid==this[0].mesh.uuid){
                this[0].mesh.color=new THREE.Color(0,0,1)
            }
            else this[0].mesh.color=new THREE.Color(0,1,1) 
        }

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