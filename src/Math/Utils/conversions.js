import { mapfun } from "./mapfun.js";
const deg2rad=(...deg)=>mapfun(x=>x*Math.PI/180,...deg);
const rad2deg=(...rad)=>mapfun(x=>x/Math.PI*180,...rad);
export{
    deg2rad,
    rad2deg
}
