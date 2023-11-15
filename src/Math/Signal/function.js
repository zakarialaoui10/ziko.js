import { Complex , complex } from "../Complex";
const zeros=(n)=>new Array(n).fill(0);
const ones=(n)=>new Array(n).fill(1);
const nums=(num,n)=>new Array(n).fill(num);
const norm=(value, min, max)=>{
    if (typeof value === "number") return min !== max ? (value - min) / (max - min) : 0;
    else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, norm(value.arr.flat(1), min, max));
    else if (value instanceof Complex) return new Complex(norm(value.a, min, max), norm(value.b, min, max));
    else if (value instanceof Array) {
        if (value.every((n) => typeof (n === "number"))) {
            return value.map((n) => norm(n, min, max));
        } else {
            let y = new Array(value.length);
            for (let i = 0; i < value.length; i++) {
                y[i] = norm(value[i]);
            }
        }
    }
}
const lerp=(value, min, max)=>{
    if (typeof value === "number") return (max - min) * value + min;
    else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, lerp(value.arr.flat(1), min, max));
    else if (value instanceof Complex) return new Complex(lerp(value.a, min, max), lerp(value.b, min, max));
    else if (value instanceof Array) {
        if (value.every((n) => typeof (n === "number"))) {
            return value.map((n) => lerp(n, min, max));
        } else {
            let y = new Array(value.length);
            for (let i = 0; i < value.length; i++) {
                y[i] = lerp(value[i]);
            }
        }
    }
}
const map=(value, a, b, c, d)=>{
    if (typeof value === "number") return lerp(norm(value, a, b), c, d);
    else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, map(value.arr.flat(1), a, b, c, d));
    else if (value instanceof Complex) return new Complex(map(value.a, b, c, d), map(value.b, a, b, c, d));
    else if (value instanceof Array) {
        if (value.every((n) => typeof (n === "number"))) {
            return value.map((n) => map(n, a, b, c, d));
        } else {
            let y = new Array(value.length);
            for (let i = 0; i < value.length; i++) {
                y[i] = map(value[i], a, b, c, d);
            }
        }
    }
}
const clamp=(value, min, max)=>{
    if (typeof value === "number") return min(max(value, min), max);
    else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, clamp(value.arr.flat(1), min, max));
    else if (value instanceof Complex) return new Complex(clamp(value.a, min, max), clamp(value.b, min, max));
    else if (value instanceof Array) {
        if (value.every((n) => typeof (n === "number"))) {
            return value.map((n) => clamp(n, min, max));
        } else {
            let y = new Array(value.length);
            for (let i = 0; i < value.length; i++) {
                y[i] = clamp(value[i], min, max);
            }
        }
    }
}
const arange=(a, b, step , include = false)=>{
    let tab = [];
    if(a<b){
        for (let i = a; include?i<=b:i<b; i += step) tab.push((i * 10) / 10);
    }
    else{
        for(let i = a; include?i>=b:i>b; i -= step) tab.push((i * 10) / 10);
    }
    return tab;
}
const linspace=(a,b,n=abs(b-a)+1,endpoint=true)=>{
    if(a instanceof Complex||b instanceof Complex){
        a=complex(a);
        b=complex(b);
        n=n||Math.abs(b.a-a.a)+1;
        const X=linspace(a.a,b.a,n,endpoint);
        const Y=linspace(a.b,b.b,n,endpoint);
        let Z=new Array(n).fill(null);
        Z=Z.map((n,i)=>complex(X[i],Y[i]));
        return Z;
    }
    else if(a instanceof Array){
        let Y=[]
        for(let i=0;i<a.length;i++){
            n=n||abs(b[i]-a[i])+1
            Y[i]=linspace(a[i],b[i],n,endpoint);
        }
        return Y;
    }
    const [high,low]=[a,b].sort((a,b)=>b-a);
    if (floor(n) !== n) return;
    var arr = [];
    let step = (high - low) / (n - 1);
    if(!endpoint)step = (high - low) / n;
    for (var i = 0; i < n; i++) {
        arr.push(low+step*i);
    }
    return a<b?arr:arr.reverse();
}
const logspace=(a,b,n=b-a+1,base=E,endpoint=true)=>{
    if(a instanceof Complex||b instanceof Complex){
        a=complex(a);
        b=complex(b);
        n=n??abs(b.a-a.a)
        const X=linspace(a.a,b.a,n,base,endpoint);
        const Y=linspace(a.b,b.b,n,base,endpoint);
        const Z=new Array(X.length).fill(0)
        const ZZ=Z.map((n,i) => pow(base,complex(X[i],Y[i])));
        return ZZ;
    }
    const start=base**min(a,b);
    const stop=base**max(a,b);
    const y = linspace(ln(start) / ln(base), ln(stop) / ln(base), n, endpoint);
    const result=y.map(n => pow(base, n));
    return a<b?result:result.reverse();
}
const geomspace=(a,b,n=abs(b-a)+1)=>{
    var [high,low]=[a,b].sort((a,b)=>b-a);
    var step=sqrtn(high,n-low);
    var arr=[low]
    for(let i=1;i<n;i++)arr[i]=arr[i-1]*step;
    arr=arr.map(n=>+n.toFixed(8))
    return a<b?arr:arr.reverse()
}
export {
    zeros,
    ones,
    nums,
    norm,
    lerp,
    map,
    clamp,
    arange,
    linspace,
    logspace,
    geomspace,

}