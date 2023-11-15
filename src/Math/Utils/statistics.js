const sum=(...x)=>{
    let s = x[0];
    for (let i = 1; i < x.length; i++) s += x[i];
    return s;
}
const prod=(...x)=> {
    let p = x[0];
    for (let i = 1; i < x.length; i++) p *= x[i];
    return p;
}
const min=(...num)=>{
    if(num.every(n=>typeof n==="number"))return Math.min(...num);
    const Y=[];
    for(let i=0;i<num.length;i++){
        if(num[i] instanceof Array)Y.push(min(...num[i]));
        else if(num[i] instanceof Object){
            Y.push(
                    Object.fromEntries(
                        [Object.entries(num[i]).sort((a,b)=>a[1]-b[1])[0]]
                    )
                )
        }
    }
    return Y
}
const max=(...num)=>{
    if(num.every(n=>typeof n==="number"))return Math.max(...num);
    const Y=[];
    for(let i=0;i<num.length;i++){
        if(num[i] instanceof Array)Y.push(min(...num[i]));
        else if(num[i] instanceof Object){
            Y.push(
                    Object.fromEntries(
                        [Object.entries(num[i]).sort((a,b)=>b[1]-a[1])[0]]
                    )
                )
        }
    }
    return Y
}
const accum=(...arr)=>{
    let acc = arr.reduce((x, y) => [...x, x[x.length - 1] + y], [0]);
        acc.shift();
        return acc;
}

// sort

console.log(min({a:2,c:3}))

export{
    sum,
    prod,
    min,
    max,
    accum
}
