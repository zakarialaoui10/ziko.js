import { mapfun } from "../../Utils/index.js";
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
    beta
}