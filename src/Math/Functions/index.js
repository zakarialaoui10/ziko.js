import { mapfun } from "../Utils/mapfun.js";
import { min,max }from "../Utils/statistics.js"
function abs(...x){
    return mapfun(Math.abs,...x);
}
function sqrt(...x){
    return mapfun(Math.sqrt,...x);
}
function pow(...x){
    const n=x.pop();
    return mapfun(a=>Math.pow(a,n),...x)
}
function sqrtn(...x){
    const n=x.pop();
    return mapfun(a=>e(ln(a) / n),...x)
}
function e(...x){
    return mapfun(Math.exp,...x);
}
function ln(...x){
    return mapfun(Math.log,...x);
}
function cos(...x){
    return mapfun(a=>+Math.cos(a).toFixed(15),...x);
}
function sin(...x){
    return mapfun(a=>+Math.sin(a).toFixed(15),...x);
}
function tan(...x){
    return mapfun(a=>+Math.tan(a).toFixed(15),...x);
}
function sec(...x){
    return mapfun(a=>+1/Math.cos(a).toFixed(15),...x);
}
function csc(...x){
    return mapfun(a=>+1/Math.sin(a).toFixed(15),...x);
}
function cot(...x){
    return mapfun(a=>+1/Math.tan(a).toFixed(15),...x);
}
function acos(...x){
    return mapfun(a=>+Math.acos(a).toFixed(15),...x);
}
function asin(...x){
    return mapfun(a=>+Math.asin(a).toFixed(15),...x);
}
function atan(...x){
    return mapfun(a=>+Math.atan(a).toFixed(15),...x);
}
function acot(...x){
    return mapfun(a=>+Math.PI/2-Math.atan(a).toFixed(15),...x);
}
function cosh(...x){
    return mapfun(a=>+Math.cosh(a).toFixed(15),...x);
}
function sinh(...x){
    return mapfun(a=>+Math.sinh(a).toFixed(15),...x);
}
function tanh(...x){
    return mapfun(a=>+Math.tanh(a).toFixed(15),...x);
}
function coth(...x){
    return mapfun(n=>+(1/2*Math.log((1+n)/(1-n))).toFixed(15),...x);
}
function acosh(...x){
    return mapfun(a=>+Math.acosh(a).toFixed(15),...x);
}
function asinh(...x){
    return mapfun(a=>+Math.asinh(a).toFixed(15),...x);
}
function atanh(...x){
    return mapfun(a=>+Math.atanh(a).toFixed(15),...x);
}
function ceil(...x){
    return mapfun(Math.ceil,...x);
}
function floor(...x){
    return mapfun(Math.floor,...x);
}
function round(...x){
    return mapfun(Math.round,...x);
}
function atan2(...x){
    const n=x.pop();
    return mapfun(a=>Math.atan2(a,n),...x)
}
function fact(...x){
    return mapfun(n=> {
        let i,
        y = 1;
        if (n == 0) y = 1;
        else if (n > 0) for (i = 1; i <= n; i++) y *= i;
        else y = NaN;
        return y;
    },...x);
} 
function sign(...x){
    return mapfun(Math.sign,...x);
}
function sig(...x){
    return mapfun(n=>1/(1+e(-n)),...x);
}

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