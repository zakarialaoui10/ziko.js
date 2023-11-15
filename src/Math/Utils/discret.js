const cartesianProduct=(a, b)=>a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);
const pgcd=(n1, n2)=>{
    let i,
        pgcd = 1;
    if (n1 == floor(n1) && n2 == floor(n2)) {
        for (i = 2; i <= n1 && i <= n2; ++i) {
            if (n1 % i == 0 && n2 % i == 0) pgcd = i;
        }
        return pgcd;
    } else console.log("error");
}
const ppcm=(n1, n2)=>{
    let ppcm;
    if (n1 == floor(n1) && n2 == floor(n2)) {
        ppcm = n1 > n2 ? n1 : n2;
        while (true) {
            if (ppcm % n1 == 0 && ppcm % n2 == 0) break;
            ++ppcm;
        }
        return ppcm;
    } else console.log("error");
}
export{
    cartesianProduct,
    ppcm,
    pgcd
}