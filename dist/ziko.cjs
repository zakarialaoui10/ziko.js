
/*
  Project: ziko.js
  Author: Zakaria Elalaoui
  Date : 28/01/2024
  Git-Repo : https://github.com/zakarialaoui10/ziko.js
  Git-Wiki : https://github.com/zakarialaoui10/ziko.js/wiki
  Released under MIT License
*/

'use strict';

class AbstractZikoMath {}

//import ZMath from "./index.js";
class Complex extends AbstractZikoMath {
  constructor(a = 0, b = 0) {
    super();
    if (a instanceof Complex) {
      this.a = a.a;
      this.b = a.b;
    } else if (typeof a === "object") {
      if ("a" in b && "b" in a) {
        this.a = a.a;
        this.b = a.b;
      } else if ("a" in b && "z" in a) {
        this.a = a.a;
        this.b = sqrt(a.z ** 2 - a.a ** 2);
      } else if ("a" in b && "phi" in a) {
        this.a = a.a;
        this.b = a.a * tan(a.phi);
      } else if ("b" in b && "z" in a) {
        this.b = a.b;
        this.a = sqrt(a.z ** 2 - a.b ** 2);
      } else if ("b" in b && "phi" in a) {
        this.b = b;
        this.a = a.b / tan(a.phi);
      } else if ("z" in b && "phi" in a) {
        this.a = a.z * cos(a.phi);
        this.a = a.z * sin(a.phi);
      }
    } else if (typeof a === "number" && typeof b === "number") {
      this.a = +a.toFixed(32);
      this.b = +b.toFixed(32);
    }
  }
  get clone() {
    return new Complex(this.a, this.b);
  }
  get z() {
    return hypot(this.a, this.b);
  }
  get phi() {
    return atan2(this.b, this.a);
  }
  static Zero() {
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
    let re = z.map(n => n.a);
    let im = z.map(n => n.b);
    this.a += +sum(...re).toFixed(15);
    this.b += +sum(...im).toFixed(15);
    return this;
  }
  sub(...z) {
    for (let i = 0; i < z.length; i++) {
      if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
    }
    let re = z.map(n => n.a);
    let im = z.map(n => n.b);
    this.a -= +sum(...re).toFixed(15);
    this.b -= +sum(...im).toFixed(15);
    return this;
  }
  mul(...z) {
    for (let i = 0; i < z.length; i++) {
      if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
    }
    let Z = +prod(this.z, ...z.map(n => n.z)).toFixed(15);
    let phi = +sum(this.phi, ...z.map(n => n.phi)).toFixed(15);
    this.a = +(Z * cos(phi).toFixed(15)).toFixed(14);
    this.b = +(Z * sin(phi).toFixed(15)).toFixed(14);
    return this;
  }
  div(...z) {
    for (let i = 0; i < z.length; i++) {
      if (typeof z[i] === "number") z[i] = new Complex(z[i], 0);
    }
    let Z = +(this.z / prod(...z.map(n => n.z))).toFixed(15);
    let phi = +(this.phi - sum(...z.map(n => n.phi))).toFixed(15);
    this.a = +(Z * cos(phi).toFixed(15)).toFixed(15);
    this.b = +(Z * sin(phi).toFixed(15)).toFixed(15);
    return this;
  }
  pow(n) {
    if (floor(n) === n && n > 0) {
      let z = +(this.z ** n).toFixed(15);
      let phi = +(this.phi * n).toFixed(15);
      this.a = +(z * cos(phi).toFixed(15)).toFixed(15);
      this.b = +(z * sin(phi).toFixed(15)).toFixed(15);
    }
    return this;
  }
  static fromExpo(z, phi) {
    return new Complex(+(z * cos(phi)).toFixed(13), +(z * sin(phi)).toFixed(13));
  }
  get expo() {
    return [this.z, this.phi];
  }
  static add(c, ...z) {
    return c.clone.add(...z);
  }
  static sub(c, ...z) {
    return c.clone.sub(...z);
  }
  static mul(c, ...z) {
    return c.clone.mul(...z);
  }
  static div(c, ...z) {
    return c.clone.div(...z);
  }
  static pow(z, n) {
    return z.clone.pow(n);
  }
  static xpowZ(x) {
    return complex(x ** this.a * cos(this.b * ln(x)), x ** this.a * sin(this.b * ln(x)));
  }
  sqrtn(n = 2) {
    return complex(sqrtn(this.z, n) * cos(this.phi / n), sqrtn(this.z, n) * sin(this.phi / n));
  }
  get sqrt() {
    return this.sqrtn(2);
  }
  get log() {
    return complex(this.z, this.phi);
  }
  get cos() {
    return complex(cos(this.a) * cosh(this.b), sin(this.a) * sinh(this.b));
  }
  get sin() {
    return complex(sin(this.a) * cosh(this.b), cos(this.a) * sinh(this.b));
  }
  get tan() {
    const de = cos(this.a * 2) + cosh(this.b * 2);
    return complex(sin(2 * this.a) / de, sinh(2 * this.b) / de);
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
const complex = (a, b) => {
  if ((a instanceof Array || ArrayBuffer.isView(a)) && (b instanceof Array || ArrayBuffer.isView(a))) return a.map((n, i) => complex(a[i], b[i]));
  if (a instanceof Matrix && b instanceof Matrix) {
    if (a.shape[0] !== b.shape[0] || a.shape[1] !== b.shape[1]) return Error(0);
    const arr = a.arr.map((n, i) => complex(a.arr[i], b.arr[i]));
    return new Matrix(a.rows, a.cols, ...arr);
  }
  return new Complex(a, b);
};

// Mixed calcul
const sum = (...x) => {
  if (x.every(n => typeof n === "number")) {
    let s = x[0];
    for (let i = 1; i < x.length; i++) s += x[i];
    return s;
  }
  const Y = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i] instanceof Array) Y.push(sum(...x[i]));else if (x[i] instanceof Object) {
      Y.push(sum(...Object.values(x[i])));
    }
  }
  return Y.length === 1 ? Y[0] : Y;
};
const prod = (...x) => {
  if (x.every(n => typeof n === "number")) {
    let p = x[0];
    for (let i = 1; i < x.length; i++) p *= x[i];
    return p;
  }
  const Y = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i] instanceof Array) Y.push(prod(...x[i]));else if (x[i] instanceof Object) {
      Y.push(prod(...Object.values(x[i])));
    }
  }
  return Y.length === 1 ? Y[0] : Y;
};
const min = (...num) => {
  if (num.every(n => typeof n === "number")) return Math.min(...num);
  const Y = [];
  for (let i = 0; i < num.length; i++) {
    if (num[i] instanceof Array) Y.push(min(...num[i]));else if (num[i] instanceof Object) {
      Y.push(Object.fromEntries([Object.entries(num[i]).sort((a, b) => a[1] - b[1])[0]]));
    }
  }
  return Y.length === 1 ? Y[0] : Y;
};
const max = (...num) => {
  if (num.every(n => typeof n === "number")) return Math.max(...num);
  const Y = [];
  for (let i = 0; i < num.length; i++) {
    if (num[i] instanceof Array) Y.push(min(...num[i]));else if (num[i] instanceof Object) {
      Y.push(Object.fromEntries([Object.entries(num[i]).sort((a, b) => b[1] - a[1])[0]]));
    }
  }
  return Y.length === 1 ? Y[0] : Y;
};
const accum = (...num) => {
  if (num.every(n => typeof n === "number")) {
    let acc = num.reduce((x, y) => [...x, x[x.length - 1] + y], [0]);
    acc.shift();
    return acc;
  }
  const Y = [];
  for (let i = 0; i < num.length; i++) {
    if (num[i] instanceof Array) Y.push(accum(...num[i]));else if (num[i] instanceof Object) {
      Y.push(null
      // Object.fromEntries(
      //     [Object.entries(num[i]).sort((a,b)=>b[1]-a[1])[0]]
      // )
      );
    }
  }
  return Y.length === 1 ? Y[0] : Y;
};

//moy
//med
//variance
//std
//mode
//acccum
//min2max
//max2min
//percentile

const _gamma = x => {
  // Coefficients for the Lanczos approximation
  const g = 7;
  const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) {
    return +(Math.PI / (Math.sin(Math.PI * x) * _gamma(1 - x))).toFixed(10);
  }
  x -= 1;
  let a = p[0];
  for (let i = 1; i < g + 2; i++) {
    a += p[i] / (x + i);
  }
  const t = x + g + 0.5;
  return +(Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a).toFixed(10);
};
const _bessel = (n, x) => {
  const maxTerms = 100;
  let result = 0;
  for (let k = 0; k < maxTerms; k++) {
    const numerator = Math.pow(-1, k) * Math.pow(x / 2, n + 2 * k);
    const denominator = fact(k) * fact(n + k);
    result += numerator / denominator;
  }
  return result;
};
const _beta = (x, y) => {
  const lowerLimit = 0;
  const upperLimit = 1;
  const intervals = 1000;
  let result = 0;
  const f = t => Math.pow(t, x - 1) * Math.pow(1 - t, y - 1);
  const h = (upperLimit - lowerLimit) / intervals;
  result += 0.5 * (f(lowerLimit) + f(upperLimit));
  for (let i = 1; i < intervals; i++) {
    const xi = lowerLimit + i * h;
    result += f(xi);
  }
  return result * h;
};
const gamma = (...x) => mapfun(_gamma, ...x);
const bessel = (n, x) => {
  if (typeof n === "number") {
    if (typeof n === "number") return _bessel(n, x);else console.warn("Not supported yet");
  } else if (n instanceof Array) {
    if (typeof x === "number") return mapfun(a => _bessel(a, x), ...n);else if (x instanceof Array) {
      const Y = [];
      for (let i = 0; i < n.length; i++) {
        Y.push(mapfun(a => _bessel(n[i], a), ...x));
      }
      return Y;
    }
  }
};
const beta = (x, y) => {
  if (typeof x === "number") {
    if (typeof x === "number") return _beta(x, y);else console.warn("Not supported yet");
  } else if (x instanceof Array) {
    if (typeof y === "number") return mapfun(a => _beta(a, y), ...x);else if (y instanceof Array) {
      const Z = [];
      for (let i = 0; i < x.length; i++) {
        Z.push(mapfun(a => _beta(x[i], a), ...y));
      }
      return Z;
    }
  }
};

const Fixed = {
  cos: x => +Math.cos(x).toFixed(15),
  sin: x => +Math.sin(x).toFixed(15),
  tan: x => +Math.tan(x).toFixed(31),
  sinc: x => +Math.sin(Math.PI * x) / (Math.PI * x),
  sec: x => +1 / Math.cos(x).toFixed(15),
  csc: x => +1 / Math.sin(x).toFixed(15),
  cot: x => +1 / Math.tan(x).toFixed(15),
  acos: x => +Math.acos(x).toFixed(15),
  asin: x => +Math.asin(x).toFixed(15),
  atan: x => +Math.atan(x).toFixed(15),
  acot: x => +Math.PI / 2 - Math.atan(x).toFixed(15),
  cosh: x => +Math.cosh(x).toFixed(15),
  sinh: x => +Math.sinh(x).toFixed(15),
  tanh: x => +Math.tanh(x).toFixed(15),
  coth: n => +(1 / 2 * Math.log((1 + n) / (1 - n))).toFixed(15),
  acosh: x => +Math.acosh(x).toFixed(15),
  asinh: x => +Math.asinh(x).toFixed(15),
  atanh: x => +Math.atanh(x).toFixed(15)
};
const abs = (...x) => mapfun(Math.abs, ...x);
const sqrt = (...x) => mapfun(Math.sqrt, ...x);
const pow = (x, n) => {
  if (typeof x === "number") {
    if (typeof n === "number") return Math.pow(x, n);else if (n instanceof Complex) return Complex.fromExpo(x ** n.a, n.b * ln(x));else return mapfun(a => pow(x, a), ...n);
  } else if (x instanceof Complex) {
    if (typeof n === "number") return Complex.fromExpo(x.z ** n, x.phi * n);else if (n instanceof Complex) return Complex.fromExpo(x.z ** n.a * e(-x.phi * n.b), ln(x.z) * n.b + n.a * x.phi);else return mapfun(a => pow(x, a), ...n);
  } else if (x instanceof Array) {
    if (typeof n === "number") return mapfun(a => pow(a, n), ...x);else if (n instanceof Array) {
      const Y = [];
      for (let i = 0; i < x.length; i++) {
        Y.push(mapfun(a => pow(x[i], a), ...n));
      }
      return Y;
    }
  }
};
const sqrtn = (x, n) => {
  if (typeof x === "number") {
    if (typeof n === "number") return Math.pow(x, 1 / n);else return mapfun(a => sqrtn(x, a), ...n);
  } else if (x instanceof Complex) {
    if (typeof n === "number") return Complex.fromExpo(sqrtn(x.z, n), x.phi / n);else return mapfun(a => sqrtn(x, a), ...n);
  } else if (x instanceof Array) {
    if (typeof n === "number") return mapfun(a => sqrtn(a, n), ...x);else if (n instanceof Array) {
      const Y = [];
      for (let i = 0; i < x.length; i++) {
        Y.push(mapfun(a => sqrtn(x[i], a), ...n));
      }
      return Y;
    }
  }
};
const e = (...x) => mapfun(Math.exp, ...x);
const ln = (...x) => mapfun(Math.log, ...x);
const cos = (...x) => mapfun(Fixed.cos, ...x);
const sin = (...x) => mapfun(Fixed.sin, ...x);
const tan = (...x) => mapfun(Fixed.tan, ...x);
const sec = (...x) => mapfun(Fixed.sec, ...x);
const sinc = (...x) => mapfun(Fixed.sinc, ...x);
const csc = (...x) => mapfun(Fixed.csc, ...x);
const cot = (...x) => mapfun(Fixed.cot, ...x);
const acos = (...x) => mapfun(Fixed.acos, ...x);
const asin = (...x) => mapfun(Fixed.asin, ...x);
const atan = (...x) => mapfun(Fixed.atan, ...x);
const acot = (...x) => mapfun(Fixed.acot, ...x);
const cosh = (...x) => mapfun(Fixed.cosh, ...x);
const sinh = (...x) => mapfun(Fixed.sinh, ...x);
const tanh = (...x) => mapfun(Fixed.tanh, ...x);
const coth = (...x) => mapfun(Fixed.coth, ...x);
const acosh = (...x) => mapfun(Fixed.acosh, ...x);
const asinh = (...x) => mapfun(Fixed.asinh, ...x);
const atanh = (...x) => mapfun(Fixed.atanh, ...x);
const ceil = (...x) => mapfun(Math.ceil, ...x);
const floor = (...x) => mapfun(Math.floor, ...x);
const round = (...x) => mapfun(Math.round, ...x);
const atan2 = (x, y, rad = true) => {
  if (typeof x === "number") {
    if (typeof y === "number") return rad ? Math.atan2(x, y) : Math.atan2(x, y) * 180 / Math.PI;else return mapfun(a => atan2(x, a, rad), ...y);
  }
  // else if(x instanceof Complex){
  //     if(typeof n === "number")return Complex.fromExpo(x.z**n,x.phi*n);
  //     else return mapfun(a=>pow(x,a),...n);
  // }
  else if (x instanceof Array) {
    if (typeof y === "number") return mapfun(a => atan2(a, y, rad), ...x);else if (y instanceof Array) {
      const Y = [];
      for (let i = 0; i < x.length; i++) {
        Y.push(mapfun(a => pow(x[i], a), ...y));
      }
      return Y;
    }
  }
};
const fact = (...x) => mapfun(n => {
  let i,
    y = 1;
  if (n == 0) y = 1;else if (n > 0) for (i = 1; i <= n; i++) y *= i;else y = NaN;
  return y;
}, ...x);
const sign = (...x) => mapfun(Math.sign, ...x);
const sig = (...x) => mapfun(n => 1 / (1 + e(-n)), ...x);
const hypot = (...x) => {
  if (x.every(n => typeof n === "number")) return Math.hypot(...x);
  if (x.every(n => n instanceof Array)) return mapfun(Math.hypot, ...x);
};

//import{arange}from "../Utils/index.js"
const Logic$1 = {
  _mode: Number,
  _map: function (func, a, b) {
    if (a instanceof Matrix) return new Matrix(a.rows, a.cols, a.arr.flat(1).map(n => func(n, b)));else if (a instanceof Complex) return new Complex(func(a.a, b), func(a.b, b));else if (a instanceof Array) return a.map(n => func(n, b));
  },
  not: function (input) {
    if (["number", "boolean"].includes(typeof input)) return Logic$1._mode(!input);else return this._map(this.not, input);
  },
  and: function (a, ...b) {
    if (["number", "boolean"].includes(typeof a)) return Logic$1._mode(b.reduce((n, m) => n &= m, a));else return this._map(this.and, a, b);
  },
  or: function (a, ...b) {
    if (["number", "boolean"].includes(typeof a)) return Logic$1._mode(b.reduce((n, m) => n |= m, a));else return this._map(this.or, a, b);
  },
  nand: function (a, ...b) {
    return this.not(this.and(a, b));
  },
  nor: function (a, ...b) {
    return this.not(this.or(a, b));
  },
  xor: function (a, ...b) {
    let arr = [a, ...b];
    if (["number", "boolean"].includes(typeof a)) return this._mode(arr.reduce((length, cur) => {
      if (+cur === 1) length += 1;
      return length;
    }, 0) === 1);else return this._map(this.xor, a, b);
  },
  xnor: function (a, ...b) {
    return Logic$1.not(Logic$1.xor(a, b));
  }
};

var Base = {
  _mode: Number,
  _map: function (func, number, toBase) {
    if (number instanceof Matrix) return new Matrix(number.rows, number.cols, number.arr.flat(1).map(n => func(n, toBase)));else if (number instanceof Complex) return new Complex(func(number.a, toBase), func(number.b, toBase));else if (number instanceof Array) return number.map(n => func(n, toBase));
  },
  dec2base(dec, base) {
    base <= 10 ? this._mode = Number : this._mode = String;
    //this._mode=String
    if (typeof dec === "number") return this._mode((dec >>> 0).toString(base));
    return this._map(this.dec2base, dec, base);
  },
  dec2bin(dec) {
    return this.dec2base(dec, 2);
  },
  dec2oct(dec) {
    return this.dec2base(dec, 8);
  },
  dec2hex(dec) {
    return this.dec2base(dec, 16);
  },
  bin2base(bin, base) {
    return this.dec2base(this.bin2dec(bin), base);
  },
  bin2dec(bin) {
    return this._mode("0b" + bin);
  },
  bin2oct(bin) {
    return this.bin2base(bin, 8);
  },
  bin2hex(bin) {
    return this.bin2base(bin, 16);
  },
  oct2dec(oct) {
    return this._mode("0o" + oct);
  },
  oct2bin(oct) {
    return this.dec2bin(this.oct2dec(oct));
  },
  oct2hex(oct) {
    return this.dec2hex(this.oct2dec(oct));
  },
  oct2base(oct, base) {
    return this.dec2base(this.oct2dec(oct), base);
  },
  hex2dec(hex) {
    return this._mode("0x" + hex);
  },
  hex2bin(hex) {
    return this.dec2bin(this.hex2dec(hex));
  },
  hex2oct(hex) {
    return this.dec2oct(this.hex2dec(hex));
  },
  hex2base(hex, base) {
    return this.dec2base(this.hex2dec(hex), base);
  },
  IEEE32toDec(Bin) {
    let IEEE32 = Bin.split(" ").join("").padEnd(32, "0");
    let s = IEEE32[0];
    let e = 2 ** (+("0b" + IEEE32.slice(1, 9)) - 127);
    let m = IEEE32.slice(9, 32).split("").map(n => +n);
    let M = m.map((n, i) => n * 2 ** (-i - 1)).reduce((a, b) => a + b, 0);
    let dec = (-1) ** s * (1 + M) * e;
    return dec;
  },
  IEEE64toDec(Bin) {
    let IEEE64 = Bin.split(" ").join("").padEnd(64, "0");
    let s = IEEE64[0];
    let e = 2 ** (+("0b" + IEEE64.slice(1, 12)) - 1023);
    let m = IEEE64.slice(13, 64).split("").map(n => +n);
    let M = m.map((n, i) => n * 2 ** (-i - 1)).reduce((a, b) => a + b, 0);
    let dec = (-1) ** s * (1 + M) * e;
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
      return arr.map(n => [n]);
    }
    const permutations = [];
    let smallerPermutations;
    smallerPermutations = this.withDiscount(arr, l - 1);
    arr.forEach(currentOption => {
      smallerPermutations.forEach(smallerPermutation => {
        permutations.push([currentOption].concat(smallerPermutation));
      });
    });
    return permutations;
  }
  static withoutDiscount(arr) {
    const l = arr.length;
    if (l === 1) {
      return arr.map(n => [n]);
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
      return comboOptions.map(comboOption => [comboOption]);
    }
    // Init combinations array.
    const combos = [];
    // Remember characters one by one and concatenate them to combinations of smaller lengths.
    // We don't extract elements here because the repetitions are allowed.
    comboOptions.forEach((currentOption, optionIndex) => {
      // Generate combinations of smaller size.
      const smallerCombos = this.withDiscount(comboOptions.slice(optionIndex), comboLength - 1);
      // Concatenate currentOption with all combinations of smaller size.
      smallerCombos.forEach(smallerCombo => {
        combos.push([currentOption].concat(smallerCombo));
      });
    });
    return combos;
  }
  static withoutDiscount(comboOptions, comboLength) {
    // If the length of the combination is 1 then each element of the original array
    // is a combination itself.
    if (comboLength === 1) {
      return comboOptions.map(comboOption => [comboOption]);
    }
    // Init combinations array.
    const combos = [];
    // Extract characters one by one and concatenate them to combinations of smaller lengths.
    // We need to extract them because we don't want to have repetitions after concatenation.
    comboOptions.forEach((currentOption, optionIndex) => {
      // Generate combinations of smaller size.
      const smallerCombos = this.withoutDiscount(comboOptions.slice(optionIndex + 1), comboLength - 1);
      // Concatenate currentOption with all combinations of smaller size.
      smallerCombos.forEach(smallerCombo => {
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
      if (combinationIndex & 1 << setElementIndex) {
        subSet.push(originalSet[setElementIndex]);
      }
    }
    subSets.push(subSet);
  }
  return subSets;
}
var subset = (...arr) => {
  let list = arange(0, 2 ** arr.length, 1);
  let bin = list.toBin.map(n => n.padStart(arr.length, 0)).map(n => n.split("").map(n => +n));
  let sub = bin.map(n => n.map((m, i) => arr[i]));
  for (let i = 0; i < sub.length; i++) for (let j = 0; j < sub[i].length; j++) sub[i][j] = {
    n: sub[i][j],
    m: bin[i][j]
  };
  sub = sub.map(n => n.filter(x => x.m == 1));
  sub = sub.map(n => n.map(m => m.n));
  return sub;
};
var Discret = {
  Logic: Logic$1,
  Base,
  Permutation,
  Combinaison,
  PowerSet,
  subset
};

class Random {
  static float(a = 1, b) {
    return b ? Math.random() * (b - a) + a : a * Math.random();
  }
  static int(a, b) {
    return Math.floor(this.float(a, b));
  }
  static char(upperCase) {
    upperCase = upperCase ?? this.bool();
    const Char = String.fromCharCode(this.int(97, 120));
    return upperCase ? Char.toUpperCase() : Char;
  }
  static bool() {
    return [false, true][Math.floor(Math.random() * 2)];
  }
  static string(length, upperCase) {
    return length instanceof Array ? new Array(this.int(...length)).fill(0).map(() => this.char(upperCase)).join("") : new Array(length).fill(0).map(() => this.char(upperCase)).join("");
  }
  static bin() {
    return this.int(2);
  }
  static oct() {
    return this.int(8);
  }
  static dec() {
    return this.int(8);
  }
  static hex() {
    return this.int(16);
  }
  static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
    let newchoice = new Array(100);
    p = Utils.accum(...p).map(n => n * 100);
    newchoice.fill(choices[0], 0, p[0]);
    for (let i = 1; i < choices.length; i++) newchoice.fill(choices[i], p[i - 1], p[i]);
    return newchoice[this.int(newchoice.length - 1)];
  }
  static shuffleArr(arr) {
    return arr.sort(() => 0.5 - Math.random());
  }
  static shuffleMatrix(M) {
    const {
      rows,
      cols,
      arr
    } = M;
    return matrix(rows, cols, arr.flat().sort(() => 0.5 - Math.random()));
  }
  static floats(n, a, b) {
    return new Array(n).fill(0).map(() => this.float(a, b));
  }
  static ints(n, a, b) {
    return new Array(n).fill(0).map(() => this.int(a, b));
  }
  static bools(n) {
    return new Array(n).fill(0).map(() => this.bool());
  }
  static bins(n) {
    return new Array(n).fill(0).map(() => this.int(2));
  }
  static octs(n) {
    return new Array(n).fill(0).map(() => this.int(8));
  }
  static decs(n) {
    return new Array(n).fill(0).map(() => this.int(10));
  }
  static hexs(n) {
    return new Array(n).fill(0).map(() => this.int(16));
  }
  static choices(n, choices, p) {
    return new Array(n).fill(0).map(() => this.choice(choices, p));
  }
  static perm(...arr) {
    // permutation
    return arr.permS[this.int(arr.length)];
  }
  static color() {
    return "#" + Base.dec2hex(this.float(16777216)).padStart(6, 0);
  }
  static colors(n) {
    return new Array(n).fill(null).map(() => this.color());
  }
  static complex(a = [0, 1], b = [0, 1]) {
    return a instanceof Array ? new Complex(this.float(a[0], a[1]), this.float(b[0], b[1])) : new Complex(...this.floats(2, a, b));
  }
  static complexInt(a = [0, 1], b = [0, 1]) {
    return new Complex(this.int(a[0], a[1]), this.int(b[0], b[1]));
  }
  static complexBin() {
    return new Complex(...this.bins(2));
  }
  static complexOct() {
    return new Complex(...this.octs(2));
  }
  static complexDec() {
    return new Complex(...this.decs(10));
  }
  static complexHex() {
    return new Complex(...this.octs(2));
  }
  static complexes(n, a = 0, b = 1) {
    return new Array(n).fill(0).map(() => this.complex(a, b));
  }
  static complexesInt(n, a = 0, b = 1) {
    return new Array(n).fill(0).map(() => this.complexInt(a, b));
  }
  static complexesBin(n) {
    return new Array(n).fill(0).map(() => this.complexBin());
  }
  static complexesOct(n) {
    return new Array(n).fill(0).map(() => this.complexOct());
  }
  static complexesDec(n) {
    return new Array(n).fill(0).map(() => this.complexDec());
  }
  static complexesHex(n) {
    return new Array(n).fill(0).map(() => this.complexHex());
  }
  static matrix(r, c, min, max) {
    return matrix(r, c, this.floats(r * c, min, max));
  }
  static matrixInt(r, c, min, max) {
    return matrix(r, c, this.ints(r * c, min, max));
  }
  static matrixBin(r, c) {
    return matrix(r, c, this.bins(r * c));
  }
  static matrixOct(r, c) {
    return matrix(r, c, this.octs(r * c));
  }
  static matrixDec(r, c) {
    return matrix(r, c, this.decs(r * c));
  }
  static matrixHex(r, c) {
    return matrix(r, c, this.hex(r * c));
  }
  static matrixColor(r, c) {
    return matrix(r, c, this.colors(r * c));
  }
  static matrixComplex(r, c, a, b) {
    return matrix(r, c, this.complexes(r * c, a, b));
  }
  static matrixComplexInt(r, c, a, b) {
    return matrix(r, c, this.complexesInt(r * c, a, b));
  }
  static matrixComplexBin(r, c) {
    return matrix(r, c, this.complexesBin(r * c));
  }
  static matrixComplexOct(r, c) {
    return matrix(r, c, this.complexesBin(r * c));
  }
  static matrixComplexDec(r, c) {
    return matrix(r, c, this.complexesBin(r * c));
  }
  static matrixComplexHex(r, c) {
    return matrix(r, c, this.complexesBin(r * c));
  }
}

const luDecomposition = matrix => {
  if (matrix instanceof Matrix) matrix = matrix.arr;
  const n = matrix.length;
  const L = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const U = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    // Upper Triangular
    for (let k = i; k < n; k++) {
      // Summation of L(i, j) * U(j, k)
      let sum = 0;
      for (let j = 0; j < i; j++) {
        sum += L[i][j] * U[j][k];
      }
      U[i][k] = matrix[i][k] - sum;
    }
    // Lower Triangular
    for (let k = i; k < n; k++) {
      if (i == k) {
        L[i][i] = 1; // Diagonal as 1
      } else {
        // Summation of L(k, j) * U(j, i)
        let sum = 0;
        for (let j = 0; j < i; j++) {
          sum += L[k][j] * U[j][i];
        }
        // Evaluate L(k, i)
        L[k][i] = (matrix[k][i] - sum) / U[i][i];
      }
    }
  }
  return [L, U].map(n => new Matrix(n));
};
const dotProduct = (v1, v2) => v1.reduce((sum, el, i) => sum + el * v2[i], 0);
const magnitude = vector => Math.sqrt(vector.reduce((sum, el) => sum + el * el, 0));
const normalize = vector => vector.map(el => el / magnitude(vector));
const qrDecomposition = matrix => {
  if (matrix instanceof Matrix) matrix = matrix.arr;
  const m = matrix.length;
  const n = matrix[0].length;
  const Q = [];
  const R = [];
  // Initialize R as an m x n matrix of zeroes
  for (let i = 0; i < m; i++) {
    R.push(new Array(n).fill(0));
  }
  for (let j = 0; j < n; j++) {
    let v = matrix.map(row => row[j]);
    for (let i = 0; i < j; i++) {
      const q = Q[i];
      const r_ij = dotProduct(q, matrix.map(row => row[j]));
      for (let k = 0; k < m; k++) {
        v[k] -= r_ij * q[k];
      }
      R[i][j] = r_ij;
    }
    const v_mag = magnitude(v);
    Q.push(normalize(v));
    R[j][j] = v_mag;
  }
  return [Q, R].map(n => new Matrix(n));
};
const choleskyDecomposition = matrix => {
  if (matrix instanceof Matrix) matrix = matrix.arr;
  const n = matrix.length;
  const L = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = 0;
      for (let k = 0; k < j; k++) {
        sum += L[i][k] * L[j][k];
      }
      if (i === j) {
        L[i][j] = Math.sqrt(matrix[i][i] - sum);
      } else {
        L[i][j] = 1.0 / L[j][j] * (matrix[i][j] - sum);
      }
    }
  }
  return new Matrix(L);
};

