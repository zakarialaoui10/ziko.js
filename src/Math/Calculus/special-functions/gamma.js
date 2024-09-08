import { mapfun } from "../../Utils/mapfun.js";
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
const gamma=(...x)=>mapfun(_gamma,...x);
export{
    gamma
}