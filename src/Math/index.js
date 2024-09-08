import {PI,E,EPSILON} from "./const.js"
import { Signal } from "./Signal/index.js";
import{
    cos,
    sin,
    tan,
    sinc,
    cot,
    sec,
    csc,
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
  } from "./Functions/index.js";
import {Random} from "./Random/index.js";
//import { Derivation } from "./Numeric";
import {complex,Complex} from "./Complex/index.js";
import{Matrix,LinearSystem,matrix,matrix2,matrix3,matrix4}from "./Matrix/index.js"
import Discret from "./Discret/index.js";
import {Logic,Base,Permutation,Combinaison,powerSet,subSet} from "./Discret/index.js";
import {
    Utils,
    zeros,
    ones,
    nums,
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
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    isApproximatlyEqual,
    inRange,
    cartesianProduct,
    mapfun
  }from "./Utils/index.js"
const Math={
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
    norm,
    lerp,
    map,
    clamp,
    pgcd,
    ppcm,
    isApproximatlyEqual,
    inRange,
    cartesianProduct,
    Discret,
    Logic,
    Base,
    Permutation,
    Combinaison,
    powerSet,
    subSet,
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
}
export * from "./const.js"
export * from "./Functions/index.js"
export * from "./Complex/index.js"
export * from "./Matrix/index.js"
export * from "./Discret/index.js"
export * from "./Numeric/index.js"
export * from "./Random/index.js"
export * from "./Signal/index.js"
export * from "./Utils/index.js"
export * from "./Statistics/index.js"
export default Math;