class Matrix extends AbstractZikoMath {
  constructor(rows, cols, element = []) {
    super();
    if (rows instanceof Matrix) {
      this.arr = rows.arr;
      this.rows = rows.rows;
      this.cols = rows.cols;
    } else {
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
  at(i = 0, j = undefined) {
    if (i < 0) i = this.rows + i;
    if (j == undefined) return this.arr[i];
    if (j < 0) j = this.cols + j;
    return this.arr[i][j];
  }
  reshape(newRows, newCols) {
    let check = newRows * newCols === this.rows * this.cols;
    if (check) return new Matrix(newRows, newCols, this.arr.flat(1));else console.error("Err");
  }
  static eye(size) {
    let result = new Matrix(size, size);
    for (let i = 0; i < size; i++) for (let j = 0; j < size; j++) i === j ? result.arr[i][j] = 1 : result.arr[i][j] = 0;
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
  _maintain() {
    for (let i = 0; i < this.arr.length; i++) Object.assign(this, {
      [[i]]: this.arr[i]
    });
    return this;
  }
  get(row = 0, col = 0) {
    if (col == -1) return this.arr[row];else if (row == -1) return this.arr.map(n => n[col]);else return this.arr[row][col];
  }
  set(row = 0, col = 0, value) {
    if (col == -1) return this.arr[row] = value;else if (row == -1) {
      for (let i = 0; i < this.cols; i++) {
        this.arr[i][col] = value[i] || 0;
      }
      return this.arr;
    }
    return this.arr[row][col] = value;
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
        if (M.flat(1).some(n => n instanceof Matrix)) {
          console.warn("Tensors are not completely supported yet ...");
          return;
        }
        return Utils.sub(Utils.mul(M[0][0], M[1][1]), Utils.mul(M[0][1], M[1][0]));
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
        const to_be_added = Utils.add(Utils.mul(pow(-1, i), Utils.mul(M[0][i], determinat(deleteRowAndColumn(M, i)))));
        answer = Utils.add(answer, to_be_added);
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
  static nums(rows, cols, number) {
    let result = new Matrix(rows, cols);
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = number;
    return result;
  }
  static get rand() {
    return {
      int: (rows, cols, a, b) => {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randInt(a, b);
        return result;
      },
      bin: (rows, cols) => {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randBin;
        }
        return result;
      },
      hex: (rows, cols) => {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) result.arr[i][j] = Random.randHex;
        }
        return result;
      },
      choices: (rows, cols, choices, p) => {
        let result = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.choice(choices, p);
        return result;
      },
      permutation: (rows, cols, arr) => {
        //return new Matrix(rows, cols, Random.permutation(...arr))
      }
    };
  }
  static rands(rows, cols, a = 1, b) {
    let result = new Matrix(rows, cols);
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) result.arr[i][j] = Random.rand(a, b);
    return result;
  }
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
  sortRows(calback = undefined) {
    let newArr = this.arr.map(n => n.sort(calback)).flat(1);
    return new Matrix(this.rows, this.cols, newArr);
  }
  sortCols(calback = undefined) {
    let m = this.T;
    let newArr = m.arr.map(n => n.sort(calback)).flat(1);
    return new Matrix(this.rows, this.cols, newArr).T;
  }
  filterByRows(item) {
    var truth = this.arr.map(n => n.map(m => +("" + m).includes(item)));
    var mask = truth.map(n => !!Logic.or(...n));
    var filtredArray = this.arr.filter((n, i) => mask[i] === true);
    if (filtredArray.length === 0) filtredArray.push([]);
    console.log(filtredArray);
    return new Matrix(filtredArray);
  }
  filterByCols(item) {
    return new Matrix(this.T.arr.filter(n => n.includes(item)));
  }
  sortAll(calback = undefined) {
    let newArr = this.arr.flat(1).sort(calback);
    return new Matrix(this.rows, this.cols, newArr);
  }
  count(n) {
    return this.arr.flat(1).count(n);
  }
  toBase(n) {
    let newArr = this.arr.flat(1).toBase(n);
    return new Matrix(this.rows, this.cols, newArr);
  }
  #hstack(matrix) {
    if (this.rows !== matrix.rows) return;
    let newArr = this.arr;
    for (let i = 0; i < this.rows; i++) for (let j = this.cols; j < this.cols + matrix.cols; j++) newArr[i][j] = matrix.arr[i][j - this.cols];
    this.cols += matrix.cols;
    return new Matrix(this.rows, this.cols, newArr.flat(1));
  }
  hstack(...matrices) {
    const M = [this, ...matrices].reduce((a, b) => a.#hstack(b));
    Object.assign(this, M);
    return this;
  }
  static hstack(matrix, ...matrices) {
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
    const M = [this, ...matrices].reduce((a, b) => a.#vstack(b));
    Object.assign(this, M);
    return this;
  }
  static vstack(matrix, ...matrices) {
    return matrix.clone.vstack(...matrices);
  }
  hqueue(...matrices) {
    const M = [this, ...matrices].reverse().reduce((a, b) => a.#hstack(b));
    Object.assign(this, M);
    return this;
  }
  vqueue(...matrices) {
    const M = [this, ...matrices].reverse().reduce((a, b) => a.#vstack(b));
    Object.assign(this, M);
    return this;
  }
  static hqueue(matrix, ...matrices) {
    return matrix.clone.hqueue(...matrices);
  }
  static vqueue(matrix, ...matrices) {
    return matrix.clone.vqueue(...matrices);
  }
  slice(r0 = 0, c0 = 0, r1 = this.rows - 1, c1 = this.cols - 1) {
    let newRow = r1 - r0,
      newCol = c1 - c0;
    let newArr = new Array(newCol);
    for (let i = 0; i < newRow; i++) {
      newArr[i] = [];
      for (let j = 0; j < newCol; j++) newArr[i][j] = this.arr[i + r0][j + c0];
    }
    return new Matrix(newRow, newCol, newArr.flat(1));
  }
  static slice(m1, r0 = 0, c0 = 0, r1 = this.rows - 1, c1 = this.cols - 1) {
    return m1.slice(r0, c0, r1, c1);
  }
  splice(r0, c0, deleteCount, ...items) {}
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
      if (typeof matr[k] == "number" || matr[k] instanceof Complex) matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
      for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.add(this.arr[i][j], matr[k].arr[i][j]);
    }
    return new Matrix(this.rows, this.cols, this.arr.flat(1));
  }
  sub(...matr) {
    for (let k = 0; k < matr.length; k++) {
      if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
      for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.sub(this.arr[i][j], matr[k].arr[i][j]);
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
      if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
      for (var i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.mul(this.arr[i][j], matr[k].arr[i][j]);
    }
    return new Matrix(this.rows, this.cols, this.arr.flat(1));
  }
  div(...matr) {
    for (let k = 0; k < matr.length; k++) {
      if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
      for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.div(this.arr[i][j], matr[k].arr[i][j]);
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
      if (typeof matr[k] == "number") matr[k] = Matrix.nums(this.rows, this.cols, matr[k]);
      for (let i = 0; i < this.rows; i++) for (var j = 0; j < this.cols; j++) this.arr[i][j] = Utils.modulo(this.arr[i][j], matr[k].arr[i][j]);
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
          res[i][j] = Utils.add(res[i][j], Utils.mul(this.arr[i][k], matrix.arr[k][j]));
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
    return this.arr.flat(Infinity).some(n => n instanceof Complex);
  }
  get min() {
    if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
    let minRow = [];
    for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
    return min(...minRow);
  }
  get max() {
    if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
    let maxRow = [];
    for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
    return max(...maxRow);
  }
  get minRows() {
    if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
    let minRow = [];
    for (let i = 0; i < this.rows; i++) minRow.push(min(...this.arr[i]));
    return minRow;
  }
  get maxRows() {
    if (this.DoesItContainComplexNumbers) console.error("Complex numbers are not comparable");
    let maxRow = [];
    for (let i = 0; i < this.rows; i++) maxRow.push(max(...this.arr[i]));
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
      fstring += (i != 0 ? " " : "") + ` [${this.arr[i].map(n => " " + n.toString() + " ")}],\n`;
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
  DecompositionLU() {
    const [L, U] = luDecomposition(this);
    return {
      L,
      U
    };
  }
  static DecompositionLU(...M) {
    const Decomposition = M.map(n => n.clone.LU());
    return Decomposition.length === 1 ? Decomposition[0] : Decomposition;
  }
  DecompositionQR() {
    const [Q, R] = qrDecomposition(this);
    return {
      Q,
      R
    };
  }
  static DecompositionQR(...M) {
    const Decomposition = M.map(n => n.clone.DecompositionQr());
    return Decomposition.length === 1 ? Decomposition[0] : Decomposition;
  }
  DecompositionCholesky() {
    return {
      L: choleskyDecomposition(this)
    };
  }
  static DecompositionCholesky(...M) {
    const Decomposition = M.map(n => n.clone.DecompositionCholesky());
    return Decomposition.length === 1 ? Decomposition[0] : Decomposition;
  }
  get decomposition() {
    return {
      LU: () => this.DecompositionLU(),
      QR: () => this.DecompositionQR(),
      Cholesky: () => this.DecompositionCholesky()
    };
  }
  static get decomposition() {
    return {
      LU: (...M) => Matrix.LU(...M),
      QR: (...M) => Matrix.QR(...M),
      CHOLESKY: (...M) => Matrix.CHOLESKY(...M)
    };
  }
  toTable() {
    var table = new DocumentFragment();
    var Tr = new Array(this.rows).fill(null).map(() => document.createElement("tr"));
    var Td = this.arr.map(n => n.map(() => document.createElement("td")));
    for (let i = 0; i < Td.length; i++) {
      for (let j = 0; j < Td[0].length; j++) {
        Td[i][j].innerHTML = this.arr[i][j];
        Tr[i].appendChild(Td[i][j]);
      }
    }
    Tr.map(n => table.appendChild(n));
    return table;
  }
  toGrid(element, style = {}) {
    let a = Grid();
    a.append(...this.map(element).arr.flat(1).map(n => n.style(style)));
    a.Columns(this.cols);
    return a;
  }
  sortTable(n = 0, {
    type = "num",
    order = "asc"
  } = {}) {
    var obj = this.T.arr.map(n => n.map((n, i) => Object.assign({}, {
      x: n,
      y: i
    })));
    var newObj = this.T.arr.map(n => n.map((n, i) => Object.assign({}, {
      x: n,
      y: i
    })));
    if (type === "num") {
      if (order === "asc") obj[n].sort((a, b) => a.x - b.x);else if (order === "desc") obj[n].sort((a, b) => b.x - a.x);else if (order === "toggle") {
        // console.log(obj[n][0])
        //console.log(obj[n][1])
        if (obj[n][0].x > obj[n][1].x) obj[n].sort((a, b) => b.x - a.x);else obj[n].sort((a, b) => a.x - b.x);
      }
    } else if (type === "alpha") {
      if (order === "asc") obj[n].sort((a, b) => ("" + a.x).localeCompare("" + b.x));else if (order === "desc") obj[n].sort((a, b) => ("" + b.x).localeCompare("" + a.x));
    }
    //var order=obj[n].map(n=>n.y);
    order = obj[n].map(n => n.y);
    for (let i = 0; i < obj.length; i++) {
      if (i !== n) obj[i].map((n, j) => n.y = order[j]);
    }
    for (let i = 0; i < obj.length; i++) {
      if (i !== n) newObj[i].map((n, j) => n.x = obj[i][order[j]].x);
    }
    newObj[n] = obj[n];
    var newArr = newObj.map(n => n.map(m => m.x));
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
const matrix = (r, c, element) => new Matrix(r, c, element);
const matrix2 = (...element) => new Matrix(2, 2, element);
const matrix3 = (...element) => new Matrix(3, 3, element);
const matrix4 = (...element) => new Matrix(4, 4, element);

class LinearSystem {
  static resolve(A, B) {
    return A.inv.dot(Matrix.fromVector(B)).arr.flat(1).map(n => +n.toFixed(10));
  }
}

const mapfun = (fun, ...X) => {
  const Y = X.map(x => {
    if (x === null) return fun(null);
    if (["number", "string", "boolean", "bigint", "undefined"].includes(typeof x)) return fun(x);
    if (x instanceof Array) return x.map(n => mapfun(fun, n));
    if (ArrayBuffer.isView(x)) return x.map(n => fun(n));
    if (x instanceof Set) return new Set(mapfun(fun, ...[...x]));
    if (x instanceof Map) return new Map([...x].map(n => [n[0], mapfun(fun, n[1])]));
    if (x instanceof Matrix) {
      return new Matrix(x.rows, x.cols, mapfun(x.arr.flat(1)));
    }
    if (x instanceof Complex) {
      const [a, b, z, phi] = [x.a, x.b, x.z, x.phi];
      switch (fun) {
        case Math.log:
          return complex(ln(z), phi);
        // Done
        case Math.exp:
          return complex(e(a) * cos(b), e(a) * sin(b));
        // Done
        case Math.abs:
          return z;
        // Done
        case Math.sqrt:
          return complex(sqrt(z) * cos(phi / 2), sqrt(z) * sin(phi / 2));
        // Done
        case Fixed.cos:
          return complex(cos(a) * cosh(b), -(sin(a) * sinh(b)));
        case Fixed.sin:
          return complex(sin(a) * cosh(b), cos(a) * sinh(b));
        case Fixed.tan:
          {
            const DEN = cos(2 * a) + cosh(2 * b);
            return complex(sin(2 * a) / DEN, sinh(2 * b) / DEN);
          }
        case Fixed.cosh:
          return complex(cosh(a) * cos(b), sinh(a) * sin(b));
        case Fixed.sinh:
          return complex(sinh(a) * cos(b), cosh(a) * sin(b));
        case Fixed.tanh:
          {
            const DEN = cosh(2 * a) + cos(2 * b);
            return complex(sinh(2 * a) / DEN, sin(2 * b) / DEN);
          }
        //default : return fun(x)
      }
    } else if (x instanceof Object) return Object.fromEntries(Object.entries(x).map(n => n = [n[0], mapfun(fun, n[1])]));
  });
  return Y.length == 1 ? Y[0] : Y;
};

const _add = (a, b) => {
  if (typeof a === "number") {
    if (typeof b == "number") return a + b;else if (b instanceof Complex) return complex(a + b.a, b.b);else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).add(b);else if (b instanceof Array) return b.map(n => add(n, a));
  } else if (a instanceof Complex || a instanceof Matrix) {
    if (b instanceof Array) return b.map(n => a.clone.add(n));
    return a.clone.add(b);
  } else if (a instanceof Array) {
    if (b instanceof Array) {
      if (a.length === b.length) return a.map((n, i) => add(n, b[i]));
    } else {
      return a.map(n => add(n, b));
    }
  }
};
const _sub = (a, b) => {
  if (typeof a === "number") {
    if (typeof b == "number") return a - b;else if (b instanceof Complex) return complex(a - b.a, -b.b);else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).sub(b);else if (b instanceof Array) return b.map(n => sub(n, a));
  } else if (a instanceof Complex || a instanceof Matrix) {
    if (b instanceof Array) return b.map(n => a.clone.sub(n));
    return a.clone.sub(b);
  } else if (a instanceof Array) {
    if (b instanceof Array) {
      if (b instanceof Array) {
        if (a.length === b.length) return a.map((n, i) => sub(n, b[i]));
      }
    } else {
      return a.map(n => sub(n, b));
    }
  }
};
const _mul = (a, b) => {
  if (typeof a === "number") {
    if (typeof b == "number") return a * b;else if (b instanceof Complex) return complex(a * b.a, a * b.b);else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).mul(b);else if (b instanceof Array) return b.map(n => mul(a, n));
  } else if (a instanceof Complex || a instanceof Matrix) {
    if (b instanceof Array) return b.map(n => a.clone.mul(n));
    return a.clone.mul(b);
  } else if (a instanceof Array) {
    if (b instanceof Array) {
      if (b instanceof Array) {
        if (a.length === b.length) return a.map((n, i) => mul(n, b[i]));
      }
    } else {
      return a.map(n => mul(n, b));
    }
  }
};
const _div = (a, b) => {
  if (typeof a === "number") {
    if (typeof b == "number") return a / b;else if (b instanceof Complex) return complex(a / b.a, a / b.b);else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).div(b);else if (b instanceof Array) return b.map(n => div(a, n));
  } else if (a instanceof Complex || a instanceof Matrix) {
    if (b instanceof Array) return b.map(n => a.clone.div(n));
    return a.clone.div(b);
  } else if (a instanceof Array) {
    if (b instanceof Array) {
      if (b instanceof Array) {
        if (a.length === b.length) return a.map((n, i) => div(n, b[i]));
      }
    } else {
      return a.map(n => div(n, b));
    }
  }
};
const _modulo = (a, b) => {
  if (typeof a === "number") {
    if (typeof b == "number") return a % b;else if (b instanceof Complex) return complex(a % b.a, a % b.b);else if (b instanceof Matrix) return Matrix.nums(b.rows, b.cols, a).modulo(b);else if (b instanceof Array) return b.map(n => div(a, n));
  } else if (a instanceof Complex || a instanceof Matrix) {
    if (b instanceof Array) return b.map(n => a.clone.div(n));
    return a.clone.div(b);
  } else if (a instanceof Array) {
    if (b instanceof Array) ; else {
      return a.map(n => add(n, b));
    }
  }
};
const add = (a, ...b) => {
  var res = a;
  for (let i = 0; i < b.length; i++) res = _add(res, b[i]);
  return res;
};
const sub = (a, ...b) => {
  var res = a;
  for (let i = 0; i < b.length; i++) res = _sub(res, b[i]);
  return res;
};
const mul = (a, ...b) => {
  var res = a;
  for (let i = 0; i < b.length; i++) res = _mul(res, b[i]);
  return res;
};
const div = (a, ...b) => {
  var res = a;
  for (let i = 0; i < b.length; i++) res = _div(res, b[i]);
  return res;
};
const modulo = (a, ...b) => {
  var res = a;
  for (let i = 0; i < b.length; i++) res = _modulo(res, b[i]);
  return res;
};

const {
  PI,
  E
} = Math;
const EPSILON = Number.EPSILON;

const zeros = n => new Array(n).fill(0);
const ones = n => new Array(n).fill(1);
const nums = (num, n) => new Array(n).fill(num);
const norm$1 = (value, min, max) => {
  if (typeof value === "number") return min !== max ? (value - min) / (max - min) : 0;else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, norm$1(value.arr.flat(1), min, max));else if (value instanceof Complex) return new Complex(norm$1(value.a, min, max), norm$1(value.b, min, max));else if (value instanceof Array) {
    if (value.every(n => typeof (n === "number"))) {
      return value.map(n => norm$1(n, min, max));
    } else {
      let y = new Array(value.length);
      for (let i = 0; i < value.length; i++) {
        y[i] = norm$1(value[i]);
      }
    }
  }
};
const lerp$1 = (value, min, max) => {
  if (typeof value === "number") return (max - min) * value + min;else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, lerp$1(value.arr.flat(1), min, max));else if (value instanceof Complex) return new Complex(lerp$1(value.a, min, max), lerp$1(value.b, min, max));else if (value instanceof Array) {
    if (value.every(n => typeof (n === "number"))) {
      return value.map(n => lerp$1(n, min, max));
    } else {
      let y = new Array(value.length);
      for (let i = 0; i < value.length; i++) {
        y[i] = lerp$1(value[i]);
      }
    }
  }
};
const map$1 = (value, a, b, c, d) => {
  if (typeof value === "number") return lerp$1(norm$1(value, a, b), c, d);else if (value instanceof Matrix) return new Matrix(value.rows, value.cols, map$1(value.arr.flat(1), a, b, c, d));else if (value instanceof Complex) return new Complex(map$1(value.a, b, c, d), map$1(value.b, a, b, c, d));else if (value instanceof Array) {
    if (value.every(n => typeof (n === "number"))) {
      return value.map(n => map$1(n, a, b, c, d));
    } else {
      let y = new Array(value.length);
      for (let i = 0; i < value.length; i++) {
        y[i] = map$1(value[i], a, b, c, d);
      }
    }
  }
};
const clamp$1 = (x, a, b) => {
  const [min_value, max_value] = [min(a, b), max(a, b)];
  if (typeof x === "number") return min(max(x, min_value), max_value);else if (x instanceof Matrix) return new Matrix(x.rows, x.cols, clamp$1(x.arr.flat(1), min_value, max_value));else if (x instanceof Complex) return new Complex(clamp$1(x.a, min_value, max_value), clamp$1(x.b, min_value, max_value));else if (x instanceof Array) {
    if (x.every(n => typeof (n === "number"))) {
      return x.map(n => clamp$1(n, min_value, max_value));
    } else {
      let y = new Array(x.length);
      for (let i = 0; i < x.length; i++) {
        y[i] = clamp$1(x[i], min_value, max_value);
      }
    }
  }
};
const arange = (a, b, step, include = false) => {
  let tab = [];
  if (a < b) {
    for (let i = a; include ? i <= b : i < b; i += step) tab.push(i * 10 / 10);
  } else {
    for (let i = a; include ? i >= b : i > b; i -= step) tab.push(i * 10 / 10);
  }
  return tab;
};
const linspace = (a, b, n = abs(b - a) + 1, endpoint = true) => {
  if (Math.floor(n) !== n) return;
  if ([a, b].every(n => typeof n === "number")) {
    const [max, min] = [a, b].sort((a, b) => b - a);
    var Y = [];
    let step;
    endpoint ? step = (max - min) / (n - 1) : step = (max - min) / n;
    for (var i = 0; i < n; i++) {
      a < b ? Y.push(min + step * i) : Y.push(max - step * i);
    }
    return Y;
  }
  if ([a, b].some(n => n instanceof Complex)) {
    const z1 = complex(a);
    const z2 = complex(b);
    n = n || Math.abs(z1.a - z2.a) + 1;
    const X = linspace(z1.a, z2.a, n, endpoint);
    const Y = linspace(z1.b, z2.b, n, endpoint);
    let Z = new Array(n).fill(null);
    Z = Z.map((n, i) => complex(X[i], Y[i]));
    return Z;
  }
};
const logspace = (a, b, n = b - a + 1, base = E, endpoint = true) => {
  return linspace(a, b, n, endpoint).map(n => pow(base, n));
};
const geomspace = (a, b, n = abs(b - a) + 1, endpoint = true) => {
  if (Math.floor(n) !== n) return;
  if ([a, b].every(n => typeof n === "number")) {
    const [max, min] = [a, b].sort((a, b) => b - a);
    let base;
    endpoint ? base = sqrtn(max / min, n - 1) : base = sqrtn(max / min, n);
    const Y = [min];
    for (let i = 1; i < n; i++) {
      Y.push(Y[i - 1] * base);
    }
    return a < b ? Y : Y.reverse();
  }
  if ([a, b].some(n => n instanceof Complex)) {
    const z1 = complex(a);
    const z2 = complex(b);
    n = n || Math.abs(z1.a - z2.a) + 1;
    let base;
    endpoint ? base = sqrtn(z2.div(z1), n - 1) : base = sqrtn(z2.div(z1), n);
    const Y = [z1];
    for (let i = 1; i < n; i++) {
      Y.push(mul(Y[i - 1], base));
    }
    return Y;
  }
};

const deg2rad = (...deg) => mapfun(x => x * Math.PI / 180, ...deg);
const rad2deg = (...rad) => mapfun(x => x / Math.PI * 180, ...rad);

const inRange = (x, a, b) => {
  const [min, max] = [Math.min(a, b), Math.max(a, b)];
  return x >= min && x <= max;
};
const isApproximatlyEqual = (a, b, Err = 0.0001) => {
  return Math.abs(a - b) <= Err;
};

const cartesianProduct = (a, b) => a.reduce((p, x) => [...p, ...b.map(y => [x, y])], []);
const pgcd = (n1, n2) => {
  let i,
    pgcd = 1;
  if (n1 == floor(n1) && n2 == floor(n2)) {
    for (i = 2; i <= n1 && i <= n2; ++i) {
      if (n1 % i == 0 && n2 % i == 0) pgcd = i;
    }
    return pgcd;
  } else console.log("error");
};
const ppcm = (n1, n2) => {
  let ppcm;
  if (n1 == floor(n1) && n2 == floor(n2)) {
    ppcm = n1 > n2 ? n1 : n2;
    while (true) {
      if (ppcm % n1 == 0 && ppcm % n2 == 0) break;
      ++ppcm;
    }
    return ppcm;
  } else console.log("error");
};

const Utils = {
  add,
  sub,
  mul,
  div,
  modulo,
  zeros,
  ones,
  nums,
  norm: norm$1,
  lerp: lerp$1,
  map: map$1,
  clamp: clamp$1,
  arange,
  linspace,
  logspace,
  geomspace,
  sum,
  prod,
  accum,
  cartesianProduct,
  ppcm,
  pgcd,
  deg2rad,
  rad2deg,
  inRange,
  isApproximatlyEqual
};

function __NumberProto__() {
  Object.defineProperties(Number.prototype, {
    inRange: {
      value: function (a, b) {
        return inRange(this.valueOf(), a, b);
      }
    },
    add: {
      value: function (...n) {
        return add(this.valueOf(), ...n);
      }
    },
    sub: {
      value: function (...n) {
        return sub(this.valueOf(), ...n);
      }
    },
    mul: {
      value: function (...n) {
        return mul(this.valueOf(), ...n);
      }
    },
    div: {
      value: function (...n) {
        return div(this.valueOf(), ...n);
      }
    },
    modulo: {
      value: function (...n) {
        return modulo(this.valueOf(), ...n);
      }
    },
    norm: {
      value: function (min, max) {
        return norm(this.valueOf(), min, max);
      }
    },
    lerp: {
      value: function (min, max) {
        return lerp(this.valueOf(), min, max);
      }
    },
    map: {
      value: function (a, b, c, d) {
        return map(this.valueOf(), a, b, c, d);
      }
    },
    clamp: {
      value: function (min, max) {
        return clamp(this.valueOf(), min, max);
      }
    },
    toDeg: {
      value: function () {
        return rad2deg(this.valueOf());
      }
    },
    toRad: {
      value: function () {
        return deg2rad(this.valueOf());
      }
    }
  });
}

function __ArrayProto__() {
  Object.defineProperties(Array.prototype, {
    inRange: {
      value: function (a, b) {
        return inRange(this.valueOf(), a, b);
      }
    },
    add: {
      value: function (...n) {
        return add(this.valueOf(), ...n);
      }
    },
    sub: {
      value: function (...n) {
        return sub(this.valueOf(), ...n);
      }
    },
    mul: {
      value: function (...n) {
        return mul(this.valueOf(), ...n);
      }
    },
    div: {
      value: function (...n) {
        return div(this.valueOf(), ...n);
      }
    },
    modulo: {
      value: function (...n) {
        return modulo(this.valueOf(), ...n);
      }
    },
    norm: {
      value: function (min, max) {
        return norm(this.valueOf(), min, max);
      }
    },
    lerp: {
      value: function (min, max) {
        return lerp(this.valueOf(), min, max);
      }
    },
    _map: {
      value: function (a, b, c, d) {
        return map(this.valueOf(), a, b, c, d);
      }
    },
    clamp: {
      value: function (min, max) {
        return clamp(this.valueOf(), min, max);
      }
    },
    deepMap: {
      value: function (callback) {
        return mapfun(callback, ...this.valueOf());
      }
    }
    // chunk:{
    //     value: function() {
    //     }
    // },
  });
}

const fft = x => {
  const output = [];
  const N = x.length;
  if (!(x[0] instanceof Complex)) x = x.map(n => complex(n, 0));
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < N; n++) {
      const phi = 2 * PI * k * n / N;
      re += x[n].a * cos(phi) + x[n].b * sin(phi);
      im += -x[n].a * sin(phi) + x[n].b * cos(phi);
    }
    re = re / N;
    im = im / N;
    output[k] = complex(re, im);
  }
  return {
    output,
    re: output.map(n => n.a),
    im: output.map(n => n.b),
    z: output.map(n => n.z),
    phi: output.map(n => n.phi)
  };
};
const ifft = x => {
  const output = [];
  const N = x.length;
  if (!(x[0] instanceof Complex)) x = x.map(n => complex(n, 0));
  for (let k = 0; k < N; k++) {
    let re = 0,
      im = 0;
    for (let n = 0; n < N; n++) {
      const phi = 2 * PI * k * n / N;
      re += x[n].a * cos(phi) + x[n].b * sin(phi);
      im += x[n].a * sin(phi) + x[n].b * cos(phi);
    }
    re = re / N;
    im = im / N;
    output[k] = complex(re, im);
  }
  return {
    output,
    re: output.map(n => n.a),
    im: output.map(n => n.b),
    z: output.map(n => n.z),
    phi: output.map(n => n.phi)
  };
};

