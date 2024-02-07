import { fact } from "../Functions";
import { mapfun } from "../Utils";
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
export {bessel}