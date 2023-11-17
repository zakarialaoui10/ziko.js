import { Complex } from "../Complex/index.js";
import { mapfun } from "../Utils/mapfun.js";
import { min,max }from "../Utils/statistics.js";
export const Fixed={
    cos:x=>+Math.cos(x).toFixed(15),
    sin:x=>+Math.sin(x).toFixed(15),
    tan:x=>+Math.tan(x).toFixed(31),
    sec:x=>+1/Math.cos(x).toFixed(15),
    csc:x=>+1/Math.sin(x).toFixed(15),
    cot:x=>+1/Math.tan(x).toFixed(15),
    acos:x=>+Math.acos(x).toFixed(15),
    asin:x=>+Math.asin(x).toFixed(15),
    atan:x=>+Math.atan(x).toFixed(15),
    acot:x=>+Math.PI/2-Math.atan(x).toFixed(15),
    cosh:x=>+Math.cosh(x).toFixed(15),
    sinh:x=>+Math.sinh(x).toFixed(15),
    tanh:x=>+Math.tanh(x).toFixed(15),
    coth:n=>+(1/2*Math.log((1+n)/(1-n))).toFixed(15),
    acosh:x=>+Math.acosh(x).toFixed(15),
    asinh:x=>+Math.asinh(x).toFixed(15),
    atanh:x=>+Math.atanh(x).toFixed(15),


}
function abs(...x){
    return mapfun(Math.abs,...x);
}
function sqrt(...x){
    return mapfun(Math.sqrt,...x);
}
function pow(x,n){
    if(typeof x === "number"){
        if(typeof n === "number")return Math.pow(x,n);
        else if(n instanceof Complex)return Complex.fromExpo(x**n.a,n.b*ln(x))
        else return mapfun(a=>pow(x,a),...n);
    }
    else if(x instanceof Complex){
        if(typeof n === "number")return Complex.fromExpo(x.z**n,x.phi*n);
        else return mapfun(a=>pow(x,a),...n);
    }
    else if(x instanceof Array){
        if(typeof n === "number") return mapfun(a=>pow(a,n),...x);
        else if(n instanceof Array){
            const Y=[];
            for(let i=0;i<x.length;i++){
                Y.push(mapfun(a=>pow(x[i],a),...n))
            }
            return Y;
        }
    }
}
function sqrtn(x,n){
    if(typeof x === "number"){
        if(typeof n === "number")return Math.pow(x,1/n);
        else return mapfun(a=>sqrtn(x,a),...n);
    }
    else if(x instanceof Complex){
        if(typeof n === "number")return Complex.fromExpo(sqrtn(x.z,n),x.phi/n);
        else return mapfun(a=>sqrtn(x,a),...n);
    }
    else if(x instanceof Array){
        if(typeof n === "number") return mapfun(a=>sqrtn(a,n),...x);
        else if(n instanceof Array){
            const Y=[];
            for(let i=0;i<x.length;i++){
                Y.push(mapfun(a=>sqrtn(x[i],a),...n))
            }
            return Y;
        }
    }
}
function e(...x){
    return mapfun(Math.exp,...x);
}
function ln(...x){
    return mapfun(Math.log,...x);
}
function cos(...x){
    return mapfun(Fixed.cos,...x);
}
function sin(...x){
    return mapfun(Fixed.sin,...x);
}
function tan(...x){
    return mapfun(Fixed.tan,...x);
}
function sec(...x){
    return mapfun(Fixed.sec,...x);
}
function csc(...x){
    return mapfun(Fixed.csc,...x);
}
function cot(...x){
    return mapfun(Fixed.cot,...x);
}
function acos(...x){
    return mapfun(Fixed.acos,...x);
}
function asin(...x){
    return mapfun(Fixed.asin,...x);
}
function atan(...x){
    return mapfun(Fixed.atan,...x);
}
function acot(...x){
    return mapfun(Fixed.acot,...x);
}
function cosh(...x){
    return mapfun(Fixed.cosh,...x);
}
function sinh(...x){
    return mapfun(Fixed.sinh,...x);
}
function tanh(...x){
    return mapfun(Fixed.tanh,...x);
}
function coth(...x){
    return mapfun(Fixed.coth,...x);
}
function acosh(...x){
    return mapfun(Fixed.acosh,...x);
}
function asinh(...x){
    return mapfun(Fixed.asinh,...x);
}
function atanh(...x){
    return mapfun(Fixed.atanh,...x);
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
// function atan2(...x){
//     const n=x.pop();
//     return mapfun(a=>Math.atan2(a,n),...x)
// }
function atan2(x,y,rad=true){
    if(typeof x === "number"){
        if(typeof y === "number")return rad?Math.atan2(x,y):Math.atan2(x,y)*180/Math.PI;
        else return mapfun(a=>atan2(x,a,rad),...y);
    }
    // else if(x instanceof Complex){
    //     if(typeof n === "number")return Complex.fromExpo(x.z**n,x.phi*n);
    //     else return mapfun(a=>pow(x,a),...n);
    // }
    else if(x instanceof Array){
        if(typeof y === "number") return mapfun(a=>atan2(a,y,rad),...x);
        else if(y instanceof Array){
            const Y=[];
            for(let i=0;i<x.length;i++){
                Y.push(mapfun(a=>pow(x[i],a,rad),...y))
            }
            return Y;
        }
    }
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
const hypot=(...x)=>{
    if(x.every(n=>typeof n === "number"))return Math.hypot(...x);
    if(x.every(n=>n instanceof Array))return mapfun(
        Math.hypot,
        ...x
    )
}

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