const conv1d = (input, kernel, circular = true) => {
  const INPUT_LENGTH = input.length;
  const KERNEL_LENGTH = kernel.length;
  const output = [];
  const LENGTH_OUT = circular ? Math.max(INPUT_LENGTH, KERNEL_LENGTH) : INPUT_LENGTH + KERNEL_LENGTH - 1;
  for (let i = 0; i < LENGTH_OUT; i++) {
    let sum = 0;
    for (let j = 0; j < KERNEL_LENGTH; j++) {
      const inputIndex = i + j - Math.floor(KERNEL_LENGTH / 2);
      // Apply zero-padding for out-of-bounds indices
      const inputValue = inputIndex >= 0 && inputIndex < INPUT_LENGTH ? input[inputIndex] : 0;
      sum += inputValue * kernel[j];
    }
    output.push(sum);
  }
  return output;
};
const conv2d = (input, kernel, circular = true) => {
  if (!(input instanceof Matrix)) input = matrix(input);
  if (!(kernel instanceof Matrix)) kernel = matrix(kernel);
  const INPUT_ROWS = input.rows;
  const INPUT_COLS = input.cols;
  const OUTPUT_ROWS = circular ? Math.max(input.rows, kernel.rows) : input.rows + kernel.rows - 1;
  const OUTPUT_COLS = circular ? Math.max(input.cols, kernel.cols) : input.cols + kernel.cols - 1;
  const KERNEL_SIZE = kernel.rows;
  const output = [];
  for (let i = 0; i < OUTPUT_ROWS; i++) {
    const row = [];
    for (let j = 0; j < OUTPUT_COLS; j++) {
      let sum = 0;
      for (let k = 0; k < KERNEL_SIZE; k++) {
        for (let l = 0; l < KERNEL_SIZE; l++) {
          const rowIndex = i + k - Math.floor(KERNEL_SIZE / 2);
          const colIndex = j + l - Math.floor(KERNEL_SIZE / 2);
          // Apply zero-padding for out-of-bounds indices
          const inputValue = rowIndex >= 0 && rowIndex < INPUT_ROWS && colIndex >= 0 && colIndex < INPUT_COLS ? input[rowIndex][colIndex] : 0;
          sum += inputValue * kernel[k][l];
        }
      }
      row.push(sum);
    }
    output.push(row);
  }
  return output;
};
const conv = (input, kernel, circular) => {
  if (input instanceof Matrix || input instanceof Array && input[0][0]) return conv2d(input, kernel, circular);
  return conv1d(input, kernel, circular);
};
const circularConv = (input, kernel) => conv(input, kernel, true);
const linearConv = (input, kernel) => conv(input, kernel, false);
const circularConv1d = (input, kernel) => conv1d(input, kernel, true);
const circularConv2d = (input, kernel) => conv2d(input, kernel, true);
const linearConv1d = (input, kernel) => conv1d(input, kernel, false);
const linearConv2d = (input, kernel) => conv2d(input, kernel, false);

// should be processed in other thread
class Filter {
  constructor(input) {
    this.input = input;
    this.input_fft = fft(this.input);
    this.output_fft = [];
  }
  // get length(){
  //     return this.input.length;
  // }
  lowPass(fc) {
    this.input_fft.output.forEach((n, i) => {
      n = n.z < fc ? this.output_fft[i] = this.input_fft.output[i] : this.output_fft[i] = complex(0, 0);
    });
    return ifft(this.output_fft).re;
  }
  highPass(fc) {
    this.input_fft.output.forEach((n, i) => {
      n = n.z > fc ? this.output_fft[i] = this.input_fft.output[i] : this.output_fft[i] = complex(0, 0);
    });
    return ifft(this.output_fft).re;
  }
  bandePass() {}
  bandeCoupe() {}
}
const filter = input => new Filter(input);

//import { Matrix } from "../Matrix/index.js";
const Signal = {
  zeros,
  ones,
  nums,
  arange,
  linspace,
  logspace,
  geomspace,
  map: map$1,
  norm: norm$1,
  lerp: lerp$1,
  clamp: clamp$1,
  noise(n, min = 0, max = 1) {
    return Random.floats(n, min, max);
  },
  echelon(t, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => n >= t0 ? 1 : 0, ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  rampe(t, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => n >= t0 ? n - t0 : 0, ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  sign(t, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => Math.sign(n - t0), ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  rect(t, T, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => t0 - T / 2 < n && t0 + T / 2 > n ? 1 - 2 * abs(n / T) : 0, ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  tri(t, T, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => t0 - T / 2 < n && t0 + T / 2 > n ? 1 - 2 * abs(n / T) : 0, ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  dirac(t, t0) {
    return mapfun(n => n === t0 ? Infinity : 0, ...t);
  },
  lorentz(t, t0 = 0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => 1 / (1 + (n - t0) ** 2), ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  sinc(t, t0, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => sinc(n - t0), ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  square(t, T = 1, A = 1) {
    if (!(t instanceof Array)) t = [t];
    const Y = mapfun(n => sign(sin(n * 2 * Math.PI / T)), ...t);
    return Y instanceof Array ? Y.map(n => n * A) : Y * A;
  },
  sawtooth() {},
  conv,
  conv1d,
  conv2d,
  circularConv,
  linearConv,
  circularConv1d,
  linearConv1d,
  circularConv2d,
  linearConv2d,
  fft,
  ifft,
  filter
};

//import Ziko from "../index.js"
__NumberProto__();
__ArrayProto__();
const Math$1 = {
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
  sinc,
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
  min,
  max,
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
  mapfun,
  nums,
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
  logspace,
  geomspace,
  norm: norm$1,
  lerp: lerp$1,
  map: map$1,
  clamp: clamp$1,
  pgcd,
  ppcm,
  isApproximatlyEqual,
  inRange,
  cartesianProduct,
  Discret,
  Logic: Logic$1,
  Base,
  Permutation,
  Combinaison,
  PowerSet,
  subset,
  Signal,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

const __UI__ = {
  text: [],
  p: [],
  pre: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  br: [],
  hr: [],
  btn: [],
  ol: [],
  ul: [],
  image: [],
  video: [],
  audio: [],
  Article: [],
  Main: [],
  Section: [],
  Aside: [],
  Nav: [],
  Header: [],
  Footer: [],
  Flex: [],
  FlexMain: [],
  FlexNav: [],
  FlexHeader: [],
  FlexFooter: [],
  FlexSection: [],
  FLexArticle: [],
  FlexAside: [],
  Table: [],
  Svg: [],
  Canvas: []
};

const addSuffixeToNumber = (value, suffixe = "px") => {
  if (typeof value === "number") value += suffixe;
  if (value instanceof Array) value = value.map(n => typeof n === "number" ? n += suffixe : n).join(" ");
  return value;
};
const style = (el, styles) => {
  if (el) Object.assign(el.style, styles);
};

class ZikoUIElementStyle {
  constructor(defaultStyle = {}) {
    this.target = null;
    this.styles = new Map([["default", defaultStyle]]);
    this.cache = {
      isHidden: false,
      isFaddedOut: false,
      transformation: {
        Flip: [0, 0, 0],
        matrix: new Matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])
      }
    };
  }
  style(styles, {
    target = "parent",
    maskVector = null
  } = {}) {
    if (target === "parent" || target === 0) style(this.target.element, styles);else if (target === "parent" || target === 0) {
      if (maskVector) {
        this.items.map((n, i) => maskVector[i] == 1 && n.style(styles));
      } else this.items.map(n => n.style(styles));
    }
    return this;
  }
  linkTo(target) {
    this.target = target;
    return this;
  }
  use(name = "default") {
    this.style(this.styles.get(name));
    return this;
  }
  update(name, styles) {
    const old = this.styles.get(name);
    old ? this.styles.set(name, Object.assign(old, styles)) : this.styles.set(name, styles);
    return this;
  }
  add(name, styles) {
    this.styles.set(name, styles);
    return this;
  }
  replace(name, styles) {
    this.styles.set(name, styles);
    return this;
  }
  delete(...names) {
    names.forEach(n => this.styles.delete(n));
    return this;
  }
  updateDefaultStyle() {
    const defaultStyle = Object.fromEntries(Object.entries(this.target.element.style).filter(n => isNaN(+n[0])));
    this.update("default", defaultStyle);
    return this;
  }
  hover(styles) {
    //this.updateDefaultStyle()
    if (styles) this.add("hover", styles);
    this.target.element.addEventListener("pointerenter", () => this.use("hover"));
    this.target.element.addEventListener("pointerleave", () => this.use("default"));
    return this;
  }
  // Size
  size(width, height, {
    target,
    maskVector
  } = {}) {
    this.style({
      width,
      height
    }, {
      target,
      maskVector
    });
    return this;
  }
  width(w, {
    target,
    maskVector
  } = {}) {
    if (w instanceof Object) {
      if (w instanceof Array) w = {
        min: w[0],
        max: w[1]
      };
      if ("min" in w || "max" in w) {
        let min = w.min ?? w.max;
        let max = w.max ?? w.min;
        min = addSuffixeToNumber(min, "px");
        max = addSuffixeToNumber(max, "px");
        this.style({
          minWidth: min,
          maxWidth: max
        }, {
          target,
          maskVector
        });
      }
    } else {
      w = addSuffixeToNumber(w, "px");
      this.style({
        width: w
      }, {
        target,
        maskVector
      });
    }
    return this;
  }
  height(h, {
    target,
    maskVector
  } = {}) {
    if (h instanceof Object) {
      if (h instanceof Array) h = {
        min: h[0],
        max: h[1]
      };
      if ("min" in h || "max" in h) {
        let min = h.min ?? h.max;
        let max = h.max ?? h.min;
        min = addSuffixeToNumber(min, "px");
        max = addSuffixeToNumber(max, "px");
        this.style({
          minHeight: min,
          maxHeight: max
        }, {
          target,
          maskVector
        });
      }
    } else {
      h = addSuffixeToNumber(h, "px");
      this.style({
        height: h
      }, {
        target,
        maskVector
      });
    }
    return this;
  }
  // Apparence
  hide({
    after,
    target,
    maskVector
  } = {}) {
    if (typeof after === "number") {
      const wrapper = () => this.hide({
        target,
        maskVector
      });
      setTimeout(wrapper, after);
      clearTimeout(wrapper);
    } else {
      this.cache.isHidden = true;
      this.style({
        display: "none"
      }, {
        target,
        maskVector
      });
    }
    return this;
  }
  show({
    after,
    target,
    maskVector
  } = {}) {
    if (typeof after === "number") {
      const wrapper = () => this.show({
        target,
        maskVector
      });
      setTimeout(wrapper, after);
      clearTimeout(wrapper);
    } else {
      this.cache.isHidden = false;
      this.style({
        display: ""
      }, {
        target,
        maskVector
      });
    }
    return this;
  }
  color(color, {
    target,
    maskVector
  } = {}) {
    this.style({
      color
    }, {
      target,
      maskVector
    });
    return this;
  }
  background(background, {
    target,
    maskVector
  } = {}) {
    this.style({
      background
    }, {
      target,
      maskVector
    });
    return this;
  }
  backgroundColor(backgroundColor, {
    target,
    maskVector
  } = {}) {
    this.style({
      backgroundColor
    }, {
      target,
      maskVector
    });
    return this;
  }
  opacity(opacity, {
    target,
    maskVector
  } = {}) {
    this.style({
      opacity
    }, {
      target,
      maskVector
    });
    return this;
  }
  // Placement
  position(position, {
    target,
    maskVector
  } = {}) {
    this.style({
      position
    }, {
      target,
      maskVector
    });
    return this;
  }
  display(disp, {
    target,
    maskVector
  } = {}) {
    this.style({
      display: disp
    }, {
      target,
      maskVector
    });
    return this;
  }
  zIndex(z, {
    target,
    maskVector
  } = {}) {
    this.style({
      zIndex: z
    }, {
      target,
      maskVector
    });
    return this;
  }
  float(float, {
    target,
    maskVector
  } = {}) {
    this.style({
      float: float
    }, {
      target,
      maskVector
    });
    return this;
  }
  // Box Model 
  border(border = "1px solid red", {
    target,
    maskVector
  } = {}) {
    this.style({
      border
    }, {
      target,
      maskVector
    });
    return this;
  }
  borderTop(borderTop = "1px solid red", {
    target,
    maskVector
  } = {}) {
    this.style({
      borderTop
    }, {
      target,
      maskVector
    });
    return this;
  }
  borderRight(borderRight = "1px solid red", {
    target,
    maskVector
  } = {}) {
    this.style({
      borderRight
    }, {
      target,
      maskVector
    });
    return this;
  }
  borderBottom(borderBottom = "1px solid red", {
    target,
    maskVector
  } = {}) {
    this.style({
      borderBottom
    }, {
      target,
      maskVector
    });
    return this;
  }
  borderLeft(borderLeft = "1px solid red", {
    target,
    maskVector
  } = {}) {
    this.style({
      borderLeft
    }, {
      target,
      maskVector
    });
    return this;
  }
  borderRadius(radius, {
    target,
    maskVector
  } = {}) {
    radius = addSuffixeToNumber(radius, "px");
    this.style({
      borderRadius: radius
    }, {
      target,
      maskVector
    });
    return this;
  }
  margin(margin, {
    target,
    maskVector
  } = {}) {
    margin = addSuffixeToNumber(margin, "px");
    this.style({
      margin
    }, {
      target,
      maskVector
    });
    return this;
  }
  marginTop(marginTop, {
    target,
    maskVector
  } = {}) {
    marginTop = addSuffixeToNumber(marginTop, "px");
    this.style({
      marginTop
    }, {
      target,
      maskVector
    });
    return this;
  }
  marginRight(marginRight, {
    target,
    maskVector
  } = {}) {
    marginRight = addSuffixeToNumber(marginRight, "px");
    this.style({
      marginRight
    }, {
      target,
      maskVector
    });
    return this;
  }
  marginBootom(marginBootom, {
    target,
    maskVector
  } = {}) {
    marginBootom = addSuffixeToNumber(marginBootom, "px");
    this.style({
      marginBootom
    }, {
      target,
      maskVector
    });
    return this;
  }
  marginLeft(marginLeft, {
    target,
    maskVector
  } = {}) {
    marginLeft = addSuffixeToNumber(marginLeft, "px");
    this.style({
      marginLeft
    }, {
      target,
      maskVector
    });
    return this;
  }
  padding(padding, {
    target,
    maskVector
  } = {}) {
    padding = addSuffixeToNumber(padding, "px");
    this.style({
      padding
    }, {
      target,
      maskVector
    });
    return this;
  }
  paddingTop(paddingTop, {
    target,
    maskVector
  } = {}) {
    paddingTop = addSuffixeToNumber(paddingTop, "px");
    this.style({
      paddingTop
    }, {
      target,
      maskVector
    });
    return this;
  }
  paddingRight(paddingRight, {
    target,
    maskVector
  } = {}) {
    paddingRight = addSuffixeToNumber(paddingRight, "px");
    this.style({
      paddingRight
    }, {
      target,
      maskVector
    });
    return this;
  }
  paddingBootom(paddingBootom, {
    target,
    maskVector
  } = {}) {
    paddingBootom = addSuffixeToNumber(paddingBootom, "px");
    this.style({
      paddingBootom
    }, {
      target,
      maskVector
    });
    return this;
  }
  paddingLeft(paddingLeft, {
    target,
    maskVector
  } = {}) {
    paddingLeft = addSuffixeToNumber(paddingLeft, "px");
    this.style({
      paddingLeft
    }, {
      target,
      maskVector
    });
    return this;
  }
  // Typographie
  font(font, {
    target,
    maskVector
  } = {}) {
    this.style({
      font
    }, {
      target,
      maskVector
    });
    return this;
  }
  fontFamily(fontFamily = "", {
    target,
    maskVector
  } = {}) {
    this.style({
      fontFamily
    }, {
      target,
      maskVector
    });
    return this;
  }
  fontSize(fontSize, {
    target,
    maskVector
  } = {}) {
    this.style({
      fontSize
    }, {
      target,
      maskVector
    });
    return this;
  }
  // Misc
  cursor(type = "pointer") {
    this.style({
      cursor: type
    });
    return this;
  }
  overflow(x, y, {
    target,
    maskVector
  } = {}) {
    const values = ["hidden", "auto"];
    this.style({
      overflowX: typeof x === "number" ? values[x] : x,
      overflowY: typeof y === "number" ? values[y] : y
    }, {
      target,
      maskVector
    });
    return this;
  }
  clip(polygon, {
    target,
    maskVector
  } = {}) {
    if (typeof polygon === "string") polygon = "polygon(" + polygon + ")";
    this.style({
      clipPath: polygon
    }, {
      target,
      maskVector
    });
    return this;
  }
  // Transfromations
  fadeOut(t = 1) {
    this.style({
      transition: t / 1000 + "s",
      opacity: 0
    });
    this.cache.isFaddedOut = true;
    return this;
  }
  fadeIn(t = 1) {
    this.style({
      transition: t / 1000 + "s",
      opacity: 1
    });
    this.cache.isFaddedOut = false;
    return this;
  }
  toggleFade(t_in = 1000, t_out = t_in) {
    this.cache.isFaddedOut ? this.fadeIn(t_in) : this.fadeOut(t_out);
    return this;
  }
  #applyTransformMatrix(t) {
    const transformMatrix = this.cache.transformation.matrix.arr.join(",");
    this.style({
      transform: `matrix3d(${transformMatrix})`,
      "-webkit-transform": `matrix3d(${transformMatrix})`,
      "-moz-transform": `matrix3d(${transformMatrix})`,
      "-ms-transform": `matrix3d(${transformMatrix})`,
      "-o-transform": `matrix3d(${transformMatrix})`
    });
    if (t != 0) this.style({
      transition: `transform ${t / 1000}s ease`
    });
  }
  translate(x, y = x, t = 0) {
    this.cache.transformation.matrix.set(3, 0, x);
    this.cache.transformation.matrix.set(3, 1, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  translateX(x, t = 0) {
    this.cache.transformation.matrix.set(3, 0, x);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  translateY(y, t = 0) {
    this.cache.transformation.matrix.set(3, 1, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  scale(x, y = x, t = 0) {
    this.cache.transformation.matrix.set(0, 0, x);
    this.cache.transformation.matrix.set(1, 1, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  scaleX(x = 1, t = 0) {
    this.cache.transformation.matrix.set(0, 0, x);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  scaleY(y = 1, t = 0) {
    this.cache.transformation.matrix.set(1, 1, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  skew(x, y = x, t = 0) {
    this.cache.transformation.matrix.set(0, 1, x);
    this.cache.transformation.matrix.set(1, 0, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  skewX(x = 1, t = 0) {
    this.cache.transformation.matrix.set(0, 1, x);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  skewY(y = 1, t = 0) {
    this.cache.transformation.matrix.set(1, 0, y);
    this.cache.transformation.matrix.arr.join(",");
    this.#applyTransformMatrix(t);
    return this;
  }
  rotateX(deg, t = 0) {
    this.cache.transformation.matrix.set(1, 1, cos(deg));
    this.cache.transformation.matrix.set(1, 2, -sin(deg));
    this.cache.transformation.matrix.set(2, 1, sin(deg));
    this.cache.transformation.matrix.set(1, 2, cos(deg));
    this.#applyTransformMatrix(t);
    return this;
  }
  rotateY(deg, t = 0) {
    this.cache.transformation.matrix.set(0, 0, cos(deg));
    this.cache.transformation.matrix.set(0, 2, sin(deg));
    this.cache.transformation.matrix.set(2, 0, -sin(deg));
    this.cache.transformation.matrix.set(2, 2, cos(deg));
    this.#applyTransformMatrix(t);
    return this;
  }
  rotateZ(deg, t = 0) {
    this.cache.transformation.matrix.set(0, 0, cos(deg));
    this.cache.transformation.matrix.set(0, 1, -sin(deg));
    this.cache.transformation.matrix.set(1, 0, sin(deg));
    this.cache.transformation.matrix.set(1, 1, cos(deg));
    this.#applyTransformMatrix(t);
    return this;
  }
  flipeX({
    t = 1
  } = {}) {
    this.cache.transformation.Flip[0] += 180;
    this.cache.transformation.Flip[0] %= 360;
    this.rotateX(this.cache.transformation.Flip[0], t);
    return this;
  }
  flipeY(t = 1) {
    this.cache.transformation.Flip[1] += 180;
    this.cache.transformation.Flip[1] %= 360;
    this.rotateY(this.cache.transformation.Flip[1], t);
    return this;
  }
  flipeZ(t = 1) {
    this.cache.transformation.Flip[2] += 180;
    this.cache.transformation.Flip[2] %= 360;
    this.rotateZ(this.cache.transformation.Flip[2], t);
    return this;
  }
  slideHeightIn(t = 1, h = this.h) {
    this.style({
      transition: t + "s",
      height: h
    });
    return this;
  }
  slideHeightOut(t = 1) {
    this.style({
      transition: t + "s",
      height: 0
    });
    this.target.element.addEventListener("transitionend", () => this.style({
      opacity: "none"
    }));
    return this;
  }
  slideWidthIn(t = 1, w = this.w) {
    this.style({
      transition: t + "s",
      width: w
    });
    return this;
  }
  slideWidthOut(t = 1) {
    this.style({
      transition: t + "s",
      width: 0
    });
    const wrapper = () => {
      this.style({
        opacity: "none"
      });
    };
    this.target.element.addEventListener("transitionend", wrapper);
    this.target.element.removeEventListener("transitionend", wrapper);
    return this;
  }
  slideIn({
    t = 1,
    w = "100%",
    h = "auto"
  } = {}) {
    this.style({
      transition: t + "s",
      width: w,
      height: h,
      visibility: "visible"
    });
    return this;
  }
  slideOut({
    t = 1,
    width = 0,
    height = 0
  } = {}) {
    this.style({
      visibility: "hidden",
      transition: t + "s",
      opacity: "none",
      width: width,
      height: height
    });
    const wrapper = () => {
      this.style({
        opacity: "none"
      });
    };
    this.target.element.addEventListener("transitionend", wrapper);
    this.target.element.removeEventListener("transitionend", wrapper);
    return this;
  }
}
const ZikoStyle = defaultStyle => new ZikoUIElementStyle(defaultStyle);

function EVENT_CONTROLLER(e, EVENT, setter, push_object) {
  this.event = e;
  if (this.cache.preventDefault[EVENT]) e.preventDefault();
  if (setter) setter();
  if (this.cache.stream.enabled[EVENT] && push_object) this.cache.stream.history[EVENT].push(push_object);
  this.cache.callbacks[EVENT].map(n => n(this));
  return this;
}
class ZikoEvent {
  constructor(Target) {
    this.target = null;
    this.setTarget(Target);
    this.__dispose = this.dispose.bind(this);
    // this.EventIndex=Garbage.Pointer.data.length;
    // Garbage.Pointer.data.push({event:this,index:this.EventIndex});
  }
  get targetElement() {
    return this.target.element;
  }
  setTarget(UI) {
    this.target = UI;
    return this;
  }
  __handle(event, handler, dispose) {
    const EVENT = event === "drag" ? event : `${this.cache.prefixe}${event}`;
    this.dispose(dispose);
    this.targetElement.addEventListener(EVENT, handler);
    return this;
  }
  __onEvent(event, dispose, ...callbacks) {
    if (callbacks.length === 0) {
      if (this.cache.callbacks.length > 1) {
        this.cache.callbacks.map(n => e => n.call(this, e));
      } else {
        return this;
      }
    } else this.cache.callbacks[event] = callbacks.map(n => e => n.call(this, e));
    this.__handle(event, this.__controller[event], dispose);
    return this;
  }
  preventDefault(config = {}) {
    Object.assign(this.cache.preventDefault, config);
    return this;
  }
  pause(config = {}) {
    const all = Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n => [n, true]));
    config = {
      ...all,
      ...config
    };
    for (let key in config) {
      if (config[key]) {
        this.targetElement.removeEventListener(`${this.cache.prefixe}${key}`, this.__controller[`${this.cache.prefixe}${key}`]);
        this.cache.paused[`${this.cache.prefixe}${key}`] = true;
      }
    }
    return this;
  }
  resume(config = {}) {
    const all = Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n => [n, true]));
    config = {
      ...all,
      ...config
    };
    for (let key in config) {
      if (config[key]) {
        this.targetElement.addEventListener(`${this.cache.prefixe}${key}`, this.__controller[`${this.cache.prefixe}${key}`]);
        this.cache.paused[`${this.cache.prefixe}${key}`] = false;
      }
    }
    return this;
  }
  dispose(config = {}) {
    this.pause(config);
    return this;
  }
  stream(config = {}) {
    this.cache.stream.t0 = Date.now();
    const all = Object.fromEntries(Object.keys(this.cache.stream.enabled).map(n => [n, true]));
    config = {
      ...all,
      ...config
    };
    Object.assign(this.cache.stream.enabled, config);
    return this;
  }
  clear(config = {}) {
    const all = Object.fromEntries(Object.keys(this.cache.stream.clear).map(n => [n, true]));
    config = {
      ...all,
      ...config
    };
    for (let key in config) {
      if (config[key]) {
        this.cache.stream.history[key] = [];
      }
    }
    return this;
  }
}

function pointerdown_controller(e) {
  EVENT_CONTROLLER.call(this, e, "down", () => {
    this.dx = parseInt(e.offsetX);
    this.dy = parseInt(e.offsetY);
    this.isDown = true;
  }, {
    x: this.dx,
    y: this.dy,
    t: Date.now() - this.cache.stream.t0
  });
}
function pointermove_controller(e) {
  EVENT_CONTROLLER.call(this, e, "move", () => {
    this.mx = parseInt(e.offsetX);
    this.my = parseInt(e.offsetY);
    this.isMoving = true;
  }, {
    x: this.mx,
    y: this.my,
    t: Date.now() - this.cache.stream.t0
  });
}
function pointerup_controller(e) {
  EVENT_CONTROLLER.call(this, e, "up", () => {
    this.ux = parseInt(e.offsetX);
    this.uy = parseInt(e.offsetY);
    this.isDown = false;
    const dx = this.dx;
    const dy = this.dy;
    const ux = this.ux;
    const uy = this.uy;
    const delta_x = (ux - dx) / this.Target.Width;
    const delta_y = (dy - uy) / this.Target.Height;
    const HORIZONTAL_SWIPPE = delta_x < 0 ? "left" : delta_x > 0 ? "right" : "none";
    const VERTICAL_SWIPPE = delta_y < 0 ? "bottom" : delta_y > 0 ? "top" : "none";
    this.swippe = {
      h: HORIZONTAL_SWIPPE,
      v: VERTICAL_SWIPPE,
      delta_x,
      delta_y
    };
  }, {
    x: this.ux,
    y: this.uy,
    t: Date.now() - this.cache.stream.t0
  });
}
function pointerenter_controller(e) {
  EVENT_CONTROLLER.call(this, e, "enter", null, null);
}
function pointerleave_controller(e) {
  EVENT_CONTROLLER.call(this, e, "leave", null, null);
}
function pointerout_controller(e) {
  EVENT_CONTROLLER.call(this, e, "out", null, null);
}
class ZikoEventPointer extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.dx = 0;
    this.dy = 0;
    this.dt = 0;
    this.mx = 0;
    this.my = 0;
    this.mt = 0;
    this.ux = 0;
    this.uy = 0;
    this.ut = 0;
    this.swippe = {
      h: null,
      v: null,
      delta_x: 0,
      delta_y: 0
    };
    this.isMoving = false;
    this.isDown = false;
    this.cache = {
      prefixe: "pointer",
      preventDefault: {
        down: false,
        move: false,
        up: false,
        enter: false,
        out: false,
        leave: false
      },
      paused: {
        down: false,
        move: false,
        up: false,
        enter: false,
        out: false,
        leave: false
      },
      stream: {
        enabled: {
          down: false,
          move: false,
          up: false,
          enter: false,
          out: false,
          leave: false
        },
        clear: {
          down: false,
          move: false,
          up: false,
          enter: false,
          out: false,
          leave: false
        },
        history: {
          down: [],
          move: [],
          up: [],
          enter: [],
          out: [],
          leave: []
        }
      },
      callbacks: {
        down: [self => console.log({
          dx: self.dx,
          dy: self.dy,
          down: self.down,
          move: self.move,
          t: self.dt
        })],
        move: [self => console.log({
          mx: self.mx,
          my: self.my,
          down: self.down,
          move: self.move,
          t: self.dt
        })],
        up: [self => console.log({
          ux: self.ux,
          uy: self.uy,
          down: self.down,
          move: self.move,
          t: self.dt
        })],
        enter: [self => console.log({
          dx: self.dx,
          dy: self.dy,
          down: self.down,
          move: self.move,
          t: self.dt
        })],
        out: [self => console.log({
          mx: self.mx,
          my: self.my,
          down: self.down,
          move: self.move,
          t: self.dt
        })],
        leave: [self => console.log({
          ux: self.ux,
          uy: self.uy,
          down: self.down,
          move: self.move,
          t: self.dt
        })]
      }
    };
    this.__controller = {
      down: pointerdown_controller.bind(this),
      move: pointermove_controller.bind(this),
      up: pointerup_controller.bind(this),
      enter: pointerenter_controller.bind(this),
      out: pointerout_controller.bind(this),
      leave: pointerleave_controller.bind(this)
    };
  }
  onDown(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("down", {
      down: true,
      move: false,
      up: false,
      enter: false,
      out: false,
      leave: false
    }, ...callbacks);
    return this;
  }
  onMove(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("move", {
      down: false,
      move: true,
      up: false,
      enter: false,
      out: false,
      leave: false
    }, ...callbacks);
    return this;
  }
  onUp(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("up", {
      down: false,
      move: false,
      up: true,
      enter: false,
      out: false,
      leave: false
    }, ...callbacks);
    return this;
  }
  onEnter(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("enter", {
      down: false,
      move: false,
      up: false,
      enter: true,
      out: false,
      leave: false
    }, ...callbacks);
    return this;
  }
  onOut(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("out", {
      down: false,
      move: false,
      up: false,
      enter: false,
      out: true,
      leave: false
    }, ...callbacks);
    return this;
  }
  onLeave(...callbacks) {
    if (callbacks.length === 0) callbacks = [() => {}];
    this.__onEvent("leave", {
      down: false,
      move: false,
      up: false,
      enter: false,
      out: false,
      leave: true
    }, ...callbacks);
    return this;
  }
  // handle({down=false,move=false,up=false}={}){
  //     if(down)this.handleDown();
  //     if(move)this.handleMove();
  //     if(up)this.handleUp()
  // }
}
var Pointer = target => new ZikoEventPointer(target);

function keydown_controller(e) {
  EVENT_CONTROLLER.call(this, e, "down", () => this.kd = e.key, {
    key: e.key,
    t: 10
  });
}
function keypress_controller(e) {
  EVENT_CONTROLLER.call(this, e, "press", () => this.kp = e.key, {
    key: e.key,
    t: 10
  });
}
function keyup_controller(e) {
  EVENT_CONTROLLER.call(this, e, "up", () => this.ku = e.key, {
    key: e.key,
    t: 10
  });
}
class ZikoEventKey extends ZikoEvent {
  constructor(target) {
    super(target);
    this.kp = null;
    this.kd = null;
    this.ku = null;
    this.t = 0;
    this.cache = {
      prefixe: "key",
      preventDefault: {
        down: false,
        press: false,
        up: false
      },
      paused: {
        down: false,
        press: false,
        up: false
      },
      stream: {
        enabled: {
          down: false,
          press: false,
          up: false
        },
        clear: {
          down: true,
          press: false,
          up: false
        },
        history: {
          down: [],
          press: [],
          up: []
        }
      },
      callbacks: {
        down: [self => console.log({
          kd: self.kd
        })],
        press: [self => console.log({
          kp: self.kp
        })],
        up: [self => console.log({
          ku: self.ku
        })]
      },
      successifKeysCallback: {
        down: [self => console.log(1111)],
        press: [self => console.log(1112)],
        kyup: [self => console.log(1113)]
      }
    };
    this.__controller = {
      down: keydown_controller.bind(this),
      press: keypress_controller.bind(this),
      up: keyup_controller.bind(this)
    };
  }
  onDown(...callbacks) {
    this.__onEvent("down", {
      down: true
    }, ...callbacks);
    return this;
  }
  onPress(...callbacks) {
    this.__onEvent("press", {
      press: true
    }, ...callbacks);
    return this;
  }
  onUp(...callbacks) {
    this.__onEvent("up", {
      up: true
    }, ...callbacks);
    return this;
  }
  // handleSuccessifKeys({keys=[],callback=()=>console.log(1),event={down:true,press:false,up:false}}={}){
  //     const reversedkeys = keys.reverse();
  //     const newkeys = new Array(reversedkeys.length).fill(null);
  //     const addsub = (arr, item, length = keys.length) => {
  //         arr.unshift(item);
  //         arr.length = length;
  //       };

  //     if(event.down){
  //         this.handleDown();
  //         this.cache.successifKeysCallback.down=[callback];
  //         this.cache.callback.down.push(e=>{
  //             addsub(newkeys,e.kd);
  //             if(JSON.stringify(reversedkeys)===JSON.stringify(newkeys))this.cache.successifKeysCallback.down.map(n=>n(this))
  //         })        
  //         }       
  //  }
}
var Key = Target => new ZikoEventKey(Target);

function dragstart_controller(e) {
  EVENT_CONTROLLER(this, e, "start", null);
}
function drag_controller(e) {
  EVENT_CONTROLLER.call(this, e, "drag", null, null);
}
function dragend_controller(e) {
  EVENT_CONTROLLER.call(this, e, "end", null, null);
}
function drop_controller(e) {
  EVENT_CONTROLLER.call(this, e, "drop", null, null);
}
class ZikoEventDrag extends ZikoEvent {
  constructor(Target) {
    super(Target);
    this.Target.setAttribute("draggable", true);
    this.cache = {
      prefixe: "drag",
      preventDefault: {
        drag: false,
        start: false,
        end: false,
        enter: false,
        leave: false,
        over: false
      },
      paused: {
        drag: false,
        start: false,
        end: false,
        enter: false,
        leave: false,
        over: false
      },
      enabled: {
        drag: false,
        start: false,
        end: false,
        enter: false,
        leave: false,
        over: false
      },
      callbacks: {
        drag: [],
        start: [],
        end: [],
        enter: [],
        leave: [],
        over: []
      },
      stream: {
        enabled: {
          drag: false,
          start: false,
          end: false,
          enter: false,
          leave: false,
          over: false
        },
        clear: {
          drag: false,
          start: false,
          end: false,
          enter: false,
          leave: false,
          over: false
        },
        history: {
          drag: [],
          start: [],
          end: [],
          enter: [],
          leave: [],
          over: []
        }
      }
    };
    this.__controller = {
      start: dragstart_controller.bind(this),
      drag: drag_controller.bind(this),
      end: dragend_controller.bind(this)
    };
  }
  onStart(...callbacks) {
    this.__onEvent("start", {}, ...callbacks);
    return this;
  }
  onDrag(...callbacks) {
    this.__onEvent("drag", {}, ...callbacks);
    return this;
  }
  onEnd(...callbacks) {
    this.__onEvent("end", {}, ...callbacks);
    return this;
  }
}
class ZikoEventDrop extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {
        drop: false
      },
      paused: {
        drop: false
      },
      stream: {
        enabled: {
          drop: false
        },
        clear: {
          drop: false
        },
        history: {
          drop: []
        }
      },
      callbacks: {
        drop: [self => console.log({
          dx: self.dx,
          dy: self.dy,
          drop: self.drop,
          move: self.move,
          t: self.dt
        })]
      }
    };
    this.__controller = {
      drop: drop_controller.bind(this)
    };
  }
  onDrop(...callbacks) {
    this.__onEvent("drop", {}, ...callbacks);
    return this;
  }
}
const Drag = Target => new ZikoEventDrag(Target);
const Drop = Target => new ZikoEventDrop(Target);

function click_controller(e) {
  EVENT_CONTROLLER.call(this, e, "click", null, null);
}
function dbclick_controller(e) {
  EVENT_CONTROLLER.call(this, e, "dbclick", null, null);
}
class ZikoEventClick extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {
        click: false,
        dbclick: false
      },
      paused: {
        click: false,
        dbclick: false
      },
      stream: {
        enabled: {
          click: false,
          dbclick: false
        },
        clear: {
          click: false,
          dbclick: false
        },
        history: {
          click: [],
          dbclick: []
        }
      },
      callbacks: {
        click: [],
        dbclick: []
      }
    };
    this.__controller = {
      click: click_controller.bind(this),
      dbclick: dbclick_controller.bind(this)
    };
  }
  onClick(...callbacks) {
    this.__onEvent("click", {}, ...callbacks);
    return this;
  }
  onDbClick(...callbacks) {
    this.__onEvent("dbclick", {}, ...callbacks);
    return this;
  }
}
const Click = Target => new ZikoEventClick(Target);

function copy_controller(e) {
  EVENT_CONTROLLER.call(this, e, "copy", null, null);
}
function cut_controller(e) {
  EVENT_CONTROLLER.call(this, e, "cut", null, null);
}
function paste_controller(e) {
  EVENT_CONTROLLER.call(this, e, "paste", null, null);
}
function select_controller(e) {
  EVENT_CONTROLLER.call(this, e, "select", null, null);
}
class ZikoEventClipboard extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {
        copy: false,
        cut: false,
        paste: false,
        select: false
      },
      paused: {
        copy: false,
        cut: false,
        paste: false,
        select: false
      },
      stream: {
        enabled: {
          copy: false,
          cut: false,
          paste: false,
          select: false
        },
        clear: {
          copy: false,
          cut: false,
          paste: false,
          select: false
        },
        history: {
          copy: [],
          cut: [],
          paste: [],
          select: []
        }
      },
      callbacks: {
        copy: [],
        cut: [],
        paste: [],
        select: []
      }
    };
    this.__controller = {
      copy: copy_controller.bind(this),
      cut: cut_controller.bind(this),
      paste: paste_controller.bind(this),
      select: select_controller.bind(this)
    };
  }
  onCopy(...callbacks) {
    this.__onEvent("copy", {}, ...callbacks);
    return this;
  }
  onCut(...callbacks) {
    this.__onEvent("cut", {}, ...callbacks);
    return this;
  }
  onPaste(...callbacks) {
    this.__onEvent("paste", {}, ...callbacks);
    return this;
  }
  onSelect(...callbacks) {
    this.__onEvent("select", {}, ...callbacks);
    return this;
  }
}
const Clipboard = Target => new ZikoEventClipboard(Target);

function focus_controller(e) {
  EVENT_CONTROLLER.call(this, e, "focus", null, null);
}
function blur_controller(e) {
  EVENT_CONTROLLER.call(this, e, "blur", null, null);
}
class ZikoEventFocus extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {
        focus: false,
        blur: false
      },
      paused: {
        focus: false,
        blur: false
      },
      stream: {
        enabled: {
          focus: false,
          blur: false
        },
        clear: {
          focus: false,
          blur: false
        },
        history: {
          focus: [],
          blur: []
        }
      },
      callbacks: {
        focus: [],
        blur: []
      }
    };
    this.__controller = {
      focus: focus_controller.bind(this),
      blur: blur_controller.bind(this)
    };
  }
  onFocus(...callbacks) {
    this.__onEvent("focus", {}, ...callbacks);
    return this;
  }
  onBlur(...callbacks) {
    this.__onEvent("blur", {}, ...callbacks);
    return this;
  }
}
const Focus = Target => new ZikoEventFocus(Target);

