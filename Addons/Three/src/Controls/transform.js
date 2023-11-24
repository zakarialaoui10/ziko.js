import * as THREE from "three"
import { TransformControls } from 'three/addons/controls/TransformControls.js';
class ZikoThreeTransformControls{
    #TARGET
    constructor(target){
        this.#TARGET=target;
        this.control=new TransformControls(target.camera.currentCamera,target.rendererGl.domElement);
        this.#TARGET.sceneGl.add(this.control)
        this.isPaused=false;
        this.mode="translate";
        this.onChange()
    }
    add(){
        this.#TARGET.sceneGl.add(this.control)
        return this;  
    }
    remove(){
        this.#TARGET.sceneGl.remove(this.control)
        return this;    
    }
    enable(){
        this.control.enabled=true;
        return this;
    }
    disable(){
        this.control.enabled=true;
        return this;
    }
    pause(){
        this.isPaused=true;
        return this;
    }
    resume(){
        this.isPaused=false;
        return this;
    }
    dispose(){
        this.control.dispose();
        return this;
    }
    onChange(handler){
        this.control.addEventListener("change",()=>{
            if(!this.isPaused){
                this.#TARGET.renderGl()
                if(handler)handler()
            }
        });
        this.control.addEventListener('dragging-changed',( event )=>{
            this.#TARGET.cache.controls.orbit.enabled = ! event.value;
            console.log(this.#TARGET.cache.controls.orbit.enabled )
        })
        return this;
    }
    setMode(mode=this.mode){
        this.control.setMode(mode);
        return this;
    }
    attach(obj){
        this.control.attach(obj.mesh);
        return this;
    }
}

const ZikoTransformControls=target=>new ZikoThreeTransformControls(target);
export {ZikoTransformControls}