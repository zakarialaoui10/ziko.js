import * as THREE from "three"
import { 
    ZikoUIImage,
    ZikoUICanvas
 } from "ziko";
import { 
    image2texture,
    canvas2texture
 } from "../Loaders/index";
export function MaterialComposer(){
    return {
        useBasic(){
            this.material.useMeshBasicMaterial();
            this._Maintain();
            return this;
        },
        usePhong(){
            this.material.useMeshPhongMaterial();
            this._Maintain();
            return this;
        },
        useDepth(){
            this.material.useMeshDepthMaterial();
            this._Maintain();
            return this;
        },
        useLambert(){
            this.material.useMeshLambertMaterial();
            this._Maintain();
            return this;
        },
        usePhysical(){
            this.material.useMeshPhysicalMaterial();
            this._Maintain();
            return this;
        },
        useNormal(){
            this.material.useMeshNormalMaterial();
            this._Maintain();
            return this;
        },
        useStandard(){
            this.material.useMeshStandardMaterial();
            this._Maintain();
            return this;
        },
        useDistance(){
            this.material.useMeshDistanceMaterial();
            this._Maintain();
            return this;
        },
        useMatcap(){
            this.material.useMeshMatcapMaterial();
            this._Maintain();
            return this;
        },
        useToon(){
            this.material.useMeshToonMaterial();
            this._Maintain();
            return this;
        },
        useLineBasic(){
            this.material.useLineBasicMaterial();
            this._Maintain();
            return this;
        },
        useLineDashed(){
            this.material.useLineDashedMaterial();
            this._Maintain();
            return this;
        },
        usePoints(){
            this.material.usePointsMaterial();
            this._Maintain();
            return this;
        },

        color:function(color,render=true){
            this.element.material.color=new THREE.Color(color);
            if(render)this.render();
            return this;
        },
        side:function(){

        },
        wireframe:function(bool,render=true){
            this.element.material.wireframe=bool;
            if(render)this.render();
            return this;
        },
        opacity:function(n=1,render=true){
            this.transparent(true,false);
            this.element.material.opacity=n;
            if(render)this.render()
            return this;
        },
        transparent:function(bool,render=true){
            this.element.material.transparent=bool;
            this.render();          
        },
        texture:function(texture,render=true){
            if(texture instanceof THREE.Texture){
                this.element.material.map=texture;
            }
            if(texture instanceof ZikoUIImage){
                this.element.material.map=image2texture(texture);
            }
            if(texture instanceof ZikoUICanvas){
                this.element.material.map=canvas2texture(texture);
            }
            this.element.material.needsUpdate=true;
            //this?.parent.renderGl()
            if(render)this.render()
            return this;
        }
    }
}