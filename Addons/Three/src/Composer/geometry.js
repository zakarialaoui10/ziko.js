function maintain(){
	if(this.parent)this.parent.renderGl();
	return this;
}
export function GeometryComposer(){
    return {
        posX:function(x=this.POSX){
			this.mesh.position.x=x;
			maintain.call(this);
			return this;
        },
        posY:function(y=this.POSY){
			this.mesh.position.y=y;
			maintain.call(this);
			return this;
        },
        posZ:function(z=this.POSZ){
			this.mesh.position.z=z;
			maintain.call(this);
			return this;
        },
        pos:function(x,y,z){
			this.mesh.rotation.set(x,y,z);
			maintain.call(this);
			return this;
        },
		tarnslateX:function(dx=0){
			this.mesh.position.x=this.POSX+dx;
			maintain.call(this);
			return this;
        },
        translateY:function(dy=0){
			this.mesh.position.y=this.POSY+dy;
			maintain.call(this);
			return this;
        },
        translateZ:function(dz=0){
			this.mesh.position.z=this.POSZ+dz;
			maintain.call(this);
			return this;
        },
        translate:function(dx=0,dy=0,dz=0){
			this.mesh.rotation.set(
				this.POSX+dx,
				this.POSY+dy,
				this.POSZ+dz,
				);
			maintain.call(this);
			return this;
        },
        rotX:function(x=this.ROTX){
			this.mesh.rotation.x=x;
			maintain.call(this);
			return this;
        },
        rotY:function(y=this.ROTY){
			this.mesh.rotation.y=y;
			maintain.call(this);
			return this;            
        },
        rotZ:function(z=this.ROTZ){
			this.mesh.rotation.z=z;
			maintain.call(this);
			return this;            
        },
        rot:function(x,y,z){
			this.mesh.rotation.set(x,y,z);
			maintain.call(this);
			return this;
        },
		scaleX:function(x){
			this.mesh.scale.x=x;
			maintain.call(this);
			return this;
        },
        scaleY:function(y){
			this.mesh.scale.y=y;
			maintain.call(this);
			return this;            
        },
        scaleZ:function(z){
			this.mesh.scale.z=z;
			maintain.call(this);
			return this;            
        },
        scale:function(x,y,z){
			this.mesh.scale.set(x,y,z);
			maintain.call(this);
			return this;
        },
    }
}
