import * as THREE from "three"
import { waitElm } from "../Utils";
import { image2texture } from "../Loaders/image";
import { ZikoUIImage } from "ziko";
import { 
    ZikoOrbitControls, 
    ZikoTransformControls 
} from "../Controls";
export function SceneComposer(){
    return {
        size:function(w = "100%", h = "100%") {
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
        },
        maintain:function(){
            this.camera.currentCamera.aspect=(this.element.clientWidth)/(this.element.clientHeight); 
            this.camera.currentCamera.updateProjectionMatrix();
            this.rendererGl.setSize(this.element.clientWidth,this.element.clientHeight);
            for (let i = 0; i < this.items.length; i++)
            Object.assign(this, { [[i]]: this.items[i] });
            this.length = this.items.length;
            this.renderGl()
            return this;
        },
        clone:function(){

        },
        background:function(texture){
            if(typeof texture === "string"){
                if((texture.length===7||texture.length===4)&&texture[0]==="#")this.sceneGl.background=new THREE.Color(texture);
            }
            if(texture instanceof THREE.Texture){
                this.sceneGl.background=texture;
            }
            if(texture instanceof ZikoUIImage){
                this.sceneGl.background=image2texture(texture);
            }
            this.renderGl();
            return this;
        },
        posX:function(x=this.POSX){
			this.sceneGl.position.x=x;
			this.renderGl();
			return this;
        },
        posY:function(y=this.POSY){
			this.sceneGl.position.y=y;
			this.renderGl();
			return this;
        },
        posZ:function(z=this.POSZ){
			this.sceneGl.position.z=z;
			this.renderGl();
			return this;
        },
        pos:function(x,y,z){
			this.sceneGl.rotation.set(x,y,z);
			this.renderGl();
			return this;
        },
		tarnslateX:function(dx=0){
			this.sceneGl.position.x=this.POSX+dx;
			this.renderGl();
			return this;
        },
        translateY:function(dy=0){
			this.sceneGl.position.y=this.POSY+dy;
			this.renderGl();
			return this;
        },
        translateZ:function(dz=0){
			this.sceneGl.position.z=this.POSZ+dz;
			this.renderGl();
			return this;
        },
        translate:function(dx=0,dy=0,dz=0){
			this.sceneGl.rotation.set(
				this.POSX+dx,
				this.POSY+dy,
				this.POSZ+dz,
				);
			this.renderGl();
			return this;
        },
        rotX:function(x=this.ROTX){
			this.sceneGl.rotation.x=x;
			this.renderGl();
			return this;
        },
        rotY:function(y=this.ROTY){
			this.sceneGl.rotation.y=y;
			this.renderGl();
			return this;            
        },
        rotZ:function(z=this.ROTZ){
			this.sceneGl.rotation.z=z;
			this.renderGl();
			return this;            
        },
        rot:function(x,y,z){
			this.sceneGl.rotation.set(x,y,z);
			this.renderGl();
			return this;
        },
        fog:function(color,near,far){

        },
        toImage(){

        },
        toVideo(){

        },
        fromJson:function(color,near,far){

        },
        toJson:function(){

        },
        useOrbitControls(){
            if(!this.cache.controls.orbit)this.cache.controls.orbit=ZikoOrbitControls(this);
            return this;
        },
        useTransformControls(){
            if(!this.cache.controls.orbit)this.cache.controls.transform=ZikoTransformControls(this);
            return this;
        }
    }
}