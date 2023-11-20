import * as THREE from "three"
import { ZikoMesh } from "../ZikoThreeMesh.js";
const cube3=(l)=>new ZikoMesh(new THREE.BoxGeometry(l,l,l));
const plan3=(w,h)=>new ZikoMesh(new THREE.PlaneGeometry(w,h,100,100));
const line3=(p0,p1)=>{
	var points = [p0,p1].map(pts=>new THREE.Vector3(...pts));
	var geometry = new THREE.BufferGeometry().setFromPoints(points);
	return new THREE.Line(geometry);
};
const cuboid3=(l,L,h)=>new ZikoMesh(new THREE.BoxGeometry(l,L,h));
const cylindre3=(rT,rB,h)=>new ZikoMesh(new THREE.CylinderGeometry(rT,rB,h,100));
const sphere3=(r,config={})=>{
	const parameters={width:50,height:50,phi:[0,2*PI],theta:[0,2*PI]};
	Object.assign(parameters,config);
	const {width,height,phi,theta}=parameters;
	return new ZikoMesh(new THREE.SphereGeometry(r,width,height,phi[0],phi[1],theta[0],theta[1]));
}  
const cone3=(r,h)=>new ZikoMesh(new THREE.ConeGeometry(r,h,100));
const torus3=(r,tubeRadius)=>new ZikoMesh(new THREE.TorusGeometry(r,tubeRadius,100,100,2*PI));  
const ring=(innerRadius=1, outerRadius=2, thetaSegments=20)=>new ZikoMesh(new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments));
const torusKnot3=(r,tube,tubularSegments,radialSegments,p,q)=>new ZikoMesh(new THREE.TorusKnotGeometry(r,tube,tubularSegments,radialSegments,p,q));
const tetradron3=(r)=>new ZikoMesh(new THREE.TetrahedronGeometry(r));
const dodecahedron3=(r)=>new ZikoMesh(new THREE.DodecahedronGeometry(r));
const icosahedron3=(r)=>new ZikoMesh(new THREE.IcosahedronGeometry(r));
const octahedron3=(r)=>new ZikoMesh(new THREE.OctahedronGeometry(r));
export{
    cube3,
    plan3,
    line3,
    cuboid3,
    cylindre3,
    sphere3,
    cone3,
    torus3,
    ring,
    torusKnot3,
    tetradron3,
    dodecahedron3,
    icosahedron3,
    octahedron3
}