import { Complex } from "../Complex/index.js";
import { mapfun } from "../Utils/mapfun.js";
import { 
    min,
    max 
}from "../Statistics/functions.js";
import { 
    gamma,
    bessel,
    beta 
} from "../Calculus";
export const Fixed={
    cos:x=>+Math.cos(x).toFixed(15),
    sin:x=>+Math.sin(x).toFixed(15),
    tan:x=>+Math.tan(x).toFixed(31),
    sinc:x=>+Math.sin(Math.PI*x)/(Math.PI*x),
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
const abs=(...x)=>mapfun(Math.abs,...x);
const sqrt=(...x)=>mapfun(Math.sqrt,...x);
const pow=(x,n)=>{
    if(typeof x === "number"){
        if(typeof n === "number")return Math.pow(x,n);
        else if(n instanceof Complex)return Complex.fromExpo(x**n.a,n.b*ln(x))
        else return mapfun(a=>pow(x,a),...n);
    }
    else if(x instanceof Complex){
        if(typeof n === "number")return Complex.fromExpo(x.z**n,x.phi*n);
        else if(n instanceof Complex)return Complex.fromExpo(
            x.z**n.a*e(-x.phi*n.b),
            ln(x.z)*n.b+n.a*x.phi
        )
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
const sqrtn=(x,n)=>{
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
const e=(...x)=>mapfun(Math.exp,...x);
const ln=(...x)=>mapfun(Math.log,...x);
const cos=(...x)=>mapfun(Fixed.cos,...x);
const sin=(...x)=>mapfun(Fixed.sin,...x);
const tan=(...x)=>mapfun(Fixed.tan,...x);
const sec=(...x)=>mapfun(Fixed.sec,...x);
const sinc=(...x)=>mapfun(Fixed.sinc,...x)
const csc=(...x)=>mapfun(Fixed.csc,...x);
const cot=(...x)=>mapfun(Fixed.cot,...x);
const acos=(...x)=>mapfun(Fixed.acos,...x);
const asin=(...x)=>mapfun(Fixed.asin,...x);
const atan=(...x)=>mapfun(Fixed.atan,...x);
const acot=(...x)=>mapfun(Fixed.acot,...x);
const cosh=(...x)=>mapfun(Fixed.cosh,...x);
const sinh=(...x)=>mapfun(Fixed.sinh,...x);
const tanh=(...x)=>mapfun(Fixed.tanh,...x);
const coth=(...x)=>mapfun(Fixed.coth,...x);
const acosh=(...x)=>mapfun(Fixed.acosh,...x);
const asinh=(...x)=>mapfun(Fixed.asinh,...x);
const atanh=(...x)=>mapfun(Fixed.atanh,...x);
const ceil=(...x)=>mapfun(Math.ceil,...x);
const floor=(...x)=>mapfun(Math.floor,...x);
const round=(...x)=>mapfun(Math.round,...x);
const atan2=(x,y,rad=true)=>{
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
const fact=(...x)=>mapfun(n=> {
        let i,
        y = 1;
        if (n == 0) y = 1;
        else if (n > 0) for (i = 1; i <= n; i++) y *= i;
        else y = NaN;
        return y;
    },...x);
const sign=(...x)=>mapfun(Math.sign,...x);

const sig=(...x)=>mapfun(n=>1/(1+e(-n)),...x);

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
    sinc,
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
    gamma,
    bessel,
    beta
  };