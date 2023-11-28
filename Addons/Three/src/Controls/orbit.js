import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


class ZikoThreeOrbitControls{
    #TARGET
    constructor(target){
        this.#TARGET=target;
        this.control=new OrbitControls(target.camera.currentCamera,target.rendererTarget.domElement);
        this.isPaused=false;
        this.onChange()

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
        return this;
    }
}
const ZikoOrbitControls=target=>new ZikoThreeOrbitControls(target);
export {ZikoOrbitControls}