function input_controller(e) {
  EVENT_CONTROLLER.call(this, e, "input", null, null);
}
function change_controller(e) {
  EVENT_CONTROLLER.call(this, e, "change", null, null);
}
class ZikoEventInput extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {
        input: false,
        change: false
      },
      paused: {
        input: false,
        change: false
      },
      stream: {
        enabled: {
          input: false,
          change: false
        },
        clear: {
          input: false,
          change: false
        },
        history: {
          input: [],
          change: []
        }
      },
      callbacks: {
        input: [],
        change: []
      }
    };
    this.__controller = {
      input: input_controller.bind(this),
      change: change_controller.bind(this)
    };
  }
  get value() {
    return this.target.value;
  }
  onInput(...callbacks) {
    this.__onEvent("input", {}, ...callbacks);
    return this;
  }
  onChange(...callbacks) {
    this.__onEvent("change", {}, ...callbacks);
    return this;
  }
}
const Input = Target => new ZikoEventInput(Target);

const custom_event_controller = event_name => function (e) {
  EVENT_CONTROLLER.call(this, e, event_name, null, null);
};
class ZikoCustomEvent extends ZikoEvent {
  constructor(target) {
    super(target);
    this.event = null;
    this.cache = {
      prefixe: "",
      preventDefault: {},
      paused: {},
      stream: {
        enabled: {},
        clear: {},
        history: {}
      },
      callbacks: {}
    };
    this.__controller = {};
  }
  #init(event_name) {
    this.cache.preventDefault[event_name] = false;
    this.cache.paused[event_name] = false;
    this.cache.stream.enabled = false;
    this.cache.stream.clear = false;
    this.cache.stream.history = [];
    this.cache.callbacks[event_name] = [];
    this.__controller[event_name] = custom_event_controller(event_name).bind(this);
    return this;
  }
  on(event_name, ...callbacks) {
    if (!this.__controller[event_name]) this.#init(event_name);
    this.__onEvent(event_name, {}, ...callbacks);
    return this;
  }
  emit(event_name, detail = {}) {
    if (!this.__controller[event_name]) this.#init(event_name);
    this.detail = detail;
    const event = new Event(event_name);
    this.targetElement.dispatchEvent(event);
    return this;
  }
}
const CustomEvent = Target => new ZikoCustomEvent(Target);

const Events = {
  Pointer,
  Key,
  Drag,
  Drop,
  Click,
  Clipboard,
  Focus,
  Input,
  CustomEvent,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

class ZikoIntersectionObserver {
  constructor(UIElement, callback, {
    threshold = 0,
    margin = 0
  } = {}) {
    this.target = UIElement;
    this.config = {
      threshold,
      margin
    };
    this.observer = new IntersectionObserver(entries => {
      this.entrie = entries[0];
      callback(this);
    }, {
      threshold: this.threshold
    });
  }
  get ratio() {
    return this.entrie.intersectionRatio;
  }
  get isIntersecting() {
    return this.entrie.isIntersecting;
  }
  setThreshould(threshold) {
    this.config.threshold = threshold;
    return this;
  }
  setMargin(margin) {
    margin = typeof margin === "number" ? margin + "px" : margin;
    this.config.margin = margin;
    return this;
  }
  start() {
    this.observer.observe(this.target.element);
    return this;
  }
  stop() {
    return this;
  }
}
const WatchIntersection = (UI, callback, config) => new ZikoIntersectionObserver(UI, callback, config);

class ZikoResizeObserver {
  constructor(UIElement, callback) {
    this.target = UIElement;
    this.contentRect = null;
    this.observer = new ResizeObserver(() => {
      callback(this);
    });
  }
  get BoundingRect() {
    return this.target.element.getBoundingClientRect();
  }
  get width() {
    return this.BoundingRect.width;
  }
  get height() {
    return this.BoundingRect.height;
  }
  get top() {
    return this.BoundingRect.top;
  }
  get bottom() {
    return this.BoundingRect.bottom;
  }
  get right() {
    return this.BoundingRect.right;
  }
  get left() {
    return this.BoundingRect.left;
  }
  get x() {
    return this.BoundingRect.x;
  }
  get y() {
    return this.boundingRect.y;
  }
  start() {
    this.observer.observe(this.target.element);
    return this;
  }
  stop() {
    this.observer.unobserve(this.target.element);
    return this;
  }
}
const WatchSize = (UI, callback) => new ZikoResizeObserver(UI, callback);

class ZikoUseStyle {
  constructor(style, id = 0) {
    this.id = "Ziko-Style-" + id;
    this.use(style);
    this.keys = new Set();
    this.styles = {
      default: {
        fontSize: "1em"
      }
    };
  }
  get current() {
    return [...this.keys].reduce((key, value) => {
      key[value] = `var(--${value}-${this.id})`;
      return key;
    }, {});
  }
  add(name, style = {}) {
    if (name instanceof Object) Object.assign(this.styles, name);else Object.assign(this.styles, {
      [name]: style
    });
    return this;
  }
  #useStyleIndex(index) {
    const keys = Object.keys(this.styles);
    for (let a in this.styles[keys[index]]) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[keys[index]][a]);
      this.keys.add(a);
    }
    return this;
  }
  #useStyleName(name) {
    for (let a in this.styles[name]) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, this.styles[name][a]);
      this.keys.add(a);
    }
    return this;
  }
  #useStyleObject(Style) {
    for (let a in Style) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, Style[a]);
      this.keys.add(a);
    }
    return this;
  }
  use(style) {
    if (typeof style === "number") this.#useStyleIndex(style);
    if (typeof style === "string") this.#useStyleName(style);
    if (style instanceof Object) this.#useStyleObject(style);
    return this;
  }
}
const useStyle = id => style => new ZikoUseStyle(style, id);

