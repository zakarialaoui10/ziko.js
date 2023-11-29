import { ZikoUIElement } from "ziko";
import * as THREE from "three"
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { ZikoThreeSceneGl } from "./gl";
import {UI3} from "../Mesh/index"
import ZikoThreeMesh from "../Mesh/ZikoThreeMesh";
class ZikoThreeSceneCss extends ZikoThreeSceneGl{
    constructor(w,h){
        super(w,h)
        this.sceneCss=new THREE.Scene();
        this.rendererCss=new CSS3DRenderer();
        this.rendererCss.domElement.appendChild(this.rendererGl.domElement );
        this.rendererTarget=this.rendererCss;
        this.figure.append(this.canvas);
        this.element.appendChild(this.rendererCss.domElement);
        this.canvas.style({
            position:"absolute"
        })
        this.useOrbitControls()
        this.cache.controls.orbit.onChange(()=>{this.renderGl().renderCss()})
    }
    renderCss(){
        this.rendererCss.render(this.sceneCss,this.camera.currentCamera);
        return this;
    }
    maintain(renderGl=true,renderCss=true){
        this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
        this.camera.currentCamera.updateProjectionMatrix();
        this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
        this.rendererCss.setSize(this.element.clientWidth,this.element.clientHeight);
        for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
        this.length = this.items.length;
        if(renderGl)this.renderGl()
        if(renderCss)this.renderCss()
        return this;
    }
    add(...obj){
        let rerenderGl=false;
        let rerenderCss=false;
        obj=obj.map(n=>n instanceof ZikoUIElement?UI3(n):n)
		obj.map(n=>{
			if(n instanceof ZikoThreeMesh){
                if(n.cache.type==="gl"){
                    this.sceneGl.add(n.element);
                    rerenderGl=true;
                }
                else if(n.cache.type==="css"){
                    this.sceneCss.add(n.element); 
                    rerenderCss=true
                }            
                this.items.push(n);
                n.parent=this;  
			}
		});
        this.maintain(rerenderGl,rerenderCss);
		return this;
	}
    remove(...obj){
        let rerenderGl=false;
        let rerenderCss=false;
		obj.map((n,i)=>{
            if(n.cache.type==="gl"){
                let rerenderGl=true;
                this.sceneGl.remove(obj[i].element);
            }
            else if(n.cache.type==="css"){
                let rerenderCss=true;
                this?.sceneCss?.remove(obj[i].element);
            }
        });
        this.items=this.items.filter(n=>!obj.includes(n));
        this.maintain(rerenderGl,rerenderCss);
		return this;
    }
}

const SceneCss=(w,h)=>new ZikoThreeSceneCss(w,h)
export{
    ZikoThreeSceneCss,
    SceneCss
}