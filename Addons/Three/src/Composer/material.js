import * as THREE from "three"
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

        color:function(color){
            this.mesh.material.color=new THREE.Color(color);
            this.render();
            return this;
        },
        side:function(){

        },
        wireframe:function(bool){
            this.mesh.material.wireframe=bool;
            this.render();
        },
        opacity:function(n=1){
            this.transparent(true);
            this.mesh.material.opacity=n;
            this.render()
        },
        transparent:function(bool){
            this.mesh.material.transparent=bool;
            this.render();          
        },
        texture:function(){
            
        }
    }
}