const LightThemes = {
  cozyCottonCandy: {
    background: "#FCE4EC",
    currentLine: "#F8BBD0",
    selection: "#FFCDD2",
    foreground: "#673AB7",
    comment: "#9575CD",
    cyan: "#00BCD4",
    green: "#4CAF50",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  crystalClear: {
    background: "#F6F8FA",
    currentLine: "#E8F0F5",
    selection: "#D4E9F7",
    foreground: "#485766",
    comment: "#8492A6",
    cyan: "#00ACC1",
    green: "#8BC34A",
    orange: "#FFA726",
    pink: "#FF4081",
    purple: "#7E57C2",
    red: "#EF5350",
    yellow: "#FFD740"
  },
  lightdreamyDusk: {
    background: "#F5F5F5",
    currentLine: "#E8E8E8",
    selection: "#DADADA",
    foreground: "#555555",
    comment: "#999999",
    cyan: "#5FB3B3",
    green: "#68C386",
    orange: "#FFB67A",
    pink: "#FF94B0",
    purple: "#B78BC3",
    red: "#FF6666",
    yellow: "#FFD666"
  },
  luminousLavender: {
    background: "#F3E5F5",
    currentLine: "#E1BEE7",
    selection: "#CE93D8",
    foreground: "#311B92",
    comment: "#673AB7",
    cyan: "#00BCD4",
    green: "#8BC34A",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  meadowMornings: {
    background: "#F3E5F5",
    currentLine: "#E1BEE7",
    selection: "#CE93D8",
    foreground: "#311B92",
    comment: "#673AB7",
    cyan: "#00BCD4",
    green: "#8BC34A",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  moonlitMauve: {
    background: "#F3E5F5",
    currentLine: "#E1BEE7",
    selection: "#CE93D8",
    foreground: "#311B92",
    comment: "#673AB7",
    cyan: "#00BCD4",
    green: "#8BC34A",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  morningMist: {
    background: "#F6F6F6",
    currentLine: "#EAEAEA",
    selection: "#D8D8D8",
    foreground: "#333333",
    comment: "#808080",
    cyan: "#00A6A6",
    green: "#4CAF50",
    orange: "#FFA726",
    pink: "#FF4081",
    purple: "#9C27B0",
    red: "#FF5252",
    yellow: "#FFD740"
  },
  oceanBreeze: {
    background: "#ECF1F4",
    currentLine: "#DDE8ED",
    selection: "#BFD3C1",
    foreground: "#37474F",
    comment: "#607D8B",
    cyan: "#00BCD4",
    green: "#8BC34A",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#673AB7",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  pastelParadise: {
    background: "#F5F5F5",
    currentLine: "#E8E8E8",
    selection: "#DADADA",
    foreground: "#555555",
    comment: "#999999",
    cyan: "#5FB3B3",
    green: "#68C386",
    orange: "#FFB67A",
    pink: "#FF94B0",
    purple: "#B78BC3",
    red: "#FF6666",
    yellow: "#FFD666"
  },
  pastelPetals: {
    background: "#FCE4EC",
    currentLine: "#F8BBD0",
    selection: "#FFCDD2",
    foreground: "#673AB7",
    comment: "#9575CD",
    cyan: "#00BCD4",
    green: "#4CAF50",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  sereneSnowfall: {
    background: "#F9F9F9",
    currentLine: "#EDEDED",
    selection: "#D8D8D8",
    foreground: "#454545",
    comment: "#888888",
    cyan: "#5FA5A5",
    green: "#5BC47E",
    orange: "#FFBC8D",
    pink: "#FFA7BF",
    purple: "#B88AAE",
    red: "#FF7575",
    yellow: "#FFD98F"
  },
  softSherbet: {
    background: "#FDF8F3",
    currentLine: "#FAF1EB",
    selection: "#FFEBEE",
    foreground: "#6D4C41",
    comment: "#A1887F",
    cyan: "#00BCD4",
    green: "#689F38",
    orange: "#FFA000",
    pink: "#EC407A",
    purple: "#8E24AA",
    red: "#E53935",
    yellow: "#FFC107"
  },
  subtleSerenity: {
    background: "#F3F5F7",
    currentLine: "#E8EDF2",
    selection: "#D1D9E6",
    foreground: "#2C3E50",
    comment: "#95A5A6",
    cyan: "#3498DB",
    green: "#2ECC71",
    orange: "#F39C12",
    pink: "#E74C3C",
    purple: "#9B59B6",
    red: "#C0392B",
    yellow: "#F1C40F"
  },
  summerSunset: {
    background: "#FCE4EC",
    currentLine: "#F8BBD0",
    selection: "#FFCDD2",
    foreground: "#4E342E",
    comment: "#795548",
    cyan: "#009688",
    green: "#43A047",
    orange: "#FF5722",
    pink: "#E91E63",
    purple: "#9C27B0",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  sunnyDay: {
    background: "#FFF8E1",
    currentLine: "#FFF3E0",
    selection: "#FFE0B2",
    foreground: "#4E342E",
    comment: "#795548",
    cyan: "#00BCD4",
    green: "#8BC34A",
    orange: "#FF9800",
    pink: "#E91E63",
    purple: "#673AB7",
    red: "#F44336",
    yellow: "#FFEB3B"
  },
  tranquilTwilight: {
    background: "#F9F9F9",
    currentLine: "#EDEDED",
    selection: "#D8D8D8",
    foreground: "#454545",
    comment: "#888888",
    cyan: "#5FA5A5",
    green: "#5BC47E",
    orange: "#FFBC8D",
    pink: "#FFA7BF",
    purple: "#B88AAE",
    red: "#FF7575",
    yellow: "#FFD98F"
  },
  tranquilWaves: {
    background: "#F9F9F9",
    currentLine: "#E4E4E4",
    selection: "#D4D4D4",
    foreground: "#2C3E50",
    comment: "#7F8C8D",
    cyan: "#3498DB",
    green: "#2ECC71",
    orange: "#F39C12",
    pink: "#E74C3C",
    purple: "#9B59B6",
    red: "#C0392B",
    yellow: "#F1C40F"
  },
  whisperingWillow: {
    background: "#F6F8FA",
    currentLine: "#E8F0F5",
    selection: "#D4E9F7",
    foreground: "#485766",
    comment: "#8492A6",
    cyan: "#00ACC1",
    green: "#8BC34A",
    orange: "#FFA726",
    pink: "#FF4081",
    purple: "#7E57C2",
    red: "#EF5350",
    yellow: "#FFD740"
  }
};

const DarkThemes = {
  antiqueRose: {
    background: "#1C1014",
    currentLine: "#2B1B21",
    selection: "#443034",
    foreground: "#D8B5B5",
    comment: "#7F5E5E",
    cyan: "#6FA2A2",
    green: "#66A66F",
    orange: "#FFB97A",
    pink: "#FFA8BD",
    purple: "#B78DA5",
    red: "#FF6C6C",
    yellow: "#FFD579"
  },
  auroraBorealis: {
    background: "#1D1426",
    currentLine: "#2B1E35",
    selection: "#432D4E",
    foreground: "#C2AABF",
    comment: "#7F6E8E",
    cyan: "#7EA5D3",
    green: "#77C992",
    orange: "#FFC476",
    pink: "#FFA8B3",
    purple: "#AE9AC3",
    red: "#FF6C6C",
    yellow: "#FFD576"
  },
  autumnHarvest: {
    background: "#291C10",
    currentLine: "#3A2A1E",
    selection: "#573C2C",
    foreground: "#D4C3A2",
    comment: "#7F6F52",
    cyan: "#82B4BF",
    green: "#7FB074",
    orange: "#FFAB6E",
    pink: "#FF8196",
    purple: "#B394A9",
    red: "#FF6565",
    yellow: "#FFD270"
  },
  aylin: {
    background: "#13161E",
    currentLine: "#161A28",
    selection: "#222B3E",
    foreground: "#D2D8E0",
    comment: "#697098",
    cyan: "#78D1E1",
    green: "#98C379",
    orange: "#EBCB8B",
    pink: "#D16D9E",
    purple: "#C678DD",
    red: "#E88388",
    yellow: "#EBCB8B"
  },
  azureBlue: {
    background: "#001B29",
    currentLine: "#002C3E",
    selection: "#004E6B",
    foreground: "#C3D7E2",
    comment: "#5F7C92",
    cyan: "#75B7D1",
    green: "#70C8A7",
    orange: "#FFB476",
    pink: "#FF92B0",
    purple: "#B88BC3",
    red: "#FF6666",
    yellow: "#FFD666"
  },
  cobalt2: {
    background: "#193549",
    currentLine: "#1F4662",
    selection: "#193549",
    foreground: "#B9BED0",
    comment: "#627D98",
    cyan: "#4DB5BD",
    green: "#86B300",
    orange: "#FFB86C",
    pink: "#FF7F7B",
    purple: "#9B64FB",
    red: "#FF6672",
    yellow: "#FFCC99"
  },
  cobaltMaterialTheme: {
    background: "#263238",
    currentLine: "#37474F",
    selection: "#80CBC4",
    foreground: "#CFD8DC",
    comment: "#78909C",
    cyan: "#80CBC4",
    green: "#A5D6A7",
    orange: "#FFD54F",
    pink: "#FF80AB",
    purple: "#CE93D8",
    red: "#EF5350",
    yellow: "#FFEE58"
  },
  cosmicBlue: {
    background: "#1B2836",
    currentLine: "#223348",
    selection: "#39516D",
    foreground: "#C0D4E5",
    comment: "#728CAB",
    cyan: "#75A6FF",
    green: "#5ED99F",
    orange: "#FFAD6F",
    pink: "#FF90B6",
    purple: "#A889C5",
    red: "#FF6E6E",
    yellow: "#FCD256"
  },
  cosmicSunset: {
    background: "#1B1921",
    currentLine: "#272530",
    selection: "#3C3948",
    foreground: "#B8B4CB",
    comment: "#7A738B",
    cyan: "#77B4D8",
    green: "#6CC09E",
    orange: "#FFA677",
    pink: "#FF95B2",
    purple: "#B48FC1",
    red: "#FF6565",
    yellow: "#FFD566"
  },
  cyberForest: {
    background: "#0D151D",
    currentLine: "#18262F",
    selection: "#2B3B47",
    foreground: "#CDD7E0",
    comment: "#667B8B",
    cyan: "#7EC4CF",
    green: "#68CC96",
    orange: "#FFAC6C",
    pink: "#FF89B4",
    purple: "#A889C5",
    red: "#FF6565",
    yellow: "#FFCB6B"
  },
  cyberPunkCity: {
    background: "#000000",
    currentLine: "#121212",
    selection: "#1F1F1F",
    foreground: "#DADADA",
    comment: "#626262",
    cyan: "#71B7FF",
    green: "#50D890",
    orange: "#FFB86C",
    pink: "#FF79C6",
    purple: "#BB86FC",
    red: "#FF5454",
    yellow: "#FDD663"
  },
  cyberpunkNeon: {
    background: "#121212",
    currentLine: "#1B1B1B",
    selection: "#262626",
    foreground: "#DADADA",
    comment: "#6C6C6C",
    cyan: "#69AEDB",
    green: "#4ECCA3",
    orange: "#FFB86C",
    pink: "#FF79C6",
    purple: "#D08EFF",
    red: "#FF5454",
    yellow: "#FDD663"
  },
  darkDesert: {
    background: "#1E2022",
    currentLine: "#282A2E",
    selection: "#393D42",
    foreground: "#C0C5CE",
    comment: "#5C6368",
    cyan: "#6FB3E0",
    green: "#88C076",
    orange: "#FFB454",
    pink: "#FF7F90",
    purple: "#B48EAD",
    red: "#FF6666",
    yellow: "#FFCC66"
  },
  darkMint: {
    background: "#11161A",
    currentLine: "#1B2128",
    selection: "#3D4853",
    foreground: "#D9DEE5",
    comment: "#65737E",
    cyan: "#88C0D0",
    green: "#98C379",
    orange: "#FFB86C",
    pink: "#FF7F8B",
    purple: "#C594C5",
    red: "#FF6561",
    yellow: "#FAD07B"
  },
  deepOcean: {
    background: "#121C2C",
    currentLine: "#182236",
    selection: "#2B3E50",
    foreground: "#BDC3C7",
    comment: "#6C7A89",
    cyan: "#59ABE3",
    green: "#26A65B",
    orange: "#F9690E",
    pink: "#EB3B5A",
    purple: "#D2527F",
    red: "#E74C3C",
    yellow: "#F5AB35"
  },
  deepOceanBlue: {
    background: "#1B2F40",
    currentLine: "#263B53",
    selection: "#3A536E",
    foreground: "#BFC9D4",
    comment: "#657C8E",
    cyan: "#6CB5FF",
    green: "#65C287",
    orange: "#FFA974",
    pink: "#FF87B4",
    purple: "#AE9BFF",
    red: "#FF6666",
    yellow: "#FFD67B"
  },
  deepOceanSunset: {
    background: "#151D2A",
    currentLine: "#1D2735",
    selection: "#31405B",
    foreground: "#D5D9E0",
    comment: "#6C7B8B",
    cyan: "#6FAAD4",
    green: "#66C295",
    orange: "#FFA476",
    pink: "#FF94B0",
    purple: "#B08FC0",
    red: "#FF6565",
    yellow: "#FFD466"
  },
  deepSpace: {
    background: "#0F1419",
    currentLine: "#1A232D",
    selection: "#3A4758",
    foreground: "#CDD9E5",
    comment: "#657C96",
    cyan: "#6CB6FF",
    green: "#4CAF50",
    orange: "#FFB454",
    pink: "#FF75B5",
    purple: "#9A76FF",
    red: "#FF5555",
    yellow: "#FFC857"
  },
  dracula: {
    background: "#282a36",
    currentLine: "#44475a",
    selection: "#44475a",
    foreground: "#f8f8f2",
    comment: "#6272a4",
    cyan: "#8be9fd",
    green: "#50fa7b",
    orange: "#ffb86c",
    pink: "#ff79c6",
    purple: "#bd93f9",
    red: "#ff5555",
    yellow: "#f1fa8c"
  },
  dreamyDusk: {
    background: "#22243D",
    currentLine: "#313558",
    selection: "#4C4F6D",
    foreground: "#A5A7C5",
    comment: "#6F728E",
    cyan: "#81A2BE",
    green: "#7FB074",
    orange: "#FFB476",
    pink: "#FF91A4",
    purple: "#AE8DC2",
    red: "#FF7272",
    yellow: "#FFD67A"
  },
  electricLagoon: {
    background: "#15232B",
    currentLine: "#20323E",
    selection: "#344E5F",
    foreground: "#A6C0B9",
    comment: "#6C8F81",
    cyan: "#80C7D1",
    green: "#7FCD97",
    orange: "#FFBC76",
    pink: "#FF9FB3",
    purple: "#AE8FC3",
    red: "#FF7272",
    yellow: "#FFD674"
  },
  emeraldCity: {
    background: "#112E26",
    currentLine: "#1B3F38",
    selection: "#2F6253",
    foreground: "#A6C0B9",
    comment: "#6C8F81",
    cyan: "#80C7D1",
    green: "#7FCD97",
    orange: "#FFBC76",
    pink: "#FF9FB3",
    purple: "#AE8FC3",
    red: "#FF7272",
    yellow: "#FFD674"
  },
  enchantedEclipse: {
    background: "#131A22",
    currentLine: "#1F2C3A",
    selection: "#2D4455",
    foreground: "#A7B6C2",
    comment: "#6B7B8C",
    cyan: "#5FA8D3",
    green: "#5CB8A4",
    orange: "#FFA96C",
    pink: "#FF8FA2",
    purple: "#A88ED1",
    red: "#FF6B6B",
    yellow: "#FFD575"
  },
  enchantedEvening: {
    background: "#1E1824",
    currentLine: "#2A2332",
    selection: "#3F3A4F",
    foreground: "#C2B4CB",
    comment: "#7F7292",
    cyan: "#76AAD8",
    green: "#6CC095",
    orange: "#FFB36C",
    pink: "#FF8FB0",
    purple: "#AB8CC2",
    red: "#FF6464",
    yellow: "#FFD164"
  },
  fireAndIce: {
    background: "#1F2532",
    currentLine: "#292F3D",
    selection: "#4E556A",
    foreground: "#D8DEE9",
    comment: "#69758E",
    cyan: "#7EC4CF",
    green: "#68CC98",
    orange: "#FFA071",
    pink: "#FF88B5",
    purple: "#AE9BFF",
    red: "#FF657E",
    yellow: "#FDCB83"
  },
  forestGreen: {
    background: "#1A1E22",
    currentLine: "#24292F",
    selection: "#394147",
    foreground: "#C8C8C8",
    comment: "#5C6370",
    cyan: "#7AAB9D",
    green: "#88B379",
    orange: "#FFAC6F",
    pink: "#F97B77",
    purple: "#A187BE",
    red: "#FF5C5C",
    yellow: "#F5D76E"
  },
  futuristicBlue: {
    background: "#111B26",
    currentLine: "#1B2E3F",
    selection: "#334D65",
    foreground: "#C0D2E3",
    comment: "#6E859E",
    cyan: "#77AADB",
    green: "#78C196",
    orange: "#FFAC6C",
    pink: "#FF8DBE",
    purple: "#A48ADA",
    red: "#FF6666",
    yellow: "#FFD66D"
  },
  gentlePurple: {
    background: "#2E2E3D",
    currentLine: "#383849",
    selection: "#4D4D5C",
    foreground: "#B2B2CC",
    comment: "#6E6E8F",
    cyan: "#6D77CC",
    green: "#81C995",
    orange: "#FFB16A",
    pink: "#FF7CAC",
    purple: "#8A80A1",
    red: "#FF657A",
    yellow: "#FDB26E"
  },
  githubDarkDimmed: {
    background: "#0D1117",
    currentLine: "#161B22",
    selection: "#1F6F8B",
    foreground: "#8B949E",
    comment: "#8B949E",
    cyan: "#79C0FF",
    green: "#2DD57A",
    orange: "#FFB454",
    pink: "#FF80AB",
    purple: "#D781D3",
    red: "#EF5252",
    yellow: "#D29922"
  },
  gruvbox: {
    background: "#282828",
    currentLine: "#3c3836",
    selection: "#bdae93",
    foreground: "#ebdbb2",
    comment: "#928374",
    cyan: "#83a598",
    green: "#b8bb26",
    orange: "#fe8019",
    pink: "#d3869b",
    purple: "#d3869b",
    red: "#fb4934",
    yellow: "#fabd2f"
  },
  materialTheme: {
    background: "#263238",
    currentLine: "#37474f",
    selection: "#90a4ae",
    foreground: "#eceff1",
    comment: "#546e7a",
    cyan: "#80cbc4",
    green: "#a5d6a7",
    orange: "#ffb74d",
    pink: "#f06292",
    purple: "#ba68c8",
    red: "#ef5350",
    yellow: "#ffee58"
  },
  midnightMystique: {
    background: "#1E1E27",
    currentLine: "#292935",
    selection: "#3F3F4F",
    foreground: "#C2C2D3",
    comment: "#757593",
    cyan: "#76D4D6",
    green: "#6CC18F",
    orange: "#FFB36C",
    pink: "#FF8FAB",
    purple: "#AB8BC7",
    red: "#FF6464",
    yellow: "#FFD164"
  },
  midnightSunset: {
    background: "#182233",
    currentLine: "#1D2D46",
    selection: "#384B66",
    foreground: "#B7C0CE",
    comment: "#6A788A",
    cyan: "#6B98FF",
    green: "#6BD49D",
    orange: "#FFA178",
    pink: "#FF8DAB",
    purple: "#B48EAD",
    red: "#F96263",
    yellow: "#FADA5E"
  },
  minimalMonochrome: {
    background: "#1C1C1C",
    currentLine: "#262626",
    selection: "#363636",
    foreground: "#D9D9D9",
    comment: "#757575",
    cyan: "#7DC1C7",
    green: "#7FB074",
    orange: "#FFB869",
    pink: "#FF81A2",
    purple: "#B48EAD",
    red: "#FF6B6B",
    yellow: "#FFD57B"
  },
  modernMarine: {
    background: "#0A0E19",
    currentLine: "#121929",
    selection: "#1E2B42",
    foreground: "#D5D8DE",
    comment: "#7F8493",
    cyan: "#6FB1D3",
    green: "#6CC792",
    orange: "#FFB577",
    pink: "#FF96B0",
    purple: "#B690C2",
    red: "#FF6666",
    yellow: "#FFD666"
  },
  monokai: {
    background: "#272822",
    currentLine: "#3e3d32",
    selection: "#49483e",
    foreground: "#f8f8f2",
    comment: "#75715e",
    cyan: "#66d9ef",
    green: "#a6e22e",
    orange: "#fd971f",
    pink: "#f92672",
    purple: "#ae81ff",
    red: "#f92672",
    yellow: "#e6db74"
  },
  moonlitMeadow: {
    background: "#12252C",
    currentLine: "#1D3B47",
    selection: "#24566E",
    foreground: "#A7C4BC",
    comment: "#5E7D84",
    cyan: "#82B7BD",
    green: "#87C38A",
    orange: "#F4B66A",
    pink: "#F77A92",
    purple: "#C58AC9",
    red: "#F0725E",
    yellow: "#E8C284"
  },
  mysticalMauve: {
    background: "#1A1A26",
    currentLine: "#252533",
    selection: "#3E3E57",
    foreground: "#B2B2CC",
    comment: "#757593",
    cyan: "#76D4D6",
    green: "#6CC18F",
    orange: "#FFB36C",
    pink: "#FF8FAB",
    purple: "#AB8BC7",
    red: "#FF6464",
    yellow: "#FFD164"
  },
  nebulaNights: {
    background: "#1B1821",
    currentLine: "#262330",
    selection: "#3C3A48",
    foreground: "#B8B4CB",
    comment: "#7A738B",
    cyan: "#77B4D8",
    green: "#6CC09E",
    orange: "#FFA677",
    pink: "#FF95B2",
    purple: "#B48FC1",
    red: "#FF6565",
    yellow: "#FFD566"
  },
  neonLights: {
    background: "#000000",
    currentLine: "#0D0D0D",
    selection: "#1A1A1A",
    foreground: "#DADADA",
    comment: "#7F7F7F",
    cyan: "#6FE3E3",
    green: "#60FFA0",
    orange: "#FFB67A",
    pink: "#FF9FBD",
    purple: "#BF8CC2",
    red: "#FF6666",
    yellow: "#FFD666"
  },
  nightSky: {
    background: "#17202A",
    currentLine: "#1C2732",
    selection: "#2E4053",
    foreground: "#D0D3D4",
    comment: "#566573",
    cyan: "#5DADE2",
    green: "#45B39D",
    orange: "#F5B041",
    pink: "#EB984E",
    purple: "#AF7AC5",
    red: "#EC7063",
    yellow: "#F4D03F"
  },
  nord: {
    background: "#2e3440",
    currentLine: "#3b4252",
    selection: "#4c566a",
    foreground: "#d8dee9",
    comment: "#616e88",
    cyan: "#88c0d0",
    green: "#a3be8c",
    orange: "#ebcb8b",
    pink: "#bf616a",
    purple: "#b48ead",
    red: "#bf616a",
    yellow: "#ebcb8b"
  },
  nova: {
    background: "#1F262D",
    currentLine: "#232A32",
    selection: "#414B56",
    foreground: "#D9E2EC",
    comment: "#525F69",
    cyan: "#89DDFF",
    green: "#64D989",
    orange: "#E7C664",
    pink: "#E95678",
    purple: "#C594C5",
    red: "#FF5656",
    yellow: "#FFC172"
  },
  novaDark: {
    background: "#1A2026",
    currentLine: "#212930",
    selection: "#36424F",
    foreground: "#C0C6D9",
    comment: "#5B6C7F",
    cyan: "#84CEE4",
    green: "#89DD6D",
    orange: "#FFB46E",
    pink: "#FF7CAB",
    purple: "#BB80B3",
    red: "#FC6161",
    yellow: "#FAB795"
  },
  oceanBlue: {
    background: "#12232E",
    currentLine: "#1D3B53",
    selection: "#205072",
    foreground: "#A8DADC",
    comment: "#5E81AC",
    cyan: "#7FB2F0",
    green: "#88C0D0",
    orange: "#FFB86C",
    pink: "#FFA0A0",
    purple: "#D4A3D9",
    red: "#EF8E8E",
    yellow: "#FFD180"
  },
  oceanicAzure: {
    background: "#001A23",
    currentLine: "#002B36",
    selection: "#004056",
    foreground: "#C0C5CE",
    comment: "#4D5767",
    cyan: "#75A4C0",
    green: "#68A3A8",
    orange: "#FFA45E",
    pink: "#FF94B0",
    purple: "#B48EAD",
    red: "#FF6363",
    yellow: "#FFD464"
  },
  oceanicGruvbox: {
    background: "#1d2021",
    currentLine: "#282828",
    selection: "#458588",
    foreground: "#ebdbb2",
    comment: "#928374",
    cyan: "#89b482",
    green: "#a9b665",
    orange: "#d79921",
    pink: "#d3869b",
    purple: "#b16286",
    red: "#fb4934",
    yellow: "#d5c4a1"
  },
  oceanicNext: {
    background: "#1B2B34",
    currentLine: "#343D46",
    selection: "#4F5B66",
    foreground: "#A7ADBA",
    comment: "#616E7C",
    cyan: "#7FB5DA",
    green: "#98C379",
    orange: "#EBCB8B",
    pink: "#EC5f67",
    purple: "#C594C5",
    red: "#EC5f67",
    yellow: "#D29922"
  },
  oneDark: {
    background: "#282c34",
    currentLine: "#3e4451",
    selection: "#4f5b66",
    foreground: "#abb2bf",
    comment: "#5c6370",
    cyan: "#56b6c2",
    green: "#98c379",
    orange: "#d19a66",
    pink: "#c678dd",
    purple: "#c678dd",
    red: "#e06c75",
    yellow: "#e5c07b"
  },
  polarNight: {
    background: "#2E3440",
    currentLine: "#3B4252",
    selection: "#4C566A",
    foreground: "#D8DEE9",
    comment: "#616E88",
    cyan: "#81A1C1",
    green: "#A3BE8C",
    orange: "#EBCB8B",
    pink: "#BF616A",
    purple: "#B48EAD",
    red: "#BF616A",
    yellow: "#EBCB8B"
  },
  radiantRainforest: {
    background: "#16231A",
    currentLine: "#1F3927",
    selection: "#355D43",
    foreground: "#A7C9A2",
    comment: "#6F8D77",
    cyan: "#80C3BB",
    green: "#76CC8F",
    orange: "#FFB56C",
    pink: "#FF8FA6",
    purple: "#AB8CC2",
    red: "#FF6C6C",
    yellow: "#FFD576"
  },
  retroTech: {
    background: "#0C0C0C",
    currentLine: "#141414",
    selection: "#1F1F1F",
    foreground: "#D9D9D9",
    comment: "#626262",
    cyan: "#77BFC9",
    green: "#69CC6D",
    orange: "#FFC46D",
    pink: "#FF7D99",
    purple: "#BB86FC",
    red: "#FF5555",
    yellow: "#FACD60"
  },
  royalPurple: {
    background: "#1E1B2E",
    currentLine: "#272337",
    selection: "#3E395B",
    foreground: "#D5D1E2",
    comment: "#76708E",
    cyan: "#76D7C4",
    green: "#47B87C",
    orange: "#FFC300",
    pink: "#F39C9D",
    purple: "#9B59B6",
    red: "#E74C3C",
    yellow: "#F1C40F"
  },
  sapphireSkies: {
    background: "#081125",
    currentLine: "#0F1F3A",
    selection: "#1E3874",
    foreground: "#D8DCE6",
    comment: "#6B7394",
    cyan: "#7EC4D9",
    green: "#7DCB9E",
    orange: "#FFB578",
    pink: "#FF8FB3",
    purple: "#B992CC",
    red: "#FF6767",
    yellow: "#FFD684"
  },
  shadesOfPurple: {
    background: "#2d2b55",
    currentLine: "#37355a",
    selection: "#444267",
    foreground: "#ecebf0",
    comment: "#9a99a3",
    cyan: "#a1efe4",
    green: "#72f1b8",
    orange: "#f78c6c",
    pink: "#ffcc99",
    purple: "#9a99a3",
    red: "#ff6188",
    yellow: "#ffcc99"
  },
  solarizedDark: {
    background: "#002b36",
    currentLine: "#073642",
    selection: "#586e75",
    foreground: "#839496",
    comment: "#586e75",
    cyan: "#2aa198",
    green: "#859900",
    orange: "#cb4b16",
    pink: "#d33682",
    purple: "#6c71c4",
    red: "#dc322f",
    yellow: "#b58900"
  },
  synthWave84: {
    background: "#2b213a",
    currentLine: "#3e3650",
    selection: "#564d7a",
    foreground: "#e0def4",
    comment: "#9c8c98",
    cyan: "#95e6cb",
    green: "#00ffb9",
    orange: "#f28779",
    pink: "#f771ac",
    purple: "#d3bfff",
    red: "#ff6188",
    yellow: "#ffd866"
  },
  tokyoNight: {
    background: "#1a1b26",
    currentLine: "#282a36",
    selection: "#44475a",
    foreground: "#eff0eb",
    comment: "#6b6e76",
    cyan: "#78d1e1",
    green: "#67b11d",
    orange: "#e1a80e",
    pink: "#ff79c6",
    purple: "#d27bff",
    red: "#ff5555",
    yellow: "#f3f99d"
  },
  tomorrowNight: {
    background: "#1d1f21",
    currentLine: "#282a36",
    selection: "#373b41",
    foreground: "#c5c8c6",
    comment: "#616e7c",
    cyan: "#81a2be",
    green: "#b5bd68",
    orange: "#de935f",
    pink: "#cc6666",
    purple: "#b294bb",
    red: "#cc6666",
    yellow: "#f0c674"
  },
  twilightMeadow: {
    background: "#14202A",
    currentLine: "#1F2E3F",
    selection: "#334D65",
    foreground: "#A6C0B9",
    comment: "#6C8F81",
    cyan: "#80C7D1",
    green: "#7FCD97",
    orange: "#FFBC76",
    pink: "#FF9FB3",
    purple: "#AE8FC3",
    red: "#FF7272",
    yellow: "#FFD674"
  },
  urbanTwilight: {
    background: "#161727",
    currentLine: "#1F2737",
    selection: "#35415B",
    foreground: "#BDC9D7",
    comment: "#7F8C9C",
    cyan: "#77AED8",
    green: "#6CC492",
    orange: "#FFB677",
    pink: "#FF95B1",
    purple: "#B48DC2",
    red: "#FF6C6C",
    yellow: "#FFD576"
  },
  vibrantInk: {
    background: "#1C1E26",
    currentLine: "#242730",
    selection: "#363B4A",
    foreground: "#BFC7D5",
    comment: "#5C6672",
    cyan: "#6A76FB",
    green: "#33CC95",
    orange: "#FF9A65",
    pink: "#FF75B5",
    purple: "#AE81FF",
    red: "#FF6188",
    yellow: "#FDD269"
  },
  vintageRust: {
    background: "#301F1A",
    currentLine: "#3E2A23",
    selection: "#5D3E35",
    foreground: "#D7C3A7",
    comment: "#7F6C55",
    cyan: "#83A4C4",
    green: "#7EAD90",
    orange: "#FFA45E",
    pink: "#FF8C9E",
    purple: "#B491A9",
    red: "#FF7262",
    yellow: "#FFD372"
  }
};

const Themes = {
  ...LightThemes,
  ...DarkThemes
};

class ZikoUseTheme {
  constructor(theme, id = 0) {
    this.id = "Ziko-Theme-" + id;
    this.use(theme);
  }
  get current() {
    const colorNames = ['background', 'currentLine', 'selection', 'foreground', 'comment', 'cyan', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'];
    return colorNames.reduce((theme, color) => {
      theme[color] = `var(--${color}-${this.id})`;
      return theme;
    }, {});
  }
  useThemeIndex(index) {
    const keys = Object.keys(Themes);
    for (let a in Themes[keys[index]]) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes[keys[index]][a]);
    }
    return this;
  }
  useThemeName(str) {
    str = str.toLowerCase();
    const Themes_With_Lower_Case = Object.fromEntries(Object.entries(Themes).map(n => [n[0].toLowerCase(), n[1]]));
    for (let a in Themes_With_Lower_Case[str]) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, Themes_With_Lower_Case[str][a]);
    }
    return this;
  }
  useThemeObject(Theme) {
    for (let a in Theme) {
      document.documentElement.style.setProperty(`--${a}-${this.id}`, Theme[a]);
    }
    return this;
  }
  use(theme) {
    if (typeof theme === "number") this.useThemeIndex(theme);
    if (typeof theme === "string") this.useThemeName(theme);
    if (theme instanceof Object) this.useThemeObject(theme);
    return this;
  }
}
const useTheme = (id = 0) => (theme = 0) => new ZikoUseTheme(theme, id);

class ZikoUseEventEmitter {
  constructor() {
    this.events = {};
    this.maxListeners = 10;
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    if (this.events[event].length > this.maxListeners) {
      console.warn(`Warning: Possible memory leak. Event '${event}' has more than ${this.maxListeners} listeners.`);
    }
  }
  once(event, listener) {
    const onceListener = data => {
      this.off(event, onceListener); // Remove the listener after it's been called
      listener(data);
    };
    this.on(event, onceListener);
  }
  off(event, listener) {
    const listeners = this.events[event];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }
  emit(event, data) {
    const listeners = this.events[event];
    if (listeners) {
      listeners.forEach(listener => {
        listener(data);
      });
    }
  }
  clear(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
  setMaxListener(event, max) {
    this.maxListeners = max;
  }
  removeAllListeners(event) {
    if (event) {
      this.events[event] = [];
    } else {
      this.events = {};
    }
  }
}
const useEventEmitter = () => new ZikoUseEventEmitter();

class ZikoUseTitle {
  constructor(title = document.title, useEventEmitter = true) {
    this.cache = {
      Emitter: null
    };
    if (useEventEmitter) this.useEventEmitter();
    this.set(title);
  }
  useEventEmitter() {
    this.cache.Emitter = useEventEmitter();
    return this;
  }
  set(title) {
    if (title !== document.title) {
      document.title = title;
      if (this.cache.Emitter) this.cache.Emitter.emit("ziko:title-changed");
    }
    return this;
  }
  get current() {
    return document.title;
  }
  onChange(callback) {
    if (this.cache.Emitter) this.cache.Emitter.on("ziko:title-changed", callback);
    return this;
  }
}
const useTitle = (title, useEventEmitter) => new ZikoUseTitle(title, useEventEmitter);

class ZikoUseFavIcon {
  constructor(FavIcon, useEventEmitter = true) {
    this.#init();
    this.cache = {
      Emitter: null
    };
    if (useEventEmitter) this.useEventEmitter();
    this.set(FavIcon);
  }
  #init() {
    this.__FavIcon__ = document.querySelector("link[rel*='icon']") || document.createElement('link');
    this.__FavIcon__.type = 'image/x-icon';
    this.__FavIcon__.rel = 'shortcut icon';
    return this;
  }
  set(href) {
    if (href !== this.__FavIcon__.href) {
      this.__FavIcon__.href = href;
      if (this.cache.Emitter) this.cache.Emitter.emit("ziko:favicon-changed");
    }
    return this;
  }
  get current() {
    return document.__FavIcon__.href;
  }
  onChange(callback) {
    if (this.cache.Emitter) this.cache.Emitter.on("ziko:favicon-changed", callback);
    return this;
  }
  useEventEmitter() {
    this.cache.Emitter = useEventEmitter();
    return this;
  }
}
const useFavIcon = (FavIcon, useEventEmitter) => new ZikoUseFavIcon(FavIcon, useEventEmitter);

class ZikoUseChannel {
  constructor(name = "") {
    this.channel = new BroadcastChannel(name);
    this.EVENTS_DATAS_PAIRS = new Map();
    this.EVENTS_HANDLERS_PAIRS = new Map();
    this.LAST_RECEIVED_EVENT = "";
    this.UUID = "ziko-channel" + Random.string(10);
    this.SUBSCRIBERS = new Set([this.UUID]);
  }
  get broadcast() {
    // update receiver
    return this;
  }
  emit(event, data) {
    this.EVENTS_DATAS_PAIRS.set(event, data);
    this.#maintainEmit(event);
    return this;
  }
  on(event, handler = console.log) {
    this.EVENTS_HANDLERS_PAIRS.set(event, handler);
    this.#maintainOn();
    return this;
  }
  #maintainOn() {
    this.channel.onmessage = e => {
      this.LAST_RECEIVED_EVENT = e.data.last_sended_event;
      const USER_ID = e.data.userId;
      this.SUBSCRIBERS.add(USER_ID);
      const Data = e.data.EVENTS_DATAS_PAIRS.get(this.LAST_RECEIVED_EVENT);
      const Handler = this.EVENTS_HANDLERS_PAIRS.get(this.LAST_RECEIVED_EVENT);
      if (Data && Handler) Handler(Data);
    };
    return this;
  }
  #maintainEmit(event) {
    this.channel.postMessage({
      EVENTS_DATAS_PAIRS: this.EVENTS_DATAS_PAIRS,
      last_sended_event: event,
      userId: this.UUID
    });
    return this;
  }
  close() {
    this.channel.close();
    return this;
  }
}
const useChannel = name => new ZikoUseChannel(name);

class ZikoUseThreed {
  #workerContent;
  constructor() {
    this.#workerContent = function (msg) {
      try {
        const func = new Function("return " + msg.data.fun)();
        let result = func();
        postMessage({
          result
        });
      } catch (error) {
        postMessage({
          error: error.message
        });
      } finally {
        if (msg.data.close) self.close();
      }
    }.toString();
    this.blob = new Blob(["this.onmessage = " + this.#workerContent], {
      type: "text/javascript"
    });
    this.worker = new Worker(window.URL.createObjectURL(this.blob));
  }
  call(func, callback, close = true) {
    this.worker.postMessage({
      fun: func.toString(),
      close
    });
    this.worker.onmessage = function (e) {
      if (e.data.error) {
        console.error(e.data.error);
      } else {
        callback(e.data.result);
      }
    };
    return this;
  }
}
const useThread = (func, callback, close) => {
  const T = new ZikoUseThreed();
  if (func) {
    T.call(func, callback, close);
  }
  return T;
};

class ZikoUseBluetooth {
  constructor(options = {
    acceptAllDevices: true
  }) {
    this.options = options;
    this.__Emitter__ = useEventEmitter();
    if (this.isSupported) this.#init();
  }
  async #init() {
    this.promise = navigator.bluetooth.requestDevice(this.options).then(device => this.device = device);
  }
  get isSupported() {
    return !!navigator.bluetooth;
  }
  get current() {
    // Synchrouns Code
    return this.device;
  }
  connect() {
    this.server = this.device.gatt.connect();
    this.__Emitter__.emit("ziko:bluetooth-connected");
    return this;
  }
  disconnect() {
    this.device.gatt.disconnect();
    this.__Emitter__.emit("ziko:bluetooth-disconnected");
    return this;
  }
  onConnect(callback) {
    this.__Emitter__.on("ziko:bluetooth-connected", callback);
    return this;
  }
  onDisconnect(callback) {
    this.__Emitter__.on("ziko:bluetooth-disconnected", callback);
    return this;
  }
  dispose() {}
  async battery(callback) {
    const batteryService = await this.server.getPrimaryService("battery_service");
    const batteryLevelCharacteristic = await batteryService.getCharacteristic("battery_level");
    const batteryLevel = await batteryLevelCharacteristic.readValue();
    const batteryPercent = await batteryLevel.getUint8(0);
    callback(batteryPercent);
  }
}
const useBluetooth = options => new ZikoUseBluetooth(options);

class ZikoUseBattery {
  constructor() {
    if (this.isSupported) this.#init();
  }
  async #init() {
    this.__Battery__ = await navigator.getBattery();
  }
  get isSupported() {
    return !!navigator.getBattery;
  }
  get current() {
    // Synchrouns Code
    const {
      level,
      charging,
      chargingTime,
      dischargingTime
    } = this.__Battery__;
    return {
      level,
      charging,
      chargingTime,
      dischargingTime
    };
  }
  onChargingChange(callback) {
    this.__Battery__.addEventListener("chargingchange", callback);
    return this;
  }
  onLevelChange(callback) {
    this.__Battery__.addEventListener("levelchange", callback);
    return this;
  }
}
const useBattery = () => new ZikoUseBattery();

class ZikoUseGeolocation {
  constructor() {
    if (this.isSupported) this.#init();
  }
  async #init() {
    navigator.geolocation.getCurrentPosition(e => this.__Geolocation__ = e);
  }
  get isSupported() {
    return !!navigator.geolocation;
  }
  get current() {
    // Synchrouns Code
    return this.__Geolocation__;
  }
}
const useGeolocation = () => new ZikoUseGeolocation();

