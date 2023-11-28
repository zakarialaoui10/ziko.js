import { ZikoUIElement } from "ziko";
import * as THREE from "three"
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { ZikoThreeSceneGl } from "./gl";
import {UI3} from "../Mesh/index"
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
    maintain(){
        this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
        this.camera.currentCamera.updateProjectionMatrix();
        this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
        this.rendererCss.setSize(this.element.clientWidth,this.element.clientHeight);
        for (let i = 0; i < this.items.length; i++)
        Object.assign(this, { [[i]]: this.items[i] });
        this.length = this.items.length;
        this.renderGl()
        this.renderCss()
        return this;
    }
    addCssElement(...element){
        for(let i=0;i<element.length;i++){
            console.log(element[i] instanceof ZikoUIElement)
            if(element[i] instanceof ZikoUIElement)this.sceneCss.add(UI3(element[i]))
        }
    this.renderGl().renderCss()
    return this;
    }
}

const SceneCss=(w,h)=>new ZikoThreeSceneCss(w,h)
export{
    ZikoThreeSceneCss,
    SceneCss
}