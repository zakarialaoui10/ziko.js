import { mapfun } from "../Utils";
import { abs , sinc , sign , sin } from "../Functions/index.js"
import { Random } from "../Random/index.js";
import { 
    zeros,
    ones,
    nums,
    arange,
    linspace,
    logspace,
    geomspace,
    map,
    norm,
    lerp,
    clamp,
} from "./functions.js";
import { conv1d, conv2d } from "./conv.js";
const Signal={
    zeros,
    ones,
    nums,
    arange,
    linspace,
    logspace,
    geomspace,
    map,
    norm,
    lerp,
    clamp,
    noise(n,min = 0,max = 1){
        return Random.floats(n,min,max);
    },
    echelon(t,t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t];
        const Y = mapfun(n=>n>=t0?1:0,...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    rampe(t,t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t]
        const Y = mapfun(n=>n>=t0?n-t0:0,...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    sign(t,t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t]
        const Y = mapfun(n=>Math.sign(n-t0),...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    rect(t,T,t0 = 0){
        if(!(t instanceof Array))t=[t];
        const Y = mapfun(n=>((t0-T/2 < n) && (t0+T/2 > n)? 1 - 2 * abs(n/T) : 0),...t)
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    tri(t,T,t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n=>((t0-T/2 < n) && (t0+T/2 > n)? 1 - 2 * abs(n/T) : 0),...t)
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A;
    },
    dirac(t,t0){
        return mapfun(n=>n===t0?Infinity:0,...t);
    },
    lorentz(t , t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n => 1/(1+(n-t0)**2),...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A;
    },
    sinc(t , t0 , A = 1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n=>sinc(n-t0),...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A;
    },
    square(t,T=1,A=1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n=>sign(sin(n*2*Math.PI/T)),...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A;
    },
    sawtooth(){

    },
    conv1d,
    conv2d,
    
}
export{Signal}