const State = {
  useStyle,
  useTheme,
  useBattery,
  useGeolocation,
  useEventEmitter,
  useChannel,
  useThread,
  useBluetooth,
  useTitle,
  useFavIcon,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

class ZikoUIElement {
  constructor(element, name = "") {
    this.target = globalThis.document.body;
    if (typeof element === "string") element = globalThis.document.createElement(element);
    this.element = element;
    this.uuid = this.constructor.name + "-" + Random.string(10);
    this.cache = {
      name,
      isRoot: false,
      isHidden: false,
      isFrozzen: false,
      transformMatrix: matrix([[0, 0, 0], [0, 0, 0], [1, 1, 0]]),
      style: ZikoStyle({}),
      attributes: {},
      filters: {}
    };
    this.items = [];
    this.events = {
      ptr: null,
      key: null,
      drag: null,
      drop: null,
      click: null,
      clipboard: null,
      focus: null,
      custom: null
    };
    this.observer = {
      resize: null,
      intersection: null
    };
    this.cache.style.linkTo(this);
    this.style({
      position: "relative",
      boxSizing: "border-box",
      fontFamily: "verdana",
      margin: 0,
      padding: 0
    });
    this.size("auto", "auto");
    __UI__[this.cache.name].push(this);
  }
  get st() {
    return this.cache.style;
  }
  get attr() {
    return this.cache.attributes;
  }
  get evt() {
    return this.cache.events;
  }
  get __app__() {
    if (this.cache.isRoot) return this;
    let root = this.parent;
    while (1) {
      if (!root) return null;
      if (root.cache.isRoot) return root;
      root = root.parent;
    }
  }
  clone() {
    // Not working For Table 
    const UI = new this.constructor();
    UI.__proto__ = this.__proto__;
    if (this.items.length) {
      const items = [...this.items].map(n => n.clone());
      UI.append(...items);
    } else UI.element = this.element.cloneNode(true);
    return UI;
  }
  style(styles, {
    target = "parent",
    maskVector = null
  } = {}) {
    this.st.style(styles, {
      target,
      maskVector
    });
    return this;
  }
  size(width, height, {
    target,
    maskVector
  } = {}) {
    this.st.size(width, height, {
      target,
      maskVector
    });
    return this;
  }
  get Width() {
    return this.element.getBoundingClientRect().width;
  }
  get Height() {
    return this.element.getBoundingClientRect().height;
  }
  get Top() {
    return this.element.getBoundingClientRect().top;
  }
  get Right() {
    return this.element.getBoundingClientRect().right;
  }
  get Bottom() {
    return this.element.getBoundingClientRect().bottom;
  }
  get Left() {
    return this.element.getBoundingClientRect().left;
  }
  freeze(freeze) {
    this.cache.isFrozzen = freeze;
    return this;
  }
  at(index) {
    return this.items.at(index);
  }
  maintain() {
    for (let i = 0; i < this.items.length; i++) Object.assign(this, {
      [[i]]: this.items[i]
    });
    this.length = this.items.length;
    return this;
  }
  setTarget(tg) {
    if (tg instanceof ZikoUIElement) tg = tg.element;
    this.remove();
    this.target = tg;
    this.render();
    return this;
  }
  render(render = true, target = this.target) {
    if (target instanceof ZikoUIElement) target = target.element;
    this.target = target;
    if (render) {
      this.target.appendChild(this.element);
    } else this.remove();
    return this;
  }
  append(...ele) {
    if (this.cache.isFrozzen) {
      console.warn("You can't append new item to frozzen element");
      return this;
    }
    for (let i = 0; i < ele.length; i++) {
      if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
      if (ele[i] instanceof ZikoUIElement) {
        ele[i].parent = this;
        this.element.appendChild(ele[i].element);
        ele[i].Target = this.element;
        this.items.push(ele[i]);
      } else if (ele[i] instanceof Object) {
        if (ele[i]?.style) this.style(ele[i]?.style);
        if (ele[i]?.attr) {
          Object.entries(ele[i].attr).forEach(n => this.setAttr("" + n[0], n[1]));
        }
      }
    }
    this.maintain();
    return this;
  }
  remove(...ele) {
    if (ele.length == 0) {
      if (this.target.children.length && [...this.target.children].includes(this.element)) this.target.removeChild(this.element);
    } else {
      const remove = ele => {
        if (typeof ele === "number") ele = this.items[ele];
        if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);
        this.items = this.items.filter(n => n !== ele);
      };
      for (let i = 0; i < ele.length; i++) remove(ele[i]);
      for (let i = 0; i < this.items.length; i++) Object.assign(this, {
        [[i]]: this.items[i]
      });
    }
    return this;
  }
  removeAfter(t = 1) {
    setTimeout(() => this.remove(), t);
    return this;
  }
  removeItem(...ele) {
    const remove = ele => {
      if (ele instanceof ZikoUIElement) this.element.removeChild(ele.element);else if (typeof ele === "number") this.element.removeChild(this.element.children[ele]);
    };
    for (let i = 0; i < ele.length; i++) remove(ele[i]);
    for (let i = 0; i < this.items.length; i++) Object.assign(this, {
      [[i]]: this.items[i]
    });
    return this;
  }
  insertAt(index, ...ele) {
    if (index >= this.element.children.length) this.append(...ele);else for (let i = 0; i < ele.length; i++) {
      if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
      this.element.insertBefore(ele[i].element, this.items[index].element);
      this.items.splice(index, 0, ele[i]);
    }
    return this;
  }
  // Attributes
  setAttr(name, value) {
    this.element.setAttribute(name, value);
    Object.assign(this.cache.attributes, Object.fromEntries([[name, value]]));
    return this;
  }
  removeAttr(name) {
    this.element.removeAttribute(name);
    return this;
  }
  setContentEditable(bool = true) {
    this.setAttr("contenteditable", bool);
    return this;
  }
  get children() {
    return [...this.element.children];
  }
  get cloneElement() {
    return this.element.cloneNode(true);
  }
  // get styleObject() {
  //   //let borderPlus
  //   return Object.fromEntries(
  //     Object.entries(this.element.style).filter(
  //       (n) => n[1] != "" && n[1] !== "initial" && isNaN(+n[0]),
  //     ),
  //   );
  // }
  setClasses(...value) {
    this.setAttr("class", value.join(" "));
    return this;
  }
  get Classes() {
    const classes = this.element.getAttribute("class");
    return classes === null ? [] : classes.split(" ");
  }
  addClass() {
    /*this.setAttr("class", value);
        return this;*/
  }
  setId(Id) {
    this.element.setAttribute("id", Id);
    return this;
  }
  get Id() {
    return this.element.getAttribute("id");
  }
  useTheme(theme) {
    //thme
  }
  forEach(callback) {
    this.items.forEach(callback);
    return this;
  }
  filter(condition_callback, if_callback, else_callback) {
    this.items.filter(condition_callback).forEach(if_callback);
    return this;
  }
  filterByTextContent(text, exactMatch = false) {
    this.items.map(n => n.render());
    this.items.filter(n => {
      const content = n.element.textContent;
      return !(exactMatch ? content === text : content.includes(text));
    }).map(n => n.render(false));
    return this;
  }
  filterByClass(value) {
    this.items.map(n => n.render());
    this.items.filter(n => !n.Classes.includes(value)).map(n => n.render(false));
    return this;
  }
  sortByTextContent(value, displays) {
    let item = this.children;
    item.filter(n => !n.textContent.toLowerCase().includes(value.toLowerCase())).map(n => {
      n.style.display = "none";
    });
    item.filter(n => n.textContent.toLowerCase().includes(value.toLowerCase())).map((n, i) => n.style.display = displays[i]);
    //return item.filter(n=>n.style.display!="none")
    item.filter(n => n.style.display != "none");
    return this;
  }
  onPtrMove(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onMove(...callbacks);
    return this;
  }
  onPtrDown(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onDown(...callbacks);
    return this;
  }
  onPtrUp(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onUp(...callbacks);
    return this;
  }
  onPtrEnter(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onEnter(...callbacks);
    return this;
  }
  onPtrLeave(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onLeave(...callbacks);
    return this;
  }
  onPtrOut(...callbacks) {
    if (!this.events.ptr) this.events.ptr = Pointer(this);
    this.events.ptr.onOut(...callbacks);
    return this;
  }
  onKeyDown(...callbacks) {
    if (!this.events.key) this.events.key = Key(this);
    this.events.key.onDown(...callbacks);
    return this;
  }
  onKeyPress(...callbacks) {
    if (!this.events.key) this.events.key = Key(this);
    this.events.key.onPress(...callbacks);
    return this;
  }
  onKeyUp(...callbacks) {
    if (!this.events.key) this.events.key = Key(this);
    this.events.key.onUp(...callbacks);
    return this;
  }
  onKeysDown({
    keys = [],
    callback
  } = {}) {
    if (!this.events.key) this.events.key = Key(this);
    this.events.key.handleSuccessifKeys({
      keys,
      callback
    });
    return this;
  }
  onDragStart(...callbacks) {
    if (!this.events.drag) this.events.drag = Drag(this);
    this.events.drag.onStart(...callbacks);
    return this;
  }
  onDrag(...callbacks) {
    if (!this.events.drag) this.events.drag = Drag(this);
    this.events.drag.onDrag(...callbacks);
    return this;
  }
  onDragEnd(...callbacks) {
    if (!this.events.drag) this.events.drag = Drag(this);
    this.events.drag.onEnd(...callbacks);
    return this;
  }
  onDrop(...callbacks) {
    if (!this.events.drop) this.events.drop = Drop(this);
    this.events.drop.onDrop(...callbacks);
    return this;
  }
  onClick(...callbacks) {
    if (!this.events.click) this.events.click = Click(this);
    this.events.click.onClick(...callbacks);
    return this;
  }
  onDbClick(...callbacks) {
    if (!this.events.click) this.events.click = Click(this);
    this.events.click.onDbClick(...callbacks);
    return this;
  }
  onCopy(...callbacks) {
    if (!this.events.clipboard) this.events.clipboard = Clipboard(this);
    this.events.clipboard.onCopy(...callbacks);
    return this;
  }
  onCut(...callbacks) {
    if (!this.events.clipboard) this.events.clipboard = Clipboard(this);
    this.events.clipboard.onCut(...callbacks);
    return this;
  }
  onPaste(...callbacks) {
    if (!this.events.clipboard) this.events.clipboard = Clipboard(this);
    this.events.clipboard.onPaste(...callbacks);
    return this;
  }
  onSelect(...callbacks) {
    if (!this.events.clipboard) this.events.clipboard = Clipboard(this);
    this.events.clipboard.onSelect(...callbacks);
    return this;
  }
  onFocus(...callbacks) {
    if (!this.events.focus) this.events.focus = Focus(this);
    this.events.focus.onFocus(...callbacks);
    return this;
  }
  onBlur(...callbacks) {
    if (!this.events.focus) this.events.focus = Focus(this);
    this.events.focus.onFocus(...callbacks);
    return this;
  }
  on(event_name, ...callbacks) {
    if (!this.events.custom) this.events.custom = CustomEvent(this);
    this.events.custom.on(event_name, ...callbacks);
    return this;
  }
  emit(event_name, detail = {}) {
    if (!this.events.custom) this.events.custom = CustomEvent(this);
    this.events.custom.emit(event_name, detail);
    return this;
  }
  WatchAttributes() {}
  WatchChildren() {}
  WatchSize(callback) {
    if (!this.observer.resize) this.observer.resize = WatchSize(this, callback);
    this.observer.resize.start();
    return this;
  }
  WatchIntersection(callback, config) {
    if (!this.observer.intersection) this.observer.intersection = WatchIntersection(this, callback, config);
    this.observer.intersection.start();
    return this;
  }
  get VisibleArea() {
    let coords = this.element.getBoundingClientRect();
    let windowHeight = globalThis.document.documentElement.clientHeight;
    let windowWidth = globalThis.document.documentElement.clientWidth;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    let leftVisible = coords.left > 0 && coords.left < windowWidth;
    let rightVisible = coords.right > 0 && coords.right < windowWidth;
    return {
      top: topVisible,
      bottom: bottomVisible,
      left: leftVisible,
      right: rightVisible,
      heightRatio: (coords.height + coords.y) / coords.height,
      isVisible: topVisible || bottomVisible || rightVisible || leftVisible
    };
  }

  // toggleSlide() {}

  // resize(n = 0) {
  //   switch (n) {
  //     case 0:
  //       this.style({ resize: "none" });
  //       break;
  //     case 1:
  //       this.style({ resize: "horizontal" });
  //       break;
  //     case 2:
  //       this.style({ resize: "vertical" });
  //       break;
  //     case 3:
  //       this.style({ resize: "both" });
  //       break;
  //     default:
  //       this.style({ resize: n });
  //   }
  //   return this;
  // }
  // Glassmorphism(background = "rgba(255,255,255,0.1)", blur = "1px") {
  //   this.style({ background: background, backdropFilter: blur });
  //   return this;
  // }
  // Neumorphism(r = "50px", bg = "cyan", box = "13px -13px 49px #5d8fac") {
  //   this.style({ borderRadius: r, background: bg, boxShadow: box });
  //   return this;
  // }

  setFullScreen(set = true, e) {
    if (!this.element.requestFullscreen) {
      console.error("Fullscreen API is not supported in this browser.");
      return this;
    }
    if (set) this.element.requestFullscreen(e);else globalThis.document.exitFullscreen();
    return this;
  }
  toggleFullScreen(e) {
    if (!globalThis.document.fullscreenElement) this.element.requestFullscreen(e);else globalThis.document.exitFullscreen();
    return this;
  }
  // resizeObserver(calback) {
  //   var observer = new ResizeObserver((element) => calback(element));
  //   return observer.observe(this.element);
  // }
  // intersectionObserver(calback, target = "parent") {
  //   if (target == "parent") {
  //     var observer = new IntersectionObserver((element) => calback(element[0]));
  //     return observer.observe(this.element);
  //   }
  //   return this.items.map((n) => n.intersectionObserver((e) => calback(e)));
  // }
  // intersectRatio(calback) {
  //   var observer = new IntersectionObserver((element) =>
  //     calback(element[0].intersectionRatio),
  //   );
  //   return observer.observe(this.element);
  // }
  // get coords() {
  //   var rect = this.element.getBoundingClientRect();
  //   var parent = {
  //     cX: Math.floor(rect.left + (rect.right - rect.left) / 2),
  //     cY: Math.floor(rect.top + (rect.bottom - rect.top) / 2),
  //   };
  //   return { parent };
  // }
  // exportHTML() {}
  // toPdf() {
  //   return "Install @ziko/jspdf";
  // }
}

