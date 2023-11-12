import { mapFun } from "./utils.js";
//import ZikoMath from "./index.js"
//import{Matrix} from "../Matrix/index.js"
//import{complex, Complex} from "./Complex.js"
// var a=complex(1,1)
// console.log(a instanceof Complex)
//mapArgs=(fun,...args1)=>(...args2)=>new Array(args1.length).fill(null).map((n,i)=>fun(args1[i],args2[i]))

function abs(...x){
    return mapFun(Math.abs,...x);
}
function sqrt(...x){
    return mapFun(Math.sqrt,...x);
}
function pow(...x){
    //return n=>mapFun(a=>Math.pow(a,n),...x)
    const n=x.pop();
    return mapFun(a=>Math.pow(a,n),...x)
}
function sqrtn(...x){
    const n=x.pop();
    return mapFun(a=>e(ln(a) / n),...x)
}
function e(...x){
    return mapFun(Math.exp,...x);
}
function ln(...x){
    return mapFun(Math.log,...x);
}
function cos(...x){
    return mapFun(a=>+Math.cos(a).toFixed(15),...x);
}
function sin(...x){
    return mapFun(a=>+Math.sin(a).toFixed(15),...x);
}
function tan(...x){
    return mapFun(a=>+Math.tan(a).toFixed(15),...x);
}
function sec(...x){
    return mapFun(a=>+1/Math.cos(a).toFixed(15),...x);
}
function csc(...x){
    return mapFun(a=>+1/Math.sin(a).toFixed(15),...x);
}
function cot(...x){
    return mapFun(a=>+1/Math.tan(a).toFixed(15),...x);
}
function acos(...x){
    return mapFun(a=>+Math.acos(a).toFixed(15),...x);
}
function asin(...x){
    return mapFun(a=>+Math.asin(a).toFixed(15),...x);
}
function atan(...x){
    return mapFun(a=>+Math.atan(a).toFixed(15),...x);
}
function acot(...x){
    return mapFun(a=>+Math.PI/2-Math.atan(a).toFixed(15),...x);
}
function cosh(...x){
    return mapFun(a=>+Math.cosh(a).toFixed(15),...x);
}
function sinh(...x){
    return mapFun(a=>+Math.sinh(a).toFixed(15),...x);
}
function tanh(...x){
    return mapFun(a=>+Math.tanh(a).toFixed(15),...x);
}
function coth(...x){
    return mapFun(n=>+(1/2*Math.log((1+n)/(1-n))).toFixed(15),...x);
}
function acosh(...x){
    return mapFun(a=>+Math.acosh(a).toFixed(15),...x);
}
function asinh(...x){
    return mapFun(a=>+Math.asinh(a).toFixed(15),...x);
}
function atanh(...x){
    return mapFun(a=>+Math.atanh(a).toFixed(15),...x);
}
function ceil(...x){
    return mapFun(Math.ceil,...x);
}
function floor(...x){
    return mapFun(Math.floor,...x);
}
function round(...x){
    return mapFun(Math.round,...x);
}
function atan2(...x){
    const n=x.pop();
    return mapFun(a=>Math.atan2(a,n),...x)
}
function fact(...x){
    return mapFun(n=> {
        let i,
        y = 1;
        if (n == 0) y = 1;
        else if (n > 0) for (i = 1; i <= n; i++) y *= i;
        else y = NaN;
        return y;
    },...x);
} 
function sign(...x){
    return mapFun(Math.sign,...x);
}
function sig(...x){
    return mapFun(n=>1/(1+e(-n)),...x);
}


var min = (...x) => Math.min(...x);
var max = (...x) => Math.max(...x);
var hypot = Math.hypot;
export{
    cos,
    sin,
    tan,
    cot,
    sec,
    csc,
    abs,
    sqrt,
    pow,
    sqrtn,
    e,
    ln,
    acos,
    asin,
    atan,
    acot,
    cosh,
    sinh,
    tanh,
    coth,
    acosh,
    asinh,
    atanh,
    min,
    max,
    sign,
    floor,
    ceil,
    round,
    fact,
    hypot,
    sig,
    atan2,
  };