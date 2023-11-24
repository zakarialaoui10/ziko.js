import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Enable
// Disable
// Pause
// Resume
// Dispose
// Link 

class ZikoThreeOrbitControls{
    _CONTROL
    #TARGET
    constructor(target){
        this.#TARGET=target;
        this._CONTROL=new OrbitControls(target.camera.currentCamera,target.rendererGl.domElement);
        this.isPaused=false;
        this.onChange()

    }
    ctrl(){
        return this._CONTROL
    }
    enable(){
        this._CONTROL.enabled=true;
        return this;
    }
    disable(){
        this._CONTROL.enabled=true;
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
        this._CONTROL.dispose();
        return this;
    }
    onChange(handler){
        this._CONTROL.addEventListener("change",()=>{
            if(!this.isPaused){
                this.#TARGET.renderGl()
                if(handler)handler()
            }
        });
        return this;
    }
}

const ZikoOrbitControls=target=>new ZikoThreeOrbitControls(target);
export {ZikoOrbitControls}