class ZikoUIText extends ZikoUIElement {
  constructor(...value) {
    super("span", "text");
    this.element = document.createElement("span");
    this.text = "";
    this.addValue(...value);
    this.st.display("inline-block");
    this.render();
  }
  clear() {
    this.element.textContent = "";
    return this;
  }
  get value() {
    return this.element.textContent;
  }
  setValue(value = "", add = false) {
    if (["string", "number"].includes(typeof value)) {
      this.text = "" + value;
      if (this.text.includes("\n")) this.text = this.text.split("\n").map(n => "<span>".concat(n, "</span></br>")).join("");
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
    //else console.error("not supported yet")
    if (add) this.element.innerHTML += this.text;else this.element.innerHTML = this.text;
    if (value instanceof Array || value instanceof Set) {
      if (value instanceof Set) value = [...value];
      this.addValue(...value);
    }
  }
  addValue(...value) {
    value.map(n => {
      this.setValue(" ", true);
      this.setValue(n, true);
    });
    return this;
  }
  toggleValues(...values) {
    values = values.map(n => "" + n);
    let index = values.indexOf("" + this.value);
    if (index != -1 && index != values.length - 1) this.setValue(values[index + 1]);else this.setValue(values[0]);
    return this;
  }
}
const text = (...value) => new ZikoUIText(...value);

class ZikoUIParagraphe extends ZikoUIElement {
  constructor(...value) {
    super("p", "p");
    this.addValue(...value);
    this.style({
      margin: 0,
      padding: 0
    });
    this.render();
  }
  addValue(...value) {
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] == "string" || typeof value[i] == "number") {
        this.element.appendChild(document.createTextNode(value[i]));
        this.element.appendChild(document.createElement("br"));
      } else if (value[i] instanceof ZikoUIElement) this.element.appendChild(value[i].element);else if (value[i] instanceof Complex) text(value.a + " + " + value.b + "i");
    }
    return this;
  }
  clear() {
    this.element.childNodes.forEach(e => e.remove());
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
    super(`h${type}`, `h${type}`);
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
const h1 = (text = "") => new ZikoUIHeading(1, text);
const h2 = (text = "") => new ZikoUIHeading(2, text);
const h3 = (text = "") => new ZikoUIHeading(3, text);
const h4 = (text = "") => new ZikoUIHeading(4, text);
const h5 = (text = "") => new ZikoUIHeading(5, text);
const h6 = (text = "") => new ZikoUIHeading(6, text);

class ZikoUIHtmlTag extends ZikoUIElement {
  constructor(element) {
    super(element);
    this.render();
  }
}
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
class ZikoUILink extends ZikoUIElement {
  constructor(href) {
    super();
    this.element = document.createElement("a");
    this.setHref(href);
    this.render();
  }
  setHref(href) {
    this.element.href = href;
  }
}
const br = () => new ZikoUIBr();
const hr = () => new ZikoUIHr();
const brs = (n = 1) => new Array(n).fill(new ZikoUIBr());
const hrs = (n = 1) => new Array(n).fill(new ZikoUIHr());
const link = (href, ...UIElement) => new ZikoUILink(href).append(...UIElement);
const ZikoHtml = (tag, ...UIElement) => new ZikoUIHtmlTag(tag).append(...UIElement);

class ZikoUILI extends ZikoUIElement {
  constructor(UI) {
    super();
    this.element = document.createElement("li");
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
  append(...arr) {
    for (let i = 0; i < arr.length; i++) {
      let li = null;
      if (["string", "number"].includes(typeof arr[i])) arr[i] = text(arr[i]);
      if (arr[i] instanceof ZikoUIElement) li = new ZikoUILI(arr[i]);
      li.setTarget(this.element);
      this.items.push(li[0]);
      this.maintain();
    }
  }
  remove(...ele) {
    if (ele.length == 0) {
      if (this.Target.children.length) this.Target.removeChild(this.element);
    } else {
      const remove = ele => {
        if (typeof ele === "number") ele = this.items[ele];
        if (ele instanceof ZikoUIElement) this.element.removeChild(ele.parent.element);
        this.items = this.items.filter(n => n !== ele);
      };
      for (let i = 0; i < ele.length; i++) remove(ele[i]);
      for (let i = 0; i < this.items.length; i++) Object.assign(this, {
        [[i]]: this.items[i]
      });
    }
    return this;
  }
  insertAt(index, ...ele) {
    if (index >= this.element.children.length) this.append(...ele);else for (let i = 0; i < ele.length; i++) {
      let li = null;
      if (["number", "string"].includes(typeof ele[i])) ele[i] = text(ele[i]);
      if (ele[i] instanceof ZikoUIElement) li = new ZikoUILI(ele[i]);
      this.element.insertBefore(li.element, this.items[index].parent.element);
      this.items.splice(index, 0, ele[i][0]);
    }
    return this;
  }
  filterByTextContent(text, exactMatch = false) {
    this.items.map(n => n.parent.render());
    this.items.filter(n => {
      const content = n.element.textContent;
      return !(exactMatch ? content === text : content.includes(text));
    }).map(n => n.parent.render(false));
    return this;
  }
  sortByTextContent(order = 1) {
    this.items.map(n => n.parent.render(false));
    // To Fix
    this.sortedItems = this.items.sort((a, b) => order * a.element.textContent.localeCompare(b.element.textContent));
    this.append(...this.sortedItems);
    return this;
  }
  filterByClass(value) {
    this.items.map(n => n.parent.render(true));
    this.items.filter(n => !n.Classes.includes(value)).map(n => n.parent.render(false));
    return this;
  }
  delete(value) {
    const valueIndex = [...this.element.children].indexOf(value);
    return valueIndex;
    /*if(valueIndex >= 0) {
      return this.list.splice(valueIndex, 1);
    }*/
  }
  push() {}
  pop() {}
  unshift() {}
  shift() {}
  sort() {}
  filter() {}
  slice() {}
}
class ZikoUIOList extends ZikoUIList {
  constructor(...arr) {
    super("ol", "ol");
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
class ZikoUIUList extends ZikoUIList {
  constructor(...arr) {
    super("ul", "ul");
    this.append(...arr);
    this.render();
  }
}
const li = UI => new ZikoUILI(UI);
const ol = (...arr) => new ZikoUIOList(...arr);
const ul = (...arr) => new ZikoUIUList(...arr);

class ZikoUIBtn extends ZikoUIElement {
  constructor(value = "button") {
    super();
    this.element = document.createElement("button");
    this.setValue(value);
    this.render();
    this.st.cursor("pointer");
  }
  setValue(value) {
    if (value instanceof ZikoUIElement) value.setTarget(this.element);else {
      this.element.appendChild(document.createTextNode(""));
      this.element.childNodes[0].data = value;
    }
    return this;
  }
  get value() {
    return this.element.innerText;
  }
  toggleValues(...values) {
    values = values.map(n => "" + n);
    let index = values.indexOf("" + this.value);
    if (index != -1 && index != values.length - 1) this.setValue(values[index + 1]);else this.setValue(values[0]);
    return this;
  }
}
const btn = value => new ZikoUIBtn(value);

class ZikoUIInputOption extends ZikoUIElement {
  constructor(value = "") {
    super();
    this.element = document.createElement("option");
    if (value instanceof Object && "value" in value) {
      this.setValue(value.value);
      this.setText(value?.text ?? value.value);
    } else this.setValue(value);
  }
  setValue(str = "") {
    this.element.value = str;
    return this;
  }
  setText(text = "") {
    if (text) this.element.textContent = text;
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
  get value() {
    return this.element.textContent;
  }
}
const textarea = () => new ZikoUITextArea();

//import { select } from "./select.js";
//import { debounce,throttle} from "../../Data/decorators.js";

class ZikoUIInput extends ZikoUIElement {
  constructor(value = "", datalist) {
    super();
    this.element = document.createElement("input");
    Object.assign(this.events, {
      input: null
    });
    this.setValue(value);
    if (datalist) this.linkDatalist(datalist);
    this.render();
  }
  onInput(...callbacks) {
    if (!this.events.input) this.events.input = Input(this);
    this.events.input.onInput(...callbacks);
    return this;
  }
  onChange(...callbacks) {
    if (!this.events.input) this.events.input = Input(this);
    this.events.input.onChange(...callbacks);
    return this;
  }
  linkDatalist(datalist) {
    let id;
    if (datalist instanceof ZikoUIInputDatalist) id = datalist.Id;else if (datalist instanceof Array) {
      const Datalist = new ZikoUIInputDatalist(...datalist);
      id = Datalist.Id;
      console.log(Datalist);
    } else id = datalist;
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
  setValue(value = "") {
    this.element.value = value;
    return this;
  }
  useState(state) {
    this.setValue(state);
    return [{
      value: this.value
    }, e => this.setValue(e)];
  }
  setPlaceholder(value) {
    if (value) this.element.placeholder = value;
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
    this.element.addEventListener("keyup", () => UIElement.setValue(this.Length));
    return this;
  }
}
class ZikoUIInputNumber extends ZikoUIInput {
  constructor(min, max, step = 1) {
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
    if (bool) this.Target.appendChild(this._aux_element.element);else this.remove();
    return this;
  }
  remove() {
    if (this.Target.children.length) this.Target.removeChild(this._aux_element.element);
    return this;
  }
}
class ZikoUIInputDatalist extends ZikoUIElement {
  constructor(...options) {
    super();
    this.element = document.createElement("datalist");
    this.addOptions(...options).setId("ziko-datalist-id" + Random.string(10));
    this.render();
  }
  addOptions(...options) {
    options.map(n => this.append(new ZikoUIInputOption(n)));
    return this;
  }
}
const input = (value, datalist) => {
  if (value instanceof Object) {
    const {
      datalist,
      placeholder
    } = value;
    value = value.value ?? "";
    return new ZikoUIInput(value, datalist).setPlaceholder(placeholder);
  }
  return new ZikoUIInput(value, datalist);
};
const datalist = (...options) => new ZikoUIInputDatalist(...options);
const slider = (value, min, max, step) => {
  if (value instanceof Object) {
    const {
      min = 0,
      max = 10,
      step = 1
    } = value;
    value = value?.value ?? 5;
    return new ZikoUIInputSlider(value, min, max, step);
  }
  return new ZikoUIInputSlider(value, min, max, step);
};
const inputNumber = (min, max, step) => {
  if (min instanceof Object) {
    const {
      value,
      max = 10,
      step = 1,
      placeholder = ""
    } = min;
    min = min?.min ?? 0;
    return new ZikoUIInputSlider(min, max, step).setValue(value).setPlaceholder(placeholder);
  }
  return new ZikoUIInputNumber(min, max, step);
};
const search = (...a) => new ZikoUIInputSearch().connect(...a);
const inputImage = text => new ZikoUIInputImage(text);
const inputPassword = () => new ZikoUIInputPassword();
const inputEmail = () => new ZikoUIInputEmail();
const inputColor = () => new ZikoUIInputColor();
const inputTime = () => new ZikoUIInputTime();
const inputDate = () => new ZikoUIInputDate();
const inputDateTime = () => new ZikoUIInputDateTime();
const checkbox = () => new ZikoUIInputCheckbox();
const radio = () => new ZikoUIInputRadio();

class ZikoUISelect extends ZikoUIElement {
  constructor() {
    super();
    this.element = document.createElement("select");
    this.render();
  }
  addOptions(...options) {
    options.map(n => this.append(new ZikoUIInputOption(n)));
    return this;
  }
}
const select = () => new ZikoUISelect();

class ZikoUIImage extends ZikoUIElement {
  constructor(src, w, h) {
    super("image", "image");
    this.element = document.createElement("img");
    this.value = src;
    if (src.nodeName === "IMG") this.element.setAttribute("src", src.src);else this.element.setAttribute("src", src);
    if (typeof w == "number") w += "%";
    if (typeof h == "number") h += "%";
    this.style({
      border: "1px solid black",
      width: w,
      height: h
    });
    this.render();
  }
  updateSrc(url) {
    this.value = url;
    this.element.src = url;
    return this;
  }
  toggleSrc(...values) {
    values = values.map(n => "" + n);
    let index = values.indexOf("" + this.value);
    if (index != -1 && index != values.length - 1) this.updateSrc(values[index + 1]);else this.updateSrc(values[0]);
    return this;
  }
  alt(alt) {
    this.element.alt = alt;
    return this;
  }
}
const image = (src, width, height) => new ZikoUIImage(src, width, height);

class ZikoUIFigure extends ZikoUIElement {
  constructor(src, caption) {
    super();
    this.element = document.createElement("figure");
    this.img = src.width("100%").element;
    this.caption = document.createElement("figcaption");
    this.caption.append(caption.element);
    this.element.append(this.img);
    this.element.append(this.caption);
    this.render();
  }
}
const figure = (image, caption) => new ZikoUIFigure(image, caption);

class ZikoUIVideo extends ZikoUIElement {
  constructor(src = "", w = "100%", h = "50vh") {
    super("video", "video");
    this.element = document.createElement("video");
    if (src.nodeName === "VIDEO") this.element.setAttribute("src", src.src);else this.element.setAttribute("src", src);
    if (typeof w == "number") w += "%";
    if (typeof h == "number") h += "%";
    this.style({
      width: w,
      height: h
    });
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
  poster(src = "") {
    this.element.poster = src;
    return this;
  }
  PIP(e) {
    this.element.requestPictureInPicture(e);
    return this;
  }
}
const video = (src, width, height) => new ZikoUIVideo(src, width, height);

class ZikoUIAudio extends ZikoUIElement {
  constructor(src) {
    super("audio", "audio");
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
const audio = src => new ZikoUIAudio(src);

class ZikoUIWebcame extends ZikoUIVideo {
  constructor() {
    super();
    this.element.setAttribute("src", "");
    this.constraints = {
      audio: true,
      video: {
        width: 1280,
        height: 720
      }
    };
    //this.video=this.element
  }
  start() {
    navigator.mediaDevices.getUserMedia(this.constraints).then(mediaStream => {
      this.element.srcObject = mediaStream;
      this.element.onloadedmetadata = () => {
        this.element.play();
      };
    }).catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
    return this;
  }
}
const inputCamera = () => new ZikoUIWebcame();

function set_vertical(direction) {
  direction == 1 ? this.style({
    flexDirection: "column"
  }) : direction == -1 && this.style({
    flexDirection: "column-reverse"
  });
  return this;
}
function set_horizontal(direction) {
  direction == 1 ? this.style({
    flexDirection: "row"
  }) : direction == -1 && this.style({
    flexDirection: "row-reverse"
  });
  return this;
}
function map_pos_x(align) {
  let pos = ["flex-start", "center", "flex-end"];
  if (typeof align === "number") align = pos[align + 1];
  return align;
}
function map_pos_y(align) {
  return map_pos_x(-align);
}
class ZikoUIFlex extends ZikoUIElement {
  constructor(tag = "div", w = "100%", h = "100%") {
    super();
    this.element = document.createElement(tag);
    this.direction = "cols";
    if (typeof w == "number") w += "%";
    if (typeof h == "number") h += "%";
    this.style({
      width: w,
      height: h
    });
    this.style({
      display: "flex"
    });
    this.render();
  }
  resp(px, wrap = true) {
    this.wrap(wrap);
    if (this.element.clientWidth < px) this.vertical();else this.horizontal();
    return this;
  }
  setSpaceAround() {
    this.style({
      justifyContent: "space-around"
    });
    return this;
  }
  setSpaceBetween() {
    this.style({
      justifyContent: "space-between"
    });
    return this;
  }
  setBaseline() {
    this.style({
      alignItems: "baseline"
    });
    return this;
  }
  gap(g) {
    if (this.direction === "row") this.style({
      columnGap: g
    });else if (this.direction === "column") this.style({
      rowGap: g
    });
    return this;
  }
  wrap(value = "wrap") {
    const values = ["no-wrap", "wrap", "wrap-reverse"];
    this.style({
      flexWrap: typeof value === "string" ? value : values[+value]
    });
    return this;
  }
  _justifyContent(align = "center") {
    this.style({
      justifyContent: align
    });
    return this;
  }
  vertical(x, y, order = 1) {
    set_vertical.call(this, order);
    this.style({
      alignItems: typeof x === "number" ? map_pos_x.call(this, x) : x,
      justifyContent: typeof y == "number" ? map_pos_y.call(this, y) : y
    });
    return this;
  }
  horizontal(x, y, order = 1) {
    set_horizontal.call(this, order);
    this.style({
      alignItems: typeof y == "number" ? map_pos_y.call(this, y) : y,
      justifyContent: typeof x === "number" ? map_pos_x.call(this, x) : x
    });
    return this;
  }
  show() {
    this.isHidden = false;
    this.style({
      display: "flex"
    });
    return this;
  }
}
const Flex = (...ZikoUIElement) => {
  let tag = "div";
  if (typeof ZikoUIElement[0] === "string") {
    tag = ZikoUIElement[0];
    ZikoUIElement.pop();
  }
  return new ZikoUIFlex(tag).append(...ZikoUIElement);
};

class ZikoUIGrid extends ZikoUIElement {
  constructor(tag = "div", w = "50vw", h = "50vh") {
    super();
    this.element = document.createElement(tag);
    this.direction = "cols";
    if (typeof w == "number") w += "%";
    if (typeof h == "number") h += "%";
    this.style({
      border: "1px solid black",
      width: w,
      height: h
    });
    this.style({
      display: "grid"
    });
    this.render();
  }
  columns(n) {
    let temp = "";
    for (let i = 0; i < n; i++) temp = temp.concat(" auto");
    this.#templateColumns(temp);
    return this;
  }
  #templateColumns(temp = "auto auto") {
    this.style({
      gridTemplateColumns: temp
    });
    return this;
  }
  gap(w = 10, h = w) {
    if (typeof w === "number") w += "px";
    if (typeof h === "number") h += "px";
    this.style({
      gridColumnGap: w,
      gridRowGap: h
    });
    return this;
  }
}
const Grid$1 = (...ZikoUIElement) => new ZikoUIGrid("div").append(...ZikoUIElement);

class ZikoUICarousel extends ZikoUIFlex {
  constructor(...ZikoUIElement) {
    super();
    this.style({
      position: "relative",
      overflow: "hidden",
      touchAction: "none",
      userSelect: "none"
    });
    this.horizontal("space-around", 0);
    this.track = Section(...ZikoUIElement).style({
      display: "inline-flex"
    });
    this.track.size(this.track.children.length * 100 + "vw");
    this.track.setTarget(this);
    this.track.items.map(n => n.style({
      pointerEvents: "none",
      margin: "auto 10px"
    }));
    this.x0 = null;
    this.tx = 0;
    this.onPtrMove(e => {
      if (e.isDown) {
        let x = e.event.pageX;
        let dx = x - this.x0;
        this.track.translateX(this.tx + dx, 0);
      }
    });
    this.onPtrDown(e => {
      console.log(e.event);
      this.x0 = e.event.pageX;
      const transformMatrix = window.getComputedStyle(this.track.element).getPropertyValue("transform");
      if (transformMatrix !== "none") {
        this.tx = +transformMatrix.split(",")[4];
      }
    });
    this.onPtrUp(e => console.log(e.isDown));
    this.onPtrLeave(e => {
      // Handle outside up 
    });
  }
}
const Carousel = (...ZikoUIElement) => new ZikoUICarousel(...ZikoUIElement);

class ZikoUINoteBook extends ZikoUIFlex {
  constructor() {
    super();
  }
  addSection() {
    const Input = Section().style({
      width: "80%",
      height: "50px",
      margin: "5px 0px",
      border: "1px red solid"
    });
    this.append(Input);
    return this;
  }
}
const CodeNote = () => new ZikoUINoteBook();

// Next 
// Previous
// Vertical 
// Horizontal
class ZikoUITabs extends ZikoUIFlex {
  #ACTIVE_ELEMENT_INDEX = 0;
  constructor(Controllers, Contents) {
    super();
    this.style({
      boxSizing: "border-box",
      backgroundColor: "blanchedalmond",
      border: "1px red solid",
      margin: "30px"
    });
    this.append(Flex().size("auto", "auto").style({
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      minWidth: "50px",
      minHeight: "50px",
      backgroundColor: "darkblue",
      border: "1px darkblue solid"
    }), Flex().style({
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "darkslategrey"
    }));
    this.Controller = this.items[0].setAttribute("role", "tablist");
    this.Content = this.items[1];
    if (Controllers.length !== Contents.length) console.error("");else {
      this.Controller.append(...Controllers);
      this.Content.append(...Contents);
      // Add transition
    }
    this.init();
    this.display(0);
  }
  init() {
    // Remove old listener
    for (let i = 0; i < this.Controller.length; i++) {
      this.Controller[i].setAttribute("role", "tab").setAttribute("aria-controls", `tab${i}`);
      this.Content[i].setAttribute("role", "tabpanel").setAttribute("aria-labelledby", `tab${i}`).setAttribute("tabindex", -1);
    }
    this.Controller.forEach(item => item.onClick(e => {
      const tab = e.Target.element.getAttribute("aria-controls");
      const index = +tab.slice(3);
      this.Content.filter(n => n.element.getAttribute("aria-labelledby") === tab, () => {
        if (this.#ACTIVE_ELEMENT_INDEX !== index) this.display(index);
      });
    }));
    return this;
  }
  addPairs(ControllerItem, ContentItem) {
    this.Controller.append(ControllerItem);
    this.Content.append(ContentItem);
    const length = this.Controller.length;
    this.Controller.at(-1).setAttribute("role", "tab").setAttribute("aria-controls", `tab${length - 1}`);
    this.Content.at(-1).setAttribute("role", "tabpanel").setAttribute("aria-labelledby", `tab${length - 1}`).setAttribute("tabindex", -1);
    // Add listener
    return this;
  }
  removePairs(index) {}
  display(index) {
    this.#ACTIVE_ELEMENT_INDEX = index % this.Content.length;
    this.Controller.forEach(n => n.setAttribute("tabindex", -1).setAttribute("aria-selected", false));
    this.Controller.at(this.#ACTIVE_ELEMENT_INDEX).setAttribute("tabindex", 0).setAttribute("aria-selected", true);
    (async () => {
      await this.Content.forEach(n => n.hide());
      await this.Content.at(this.#ACTIVE_ELEMENT_INDEX).setAttribute("tabindex", 0).show();
    })();
    return this;
  }
  next(i = 1) {
    this.display(this.#ACTIVE_ELEMENT_INDEX + i);
    return this;
  }
  previous(i = 1) {
    this.display(this.#ACTIVE_ELEMENT_INDEX - i);
    return this;
  }
  useHorizontalSwippe() {
    this.onPtrDown();
    this.onPtrUp(e => this.next(Math.sign(e.swippe.delta_x)));
    return this;
  }
  useVerticalSwippe() {
    this.onPtrDown();
    this.onPtrUp(e => this.next(Math.sign(e.swippe.delta_y)));
    return this;
  }
}
const Tabs = (Controllers, Contents) => new ZikoUITabs(Controllers, Contents);

class ZikoUIAccordion extends ZikoUIElement {
  constructor(summary, content, icon = "😁") {
    super();
    this.element = document.createElement("details");
    this.summary = ZikoHtml("summary", summary).style({
      fontSize: "1.1em",
      padding: "0.625rem",
      fontWeight: "bold",
      listStyleType: `"${icon}"`,
      cursor: "pointer"
    });
    this.summary[0].style({
      marginLeft: "0.5em"
    });
    this.content = content.style({
      margin: "0.7em"
    });
    this.append(this.summary, this.content);
    this.style({
      marginBottom: "0.7em"
    });
    this.render();
  }
  get isOpen() {
    return this.element.open;
  }
  open() {
    this.element.open = true;
    return this;
  }
  onOpen(callback) {
    return this;
  }
  close() {
    this.element.open = true;
    return this;
  }
  onClose(callback) {
    return this;
  }
  toggle() {
    this.element.open = !this.element.open;
    return this;
  }
}
const Accordion = (summary, content, icon) => new ZikoUIAccordion(summary, content, icon);

// Watch open using Mutation observer

class ZikoUIMain extends ZikoUIElement {
  constructor() {
    super("main", "Main");
    this.render();
  }
}
class ZikoUIHeader extends ZikoUIElement {
  constructor() {
    super("header", "Header");
    this.render();
  }
}
class ZikoUINav extends ZikoUIElement {
  constructor() {
    super("nav", "Nav");
    this.render();
  }
}
class ZikoUISection extends ZikoUIElement {
  constructor() {
    super("section", "Section");
    this.style({
      position: "relative"
    });
    this.render();
  }
}
class ZikoUIArticle extends ZikoUIElement {
  constructor() {
    super("article", "Article");
    this.render();
  }
}
class ZikoUIAside extends ZikoUIElement {
  constructor() {
    super("aside", "Aside");
    this.render();
  }
}
class ZikoUIFooter extends ZikoUIElement {
  constructor() {
    super("footer", "Footer");
    this.element = document.createElement("footer");
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

class ZikoUITr extends ZikoUIElement {
  constructor(...ZikoUIElement) {
    super();
    this.element = document.createElement("Tr");
    this.append(...ZikoUIElement);
  }
}
class ZikoUITd extends ZikoUIElement {
  constructor(...ZikoUIElement) {
    super();
    this.element = document.createElement("Td");
    this.append(...ZikoUIElement);
  }
}
class ZikoUIThead extends ZikoUIElement {
  constructor(...ZikoUITr) {
    super();
    this.element = document.createElement("Thead");
    this.append(...ZikoUITr);
  }
}
class ZikoUITbody extends ZikoUIElement {
  constructor(...ZikoUITr) {
    super();
    this.element = document.createElement("Tbody");
    this.append(...ZikoUITr);
  }
}
class ZikoUICaption extends ZikoUIElement {
  constructor(ZikoUIElement) {
    super();
    this.element = document.createElement("Caption");
    this.append(ZikoUIElement);
  }
}
const tr = (...ZikoUIElement) => new ZikoUITr(...ZikoUIElement);
const td = (...UI) => {
  UI = UI.map(n => {
    if (!(n instanceof ZikoUIElement)) n = text(n);
    return n;
  });
  return new ZikoUITd(...UI);
};
const thead = (...ZikoUITd) => {
  ZikoUITd = ZikoUITd.map(n => {
    if (!(n instanceof ZikoUIElement)) n = td(n);
    return n;
  });
  return new ZikoUIThead(...UI);
};
const tbody = (...ZikoUITr) => new ZikoUITbody(...ZikoUITr);
const caption = ZikoUITr => new ZikoUICaption(ZikoUITr);

const MatrixToTableUI = matrix => {
  var Tr = new Array(matrix.rows).fill(null).map(() => tr());
  var Td = matrix.arr.map(n => n.map(() => null));
  for (let i = 0; i < Td.length; i++) {
    for (let j = 0; j < Td[0].length; j++) {
      Td[i][j] = td(matrix.arr[i][j]);
      Tr[i].append(Td[i][j]);
    }
  }
  return Tr;
};

class ZikoUITable extends ZikoUIElement {
  constructor(body, {
    caption = null,
    head = null,
    foot = null
  } = {}) {
    super("table", "Table");
    this.structure = {
      caption,
      head,
      body: null,
      foot
    };
    if (body) this.fromMatrix(body);
    if (caption) this.setCaption(caption);
    this.render();
  }
  get caption() {
    return this.structure.caption;
  }
  get header() {}
  get body() {}
  get footer() {}
  setCaption(c) {
    this.removeCaption();
    this.structure.caption = caption(c);
    this.append(this.structure.caption);
    return this;
  }
  removeCaption() {
    if (this.structure.caption) this.removeItem(...this.items.filter(n => n instanceof ZikoUICaption));
    this.structure.caption = null;
    return this;
  }
  setHeader(...c) {
    this.tHead = thead(...c);
    this.append(this.tHead);
    return this;
  }
  removeHeader() {
    this.removeItem(...this.items.filter(n => n instanceof ZikoUICaption));
    return this;
  }
  setFooter(c) {
    this.structure.caption = caption(c);
    this.append(this.structure.caption);
    return this;
  }
  removeFooter() {
    this.removeItem(...this.items.filter(n => n instanceof ZikoUICaption));
    return this;
  }
  fromMatrix(bodyMatrix) {
    bodyMatrix instanceof Array ? this.bodyMatrix = matrix(bodyMatrix) : this.bodyMatrix = bodyMatrix;
    if (this.structure.body) this.remove(this.structure.body);
    this.structure.body = tbody();
    this.append(this.structure.body);
    this.structure.body.append(...MatrixToTableUI(this.bodyMatrix));
    //this.structure.body.append(...MatrixToTableUI(matrix))
    //this.cellStyles({ padding: "0.2rem 0.4rem", textAlign: "center" });
    return this;
  }
  transpose() {
    this.fromMatrix(this.bodyMatrix.T);
    return this;
  }
  hstack(m) {
    if (m instanceof ZikoUITable) m = m.bodyMatrix;
    this.fromMatrix(this.bodyMatrix.clone.hstack(m));
    return this;
  }
  vstack(m) {
    if (m instanceof ZikoUITable) m = m.bodyMatrix;
    this.fromMatrix(this.bodyMatrix.clone.vstack(m));
    return this;
  }
  slice(r0 = 0, c0 = 0, r1 = this.bodyMatrix.rows - 1, c1 = this.bodyMatrix.cols - 1) {
    this.fromMatrix(this.bodyMatrix.slice(r0, c0, r1, c1));
    return this;
  }
  sortByCols(n, config = {
    type: "num",
    order: "asc"
  }) {
    this.fromMatrix(this.bodyMatrix.clone.sortTable(n, config));
    return this;
  }
  sortByRows(n, config = {
    type: "num",
    order: "asc"
  }) {
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
  forEachRow(callback) {
    this.structure.body.forEach(callback);
    return this;
  }
  forEachItem(callback) {
    this.structure.body.forEach(n => n.forEach(callback));
    return this;
  }
}
const Table = (matrix, config) => new ZikoUITable(matrix, config);

const UI$1 = {
  ZikoHtml,
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
  Carousel,
  Grid: Grid$1,
  Header,
  Main,
  Section: Section$1,
  Article,
  Aside,
  Nav,
  Footer,
  Table,
  CodeNote,
  Tabs,
  Accordion,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

class ZikoTimeLoop {
  constructor(callback, {
    fps,
    step,
    t = [0, null],
    start = true
  } = {}) {
    this.callback = callback;
    this.cache = {
      isRunning: false,
      AnimationId: null,
      startTime: null,
      step,
      fps,
      t,
      started: start
    };
    this.adjust();
    this.i = 0;
  }
  adjust() {
    if (this.cache.step && this.cache.fps) {
      console.warn(`Fps will be adjusted from ${this.cache.fps} to ${1000 / this.cache.step} to ensure a smoother animation`);
      this.cache.fps = 1000 / this.cache.step;
    }
    if (this.cache.started) {
      const t = this.cache.t;
      t[0] ? this.startAfter(t[0]) : this.start();
      if (t[1]) this.stopAfter(t[1]);
    }
    return this;
  }
  get TIME_STEP() {
    return this.cache.step ? this.cache.step : 1000 / this.cache.fps;
  }
  start() {
    if (!this.cache.isRunning) {
      this.i = 0;
      this.cache.isRunning = true;
      this.cache.startTime = Date.now();
      this.animate();
    }
    return this;
  }
  pause() {
    if (this.cache.isRunning) {
      clearTimeout(this.cache.AnimationId);
      this.cache.isRunning = false;
    }
    return this;
  }
  stop() {
    this.pause();
    this.i = 0;
    return this;
  }
  resume() {
    this.cache.isRunning = true;
    this.animate();
    return this;
  }
  startAfter(t = 1000) {
    setTimeout(this.start.bind(this), t);
    return this;
  }
  stopAfter(t = 1000) {
    setTimeout(this.stop.bind(this), t);
    return this;
  }
  animate = () => {
    if (this.cache.isRunning) {
      const now = Date.now();
      const delta = now - this.cache.startTime;
      if (delta > this.TIME_STEP) {
        this.callback(this);
        this.i++;
        this.cache.startTime = now - delta % this.TIME_STEP;
      }
      this.cache.AnimationId = setTimeout(this.animate, 0);
    }
  };
}
const loop = (callback, options) => new ZikoTimeLoop(callback, options);

const Ease = {
  Linear: function (t) {
    return t;
  },
  InSin(t) {
    return 1 - Math.cos(t * Math.PI / 2);
  },
  OutSin(t) {
    return Math.sin(t * Math.PI / 2);
  },
  InOutSin(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  },
  InQuad(t) {
    return t ** 2;
  },
  OutQuad(t) {
    return 1 - Math.pow(1 - t, 2);
  },
  InOutQuad(t) {
    return t < 0.5 ? 2 * Math.pow(t, 2) : 1 - Math.pow(-2 * t + 2, 2) / 2;
  },
  InCubic(t) {
    return t ** 3;
  },
  OutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  },
  InOutCubic(t) {
    return t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  InQuart(t) {
    return t ** 4;
  },
  OutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  },
  InOutQuart(t) {
    return t < 0.5 ? 8 * Math.pow(t, 4) : 1 - Math.pow(-2 * t + 2, 4) / 2;
  },
  InQuint(t) {
    return t ** 5;
  },
  OutQuint(t) {
    return 1 - Math.pow(1 - t, 5);
  },
  InOutQuint(t) {
    return t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
  },
  InExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * t - 10);
  },
  OutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
  InOutExpo(t) {
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  },
  InCirc(t) {
    return 1 - Math.sqrt(1 - Math.pow(t, 2));
  },
  OutCirc(t) {
    return Math.sqrt(1 - Math.pow(t - 1, 2));
  },
  InOutCic(t) {
    return t < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
  },
  Arc(t) {
    return 1 - Math.sin(Math.acos(t));
  },
  Back(t) {
    // To Be Changed
    let x = 1;
    return Math.pow(t, 2) * ((x + 1) * t - x);
  },
  Elastic(t) {
    return -2 * Math.pow(2, 10 * (t - 1)) * Math.cos(20 * Math.PI * t / 3 * t);
  },
  InBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * Math.pow(t, 3) - c1 * t ** 2;
  },
  OutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  InOutBack(t) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  InElastic(t) {
    const c4 = 2 * Math.PI / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  OutElastic(t) {
    const c4 = 2 * Math.PI / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  InOutElastic(t) {
    const c5 = 2 * Math.PI / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5) / 2 + 1;
  },
  InBounce(t) {
    return 1 - Ease.OutBounce(1 - t);
  },
  OutBounce(t) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  InOutBounce(t) {
    return t < 0.5 ? (1 - Ease.OutBounce(1 - 2 * t)) / 2 : (1 + Ease.OutBounce(2 * t - 1)) / 2;
  }
};

const debounce = (fn, delay = 1000) => {
  let id;
  return (...args) => id ? clearTimeout(id) : setTimeout(() => fn(...args), delay);
};
const throttle = (fn, delay) => {
  let lastTime = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    fn(...args);
  };
};

const time_memory_Taken = callback => {
  const t0 = Date.now();
  const m0 = performance.memory.usedJSHeapSize;
  const result = callback();
  const t1 = Date.now();
  const m1 = performance.memory.usedJSHeapSize;
  const elapsedTime = t1 - t0;
  const usedMemory = m1 - m0;
  return {
    elapsedTime,
    usedMemory,
    result
  };
};

const waitForUIElm = UIElement => {
  return new Promise(resolve => {
    if (UIElement.element) {
      return resolve(UIElement.element);
    }
    const observer = new MutationObserver(() => {
      if (UIElement.element) {
        resolve(UIElement.element);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
};
const waitForUIElmSync = (UIElement, timeout = 2000) => {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    if (UIElement.element) return UIElement.element;
  }
};

const wait = delayInMS => {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
};
const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};

class ZikoTimeAnimation {
  constructor(callback, {
    ease = Ease.Linear,
    step = 50,
    t = [0, null],
    start = true,
    duration = 3000
  } = {}) {
    this.cache = {
      isRunning: false,
      AnimationId: null,
      startTime: null,
      ease,
      step,
      intervall: t,
      started: start,
      duration
    };
    this.t = 0;
    this.tx = 0;
    this.ty = 0;
    this.i = 0;
    this.callback = callback;
  }
  #animation_handler() {
    this.t += this.cache.step;
    this.i++;
    this.tx = map$1(this.t, 0, this.cache.duration, 0, 1);
    this.ty = this.cache.ease(this.tx);
    this.callback(this);
    if (this.t >= this.cache.duration) {
      clearInterval(this.cache.AnimationId);
      this.cache.isRunning = false;
    }
  }
  reset(restart = true) {
    this.t = 0;
    this.tx = 0;
    this.ty = 0;
    this.i = 0;
    if (restart) this.start();
    return this;
  }
  #animate(reset = true) {
    if (!this.cache.isRunning) {
      if (reset) this.reset(false);
      this.cache.isRunning = true;
      this.cache.startTime = Date.now();
      this.cache.AnimationId = setInterval(this.#animation_handler.bind(this), this.cache.step);
    }
    return this;
  }
  start() {
    this.#animate(true);
    return this;
  }
  pause() {
    if (this.cache.isRunning) {
      clearTimeout(this.cache.AnimationId);
      this.cache.isRunning = false;
    }
    return this;
  }
  resume() {
    this.#animate(false);
    return this;
  }
  stop() {
    this.pause();
    this.reset(false);
    return this;
  }
  // clear(){
  // }
  // stream(){
  // }
}
const animation = (callback, config) => new ZikoTimeAnimation(callback, config);

const Time = {
  wait,
  timeTaken,
  throttle,
  debounce,
  Ease,
  time_memory_Taken,
  loop,
  animation,
  waitForUIElm,
  waitForUIElmSync,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

const parseInlineElements = text => {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>').replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');
};
const parseTable = line => {
  const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell !== '');
  const tableRow = cells.map(cell => `<td>${parseInlineElements(cell)}</td>`).join('');
  return `<tr>${tableRow}</tr>\n`;
};
const parseCodeBlock = (lines, language) => {
  const codeContent = lines.slice(1, -1).join('\n'); // Exclude the triple backticks
  const highlightedCode = language ? `<code data-language="${language}">${codeContent}</code>` : `<code>${codeContent}</code>`;
  return `<pre>${highlightedCode}</pre>\n`;
};
const parseList = line => {
  const DIGIT_FOLLOWED_BY_A_DOT_AND_SPACE = /^\d+\.\s/;
  const match = line.match(DIGIT_FOLLOWED_BY_A_DOT_AND_SPACE);
  if (match) {
    let start = +match[1];
    return `<ol${start === 1 ? "" : ` start=${start}`}>\n<li>${parseInlineElements(line.slice(match[0].length))}</li>\n</ol>\n`;
  }
  return `<ul>\n<li>${parseInlineElements(line)}</li>\n</ul>\n`;
};
const markdown2html = markdownText => {
  const lines = markdownText.split('\n');
  let htmlOutput = '';
  let inTable = false;
  let inCodeBlock = false;
  let codeBlockLines = [];
  let codeBlockLanguage = '';
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    // Table
    if (line.startsWith('|')) {
      if (!inTable) {
        inTable = true;
        htmlOutput += '<table>\n';
      }
      htmlOutput += parseTable(line);
      continue;
    } else if (inTable) {
      inTable = false;
      htmlOutput += '</table>\n';
    }
    // Code block
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLines = [];
        codeBlockLanguage = line.slice(3).trim();
      } else {
        inCodeBlock = false;
        htmlOutput += parseCodeBlock(codeBlockLines, codeBlockLanguage);
      }
      continue;
    } else if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }
    // Headings
    if (line.startsWith('# ')) {
      const headingLevel = line.indexOf(' ');
      const headingText = line.slice(headingLevel + 1);
      htmlOutput += `<h${headingLevel}>${parseInlineElements(headingText)}</h${headingLevel}>\n`;
      continue;
    }
    // Lists
    if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\.\s/)) {
      htmlOutput += parseList(line);
      continue;
    }
    // Other paragraphs
    htmlOutput += `<p>${parseInlineElements(line)}</p>\n`;
  }
  return htmlOutput;
};

const csv2arr = (csv, delimiter = ",") => csv.trim().trimEnd().split("\n").map(n => n.split(delimiter));
const csv2matrix = (csv, delimiter = ",") => new Matrix(csv2arr(csv, delimiter));
const csv2object = (csv, delimiter = ",") => {
  const [header, ...rows] = csv2arr(csv, delimiter);
  const result = rows.map(row => {
    const obj = {};
    header.forEach((key, index) => {
      obj[key] = row[index];
    });
    return obj;
  });
  return result;
};
const csv2json = (csv, delimiter = ",") => JSON.stringify(csv2object(csv, delimiter));
const csv2sql = (csv, Table) => {
  const lines = csv.trim().trimEnd().split('\n').filter(n => n);
  const columns = lines[0].split(',');
  let sqlQuery = `INSERT INTO ${Table} (${columns.join(', ')}) Values `;
  let sqlValues = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    sqlValues.push(`(${values})`);
  }
  return sqlQuery + sqlValues.join(",\n");
};

const _objects2arr = data => data instanceof Array ? [Object.keys(data[0]), ...data.map(n => Object.values(n))] : [Object.keys(data)];
const _objects2csv = (data, delimiter) => _objects2arr(data).map(n => n.join(delimiter)).join("\n");
const json2arr = json => json instanceof Object ? _objects2arr(json) : _objects2arr(JSON.parse(json));
const json2csv = (json, delimiter = ",") => json instanceof Object ? _objects2csv(json, delimiter) : _objects2csv(JSON.parse(json), delimiter);
const json2csvFile = (json, delimiter) => {
  const str = json2csv(json, delimiter);
  const blob = new Blob([str], {
    type: 'text/csv;charset=utf-8;'
  });
  return {
    str,
    blob,
    url: URL.createObjectURL(blob)
  };
};
const _processObject = (obj, indent) => {
  const yml = [];
  if (Array.isArray(obj)) {
    obj.forEach(item => {
      if (typeof item === 'object' && item !== null) {
        yml.push(`${indent}-`);
        const nestedLines = _processObject(item, `${indent}  `);
        yml.push(...nestedLines);
      } else yml.push(`${indent}- ${item}`);
    });
  } else {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          yml.push(`${indent}${key}:`);
          const nestedLines = _processObject(value, `${indent}  `);
          yml.push(...nestedLines);
        } else {
          yml.push(`${indent}${key}: ${value}`);
        }
      }
    }
  }
  return yml;
};
const _object2yml = (object, indent = "") => _processObject(object, indent).join('\n');
const json2yml = (json, indent) => json instanceof Object ? _object2yml(json, indent) : _object2yml(JSON.parse(json), indent);
const json2ymlFile = (json, indent) => {
  const str = json2yml(json, indent);
  const blob = new Blob([str], {
    type: 'text/yml;charset=utf-8;'
  });
  return {
    str,
    blob,
    url: URL.createObjectURL(blob)
  };
};
const json2xml = (json, indent = 1) => {
  let xml = '';
  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      const value = json[key];
      xml += '\n' + ' '.repeat(indent) + `<${key}>`;
      typeof value === 'object' ? xml += json2xml(value, indent + 2) : xml += `${value}`;
      xml += `</${key}>`;
    }
  }
  return xml.trim();
};
const json2xmlFile = (json, indent) => {
  const str = json2xml(json, indent);
  const blob = new Blob([str], {
    type: 'text/xml;charset=utf-8;'
  });
  return {
    str,
    blob,
    url: URL.createObjectURL(blob)
  };
};

const svg2str = svg => new XMLSerializer().serializeToString(svg);
const svg2ascii = svg => btoa(svg2str(svg));
const svg2imgUrl = svg => 'data:image/svg+xml;base64,' + svg2ascii(svg);
const svg2img = (svg, render = true) => image(svg2imgUrl(svg)).render(render);

function parseXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const rootNode = xmlDoc.documentElement;
  const result = parseNode(rootNode);
  return result;
}
function parseNode(node) {
  const obj = {
    type: node.nodeName,
    attributes: {},
    children: []
  };
  for (let i = 0; i < node.attributes.length; i++) {
    const attr = node.attributes[i];
    obj.attributes[attr.name] = attr.value;
  }
  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];
    if (child.nodeType === Node.ELEMENT_NODE) {
      obj.children.push(parseNode(child));
    } else if (child.nodeType === Node.TEXT_NODE) {
      obj.text = child.textContent.trim();
    }
  }
  return obj;
}

// function htmlParser(element) {
//   const obj = {
//     type: element.tagName,
//     attributes: {},
//     children: [],
//   };
//   for (let i = 0; i < element.attributes.length; i++) {
//     const attr = element.attributes[i];
//     obj.attributes[attr.name] = attr.value;
//   }
//   for (let i = 0; i < element.children.length; i++) {
//     const child = element.children[i];
//     obj.children.push(htmlParser(child));
//   }
//   return obj;
// }

const preload = url => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    throw new Error(`Failed to fetch data from ${url}. Status: ${xhr.status}`);
  }
};

async function fetchdom(url = 'https://github.com/zakarialaoui10') {
  const data = await fetch(url);
  const html = await data.text();
  const dom = new DOMParser().parseFromString(html, 'text/xml');
  return dom.documentElement;
}
function fetchdomSync(url = 'https://github.com/zakarialaoui10') {
  const data = preload(url);
  const dom = new DOMParser().parseFromString(data, 'text/xml');
  return dom.documentElement;
}

globalThis.fetchdom = fetchdom;
globalThis.fetchdomSync = fetchdomSync;

const Data = {
  parseXML,
  preload,
  markdown2html,
  csv2arr,
  csv2matrix,
  csv2object,
  csv2json,
  csv2sql,
  json2arr,
  json2csv,
  json2csvFile,
  json2yml,
  json2ymlFile,
  json2xml,
  json2xmlFile,
  svg2str,
  svg2ascii,
  svg2imgUrl,
  svg2img,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

class ZikoUISvgElement {
  color({
    stroke,
    fill
  }) {
    this.element.setAttribute("stroke", stroke);
    this.element.setAttribute("fill", fill);
    return this;
  }
  fill(color = "none") {
    this.element.setAttribute('fill', color);
    return this;
  }
  stroke(color = "none", width) {
    this.element.setAttribute('stroke', color);
    width && this.strokeWidth(width);
    return this;
  }
  strokeWidth(width = 1) {
    this.element.setAttribute('stroke-width', width);
    return this;
  }
  opacity(value = 1) {
    this.element.setAttribute('opacity', value);
    return this;
  }
}

class ZikoUISvgRectangle extends ZikoUISvgElement {
  constructor(x, y, w, h, center = true) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.setX(x).setY(y).width(w).height(h);
    this.rx = this.x + this.w / 2;
    this.ty = this.y + this.h / 2;
  }
  setX(x) {
    this.element.x.baseVal.value = x;
    this.x = x;
    return this;
  }
  setY(y) {
    this.element.y.baseVal.value = y;
    this.y = y;
    return this;
  }
  r(rx, ry) {
    this.rx = rx;
    this.ry = ry;
    this.setX(this.rx - this.w / 2);
    this.setY(this.ry - this.h / 2);
    return this;
  }
  width(w) {
    this.element.width.baseVal.value = w;
    this.w = w;
    return this;
  }
  height(h) {
    this.element.height.baseVal.value = h;
    this.h = h;
    return this;
  }
}
const svgRect = (x, y, w, h, center) => new ZikoUISvgRectangle(x, y, w, h, center);

class ZikoUISvgCircle extends ZikoUISvgElement {
  constructor(cx, cy, r) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.cx(cx).cy(cy).r(r);
  }
  cx(cx) {
    this.element.cx.baseVal.value = cx;
    return this;
  }
  cy(cy) {
    this.element.cy.baseVal.value = cy;
    return this;
  }
  r(r) {
    this.element.r.baseVal.value = r;
    return this;
  }
  get R() {
    return this.element.r.baseVal.value;
  }
  get Cx() {
    return this.element.cx.baseVal.value;
  }
  get Cy() {
    return this.element.cy.baseVal.value;
  }
}
const svgCircle = (x, y, r) => new ZikoUISvgCircle(x, y, r);

class ZikoUISvgEllipse extends ZikoUISvgElement {
  constructor(cx, cy, rx, ry) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    this.cx(cx).cy(cy).rx(rx).ry(ry);
  }
  cx(cx) {
    this.element.cx.baseVal.value = cx;
    return this;
  }
  cy(cy) {
    this.element.cy.baseVal.value = cy;
    return this;
  }
  rx(rx) {
    this.element.rx.baseVal.value = rx;
    return this;
  }
  ry(ry) {
    this.element.ry.baseVal.value = ry;
    return this;
  }
}
const svgEllipse = (x, y, rx, ry) => new ZikoUISvgEllipse(x, y, rx, ry);

