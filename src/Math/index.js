import {PI,E,EPSILON} from "./const.js"
import { Signal } from "./signal/index.js";
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
  } from "./functions/index.js";
import {Random} from "./random/index.js";
//import { Derivation } from "./Numeric";
import {complex,Complex} from "./complex/index.js";
import{Matrix,LinearSystem,matrix,matrix2,matrix3,matrix4}from "./matrix/index.js"
import Discret from "./discret/index.js";
import {Logic,Base,Permutation,Combinaison,powerSet,subSet} from "./discret/index.js";
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
  }from "./utils/index.js"
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
export * from "./functions/index.js"
export * from "./complex/index.js"
export * from "./matrix/index.js"
export * from "./discret/index.js"
export * from "./numeric/index.js"
export * from "./random/index.js"
export * from "./signal/index.js"
export * from "./utils/index.js"
export * from "./statistics/index.js"
export default Math;

