//import Ziko from "../index.js"
import { __NumberProto__ } from "../__proto__/Number.js";
import { __ArrayProto__ } from "../__proto__/Array.js";
import {PI,E,EPSILON} from "./const.js"
import { Signal } from "./Signal/index.js";
__NumberProto__()
__ArrayProto__()
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
//import { Derivation } from "./Numeric/index.js";
import {complex,Complex} from "./Complex/index.js";
import{Matrix,LinearSystem,matrix,matrix2,matrix3,matrix4}from "./Matrix/index.js"
import Discret from "./Discret/index.js";
import {Logic,Base,Permutation,Combinaison,PowerSet,subset} from "./Discret/index.js";
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
}
export * from "./const.js"
export * from "./Functions"
export * from "./Complex"
export * from "./Matrix"
export * from "./Discret"
export * from "./Numeric"
export * from "./Random"
export * from "./Signal"
export * from "./Utils"
export * from "./Statistics"
export default Math;