class ZikoUISvgLine extends ZikoUISvgElement {
  constructor(x1, y1, x2, y2) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.x1(x1).y1(y1).x2(x2).y2(y2).stroke("black");
  }
  x1(x1) {
    this.element.x1.baseVal.value = x1;
    return this;
  }
  y1(y1) {
    this.element.y1.baseVal.value = y1;
    return this;
  }
  x2(x2) {
    this.element.x2.baseVal.value = x2;
    return this;
  }
  y2(y2) {
    this.element.y2.baseVal.value = y2;
    return this;
  }
}
const svgLine = (x1, y1, x2, y2) => new ZikoUISvgLine(x1, y1, x2, y2);

class ZikoUISvgPolygon extends ZikoUISvgElement {
  constructor(X = [], Y = []) {
    super();
    this.X = X;
    this.Y = Y;
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.element.setAttribute("points", "");
  }
  addPoint(x, y) {
    let p = this.element.parentElement.createSVGPoint();
    p.x = x;
    p.y = y;
    this.element.points.appendItem(p);
    return this;
  }
  addPoints(X, Y) {
    for (let i = 0; i < X.length; i++) {
      let p = this.element.parentElement.createSVGPoint();
      p.x = X[i];
      p.y = Y[i];
      this.element.points.appendItem(p);
    }
    return this;
  }
}
const svgPolygon = (X, Y) => new ZikoUISvgPolygon(X, Y);

class ZikoUISvgImage extends ZikoUISvgElement {
  constructor(src = "", w = "100%", h = "100%", x = 0, y = 0) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "image");
    this.setSrc(src).width(w).height(h).x(x).y(y);
  }
  x(x) {
    this.element.x.baseVal.value = x;
    return this;
  }
  y(y) {
    this.element.y.baseVal.value = y;
    return this;
  }
  width(w) {
    this.element.setAttribute("width", w);
    return this;
  }
  height(h) {
    this.element.setAttribute("height", h);
    return this;
  }
  setSrc(src = "") {
    this.element.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', src);
    return this;
  }
}
const svgImage = (src, w, h, x, y) => new ZikoUISvgImage(src, w, h, x, y);

class ZikoUISvgText extends ZikoUISvgElement {
  constructor(text, x, y) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.setText(text);
    this.x(x).y(y);
  }
  x(x) {
    this.element.setAttribute("x", x);
    return this;
  }
  y(y) {
    this.element.setAttribute("y", y);
    return this;
  }
  setText(text = "") {
    this.element.textContent = text;
    return this;
  }
}
const svgText = (text, x, y) => new ZikoUISvgText(text, x, y);

class ZikoUISvgGroupe extends ZikoUISvgElement {
  constructor(...svgElement) {
    super();
    this.items = [];
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "g");
    this.add(...svgElement);
  }
  add(...svgElement) {
    for (let i = 0; i < svgElement.length; i++) {
      this.element.appendChild(svgElement[i].element);
      this.items.push(svgElement[i]);
    }
    if (svgElement.length === 1) return svgElement[0];
    return svgElement;
  }
  remove(...svgElement) {
    for (let i = 0; i < svgElement.length; i++) {
      this.element.removeChild(svgElement[i].element);
      this.items = this.items.filter(n => !svgElement);
    }
    return this;
  }
}
const svgGroupe = (...svgElement) => new ZikoUISvgGroupe(...svgElement);

//import svgObject from "./Elements/foreignObject.js";
//import svgGrid from "./Elements/grid.js";

class ZikoUISvg extends ZikoUIElement {
  constructor(w = 360, h = 300) {
    super();
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    //this.cache={};
    this.setAttribute("width", w);
    this.setAttribute("height", h);
    this.style({
      border: "1px black solid"
    });
    //this.view(-w/2,-h/2,w/2,h/2)
    //this.view(-10,-10,10,10);
    this.render();
  }
  view(x1, y1, x2, y2) {
    let width = Math.abs(x2 - x1);
    let height = Math.abs(y2 - y1);
    //this.element.style.transform="scale("+Math.sign(x2-x1)+","+(-Math.sign(y2-y1))+")";
    this.element.setAttribute("viewBox", [x1, y1, width, height].join(" "));
    //console.log({width:width,height:height})
    return this;
  }
  add(...svgElement) {
    for (let i = 0; i < svgElement.length; i++) {
      this.element.appendChild(svgElement[i].element);
      this.items.push(svgElement[i]);
    }
    this.maintain();
    return this;
  }
  remove(...svgElement) {
    for (let i = 0; i < svgElement.length; i++) {
      this.element.removeChild(svgElement[i].element);
      this.items = this.items.filter(n => !svgElement);
    }
    this.maintain();
    return this;
  }
  text(text, x, y) {
    let item = svgText(text, x, y);
    this.element.appendChild(item.element);
    item.x(x - item.element.getComputedTextLength() / 2);
    return item;
  }
  rect(x, y, w, h) {
    let item = svgRect(x, y, w, h);
    this.add(item);
    return item;
  }
  line(x1, y1, x2, y2) {
    let item = svgLine(x1, y1, x2, y2);
    this.element.appendChild(item.element);
    return item;
  }
  circle(cx, cy, r) {
    let item = svgCircle(cx, cy, r);
    this.element.appendChild(item.element);
    return item;
  }
  ellipse(cx, cy, rx, ry) {
    let item = svgEllipse(cx, cy, rx, ry);
    this.element.appendChild(item.element);
    return item;
  }
  polygon(X, Y) {
    let item = svgPolygon(X, Y);
    this.element.appendChild(item.element);
    item.addPoints(X, Y);
    return item;
  }
  image(src, w, h, x, y) {
    let item = svgImage(src, w, h, x, y);
    this.element.appendChild(item.element);
    return item;
  }
  mask() {}
  toString() {
    return new XMLSerializer().serializeToString(this.element);
  }
  btoa() {
    return btoa(this.toString());
  }
  toImg() {
    return 'data:image/svg+xml;base64,' + this.btoa();
  }
  toImg2() {
    return "data:image/svg+xml;charset=utf8," + this.toString().replaceAll("<", "%3C").replaceAll(">", "%3E").replaceAll("#", "%23").replaceAll('"', "'");
  }
}
const Svg = (w, h) => new ZikoUISvg(w, h);

class ZikoUICanvas extends ZikoUIElement {
  constructor(w, h) {
    super();
    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");
    this.style({
      border: "1px red solid"
      //width:"300px",
      //height:"300px"
    });
    this.transformMatrix = new Matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    this.axisMatrix = new Matrix([[-10, -10], [10, 10]]);
    this.render();
    setTimeout(() => this.resize(w, h), 0);
    this.on("sizeupdated", () => this.adjust());
  }
  get Width() {
    return this.element.width;
  }
  get Height() {
    return this.element.height;
  }
  get Xmin() {
    return this.axisMatrix[0][0];
  }
  get Ymin() {
    return this.axisMatrix[0][1];
  }
  get Xmax() {
    return this.axisMatrix[1][0];
  }
  get Ymax() {
    return this.axisMatrix[1][1];
  }
  get ImageData() {
    return this.ctx.getImageData(0, 0, c.Width, c.Height);
  }
  draw(all = true) {
    if (all) {
      this.clear();
      this.items.forEach(element => {
        element.parent = this;
        element.draw(this.ctx);
      });
    } else {
      this.items.at(-1).parent = this;
      this.items.at(-1).draw(this.ctx);
    }
    this.maintain();
    return this;
  }
  applyTransformMatrix() {
    this.ctx.setTransform(this.transformMatrix[0][0], this.transformMatrix[1][0], this.transformMatrix[0][1], this.transformMatrix[1][1], this.transformMatrix[0][2], this.transformMatrix[1][2]);
    return this;
  }
  resize(w, h) {
    // this.style({
    //     width:w,
    //     height:h
    // })
    this.size(w, h);
    this.lineWidth();
    this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
    this.emit("sizeupdated");
    return this;
  }
  adjust() {
    this.element.width = this.element.getBoundingClientRect().width;
    this.element.height = this.element.getBoundingClientRect().height;
    this.view(this.axisMatrix[0][0], this.axisMatrix[0][1], this.axisMatrix[1][0], this.axisMatrix[1][1]);
    return this;
  }
  view(xMin, yMin, xMax, yMax) {
    this.transformMatrix[0][0] = this.Width / (xMax - xMin); // scaleX
    this.transformMatrix[1][1] = -this.Height / (yMax - yMin); // scaleY
    this.transformMatrix[0][2] = this.Width / 2;
    this.transformMatrix[1][2] = this.Height / 2;
    this.axisMatrix = new Matrix([[xMin, yMin], [xMax, yMax]]);
    this.applyTransformMatrix();
    this.clear();
    this.lineWidth(1);
    this.draw();
    return this;
  }
  reset() {
    this.ctx.setTransform(1, 0, 0, 0, 0, 0);
    return this;
  }
  append(element) {
    this.items.push(element);
    this.draw(false);
    return this;
  }
  background(color) {
    this.ctx.fillStyle = color;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillRect(0, 0, this.Width, this.Height);
    this.applyTransformMatrix();
    this.draw();
  }
  lineWidth(w) {
    this.ctx.lineWidth = w / this.transformMatrix[0][0];
    return this;
  }
  ImageData(x = 0, y = 0, w = this.Width, h = this.Height) {
    return this.ctx.getImageData(x, y, w, h);
  }
  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.Width, this.Height);
    this.applyTransformMatrix();
    return this;
  }
  clone() {
    console.log(this.Width);
    const canvas = new ZikoUICanvas();
    canvas.items = this.items;
    canvas.transformMatrix = this.transformMatrix;
    canvas.axisMatrix = this.axisMatrix;
    Object.assign(canvas.cache, {
      ...this.cache
    });
    //waitForUIElm(this)
    //console.log(element)
    this.size(element.style.width, element.style.width);
    this.applyTransformMatrix();
    this.draw();
    this.adjust();
    return canvas;
  }
  toImage() {
    this.img = document.createElement("img");
    this.img.src = this.element.toDataURL("image/png");
    return this;
  }
  toBlob() {
    var canvas = this.element;
    canvas.toBlob(function (blob) {
      var newImg = document.createElement("img"),
        url = URL.createObjectURL(blob);
      newImg.onload = function () {
        URL.revokeObjectURL(url);
      };
      newImg.src = url;
      console.log(newImg);
    });
  }
  zoomIn() {}
  zoomOut() {}
  undo(n) {}
  redo(n) {}
  stream() {}
}
const Canvas = (w, h) => new ZikoUICanvas(w, h);

class ZikoCanvasElement {
  constructor(x, y) {
    this.parent = null;
    this.position = {
      x,
      y
    };
    this.cache = {
      interact: null /*avoid redraw*/,
      config: {
        draggable: false,
        selected: false,
        highlighted: false,
        rendered: false
      },
      style: {
        normal: {
          strokeEnabled: true,
          fillEnabled: false,
          strokeColor: "#111111",
          fillColor: "#777777"
        },
        highlighted: {
          strokeEnabled: true,
          fillEnabled: false,
          strokeColor: null,
          fillColor: null
        }
      }
    };
    this.history = {
      position: [],
      styles: []
    };
    this.render();
  }
  get px() {
    //_x=====>px
    return (this.position.x ?? 0) + (this.parent?.position?.x ?? 0);
  }
  get py() {
    //_y=====>py
    return (this.position.y ?? 0) + (this.parent?.position?.y ?? 0);
  }
  isIntersectedWith() {}
  isInStroke(x, y) {
    let is;
    if (this.parent) {
      this.parent.ctx.setTransform(1, 0, 0, 1, 0, 0);
      is = this.parent.ctx.isPointInStroke(this.path, x, y);
      this.parent.applyTransformMatrix();
    }
    return is;
  }
  isInPath(x, y) {
    let is;
    if (this.parent) {
      this.parent.ctx.setTransform(1, 0, 0, 1, 0, 0);
      is = this.parent.ctx.isPointInPath(this.path, x, y);
      this.parent.applyTransformMatrix();
    }
    return is;
  }
  posX(x) {
    this.position.x = x;
    if (this.parent) this.parent.draw();
    return this;
  }
  posY(y) {
    this.position.y = y;
    if (this.parent) this.parent.draw();
    return this;
  }
  color({
    stroke = this.cache.style.normal.strokeColor,
    fill = this.cache.style.normal.fillColor
  } = {
    stroke,
    fill
  }) {
    this.cache.style.normal.strokeColor = stroke;
    this.cache.style.normal.fillColor = fill;
    if (this.parent) this.parent.draw();
    return this;
  }
  translate(dx = 0, dy = 0) {
    this.position.x += dx;
    this.position.y += dy;
    if (this.parent) this.parent.draw();
    return;
  }
  applyNormalStyle(ctx) {
    ctx.strokeStyle = this.cache.style.normal.strokeColor;
    ctx.fillStyle = this.cache.style.normal.fillColor;
    return this;
  }
  applyHighlightedStyle(ctx) {
    ctx.strokeStyle = this.cache.style.highlighted.strokeColor;
    ctx.fillStyle = this.cache.style.highlighted.fillColor;
    return this;
  }
  stroke(color = this.cache.style.normal.strokeColor, enabled = true) {
    this.cache.style.normal.strokeEnabled = enabled;
    this.cache.style.normal.strokeColor = color;
    if (this.parent) this.parent.draw();
    return this;
  }
  fill(color = this.cache.style.normal.fillColor, enabled = true) {
    this.cache.style.normal.fillEnabled = enabled;
    this.cache.style.normal.filleColor = color;
    if (this.parent) this.parent.draw();
    return this;
  }
  render(render = true) {
    this.cache.config.rendered = render;
    return this;
  }
}

class CanvasArc extends ZikoCanvasElement {
  constructor(x, y, r, angle) {
    super(x, y);
    this.r = r;
    this.angle = angle;
    this.path = null;
  }
  draw(ctx) {
    if (this.cache.config.rendered) {
      ctx.save();
      this.applyNormalStyle(ctx);
      ctx.beginPath();
      this.path = new Path2D();
      this.path.arc(this.px, this.py, this.r, 0, this.angle);
      const {
        strokeEnabled,
        fillEnabled
      } = this.cache.style.normal;
      if (strokeEnabled) ctx.stroke(this.path);
      if (fillEnabled) ctx.fill(this.path);
      ctx.closePath();
      ctx.restore();
    }
    return this;
  }
  radius(r) {
    this.r = r;
    if (this.parent) this.parent.draw();
    return this;
  }
  // distanceFromCenter(x,y){
  //     return Math.sqrt(
  //         (this._x-x)**2-(this._y-y)**2
  //     )
  // }
  // isIn(x,y,strict=false){
  //     return strict?this.distanceFromCenter(x,y)<this.r:this.distanceFromCenter(x,y)<=this.r;
  // }
  // isInEdges(x,y){
  //     return this.distanceFromCenter(x,y)===this.r;
  // }
}
const canvasArc = (x, y, r, phi) => new CanvasArc(x, y, r, phi);
const canvasCircle = (x, y, r) => new CanvasArc(x, y, r, 2 * Math.PI);

class CanvasPoints extends ZikoCanvasElement {
  constructor(ptsX, ptsY) {
    super();
    this.pointsMatrix = null;
    this.path = new Path2D();
    this.fromXY(ptsX, ptsY);
  }
  get points() {
    return this.pointsMatrix.T.arr;
  }
  draw(ctx) {
    if (this.cache.config.rendered) {
      ctx.save();
      this.applyNormalStyle(ctx);
      ctx.beginPath();
      this.path.moveTo(this.points[1][0] + this._x, this.points[1][1] + this._y);
      for (let i = 1; i < this.points.length; i++) {
        this.path.lineTo(this.points[i][0] + this._x, this.points[i][1] + this._y);
      }
      ctx.stroke(this.path);
      ctx.restore();
    }
    return this;
  }
  fromXY(X, Y) {
    this.pointsMatrix = matrix([X, Y]);
    return this;
  }
  push(ptsX, ptsY) {
    this.pointsMatrix.hstack(matrix([ptsX, ptsY]));
    if (this.parent) this.parent.draw();
    return this;
  }
  isIn(x, y) {
    let is;
    if (this.parent) {
      this.parent.ctx.setTransform(1, 0, 0, 1, 0, 0);
      is = this.parent.ctx.isPointInPath(this.path, x, y);
      this.parent.applyTransformMatrix();
    }
    return is;
  }
}
const canvasPoints = (ptsX = [], ptsY = []) => new CanvasPoints(ptsX, ptsY);

class CanvasLine extends ZikoCanvasElement {
  constructor(x0, y0, x1, y1) {
    super();
    this.x0 = x0;
    this.x1 = x1;
    this.y0 = y0;
    this.y1 = y1;
    delete this.fill;
  }
  draw(ctx) {
    if (this.cache.config.rendered) {
      ctx.save();
      this.applyNormalStyle(ctx);
      ctx.beginPath();
      ctx.moveTo(this.x0 + this._x, this.y0 + this._y_);
      ctx.lineTo(this.x1 + this._x, this.y1 + this._y);
      ctx.stroke();
      if (this.cache.style.normal.strokeEnabled) ctx.stroke();
      ctx.restore();
    }
    return this;
  }
}
const canvasLine = (x0, y0, x1, y1) => new CanvasLine(x0, y0, x1, y1);

class CanvasRect extends ZikoCanvasElement {
  constructor(x, y, w, h) {
    super(x, y);
    this.w = w;
    this.h = h;
    this.path = new Path2D();
  }
  draw(ctx) {
    if (this.cache.config.rendered) {
      ctx.save();
      this.applyNormalStyle(ctx);
      ctx.beginPath();
      this.path.rect(this.px, this.py, this.w, this.h);
      const {
        strokeEnabled,
        fillEnabled
      } = this.cache.style.normal;
      if (strokeEnabled) ctx.stroke(this.path);
      if (fillEnabled) ctx.fill(this.path);
      ctx.closePath();
      ctx.restore();
    }
    return this;
  }
  width(w) {
    this.w = w;
    if (this.parent) this.parent.draw();
    return this;
  }
  height(h) {
    this.h = h;
    if (this.parent) this.parent.draw();
    return this;
  }
  // distanceFromCenter(x,y){
  //     return Math.sqrt(
  //         (this.position.x-x)**2-(this.position.y-y)**2
  //     )
  // }
  // isIn(x,y,strict=false){
  //     return strict?this.distanceFromCenter(x,y)<this.r:this.distanceFromCenter(x,y)<=this.r;
  // }
  // isInEdges(x,y){
  //     return this.distanceFromCenter(x,y)===this.r;
  // }
}
const canvasRect = (x, y, w, h) => new CanvasRect(x, y, w, h);

const Graphics = {
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
  canvasArc,
  canvasCircle,
  canvasPoints,
  canvasLine,
  canvasRect,
  ExtractAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'ExtractAll' && key !== 'RemoveAll') {
        globalThis[key] = this[key];
      }
    }
    return this;
  },
  RemoveAll: function () {
    const keys = Object.keys(this);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== 'RemoveAll') {
        delete globalThis[key];
      }
    }
    return this;
  }
};

class ZikoSPA {
  constructor(root_UI, routes) {
    this.root_UI = root_UI;
    this.routes = new Map([[404, text("Error 404")], ...Object.entries(routes)]);
    this.patterns = new Map();
    this.maintain();
    window.onpopstate = this.render(location.pathname);
  }
  get(path, wrapper) {
    path instanceof RegExp ? this.patterns.set(path, wrapper) : this.routes.set(path, wrapper);
    this.maintain();
    return this;
  }
  maintain() {
    this.root_UI.append(...this.routes.values());
    [...this.routes.values()].map(n => n.render(false));
    this.render(location.pathname);
    return this;
  }
  render(path) {
    if (this.routes.get(path)) this.routes.get(path).render(true);else {
      const key = [...this.patterns.keys()].find(pattern => pattern.test(path));
      if (key) this.patterns.get(key)(path);else this.routes.get(404).render(true);
    }
    window.history.pushState({}, "", path);
    return this;
  }
}
const SPA = (root_UI, routes, patterns) => new ZikoSPA(root_UI, routes, patterns);

class ZikoSeo {
  constructor(app) {
    this.app = app;
    this.meta = {};
    this.#setMeta("generator", "zikojs");
  }
  #setMeta(key, value) {
    const meta = document.querySelector(`meta[name=${key}]`);
    this.meta = meta ? meta : document.createElement("meta");
    this.meta.setAttribute("name", key);
    this.meta.setAttribute("content", value);
    if (!meta) this.app.head.append(this.meta);
    return this;
  }
  charset(charset = "utf-8") {
    const meta = document.querySelector("meta[charset]");
    this.meta = meta ? meta : document.createElement("meta");
    this.meta.setAttribute("charset", charset);
    if (!meta) this.app.head.append(this.meta);
    return this;
  }
  description(description) {
    this.#setMeta("description", description);
    return this;
  }
  viewport(viewport = "width=device-width, initial-scale=1.0") {
    this.#setMeta("viewport", viewport);
    return this;
  }
  keywords(...keywords) {
    keywords.push("zikojs");
    keywords = [...new Set(keywords)].join(", ");
    this.#setMeta("keywords", keywords);
    return this;
  }
  author(name = "", email = "") {
    const author = [name, email].join(", ");
    this.#setMeta("author", author);
    return this;
  }
}
const Seo = app => new ZikoSeo(app);

class ZikoUIApp extends ZikoUIFlex {
  constructor() {
    super("main");
    this.root = document.documentElement;
    this.head = null;
    this.#init();
    this.seo = Seo(this);
    Object.assign(this.cache, {
      theme: null,
      isRoot: true
    });
    this.render();
  }
  #init() {
    this.root.setAttribute("data-engine", "zikojs");
    const head = this.root.getElementsByTagName("head")[0];
    this.head = head ? head : this.head = document.createElement("head");
    if (!head) this.root.insertBefore(this.head, document.body);
    const title = this.head.getElementsByTagName("title")[0];
    this.Title = title ? title : document.createElement("title");
    if (!title) this.head.append(this.Title);
  }
  title(title = this.title.textContent) {
    this.Title.textContent = title;
    return this;
  }
  prefetch() {}
  description() {}
}
const App = (...UIElement) => new ZikoUIApp().append(...UIElement);

const __init__ = () => document.documentElement.setAttribute("data-engine", "zikojs");

const Ziko = {
  App,
  Math: Math$1,
  UI: UI$1,
  Time,
  Graphics,
  Events,
  Use: State,
  Data,
  SPA,
  __UI__
};
globalThis.__Ziko__ = Ziko;
globalThis.__UI__ = __UI__;
function ExtractAll() {
  UI$1.ExtractAll();
  Math$1.ExtractAll();
  Time.ExtractAll();
  Events.ExtractAll();
  State.ExtractAll();
  Graphics.ExtractAll();
  Data.ExtractAll();
  return this;
}
function RemoveAll() {
  UI$1.RemoveAll();
  Math$1.RemoveAll();
  Time.RemoveAll();
  Events.RemoveAll();
  State.RemoveAll();
  Graphics.RemoveAll();
  Data.RemoveAll();
}

exports.Accordion = Accordion;
exports.App = App;
exports.Article = Article;
exports.Aside = Aside;
exports.Base = Base;
exports.Canvas = Canvas;
exports.Carousel = Carousel;
exports.CodeNote = CodeNote;
exports.Combinaison = Combinaison;
exports.Complex = Complex;
exports.DarkThemes = DarkThemes;
exports.Data = Data;
exports.E = E;
exports.EPSILON = EPSILON;
exports.Ease = Ease;
exports.Events = Events;
exports.ExtractAll = ExtractAll;
exports.Fixed = Fixed;
exports.Flex = Flex;
exports.Footer = Footer;
exports.Graphics = Graphics;
exports.Grid = Grid$1;
exports.Header = Header;
exports.LightThemes = LightThemes;
exports.LinearSystem = LinearSystem;
exports.Logic = Logic$1;
exports.Main = Main;
exports.Math = Math$1;
exports.Matrix = Matrix;
exports.Nav = Nav;
exports.PI = PI;
exports.Permutation = Permutation;
exports.PowerSet = PowerSet;
exports.Random = Random;
exports.RemoveAll = RemoveAll;
exports.SPA = SPA;
exports.Section = Section$1;
exports.Signal = Signal;
exports.Svg = Svg;
exports.Table = Table;
exports.Tabs = Tabs;
exports.Themes = Themes;
exports.Time = Time;
exports.UI = UI$1;
exports.Utils = Utils;
exports.Ziko = Ziko;
exports.ZikoHtml = ZikoHtml;
exports.ZikoUIArticle = ZikoUIArticle;
exports.ZikoUIAside = ZikoUIAside;
exports.ZikoUIAudio = ZikoUIAudio;
exports.ZikoUICanvas = ZikoUICanvas;
exports.ZikoUIElement = ZikoUIElement;
exports.ZikoUIFigure = ZikoUIFigure;
exports.ZikoUIFooter = ZikoUIFooter;
exports.ZikoUIHeader = ZikoUIHeader;
exports.ZikoUIHtmlTag = ZikoUIHtmlTag;
exports.ZikoUIImage = ZikoUIImage;
exports.ZikoUIMain = ZikoUIMain;
exports.ZikoUINav = ZikoUINav;
exports.ZikoUISection = ZikoUISection;
exports.ZikoUISvg = ZikoUISvg;
exports.ZikoUIVideo = ZikoUIVideo;
exports.__init__ = __init__;
exports.abs = abs;
exports.acos = acos;
exports.acosh = acosh;
exports.acot = acot;
exports.add = add;
exports.animation = animation;
exports.arange = arange;
exports.asin = asin;
exports.asinh = asinh;
exports.atan = atan;
exports.atan2 = atan2;
exports.atanh = atanh;
exports.audio = audio;
exports.bessel = bessel;
exports.beta = beta;
exports.br = br;
exports.brs = brs;
exports.btn = btn;
exports.canvasArc = canvasArc;
exports.canvasCircle = canvasCircle;
exports.canvasLine = canvasLine;
exports.canvasPoints = canvasPoints;
exports.canvasRect = canvasRect;
exports.cartesianProduct = cartesianProduct;
exports.ceil = ceil;
exports.checkbox = checkbox;
exports.choleskyDecomposition = choleskyDecomposition;
exports.clamp = clamp$1;
exports.complex = complex;
exports.cos = cos;
exports.cosh = cosh;
exports.cot = cot;
exports.coth = coth;
exports.csc = csc;
exports.csv2arr = csv2arr;
exports.csv2json = csv2json;
exports.csv2matrix = csv2matrix;
exports.csv2object = csv2object;
exports.csv2sql = csv2sql;
exports.datalist = datalist;
exports.debounce = debounce;
exports.deg2rad = deg2rad;
exports.div = div;
exports.e = e;
exports.fact = fact;
exports.figure = figure;
exports.floor = floor;
exports.gamma = gamma;
exports.geomspace = geomspace;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.hr = hr;
exports.hrs = hrs;
exports.hypot = hypot;
exports.image = image;
exports.inRange = inRange;
exports.input = input;
exports.inputCamera = inputCamera;
exports.inputColor = inputColor;
exports.inputDate = inputDate;
exports.inputDateTime = inputDateTime;
exports.inputEmail = inputEmail;
exports.inputImage = inputImage;
exports.inputNumber = inputNumber;
exports.inputPassword = inputPassword;
exports.inputTime = inputTime;
exports.isApproximatlyEqual = isApproximatlyEqual;
exports.json2arr = json2arr;
exports.json2csv = json2csv;
exports.json2csvFile = json2csvFile;
exports.json2xml = json2xml;
exports.json2xmlFile = json2xmlFile;
exports.json2yml = json2yml;
exports.json2ymlFile = json2ymlFile;
exports.lerp = lerp$1;
exports.li = li;
exports.link = link;
exports.linspace = linspace;
exports.ln = ln;
exports.logspace = logspace;
exports.loop = loop;
exports.luDecomposition = luDecomposition;
exports.map = map$1;
exports.mapfun = mapfun;
exports.markdown2html = markdown2html;
exports.matrix = matrix;
exports.matrix2 = matrix2;
exports.matrix3 = matrix3;
exports.matrix4 = matrix4;
exports.max = max;
exports.min = min;
exports.modulo = modulo;
exports.mul = mul;
exports.norm = norm$1;
exports.nums = nums;
exports.ol = ol;
exports.ones = ones;
exports.p = p;
exports.pgcd = pgcd;
exports.pow = pow;
exports.ppcm = ppcm;
exports.prod = prod;
exports.qrDecomposition = qrDecomposition;
exports.rad2deg = rad2deg;
exports.radio = radio;
exports.round = round;
exports.search = search;
exports.sec = sec;
exports.select = select;
exports.sig = sig;
exports.sign = sign;
exports.sin = sin;
exports.sinc = sinc;
exports.sinh = sinh;
exports.slider = slider;
exports.sqrt = sqrt;
exports.sqrtn = sqrtn;
exports.sub = sub;
exports.subset = subset;
exports.sum = sum;
exports.svg2ascii = svg2ascii;
exports.svg2img = svg2img;
exports.svg2imgUrl = svg2imgUrl;
exports.svg2str = svg2str;
exports.svgCircle = svgCircle;
exports.svgEllipse = svgEllipse;
exports.svgGroupe = svgGroupe;
exports.svgImage = svgImage;
exports.svgLine = svgLine;
exports.svgPolygon = svgPolygon;
exports.svgRect = svgRect;
exports.svgText = svgText;
exports.tan = tan;
exports.tanh = tanh;
exports.text = text;
exports.textarea = textarea;
exports.throttle = throttle;
exports.timeTaken = timeTaken;
exports.time_memory_Taken = time_memory_Taken;
exports.ul = ul;
exports.video = video;
exports.wait = wait;
exports.waitForUIElm = waitForUIElm;
exports.waitForUIElmSync = waitForUIElmSync;
exports.zeros = zeros;
