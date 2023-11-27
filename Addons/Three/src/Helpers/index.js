class ZikoThreeHelper {
    constructor(){
        this.element=null;
        Object.assign(this, GeometryComposer.call(this));      
    }
}
import { GeometryComposer } from "../Composer";
class ZikoThreeGridHelper extends ZikoThreeHelper{
    constructor(n,m,color1,color2){
        super()
        this.element=new THREE.GridHelper(n,m,color1,color2);
        Object.assign(this, GeometryComposer.call(this));
    }
}
class ZikoThreePolarHelper extends ZikoThreeHelper{
    constructor(r,R,c,d){
        super()
        this.element=new THREE.PolarGridHelper(r,R,c,d);
    }
}

const gridHelper3=(n,m,color1,color2)=>new ZikoThreeGridHelper(n,m,color1,color2);
const polarHelper3=(r,R,c,d)=>new ZikoThreePolarHelper(r,R,c,d);

export{
    gridHelper3,
    polarHelper3
}