import {PerspectiveCamera,OrthographicCamera,CameraHelper} from "three";
import * as THREE from "three"
class ZikoTHREECamera{
	#PERSPECTIVE_CAMERA
	#ORTHOGRAPHIC_CAMERA
	constructor(width,height,near=0.1,far=1000){
		this.parent=null;
		this.width=width;
		this.height=height;
		this.near=near;
		this.far=far;
		this.#PERSPECTIVE_CAMERA=new PerspectiveCamera(this.fov,this.aspect,this.near,this.far);
		this.currentCamera=this.#PERSPECTIVE_CAMERA;
		this.fov=50;
		this.pD=10;
		this.oD=120;
		this.#ORTHOGRAPHIC_CAMERA=new OrthographicCamera(this.left,this.right,this.top,this.bottom,this.near,this.far);
	}
	#maintain(){
		if(this.parent)this.parent.renderGl()
		return this;
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
		return this.width/this.height;
	}
	get halfFovV(){
		return THREE.MathUtils.DEG2RAD * this.fov * 0.5;
	}
	get halfFovH(){
		return Math.atan((this.width/this.height) * Math.tan( this.halfFovV ) );
	}
	get halfH(){
		return this.pD*Math.tan(this.halfFovH)
	}
	get halfV(){
		return this.pD*Math.tan(this.halfFovV)
	}
	posX(x=this.POSX){
		this.currentCamera.position.x=x;
		this.#maintain()
		return this;
	}
	posY(y=this.POSY){
		this.currentCamera.position.y=y;
		this.#maintain()
		return this;
	}
	posZ(z=this.POSZ){
		this.currentCamera.position.z=z;
		this.#maintain()
		return this;
	}
	get POSX(){
		return this.currentCamera.position.x;
	}
	get POSY(){
		return this.currentCamera.position.y;
	}
	get POSZ(){
		return this.currentCamera.position.z;
	}
	pos(x=this.POSX,y=this.POSY,z=this.POSZ){
		this.currentCamera.position.set(x,y,z);
		this.#maintain()
		return this;
	}
	rotX(x=this.ROTX){
		this.currentCamera.rotation.x=x;
		this.#maintain()
		return this;
	}
	rotY(y=this.ROTY){
		this.currentCamera.rotation.y=y;
		this.#maintain()
		return this;
	}
	rotZ(z=this.ROTZ){
		this.currentCamera.rotation.z=z;
		this.#maintain()
		return this;
	}
	get ROTX(){
		return this.currentCamera.rotation.x;
	}
	get ROTY(){
		return this.currentCamera.rotation.y;
	}
	get ROTZ(){
		return this.currentCamera.rotation.z;
	}
	rot(x=this.ROTX,y=this.ROTY,z=this.ROTZ){
		this.currentCamera.rotation.set(x,y,z);
		this.#maintain()
		return this;
	}
	usePerspective(){
		this.currentCamera=this.#PERSPECTIVE_CAMERA;
		this.currentCamera.position.set(0,0,this.pD);
		this.#maintain()
		return this;
	}
	useOrthographic(){
		this.currentCamera= this.#ORTHOGRAPHIC_CAMERA
		this.currentCamera.position.set(0,0,this.oD);
		this.#maintain()
		return this;
	}
	get Helper(){
		return new CameraHelper(this.currentCamera)
	}
}

export const ZikoCamera=(w,h,n,f)=>new ZikoTHREECamera(w,h,n,f)