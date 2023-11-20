export function GeometryComposer(){
    return {
        _setGeometry:function(){

        },
        posX:function(x=this.POSX){
			this.mesh.position.x=x;
			return this;
        },
        posY:function(y=this.POSY){
			this.mesh.position.y=y;
			return this;
        },
        posZ:function(z=this.POSZ){
			this.mesh.position.z=z;
			return this;
        },
        pos:function(x,y,z){
			this.mesh.rotation.set(x,y,z);
			return this;
        },
		tarnslateX:function(dx=0){
			this.mesh.position.x=this.POSX+dx;
			return this;
        },
        translateY:function(dy=0){
			this.mesh.position.y=this.POSY+dy;
			return this;
        },
        translateZ:function(dz=0){
			this.mesh.position.z=this.POSZ+dz;
			return this;
        },
        pos:function(x,y,z){
			this.mesh.rotation.set(x,y,z);
			return this;
        },
        rotX:function(x=this.ROTX){
			this.mesh.rotation.x=x;
			return this;
        },
        rotY:function(y=this.ROTY){
			this.mesh.rotation.y=y;
			return this;            
        },
        rotZ:function(z=this.ROTZ){
			this.mesh.rotation.z=z;
			return this;            
        },
        rot:function(x,y,z){
			this.mesh.rotation.set(x,y,z);
			return this;
        },
		scaleX:function(x){
			this.mesh.scale.x=x;
			return this;
        },
        scaleY:function(y){
			this.mesh.scale.y=y;
			return this;            
        },
        scaleZ:function(z){
			this.mesh.scale.z=z;
			return this;            
        },
        scale:function(x,y,z){
			this.mesh.scale.set(x,y,z);
			return this;
        },
    }
}
class ZikoTHREEGeometry{
	setGeometry(Geometry){
		this.Geometry=Geometry;
		this.mesh.geometry=this.Geometry;
		return this;
	}
	render(){
		if(this.parent)this.parent.renderGl()
	}
	posX(x=this.POSX){
		this.mesh.position.x=x;
		this.render();
		return this;
	}
	posY(y=this.POSY){
		this.mesh.position.y=y;
		this.render();
		return this;
	}
	posZ(z=this.POSZ){
		this.mesh.position.z=z;
		this.render();
		return this;
	}
	get POSX(){
		return this.mesh.position.x;
	}
	get POSY(){
		return this.mesh.position.y;
	}
	get POSZ(){
		return this.mesh.position.z;
	}
	pos(x=this.POSX,y=this.POSY,z=this.POSZ){
		this.mesh.position.set(x,y,z);
		this.render();
		return this;
	}
	rotX(x=this.ROTX){
		this.mesh.rotation.x=x;
		this.render();
		return this;
	}
	rotY(y=this.ROTY){
		this.mesh.rotation.y=y;
		this.render();
		return this;
	}
	rotZ(z=this.ROTZ){
		this.mesh.rotation.z=z;
		this.render();
		return this;
	}
	get ROTX(){
		return this.mesh.rotation.x;
	}
	get ROTY(){
		return this.mesh.rotation.y;
	}
	get ROTZ(){
		return this.mesh.rotation.z;
	}
	rot(x=this.ROTX,y=this.ROTY,z=this.ROTZ){
		this.mesh.rotation.set(x,y,z);
		this.render();
		return this;
	}
}