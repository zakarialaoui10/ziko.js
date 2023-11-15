import { Complex , complex } from "../Complex";
const zeros=(n)=>new Array(n).fill(0);
const ones=(n)=>new Array(n).fill(1);
const nums=(num,n)=>new Array(n).fill(num);
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
    const y = Utils.linspace(ln(start) / ln(base), ln(stop) / ln(base), n, endpoint);
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
    arange,
    linspace,
    logspace,
    geomspace
}