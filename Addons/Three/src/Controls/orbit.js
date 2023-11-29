import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
class ZikoThreeOrbitControls{
    #TARGET
    constructor(target){
        this.#TARGET=target;
        this.control=new OrbitControls(target.camera.currentCamera,target.rendererTarget.domElement);
        this.isPaused=false;
        this.saved_state={
            position:new THREE.Vector3(),
            quaternion:new THREE.Quaternion()
        }
        this.onChange()

    }
    get currentState(){
        const state={
            position:new THREE.Vector3(),
            quaternion:new THREE.Quaternion()
        }
        state.position.copy(this.#TARGET.camera.currentCamera.position);
        state.quaternion.copy(this.#TARGET.camera.currentCamera.quaternion);
        return state;
    }
    save(){
        this.saved_state.position.copy(this.#TARGET.camera.currentCamera.position);
        this.saved_state.quaternion.copy(this.#TARGET.camera.currentCamera.quaternion);
        return this;
    }
    useState(state,renderGl=true,renderCss=true){
        let {position,quaternion}=state;
		if(!(position instanceof THREE.Vector3)){
			const {x,y,z}=position;
			position=new THREE.Vector3(x,y,z)
		}
		if(!(quaternion instanceof THREE.Quaternion)){
			const {_x,_y,_z,_w}=quaternion;
			quaternion=new THREE.Quaternion(_x,_y,_z,_w)
		}
		this.#TARGET.camera.currentCamera.position.copy(position);
        this.#TARGET.camera.currentCamera.quaternion.copy(quaternion);
		this.#TARGET.camera.currentCamera.updateMatrixWorld();
		if(renderGl)this.#TARGET?.renderGl()
		if(renderCss)this.#TARGET?.renderCss()
	}
    restore(renderGl=false,renderCss=false){
        this.useState(this.saved_state,renderGl,renderCss)
        return this;
    }
    enable(){
        this.restore();
        this.control.enabled=true;
        return this;
    }
    disable(){
        this.save()
        this.control.enabled=false;
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
        this.save();
        this.control.dispose();
        return this;
    }
    init(){
        this.control=new OrbitControls(this.#TARGET.camera.currentCamera,this.#TARGET.rendererTarget.domElement);
        this.restore();
        return this;
    }
    clear(){
        this.dispose();
        this.#TARGET.cache.controls.orbit=null;
        return null
    }
    onChange(handler,renderGl=true,renderCss=true){
        this.control.addEventListener("change",()=>{
            if(!this.isPaused){
                this.#TARGET.renderGl();
                if(renderGl)this.#TARGET.renderGl();
                if(this.#TARGET.cache.type==="css" && renderCss)this.#TARGET.renderCss();
                if(handler)handler();
            }
        });
        return this;
    }
}
const ZikoOrbitControls=target=>new ZikoThreeOrbitControls(target);
export {ZikoOrbitControls}