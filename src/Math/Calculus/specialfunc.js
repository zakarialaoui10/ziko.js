import { mapfun } from "../Utils";
import { fact } from "../Functions";
const _gamma=x=>{
    // Coefficients for the Lanczos approximation
    const g = 7;
    const p = [
        0.99999999999980993,
        676.5203681218851,
        -1259.1392167224028,
        771.32342877765313,
        -176.61502916214059,
        12.507343278686905,
        -0.13857109526572012,
        9.9843695780195716e-6,
        1.5056327351493116e-7
    ];
    if (x < 0.5) {
        return +(Math.PI / (Math.sin(Math.PI * x) * _gamma(1 - x))).toFixed(10);
    }
    x -= 1;
    let a = p[0];
    for (let i = 1; i < g + 2; i++) {
        a += p[i] / (x + i);
    }
    const t = x + g + 0.5;
    return +(Math.sqrt(2 * Math.PI) * Math.pow(t, (x + 0.5)) * Math.exp(-t) * a).toFixed(10);
}
const _bessel=(n, x)=>{
    const maxTerms = 100;
    let result = 0;
    for (let k = 0; k < maxTerms; k++) {
        const numerator = Math.pow(-1, k) * Math.pow(x / 2, n + 2 * k);
        const denominator = fact(k) * fact(n + k);
        result += numerator / denominator;
    }
    return result;
}
const _beta=(x, y)=>{
    const lowerLimit = 0;
    const upperLimit = 1;
    const intervals = 1000;
    let result = 0;

    const f = (t) => Math.pow(t, x - 1) * Math.pow(1 - t, y - 1);
    const h = (upperLimit - lowerLimit) / intervals;

    result += 0.5 * (f(lowerLimit) + f(upperLimit));

    for (let i = 1; i < intervals; i++) {
        const xi = lowerLimit + i * h;
        result += f(xi);
    }

    return result * h;
}
const gamma=(...x)=>mapfun(_gamma,...x);
const bessel=(n,x)=>{
    if(typeof n === "number"){
        if(typeof n === "number")return _bessel(n,x);
        else console.warn("Not supported yet")
    }
    else if(n instanceof Array){
        if(typeof x === "number") return mapfun(a=>_bessel(a,x),...n);
        else if(x instanceof Array){
            const Y=[];
            for(let i=0;i<n.length;i++){
                Y.push(mapfun(a=>_bessel(n[i],a),...x))
            }
            return Y;
        }
    }
}
const beta=(x,y)=>{
    if(typeof x === "number"){
        if(typeof x === "number")return _beta(x,y);
        else console.warn("Not supported yet")
    }
    else if(x instanceof Array){
        if(typeof y === "number") return mapfun(a=>_beta(a,y),...x);
        else if(y instanceof Array){
            const Z=[];
            for(let i=0;i<x.length;i++){
                Z.push(mapfun(a=>_beta(x[i],a),...y))
            }
            return Z;
        }
    }
}
export{
    gamma,
    bessel,
    beta
}

