
// Utils

import{floor,sqrtn,pow,abs,ln}from "../Functions/index.js"
import{Matrix}from "../Matrix/index.js"
import{complex,Complex}from"../Complex/index.js"
import{PI,E} from "../const.js";
//import ZMath from "./index.js"  
class Utils {
    static zeros(num,n){
        return new Array(n).fill(0);
    }
    static ones(num,n){
        return new Array(n).fill(1);
    }
    static numbers(num,n){
        return new Array(n).fill(num);
    }
    static #add(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a + b;
            else if (b instanceof Complex)return complex(a + b.a, b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).add(b);
            else if (b instanceof Array)return b.map(n=>Utils.add(n,a));                 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.add(n));
            return a.clone.add(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array){

            }
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #sub(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a - b;
            else if (b instanceof Complex)return complex(a - b.a, -b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).sub(b);
            else if (b instanceof Array)return b.map(n=>Utils.sub(n,a));                 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.sub(n));
            return a.clone.sub(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array){

            }
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #mul(a,b){
        if(typeof(a)==="number"){
        if (typeof b == "number") return a * b;
            else if (b instanceof Complex)return complex(a * b.a,a * b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).mul(b);
            else if (b instanceof Array)return b.map(n=>Utils.mul(a,n)); 
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.mul(n));
            return a.clone.mul(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array){

            }
            else {
                return a.map(n=>Utils.mul(n,b));
            }
        }
    }
    static #div(a,b){
        if(typeof(a)==="number"){
        if (typeof b == "number") return a / b;
            else if (b instanceof Complex)return complex(a / b.a,a / b.b);
            else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).div(b);
            else if (b instanceof Array)return b.map(n=>Utils.div(a,n));
        }
        else if(a instanceof Complex||a instanceof Matrix){
            if(b instanceof Array)return b.map(n=>a.clone.div(n));
            return a.clone.div(b);
        }
        else if(a instanceof Array){
            if(b instanceof Array){

            }
            else {
                return a.map(n=>Utils.add(n,b));
            }
        }
    }
    static #modulo(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a % b;
                else if (b instanceof Complex)return complex(a % b.a,a % b.b);
                else if (b instanceof Matrix) return Matrix.numbers(b.rows, b.cols, a).modulo(b);
                else if (b instanceof Array)return b.map(n=>Utils.div(a,n));
            }
            else if(a instanceof Complex||a instanceof Matrix){
                if(b instanceof Array)return b.map(n=>a.clone.div(n));
                return a.clone.div(b);
            }
            else if(a instanceof Array){
                if(b instanceof Array){
    
                }
                else {
                    return a.map(n=>Utils.add(n,b));
                }
            }
    }
    static add(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#add(res,b[i])
        return res;
    }
    static sub(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#sub(res,b[i])
        return res;
    }
    static mul(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#mul(res,b[i])
        return res;
    }
    static div(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#div(res,b[i])
        return res;
    }
    static modulo(a,...b){
        var res=a;
        for(let i=0;i<b.length;i++)res=Utils.#modulo(res,b[i])
        return res;
    }
    static sum(...x) {
        let s = x[0];
        for (let i = 1; i < x.length; i++) s += x[i];
        return s;
    }
    static prod(...x) {
        let p = x[0];
        for (let i = 1; i < x.length; i++) p *= x[i];
        return p;
    }
    static deg2rad(x) {
        if (typeof x === "number") return (x * PI) / 180;
        else if (x instanceof Matrix) return new Matrix(x.rows, x.cols, Utils.deg2rad(x.arr.flat(1)));
        else if (x instanceof Complex) return new Complex(Utils.deg2rad(x.a), Utils.deg2rad(x.b));
        else if (x instanceof Array) {
            if (x.every((n) => typeof (n === "number"))) {
                return x.map((n) => Utils.deg2rad(n));
            } else {
                let y = new Array(x.length);
                for (let i = 0; i < x.length; i++) {
                    y[i] = this.deg2rad(x[i]);
                }
            }
        }
    }
    static rad2deg(x) {
        if (typeof x === "number") return (x / PI) * 180;
        else if (x instanceof Matrix) return new Matrix(x.rows, x.cols, Utils.rad2deg(x.arr.flat(1)));
        else if (x instanceof Complex) return new Complex(Utils.rad2deg(x.a), Utils.rad2deg(x.b));
        else if (x instanceof Array) {
            if (x.every((n) => typeof (n === "number"))) {
                return x.map((n) => Utils.rad2deg(n));
            } else {
                let y = new Array(x.length);
                for (let i = 0; i < x.length; i++) {
                    y[i] = this.rad2deg(x[i]);
                }
            }
        }
    }
    static pgcd(n1, n2) {
        let i,
            pgcd = 1;
        if (n1 == floor(n1) && n2 == floor(n2)) {
            for (i = 2; i <= n1 && i <= n2; ++i) {
                if (n1 % i == 0 && n2 % i == 0) pgcd = i;
            }
            return pgcd;
        } else console.log("error");
    }
    static ppcm(n1, n2) {
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
    static linspace(a,b,n=abs(b-a)+1,endpoint=true) {
        if(a instanceof Complex||b instanceof Complex){
            a=complex(a);
            b=complex(b);
            n=n||Math.abs(b.a-a.a)+1;
            const X=this.linspace(a.a,b.a,n,endpoint);
            const Y=this.linspace(a.b,b.b,n,endpoint);
            let Z=new Array(n).fill(null);
            Z=Z.map((n,i)=>complex(X[i],Y[i]));
            return Z;
        }
        else if(a instanceof Array){
            let Y=[]
            for(let i=0;i<a.length;i++){
                n=n||abs(b[i]-a[i])+1
                Y[i]=this.linspace(a[i],b[i],n,endpoint);
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
    static logspace(a,b,n=b-a+1,base=E,endpoint=true){
        if(a instanceof Complex||b instanceof Complex){
            a=complex(a);
            b=complex(b);
            n=n??abs(b.a-a.a)
            const X=this.linspace(a.a,b.a,n,base,endpoint);
            const Y=this.linspace(a.b,b.b,n,base,endpoint);
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
    static geomspace(a,b,n=abs(b-a)+1){
        var [high,low]=[a,b].sort((a,b)=>b-a);
        var step=sqrtn(high,n-low);
        var arr=[low]
        for(let i=1;i<n;i++)arr[i]=arr[i-1]*step;
        arr=arr.map(n=>+n.toFixed(8))
        return a<b?arr:arr.reverse()
    }
    static arange(a, b, pas) {
        let tab = [];
        for (let i = a; i < b; i += pas) tab.push((i * 10) / 10);
        return tab;
    }
    static norm(value, min, max) {
        if (typeof value === "number") return min !== max ? (value - min) / (max - min) : 0;
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.norm(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.norm(value.a, min, max), Utils.norm(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.norm(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = this.norm(value[i]);
                }
            }
        }
    }
    static lerp(value, min, max) {
        if (typeof value === "number") return (max - min) * value + min;
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.lerp(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.lerp(value.a, min, max), Utils.lerp(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.lerp(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.lerp(value[i]);
                }
            }
        }
    }
    static map(value, a, b, c, d) {
        if (typeof value === "number") return Utils.lerp(Utils.norm(value, a, b), c, d);
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.map(value.arr.flat(1), a, b, c, d));
        else if (value instanceof Complex) return new Complex(Utils.map(value.a, b, c, d), Utils.map(value.b, a, b, c, d));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.map(n, a, b, c, d));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.map(value[i], a, b, c, d);
                }
            }
        }
    }
    static clamp(value, min, max) {
        if (typeof value === "number") return min(max(value, min), max);
        else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, Utils.clamp(value.arr.flat(1), min, max));
        else if (value instanceof Complex) return new Complex(Utils.clamp(value.a, min, max), Utils.clamp(value.b, min, max));
        else if (value instanceof Array) {
            if (value.every((n) => typeof (n === "number"))) {
                return value.map((n) => Utils.clamp(n, min, max));
            } else {
                let y = new Array(value.length);
                for (let i = 0; i < value.length; i++) {
                    y[i] = Utils.clamp(value[i], min, max);
                }
            }
        }
    }
    static aproximatelyEqual(a,b,Epsilon=0.0001){
        return abs(a-b)<Epsilon;
    }
    static cartesianProduct(a, b){
        return a.reduce((p, x) => [...p, ...b.map((y) => [x, y])], []);
    }
    static accum(...arr){
        let acc = arr.reduce((x, y) => [...x, x[x.length - 1] + y], [0]);
            acc.shift();
            return acc;
    }
}
var {zeros,ones,numbers,sum,prod,add,mul,div,sub,modulo,rad2deg,deg2rad,arange,linspace,logspace,norm,lerp,map,clamp,pgcd,ppcm,aproximatelyEqual,cartesianProduct}=Utils
export {
    Utils,
    zeros,
    ones,
    numbers,
    sum,
    prod,
    add,
    mul,
    sub,
    div,
    modulo,
    rad2deg,
    deg2rad,
    arange,
    linspace,
    logspace,
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    aproximatelyEqual,
    cartesianProduct,
  };
 