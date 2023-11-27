import * as THREE from "three";
import {
    ZikoUIElement,
    throttle
} from "ziko"
import { ZikoCamera } from "../Camera";
import ZikoThreeMesh from "../Mesh/ZikoThreeMesh";
import { SceneComposer } from "../Composer/scene";
import { waitElm } from "../Utils";

class SceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        Object.assign(this.cache,{
            controls:{
                orbit:null,
                transfrom:null
            },
            pointer:new THREE.Vector2(),
		    raycaster:new THREE.Raycaster(),
            last_intersected_uuid:null
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
        this.renderGl()
        this.render();
        this.size(w,h);
        this.WatchSize(()=>this.maintain())
        //this.useOrbitCOntrols()
        waitElm(this.element).then(()=>{
            this.useOrbitControls()
        })
        
        
    }
    renderGl(){
        //this.forEachIntersectedItem()
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
    forEachIntersectedItem(if_callback=()=>{},else_callback=()=>{}){
        this.cache.raycaster.setFromCamera( this.cache.pointer, this.camera.currentCamera );
        const intersects = this.cache.raycaster.intersectObjects( this.sceneGl.children ).filter(n=>{
            return !(
                (n.object.type.includes("Controls"))||
                (n.object.tag==="helper")||
                ["X","Y","Z","XYZ","XYZE","E"].includes(n.object.name)
            )
        })
        const uuids=intersects.map(n=>n.object.uuid);
        const intersectred_items=this.items.filter(n=>uuids.includes(n.mesh.uuid))
        const not_intersectred_items=this.items.filter(n=>!uuids.includes(n.mesh.uuid))
            for ( let i = 0; i < intersectred_items.length; i ++ ) {
                console.log(intersectred_items[i])
                intersectred_items[i].color("#ff00ff")    
            }
        return this;

        // should be used  with throttle or debounce
    }
}
export {SceneGl}