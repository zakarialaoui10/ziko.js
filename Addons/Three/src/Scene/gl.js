import * as THREE from "three"
import {ZikoUIElement} from "ziko"
import { ZikoCamera } from "../Camera";
import ZikoThreeMesh from "../Mesh/ZikoThreeMesh";
import { waitElm } from "../Utils/wait";
class SceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        this.element=document.createElement("figure");
        this.canvas=document.createElement("canvas");
        this.element.appendChild(this.canvas);
        this.rendererGl=new THREE.WebGLRenderer({canvas:this.canvas});
		this.sceneGl=new THREE.Scene();
        this.camera=ZikoCamera(w,h,0.1,1000);
        this.camera.currentCamera.position.z=10;
        this.camera.parent=this;
        this.sceneGl.background=new THREE.Color("#ff0000")
        this.renderGl()
        this.render();
        this.size(w,h)
    }
    renderGl(){
		this.rendererGl.render(this.sceneGl,this.camera.currentCamera);
		return this;
	}
    maintain(){
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
		this.renderGl();
		return this;
	}
    removeGl(...obj){
		obj.map((n,i)=>this.sceneGl.remove(obj[i].mesh));
        this.items=this.items.filter(n=>!obj.includes(n))
		this.renderGl();
		return this;
    }
}
export {SceneGl}