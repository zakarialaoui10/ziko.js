import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
console.log(OrbitControls)
import {ZikoUIElement} from "ziko"
import { ZikoCamera } from "../Camera";
import ZikoThreeMesh from "../Mesh/ZikoThreeMesh";
import { waitElm } from "../Utils";
class SceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        Object.assign(this.cache,{
            control:{
                config:{
                    orbit:false
                },
                orbit:null
            }
        })
        this.element=document.createElement("figure");
        this.canvas=document.createElement("canvas");
        this.element.appendChild(this.canvas);
        this.rendererGl=new THREE.WebGLRenderer({canvas:this.canvas});
		this.sceneGl=new THREE.Scene();
        this.camera=ZikoCamera(w,h,0.1,1000);
        this.camera.currentCamera.position.z=10;
        this.camera.parent=this;
        this.sceneGl.background=new THREE.Color("#ff0000");
        this.cache.control.orbit=new OrbitControls(this.camera.currentCamera,this.rendererGl.domElement);
		this.cache.control.orbit.addEventListener("change",()=>{if(this.cache.control.config.orbit)this.renderGl()});
        this.renderGl()
        this.render();
        this.size(w,h)
    }
    renderGl(){
		this.rendererGl.render(this.sceneGl,this.camera.currentCamera);
		return this;
	}
    maintain(){
        for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
        this.length = this.items.length;
        return this;
    }
    size(w = "100%", h = "100%") {
		if(typeof(w)==="number")w=w+"px";
		if(typeof(h)==="number")h=h+"px";
        waitElm(this.element).then((e)=>{
            this.element.style.width=w;
            this.element.style.height=h;
            this.canvas.style.margin=0;
            this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
            this.camera.currentCamera.updateProjectionMatrix();
            this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
            this.renderGl();
        })
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