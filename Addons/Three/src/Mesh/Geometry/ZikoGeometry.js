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
export {ZikoTHREEGeometry}