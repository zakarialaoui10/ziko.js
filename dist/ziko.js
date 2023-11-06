(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Ziko = factory());
})(this, (function () { 'use strict';

    const { PI, E } = Math;
    const EPSILON=Number.EPSILON;

    var Signal={
        _map(func){

        },
        linspace(){

        },
        logspace(){

        },
        arange(){

        },
        echelon(t,t0=0){
            if(typeof t==="number")return +(t>=t0);
        },
        rampe(t,t0=0){
            if(typeof t==="number")return (t>=t0)?t-t0:0;
        },
        sign(t,t0=0){
            if(typeof t==="number")return Math.sign(t-t0);
        },
        rect(t,T,t0=0){
            if(typeof t==="number")return this.echelon(t,t0-T/2)-(this.echelon(t,t0+T/2));
        },
        tri(t,T,t0){
            if(typeof t==="number"){
                if(Math.abs(t)>T/2)return 0;
                else if(t<t0)return this.rampe(t,t0)
                else return -this.rampe(t,t0)
            }
        },
        dirac(){

        },
        lorentz(t,t0=0){
            if(typeof t==="number")return 1/(1+(t-t0)**2);
        },
        sinc(){

        },
        square(){

        },
        sawtooth(){

        }
        
    };

    class AbstractZikoMath {}

    //import ZMath from "./index.js";
    class Complex extends AbstractZikoMath{
        constructor(a = 0, b = 0) {
            super();
            if(a instanceof Complex){
                this.a=a.a;
                this.b=a.b;
            }
            if(typeof(a)==="object"){
                if(("a" in b && "b" in a)){
                    this.a=a.a;
                    this.b=a.b;
                }
                else if(("a" in b && "z" in a)){
                    this.a=a.a;
                    this.b=sqrt((a.z**2)-(a.a**2));
                }
                else if(("a" in b && "phi" in a)){
                    this.a=a.a;
                    this.b=a.a*tan(a.phi);
                }
                else if(("b" in b && "z" in a)){
                    this.b=a.b;
                    this.a=sqrt((a.z**2)-(a.b**2));
                }
                else if(("b" in b && "phi" in a)){
                    this.b=b;
                    this.a=a.b/tan(a.phi);
                }
                else if(("z" in b && "phi" in a)){
                    this.a=a.z*cos(a.phi);
                    this.a=a.z*sin(a.phi);
                }
            }
            else if(typeof(a)==="number"&&typeof(b)==="number"){
                this.a = +a.toFixed(32);
                this.b = +b.toFixed(32);
            }
        }
        get clone() {
            return new Complex(this.a, this.b);
        }
        get z(){
            return hypot(this.a,this.b);    
        }
        get phi(){
            return atan2(this.b , this.a);        
        }
        static get ZERO() {
            return new Complex(0, 0);
        }
        get conj() {
            return new Complex(this.a, -this.b);
        }
        get inv() {
            return new Complex(this.a / (pow(this.a, 2) + pow(this.b, 2)), -this.b / (pow(this.a, 2) + pow(this.b, 2)));
        }
        add(...z) {
            for (let i = 0; i < z.length; i++) {
                if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
            }
            let re = z.map((n) => n.a);
            let im = z.map((n) => n.b);
            this.a+=+sum(...re).toFixed(15);
            this.b+=+sum(...im).toFixed(15);
            return this;
        }
        sub(...z) {
            for (let i = 0; i < z.length; i++) {
                if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
            }
            let re = z.map((n) => n.a);
            let im = z.map((n) => n.b);
            this.a-=+sum(...re).toFixed(15);
            this.b-=+sum(...im).toFixed(15);
            return this;
        }
        mul(...z){
            for (let i = 0; i < z.length; i++) {
                if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
            }
            let Z=+prod(this.z,...z.map(n=>n.z)).toFixed(15);
            let phi=+sum(this.phi,...z.map(n=>n.phi)).toFixed(15);
            this.a=+(Z*cos(phi).toFixed(15)).toFixed(14);
            this.b=+(Z*sin(phi).toFixed(15)).toFixed(14);    
            return this;
        }
        div(...z) {
            for (let i = 0; i < z.length; i++) {
                if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
            }
            let Z=+(this.z/prod(...z.map(n=>n.z))).toFixed(15);
            let phi=+(this.phi-sum(...z.map(n=>n.phi))).toFixed(15);
            this.a=+(Z*cos(phi).toFixed(15)).toFixed(15);
            this.b=+(Z*sin(phi).toFixed(15)).toFixed(15);
            return this;
        }
        pow(n) {
            if (floor(n) === n && n > 0) {
                let z=+(this.z**n).toFixed(15);
                let phi=+(this.phi*n).toFixed(15);
                this.a=+(z*cos(phi).toFixed(15)).toFixed(15);
                this.b=+(z*sin(phi).toFixed(15)).toFixed(15);
            }
            return this;
        }
        static fromExpo(z, phi) {
            return new Complex(z * cos(phi), z * sin(phi));
        }
        get expo() {
            return [this.z, this.phi];
        }
        static add(c,...z) {
            return c.clone.add(...z);
        }
        static sub(c,...z) {
            return c.clone.sub(...z);
        }
        static mul(c,...z) {
            return c.clone.mul(...z);
        }
        static div(c,...z) {
            return c.clone.div(...z);
        }
        static pow(z,n){
            return z.clone.pow(n);
        }
        static xpowZ(x){
            return complex((x**this.a)*cos(this.b*ln(x)),(x**this.a)*sin(this.b*ln(x)));
        }
        sqrtn(n=2){
            return complex(sqrtn(this.z,n)*cos(this.phi/n),sqrtn(this.z,n)*sin(this.phi/n));
        }
        get sqrt(){
            return this.sqrtn(2);
        }
        get log(){
            return complex(this.z,this.phi);
        }
        get cos(){
            return complex(cos(this.a)*cosh(this.b),sin(this.a)*sinh(this.b))
        }
        get sin(){
            return complex(sin(this.a)*cosh(this.b),cos(this.a)*sinh(this.b))
        }
        get tan(){
            const de=cos(this.a*2)+cosh(this.b*2);
            return complex(sin(2*this.a)/de,sinh(2*this.b)/de);
        }
        printInConsole() {
            let string = this.a + " + " + this.b + " * i";
            console.log(string);
            return string;
        }
        print() {
            //return text(this.a + " + i * " + this.b);
        }
        UI() {
            return "<span>" + this.a + " + i * " + this.b + "</span>";
        }
    }

    const complex=(a,b)=>{
        if((a instanceof Array||ArrayBuffer.isView(a)) && (b instanceof Array||ArrayBuffer.isView(a)))return a.map((n,i)=>complex(a[i],b[i]));
        if(a instanceof Matrix && b instanceof Matrix){
            if((a.shape[0]!==b.shape[0])||(a.shape[1]!==b.shape[1]))return Error(0)
            const arr=a.arr.map((n,i)=>complex(a.arr[i],b.arr[i]));
            return new Matrix(a.rows,a.cols,...arr)
        }
        return new Complex(a,b)
    };

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
                if(b instanceof Array);
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
                if(b instanceof Array);
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
                if(b instanceof Array);
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
                if(b instanceof Array);
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
                    if(b instanceof Array);
                    else {
                        return a.map(n=>Utils.add(n,b));
                    }
                }
        }
        static add(a,...b){
            var res=a;
            for(let i=0;i<b.length;i++)res=Utils.#add(res,b[i]);
            return res;
        }
        static sub(a,...b){
            var res=a;
            for(let i=0;i<b.length;i++)res=Utils.#sub(res,b[i]);
            return res;
        }
        static mul(a,...b){
            var res=a;
            for(let i=0;i<b.length;i++)res=Utils.#mul(res,b[i]);
            return res;
        }
        static div(a,...b){
            var res=a;
            for(let i=0;i<b.length;i++)res=Utils.#div(res,b[i]);
            return res;
        }
        static modulo(a,...b){
            var res=a;
            for(let i=0;i<b.length;i++)res=Utils.#modulo(res,b[i]);
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
                let Y=[];
                for(let i=0;i<a.length;i++){
                    n=n||abs(b[i]-a[i])+1;
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
                n=n??abs(b.a-a.a);
                const X=this.linspace(a.a,b.a,n,base,endpoint);
                const Y=this.linspace(a.b,b.b,n,base,endpoint);
                const Z=new Array(X.length).fill(0);
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
            var arr=[low];
            for(let i=1;i<n;i++)arr[i]=arr[i-1]*step;
            arr=arr.map(n=>+n.toFixed(8));
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
    var {zeros,ones,numbers,sum,prod,add,mul,div,sub,modulo,rad2deg,deg2rad,arange,linspace,logspace,norm,lerp,map,clamp,pgcd,ppcm,aproximatelyEqual,cartesianProduct}=Utils;

    //import{arange}from "../Utils/index.js"
    const Logic$1={
        _mode:Number,
        _map:function(func,a,b){
            if (a instanceof Matrix)
                return new Matrix(
                    a.rows,
                    a.cols,
                    a.arr.flat(1).map((n) => func(n, b))
                );
            else if (a instanceof Complex) return new Complex(func(a.a, b), func(a.b, b));
            else if (a instanceof Array) return a.map((n) => func(n, b));      
        },
        not:function(input){
            if(["number","boolean"].includes(typeof input)) return Logic$1._mode(!input);
            else return this._map(this.not,input)
        },
        and:function(a, ...b){
            if(["number","boolean"].includes(typeof a))return Logic$1._mode(b.reduce((n, m) => (n &= m), a));
            else return this._map(this.and,a,b)
        },
        or:function(a, ...b) {
            if(["number","boolean"].includes(typeof a)) return Logic$1._mode(b.reduce((n, m) => (n |= m), a));
            else return this._map(this.or,a,b);
        },
        nand:function(a, ...b) {
            return this.not(this.and(a, b));
        },
        nor:function(a, ...b) {
            return this.not(this.or(a, b));
        },
        xor:function(a,...b){
            let arr=[a,...b];
            if(["number","boolean"].includes(typeof a))return this._mode(arr.reduce((length,cur)=>{
                if(+cur===1)length+=1;
                return length;
            },0)===1);
            else return this._map(this.xor,a,b);
        },
        xnor:function(a,...b){
            return Logic$1.not(Logic$1.xor(a,b))
        }
        
    };

    var Base={
        _mode:Number,
        _map:function(func,number,toBase){
            if (number instanceof Matrix)
                return new Matrix(
                    number.rows,
                    number.cols,
                    number.arr.flat(1).map(n=>func(n,toBase))
                );
            else if (number instanceof Complex) return new Complex(func(number.a,toBase),func(number.b,toBase));
            else if (number instanceof Array) return number.map((n) =>func(n,toBase));
        },
        dec2base(dec,base){
            base<=10?this._mode=Number:this._mode=String;
            //this._mode=String
            if (typeof dec === "number") return this._mode((dec >>> 0).toString(base));
              return this._map(this.dec2base,dec,base)
        },
        dec2bin(dec){
            return this.dec2base(dec,2);
        },
        dec2oct(dec){
            return this.dec2base(dec,8);
        },
        dec2hex(dec){
            return this.dec2base(dec,16);
        },
        bin2base(bin, base) {
            return this.dec2base(this.bin2dec(bin),base)
        },
        bin2dec(bin){
            return this._mode("0b"+bin);
        },
        bin2oct(bin){
            return this.bin2base(bin,8);
        },
        bin2hex(bin){
            return this.bin2base(bin,16);
        },
        oct2dec(oct){
            return this._mode("0o"+oct);
        },
        oct2bin(oct){
            return this.dec2bin(this.oct2dec(oct))
        },
        oct2hex(oct){
            return this.dec2hex(this.oct2dec(oct))
        },
        oct2base(oct, base) {
            return this.dec2base(this.oct2dec(oct),base)
        },
        hex2dec(hex){
            return this._mode("0x"+hex);
        },
        hex2bin(hex){
            return this.dec2bin(this.hex2dec(hex))
        },
        hex2oct(hex){
            return this.dec2oct(this.hex2dec(hex))
        },
        hex2base(hex, base) {
            return this.dec2base(this.hex2dec(hex),base)
        },
        IEEE32toDec(Bin){
            let IEEE32=Bin.split(" ").join("").padEnd(32,"0");
            let s=IEEE32[0];
            let e=2**(+("0b"+IEEE32.slice(1,9))-127);
            let m=IEEE32.slice(9,32).split("").map(n=>+n);
            let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
            let dec=(-1)**s*(1+M)*e;
            return dec
        },
        IEEE64toDec(Bin){
            let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
            let s=IEEE64[0];
            let e=2**(+("0b"+IEEE64.slice(1,12))-1023);
            let m=IEEE64.slice(13,64).split("").map(n=>+n);
            let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
            let dec=(-1)**s*(1+M)*e;
            return dec;
        }
    };

    // class Logic1{
    //     static not(input) {
    //         if (typeof input === "number") return +!input;
    //         else if (input instanceof Matrix)
    //             return new Matrix(
    //                 input.rows,
    //                 input.cols,
    //                 input.arr.flat(1).map((n) => Logic.not(n))
    //             );
    //         else if (input instanceof Complex) return new Complex(Logic.not(input.a), Logic.not(input.b));
    //         else if (input instanceof Array) return input.map((n) => Logic.not(n));
    //     }
    //     static and(a, ...b) {
    //         if (typeof a === "number") return b.reduce((n, m) => (n &= m), a);
    //         else if (a instanceof Matrix)
    //             return new Matrix(
    //                 a.rows,
    //                 a.cols,
    //                 a.arr.flat(1).map((n) => Logic.and(n, b))
    //             );
    //         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.and(a.b, b));
    //         else if (a instanceof Array) return a.map((n) => Logic.and(n, b));
    //     }
    //     static or(a, ...b) {
    //         if (typeof a === "number") return b.reduce((n, m) => (n |= m), a);
    //         else if (a instanceof Matrix)
    //             return new Matrix(
    //                 a.rows,
    //                 a.cols,
    //                 a.arr.flat(1).map((n) => Logic.or(n, b))
    //             );
    //         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.or(a.b, b));
    //         else if (a instanceof Array) return a.map((n) => Logic.or(n, b));
    //     }
    //     static nand(a, ...b) {
    //         return Logic.not(Logic.and(a, b));
    //     }
    //     static nor(a, ...b) {
    //         return Logic.not(Logic.or(a, b));
    //     }
    //     static xor(a, ...b) {
    //         if (typeof a === "number") {
    //             const c = b.Count(1);
    //             switch (c) {
    //                 case 0:
    //                     return a;
    //                 case 1:
    //                     return Logic.not(a);
    //                 default:
    //                     return 0;
    //             }
    //         } else if (a instanceof Matrix)
    //             return new Matrix(
    //                 a.rows,
    //                 a.cols,
    //                 a.arr.flat(1).map((n) => Logic.xor(n, b))
    //             );
    //         else if (a instanceof Complex) return new Complex(Logic.and(a.a, b), Logic.xor(a.b, b));
    //         else if (a instanceof Array) return a.map((n) => Logic.xor(n, b));
    //     }
    //     static xnor(a, ...b) {
    //         return Logic.not(Logic.xor(a, b));
    //     }
    // }
    // class BaseConversion {
    //     constructor() {}
    //     static dec2base(dec, base) {
    //         if (typeof dec === "number") return (dec >>> 0).toString(base);
    //         else if (dec instanceof Matrix)
    //             return new Matrix(
    //                 dec.rows,
    //                 dec.cols,
    //                 dec.arr.flat(1).map((n) => (n >>> 0).toString(base))
    //             );
    //         else if (dec instanceof Complex) return new Complex((dec.a >>> 0).toString(base), (dec.b >>> 0).toString(base));
    //         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2base(n, base));
    //     }
    //     static bin2base(bin, base) {
    //         if (typeof bin === "number") return parseInt(bin, 2).toString(base);
    //         else if (bin instanceof Matrix)
    //             return new Matrix(
    //                 bin.rows,
    //                 bin.cols,
    //                 bin.arr.flat(1).map((n) => parseInt(n, 2).toString(base))
    //             );
    //         else if (bin instanceof Complex) return new Complex(parseInt(bin.a, 2).toString(base), parseInt(bin.b, 2).toString(base));
    //         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2base(n, base));
    //     }
    //     static oct2base(oct, base) {
    //         if (typeof oct === "number") return +parseInt(oct, 8).toString(base);
    //         else if (oct instanceof Matrix)
    //             return new Matrix(
    //                 oct.rows,
    //                 oct.cols,
    //                 oct.arr.flat(1).map((n) => parseInt(n, 8).toString(base))
    //             );
    //         else if (oct instanceof Complex) return new Complex(parseInt(oct.a, 8).toString(base), parseInt(oct.b, 8).toString(base));
    //         else if (oct instanceof Array) return oct.map((n) => BaseConversion.oct2base(n, base));

    //         //return oct instanceof Array?oct.map((n)=>parseInt(n,8).toString(base)):parseInt(bin,8).toString(base);
    //     }
    //     static hex2base(hex, base) {
    //         if (typeof hex === "number") return +parseInt(hex, 16).toString(base);
    //         else if (hex instanceof Matrix)
    //             return new Matrix(
    //                 hex.rows,
    //                 hex.cols,
    //                 hex.arr.flat(1).map((n) => parseInt(n, 16).toString(base))
    //             );
    //         else if (hex instanceof Complex) return new Complex(parseInt(hex.a, 16).toString(base), parseInt(hex.b, 16).toString(base));
    //         else if (hex instanceof Array) return hex.map((n) => BaseConversion.hex2base(n, base));
    //     }
    //     static bin2dec(bin) {
    //         //return bin instanceof Array?bin.map((n)=>bin2base(n,10)):bin2base(bin,10);

    //         if (typeof bin === "number") return +BaseConversion.bin2base(bin, 10);
    //         else if (bin instanceof Matrix)
    //             return new Matrix(
    //                 bin.rows,
    //                 bin.cols,
    //                 bin.arr.flat(1).map((n) => +BaseConversion.bin2base(n, 10))
    //             );
    //         else if (bin instanceof Complex) return new Complex(+BaseConversion.bin2base(bin.a, 10), +BaseConversion.bin2base(bin.b, 10));
    //         else if (bin instanceof Array) return bin.map((n) => BaseConversion.bin2dec(n));
    //     }
    //     static dec2bin(dec) {
    //         //return +BaseConversion.dec2base(dec,2);

    //         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 2);
    //         else if (dec instanceof Matrix)
    //             return new Matrix(
    //                 dec.rows,
    //                 dec.cols,
    //                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 2))
    //             );
    //         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 2), +BaseConversion.dec2base(dec.a, 2));
    //         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2bin(n));
    //     }
    //     static dec2oct(dec) {
    //         if (typeof dec === "number") return +BaseConversion.dec2base(dec, 8);
    //         else if (dec instanceof Matrix)
    //             return new Matrix(
    //                 dec.rows,
    //                 dec.cols,
    //                 dec.arr.flat(1).map((n) => +BaseConversion.dec2base(n, 8))
    //             );
    //         else if (dec instanceof Complex) return new Complex(+BaseConversion.dec2base(dec.a, 8), +BaseConversion.dec2base(dec.a, 8));
    //         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2oct(n));
    //     }
    //     static dec2hex(dec) {
    //         if (typeof dec === "number") return BaseConversion.dec2base(dec, 16);
    //         //else if(dec instanceof Matrix)return new Matrix(dec.rows,dec.cols,dec.arr.flat(1).map(n=>BaseConversion.dec2base(n,16)));
    //         //else if(dec instanceof Complex)return new Complex(BaseConversion.dec2base(dec.a,16),BaseConversion.dec2base(dec.a,16));
    //         else if (dec instanceof Array) return dec.map((n) => BaseConversion.dec2hex(n));
    //     }
    //     static IEEE32toDec(Bin){
    //         let IEEE32=Bin.split(" ").join("").padEnd(32,"0");
    //         let s=IEEE32[0];
    //         let e=2**(+("0b"+IEEE32.slice(1,9))-127)
    //         let m=IEEE32.slice(9,32).split("").map(n=>+n)
    //         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
    //         let dec=(-1)**s*(1+M)*e;
    //         return dec
    //     }
    //     static IEEE64toDec(Bin){
    //         let IEEE64=Bin.split(" ").join("").padEnd(64,"0");
    //         let s=IEEE64[0];
    //         let e=2**(+("0b"+IEEE64.slice(1,12))-1023)
    //         let m=IEEE64.slice(13,64).split("").map(n=>+n)
    //         let M=m.map((n,i)=>n*(2**(-i-1))).reduce((a,b)=>a+b,0);
    //         let dec=(-1)**s*(1+M)*e;
    //         return dec
    //     }
    // }
    class Permutation {
        static withDiscount(arr, l = arr.length) {
            if (l === 1) {
                return arr.map((n) => [n]);
            }
            const permutations = [];
            let smallerPermutations;
            smallerPermutations = this.withDiscount(arr, l - 1);
            arr.forEach((currentOption) => {
                smallerPermutations.forEach((smallerPermutation) => {
                    permutations.push([currentOption].concat(smallerPermutation));
                });
            });
            return permutations;
        }
        static withoutDiscount(arr) {
            const l = arr.length;
            if (l === 1) {
                return arr.map((n) => [n]);
            }
            const permutations = [];
            const smallerPermutations = this.withoutDiscount(arr.slice(1));
            const firstOption = arr[0];
            for (let i = 0; i < smallerPermutations.length; i++) {
                const smallerPermutation = smallerPermutations[i];
                for (let j = 0; j <= smallerPermutation.length; j++) {
                    const permutationPrefix = smallerPermutation.slice(0, j);
                    const permutationSuffix = smallerPermutation.slice(j);
                    permutations.push(permutationPrefix.concat([firstOption], permutationSuffix));
                }
            }
            return permutations;
        }
    }
    class Combinaison {
        static withDiscount(comboOptions, comboLength) {
            if (comboLength === 1) {
                return comboOptions.map((comboOption) => [comboOption]);
            }
            // Init combinations array.
            const combos = [];
            // Remember characters one by one and concatenate them to combinations of smaller lengths.
            // We don't extract elements here because the repetitions are allowed.
            comboOptions.forEach((currentOption, optionIndex) => {
                // Generate combinations of smaller size.
                const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
                // Concatenate currentOption with all combinations of smaller size.
                smallerCombos.forEach((smallerCombo) => {
                    combos.push([currentOption].concat(smallerCombo));
                });
            });
            return combos;
        }
        static withoutDiscount(comboOptions, comboLength) {
            // If the length of the combination is 1 then each element of the original array
            // is a combination itself.
            if (comboLength === 1) {
                return comboOptions.map((comboOption) => [comboOption]);
            }
            // Init combinations array.
            const combos = [];
            // Extract characters one by one and concatenate them to combinations of smaller lengths.
            // We need to extract them because we don't want to have repetitions after concatenation.
            comboOptions.forEach((currentOption, optionIndex) => {
                // Generate combinations of smaller size.
                const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
                // Concatenate currentOption with all combinations of smaller size.
                smallerCombos.forEach((smallerCombo) => {
                    combos.push([currentOption].concat(smallerCombo));
                });
            });

            return combos;
        }
    }
    function PowerSet(originalSet) {
        const subSets = [];
        const numberOfCombinations = 2 ** originalSet.length;
        for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
            const subSet = [];
            for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
                if (combinationIndex & (1 << setElementIndex)) {
                    subSet.push(originalSet[setElementIndex]);
                }
            }
            subSets.push(subSet);
        }
        return subSets;
    }
    var subset = (...arr) => {
        let list = arange(0, 2 ** arr.length, 1);
        let bin = list.toBin.map((n) => n.padStart(arr.length, 0)).map((n) => n.split("").map((n) => +n));
        let sub = bin.map((n) => n.map((m, i) => (arr[i])));
        for (let i = 0; i < sub.length; i++) for (let j = 0; j < sub[i].length; j++) sub[i][j] = { n: sub[i][j], m: bin[i][j] };
        sub = sub.map((n) => n.filter((x) => x.m == 1));
        sub = sub.map((n) => n.map((m) => m.n));
        return sub;
    };
    var Discret={
        Logic: Logic$1,
        Base,
        Permutation,
        Combinaison,
        PowerSet,
        subset
    };

    class Random {
        static rand(a = 1, b) {
            return b ? Math.random() * (b - a) + a : a * Math.random();
        }
        static randInt(a, b) {
            return Math.floor(Random.rand(a, b));
        }
        static get randBin() {
            return Random.randInt(2);
        }
        static get randOct() {
            return Random.randInt(8);
        }
        static get randHex() {
            return Random.randInt(16);
        }
        static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
            let newchoice = new Array(100);
            p=Utils.accum(...p).map(n=>n*100);
            newchoice.fill(choices[0], 0, p[0]);
            for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
            return newchoice[Random.randInt(newchoice.length - 1)];
        }
        static shuffle(arr){
            return arr.sort(()=>0.5-Math.random())
        }
        static rands(n, a, b) {
            return new Array(n).fill(0).map(() => Random.rand(a, b));
        }
        static randsInt(n, a, b) {
            return new Array(n).fill(0).map(() => Random.randInt(a, b));
        }
        static randsBin(n) {
            return new Array(n).fill(0).map(() => Random.randInt(2));
        }
        static randsOct(n) {
            return new Array(n).fill(0).map(() => Random.randInt(8));
        }
        static randsHex(n) {
            return new Array(n).fill(0).map(() => Random.randInt(16));
        }
        static choices(n, choices, p) {
            return new Array(n).fill(0).map(() => Random.choice(choices, p));
        }
        static permutation(...arr) {
            return arr.permS[Random.randInt(arr.length)];
        }
        static get randomColor() {
            return "#" + Base.dec2hex(Random.rand(16777216)).padStart(6,0);
        }
        static randComplex(a = 0, b = 1) {
            return new Complex(...Random.rands(2, a, b));
        }
        static randIntComplex(a = 0, b = 1) {
            return new Complex(...Random.randsInt(2, a, b));
        }
        static get randBinComplex() {
            return new Complex(...Random.randsBin(2));
        }
        static get randOctComplex() {
            return new Complex(...Random.randsOct(2));
        }
        static get randHexComplex() {
            return new Complex(...Random.randsOct(2));
        }
        static randsComplex(n, a = 0, b = 1) {
            return new Array(n).fill(0).map(() => Random.randComplex(a, b));
        }
        static randsIntComplex(n, a = 0, b = 1) {
            return new Array(n).fill(0).map(() => Random.randIntComplex(a, b));
        }
        static randsBinComplex(n) {
            return new Array(n).fill(0).map(() => Random.randBinComplex);
        }
        static randsOctComplex(n) {
            return new Array(n).fill(0).map(() => Random.randOctComplex);
        }
        static randsHexComplex(n) {
            return new Array(n).fill(0).map(() => Random.randHexComplex);
        }
    }

    //import { Logic } from "./Discret/index.js"
    //import Math from "./index.js";
    class Matrix extends AbstractZikoMath{
        constructor(rows, cols, element = []) {
            super();
            if(rows instanceof Matrix){
                this.arr=rows.arr;
                this.rows=rows.rows;
                this.cols=rows.cols;
            }
            else {
            let arr = [],
                i,
                j;
            if (arguments[0] instanceof Array) {
                rows = arguments[0].length;
                cols = arguments[0][0].length;
                arr = arguments[0];
            } else {
                for (i = 0; i < rows; i++) {
                    arr.push([]);
                    arr[i].push(new Array(cols));
                    for (j = 0; j < cols; j++) {
                        arr[i][j] = element[i * cols + j];
                        if (element[i * cols + j] == undefined) arr[i][j] = 0;
                    }
                }
            }
            this.rows = rows;
            this.cols = cols;
            this.arr = arr;   
        }
        this._maintain();
            //Object.seal(this);
        }
        at(i=0,j=undefined){
            if(i<0)i=this.rows+i;
            if(j==undefined) return this.arr[i];
            if(j<0)j=this.cols+j;
            return this.arr[i][j];
        }
        reshape(newRows, newCols) {
            let check = newRows * newCols === this.rows * this.cols;
            if (check) return new Matrix(newRows, newCols, this.arr.flat(1));
            else console.error("Err");
        }
        static eye(size) {
            let result = new Matrix(size, size);
            for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) i === j ? (result.arr[i][j] = 1) : (result.arr[i][j] = 0);
            return result;
        }
        get clone() {
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        get size() {
            return this.rows * this.cols;
        } 
        get shape() {
            return [this.rows, this.cols];
        }
        get reel() {
            return new Matrix(this.cols, this.rows, this.arr.flat(1).reel);
        }
        get imag() {
            return new Matrix(this.cols, this.rows, this.arr.flat(1).imag);
        }
        _maintain(){
            for(let i=0;i<this.arr.length;i++)Object.assign(this,{[[i]]:this.arr[i]});
            return this;
        }
        get(row = 0, col = 0) {
            if (col == -1) return this.arr[row];
            else if (row == -1) return this.arr.map((n) => n[col]);
            else return this.arr[row][col];
        }
        set(row = 0, col = 0, value) {
            if (col == -1) return (this.arr[row] = value);
            else if (row == -1) {
                for (let i = 0; i < this.cols; i++) {
                    this.arr[i][col] = value[i] || 0;
                }
                return this.arr;
            }
            return (this.arr[row][col] = value);
        }
        get isSquare() {
            return this.rows / this.cols === 1;
        }
        get isSym() {
            if (!this.isSquare) return false;
            const T = this.T;
            const M = this.clone;
            return Matrix.sub(M, T).max == 0 && Matrix.sub(M, T).min == 0;
        }
        get isAntiSym() {
            if (!this.isSquare) return false;
            const T = this.T;
            const M = this.clone;
            return Matrix.add(M, T).max == 0 && Matrix.add(M, T).min == 0;
        }
        get isDiag() {
            if (!this.isSquare) return false;
            const T = this.T;
            const M = this.clone;
            const MT = Matrix.mul(M, T);
            const TM = Matrix.dot(T, M);
            return Matrix.sub(MT, TM).max == 0 && Matrix.sub(MT, TM).min == 0;
        }
        get isOrtho() {
            if (!this.isSquare) return false;
            return this.isDiag && (this.det == 1 || this.det == -1);
        }
        get isIdemp() {
            if (!this.isSquare) return false;
            const M = this.clone;
            const MM = Matrix.dot(M, M);
            return Matrix.sub(MM, M).max == 0 && Matrix.sub(MM, M).min == 0;
        }
        get T() {
            let transpose = [];
            for (let i = 0; i < this.arr[0].length; i++) {
                transpose[i] = [];
                for (let j = 0; j < this.arr.length; j++) {
                    transpose[i][j] = this.arr[j][i];
                }
            }
            return new Matrix(this.cols, this.rows, transpose.flat(1));
        }
        get det() {
            if (!this.isSquare) return new Error("is not square matrix");
            if (this.rows == 1) return this.arr[0][0];
            function determinat(M) {
                if (M.length == 2) {
                    if (M.flat(1).some((n) => n instanceof Matrix)) {
                        console.warn("Tensors are not completely supported yet ...");
                        return;
                    }
                    return Utils.sub(Utils.mul(M[0][0],M[1][1]),Utils.mul(M[0][1],M[1][0]))
                }
                var answer = 0;
                for (var i = 0; i < M.length; i++) {
                    //console.log(M[0][i]);
                    /*answer = answer.add(
                        pow(-1, i)
                            .mul(M[0][i])
                            .mul(determinat(deleteRowAndColumn(M, i)))
                    );*/
                    //const to_be_added=Utils.add(Utils.mul(pow(-1, i),Utils.mul(M[0][i],determinat(deleteRowAndColumn(M, i)))));
                    const to_be_added=Utils.add(Utils.mul(pow(-1, i),Utils.mul(M[0][i],determinat(deleteRowAndColumn(M, i)))));
                    answer=Utils.add(answer,to_be_added);
                }
                return answer;
            }
            function deleteRowAndColumn(M, index) {
                var temp = [];
                for (let i = 0; i < M.length; i++) temp.push(M[i].slice(0));
                temp.splice(0, 1);
                for (let i = 0; i < temp.length; i++) temp[i].splice(index, 1);
                return temp;
            }
            return determinat(this.arr);
        }
        get inv() {
            if (!this.isSquare) return new Error("is not square matrix");
            if (this.det === 0) return "determinat = 0 !!!";
            let A = InverseMatrixe(this.arr);
            return new Matrix(this.rows, this.cols, A.flat(1));
        }
        static zeros(rows, cols) {
            let result = new Matrix(rows, cols);
            for (let i = 0; i < rows; i++) for (var j = 0; j < cols; j++) result.arr[i][j] = 0;
            return result;
        }
        static ones(rows, cols) {
            let result = new Matrix(rows, cols);
            for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = 1;
            return result;
        }
        static numbers(rows, cols, number) {
            let result = new Matrix(rows, cols);
            for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = number;
            return result;
        }
        static get rand(){
            return {
                int:(rows, cols, a, b)=>{
                    let result = new Matrix(rows, cols);
                    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randInt(a, b);
                    return result;
                },
                bin:(rows,cols)=>{
                    let result = new Matrix(rows, cols);
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randBin;
                    }
                    return result;       
                },
                hex:(rows,cols)=>{
                    let result = new Matrix(rows, cols);
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randHex;
                    }
                    return result;       
                },
                choices:(rows, cols, choices, p)=>{
                    let result = new Matrix(rows, cols);
                    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.choice(choices, p);
                    return result
                },
                permutation:(rows,cols,arr)=>{
                    //return new Matrix(rows, cols, Random.permutation(...arr))
                }
            }
        }
        static rands(rows, cols, a = 1, b) {
            let result = new Matrix(rows, cols);
            for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.rand(a, b);
            return result;
        }
        /*static randsInt(rows, cols, a, b) {
        }
        static randsBin(rows, cols) {
        }
        static randsHex(rows, cols) {
        }
        static randsChoices(rows, cols, choices, p) {
        }
        static randPermutation(rows, cols, arr) {
            return new Matrix(rows, cols, Random.permutation(...arr));
        }*/
        /*map(fct) {
            var array = this.arr.flat(1);
            return new Matrix(
                this.rows,
                this.cols,
                array.map((n) => fct(n))
            );
        }
        static map(m, fct) {
            var array = m.arr.flat(1);
            return new Matrix(
                m.rows,
                m.cols,
                array.map((n) => fct(n))
            );
        }*/
        map(Imin, Imax, Fmin, Fmax) {
            return Utils.map(this, Imin, Imax, Fmin, Fmax);
        }
        lerp(min, max) {
            return Utils.lerp(this, min, max);
        }
        norm(min, max) {
            return Utils.norm(this, min, max);
        }
        clamp(min, max) {
            return Utils.clamp(this, min, max);
        }
        static map(matrix, Imin, Imax, Fmin, Fmax) {
            return Utils.map(matrix, Imin, Imax, Fmin, Fmax);
        }
        static lerp(matrix, min, max) {
            return Utils.lerp(matrix, min, max);
        }
        static norm(matrix, min, max) {
            return Utils.norm(matrix, min, max);
        }
        static clamp(m, min, max) {
            return Utils.clamp(matrix, min, max);
        }
        toPrecision(p) {
            for (let i = 0; i < this.cols; i++) for (let j = 0; j < this.rows; j++) this.arr[i][j] = +this.arr[i][j].toPrecision(p);
            return this;
        }
        get toBin() {
            let newArr = this.arr.flat(1).toBin;
            return new Matrix(this.rows, this.cols, newArr);
        }
        get toOct() {
            let newArr = this.arr.flat(1).toOct;
            return new Matrix(this.rows, this.cols, newArr);
        }
        get toHex() {
            let newArr = this.arr.flat(1).toHex;
            return new Matrix(this.rows, this.cols, newArr);
        }
        /*get isOdd() {
            let newArr = this.arr.flat(1).isOdd;
            return new Matrix(this.rows, this.cols, newArr);
        }*/
        max2min() {
            let newArr = this.arr.flat(1).max2min;
            return new Matrix(this.rows, this.cols, newArr);
        }
        min2max() {
            let newArr = this.arr.flat(1).min2max;
            return new Matrix(this.rows, this.cols, newArr);
        }
        sortRows(calback=undefined){
            let newArr=this.arr.map(n=>n.sort(calback)).flat(1);
            return new Matrix(this.rows, this.cols, newArr);           
        }
        sortCols(calback=undefined){
            let m=this.T;
            let newArr=m.arr.map(n=>n.sort(calback)).flat(1);
            return new Matrix(this.rows, this.cols, newArr).T;           
        }
        filterByRows(item){
            var truth=this.arr.map(n=>n.map(m=>+(""+m).includes(item)));
            var mask=truth.map(n=>!!Logic.or(...n));
            var filtredArray=this.arr.filter((n,i)=>mask[i]===true);
            if(filtredArray.length===0)filtredArray.push([]);
            console.log(filtredArray);
            return new Matrix(filtredArray)
        }
        filterByCols(item){
            return new Matrix(this.T.arr.filter(n=>n.includes(item)))
        }
        sortAll(calback=undefined){
            let newArr=this.arr.flat(1).sort(calback);
            return new Matrix(this.rows, this.cols, newArr);         
        }
        count(n) {
            return this.arr.flat(1).count(n);
        }
        toBase(n) {
            let newArr = this.arr.flat(1).toBase(n);
            return new Matrix(this.rows, this.cols, newArr);
        }
        #hstack(matrix){
            if (this.rows !== matrix.rows) return;
            let newArr = this.arr;
            for (let i = 0; i < this.rows; i++) for (let j = this.cols; j < this.cols + matrix.cols; j++) newArr[i][j] = matrix.arr[i][j - this.cols];
            this.cols += matrix.cols;
            return new Matrix(this.rows, this.cols, newArr.flat(1));
        }
        hstack(...matrices) {
            const M=[this,...matrices].reduce((a,b)=>a.#hstack(b));
            Object.assign(this,M);
            return this;
        }
        static hstack(matrix,...matrices) {
            return matrix.clone.hstack(...matrices);
        }
        #vstack(matrix) {
            if (this.cols !== matrix.cols) return;
            let newArr = this.arr;
            for (let i = this.rows; i < this.rows + matrix.rows; i++) {
                newArr[i] = [];
                for (let j = 0; j < this.cols; j++) newArr[i][j] = matrix.arr[i - this.rows][j];
            }
            this.rows += matrix.rows;
            return new Matrix(this.rows, this.cols, newArr.flat(1));
        }
        vstack(...matrices) {
            const M=[this,...matrices].reduce((a,b)=>a.#vstack(b));
            Object.assign(this,M);
            return this;
        }
        static vstack(matrix,...matrices) {
            return matrix.clone.vstack(...matrices);
        }
        hqueue(...matrices){
            const M=[this,...matrices].reverse().reduce((a,b)=>a.#hstack(b));
            Object.assign(this,M);
            return this;
        }
        vqueue(...matrices){
            const M=[this,...matrices].reverse().reduce((a,b)=>a.#vstack(b));
            Object.assign(this,M);
            return this;
        }
        static hqueue(matrix,...matrices) {
            return matrix.clone.hqueue(...matrices);
        }
        static vqueue(matrix,...matrices) {
            return matrix.clone.vqueue(...matrices);
        }
        slice(r0=0, c0=0, r1=this.rows-1, c1=this.cols-1) {
            let newRow = r1 - r0,
                newCol = c1 - c0;
            let newArr = new Array(newCol);
            for (let i = 0; i < newRow; i++) {
                newArr[i] = [];
                for (let j = 0; j < newCol; j++) newArr[i][j] = this.arr[i + r0][j + c0];
            }
            return new Matrix(newRow, newCol, newArr.flat(1));
        }
        static slice(m1,r0=0, c0=0, r1=this.rows-1, c1=this.cols-1) {
            return m1.slice(r0, c0, r1, c1);
        }
        getRows(ri, rf = ri + 1) {
            return this.slice(ri, 0, rf, this.cols);
        }
        getCols(ci, cf = ci + 1) {
            return this.slice(0, ci, this.rows, cf);
        }
        static getRows(m, ri, rf = ri + 1) {
            return m.slice(ri, 0, rf, m.cols);
        }
        static getCols(m, ci, cf = ci + 1) {
            return m.slice(0, ci, m.rows, cf);
        }
        add(...matr) {
            for (let k = 0; k < matr.length; k++) {
                if (typeof matr[k] == "number"||matr[k] instanceof Math.Complex) matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
                for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.add(this.arr[i][j],matr[k].arr[i][j]);
            }
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        sub(...matr) {
            for (let k = 0; k < matr.length; k++) {
                if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
                for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.sub(this.arr[i][j],matr[k].arr[i][j]);
            }
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        static add(m1, ...m2) {
            return m1.clone.add(...m2);
        }
        static sub(m1, ...m2) {
            return m1.clone.sub(...m2);
        }
        mul(...matr) {
            for (let k = 0; k < matr.length; k++) {
                if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
                for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.mul(this.arr[i][j],matr[k].arr[i][j]);
            }
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        div(...matr) {
            for (let k = 0; k < matr.length; k++) {
                if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
                for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.div(this.arr[i][j],matr[k].arr[i][j]);
            }
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        static div(m1, ...m2) {
            return m1.clone.div(...m2);
        }
        static mul(m1, ...m2) {
            return m1.clone.mul(...m2);
        }
        modulo(...matr) {
            for (let k = 0; k < matr.length; k++) {
                if (typeof matr[k] == "number") matr[k] = Matrix.numbers(this.rows, this.cols, matr[k]);
                for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++)this.arr[i][j]=Utils.modulo(this.arr[i][j],matr[k].arr[i][j]);
            }
            return new Matrix(this.rows, this.cols, this.arr.flat(1));
        }
        static modulo(m1, ...m2) {
            return m1.clone.modulo(...m2);
        }
        dot(matrix) {
            var res = [];
            for (var i = 0; i < this.arr.length; i++) {
                res[i] = [];
                for (var j = 0; j < matrix.arr[0].length; j++) {
                    res[i][j] = 0;
                    for (var k = 0; k < this.arr[0].length; k++) {
                        res[i][j] = res[i][j].add(this.arr[i][k].mul(matrix.arr[k][j]));
                    }
                }
            }
            return new Matrix(this.arr.length, matrix.arr[0].length, res.flat(1));
        }
        static dot(matrix1, matrix2) {
            return matrix1.dot(matrix2);
        }
        pow(n) {
            let a = this.clone,
                p = this.clone;
            for (let i = 0; i < n - 1; i++) p = p.dot(a);
            return p;
        }
        static pow(m, n) {
            return m.clone.pow(n);
        }
        get somme() {
            let S = 0;
            for (let i = 0; i < this.rows; i++) for (let j = 0; j < this.cols; j++) S += this.arr[i][j];
            return S;
        }
        get DoesItContainComplexNumbers() {
            return this.arr.flat(Infinity).some((n) => n instanceof Complex);
        }
        get min() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            let minRow = [];
            for (let i = 0; i < this.rows; i++) minRow.push(min$1(...this.arr[i]));
            return min$1(...minRow);
        }
        get max() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            let maxRow = [];
            for (let i = 0; i < this.rows; i++) maxRow.push(max$1(...this.arr[i]));
            return max$1(...maxRow);
        }
        get minRows() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            let minRow = [];
            for (let i = 0; i < this.rows; i++) minRow.push(min$1(...this.arr[i]));
            return minRow;
        }
        get maxRows() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            let maxRow = [];
            for (let i = 0; i < this.rows; i++) maxRow.push(max$1(...this.arr[i]));
            return maxRow;
        }
        get minCols() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            return this.T.minRows;
        }
        get maxCols() {
            if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
            return this.T.maxRows;
        }
        static fromVector(v) {
            return new Matrix(v.length, 1, v);
        }
        get toArray() {
            let arr = [];
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    arr.push(this.arr[i][j]);
                }
            }
            return arr;
        }
        get print() {
            //"pretty print" the matrix
            let fstring = "[";
            for (let i = 0; i < this.arr.length; i++) {
                fstring += (i != 0 ? " " : "") + ` [${this.arr[i].map((n) => " " + n.toString() + " ")}],\n`;
            }
            console.log(fstring.substring(0, fstring.length - 2) + " ]");
            document.write(fstring.substring(0, fstring.length - 2) + " ]");
        }
        get table() {
            console.table(this.arr);
        }
        get serialize() {
            return JSON.stringify(this);
        }
        static deserialize(data) {
            if (typeof data == "string") {
                data = JSON.parse(data);
            }
            let matrix = new Matrix(data.rows, data.cols);
            matrix.arr = data.arr;
            return matrix;
        }
        toTable() {
            var table = new DocumentFragment();
            var Tr = new Array(this.rows).fill(null).map(() => document.createElement("tr"));
            var Td = this.arr.map((n) => n.map(() => document.createElement("td")));
            for (let i = 0; i < Td.length; i++) {
                for (let j = 0; j < Td[0].length; j++) {
                    Td[i][j].innerHTML = this.arr[i][j];
                    Tr[i].appendChild(Td[i][j]);
                }
            }
            Tr.map((n) => table.appendChild(n));
            return table;
        }
        toGrid(element, style = {}) {
            let a = Grid();
            a.append(
                ...this.map(element)
                    .arr.flat(1)
                    .map((n) => n.style(style))
            );
            a.Columns(this.cols);
            return a;
        }
        sortTable(n=0,{type="num",order="asc"}={}) {
            var obj=this.T.arr.map(n=>n.map((n,i)=>Object.assign({},{x:n,y:i})));
            var newObj=this.T.arr.map(n=>n.map((n,i)=>Object.assign({},{x:n,y:i})));
            if(type==="num"){
                if(order==="asc")obj[n].sort((a,b)=>a.x-b.x);
                else if(order==="desc")obj[n].sort((a,b)=>b.x-a.x);
                else if(order==="toggle"){
                   // console.log(obj[n][0])
                    //console.log(obj[n][1])
                    if(obj[n][0].x>obj[n][1].x)obj[n].sort((a,b)=>b.x-a.x);
                    else obj[n].sort((a,b)=>a.x-b.x);
                }
            }
            else if(type==="alpha"){
                if(order==="asc")obj[n].sort((a,b)=>(""+a.x).localeCompare(""+b.x));
                else if(order==="desc")obj[n].sort((a,b)=>(""+b.x).localeCompare(""+a.x));            
            }
            //var order=obj[n].map(n=>n.y);
            order=obj[n].map(n=>n.y);
            for(let i=0;i<obj.length;i++){
                if(i!==n)obj[i].map((n,j)=>n.y=order[j]);
            }
            for(let i=0;i<obj.length;i++){
                if(i!==n)newObj[i].map((n,j)=>n.x=obj[i][order[j]].x);
            }
            newObj[n]=obj[n];
            var newArr=newObj.map(n=>n.map(m=>m.x));
            return new Matrix(newArr).T;
        }
    }

    function InverseMatrixe(M) {
        if (M.length !== M[0].length) {
            return;
        }
        var i = 0,
            ii = 0,
            j = 0,
            dim = M.length,
            e = 0;
            //t = 0;
        var I = [],
            C = [];
        for (i = 0; i < dim; i += 1) {
            I[I.length] = [];
            C[C.length] = [];
            for (j = 0; j < dim; j += 1) {
                if (i == j) {
                    I[i][j] = 1;
                } else {
                    I[i][j] = 0;
                }
                C[i][j] = M[i][j];
            }
        }
        for (i = 0; i < dim; i += 1) {
            e = C[i][i];
            if (e == 0) {
                for (ii = i + 1; ii < dim; ii += 1) {
                    if (C[ii][i] != 0) {
                        for (j = 0; j < dim; j++) {
                            e = C[i][j];
                            C[i][j] = C[ii][j];
                            C[ii][j] = e;
                            e = I[i][j];
                            I[i][j] = I[ii][j];
                            I[ii][j] = e;
                        }
                        break;
                    }
                }
                e = C[i][i];
                if (e == 0) {
                    return;
                }
            }
            for (j = 0; j < dim; j++) {
                C[i][j] = C[i][j] / e;
                I[i][j] = I[i][j] / e;
            }
            for (ii = 0; ii < dim; ii++) {
                if (ii == i) {
                    continue;
                }
                e = C[ii][i];
                for (j = 0; j < dim; j++) {
                    C[ii][j] -= e * C[i][j];
                    I[ii][j] -= e * I[i][j];
                }
            }
        }
        return I;
    }

    class LinearSystem {
        static resolve(A, B) {
            return A.inv
                .dot(Matrix.fromVector(B))
                .arr.flat(1)
                .map((n) => +n.toFixed(10));
        }
    }
    var matrix=(r, c, element)=>new Matrix(r, c, element);
    var matrix2=(...element)=>new Matrix(2, 2, element);
    var matrix3=(...element)=>new Matrix(3, 3, element);
    var matrix4=(...element)=>new Matrix(4, 4, element);

    const mapFun=(fun,...X)=>{
        const Y=X.map(x=>{
            if(x===null)return fun(null);
            if(["number","string","boolean","bigint","undefined"].includes(typeof x))return fun(x);
            if(x instanceof Array)return x.map(n=>mapFun(fun,n));
            if(ArrayBuffer.isView(x))return x.map(n=>fun(n));
            if(x instanceof Set)return new Set(mapFun(fun,...[...x]));
            if(x instanceof Map)return new Map([...x].map(n=>[n[0],mapFun(fun,n[1])]));
            if(x instanceof Matrix){
                return new Matrix(x.rows,x.cols,mapFun(x.arr.flat(1)))
            }
            if(x instanceof Complex){
                const [a,b,z,phi]=[x.a,x.b,x.z,x.phi];
                switch(fun){
                    case Math.log:return complex(ln(z),phi);
                    case Math.exp:return complex(e(a)*cos(b),e(a)*sin(b));
                    case Math.abs:return z;
                    case Math.sqrt:return complex(sqrt(z)*cos(phi/2),sqrt(z)*sin(phi/2));
                    case Math.cos:return complex(cos(a)*cosh(b),-(sin(a)*sinh(b)));
                    case Math.sin:return complex(sin(a)*cosh(b),cos(a)*sinh(b));
                    case Math.tan:{
                        const DEN=cos(2*a)+cosh(2*b);
                        return complex(sin(2*a)/DEN,sinh(2*b)/DEN);
                    }
                    case Math.cosh:return complex(cosh(a)*cos(b),sinh(a)*sin(b));
                    case Math.sinh:return complex(sinh(a)*cos(b),cosh(a)*sin(b));
                    case Math.tanh:{
                        const DEN=cosh(2*a)+cos(2*b);
                        return complex(sinh(2*a)/DEN,sin(2*b)/DEN)
                    }
                    //default : return fun(x)
                }
            }
            if(x instanceof Object)return Object.fromEntries(Object.entries(x).map(n=>n=[n[0],mapFun(fun,n[1])]))

        });
       return Y.length==1?Y[0]:Y; 
    };

    //import ZikoMath from "./index.js"
    //import{Matrix} from "../Matrix/index.js"
    //import{complex, Complex} from "./Complex.js"
    // var a=complex(1,1)
    // console.log(a instanceof Complex)
    //mapArgs=(fun,...args1)=>(...args2)=>new Array(args1.length).fill(null).map((n,i)=>fun(args1[i],args2[i]))

    function abs(...x){
        return mapFun(Math.abs,...x);
    }
    function sqrt(...x){
        return mapFun(Math.sqrt,...x);
    }
    function pow(...x){
        //return n=>mapFun(a=>Math.pow(a,n),...x)
        const n=x.pop();
        return mapFun(a=>Math.pow(a,n),...x)
    }
    function sqrtn(...x){
        const n=x.pop();
        return mapFun(a=>e(ln(a) / n),...x)
    }
    function e(...x){
        return mapFun(Math.exp,...x);
    }
    function ln(...x){
        return mapFun(Math.log,...x);
    }
    function cos(...x){
        return mapFun(a=>+Math.cos(a).toFixed(15),...x);
    }
    function sin(...x){
        return mapFun(a=>+Math.sin(a).toFixed(15),...x);
    }
    function tan(...x){
        return mapFun(a=>+Math.tan(a).toFixed(15),...x);
    }
    function sec(...x){
        return mapFun(a=>+1/Math.cos(a).toFixed(15),...x);
    }
    function csc(...x){
        return mapFun(a=>+1/Math.sin(a).toFixed(15),...x);
    }
    function cot(...x){
        return mapFun(a=>+1/Math.tan(a).toFixed(15),...x);
    }
    function acos(...x){
        return mapFun(a=>+Math.acos(a).toFixed(15),...x);
    }
    function asin(...x){
        return mapFun(a=>+Math.asin(a).toFixed(15),...x);
    }
    function atan(...x){
        return mapFun(a=>+Math.atan(a).toFixed(15),...x);
    }
    function acot(...x){
        return mapFun(a=>+Math.PI/2-Math.atan(a).toFixed(15),...x);
    }
    function cosh(...x){
        return mapFun(a=>+Math.cosh(a).toFixed(15),...x);
    }
    function sinh(...x){
        return mapFun(a=>+Math.sinh(a).toFixed(15),...x);
    }
    function tanh(...x){
        return mapFun(a=>+Math.tanh(a).toFixed(15),...x);
    }
    function coth(...x){
        return mapFun(n=>+(1/2*Math.log((1+n)/(1-n))).toFixed(15),...x);
    }
    function acosh(...x){
        return mapFun(a=>+Math.acosh(a).toFixed(15),...x);
    }
    function asinh(...x){
        return mapFun(a=>+Math.asinh(a).toFixed(15),...x);
    }
    function atanh(...x){
        return mapFun(a=>+Math.atanh(a).toFixed(15),...x);
    }
    function ceil(...x){
        return mapFun(Math.ceil,...x);
    }
    function floor(...x){
        return mapFun(Math.floor,...x);
    }
    function round(...x){
        return mapFun(Math.round,...x);
    }
    function atan2(...x){
        const n=x.pop();
        return mapFun(a=>Math.atan2(a,n),...x)
    }
    function fact(...x){
        return mapFun(n=> {
            let i,
            y = 1;
            if (n == 0) y = 1;
            else if (n > 0) for (i = 1; i <= n; i++) y *= i;
            else y = NaN;
            return y;
        },...x);
    } 
    function sign(...x){
        return mapFun(Math.sign,...x);
    }
    function sig(...x){
        return mapFun(n=>1/(1+e(-n)),...x);
    }


    var min$1 = (...x) => Math.min(...x);
    var max$1 = (...x) => Math.max(...x);
    var hypot = Math.hypot;

    //import Ziko from "../index.js"
    const Math$1={
        PI,
        E,
        EPSILON,
        Random,
        complex,
        Complex,
        Matrix,
        LinearSystem,
        matrix,
        matrix2,
        matrix3,
        matrix4,
        cos,
        sin,
        tan,
        sec,
        csc,
        cot,
        abs,
        sqrt,
        pow,
        sqrtn,
        e,
        ln,
        acos,
        asin,
        atan,
        acot,
        cosh,
        sinh,
        tanh,
        coth,
        acosh,
        asinh,
        atanh,
        min: min$1,
        max: max$1,
        sign,
        floor,
        ceil,
        round,
        fact,
        hypot,
        sig,
        atan2,
       // Derivation,
        Utils,
        numbers,
        zeros,
        ones,
        sum,
        prod,
        add,
        mul,
        div,
        sub,
        modulo,
        rad2deg,
        deg2rad,
        arange,
        linspace,
        norm,
        lerp,
        map,
        clamp,
        pgcd,
        ppcm,
        aproximatelyEqual,
        cartesianProduct,
        Discret,
        Logic: Logic$1,
        Base,
        Permutation,
        Combinaison,
        PowerSet,
        subset,
        Signal,
        /*ExtractAll:function(){
                for (let i = 0; i < Object.keys(Ziko.Math).length; i++) {
                    globalThis[Object.keys(Ziko.Math)[i]] = Object.values(Ziko.Math)[i];
            }
            return this;
        },
        RemoveAll:function(){
                for (let i = 0; i < Object.keys(Ziko.Math).length; i++) delete globalThis[Object.keys(Ziko.Math)[i]];   
            return this;
        }*/
    };

    const addSuffixeToNumber=(value,suffixe="px")=>{
      if(typeof value === "number") value+=suffixe;
      if(value instanceof Array)value=value.map(n=>typeof n==="number"?n+=suffixe:n).join(" ");
      return value;
    };
    const style = (el, styles) => Object.assign(el.style, styles);
    var waitForUIElmSync=(UIElement,timeout=2000)=>{
      const t0=Date.now();
      while(Date.now()-t0<timeout){
        if(UIElement.element)return UIElement.element
      }
    };

    //import { addSuffixeToNumber } from "../Utils.js";
    function styleComposer(){
        return {
          style:function(styles,{target = "parent", maskVector = null } = {}){
            if (target === "parent" || target === 0) {
                style(this.element, styles);
                Object.assign(this.cache.style,styles);
            }
            else if(target === "parent" || target === 0){
              if (maskVector) {
                this.items.map((n, i) => maskVector[i] == 1 && n.style(styles));
              } 
              else this.items.map((n) => n.style(styles));      
            }
            return this;
          },
          // Css
          setCss:function(css) {
            this.element.style.cssText = css;
            return this;
          },
          addCss:function(css) {
            this.element.style.cssText += css;
            return this;
          },
          // Dimensions
          width:function(w,{ target, maskVector } = {}){
            if(w instanceof Object){
              if(w instanceof Array)w={min:w[0],max:w[1]};
              if("min" in w || "max" in w){
                let min= w.min ?? w.max;
                let max= w.max ?? w.min;
                min=addSuffixeToNumber(min,"px");
                max=addSuffixeToNumber(max,"px"); 
                this.style({ minWidth: min, maxWidth: max }, { target, maskVector });
              }
            }
            else {
              w=addSuffixeToNumber(w,"px");
              this.style({width:w},{ target, maskVector });
            }
            return this
          },
          height:function(h,{ target, maskVector } = {}){
            if(h instanceof Object){
              if(h instanceof Array)h={min:h[0],max:h[1]};
              if("min" in h || "max" in h){
                let min= h.min ?? h.max;
                let max= h.max ?? h.min;
                min=addSuffixeToNumber(min,"px");
                max=addSuffixeToNumber(max,"px"); 
                this.style({ minHeight: min, maxHeight: max }, { target, maskVector });
              }
            }
            else {
              h=addSuffixeToNumber(h,"px");
              this.style({height:h},{ target, maskVector });
            }
            return this
          },
          size:function(w,h,{ target, maskVector } = {}){
            this.width(w,{ target, maskVector });
            this.height(h,{ target, maskVector });
            return this;
          },
          // Box Model 
          border:function(border = "1px solid red", { target, maskVector } = {}){
            this.style({border}, { target, maskVector });
            return this;
          },
          borderRadius:function(radius,{ target, maskVector } = {}){
            radius=addSuffixeToNumber(radius,"px");
            this.style({ borderRadius: radius }, { target, maskVector });
            return this;
          },
          margin:function(margin,{ target, maskVector } = {}){
            margin=addSuffixeToNumber(margin,"px");
            this.style({ margin }, { target, maskVector });
            return this;
          },
          padding:function(padding,{ target, maskVector } = {}){
            padding=addSuffixeToNumber(padding,"px");
            this.style({padding},{ target, maskVector });
            return this;
          },
          // Placement 
          position:function(position,{ target, maskVector } = {}){
            this.style({position},{ target, maskVector });
            return this
          },
          display:function(disp, { target, maskVector } = {}) {
            this.style({ display: disp }, { target, maskVector });
            return this;
          },
          zIndex:function(z,{ target, maskVector } = {}){
            this.style({zIndex:z},{ target, maskVector });
            return this;
          },
          float:function(float, { target, maskVector } = {}) {
            this.style({ float: float }, { target, maskVector });
            return this;
          },
          // Apparences 
          color:function(color,{ target, maskVector } = {}){
            this.style({color},{ target, maskVector });
            return this;
          },
          background:function(background,{ target, maskVector } = {}){
            this.style({background},{ target, maskVector });
            return this;
          },
          opacity:function(opacity, { target, maskVector } = {}) {
            this.style({ opacity }, { target, maskVector });
            return this;
          },
          
          
          hide:function({after, target, maskVector } = {}){
            if(typeof after==="number")setTimeout(() => this.hide({target,maskVector}), after);
            else {
              this.cache.isHidden=true;
              this.style({display:"none"},{target,maskVector});
            }
            return this;
          },
          show:function({after, target, maskVector } = {}){
            if(typeof after==="number")setTimeout(() => this.show({target,maskVector}), after);
            else {
              this.cache.isHidden=false;
              this.style({display:""},{target,maskVector});
            }
            return this;
          },
          
          cursor:function(type="pointer"){
            this.style({ cursor: type });
            return this;
          },
          overflow:function(x,y,{ target, maskVector } = {}){
            const values=["hidden","auto"];
            this.style({
              overflowX:typeof x==="number"?values[x]:x,
              overflowY:typeof y==="number"?values[y]:y
            },{target,maskVector});
            return this;
          },
          clip:function(polygon, { target, maskVector } = {}) {
            if (typeof polygon === "string") polygon = "polygon(" + polygon + ")";
            this.style({ clipPath: polygon }, { target, maskVector });
            return this;
          }
          
        }
      }

    class ZikoUIElement {
      #Flip = [0, 0, 0];
      constructor(element = document.body) {
        this.Target = Ziko.Target || document.body;
        if (typeof element === "string") element = document.createElement(element);
        this.element = element;
        Object.assign(this, styleComposer.call(this));
        this.cache = {
          isHidden: false,
          style: {},
          attributes: {},
          events: {},
          filters: {},
        };
        this.items = [];
        this.style({ position: "relative" });
        this.size("auto", "auto");
        //waitForUIElm(this).then(()=>Object.assign(this.cache.filters,{display:this.element.style.display}));
        waitForUIElmSync(this, 1000);
        //console.log(ele)
        //this.maintain()
      }
      clone() {
        //const a = new ZikoUIElement(this.element.cloneNode(true));
        //a.element.style=this.element.style
        const clonedUI = new this.constructor();
        a.render(true);
        return clonedUI;
      }
      at(index) {
        return this.items.at(index);
      }
      maintain() {
        for (let i = 0; i < this.items.length; i++)
          Object.assign(this, { [[i]]: this.items[i] });
        return this;
      }
      setTarget(tg) {
        if (tg instanceof ZikoUIElement) tg = tg.element;
        this.remove();
        this.Target = tg;
        this.render();
        return this;
      }
      render(bool = true) {
        if (bool) this.Target.appendChild(this.element);
        else this.remove();
        return this;
      }
      append(...ele) {
        for (let i = 0; i < ele.length; i++)
          if (ele[i] instanceof ZikoUIElement) {
            this.element.appendChild(ele[i].element);
            ele[i].Target = this.element;
            this.items.push(ele[i]);
          } else if (ele[i] instanceof Object) {
            if (ele[i]?.style) this.style(ele[i]?.style);
            if (ele[i]?.attr) {
              Object.entries(ele[i].attr).forEach((n) =>
                this.setAttribute("" + n[0], n[1]),
              );
            }
          }
        this.maintain();
        return this;
      }
      remove() {
        if (this.Target.children.length) this.Target.removeChild(this.element);
        return this;
      }
      removeAfter(t = 1) {
        setTimeout(() => this.remove(), t);
        return this;
      }
      removeItem(...ele) {
        const remove = (ele) => {
          if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);
          else if (typeof ele === "number")
            this.element.removeChild(this.element.children[ele]);
        };
        for (let i = 0; i < ele.length; i++) remove(ele[i]);
        for (let i = 0; i < this.items.length; i++)
          Object.assign(this, { [[i]]: this.items[i] });
        return this;
      }
      insertAt(index, ...ele) {
        if (index >= this.element.children.length) this.append(...ele);
        else
          for (let i = 0; i < ele.length; i++) {
            this.element.insertBefore(ele[i].element, this.items[index].element);
            this.items.splice(index, 0, ele[i]);
          }

        return this;
      }
      // Attributes
      setAttribute(name, value) {
        this.element.setAttribute(name, value);
        Object.assign(this.cache.attributes, Object.fromEntries([[name, value]]));
        return this;
      }
      removeAttribute(name) {
        this.element.setAttribute(name);
        return this;
      }
      setContentEditable(bool = true) {
        this.setAttribute("contenteditable", bool);
        return this;
      }
      link(link, target = "") {
        let a = document.createElement("a");
        a.setAttribute("href", link);
        if (target) a.setAttribute("target", target);
        this.element.addEventListener("click", () => a.click());
        this.element.style.cursor = "pointer";
        return this;
      }
      get children() {
        return [...this.element.children];
      }
      get cloneElement() {
        return this.element.cloneNode(true);
      }
      toggle() {
        this.cache.isHidden ? this.show() : this.hide();
        return this;
      }
      get styleObject() {
        //let borderPlus
        return Object.fromEntries(
          Object.entries(this.element.style).filter(
            (n) => n[1] != "" && n[1] !== "initial" && isNaN(+n[0]),
          ),
        );
      }
      backgroundColor(background = "#EEEEEE", { target, maskVector } = {}) {
        this.style({ backgroundColor: background }, { target, maskVector });
        return this;
      }
      backgroundImage(
        src,
        { repeat = "no-repeat", blendMode = "normal", target, maskVector } = {},
      ) {
        if (src instanceof Array) src = src.map((n) => "url(" + n + ")").join(",");
        else src = "url(" + src + ")";
        //console.log(src)
        this.style(
          {
            backgroundImage: src,
            backgroundRepeat: repeat,
            backgroundSize: "cover",
            backgroundBlendMode: blendMode,
          },
          { target, maskVector },
        );
        return this;
      }
      backgroundGradient(colors, { target, maskVector, type = "linear" } = {}) {
        if (colors instanceof Array) {
          if (colors.length === 1) colors[1] = colors[0];
          colors = colors.join(",");
        }
        this.style(
          {
            background: type + "-gradient(" + colors + ")",
          },
          { target, maskVector },
        );
        return this;
      }
      colorGradient(colors, { target, maskVector, type = "linear" } = {}) {
        if (colors instanceof Array) {
          if (colors.length === 1) colors[1] = colors[0];
          colors = colors.join(",");
        }
        var webkit = "-webkit-" + type + "-gradient(" + colors + ")";
        this.style(
          {
            background: webkit,
            webkitBackgroundClip: "text",
            webkitTextFillColor: "transparent",
          },
          { target, maskVector },
        );
        return this;
      }
      shadow(shadow = "", { target, maskVector } = {}) {
        this.style({ textShadow: "1px 1px 1px " + shadow }, { target, maskVector });
        return this;
      }
      boxShadow(shadow = "", { target, maskVector } = {}) {
        this.style({ boxShadow: "2px 2px 10px " + shadow }, { target, maskVector });
        return this;
      }
      cssFilter(filter, { target, maskVector } = {}) {
        this.style({ filter: filter }, { target, maskVector });
        return this;
      }
      font(f = "italic bold 20px arial,serif", { target, maskVector } = {}) {
        this.style({ font: f }, { target, maskVector });
        return this;
      }
      fontSize(size = "20px", { target, maskVector } = {}) {
        this.style({ fontSize: size }, { target, maskVector });
        return this;
      }
      fontFamily(n = "Serif", { target, maskVector } = {}) {
        if (typeof n == "number") {
          switch (n) {
            case 0:
              this.style({ fontFamily: "Serif" }, { target, maskVector });
              break;
            case 1:
              this.style({ fontFamily: "Sans-Serif" }, { target, maskVector });
              break;
            case 2:
              this.style({ fontFamily: "Monospace" }, { target, maskVector });
              break;
            case 3:
              this.style({ fontFamily: "Cursive" }, { target, maskVector });
              break;
            case 4:
              this.style({ fontFamily: "Fantasy" }, { target, maskVector });
              break;
          }
        } else this.style({ fontFamily: n }, { target, maskVector });
        return this;
      }
      setClass(value) {
        this.setAttribute("class", value);
        return this;
      }
      get Classes() {
        return this.element.getAttribute("class");
      }
      addClass() {
        /*this.setAttribute("class", value);
            return this;*/
      }
      setId(Id) {
        this.element.setAttribute("id", Id);
        return this;
      }
      get Id() {
        return this.element.getAttribute("id");
      }
      filterByClass(value) {
        let n = 0;
        for (let i = 0; i < this.children.length; i++) {
          for (let j = 0; j < this.children[i].classList.length; j++) {
            if ([...this.children[i].classList][j] == value) n++;
          }
          if (n == 0) this.children[i].setAttribute("hidden", true);
          n = 0;
        }
      }
      sortByTextContent(value, displays) {
        let item = this.children;
        item
          .filter((n) => !n.textContent.toLowerCase().includes(value.toLowerCase()))
          .map((n) => {
            n.style.display = "none";
          });
        item
          .filter((n) => n.textContent.toLowerCase().includes(value.toLowerCase()))
          .map((n, i) => (n.style.display = displays[i]));
        //return item.filter(n=>n.style.display!="none")
        item.filter((n) => n.style.display != "none");
        return this;
      }
      on(event, calback, { target = "parent", maskVector = null } = {}) {
        if (target === "parent" || target === 0)
          this.element.addEventListener(event, calback);
        else if (target === "children" || target === 1) {
          if (maskVector) {
            this.items.map(
              (n, i) =>
                maskVector[i] == 1 && n.element.addEventListener(event, calback),
            );
          } else this.items.map((n) => n.element.addEventListener(event, calback));
        }
      }
      onClick(calback, { target = "parent", maskVector = null } = {}) {
        this.on("click", calback, { target, maskVector });
        return this;
      }
      onDbclick(calback, { target = "parent", maskVector = null } = {}) {
        this.on("dbclick", calback, { target, maskVector });
        return this;
      }
      onMousedown(calback) {
        this.element.addEventListener("mousedown", calback);
        return this;
      }
      onMousemove(calback) {
        this.element.addEventListener("mousemove", calback);
        return this;
      }
      onMouseup(calback) {
        this.element.addEventListener("mouseup", calback);
        return this;
      }
      onMouseenter(calback) {
        this.element.addEventListener("mouseenter", calback);
        return this;
      }
      onMouseleave(calback) {
        this.element.addEventListener("mouseleave", calback);
        return this;
      }
      onMouseout(calback) {
        this.element.addEventListener("mouseout", calback);
        return this;
      }
      onMouseover(calback) {
        this.element.addEventListener("mouseover", calback);
        return this;
      }
      onTouchmove(calback) {
        this.element.addEventListener("touchmove", calback);
        return this;
      }
      onTouchup(calback) {
        this.element.addEventListener("touchup", calback);
        return this;
      }
      onPointermove(calback) {
        this.element.addEventListener("pointermove", calback);
        return this;
      }
      onPointerup(calback) {
        this.element.addEventListener("pointerup", calback);
        return this;
      }
      onPointerdown(calback) {
        this.element.addEventListener("pointerdown", calback);
        return this;
      }
      onPointerover(calback) {
        this.element.addEventListener("pointerover", calback);
        return this;
      }
      onPointerleave(calback) {
        this.element.addEventListener("pointerleave", calback);
        return this;
      }
      onPointerout(calback) {
        this.element.addEventListener("pointerout", calback);
        return this;
      }
      onPointerenter(calback) {
        this.element.addEventListener("pointerenter", calback);
        return this;
      }

      onKeypress(calback) {
        this.element.addEventListener("keypress", calback);
        return this;
      }
      onKeydown(calback) {
        this.element.addEventListener("keydown", calback);
        return this;
      }
      onKeyup(calback) {
        this.element.addEventListener("keyup", calback);
        return this;
      }
      get key() {
        return event.key;
      }
      get keyCode() {
        return event.keyCode;
      }
      get Event() {
        return event;
      }
      handleSuccessifKeys(keys, calback) {
        keys = keys.reverse();
        const newkeys = new Array(keys.length).fill(null);
        const addsub = (arr, item, length = keys.length) => {
          arr.unshift(item);
          arr.length = length;
        };
        this.keydown(() => {
          addsub(newkeys, this.key);
          if (newkeys.comp(keys)) {
            this.preventDefault();
            calback();
            newkeys.fill(null);
          }
        });
        return this;
      }
      preventDefault() {
        return this.Event.preventDefault();
      }
      preventCopy() {
        this.keydown(() => {
          if (this.Event.ctrlKey && this.key == "c") this.preventDefault();
        });
      }
      preventPaste() {
        this.keydown(() => {
          if (this.Event.ctrlKey && this.key == "v") this.preventDefault();
        });
      }
      preventCut() {
        this.keydown(() => {
          if (this.Event.ctrlKey && this.key == "x") this.preventDefault();
        });
      }
      preventSelect() {
        this.onKeydown(() => {
          if (this.Event.ctrlKey && this.key == "a") this.preventDefault();
        });
      }
      draggable(bool = true) {
        this.element.setAttribute("draggable", bool);
        return this;
      }
      get center() {
        this.style({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        });
        return this;
      }
      get Css_3d_obj() {
        return null;
        //return new THREE.CSS3DObject(this.element);
      }
      //VisibleArea
      get Visible_area() {
        //let bodyCoords=document.body.getBoundingClientRect();
        let coords = this.element.getBoundingClientRect();
        let windowHeight = document.documentElement.clientHeight;
        let windowWidth = document.documentElement.clientWidth;
        let topVisible = coords.top > 0 && coords.top < windowHeight;
        let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
        let leftVisible = coords.left > 0 && coords.left < windowWidth;
        let rightVisible = coords.right > 0 && coords.right < windowWidth;
        //return topVisible || bottomVisible;
        return {
          top: topVisible,
          bottom: bottomVisible,
          left: leftVisible,
          right: rightVisible,
          heightRatio: (coords.height + coords.y) / coords.height,
          isVisible: topVisible || bottomVisible || rightVisible || leftVisible,
        };
      }

      fadeOut(t = 1) {
        this.style({ transition: t + "s", opacity: 0 });
        return this;
      }
      fadeIn(t = 1) {
        this.style({ transition: t + "s", opacity: 1 });
        return this;
      }
      slideHeightIn(t = 1, h = this.h) {
        this.style({ transition: t + "s", height: h });
        return this;
      }
      slideHeightOut(t = 1) {
        this.style({ transition: t + "s", height: 0 });
        this.element.addEventListener("transitionend", () =>
          this.style({ opacity: "none" }),
        );
        return this;
      }
      slideWidthIn(t = 1, w = this.w) {
        this.style({ transition: t + "s", width: w });
        return this;
      }
      slideWidthOut(t = 1) {
        this.style({ transition: t + "s", width: 0 });
        this.element.addEventListener("transitionend", () =>
          this.style({ opacity: "none" }),
        );
        return this;
      }
      slideIn({ t = 1, w = "100%", h = "auto" } = {}) {
        this.style({
          transition: t + "s",
          width: w,
          height: h,
          visibility: "visible",
        });
        return this;
      }
      slideOut({ t = 1, width = 0, height = 0 } = {}) {
        this.style({
          visibility: "hidden",
          transition: t + "s",
          opacity: "none",
          width: width,
          height: height,
        });
        this.element.addEventListener("transitionend", () => {
          this.style({ opacity: "none" });
          console.log(1);
        });
        return this;
      }
      toggleSlide() {}
      translateX(px, t = 0) {
        this.style({ transform: "translateX(" + px + "px)" });
        if (t != 0) this.style({ transition: "all " + t + "s ease" });
        return this;
      }
      translateY(px, t = 0) {
        this.style({ transform: "translateY(" + px + "px)" });
        if (t != 0) this.style({ transition: "all " + t + "s ease" });
        return this;
      }
      translate(x, y = x, t = 0) {
        console.log(t);
        this.style({ transform: "translate(" + x + "px," + y + "px)" });
        return this;
      }
      rotateX(deg, { duration = 0 } = {}) {
        this.style({ transition: "all " + duration + "s ease" });
        this.style({ transform: "rotateX(" + deg + "deg)" });
        return this;
      }
      rotateY(deg, { duration = 0 } = {}) {
        this.style({ transition: "all " + duration + "s ease" });
        this.style({ transform: "rotateY(" + deg + "deg)" });
        return this;
      }
      rotateZ(deg, { duration = 0 } = {}) {
        this.style({ transition: "all " + duration + "s ease" });
        this.style({ transform: "rotateZ(" + deg + "deg)" });
        return this;
      }
      flipeX({ t = 1 } = {}) {
        this.#Flip[0] += 180;
        this.style({
          transform: "rotateX(" + this.#Flip[0] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      flipeY(t = 1) {
        this.#Flip[1] += 180;
        this.style({
          transform: "rotateY(" + this.#Flip[1] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      flipeZ(t = 1) {
        this.#Flip[2] += 180;
        this.style({
          transform: "rotateZ(" + this.#Flip[2] + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      scaleX(sc, t = 1) {
        this.style({
          transform: "scaleX(" + sc + ")",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      scaleY(sc, t = 1) {
        this.style({
          transform: "scaleY(" + sc + ")",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      skewX(deg, t = 1) {
        this.style({
          transform: "skewX(" + deg + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      skewY(deg, t = 1) {
        this.style({
          transform: "skewY(" + deg + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      skew(x, y, t = 1) {
        this.style({
          transform: "skew(" + x + "deg , " + y + "deg)",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      scale(x, y = x, t = 1) {
        this.style({
          transform: "scale(" + x + "," + y + ")",
          transition: "all " + t + "s ease",
        });
        return this;
      }
      resize(n = 0) {
        switch (n) {
          case 0:
            this.style({ resize: "none" });
            break;
          case 1:
            this.style({ resize: "horizontal" });
            break;
          case 2:
            this.style({ resize: "vertical" });
            break;
          case 3:
            this.style({ resize: "both" });
            break;
          default:
            this.style({ resize: n });
        }
        return this;
      }
      Glassmorphism(background = "rgba(255,255,255,0.1)", blur = "1px") {
        this.style({ background: background, backdropFilter: blur });
        return this;
      }
      Neumorphism(r = "50px", bg = "cyan", box = "13px -13px 49px #5d8fac") {
        this.style({ borderRadius: r, background: bg, boxShadow: box });
        return this;
      }
      allowDrop(ev) {
        ev.preventDefault();
      }
      drag(ev) {
        ev.dataTransfer.setData("text", ev.Target.id);
      }
      drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.Target.appendChild(document.getElementById(data));
      }

      fullScreen(set = true, e) {
        if (set) this.element.requestFullscreen(e);
        else document.exitFullscreen();
        return this;
      }
      toggleFullScreen(e) {
        if (!document.fullscreenElement) this.element.requestFullscreen(e);
        else document.exitFullscreen();
        return this;
      }
      resizeObserver(calback) {
        var observer = new ResizeObserver((element) => calback(element));
        return observer.observe(this.element);
      }
      intersectionObserver(calback, target = "parent") {
        if (target == "parent") {
          var observer = new IntersectionObserver((element) => calback(element[0]));
          return observer.observe(this.element);
        }
        return this.items.map((n) => n.intersectionObserver((e) => calback(e)));
      }
      intersectRatio(calback) {
        var observer = new IntersectionObserver((element) =>
          calback(element[0].intersectionRatio),
        );
        return observer.observe(this.element);
      }
      get coords() {
        var rect = this.element.getBoundingClientRect();
        var parent = {
          cX: Math.floor(rect.left + (rect.right - rect.left) / 2),
          cY: Math.floor(rect.top + (rect.bottom - rect.top) / 2),
        };
        return { parent };
      }
      exportHTML() {}
      toPdf() {
        return "Install @ziko/jspdf";
      }
    }

    class ZikoUIText extends ZikoUIElement {
        constructor(...value) {
          super();
          this.element = document.createElement("span");
          this.text = "";
          this.addValue(...value);
          this.display("inline-block");
          this.render();
        }
        clear() {
          this.element.innerText = "";
          return this;
        }
        get value() {
          return this.element.innerText;
        }
        setValue(value = "", add = false) {
          if (["string", "number"].includes(typeof value)) {
            this.text = "" + value;
            if (this.text.includes("\n"))
              this.text = this.text
                .split("\n")
                .map((n) => "<span>".concat(n, "</span></br>"))
                .join("");
          }
           if (value instanceof Complex) this.text = "" + value.UI();
           /*
           else if (value instanceof Ziko.Math.Matrix) {
              let string = "[";
              for (let j = 0; j < value.arr.length; j++)
                string +=
                  (j != 0 ? " " : "") +
                  `[${value.arr[j].map((n) => "  " + n.toString() + " ")}],</br>`;
              string = string.substring(0, string.length - 6) + "]";
              this.text = "" + string;
            } 
            */
            else console.error("not supported yet");
          if (add) this.element.innerHTML += this.text;
          else this.element.innerHTML = this.text;
          if (value instanceof Array || value instanceof Set) {
            if (value instanceof Set) value = [...value];
            this.addValue(...value);
          }
        }  
        addValue(...value) {
          value.map((n) => {
            this.setValue(" ", true);
            this.setValue(n, true);
          });
          return this;
        }
        toggleValues(...values) {
          values = values.map((n) => "" + n);
          let index = values.indexOf("" + this.value);
          if (index != -1 && index != values.length - 1)
            this.setValue(values[index + 1]);
          else this.setValue(values[0]);
          return this;
        }
      }
     const text = (...value) => new ZikoUIText(...value);

    class ZikoUIParagraphe extends ZikoUIElement {
        constructor(...value) {
          super();
          this.element = document.createElement("p");
          this.addValue(...value);
          this.style({margin:0,padding:0});
          this.render();
        }
        addValue(...value) {
          for (let i = 0; i < value.length; i++) {
            if (typeof value[i] == "string" || typeof value[i] == "number") {
              this.element.appendChild(document.createTextNode(value[i]));
              this.element.appendChild(document.createElement("br"));
            } else if (value[i] instanceof ZikoUIElement)
              this.element.appendChild(value[i].element);
            else if (value[i] instanceof Complex)
              text(value.a + " + " + value.b + "i");
          }
          return this;
        }
        clear() {
          this.element.childNodes.forEach((e) => e.remove());
          return this;
        }
        setValue(...value) {
          this.clear();
          this.addValue(...value);
          return this;
        }
      }
      const p = (...ZikoUIElement) => new ZikoUIParagraphe().append(...ZikoUIElement);

    class ZikoUIHeading extends ZikoUIElement {
        constructor(type = 1, value = "") {
          super();
          this.element = document.createElement("h" + type);
          this.element.textContent = value;
          this.render();
        }
        get value() {
          return this.element.innerText;
        }
        setValue(text = "") {
          this.element.innerText = text;
          return;
        }
        addValue(text = "") {
          this.element.innerText += text;
          return this;
        }
      }
      const h1 = (text = "text") => new ZikoUIHeading(1, text);
      const h2 = (text = "text") => new ZikoUIHeading(2, text);
      const h3 = (text = "text") => new ZikoUIHeading(3, text);
      const h4 = (text = "text") => new ZikoUIHeading(4, text);
      const h5 = (text = "text") => new ZikoUIHeading(5, text);
      const h6 = (text = "text") => new ZikoUIHeading(6, text);

    class ZikoUIBr extends ZikoUIElement {
        constructor() {
          super();
            this.element = document.createElement("br");
            this.render();
            delete this.append;
        }
      }
      class ZikoUIHr extends ZikoUIElement {
        constructor() {
          super();
            this.element = document.createElement("hr");
            this.render();
            delete this.append;
        }
      }
      class ZikoUILink extends ZikoUIElement{
        constructor(href){
          super();
          this.element = document.createElement("a");
          this.setHref(href);
          this.render();
        }
        setHref(href){
          this.element.href=href;
        }
      }
      const br = () => new ZikoUIBr();
      const hr = () => new ZikoUIHr();
      const brs = (n=1)=> new Array(n).fill(new ZikoUIBr());
      const hrs = (n=1)=> new Array(n).fill(new ZikoUIHr());
      const link=(href,...UIElement)=>new ZikoUILink(href).append(...UIElement);

    class ZikoUILI extends ZikoUIElement{
      constructor(UI){
        super();
        this.element=document.createElement("li");
        this.append(UI);
        this.render();
      }
    }
    class ZikoUIList extends ZikoUIElement {
        constructor() {
          super();
          delete this.append;
          //this.style({ listStylePosition: "inside" });
        }
        append(...arr){
          for (let i = 0; i < arr.length; i++) {
            let li = null;
            if(["string","number"].includes(typeof arr[i]))arr[i]=text(arr[i]);
            if (arr[i] instanceof ZikoUIElement)li=new ZikoUILI(arr[i]);
            li.setTarget(this.element);
            this.items.push(li[0]);
            this.maintain();
          }
        }
        get center() {
          this.remove;
          p(this).setTarget(this.Target).center;
          //this.style({display:"flex",justifyContent: "center",alignItems:"center"});
          return this;
        }
        delete(value) {
          const valueIndex = [...this.element.children].indexOf(value);
          return valueIndex;
          /*if(valueIndex >= 0) {
            return this.list.splice(valueIndex, 1);
          }*/
        }
        push(){

        }
        pop(){

        }
        unshift(){

        }
        shift(){

        }
        sort(){

        }
        filter(){

        }
        slice(){
          
        }
      }
    class ZikoUIOList extends ZikoUIList{
      constructor(...arr){
        super();
        this.element=document.createElement("ol");
        this.append(...arr);
        this.render();
      }
      type(tp = 1) {
        this.element.setAttribute("type", tp);
        return this;
      }
      start(st = 1) {
        this.element.setAttribute("start", st);
        return this;
      }
    }
    class ZikoUIUList extends ZikoUIList{
      constructor(...arr){
        super();
        this.element=document.createElement("ul");
        this.append(...arr);
        this.render();
      }
    }
    const ol = (...arr) => new ZikoUIOList(...arr);
    const ul = (...arr) => new ZikoUIUList(...arr);

    class ZikoUIBtn extends ZikoUIElement {
        constructor(value = "button") {
          super();
          this.element = document.createElement("button");
          this.setValue(value);
          this.render();
          this.cursor("pointer");
        }
        setValue(value) {
          if (value instanceof ZikoUIElement) value.setTarget(this.element);
          else {
            this.element.appendChild(document.createTextNode(""));
            this.element.childNodes[0].data = value;
          }
          return this;
        }
        get value() {
          return this.element.innerText;
        }
        toggleValues(...values) {
          values = values.map((n) => "" + n);
          let index = values.indexOf("" + this.value);
          if (index != -1 && index != values.length - 1)
            this.setValue(values[index + 1]);
          else this.setValue(values[0]);
          return this;
        }
      }
    const btn = (value) => new ZikoUIBtn(value);

    class ZikoUIInputOption extends ZikoUIElement {
        constructor(value = "") {
          super();
          this.element = document.createElement("option");
          if(value instanceof Object&&"value" in value){
            this.setValue(value.value);
            this.setText(value?.text??value.value);
          }
          else this.setValue(value);
        }
        setValue(str = "") {
          this.element.value = str;
          return this;
        }
        setText(text=""){
          if(text)this.element.textContent=text;
          return this;
        }
      }

    class ZikoUITextArea extends ZikoUIElement {
        constructor() {
          super();
          this.element = document.createElement("textarea");
          //Object.assign(this,inputComposer.call(this));
          this.render();
        }
        get value(){
          return this.element.textContent;
        }
      }

      const textarea =()=> new ZikoUITextArea();

    //import { select } from "./select.js";
    //import { debounce,throttle} from "../../Data/decorators.js";

    class ZikoUIInput extends ZikoUIElement {
      constructor(value = "",datalist) {
        super();
        this.element = document.createElement("input");
        this.setValue(value);
        if(datalist)this.linkDatalist(datalist);
        this.render();
      }
      linkDatalist(datalist) {
        let id;
        if(datalist instanceof ZikoUIInputDatalist)id=datalist.Id;
        else if(datalist instanceof Array){
          const Datalist=new ZikoUIInputDatalist(...datalist);
          id=Datalist.Id;
          console.log(Datalist);
        }
        else id=datalist;
        this.element.setAttribute("list", id);
        return this;
      }
      get value() {
        return this.element.value;
      }
      _setType(type) {
        this.element.type = type;
        return this;
      }
      setValue(value="") {
        this.element.value = value;
        return this;
      }
      useState(state){
        this.setValue(state);
        return [{value:this.value},e=>this.setValue(e)]
      }
      setPlaceholder(value) {
        if(value)this.element.placeholder = value;
        return this;
      }
      get isValide() {
        return this.element.checkValidity();
      }
      setRequired(required = true) {
        this.element.required = required;
        return this;
      }
      select() {
        this.element.select();
        return this;
      }
      copy() {
        this.element.select();
        document.execCommand("copy");
        return this;
      }
      cut() {
        this.element.select();
        document.execCommand("cut");
        return this;
      }
      onInput(callback,{decorator=function(){},delay=null}={}) {
        this.element.addEventListener("input",decorator(callback,delay));
        return this;
      }
      onChange(callback) {
        this.element.addEventListener("change", callback);
      }
      accept(value) {
        this.element.accept = value;
        return this;
      }
    }
    class ZikoUIInputSearch extends ZikoUIInput {
      constructor() {
        super();
        this._setType("search");
        this.Length = 0;
      }
      onsearch(callback) {
        this.element.addEventListener("search", () => callback());
        return this;
      }
      connect(...UIElement) {
    /* 
        let memory = new Array(UIElement.length).fill([]);
        UIElement.map((n, i) => {
          //console.log(n)
          n.items.map((m, j) => {
            memory[i][j] = m.element.style.display;
          });
        });
        UIElement.map((n, i) =>
          this.onInput(() => {
            n.filterByTextContent(this.value, memory[i]);
            this.Length = n.children.filter(
              (n) => n.style.display != "none"
            ).length;
          })
        );
        */
        return this;
      }
      displayLength(UIElement) {
        this.element.addEventListener("keyup", () =>
          UIElement.setValue(this.Length)
        );
        return this;
      }
    }
    class ZikoUIInputNumber extends ZikoUIInput {
      constructor(min, max ,step = 1) {
        super();
        this._setType("number");
        this.setMin(min).setMax(max).setStep(step);
        this.render();
      }
      get value() {
        return +this.element.value;
      }
      setMin(min) {
        this.element.min = min;
        return this;
      }
      setMax(max) {
        this.element.max = max;
        return this;
      }
      setStep(step) {
        this.element.step = step;
        return this;
      }
    }
    class ZikoUIInputSlider extends ZikoUIInputNumber {
      constructor(val = 0, min = 0, max = 10, step = 1) {
        super();
        this._setType("range");
        this.setMin(min).setMax(max).setValue(val).setStep(step);
        this.render();
      }
    }
    class ZikoUIInputColor extends ZikoUIInput {
      constructor() {
        super();
        this._setType("color");
        this.background(this.value);
        this.render();
        this.onInput(() => this.background(this.value));
      }
    }
    class ZikoUIInputPassword extends ZikoUIInput {
      constructor() {
        super();
        this._setType("password");
        this.render();
      }
    }
    class ZikoUIInputEmail extends ZikoUIInput {
      constructor() {
        super();
        this._setType("email");
        this.render();
      }
    }
    class ZikoUIInputTime extends ZikoUIInput {
      constructor() {
        super();
        this._setType("time");
        this.render();
      }
    }
    class ZikoUIInputDate extends ZikoUIInput {
      constructor() {
        super();
        this._setType("date");
        this.render();
      }
    }
    class ZikoUIInputDateTime extends ZikoUIInput {
      constructor() {
        super();
        this._setType("datetime-local");
        this.render();
      }
    }
    class ZikoUIInputCheckbox extends ZikoUIInput {
      constructor() {
        super();
        this._setType("checkbox");
        this.cursor("pointer");
      }
      get checked() {
        return this.element.checked;
      }
      check(checked = true) {
        this.element.checked = checked;
        return this;
      }
      color(color) {
        this.element.style.accentColor = color;
        return this;
      }
    }
    class ZikoUIInputRadio extends ZikoUIInput {
      constructor() {
        super();
        this._setType("radio");
        this.cursor("pointer");
      }
      get checked() {
        return this.element.checked;
      }
      check(checked = true) {
        this.element.checked = checked;
        return this;
      }
      color(color) {
        this.element.style.accentColor = color;
        return this;
      }
    }


    class ZikoUIInputImage extends ZikoUIElement {
      constructor(text = "File") {
        super();
        this._aux_element = btn(text).setTarget(this.Target);
        this.element = document.createElement("input");
        this.element.setAttribute("type", "file");
        this.element.setAttribute("accept", "image");
        this._aux_element.onClick(() => this.element.click());
        this.element.onChange = this.handleImage.bind(this);
      }
      handleImage(e) {
        const reader = new FileReader();
        const img = new Image();
        reader.onload = function (event) {
          img.src = event.target.result;
          console.log(img.src);
        };
        reader.readAsDataURL(e.target.files[0]);
        this.img = img;
      }
      get value() {
        return this.img;
      }
      render(bool = true) {
        if (bool) this.Target.appendChild(this._aux_element.element);
        else this.remove();
        return this;
      }
      remove() {
        if (this.Target.children.length) this.Target.removeChild(this._aux_element.element);
        return this;
      }
    }

    class ZikoUIInputDatalist extends ZikoUIElement {
      constructor(...options){
        super();
        this.element = document.createElement("datalist");
        this.addOptions(...options).setId("ziko-datalist-id"+crypto.randomUUID().slice(8,18));
        this.render();
      }
      addOptions(...options) {
        options.map((n) => this.append(new ZikoUIInputOption(n)));
        return this;
      }
    }
    const input = (value,datalist) => {
      if(value instanceof Object){
        const {datalist,placeholder}=value;
        value=value.value??"";
        return new ZikoUIInput(value,datalist).setPlaceholder(placeholder);
      }
      return new ZikoUIInput(value,datalist);
    };
    const datalist = (...options) => new ZikoUIInputDatalist(...options);
    const slider = (value, min, max, step) =>{
      if(value instanceof Object){
        const {min=0,max=10,step=1}=value;
        value=value?.value??5;
        return new ZikoUIInputSlider(value, min, max, step);
      }
      return new ZikoUIInputSlider(value, min, max, step);
    };
    const inputNumber = (min,max,step) =>{
      if(min instanceof Object){
        const {value,max=10,step=1,placeholder=""}=min;
        min=min?.min??0;
        return new ZikoUIInputSlider(min, max, step).setValue(value).setPlaceholder(placeholder);
      }
      return new ZikoUIInputNumber(min,max,step);
    };
    const search = (...a) => new ZikoUIInputSearch().connect(...a);
    const inputImage = (text) => new ZikoUIInputImage(text);
    const inputPassword = () => new ZikoUIInputPassword();
    const inputEmail = () => new ZikoUIInputEmail();
    const inputColor = () => new ZikoUIInputColor();
    const inputTime = () => new ZikoUIInputTime();
    const inputDate = () => new ZikoUIInputDate();
    const inputDateTime = () => new ZikoUIInputDateTime();
    const checkbox = () => new ZikoUIInputCheckbox();
    const radio = () => new ZikoUIInputRadio();

    class ZikoUISelect extends ZikoUIElement {
        constructor(){
          super();
          this.element=document.createElement("select");
          this.render();
        }
        addOptions(...options) {
          options.map(n => this.append(new ZikoUIInputOption(n)));
          return this;
        }
      }
    const select=()=>new ZikoUISelect();

    class ZikoUIVideo extends ZikoUIElement {
        constructor(src="", w = "100%", h = "50vh") {
          super();
          this.element = document.createElement("video");
          if (src.nodeName === "VIDEO") this.element.setAttribute("src", src.src);
          else this.element.setAttribute("src", src);
          if (typeof w == "number") w += "%";
          if (typeof h == "number") h += "%";
          this.style({ width: w, height: h });
          this.render();
        }
        controls(enabled = true) {
          this.element.controls = enabled;
          return this;
        }
        play() {
          this.element.play();
          return this;
        }
        pause() {
          this.element.pause();
          return this;
        }
        poster(src=""){
          this.element.poster=src;
          return this;
        }
        PIP(e){
          this.element.requestPictureInPicture(e);
          return this;
        }
      }
    const video = (src, width, height) => new ZikoUIVideo(src, width, height);

    class ZikoUIWebcame extends ZikoUIVideo{
        constructor(){
          super();
          this.element.setAttribute("src", "");
          this.constraints = { audio: true, video: { width: 1280, height: 720 } };
          //this.video=this.element
        }
        start(){
          navigator.mediaDevices.getUserMedia(this.constraints).then((mediaStream)=>{
            this.element.srcObject = mediaStream;
            this.element.onloadedmetadata = () =>{
              this.element.play();
            };
          })
          .catch(function(err) { console.log(err.name + ": " + err.message); });
          return this;
        }
      }
      const inputCamera=()=>new ZikoUIWebcame();

    class ZikoUIImage extends ZikoUIElement {
        constructor(src, w, h) {
          super();
          this.element = document.createElement("img");
          this.value=src;
          if (src.nodeName === "IMG")this.element.setAttribute("src", src.src);
          else this.element.setAttribute("src", src);
          if (typeof w == "number") w += "%";
          if (typeof h == "number") h += "%";
          this.style({ border: "1px solid black", width: w, height: h });
          this.render();
        }
         updateSrc(url){
          this.value=url;
          this.element.src=url;
         return this;
        }
        toggleSrc(...values){
          values=values.map(n=>""+n);
          let index=values.indexOf(""+this.value);
          if(index!=-1&&index!=(values.length-1))this.updateSrc(values[index+1]);
          else this.updateSrc(values[0]);
          return this;
        }
        alt(alt){
          this.element.alt=alt;
          return this;
        }
      }
      
      
      class ZikoUIAudio extends ZikoUIElement {
        constructor(src) {
          super();
          this.element = document.createElement("audio");
          this.element.setAttribute("src", src);
          this.render();
          this.controls();
        }
        controls(enabled = true) {
          this.element.controls = enabled;
          return this;
        }
        play() {
          this.element.play();
          return this;
        }
        pause() {
          this.element.pause();
          return this;
        }
      }
      class ZikoUIFigure extends ZikoUIElement{
        constructor(src,caption){
          super();
          this.element=document.createElement("figure");
          this.img=src.width("100%").element;
          this.caption=document.createElement("figcaption");
          this.caption.append(caption.element);
          this.element.append(this.img);
          this.element.append(this.caption);
          this.render();
        }
      }

    const image = (src, width, height) => new ZikoUIImage(src, width, height);
    const audio = (src) => new ZikoUIAudio(src);
    const figure =(image,caption) =>new ZikoUIFigure(image,caption);

    function set_vertical(direction){
        direction == 1
          ? this.style({ flexDirection: "column" })
          : direction == -1 && this.style({ flexDirection: "column-reverse" });
        return this;
      }
    function set_horizontal(direction){
      direction == 1
          ? this.style({ flexDirection: "row" })
          : direction == -1 && this.style({ flexDirection: "row-reverse" });
        return this;
    }
    function map_pos_x(align){
      let pos = ["flex-start", "center", "flex-end"];
      if (typeof align === "number") align = pos[align + 1];
      return align;
    }
    function map_pos_y(align){
      return map_pos_x(-align);
    }
    class ZikoUIFlex extends ZikoUIElement {
      constructor(tag ="div", w = "50vw", h = "50vh") {
        super();
        this.element = document.createElement(tag);
        this.direction = "cols";
        if (typeof w == "number") w += "%";
        if (typeof h == "number") h += "%";
        this.style({ border: "1px solid black", width: w, height: h });
        this.style({ display: "flex" });
        this.render();
      }
      resp(px,wrap = true) {
        this.wrap(wrap);
        if (this.element.clientWidth < px) this.vertical();
        else this.horizontal();
        return this;
      }
      setSpaceAround() {
        this.style({ justifyContent: "space-around" });
        return this;
      }
      setSpaceBetween() {
        this.style({ justifyContent: "space-between" });
        return this;
      }
      setBaseline() {
        this.style({ alignItems: "baseline" });
        return this;
      }
      gap(g) {
        if (this.direction === "row") this.style({ columnGap: g });
        else if (this.direction === "column") this.style({ rowGap: g });
        return this;
      }
      wrap(value = "wrap") {
        const values = ["no-wrap", "wrap","wrap-reverse"];
        this.style({
          flexWrap: typeof value === "string" ? value : values[+value],
        });
        return this;
      }
      _justifyContent(align = "center") {
        this.style({ justifyContent: align });
        return this;
      }
      vertical(x, y, order=1) {
        console.log(111111111111);
        set_vertical.call(this,order);
        this.style({
          alignItems: typeof(x)==="number"?map_pos_x.call(this,x):x,
          justifyContent: typeof(y)=="number"?map_pos_y.call(this,y):y
        });
        return this;
      }
      horizontal(x, y, order=1) {
        set_horizontal.call(this,order);
        this.style({
          alignItems: typeof(y)=="number"?map_pos_y.call(this,y):y,
          justifyContent: typeof(x)==="number"?map_pos_x.call(this,x):x
        });
        return this;
      }
      show() {
        this.isHidden = false;
        this.style({ display: "flex" });
        return this;
      }
    }

    const Flex = (...ZikoUIElement) => new ZikoUIFlex("div").append(...ZikoUIElement);

    class ZikoUINoteBook extends ZikoUIFlex{
        constructor(){
            super();
        }
        addSection(){
            const Input=Section().style({
                width:"80%",
                height:"50px",
                margin:"5px 0px",
                border:"1px red solid"
            });
            this.append(Input);
            return this;
        }
    }

    const Notebook = () => new ZikoUINoteBook();

    class ZikoUIMain extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("main");
          this.render();
        }
      }
      class ZikoUIHeader extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("header");
          this.render();
        }
      }
      class ZikoUINav extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("nav");
          this.render();
        }
      }
      class ZikoUISection extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("section");
          this.style({position:"relative"});
          this.render();
        }
      }
      class ZikoUIArticle extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("article");
          this.render();
        }
      }
      class ZikoUIAside extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("aside");
          this.render();
        }
      }
      class ZikoUIFooter extends ZikoUIElement{
        constructor(){
          super();
          this.element=document.createElement("footer");
          this.render();
        }
      }
    const Section$1 = (...ZikoUIElement) => new ZikoUISection().append(...ZikoUIElement);
    const Article = (...ZikoUIElement) => new ZikoUIArticle().append(...ZikoUIElement);
    const Main = (...ZikoUIElement) => new ZikoUIMain().append(...ZikoUIElement);
    const Header = (...ZikoUIElement) => new ZikoUIHeader().append(...ZikoUIElement);
    const Footer = (...ZikoUIElement) => new ZikoUIFooter().append(...ZikoUIElement);
    const Nav = (...ZikoUIElement) => new ZikoUINav().append(...ZikoUIElement);
    const Aside = (...ZikoUIElement) => new ZikoUIAside().append(...ZikoUIElement);
    const FlexHeader = (...ZikoUIElement) => new ZikoUIFlex("header").append(...ZikoUIElement);
    const FlexMain = (...ZikoUIElement) => new ZikoUIFlex("main").append(...ZikoUIElement);
    const FlexArticle = (...ZikoUIElement) => new ZikoUIFlex("article").append(...ZikoUIElement);
    const FlexSection = (...ZikoUIElement) => new ZikoUIFlex("section").append(...ZikoUIElement);
    const FlexAside = (...ZikoUIElement) => new ZikoUIFlex("aside").append(...ZikoUIElement);
    const FlexNav = (...ZikoUIElement) => new ZikoUIFlex("nav").append(...ZikoUIElement);
    const FlexFooter = (...ZikoUIElement) => new ZikoUIFlex("footer").append(...ZikoUIElement);

    class ZikoUITr extends ZikoUIElement{
        constructor(...ZikoUIElement){
            super();
            this.element=document.createElement("Tr");
            this.append(...ZikoUIElement);
        }
    }
    class ZikoUITd extends ZikoUIElement{
        constructor(...ZikoUIElement){
            super();
            this.element=document.createElement("Td");
            this.append(...ZikoUIElement);
        }
    }
    class ZikoUITbody extends ZikoUIElement{
        constructor(...ZikoUITr){
            super();
            this.element=document.createElement("Tbody");
            this.append(...ZikoUITr);
        }
    }
    class ZikoUICaption extends ZikoUIElement{
        constructor(ZikoUIElement){
            super();
            this.element=document.createElement("Caption");
            this.append(ZikoUIElement);
        }
    }

    const tr=(...ZikoUIElement)=>new ZikoUITr(...ZikoUIElement);
    const td=(...UI)=>{
        UI=UI.map(n=>{
            if(!(n instanceof ZikoUIElement))n=text(n);
            return n
        });
        return new ZikoUITd(...UI)
    };
    const thead=(...ZikoUITd)=>{
        ZikoUITd=ZikoUITd.map(n=>{
            if(!(n instanceof ZikoUIElement))n=td(n);
            return n
        });
        return new ZikoUITd(...UI)
    };
    const tbody=(...ZikoUITr)=>new ZikoUITbody(...ZikoUITr);
    const caption=(ZikoUITr)=>new ZikoUICaption(ZikoUITr);

    const MatrixToTableUI=matrix=>{
        var Tr = new Array(matrix.rows).fill(null).map(() => tr());
        var Td = matrix.arr.map((n) => n.map(() => null));
        for (let i = 0; i < Td.length; i++) {
            for (let j = 0; j < Td[0].length; j++) {
                Td[i][j] = td(matrix.arr[i][j]);
                Tr[i].append(Td[i][j]);
            }
        }
        return Tr
    };

    class ZikoUITable extends ZikoUIElement {
        constructor(body=matrix(0,0)){
            super();
            this.element = document.createElement("table");
            this.fromMatrix(body);
            this.structure={
                caption:null,
                head:null,
                body:0,
                foot:null
            };
            this.render();
        }
        setCaption(c){
            this.tCaption=caption(c);
            this.append(this.tCaption);
            return this;
        }
        removeCaption(){
            this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
            return this;
        }
        setHeader(...c){
            this.tHead=thead(...c);
            this.append(this.tHead);
            return this;
        }
        removeHeader(){
            this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
            return this;
        }
        setFooter(c){
            this.tCaption=caption(c);
            this.append(this.tCaption);
            return this;
        }
        removeFooter(){
            this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
            return this;
        }
        fromMatrix(bodyMatrix) {
            (bodyMatrix instanceof Array)?this.bodyMatrix=matrix(bodyMatrix):this.bodyMatrix=bodyMatrix;
            if(this?.tbody?.items?.length)this.tbody.remove();
            this.tbody=tbody();
            this.append(this.tbody);
            this.tbody.append(...MatrixToTableUI(this.bodyMatrix));
            //this.structure.body.append(...MatrixToTableUI(matrix))
            //this.cellStyles({ padding: "0.2rem 0.4rem", textAlign: "center" });
            return this;
          }
        transpose() {
            this.fromMatrix(this.bodyMatrix.T);
            return this;
          }
        hstack(m) {
            if(m instanceof ZikoUITable)m=m.bodyMatrix;
            this.fromMatrix(this.bodyMatrix.clone.hstack(m));
            return this;
        }
        vstack(m) {
            if(m instanceof ZikoUITable)m=m.bodyMatrix;
            this.fromMatrix(this.bodyMatrix.clone.vstack(m));
            return this;
        }
        slice(r0=0,c0=0,r1=this.bodyMatrix.rows-1,c1=this.bodyMatrix.cols-1) {
            this.fromMatrix(this.bodyMatrix.slice(r0,c0,r1,c1));
            return this;
          }
        sortByCols(n, config = { type: "num", order: "asc" }) {
            this.fromMatrix(this.bodyMatrix.clone.sortTable(n, config));
            return this;
        }
        sortByRows(n, config = { type: "num", order: "asc" }) {
            this.fromMatrix(this.bodyMatrix.T.clone.sortTable(n, config).T);
            return this;
        }
        filterByRows(item) {
            this.fromMatrix(this.bodyMatrix.clone.filterByRows(item));
            return this;
        }
        filterByCols(item) {
            this.fromMatrix(this.bodyMatrix.clone.filterByCols(item));
            return this;
          }
    }
    const Table=(matrix)=>new ZikoUITable(matrix);

    const UI$1={
        text,
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        btn,
        br,
        hr,
        brs,
        hrs,
        link,
        ol,
        ul,
        input,
        search,
        slider,
        checkbox,
        radio,
        datalist,
        inputNumber,
        inputColor,
        inputDate,
        inputDateTime,
        inputEmail,
        inputImage,
        inputPassword,
        inputTime,
        select,
        textarea,
        inputCamera,
        image,
        video,
        audio,
        figure,
        Flex,
        Header,
        FlexHeader,
        Main,
        FlexMain,
        Section: Section$1,
        FlexSection,
        Article,
        FlexArticle,
        Aside,
        FlexAside,
        Nav,
        FlexNav,
        Footer,
        FlexFooter,
        Table,
        Notebook
    };

    const Garbage={
        Key:{
            data:[],
            dispose:function(){
                this.data.map(n=>n?.event?.dispose());
                return this;
            },
            destroy:function(){
                this.dispose();
                this.data.length=0;
                return this;
            }
        },
        Pointer:{
            data:[],
            dispose:function(){
                this.data.map(n=>n?.event?.dispose());
                return this;
            },
            destroy:function(){
                this.dispose();
                this.data.length=0;
                return this;
            }
        },
        Drag:{
            data:[],
            dispose:function(){
                this.data.map(n=>n?.event?.dispose());
                return this;
            },
            destroy:function(){
                this.dispose();
                this.data.length=0;
                return this;
            }
        }
    };

    class ZikoEventPointer{
            #downController
            #moveController
            #upController
            #enterController
            #outController
            #leaveController
            #dispose
        constructor(target){
            this._Target=window;
            this.event=null;
            this.dx=0;
            this.dy=0;
            this.dt=0;
            this.mx=0;
            this.my=0;
            this.mt=0;
            this.ux=0;
            this.uy=0;      
            this.ut=0;
            this.isMoving=false;
            this.isDown=false;
            this.cache={
                preventDefault:{
                    down:false,
                    move:false,
                    up:false,
                    enter:false,
                    out:false,
                    leave:false,
                },
                Enabled:{
                    down:false,
                    move:false,
                    up:false,
                    enter:false,
                    out:false,
                    leave:false,
                },
                callback:{
                    down:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                    move:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                    up:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})],
                    enter:[(self)=>console.log({dx:self.dx,dy:self.dy,down:self.down,move:self.move,t:self.dt})],
                    out:[(self)=>console.log({mx:self.mx,my:self.my,down:self.down,move:self.move,t:self.dt})],
                    leave:[(self)=>console.log({ux:self.ux,uy:self.uy,down:self.down,move:self.move,t:self.dt})]
                },
                down:[],
                move:[],
                up:[],
                enter:[],
                out:[],
                leave:[]
            };
            this.#downController=this.#updateDown.bind(this);
            this.#moveController=this.#updateMove.bind(this);
            this.#upController=this.#updateUp.bind(this);
            this.#enterController=this.#updateEnter.bind(this);
            this.#outController=this.#updateOut.bind(this);
            this.#leaveController=this.#updateLeave.bind(this);
            this.#dispose=this.dispose.bind(this);
            this.EventIndex=Garbage.Pointer.data.length;
            Garbage.Pointer.data.push({event:this,index:this.EventIndex});
            this.target(target);
        }
        target(UI){
            this._Target=UI?.element||document.querySelector(UI);
            return this;
        }
        #updateDown(e){
            this.event=e;
            if(this.cache.preventDefault.down)e.preventDefault();
            this.dx=parseInt(e.offsetX);
            this.dy=parseInt(e.offsetY);
            this.isDown=true;
            if(this.cache.Enabled.down)this.cache.down.push({x:this.dx,y:this.dy});
            this.cache.callback.down.map(n=>n(this));
            return this;
        }
        handleDown(){
           this._Target.addEventListener("pointerdown",this.#downController);
           return this;
        }
        #updateMove(e){
            this.event=e;
            if(this.cache.preventDefault.move)e.preventDefault();
            this.mx=parseInt(e.offsetX);
            this.my=parseInt(e.offsetY);
            this.isMoving=true;
            if(this.cache.Enabled.move)this.cache.move.push({x:this.mx,y:this.my,down:this.isDown,t:this.mt});
            this.cache.callback.move.map(n=>n(this)); 
            return this;
            
        }
        handleMove(){
           this._Target.addEventListener("pointermove",this.#moveController);
           return this;
        }
        #updateUp(e){
            this.event=e;
            if(this.cache.preventDefault.up)e.preventDefault();
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
            if(this.cache.Enabled.up)this.cache.up.push({x:this.ux,y:this.uy,t:this.ut});
            this.cache.callback.up.map(n=>n(this)); 
            return Pointer;
        }
        handleUp(){
           this._Target.addEventListener("pointerup",this.#upController);
           return this;
        }
        #updateEnter(e){
            this.event=e;
            if(this.cache.preventDefault.up)e.preventDefault();
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
            if(this.cache.Enabled.enter)this.cache.enter.push({x:this.ux,y:this.uy,t:this.ut});
            this.cache.callback.enter.map(n=>n(this)); 
            return Pointer;
        }
        handleEnter(){
           this._Target.addEventListener("pointerenter",this.#enterController);
           return this;
        }
        #updateOut(e){
            this.event=e;
            if(this.cache.preventDefault.up)e.preventDefault();
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
            if(this.cache.Enabled.out)this.cache.out.push({x:this.ux,y:this.uy,t:this.ut});
            this.cache.callback.out.map(n=>n(this)); 
            return Pointer;
        }
        handleOut(){
           this._Target.addEventListener("pointerout",this.#outController);
           return this;
        }
        #updateLeave(e){
            this.event=e;
            if(this.cache.preventDefault.up)e.preventDefault();
            this.ux=parseInt(e.offsetX);
            this.uy=parseInt(e.offsetY);
            this.isDown=false;
            if(this.cache.Enabled.leave)this.cache.leave.push({x:this.ux,y:this.uy,t:this.ut});
            this.cache.callback.leave.map(n=>n(this)); 
            return Pointer;
        }
        handleLeave(){
           this._Target.addEventListener("pointerleave",this.#leaveController);
           return this;
        }
        handle({down=false,move=false,up=false}={}){
            if(down)this.handleDown();
            if(move)this.handleMove();
            if(up)this.handleUp();
        }
        dispose({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
            if(down)this._Target.removeEventListener("pointerdown",this.#downController);
            if(move)this._Target.removeEventListener("pointermove",this.#moveController);
            if(up)this._Target.removeEventListener("pointerup",this.#upController);
            if(enter)this._Target.removeEventListener("pointerenter",this.#enterController);
            if(out)this._Target.removeEventListener("pointerout",this.#outController);
            if(leave)this._Target.removeEventListener("pointerleave",this.#leaveController);
            return this;
         }
        stream({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
            Object.assign(this.cache.Enabled,{down,move,up,enter,out,leave});
            return this;
         }
        clear({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
            if(down)this.cache.down=[];
            if(move)this.cache.move=[];
            if(up)this.cache.up=[];
            if(enter)this.cache.enter=[];
            if(out)this.cache.out=[];
            if(leave)this.cache.leave=[];
            return this;
        }
         preventDefault({down=true,move=true,up=true,enter=true,out=true,leave=true}={}){
            Object.assign(this.cache.preventDefault,{down,move,up,enter,out,leave});
            return this;
         }
         onDown(...callback){
            if(callback.length===0)return this;
            this.cache.callback.down=callback.map(n=>e=>n.call(this,e));
            return this;
         }
         onMove(...callback){
            if(callback.length===0)return this;
            this.cache.callback.move=callback.map(n=>e=>n.call(this,e));
            return this;
         }
         onUp(...callback){
            if(callback.length===0)return this;
            this.cache.callback.up=callback.map(n=>e=>n.call(this,e));
            return this;
         }
         onEnter(...callback){
            if(callback.length===0)return this;
            this.cache.callback.enter=callback.map(n=>e=>n.call(this,e));
            return this;
         }
         onOut(...callback){
            if(callback.length===0)return this;
            this.cache.callback.out=callback.map(n=>e=>n.call(this,e));
            return this;
         }
         onLeave(...callback){
            if(callback.length===0)return this;
            this.cache.callback.leave=callback.map(n=>e=>n.call(this,e));
            return this;
         }
    }
    var Pointer=target=>new ZikoEventPointer(target);

    /*
    Pointer._Target=document.querySelector(".input")
    Pointer.handleDown()
    Pointer.handleMove()
    Pointer.handleUp()
    */

    const Events={
        Pointer
    };

    class ZikoUISvgElement{
        color({stroke,fill}){
          this.element.setAttribute("stroke",stroke);
          this.element.setAttribute("fill",fill);
          return this; 
        }
        fill(color="none"){
          this.element.setAttribute('fill', color);
          return this;
        }
        stroke(color="none",width){
          this.element.setAttribute('stroke', color);
          width && this.strokeWidth(width);
          return this;
        }
        strokeWidth(width=1){
          this.element.setAttribute('stroke-width', width);
          return this;
        }
        opacity(value=1){
          this.element.setAttribute('opacity', value);
          return this;   
        }
        }

    class ZikoUISvgRectangle extends ZikoUISvgElement{
        constructor(x,y,w,h,center=true){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect",
          );
          this.setX(x).setY(y).width(w).height(h);
          this.rx=this.x+this.w/2;
          this.ty=this.y+this.h/2;
        }
        setX(x){
           this.element.x.baseVal.value=x;
           this.x=x;
           return this;
        }
        setY(y){
           this.element.y.baseVal.value=y;
           this.y=y;
           return this;
        }
        r(rx,ry){
          this.rx=rx;
          this.ry=ry;
          this.setX(this.rx-this.w/2);
          this.setY(this.ry-this.h/2);
          return this;
        } 
        width(w){
           this.element.width.baseVal.value=w;
           this.w=w;
           return this;
        } 
        height(h){
           this.element.height.baseVal.value=h;
           this.h=h;
           return this;
        } 
      } 
      const svgRect=(x,y,w,h,center)=>new ZikoUISvgRectangle(x,y,w,h,center);

    class ZikoUISvgCircle extends ZikoUISvgElement{
        constructor(cx,cy,r){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
          );
          this.cx(cx).cy(cy).r(r);
        }
        cx(cx){
           this.element.cx.baseVal.value=cx;
           return this;
        }
        cy(cy){
           this.element.cy.baseVal.value=cy;
           return this;
        }
        r(r){
           this.element.r.baseVal.value=r;
           return this;
        }
        get R(){
          return this.element.r.baseVal.value;
        }
        get Cx(){
          return this.element.cx.baseVal.value;
        } 
        get Cy(){
          return this.element.cy.baseVal.value;
        }  
      } 
    const svgCircle=(x,y,r)=>new ZikoUISvgCircle(x,y,r);

    class ZikoUISvgEllipse extends ZikoUISvgElement{
        constructor(cx,cy,rx,ry){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse",
          );
          this.cx(cx).cy(cy).rx(rx).ry(ry);
        }
        cx(cx){
           this.element.cx.baseVal.value=cx;
           return this;
        }
        cy(cy){
           this.element.cy.baseVal.value=cy;
           return this;
        }
        rx(rx){
           this.element.rx.baseVal.value=rx;
           return this;
        } 
        ry(ry){
           this.element.ry.baseVal.value=ry;
           return this;
        } 
      } 
    const svgEllipse=(x,y,rx,ry)=>new ZikoUISvgEllipse(x,y,rx,ry);

    class ZikoUISvgLine extends ZikoUISvgElement{
        constructor(x1,y1,x2,y2){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
          );
          this.x1(x1).y1(y1).x2(x2).y2(y2).stroke("black");
        }
        x1(x1){
           this.element.x1.baseVal.value=x1;
           return this;
        }
        y1(y1){
           this.element.y1.baseVal.value=y1;
           return this;
        }
        x2(x2){
           this.element.x2.baseVal.value=x2;
           return this;
        } 
        y2(y2){
           this.element.y2.baseVal.value=y2;
           return this;
        } 
      } 
    const svgLine=(x1,y1,x2,y2)=>new ZikoUISvgLine(x1,y1,x2,y2);

    class ZikoUISvgPolygon extends ZikoUISvgElement{
        constructor(X=[],Y=[]){
          super();
          this.X=X;
          this.Y=Y;
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polygon",
          );
          this.element.setAttribute("points","");
        }
        addPoint(x,y){
          let p=this.element.parentElement.createSVGPoint();
          p.x=x;
          p.y=y;
          this.element.points.appendItem(p);
          return this;
        }
        addPoints(X,Y){
          for(let i=0;i<X.length;i++){
            let p=this.element.parentElement.createSVGPoint();
            p.x=X[i];
            p.y=Y[i];
            this.element.points.appendItem(p);
          }
          return this;
        }
      } 
    const svgPolygon=(X,Y)=>new ZikoUISvgPolygon(X,Y);

    class ZikoUISvgImage extends ZikoUISvgElement{
        constructor(src="",w="100%",h="100%",x=0,y=0){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "image",
          );
          this.setSrc(src).width(w).height(h).x(x).y(y);
        }
        x(x){
           this.element.x.baseVal.value=x;
           return this;
        }
        y(y){
           this.element.y.baseVal.value=y;
           return this;
        }
        width(w){
           this.element.setAttribute("width",w);
           return this;
        }
        height(h){
           this.element.setAttribute("height",h);
           return this;
        }
        setSrc(src=""){
          this.element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
          return this;
        }
      } 
    const svgImage=(src,w,h,x,y)=>new ZikoUISvgImage(src,w,h,x,y);

    class ZikoUISvgText extends ZikoUISvgElement{
        constructor(text,x,y){
          super();
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text",
          );
          this.setText(text);
          this.x(x).y(y);
        }
        x(x){
           this.element.setAttribute("x",x);
           return this;
        }
        y(y){
           this.element.setAttribute("y",y);
           return this;
        }
        setText(text=""){
          this.element.textContent=text;
          return this;
        }
      } 
    const svgText=(text,x,y)=>new ZikoUISvgText(text,x,y);

    class ZikoUISvgGroupe extends ZikoUISvgElement{
        constructor(...svgElement){
          super();
          this.items=[];
          this.element=document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g",
          );
          this.add(...svgElement);
        }
        add(...svgElement){
          for(let i=0;i<svgElement.length;i++){
            this.element.appendChild(svgElement[i].element);
            this.items.push(svgElement[i]);
          }
          if(svgElement.length===1)return svgElement[0]
          return svgElement;
        }
        remove(...svgElement){
          for(let i=0;i<svgElement.length;i++){
            this.element.removeChild(svgElement[i].element);
            this.items=this.items.filter(n=>!svgElement);
          }
          return this;     
        }
    }
    const svgGroupe=(...svgElement)=>new ZikoUISvgGroupe(...svgElement);

    //import svgObject from "./Elements/foreignObject.js";
    //import svgGrid from "./Elements/grid.js";

      class ZikoUISvg extends ZikoUIElement {
        constructor(w=360,h=300) {
          super();
          this.element=document.createElementNS("http://www.w3.org/2000/svg", "svg");
          //this.cache={};
          this.setAttribute("width",w);
          this.setAttribute("height",h);
          this.style({border:"1px black solid"});
          //this.view(-w/2,-h/2,w/2,h/2)
          //this.view(-10,-10,10,10);
          this.render();
        }
        view(x1,y1,x2,y2){
          let width=Math.abs(x2-x1);
          let height=Math.abs(y2-y1);
          //this.element.style.transform="scale("+Math.sign(x2-x1)+","+(-Math.sign(y2-y1))+")";
          this.element.setAttribute("viewBox",[x1,y1,width,height].join(" "));
          //console.log({width:width,height:height})
          return this;
      
        }
        add(...svgElement){
          for(let i=0;i<svgElement.length;i++){
            this.element.appendChild(svgElement[i].element);
            this.items.push(svgElement[i]);
          }
          if(svgElement.length===1)return svgElement[0]
          return svgElement;
        }
        remove(...svgElement){
          for(let i=0;i<svgElement.length;i++){
            this.element.removeChild(svgElement[i].element);
            this.items=this.items.filter(n=>!svgElement);
          }
          return this;     
        }
        text(text,x,y){
          let item=svgText(text,x,y);
          this.element.appendChild(item.element);
          item.x(x-item.element.getComputedTextLength()/2);
          return item;
        }
        rect(x,y,w,h){
          let item=svgRect(x,y,w,h);
          this.add(item);
          return item;
        }
        line(x1,y1,x2,y2){
          let item=svgLine(x1,y1,x2,y2);
          this.element.appendChild(item.element);
          return item;
        }
        circle(cx,cy,r){
          let item=svgCircle(cx,cy,r);
          this.element.appendChild(item.element);
          return item;
        }
        ellipse(cx,cy,rx,ry){
          let item=svgEllipse(cx,cy,rx,ry);
          this.element.appendChild(item.element);
          return item;
        }
        polygon(X,Y){
          let item=svgPolygon(X,Y);
          this.element.appendChild(item.element);
          item.addPoints(X,Y);
          return item;
        }
        image(src,w,h,x,y){
          let item=svgImage(src,w,h,x,y);
          this.element.appendChild(item.element);
          return item;
        }
        mask(){
      
        }
        toString(){
          return  (new XMLSerializer()).serializeToString(this.element);
        }
        btoa(){
          return btoa(this.toString())
        }
        toImg(){
          return 'data:image/svg+xml;base64,'+this.btoa()
        }
        toImg2(){
          return "data:image/svg+xml;charset=utf8,"+this.toString().replaceAll("<","%3C").replaceAll(">","%3E").replaceAll("#","%23").replaceAll('"',"'");
        }
      }

      const Svg =(w,h)=>new ZikoUISvg(w,h);

    class ZikoUICanvas extends ZikoUIElement{
        constructor(w,h){
            super();
            this.element=document.createElement("canvas");
            this.ctx = this.element.getContext("2d");
            this.style({
                border:"1px red solid",
                //width:"300px",
                //height:"300px"
            });
            this.transformMatrix=new Matrix([
                [1,0,0],
                [0,1,0],
                [0,0,1]
            ]);
            this.axisMatrix=new Matrix([
                [-10,-10],
                [10,10]
            ]);
            this.render();
        }
        get Width(){
            return this.element.width;
        }
        get Height(){
            return this.element.height;
        }
        draw(){
            this.clear();  
            this.items.forEach(element => {
                element.parent=this;
                element.draw(this.ctx);
            });
            return this;
        }
        #applyTransformMatrix(){
            this.ctx.setTransform(
                this.transformMatrix[0][0],
                this.transformMatrix[1][0],
                this.transformMatrix[0][1],
                this.transformMatrix[1][1],
                this.transformMatrix[0][2],
                this.transformMatrix[1][2],
            );
            return this;
        }
        size(w,h){
            this.style({
                width:w,
                height:h
            });
            //this.lineWidth();
            this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
            return this;
        }
        adjust(){
            this.element.width=this.element.getBoundingClientRect().width;
            this.element.height=this.element.getBoundingClientRect().height;
            this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
            return this;
        }
        view(xMin,yMin,xMax,yMax){
            this.transformMatrix[0][0]=this.Width/(xMax-xMin); // scaleX
            this.transformMatrix[1][1]=-this.Height/(yMax-yMin); // scaleY
            this.transformMatrix[0][2]=this.Width/2;
            this.transformMatrix[1][2]=this.Height/2;
            this.axisMatrix=new Matrix([
                [xMin,yMin],
                [xMax,yMax]
            ]);
            
            this.#applyTransformMatrix(); 
            this.clear();
            this.lineWidth(1);
            this.draw();
            return this;
        }
        reset(){
            this.ctx.setTransform(1,0,0,0,0,0);
            return this;
        }
        append(element){
            this.items.push(element);
            this.draw();
            return this;
        }
        background(color){
            this.ctx.fillStyle = color;
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.fillRect(0, 0, this.Width, this.Height);
            this.#applyTransformMatrix();
            this.draw();
        }
        lineWidth(w){
            this.ctx.lineWidth=w/this.transformMatrix[0][0];        return this
        }
        clear(){
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx.clearRect(0, 0, this.Width, this.Height);
            this.#applyTransformMatrix(); 
            return this;
        }
        zoomIn(){

        }
        zoomOut(){
            
        }
        undo(n){

        }
        redo(n){

        }
        stream(){

        }
    }

    const Canvas=(w,h)=>new ZikoUICanvas(w,h);

    class ZikoCanvasElement{
        constructor(x,y){
            this.parent=null;
            this.position={
                x,
                y
            };
            this.cache={
                interact:" avoid redraw",
                config:{
                    draggable:false,
                    selected:false,
                    highlighted:false,
                    rendered:false
                },
                style:{
                    normal:{
                        strokeEnabled:true,
                        fillEnabled:false,
                        strokeColor:"#111111",
                        fillColor:"#777777",
                    },
                    highlighted:{
                        strokeEnabled:true,
                        fillEnabled:false,
                        strokeColor:null,
                        fillColor:null,
                    }
                },
            };
            this.history={
                position:[],
                styles:[]
            };
            this.render();
        }
        isIntersectedWith(){

        }
        isPointInside(x,y){

        }
        posX(x){
            this.position.x=x;
            if(this.parent)this.parent.draw();
            return this;
        }
        posY(y){
            this.position.y=y;
            if(this.parent)this.parent.draw();
            return this;
        }
        color({stroke=this.cache.style.normal.strokeColor,fill=this.cache.style.normal.fillColor}={stroke,fill}){
            this.cache.style.normal.strokeColor=stroke;
            this.cache.style.normal.fillColor=fill;
            if(this.parent)this.parent.draw();
            return this;
        }
        translate(dx=0,dy=0){
            this.position.x+=dx;
            this.position.y+=dy;
            if(this.parent)this.parent.draw();
            return;
        }
        applyNormalStyle(ctx){
            ctx.strokeStyle=this.cache.style.normal.strokeColor;
            ctx.fillStyle=this.cache.style.normal.fillColor;
            return this;   
        }
        applyHighlightedStyle(ctx){
            ctx.strokeStyle=this.cache.style.highlighted.strokeColor;
            ctx.fillStyle=this.cache.style.highlighted.fillColor;
            return this;
        }
        stroke(state=true){
            this.cache.style.normal.strokeEnabled=state;
            if(this.parent)this.parent.draw();
            return this  
        }
        fill(state=true){
            this.cache.style.normal.fillEnabled=state;
            if(this.parent)this.parent.draw();
            return this      
        }
        render(render=true){
           this.cache.config.rendered=render;
           return this;       
        }
    }

    class CanvasCircle extends ZikoCanvasElement{
        constructor(x,y,r){
            super(x,y);
            this.r=r;
        }
        draw(ctx){
            if(this.cache.config.rendered){
                ctx.save();
                this.applyNormalStyle(ctx);
                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2);
                const{strokeEnabled,fillEnabled}=this.cache.style.normal;
                if(strokeEnabled)ctx.stroke();
                if(fillEnabled)ctx.fill();
                ctx.closePath(); 
                ctx.restore();
            }
            return this;   
        }
        radius(r){
            this.r=r;
            if(this.parent)this.parent.draw();
            return this;
        }
        distanceFromCenter(x,y){
            return Math.sqrt(
                (this.position.x-x)**2-(this.position.y-y)**2
            )
        }
        isIn(x,y,strict=false){
            return strict?this.distanceFromCenter(x,y)<this.r:this.distanceFromCenter(x,y)<=this.r;
        }
        isInEdges(x,y){
            return this.distanceFromCenter(x,y)===this.r;
        }
    }
    const canvasCircle=(x,y,r)=>new CanvasCircle(x,y,r);

    class CanvasPoints extends ZikoCanvasElement{
        constructor(ptsX,ptsY){
            super();
            this.pointsMatrix=null;
            this.path=new Path2D();
            this.fromXY(ptsX,ptsY);
        }
        get points(){
            return this.pointsMatrix.T.arr;
        }
        draw(ctx){
            if(this.cache.config.rendered){
                ctx.save();
                this.applyNormalStyle(ctx);
                ctx.beginPath();
                this.path.moveTo(...this.points[0]);
                for(let i=1;i<this.points.length;i++){
                    this.path.lineTo(...this.points[i]);
                }
                ctx.stroke(this.path);
                ctx.restore();
            }
            return this;
        }
        fromXY(X,Y){
            this.pointsMatrix=matrix([X,Y]);
            return this;
        }
        push(ptsX,ptsY){
            this.pointsMatrix.hstack(matrix([ptsX,ptsY]));
            if(this.parent)this.parent.draw();
            return this;
        }
    }

    const canvasPoints=(ptsX=[],ptsY=[])=>new CanvasPoints(ptsX,ptsY);

    class CanvasLine extends ZikoCanvasElement{
        constructor(x0,y0,x1,y1){
            super();
            this.x0=x0;
            this.x1=x1;
            this.y0=y0;
            this.y1=y1;
            delete this.fill;
        }
        draw(ctx){
            if(this.cache.config.rendered){
                ctx.save();
                this.applyNormalStyle(ctx);
                ctx.beginPath();
                ctx.moveTo(this.x0,this.y0);
                ctx.lineTo(this.x1,this.y1);
                ctx.stroke();
                if(this.cache.style.normal.strokeEnabled)ctx.stroke();
                ctx.restore();
            }
            return this;   
        }
    }
    const canvasLine=(x0,y0,x1,y1)=>new CanvasLine(x0,y0,x1,y1);

    const Graphics={
        Svg,
        ZikoUISvg,
        svgCircle,
        svgEllipse,
        svgImage,
        svgLine,
        svgPolygon,
        svgRect,
        svgText,
        svgGroupe,
        Canvas, 
        canvasCircle,
        canvasPoints,
        canvasLine
    };

    const Ziko$1={
        Math: Math$1,
        UI: UI$1,
        Graphics,
        Events
    };
    Ziko$1.Math.ExtractAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Math).length; i++) {
            globalThis[Object.keys(Ziko$1.Math)[i]] = Object.values(Ziko$1.Math)[i];
        }
        return this;
    };
    Ziko$1.Math.RemoveAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Math).length; i++) delete globalThis[Object.keys(Ziko$1.Math)[i]];   
        return this;
    };
    Ziko$1.UI.ExtractAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.UI).length; i++) {
            globalThis[Object.keys(Ziko$1.UI)[i]] = Object.values(Ziko$1.UI)[i];
        }
        return this;
    };
    Ziko$1.UI.RemoveAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.UI).length; i++) delete globalThis[Object.keys(Ziko$1.UI)[i]];   
        return this;
    };
    Ziko$1.Graphics.ExtractAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Graphics).length; i++) {
            globalThis[Object.keys(Ziko$1.Graphics)[i]] = Object.values(Ziko$1.Graphics)[i];
        }
        return this;
    };
    Ziko$1.Graphics.RemoveAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Graphics).length; i++) delete globalThis[Object.keys(Ziko$1.Graphics)[i]];   
        return this;
    };
    Ziko$1.Events.ExtractAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Events).length; i++) {
            globalThis[Object.keys(Ziko$1.Events)[i]] = Object.values(Ziko$1.Events)[i];
        }
        return this;
    };
    Ziko$1.Events.RemoveAll=function(){
        for (let i = 0; i < Object.keys(Ziko$1.Events).length; i++) delete globalThis[Object.keys(Ziko$1.Events)[i]];   
        return this;
    };
    Ziko$1.ExtractAll=function(){
        Ziko$1.UI.ExtractAll();
        Ziko$1.Math.ExtractAll();
        Ziko$1.Events.ExtractAll();
        Ziko$1.Graphics.ExtractAll();
        return this;
    };
    Ziko$1.RemoveAll=function(){
        Ziko$1.UI.RemoveAll();
        Ziko$1.Math.RemoveAll();
        Ziko$1.Events.RemoveAll();
        Ziko$1.Graphics.RemoveAll();
    };

    return Ziko$1;

}));
