import { mapfun } from "../Utils";
import { abs } from "../Functions/index.js"

var Signal={
    linspace(){

    },
    logspace(){

    },
    arange(){

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
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    dirac(t,t0){
        return mapfun(n=>n===t0?Infinity:0,...t);
    },
    lorentz(t , t0 = 0 , A = 1){
        if(!(t instanceof Array))t=[t] 
        const Y = mapfun(n => 1/(1+(n-t0)**2),...t);
        return Y instanceof Array ? Y.map(n=>n*A) : Y*A
    },
    sinc(){

    },
    square(){

    },
    sawtooth(){

    }
    
}
export{Signal}