import {PerspectiveCamera,OrthographicCamera,CameraHelper} from "three";
import * as THREE from "three"
class ZikoTHREECamera{
	#PERSPECTIVE_CAMERA
	#ORTHOGRAPHIC_CAMERA
	constructor(w,h,near=0.1,far=1000){
		this.parent=null;
		this.w=w;
		this.h=h;
		this.near=near;
		this.far=far;
		this.#PERSPECTIVE_CAMERA=new PerspectiveCamera(this.fov,this.aspect,this.near,this.far);
		this.currentCamera=this.#PERSPECTIVE_CAMERA;
		this.fov=50;
		this.pD=10;
		this.oD=120;
		this.saved_state={
            position:new THREE.Vector3(),
            quaternion:new THREE.Quaternion()
        }
	}
	#maintain(){
		if(this.parent)this.parent.renderGl()
		return this;
	}
	save(){
        this.saved_state.position.copy(this.currentCamera.position);
        this.saved_state.quaternion.copy(this.currentCamera.quaternion);
        return this;
    }
    restore(renderGl=false,renderCss=false){
		this.useState(this.saved_state,renderGl,renderCss)
        return this;
    }
	useState(state,renderGl=true,renderCss=true){
		this.currentCamera.position.copy(state.position);
        this.currentCamera.quaternion.copy(state.quaternion);
		this.currentCamera.updateMatrixWorld();
		if(renderGl)this.parent?.renderGl()
		if(renderCss)this.parent?.renderCss()
	}
	get left(){
		return -this.pD*Math.tan(this.halfFovH);
	}
	get right(){
		return this.pD*Math.tan(this.halfFovH);
	}
	get top(){
		return this.pD*Math.tan(this.halfFovV);
	}
	get bottom(){
		return -this.pD*Math.tan(this.halfFovV);
	}
	get aspect(){
		return this.w/this.h;
	}
	get halfFovV(){
		return THREE.MathUtils.DEG2RAD * this.fov * 0.5;
	}
	get halfFovH(){
		return Math.atan((this.parent.Width/this.parent.Height) * Math.tan( this.halfFovV ) );
	}
	get halfH(){
		return this.pD*Math.tan(this.halfFovH)
	}
	get halfV(){
		return this.pD*Math.tan(this.halfFovV)
	}
	posX(x=this.px){
		this.currentCamera.position.x=x;
		this.#maintain()
		return this;
	}
	posY(y=this.py){
		this.currentCamera.position.y=y;
		this.#maintain()
		return this;
	}
	posZ(z=this.pz){
		this.currentCamera.position.z=z;
		this.#maintain()
		return this;
	}
	get px(){
		return this.currentCamera.position.x;
	}
	get py(){
		return this.currentCamera.position.y;
	}
	get pz(){
		return this.currentCamera.position.z;
	}
	pos(x=this.px,y=this.py,z=this.pz){
		this.currentCamera.position.set(x,y,z);
		this.#maintain()
		return this;
	}
	rotX(x=this.rx){
		this.currentCamera.rotation.x=x;
		this.#maintain()
		return this;
	}
	rotY(y=this.ry){
		this.currentCamera.rotation.y=y;
		this.#maintain()
		return this;
	}
	rotZ(z=this.rz){
		this.currentCamera.rotation.z=z;
		this.#maintain()
		return this;
	}
	get rx(){
		return this.currentCamera.rotation.x;
	}
	get ry(){
		return this.currentCamera.rotation.y;
	}
	get rz(){
		return this.currentCamera.rotation.z;
	}
	rot(x=this.rx,y=this.ry,z=this.rz){
		this.currentCamera.rotation.set(x,y,z);
		this.#maintain()
		return this;
	}
	usePerspective(){
		if(!this.#PERSPECTIVE_CAMERA)this.#PERSPECTIVE_CAMERA=new PerspectiveCamera(this.fov,this.aspect,this.near,this.far);
		this.currentCamera=this.#PERSPECTIVE_CAMERA;
		this.currentCamera.position.set(0,0,this.pD);
		this.parent.cache.controls.orbit.control.object=this.currentCamera;
		this.#maintain()
		return this;
	}
	useOrthographic(){
		if(!this.#ORTHOGRAPHIC_CAMERA)this.#ORTHOGRAPHIC_CAMERA=new OrthographicCamera(this.left,this.right,this.top,this.bottom,this.near,this.far);
		this.currentCamera= this.#ORTHOGRAPHIC_CAMERA;
		this.currentCamera.position.set(0,0,this.oD);
		this.parent.cache.controls.orbit.control.object=this.currentCamera;

		this.#maintain()
		return this;
	}
	get Helper(){
		return new CameraHelper(this.currentCamera)
	}
	useState(state){

	}
}

export const ZikoCamera=(w,h,n,f)=>new ZikoTHREECamera(w,h,n,f)