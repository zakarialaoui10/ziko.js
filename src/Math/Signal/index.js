import { mapfun } from "../Utils";
import { abs } from "../Functions/index.js"

var Signal={
    linspace(){

    },
    logspace(){

    },
    arange(){

    },
    echelon(t,t0 = 0){
        if(!(t instanceof Array))t=[t]
        return mapfun(n=>n>=t0?1:0,...t);
    },
    rampe(t,t0 = 0){
        if(!(t instanceof Array))t=[t]
        return mapfun(n=>n>=t0?n-t0:0,...t);
    },
    sign(t,t0 = 0){
        if(typeof t==="number")return Math.sign(t-t0);
    },
    rect(t,T,t0 = 0){
        if(!(t instanceof Array))t=[t];
        const Y = mapfun(n=>((t0-T/2 < n) && (t0+T/2 > n)? 1 - 2 * abs(n/T) : 0),...t)
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    tri(t,T,t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n=>((t0-T/2 < n) && (t0+T/2 > n)? 1 - 2 * abs(n/T) : 0),...t)
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    dirac(t,t0){
        return mapfun(n=>n===t0?Infinity:0,...t);
    },
    lorentz(t,t0=0){
        if(typeof t==="number")return 1/(1+(t-t0)**2);
    },
    sinc(){

    },
    square(){

    },
    sawtooth(){

    }
    
}
export{Signal}