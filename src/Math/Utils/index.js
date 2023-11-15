import { mapfun } from "./mapfun.js";
import{floor,sqrtn,pow,abs,ln}from "../Functions/index.js"
import{Matrix}from "../Matrix/index.js"
import{complex,Complex}from"../Complex/index.js"
import{PI,E} from "../const.js";
import {
    zeros,
    ones,
    nums,
    arange,
    linspace,
    logspace,
    geomspace
} from "../Signal/function.js"
import {
    deg2rad,
    rad2deg
} from "./conversions.js"
import{
    sum,
    prod,
    min,
    max,
    accum
} from "./statistics.js"
import{
    cartesianProduct,
    ppcm,
    pgcd
} from "./discret.js"
class Utils {
    static zeros(n){
        return zeros(n)
    }
    static ones(n){
        return ones(n)
    }
    static nums(num,n){
        return nums(num,n)
    }
    static #add(a,b){
        if(typeof(a)==="number"){
            if (typeof b == "number") return a + b;
            else if (b instanceof Complex)return complex(a + b.a, b.b);
            else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).add(b);
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
            else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).sub(b);
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
            else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).mul(b);
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
            else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).div(b);
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
                else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).modulo(b);
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
        return sum(...x)
    }
    static prod(...x) {
        return prod(...x)
    }
    static deg2rad(...x) {
        return deg2rad(...x)
    }
    static rad2deg(...x) {
        return rad2deg(...x)
    }
    static pgcd(n1, n2) {
        return pgcd(n1,n2)
    }
    static ppcm(n1, n2) {
        return ppcm(n1,n2)
    }
    static linspace(a,b,n=abs(b-a)+1,endpoint=true) {
        return linspace(a,b,n,endpoint)
    }
    static logspace(a,b,n=b-a+1,base=E,endpoint=true){
        return logspace(a,b,n,base)
    }
    static geomspace(a,b,n=abs(b-a)+1){
        return geomspace(a,b,n)
    }
    static arange(a, b, step, include) {
        return arange(a,b,step,include)
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
        return cartesianProduct(a,b)
    }
    static accum(...arr){
        return accum(...arr)
    }
}
var {add,mul,div,sub,modulo,norm,lerp,map,clamp,aproximatelyEqual}=Utils
export {
    mapfun,
    Utils,
    zeros,
    ones,
    nums,
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
 