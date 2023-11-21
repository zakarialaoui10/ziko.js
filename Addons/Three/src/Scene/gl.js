import * as THREE from "three"
import {ZikoUIElement} from "ziko"
class SceneGl extends ZikoUIElement{
    constructor(w,h){
        super()
        this.element=document.createElement("figure");
        this.canvas=document.createElement("canvas");
        this.element.appendChild(this.canvas);
        this.rendererGl=new THREE.WebGLRenderer({canvas:this.canvas});
		this.sceneGl=new THREE.Scene();
	    this.camera=new THREE.PerspectiveCamera(100,w/h,0.1,1000);
        this.camera.position.z=10;
        this.sceneGl.background=new THREE.Color("#ff0000")
        this.renderGl()
        this.render();
    }
    // setup(){
    //     this.camera
    // }
    size(w = "100%", h = "100%") {
		if(typeof(w)==="number")w=w+"px";
		if(typeof(h)==="number")h=h+"px";
		this.style({ width: w, height: h });
        this.camera.aspect=(this.element.clientWidth)/(this.element.clientHeight);
        this.camera.updateProjectionMatrix();
		this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
		this.renderGl();
		return this;
    }
    setSize(){
		this.camera.aspect=(this.element.clientWidth)/(this.element.clientHeight);
        this.camera.updateProjectionMatrix();
		this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
		this.renderGl();
		return this;
	}
    renderGl(){
		this.rendererGl.render(this.sceneGl,this.camera);
		return this;
	}
}
export {SceneGl}