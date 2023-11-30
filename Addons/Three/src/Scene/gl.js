import * as THREE from "three";
import {
    ZikoUIElement,
    ZikoHtml,
    throttle
} from "ziko"
import { ZikoCamera } from "../Camera";
import { 
    ZikoThreeObject,
 } from "../Mesh/ZikoThreeMesh";
import { SceneComposer } from "../Composer/scene";
import { waitElm } from "../Utils";
class ZikoThreeSceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        Object.assign(this.cache,{
            type:"gl",
            controls:{
                orbit:null,
                transform:null
            },
            pointer:new THREE.Vector2(),
		    raycaster:new THREE.Raycaster(),
            last_intersected_uuid:null
        })
        Object.assign(this,SceneComposer.call(this))
        this.figure=ZikoHtml("figure");
        this.canvas=ZikoHtml("canvas")
        this.figure.append(this.canvas);
        this.element=this.figure.element;
        this.rendererGl=new THREE.WebGLRenderer({canvas:this.canvas.element});
        this.rendererTarget=this.rendererGl;
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
        waitElm(this.element.element).then(()=>{
            this.useOrbitControls()
        })
        this.style({
            margin:0
        })
        
        
        
    }
    maintain(){
        this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
        this.camera.currentCamera.updateProjectionMatrix();
        this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
        for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
        this.length = this.items.length;
        this.renderGl()
        return this;
    }
    renderGl(){
        //this.forEachIntersectedItem()
		this.rendererGl.render(this.sceneGl,this.camera.currentCamera);
		return this;
	}
    add(...obj){
		obj.map((n,i)=>{
			if(n instanceof ZikoThreeObject){
				this.sceneGl.add(obj[i].element);
				this.items.push(obj[i]);
				n.parent=this;
			}
			else this.sceneGl.add(obj[i])
		});
        this.maintain();
		return this;
	}
    remove(...obj){
        if(obj.length==0){
            if(this.Target.children.length) this.Target.removeChild(this.element);
          }
        else {
            obj.map((n,i)=>this.sceneGl.remove(obj[i].element));
            this.items=this.items.filter(n=>!obj.includes(n));
            this.maintain();
        }
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
        const intersectred_items=this.items.filter(n=>uuids.includes(n.element.uuid))
        const not_intersectred_items=this.items.filter(n=>!uuids.includes(n.element.uuid))
            for ( let i = 0; i < intersectred_items.length; i ++ ) {
                console.log(intersectred_items[i])
                intersectred_items[i].color("#ff00ff")    
            }
        return this;

        // should be used  with throttle or debounce
    }
    get orbit(){
        return this.cache.controls.orbit;
    }
}
const SceneGl=ZikoThreeSceneGl
export {
    ZikoThreeSceneGl,
    SceneGl
}